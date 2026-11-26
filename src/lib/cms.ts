import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import type {
  AppUser,
  Broker,
  LeadStatus,
  LeadSubmission,
  MasterTrader,
  SitePagesContent,
  TradingIndicator,
  TradingRobot,
  UserRole,
} from "@/types";
import { tradingIndicators as seedIndicators } from "@/data/indicators";
import { tradingRobots as seedRobots } from "@/data/robots";
import { masterTraders as seedMasters } from "@/data/masters";
import { brokers as seedBrokers } from "@/data/brokers";
import { defaultSitePagesContent } from "@/data/site-pages";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

interface LocalCmsDatabase {
  indicators: TradingIndicator[];
  robots: TradingRobot[];
  masters: MasterTrader[];
  brokers: Broker[];
  leads: LeadSubmission[];
  users: AppUser[];
  pages?: SitePagesContent;
}

const LOCAL_DB_PATH = path.join(process.cwd(), "data", "local-cms-db.json");
export const CMS_CACHE_TAG = "cms-data";

export function purgeCmsCache(): void {
  try {
    revalidateTag(CMS_CACHE_TAG);
    revalidatePath("/", "layout");
  } catch {
    // Ignore if invoked outside a Next.js request context
  }
}

function createInitialSeedDb(): LocalCmsDatabase {
  return {
    indicators: seedIndicators.map((item, idx) => ({
      ...item,
      isPublished: item.isPublished ?? true,
      sortOrder: item.sortOrder ?? idx + 1,
    })),
    robots: seedRobots.map((item, idx) => ({
      ...item,
      isPublished: item.isPublished ?? true,
      sortOrder: item.sortOrder ?? idx + 1,
    })),
    masters: seedMasters.map((item, idx) => ({
      ...item,
      isPublished: item.isPublished ?? true,
      sortOrder: item.sortOrder ?? idx + 1,
    })),
    brokers: seedBrokers.map((item) => ({
      ...item,
      isPublished: item.isPublished ?? true,
    })),
    leads: [],
    users: [],
    pages: structuredClone(defaultSitePagesContent),
  };
}

async function readLocalDb(): Promise<LocalCmsDatabase> {
  try {
    const raw = await fs.readFile(LOCAL_DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalCmsDatabase>;
    const defaults = createInitialSeedDb();
    return {
      indicators: parsed.indicators ?? defaults.indicators,
      robots: parsed.robots ?? defaults.robots,
      masters: parsed.masters ?? defaults.masters,
      brokers: parsed.brokers ?? defaults.brokers,
      leads: parsed.leads ?? [],
      users: parsed.users ?? [],
      pages: parsed.pages
        ? {
            home: { ...defaults.pages!.home, ...parsed.pages.home },
            backcom: { ...defaults.pages!.backcom, ...parsed.pages.backcom },
            brokersPage: {
              ...defaults.pages!.brokersPage,
              ...parsed.pages.brokersPage,
            },
          }
        : defaults.pages,
    };
  } catch {
    return createInitialSeedDb();
  }
}

async function writeLocalDb(db: LocalCmsDatabase): Promise<void> {
  if (process.env.VERCEL === "1") {
    throw new Error(
      "Môi trường Vercel yêu cầu kết nối Supabase để lưu trữ vĩnh viễn. Vui lòng thêm NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY vào Vercel Environment Variables."
    );
  }
  await fs.mkdir(path.dirname(LOCAL_DB_PATH), { recursive: true });
  await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export async function getCmsStorageInfo(): Promise<{
  mode: "supabase" | "local";
  supabaseReady: boolean;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return { mode: "local", supabaseReady: false };
  }
  const sb = getSupabaseAdmin();
  if (!sb) return { mode: "local", supabaseReady: false };

  const { error } = await sb
    .from("cms_indicators")
    .select("slug", { count: "exact", head: true });

  if (error) {
    return {
      mode: "supabase",
      supabaseReady: false,
      error: `Đã tìm thấy khóa Supabase nhưng chưa chạy bảng SQL (${error.message}). Hãy chạy file supabase/schema.sql trong SQL Editor của Supabase.`,
    };
  }
  return { mode: "supabase", supabaseReady: true };
}

/**
 * Seeds Supabase tables with default data if empty (or upserts defaults on manual Seed click)
 */
export async function seedDefaultDataToStorage(): Promise<{
  indicators: number;
  robots: number;
  masters: number;
  brokers: number;
}> {
  const defaults = createInitialSeedDb();
  const sb = getSupabaseAdmin();

  if (!sb) {
    const existing = await readLocalDb();
    await writeLocalDb({
      indicators:
        existing.indicators.length > 0
          ? existing.indicators
          : defaults.indicators,
      robots: existing.robots.length > 0 ? existing.robots : defaults.robots,
      masters: existing.masters.length > 0 ? existing.masters : defaults.masters,
      brokers: existing.brokers.length > 0 ? existing.brokers : defaults.brokers,
      leads: existing.leads,
      users: existing.users,
    });
    return {
      indicators: defaults.indicators.length,
      robots: defaults.robots.length,
      masters: defaults.masters.length,
      brokers: defaults.brokers.length,
    };
  }

  const indRows = defaults.indicators.map((item, idx) => ({
    slug: item.slug,
    is_published: item.isPublished ?? true,
    sort_order: item.sortOrder ?? idx + 1,
    payload: item,
    updated_at: new Date().toISOString(),
  }));
  const { error: e1 } = await sb
    .from("cms_indicators")
    .upsert(indRows, { onConflict: "slug", ignoreDuplicates: true });
  if (e1) throw new Error(`Lỗi khởi tạo bảng cms_indicators: ${e1.message}`);

  const botRows = defaults.robots.map((item, idx) => ({
    slug: item.slug,
    is_published: item.isPublished ?? true,
    sort_order: item.sortOrder ?? idx + 1,
    payload: item,
    updated_at: new Date().toISOString(),
  }));
  const { error: e2 } = await sb
    .from("cms_robots")
    .upsert(botRows, { onConflict: "slug", ignoreDuplicates: true });
  if (e2) throw new Error(`Lỗi khởi tạo bảng cms_robots: ${e2.message}`);

  const masterRows = defaults.masters.map((item, idx) => ({
    slug: item.slug,
    is_published: item.isPublished ?? true,
    sort_order: item.sortOrder ?? idx + 1,
    payload: item,
    updated_at: new Date().toISOString(),
  }));
  const { error: e3 } = await sb
    .from("cms_masters")
    .upsert(masterRows, { onConflict: "slug", ignoreDuplicates: true });
  if (e3) throw new Error(`Lỗi khởi tạo bảng cms_masters: ${e3.message}`);

  const brokerRows = defaults.brokers.map((item) => ({
    slug: item.slug,
    is_published: item.isPublished ?? true,
    sort_order: item.priorityOrder,
    payload: item,
    updated_at: new Date().toISOString(),
  }));
  const { error: e4 } = await sb
    .from("cms_brokers")
    .upsert(brokerRows, { onConflict: "slug", ignoreDuplicates: true });
  if (e4) throw new Error(`Lỗi khởi tạo bảng cms_brokers: ${e4.message}`);

  purgeCmsCache();

  return {
    indicators: indRows.length,
    robots: botRows.length,
    masters: masterRows.length,
    brokers: brokerRows.length,
  };
}

// ============================================================================
// 1. INDICATORS CRUD
// ============================================================================
export async function getAllIndicatorsAdmin(): Promise<TradingIndicator[]> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_indicators")
      .select("slug, is_published, sort_order, payload")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        ...(row.payload as TradingIndicator),
        slug: row.slug,
        isPublished: row.is_published,
        sortOrder: row.sort_order,
      }));
    }
  }
  const local = await readLocalDb();
  return local.indicators;
}

const getCachedLiveIndicators = unstable_cache(
  async (): Promise<TradingIndicator[]> => {
    const all = await getAllIndicatorsAdmin();
    return all.filter((item) => item.isPublished !== false);
  },
  ["cms-live-indicators"],
  { tags: [CMS_CACHE_TAG], revalidate: 300 }
);

export async function getLiveIndicators(): Promise<TradingIndicator[]> {
  return getCachedLiveIndicators();
}

export async function getLiveIndicatorBySlug(
  slug: string
): Promise<TradingIndicator | undefined> {
  const list = await getLiveIndicators();
  return list.find((item) => item.slug === slug);
}

export async function upsertIndicator(
  indicator: TradingIndicator
): Promise<TradingIndicator> {
  const normalized: TradingIndicator = {
    ...indicator,
    id: indicator.id || indicator.slug,
    isPublished: indicator.isPublished ?? true,
    sortOrder: indicator.sortOrder ?? 10,
  };

  const sb = getSupabaseAdmin();
  if (sb) {
    // Ensure seed items aren't lost on very first upsert if table was completely empty
    const { count } = await sb
      .from("cms_indicators")
      .select("slug", { count: "exact", head: true });
    if (count === 0) {
      await seedDefaultDataToStorage();
    }

    const { error } = await sb.from("cms_indicators").upsert(
      {
        slug: normalized.slug,
        is_published: normalized.isPublished,
        sort_order: normalized.sortOrder,
        payload: normalized,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return normalized;
  }

  const db = await readLocalDb();
  const idx = db.indicators.findIndex((x) => x.slug === normalized.slug);
  if (idx >= 0) db.indicators[idx] = normalized;
  else db.indicators.push(normalized);
  await writeLocalDb(db);
  purgeCmsCache();
  return normalized;
}

export async function deleteIndicator(slug: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { count } = await sb
      .from("cms_indicators")
      .select("slug", { count: "exact", head: true });
    if (count === 0) await seedDefaultDataToStorage();

    const { error } = await sb.from("cms_indicators").delete().eq("slug", slug);
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return;
  }
  const db = await readLocalDb();
  db.indicators = db.indicators.filter((x) => x.slug !== slug);
  await writeLocalDb(db);
  purgeCmsCache();
}

// ============================================================================
// 2. ROBOTS (BOT TRADING) CRUD
// ============================================================================
export async function getAllRobotsAdmin(): Promise<TradingRobot[]> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_robots")
      .select("slug, is_published, sort_order, payload")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        ...(row.payload as TradingRobot),
        slug: row.slug,
        isPublished: row.is_published,
        sortOrder: row.sort_order,
      }));
    }
  }
  const local = await readLocalDb();
  return local.robots;
}

const getCachedLiveRobots = unstable_cache(
  async (): Promise<TradingRobot[]> => {
    const all = await getAllRobotsAdmin();
    return all.filter((item) => item.isPublished !== false);
  },
  ["cms-live-robots"],
  { tags: [CMS_CACHE_TAG], revalidate: 300 }
);

export async function getLiveRobots(): Promise<TradingRobot[]> {
  return getCachedLiveRobots();
}

export async function getLiveRobotBySlug(
  slug: string
): Promise<TradingRobot | undefined> {
  const list = await getLiveRobots();
  return list.find((item) => item.slug === slug);
}

export async function upsertRobot(robot: TradingRobot): Promise<TradingRobot> {
  const normalized: TradingRobot = {
    ...robot,
    isPublished: robot.isPublished ?? true,
    sortOrder: robot.sortOrder ?? 10,
  };

  const sb = getSupabaseAdmin();
  if (sb) {
    const { count } = await sb
      .from("cms_robots")
      .select("slug", { count: "exact", head: true });
    if (count === 0) await seedDefaultDataToStorage();

    const { error } = await sb.from("cms_robots").upsert(
      {
        slug: normalized.slug,
        is_published: normalized.isPublished,
        sort_order: normalized.sortOrder,
        payload: normalized,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return normalized;
  }

  const db = await readLocalDb();
  const idx = db.robots.findIndex((x) => x.slug === normalized.slug);
  if (idx >= 0) db.robots[idx] = normalized;
  else db.robots.push(normalized);
  await writeLocalDb(db);
  purgeCmsCache();
  return normalized;
}

export async function deleteRobot(slug: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { count } = await sb
      .from("cms_robots")
      .select("slug", { count: "exact", head: true });
    if (count === 0) await seedDefaultDataToStorage();

    const { error } = await sb.from("cms_robots").delete().eq("slug", slug);
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return;
  }
  const db = await readLocalDb();
  db.robots = db.robots.filter((x) => x.slug !== slug);
  await writeLocalDb(db);
  purgeCmsCache();
}

// ============================================================================
// 3. COPY TRADING MASTERS CRUD
// ============================================================================
export async function getAllMastersAdmin(): Promise<MasterTrader[]> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_masters")
      .select("slug, is_published, sort_order, payload")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        ...(row.payload as MasterTrader),
        slug: row.slug,
        isPublished: row.is_published,
        sortOrder: row.sort_order,
      }));
    }
  }
  const local = await readLocalDb();
  return local.masters;
}

const getCachedLiveMasters = unstable_cache(
  async (): Promise<MasterTrader[]> => {
    const all = await getAllMastersAdmin();
    return all.filter((item) => item.isPublished !== false);
  },
  ["cms-live-masters"],
  { tags: [CMS_CACHE_TAG], revalidate: 300 }
);

export async function getLiveMasters(): Promise<MasterTrader[]> {
  return getCachedLiveMasters();
}

export async function getLiveMasterBySlug(
  slug: string
): Promise<MasterTrader | undefined> {
  const list = await getLiveMasters();
  return list.find((item) => item.slug === slug);
}

export async function upsertMaster(
  master: MasterTrader
): Promise<MasterTrader> {
  const normalized: MasterTrader = {
    ...master,
    isPublished: master.isPublished ?? true,
    sortOrder: master.sortOrder ?? 10,
  };

  const sb = getSupabaseAdmin();
  if (sb) {
    const { count } = await sb
      .from("cms_masters")
      .select("slug", { count: "exact", head: true });
    if (count === 0) await seedDefaultDataToStorage();

    const { error } = await sb.from("cms_masters").upsert(
      {
        slug: normalized.slug,
        is_published: normalized.isPublished,
        sort_order: normalized.sortOrder,
        payload: normalized,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return normalized;
  }

  const db = await readLocalDb();
  const idx = db.masters.findIndex((x) => x.slug === normalized.slug);
  if (idx >= 0) db.masters[idx] = normalized;
  else db.masters.push(normalized);
  await writeLocalDb(db);
  purgeCmsCache();
  return normalized;
}

export async function deleteMaster(slug: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { count } = await sb
      .from("cms_masters")
      .select("slug", { count: "exact", head: true });
    if (count === 0) await seedDefaultDataToStorage();

    const { error } = await sb.from("cms_masters").delete().eq("slug", slug);
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return;
  }
  const db = await readLocalDb();
  db.masters = db.masters.filter((x) => x.slug !== slug);
  await writeLocalDb(db);
  purgeCmsCache();
}

// ============================================================================
// 4. BROKERS CRUD
// ============================================================================
const LEGACY_DEFAULT_LOGOS: Record<string, string> = {
  "/images/brokers/austex.svg": "/images/brokers/austex-logo.png",
  "/images/brokers/exness.svg": "/images/brokers/exness-logo.png",
  "/images/brokers/tickmill.svg": "/images/brokers/tickmill-logo.png",
  "/images/brokers/fxpro.svg": "/images/brokers/fxpro-logo.png",
  "/images/brokers/bcr.svg": "/images/brokers/bcr-logo.png",
};

const DEFAULT_BROKER_REFERRAL_URLS: Record<string, string> = {
  austex: "https://crm.austexmarkets.com/#/registration/i/IHsPmNGt",
  exness: "https://one.toexness.com/a/uh88l3hg",
  tickmill:
    "https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB21878722_MT&utm_medium=Open+Account&utm_source=link&lp=https%3a%2f%2fmy.tickmill.com%2fvi%2fsign-up%2f",
  fxpro: "https://direct-vn.pro/vi/partner/NpoV4phV?platform=web",
  bcr: "https://thebcrglobal.com/sign-up?code=RACK7PO3W6D&siteId=5&lang=vi-vn",
};

function normalizeBrokerLogo(broker: Broker): Broker {
  const upgradedLogo = LEGACY_DEFAULT_LOGOS[broker.logo] ?? broker.logo;
  const fallbackReferral =
    broker.referralUrl && broker.referralUrl.trim() !== ""
      ? broker.referralUrl
      : (DEFAULT_BROKER_REFERRAL_URLS[broker.slug] ?? null);
  return {
    ...broker,
    logo: upgradedLogo,
    referralUrl: fallbackReferral,
  };
}

export async function getAllBrokersAdmin(): Promise<Broker[]> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_brokers")
      .select("slug, is_published, sort_order, payload")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) =>
        normalizeBrokerLogo({
          ...(row.payload as Broker),
          slug: row.slug,
          isPublished: row.is_published,
          priorityOrder: row.sort_order,
        })
      );
    }
  }
  const local = await readLocalDb();
  return [...local.brokers]
    .map(normalizeBrokerLogo)
    .sort((a, b) => a.priorityOrder - b.priorityOrder);
}

const getCachedLiveBrokers = unstable_cache(
  async (): Promise<Broker[]> => {
    const all = await getAllBrokersAdmin();
    return all
      .filter((item) => item.isPublished !== false)
      .sort((a, b) => a.priorityOrder - b.priorityOrder);
  },
  ["cms-live-brokers"],
  { tags: [CMS_CACHE_TAG], revalidate: 300 }
);

export async function getLiveBrokers(): Promise<Broker[]> {
  return getCachedLiveBrokers();
}

export async function getLiveBrokerBySlug(
  slug: string
): Promise<Broker | undefined> {
  const list = await getLiveBrokers();
  return list.find((item) => item.slug === slug);
}

export async function upsertBroker(broker: Broker): Promise<Broker> {
  const normalized: Broker = {
    ...broker,
    isPublished: broker.isPublished ?? true,
    priorityOrder: broker.priorityOrder || 10,
  };

  const sb = getSupabaseAdmin();
  if (sb) {
    const { count } = await sb
      .from("cms_brokers")
      .select("slug", { count: "exact", head: true });
    if (count === 0) await seedDefaultDataToStorage();

    const { error } = await sb.from("cms_brokers").upsert(
      {
        slug: normalized.slug,
        is_published: normalized.isPublished,
        sort_order: normalized.priorityOrder,
        payload: normalized,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return normalized;
  }

  const db = await readLocalDb();
  const idx = db.brokers.findIndex((x) => x.slug === normalized.slug);
  if (idx >= 0) db.brokers[idx] = normalized;
  else db.brokers.push(normalized);
  await writeLocalDb(db);
  purgeCmsCache();
  return normalized;
}

export async function deleteBroker(slug: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { count } = await sb
      .from("cms_brokers")
      .select("slug", { count: "exact", head: true });
    if (count === 0) await seedDefaultDataToStorage();

    const { error } = await sb.from("cms_brokers").delete().eq("slug", slug);
    if (error) throw new Error(error.message);
    purgeCmsCache();
    return;
  }
  const db = await readLocalDb();
  db.brokers = db.brokers.filter((x) => x.slug !== slug);
  await writeLocalDb(db);
  purgeCmsCache();
}

// ============================================================================
// 5. LEADS (CUSTOMER CONSULTATIONS) CRUD
// ============================================================================
export async function createLead(input: {
  fullName: string;
  email: string;
  phoneOrZalo: string;
  interestedBroker: string;
  message: string;
}): Promise<{ savedToDb: boolean; lead?: LeadSubmission }> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_leads")
      .insert({
        full_name: input.fullName,
        email: input.email,
        phone_or_zalo: input.phoneOrZalo,
        interested_broker: input.interestedBroker,
        message: input.message,
        status: "new",
        admin_note: "",
      })
      .select("*")
      .single();

    if (error) {
      return { savedToDb: false };
    }
    return {
      savedToDb: true,
      lead: {
        id: data.id,
        fullName: data.full_name,
        email: data.email,
        phoneOrZalo: data.phone_or_zalo,
        interestedBroker: data.interested_broker,
        message: data.message,
        status: data.status as LeadStatus,
        adminNote: data.admin_note ?? "",
        createdAt: data.created_at,
      },
    };
  }

  if (process.env.VERCEL === "1") {
    return { savedToDb: false };
  }

  const db = await readLocalDb();
  const lead: LeadSubmission = {
    id: randomUUID(),
    fullName: input.fullName,
    email: input.email,
    phoneOrZalo: input.phoneOrZalo,
    interestedBroker: input.interestedBroker,
    message: input.message,
    status: "new",
    adminNote: "",
    createdAt: new Date().toISOString(),
  };
  db.leads.unshift(lead);
  await writeLocalDb(db);
  return { savedToDb: true, lead };
}

export async function getAllLeadsAdmin(): Promise<LeadSubmission[]> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map((row) => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        phoneOrZalo: row.phone_or_zalo,
        interestedBroker: row.interested_broker,
        message: row.message,
        status: (row.status as LeadStatus) || "new",
        adminNote: row.admin_note || "",
        createdAt: row.created_at,
      }));
    }
  }
  const db = await readLocalDb();
  return db.leads;
}

export async function updateLeadAdmin(
  id: string,
  patch: { status?: LeadStatus; adminNote?: string }
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const updateData: Record<string, unknown> = {};
    if (patch.status) updateData.status = patch.status;
    if (patch.adminNote !== undefined) updateData.admin_note = patch.adminNote;
    const { error } = await sb
      .from("cms_leads")
      .update(updateData)
      .eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readLocalDb();
  const item = db.leads.find((l) => l.id === id);
  if (item) {
    if (patch.status) item.status = patch.status;
    if (patch.adminNote !== undefined) item.adminNote = patch.adminNote;
    await writeLocalDb(db);
  }
}

export async function deleteLeadAdmin(id: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb.from("cms_leads").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readLocalDb();
  db.leads = db.leads.filter((l) => l.id !== id);
  await writeLocalDb(db);
}


// ============================================================================
// 6. USERS (MEMBERS & GOOGLE OAUTH ACCOUNTS) CRUD
// ============================================================================
function mapSupabaseUserRow(row: Record<string, unknown>): AppUser {
  return {
    id: String(row.id),
    email: String(row.email).toLowerCase(),
    fullName: String(row.full_name || ""),
    phoneOrZalo: String(row.phone_or_zalo || ""),
    passwordHash: (row.password_hash as string | null) ?? null,
    provider: (row.provider as AppUser["provider"]) || "credentials",
    googleId: (row.google_id as string | null) ?? null,
    avatarUrl: (row.avatar_url as string | null) ?? null,
    role: ((row.role as UserRole) || "user") === "admin" ? "admin" : "user",
    createdAt: String(row.created_at || new Date().toISOString()),
  };
}

export async function findUserByEmail(
  email: string
): Promise<AppUser | undefined> {
  const cleanEmail = email.trim().toLowerCase();
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_users")
      .select("*")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (!error && data) {
      return mapSupabaseUserRow(data as Record<string, unknown>);
    }
    if (!error) return undefined;
  }

  const db = await readLocalDb();
  return db.users.find((u) => u.email.toLowerCase() === cleanEmail);
}

export async function registerCredentialsUser(input: {
  email: string;
  fullName: string;
  phoneOrZalo: string;
  passwordHash: string;
  role?: UserRole;
}): Promise<AppUser> {
  const cleanEmail = input.email.trim().toLowerCase();
  const existing = await findUserByEmail(cleanEmail);
  if (existing) {
    throw new Error("Địa chỉ Email này đã được đăng ký trước đó.");
  }

  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_users")
      .insert({
        email: cleanEmail,
        full_name: input.fullName.trim(),
        phone_or_zalo: input.phoneOrZalo.trim(),
        password_hash: input.passwordHash,
        provider: "credentials",
        role: input.role ?? "user",
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(
        `Không thể tạo tài khoản trên Database (${error.message}). Hãy chắc chắn đã chạy phần cms_users trong supabase/schema.sql.`
      );
    }
    return mapSupabaseUserRow(data as Record<string, unknown>);
  }

  const db = await readLocalDb();
  const newUser: AppUser = {
    id: randomUUID(),
    email: cleanEmail,
    fullName: input.fullName.trim(),
    phoneOrZalo: input.phoneOrZalo.trim(),
    passwordHash: input.passwordHash,
    provider: "credentials",
    googleId: null,
    avatarUrl: null,
    role: input.role ?? "user",
    createdAt: new Date().toISOString(),
  };
  db.users.unshift(newUser);
  await writeLocalDb(db);
  return newUser;
}

export async function upsertGoogleUser(input: {
  email: string;
  fullName: string;
  googleId: string;
  avatarUrl?: string | null;
  forceAdmin?: boolean;
}): Promise<AppUser> {
  const cleanEmail = input.email.trim().toLowerCase();
  const existing = await findUserByEmail(cleanEmail);

  const sb = getSupabaseAdmin();
  if (sb) {
    const nextRole: UserRole = input.forceAdmin
      ? "admin"
      : existing?.role ?? "user";

    const { data, error } = await sb
      .from("cms_users")
      .upsert(
        {
          email: cleanEmail,
          full_name: existing?.fullName || input.fullName,
          phone_or_zalo: existing?.phoneOrZalo || "",
          password_hash: existing?.passwordHash ?? null,
          provider: existing?.provider === "credentials" ? "credentials" : "google",
          google_id: input.googleId,
          avatar_url: input.avatarUrl ?? existing?.avatarUrl ?? null,
          role: nextRole,
        },
        { onConflict: "email" }
      )
      .select("*")
      .single();

    if (error) {
      throw new Error(`Không thể lưu tài khoản Google (${error.message}).`);
    }
    return mapSupabaseUserRow(data as Record<string, unknown>);
  }

  const db = await readLocalDb();
  if (existing) {
    const idx = db.users.findIndex((u) => u.email === cleanEmail);
    const updated: AppUser = {
      ...existing,
      googleId: input.googleId,
      avatarUrl: input.avatarUrl ?? existing.avatarUrl ?? null,
      role: input.forceAdmin ? "admin" : existing.role,
    };
    if (idx >= 0) db.users[idx] = updated;
    await writeLocalDb(db);
    return updated;
  }

  const created: AppUser = {
    id: randomUUID(),
    email: cleanEmail,
    fullName: input.fullName,
    phoneOrZalo: "",
    passwordHash: null,
    provider: "google",
    googleId: input.googleId,
    avatarUrl: input.avatarUrl ?? null,
    role: input.forceAdmin ? "admin" : "user",
    createdAt: new Date().toISOString(),
  };
  db.users.unshift(created);
  await writeLocalDb(db);
  return created;
}

export async function getAllUsersAdmin(): Promise<AppUser[]> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map((row) =>
        mapSupabaseUserRow(row as Record<string, unknown>)
      );
    }
  }
  const db = await readLocalDb();
  return db.users;
}

export async function updateUserRoleAdmin(
  id: string,
  role: UserRole
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb.from("cms_users").update({ role }).eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readLocalDb();
  const target = db.users.find((u) => u.id === id);
  if (target) {
    target.role = role;
    await writeLocalDb(db);
  }
}

export async function deleteUserAdmin(id: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb.from("cms_users").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }
  const db = await readLocalDb();
  db.users = db.users.filter((u) => u.id !== id);
  await writeLocalDb(db);
}


// ============================================================================
// 7. SITE PAGES CONTENT & MEDIA (HOME, BACKCOM, BROKERS LANDING)
// ============================================================================
export async function getSitePagesContentAdmin(): Promise<SitePagesContent> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { data, error } = await sb
      .from("cms_pages")
      .select("payload")
      .eq("page_key", "site_pages")
      .maybeSingle();

    if (!error && data?.payload) {
      const remote = data.payload as Partial<SitePagesContent>;
      const mergedHome = {
        ...defaultSitePagesContent.home,
        ...remote.home,
        promoVideo: {
          ...defaultSitePagesContent.home.promoVideo,
          ...remote.home?.promoVideo,
          videoSrc:
            remote.home?.promoVideo?.videoSrc ||
            defaultSitePagesContent.home.promoVideo.videoSrc,
        },
      };
      return {
        home: mergedHome,
        backcom: { ...defaultSitePagesContent.backcom, ...remote.backcom },
        brokersPage: {
          ...defaultSitePagesContent.brokersPage,
          ...remote.brokersPage,
        },
      };
    }
  }

  const local = await readLocalDb();
  return local.pages ?? structuredClone(defaultSitePagesContent);
}

const getCachedSitePagesContent = unstable_cache(
  async (): Promise<SitePagesContent> => getSitePagesContentAdmin(),
  ["cms-site-pages"],
  { tags: [CMS_CACHE_TAG], revalidate: 300 }
);

export async function getSitePagesContent(): Promise<SitePagesContent> {
  return getCachedSitePagesContent();
}

export async function saveSitePagesContent(
  content: SitePagesContent
): Promise<SitePagesContent> {
  const sb = getSupabaseAdmin();
  if (sb) {
    const { error } = await sb.from("cms_pages").upsert(
      {
        page_key: "site_pages",
        payload: content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_key" }
    );
    if (error) {
      throw new Error(
        `Không thể lưu nội dung trang lên Supabase (${error.message}). Hãy chạy phần bảng cms_pages trong supabase/schema.sql.`
      );
    }
    purgeCmsCache();
    return content;
  }

  const db = await readLocalDb();
  db.pages = content;
  await writeLocalDb(db);
  purgeCmsCache();
  return content;
}
