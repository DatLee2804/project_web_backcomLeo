"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import type {
  Broker,
  BrokerTrustItem,
  RebateCalculationMethod,
} from "@/types";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Tabs, type TabOption } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slugifyVietnamese } from "@/lib/utils";

const ALL_PLATFORMS: Broker["platforms"][number][] = [
  "MT4",
  "MT5",
  "cTrader",
  "WebTerminal",
];

const ALL_CATEGORIES: Broker["categories"][number][] = [
  "Forex",
  "Metals",
  "Indices",
  "Crypto",
];

const EDITOR_TABS: TabOption[] = [
  { id: "general", label: "1. Tổng quan & Link Referral" },
  { id: "accounts", label: "2. Tài khoản & Điều kiện" },
  { id: "platforms", label: "3. Nền tảng & Sản phẩm" },
  { id: "rebate", label: "4. Chính sách Backcom" },
  { id: "trust", label: "5. Đánh giá, Pháp lý & FAQ" },
];

const createDefaultTrustReviews = (brokerName: string): BrokerTrustItem[] => [
  {
    platform: "Regulation",
    label: "Cơ quan quản lý (Regulation)",
    value: null,
    sourceName: `Hồ sơ pháp lý ${brokerName}`,
    sourceUrl: null,
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "License",
    label: "Thông tin giấy phép (License)",
    value: null,
    sourceName: `Sổ đăng ký pháp nhân ${brokerName}`,
    sourceUrl: null,
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "Trustpilot",
    label: "Đánh giá trên Trustpilot",
    value: null,
    sourceName: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com",
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "WikiFX",
    label: "Hồ sơ tra cứu trên WikiFX",
    value: null,
    sourceName: "WikiFX",
    sourceUrl: "https://www.wikifx.com/vi",
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "Myfxbook",
    label: "Thống kê cộng đồng Myfxbook",
    value: null,
    sourceName: "Myfxbook",
    sourceUrl: "https://www.myfxbook.com",
    updatedAt: null,
    status: "pending",
  },
];

function createBlankBroker(nextOrder: number): Broker {
  return {
    slug: "",
    name: "",
    shortName: "",
    logo: "/images/brokers/exness.svg",
    featured: false,
    priorityOrder: nextOrder,
    isPublished: true,
    badge: "BROKER PARTNER",
    tagline: "Đối tác sàn giao dịch Forex & CFD trong hệ sinh thái Backcom Mr Leo",
    shortDescription:
      "Kết nối mở tài khoản và nhận hoàn phí giao dịch minh bạch trên các nền tảng tiêu chuẩn.",
    overview: [
      "Giới thiệu tổng quan về sàn giao dịch và cơ chế kết nối đối tác IB cùng Backcom Mr Leo.",
    ],
    categories: ["Forex", "Metals"],
    platforms: ["MT4", "MT5"],
    platformsStatus: "confirmed",
    platformsNote: "Hỗ trợ nền tảng giao dịch tiêu chuẩn MT4 / MT5",
    accountsTableLabel: "Standard / Raw",
    accounts: [
      {
        id: `acc-${Date.now()}`,
        name: "Tài khoản Standard",
        code: "STD",
        isDefault: true,
        description: "Tài khoản tiêu chuẩn tích hợp phí vào spread.",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "confirmed",
      },
    ],
    tradingProducts: [
      {
        code: "FOREX",
        name: "Ngoại hối (Forex)",
        symbolExample: "EURUSD, GBPUSD, USDJPY",
        description: "Giao dịch các cặp tiền tệ chính và chéo.",
      },
      {
        code: "METALS",
        name: "Kim loại quý",
        symbolExample: "XAUUSD, XAGUSD",
        description: "Giao dịch Vàng và Bạc CFD.",
      },
    ],
    tradingConditions: [
      { label: "Nền tảng hỗ trợ", value: "MT4 / MT5" },
      { label: "Chính sách hoàn phí", value: "Liên hệ / Theo cấu hình" },
    ],
    rebateConfig: {
      defaultMethod: "PER_LOT",
      payoutFrequency: null,
      payoutMethod: null,
      officialStatus: "pending",
      policySummary:
        "Chính sách hoàn phí áp dụng riêng theo từng loại tài khoản và mã sản phẩm.",
      symbolRules: [
        {
          symbol: "XAUUSD",
          label: "XAUUSD (Gold / Vàng)",
          officialRate: null,
          demoSuggestedRate: 5,
          unitLabel: "USD / Lot tiêu chuẩn",
          method: "PER_LOT",
          note: "Liên hệ để xác nhận biểu phí chính thức.",
        },
        {
          symbol: "EURUSD",
          label: "EURUSD (Forex Majors)",
          officialRate: null,
          demoSuggestedRate: 5,
          unitLabel: "USD / Lot tiêu chuẩn",
          method: "PER_LOT",
          note: "Liên hệ để xác nhận biểu phí chính thức.",
        },
      ],
    },
    rebateTableLabel: "Liên hệ / Cấu hình",
    referralUrl: null,
    trustReviews: createDefaultTrustReviews("Sàn đối tác"),
    highlights: [
      "Hỗ trợ kết nối hoàn phí giao dịch minh bạch",
      "Đồng hành kỹ thuật cùng cộng đồng Backcom Mr Leo",
    ],
    faqs: [
      {
        id: "broker-faq-1",
        question: "Làm thế nào để liên kết tài khoản nhận Backcom tại sàn này?",
        answer:
          "Bạn có thể mở tài khoản mới qua đường dẫn đối tác hoặc gửi ID tài khoản hiện có để đội ngũ hướng dẫn chuyển mã IB.",
      },
    ],
    status: "confirmed",
  };
}

export function BrokersManager({ initialItems }: { initialItems: Broker[] }) {
  const router = useRouter();
  const [items, setItems] = React.useState<Broker[]>(initialItems);
  const [editing, setEditing] = React.useState<Broker | null>(null);
  const [isNew, setIsNew] = React.useState(false);
  const [editorTab, setEditorTab] = React.useState<string>("general");
  const [saving, setSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const [overviewText, setOverviewText] = React.useState("");
  const [highlightsText, setHighlightsText] = React.useState("");
  const [portalUrl, setPortalUrl] = React.useState("");
  const [portalNote, setPortalNote] = React.useState("");

  const openEditor = (broker: Broker, createMode: boolean) => {
    const clone = structuredClone(broker);
    if (!clone.rebateConfig) {
      clone.rebateConfig = {
        defaultMethod: "PER_LOT",
        payoutFrequency: null,
        payoutMethod: null,
        officialStatus: "pending",
        policySummary: "",
        symbolRules: [],
      };
    }
    if (!clone.trustReviews || clone.trustReviews.length === 0) {
      clone.trustReviews = createDefaultTrustReviews(clone.name || "Broker");
    }
    setEditing(clone);
    setIsNew(createMode);
    setEditorTab("general");
    setOverviewText(clone.overview.join("\n\n"));
    setHighlightsText(clone.highlights.join("\n"));
    setPortalUrl(clone.externalPortal?.loginUrl ?? "");
    setPortalNote(clone.externalPortal?.rebateCheckNote ?? "");
    setFeedback(null);
  };

  const togglePlatform = (plat: Broker["platforms"][number]) => {
    setEditing((prev) => {
      if (!prev) return null;
      const exists = prev.platforms.includes(plat);
      const nextPlatforms = exists
        ? prev.platforms.filter((p) => p !== plat)
        : [...prev.platforms, plat];
      return {
        ...prev,
        platforms: nextPlatforms,
        platformsStatus: nextPlatforms.length > 0 ? "confirmed" : "pending",
      };
    });
  };

  const toggleCategory = (cat: Broker["categories"][number]) => {
    setEditing((prev) => {
      if (!prev) return null;
      const exists = prev.categories.includes(cat);
      const nextCats = exists
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat];
      return {
        ...prev,
        categories: nextCats.length > 0 ? nextCats : ["Forex"],
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const finalSlug = editing.slug.trim() || slugifyVietnamese(editing.name);
    const cleanReferral = editing.referralUrl?.trim() || null;
    const hasConfirmedRate = Boolean(
      editing.rebateConfig?.symbolRules.some(
        (r) => r.officialRate !== null && r.officialRate > 0
      )
    );

    const payload: Broker = {
      ...editing,
      slug: finalSlug,
      shortName: editing.shortName.trim() || editing.name.trim(),
      referralUrl: cleanReferral,
      overview: overviewText
        .split(/\n{2,}|\n/)
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: highlightsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      externalPortal: portalUrl.trim()
        ? {
            loginUrl: portalUrl.trim(),
            loginLabel: `Đăng nhập Cổng ${editing.shortName || editing.name}`,
            rebateCheckNote:
              portalNote.trim() ||
              `Cổng đăng nhập khách hàng của ${editing.name} và hệ thống đối soát hoàn phí của Backcom Mr Leo là hai chức năng độc lập.`,
          }
        : undefined,
      accounts: editing.accounts.filter((a) => a.code.trim()),
      tradingConditions: editing.tradingConditions.filter((c) =>
        c.label.trim()
      ),
      tradingProducts: editing.tradingProducts.filter((p) => p.name.trim()),
      rebateConfig: editing.rebateConfig
        ? {
            ...editing.rebateConfig,
            officialStatus: hasConfirmedRate ? "confirmed" : "pending",
            symbolRules: editing.rebateConfig.symbolRules.filter((r) =>
              r.symbol.trim()
            ),
          }
        : null,
      faqs: editing.faqs
        .filter((f) => f.question.trim())
        .map((f, idx) => ({ ...f, id: f.id || `${finalSlug}-faq-${idx + 1}` })),
    };

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/brokers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        item?: Broker;
        error?: string;
      };

      if (!res.ok || !data.item) {
        setFeedback({
          type: "err",
          text: data.error || "Không thể lưu thông tin sàn.",
        });
      } else {
        setItems((prev) => {
          const exists = prev.some((x) => x.slug === data.item!.slug);
          const next = exists
            ? prev.map((x) => (x.slug === data.item!.slug ? data.item! : x))
            : [...prev, data.item!];
          return next.sort((a, b) => a.priorityOrder - b.priorityOrder);
        });
        setEditing(null);
        setFeedback({
          type: "ok",
          text: `Đã lưu toàn bộ thông tin sàn "${data.item.name}" và cập nhật trang chi tiết /brokers/${data.item.slug}!`,
        });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "err", text: "Lỗi kết nối máy chủ." });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (broker: Broker) => {
    const updated: Broker = {
      ...broker,
      isPublished: broker.isPublished === false ? true : false,
    };
    const res = await fetch("/api/admin/brokers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((x) => (x.slug === broker.slug ? updated : x))
      );
      router.refresh();
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa sàn "${name}" khỏi hệ thống không?`
      )
    ) {
      return;
    }
    const res = await fetch(
      `/api/admin/brokers?slug=${encodeURIComponent(slug)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.slug !== slug));
      setFeedback({ type: "ok", text: `Đã xóa sàn "${name}".` });
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="gold">FULL BROKERS &amp; DETAIL PAGES CMS</Badge>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
            Quản lý Toàn diện Sàn giao dịch &amp; Trang Chi tiết Sàn
          </h1>
          <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
            Thêm sàn mới, ẩn/xóa sàn, cập nhật Link Referral, bảng tài khoản,
            điều kiện giao dịch, đánh giá pháp lý và FAQ cho từng trang{" "}
            <code>/brokers/[slug]</code>.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() =>
            openEditor(createBlankBroker(items.length + 1), true)
          }
        >
          <Plus className="h-4 w-4" />
          Thêm Sàn giao dịch mới
        </Button>
      </div>

      {feedback && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs sm:text-sm ${
            feedback.type === "ok"
              ? "border-success/40 bg-success-muted text-success"
              : "border-danger/40 bg-danger-muted text-danger"
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* Full Multi-Tab Broker Detail Editor */}
      {editing && (
        <Card className="border-gold/50 p-6 shadow-gold sm:p-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <h2 className="font-heading text-xl font-bold text-ink-primary">
                {isNew
                  ? "Thêm Sàn giao dịch Đối tác mới"
                  : `Chỉnh sửa toàn diện: ${editing.name}`}
              </h2>
              <p className="text-xs text-ink-muted">
                Chuyển giữa 5 tab bên dưới để chỉnh sửa đầy đủ các phần trên
                trang chi tiết sàn.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-card-hover hover:text-ink-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4">
            <Tabs
              options={EDITOR_TABS}
              value={editorTab}
              onChange={setEditorTab}
            />
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            {/* TAB 1: GENERAL, LOGO, REFERRAL, OVERVIEW, PORTAL */}
            {editorTab === "general" && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Tên Sàn đầy đủ *
                    </label>
                    <input
                      type="text"
                      required
                      value={editing.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setEditing((prev) =>
                          prev
                            ? {
                                ...prev,
                                name,
                                slug: isNew
                                  ? slugifyVietnamese(name)
                                  : prev.slug,
                              }
                            : null
                        );
                      }}
                      placeholder="Ví dụ: Vantage Markets"
                      className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Tên ngắn gọn
                    </label>
                    <input
                      type="text"
                      value={editing.shortName}
                      onChange={(e) =>
                        setEditing((prev) =>
                          prev ? { ...prev, shortName: e.target.value } : null
                        )
                      }
                      placeholder="Vantage"
                      className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Đường dẫn Slug *
                    </label>
                    <input
                      type="text"
                      required
                      readOnly={!isNew}
                      value={editing.slug}
                      onChange={(e) =>
                        setEditing((prev) =>
                          prev
                            ? {
                                ...prev,
                                slug: slugifyVietnamese(e.target.value),
                              }
                            : null
                        )
                      }
                      className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 font-mono text-xs text-gold-light read-only:opacity-70"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Thứ tự ưu tiên (1 = Đầu tiên)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={editing.priorityOrder}
                      onChange={(e) =>
                        setEditing((prev) =>
                          prev
                            ? { ...prev, priorityOrder: Number(e.target.value) }
                            : null
                        )
                      }
                      className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary tabular-nums-fin"
                    />
                  </div>
                </div>

                {/* Referral Link */}
                <div className="rounded-xl border border-gold/40 bg-gold/5 p-4">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gold-light">
                    Đường dẫn Đăng ký Tài khoản Đối tác (Referral Link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://... (Để trống nếu muốn khóa nút Đăng ký chờ cập nhật)"
                    value={editing.referralUrl ?? ""}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev ? { ...prev, referralUrl: e.target.value } : null
                      )
                    }
                    className="h-10 w-full rounded-input border border-line-strong bg-card px-3.5 text-sm text-ink-primary"
                  />
                </div>

                <ImageUploadField
                  label="Logo Sàn giao dịch (Upload tệp hoặc dán link URL)"
                  value={editing.logo}
                  onChange={(url) =>
                    setEditing((prev) => (prev ? { ...prev, logo: url } : null))
                  }
                  folder="brokers"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Câu khẩu hiệu ngắn (Tagline)
                    </label>
                    <input
                      type="text"
                      value={editing.tagline}
                      onChange={(e) =>
                        setEditing((prev) =>
                          prev ? { ...prev, tagline: e.target.value } : null
                        )
                      }
                      className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Nhãn Badge trên Hero (VD: FEATURED BROKER)
                    </label>
                    <input
                      type="text"
                      value={editing.badge ?? ""}
                      onChange={(e) =>
                        setEditing((prev) =>
                          prev ? { ...prev, badge: e.target.value } : null
                        )
                      }
                      className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-gold-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                    Mô tả ngắn ngoài thẻ danh sách Sàn
                  </label>
                  <textarea
                    rows={2}
                    value={editing.shortDescription}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev
                          ? { ...prev, shortDescription: e.target.value }
                          : null
                      )
                    }
                    className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Bài viết Tổng quan trang chi tiết (Mỗi dòng 1 đoạn)
                    </label>
                    <textarea
                      rows={5}
                      value={overviewText}
                      onChange={(e) => setOverviewText(e.target.value)}
                      className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-xs leading-relaxed text-ink-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Điểm nhấn nổi bật có dấu tích (Mỗi dòng 1 ý)
                    </label>
                    <textarea
                      rows={5}
                      value={highlightsText}
                      onChange={(e) => setHighlightsText(e.target.value)}
                      className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-xs leading-relaxed text-ink-primary"
                    />
                  </div>
                </div>

                {/* Optional External Client Portal (like BCR) */}
                <div className="grid gap-4 rounded-xl border border-line bg-background-secondary/60 p-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                      Link Cổng Đăng nhập Sàn riêng (Tùy chọn, như BCR)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={portalUrl}
                      onChange={(e) => setPortalUrl(e.target.value)}
                      className="h-9 w-full rounded border border-line-strong bg-card px-3 text-xs text-ink-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                      Ghi chú tách biệt Cổng sàn &amp; Kiểm tra Rebate
                    </label>
                    <input
                      type="text"
                      value={portalNote}
                      onChange={(e) => setPortalNote(e.target.value)}
                      className="h-9 w-full rounded border border-line-strong bg-card px-3 text-xs text-ink-secondary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ACCOUNTS & TRADING CONDITIONS */}
            {editorTab === "accounts" && (
              <div className="space-y-6">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                    Nhãn Tóm tắt Loại Tài khoản (Hiển thị ở Bảng So sánh /brokers)
                  </label>
                  <input
                    type="text"
                    value={editing.accountsTableLabel}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev
                          ? { ...prev, accountsTableLabel: e.target.value }
                          : null
                      )
                    }
                    placeholder="VD: STD05 (Mặc định) / STD"
                    className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary"
                  />
                </div>

                {/* Full Accounts Repeater */}
                <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                      Danh sách Loại Tài khoản Chi tiết
                    </span>
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      onClick={() =>
                        setEditing((prev) =>
                          prev
                            ? {
                                ...prev,
                                accounts: [
                                  ...prev.accounts,
                                  {
                                    id: `${prev.slug || "brk"}-acc-${Date.now()}`,
                                    code: "STD",
                                    name: "Tài khoản Standard",
                                    isDefault: prev.accounts.length === 0,
                                    description: "",
                                    goldSpread: null,
                                    spreadNote: "",
                                    commission: null,
                                    minDeposit: null,
                                    leverage: null,
                                    status: "confirmed",
                                  },
                                ],
                              }
                            : null
                        )
                      }
                    >
                      <Plus className="h-3.5 w-3.5" /> Thêm loại tài khoản
                    </Button>
                  </div>

                  {editing.accounts.map((acc, idx) => (
                    <div
                      key={acc.id || idx}
                      className="space-y-3 rounded-xl border border-line bg-card p-4"
                    >
                      <div className="grid gap-2.5 sm:grid-cols-12">
                        <input
                          type="text"
                          placeholder="Mã (VD: STD05)"
                          value={acc.code}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev) return null;
                              const copy = [...prev.accounts];
                              copy[idx] = { ...copy[idx], code: val };
                              return { ...prev, accounts: copy };
                            });
                          }}
                          className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs font-bold text-gold-light sm:col-span-2"
                        />
                        <input
                          type="text"
                          placeholder="Tên tài khoản"
                          value={acc.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev) return null;
                              const copy = [...prev.accounts];
                              copy[idx] = { ...copy[idx], name: val };
                              return { ...prev, accounts: copy };
                            });
                          }}
                          className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-primary sm:col-span-4"
                        />
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Gold Spread (VD: 36)"
                          value={acc.goldSpread ?? ""}
                          onChange={(e) => {
                            const raw = e.target.value;
                            setEditing((prev) => {
                              if (!prev) return null;
                              const copy = [...prev.accounts];
                              copy[idx] = {
                                ...copy[idx],
                                goldSpread: raw === "" ? null : Number(raw),
                              };
                              return { ...prev, accounts: copy };
                            });
                          }}
                          className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-primary tabular-nums-fin sm:col-span-3"
                        />
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-gold-light sm:col-span-2">
                          <input
                            type="radio"
                            name="defaultBrokerAcc"
                            checked={acc.isDefault}
                            onChange={() =>
                              setEditing((prev) => {
                                if (!prev) return null;
                                return {
                                  ...prev,
                                  accounts: prev.accounts.map((a, i) => ({
                                    ...a,
                                    isDefault: i === idx,
                                  })),
                                };
                              })
                            }
                            className="accent-[#00C2FF]"
                          />
                          <span>Mặc định</span>
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setEditing((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    accounts: prev.accounts.filter(
                                      (_, i) => i !== idx
                                    ),
                                  }
                                : null
                            )
                          }
                          className="flex h-9 items-center justify-center rounded text-danger hover:bg-danger-muted sm:col-span-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid gap-2.5 sm:grid-cols-3">
                        <input
                          type="text"
                          placeholder="Commission (VD: $0 hoặc $7/lot)"
                          value={acc.commission ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev) return null;
                              const copy = [...prev.accounts];
                              copy[idx] = {
                                ...copy[idx],
                                commission: val || null,
                              };
                              return { ...prev, accounts: copy };
                            });
                          }}
                          className="h-8 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-primary"
                        />
                        <input
                          type="text"
                          placeholder="Nạp tối thiểu (VD: $50)"
                          value={acc.minDeposit ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev) return null;
                              const copy = [...prev.accounts];
                              copy[idx] = {
                                ...copy[idx],
                                minDeposit: val || null,
                              };
                              return { ...prev, accounts: copy };
                            });
                          }}
                          className="h-8 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-primary"
                        />
                        <input
                          type="text"
                          placeholder="Đòn bẩy tối đa (VD: 1:500)"
                          value={acc.leverage ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev) return null;
                              const copy = [...prev.accounts];
                              copy[idx] = {
                                ...copy[idx],
                                leverage: val || null,
                              };
                              return { ...prev, accounts: copy };
                            });
                          }}
                          className="h-8 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-primary"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Mô tả tài khoản"
                        value={acc.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.accounts];
                            copy[idx] = { ...copy[idx], description: val };
                            return { ...prev, accounts: copy };
                          });
                        }}
                        className="h-8 w-full rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-secondary"
                      />
                    </div>
                  ))}
                </div>

                {/* Trading Conditions Key-Value Repeater */}
                <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                      Bảng Thông số Điều kiện Giao dịch (Trading Conditions)
                    </span>
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      onClick={() =>
                        setEditing((prev) =>
                          prev
                            ? {
                                ...prev,
                                tradingConditions: [
                                  ...prev.tradingConditions,
                                  { label: "", value: "" },
                                ],
                              }
                            : null
                        )
                      }
                    >
                      <Plus className="h-3.5 w-3.5" /> Thêm thông số
                    </Button>
                  </div>

                  {editing.tradingConditions.map((cond, idx) => (
                    <div key={idx} className="grid gap-2 sm:grid-cols-12">
                      <input
                        type="text"
                        placeholder="Tên thông số"
                        value={cond.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.tradingConditions];
                            copy[idx] = { ...copy[idx], label: val };
                            return { ...prev, tradingConditions: copy };
                          });
                        }}
                        className="h-9 rounded border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-5"
                      />
                      <input
                        type="text"
                        placeholder="Giá trị hiển thị"
                        value={cond.value}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.tradingConditions];
                            copy[idx] = {
                              ...copy[idx],
                              value: val,
                              isPending: val.includes("Đang cập nhật"),
                            };
                            return { ...prev, tradingConditions: copy };
                          });
                        }}
                        className="h-9 rounded border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-6"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditing((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  tradingConditions:
                                    prev.tradingConditions.filter(
                                      (_, i) => i !== idx
                                    ),
                                }
                              : null
                          )
                        }
                        className="flex h-9 items-center justify-center rounded text-danger hover:bg-danger-muted sm:col-span-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PLATFORMS & TRADING PRODUCTS */}
            {editorTab === "platforms" && (
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase text-ink-secondary">
                      Nền tảng giao dịch (Hỗ trợ bộ lọc MT4 / MT5)
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {ALL_PLATFORMS.map((plat) => (
                        <label
                          key={plat}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-background-secondary px-3 py-2 text-xs font-semibold text-ink-primary"
                        >
                          <input
                            type="checkbox"
                            checked={editing.platforms.includes(plat)}
                            onChange={() => togglePlatform(plat)}
                            className="h-4 w-4 accent-[#00C2FF]"
                          />
                          <span>{plat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="mb-2 block text-xs font-semibold uppercase text-ink-secondary">
                      Nhóm thị trường (Categories)
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {ALL_CATEGORIES.map((cat) => (
                        <label
                          key={cat}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-background-secondary px-3 py-2 text-xs font-semibold text-ink-primary"
                        >
                          <input
                            type="checkbox"
                            checked={editing.categories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="h-4 w-4 accent-[#00C2FF]"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                    Mô tả khu vực Nền tảng giao dịch
                  </label>
                  <input
                    type="text"
                    value={editing.platformsNote}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev ? { ...prev, platformsNote: e.target.value } : null
                      )
                    }
                    className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                  />
                </div>

                {/* Trading Products Repeater */}
                <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                      Danh mục Sản phẩm Giao dịch (Trading Products)
                    </span>
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      onClick={() =>
                        setEditing((prev) =>
                          prev
                            ? {
                                ...prev,
                                tradingProducts: [
                                  ...prev.tradingProducts,
                                  {
                                    code: `PROD_${Date.now()}`,
                                    name: "",
                                    symbolExample: "",
                                    description: "",
                                  },
                                ],
                              }
                            : null
                        )
                      }
                    >
                      <Plus className="h-3.5 w-3.5" /> Thêm nhóm sản phẩm
                    </Button>
                  </div>

                  {editing.tradingProducts.map((prod, idx) => (
                    <div
                      key={idx}
                      className="grid gap-2 rounded-lg border border-line bg-card p-3 sm:grid-cols-12"
                    >
                      <input
                        type="text"
                        placeholder="Tên nhóm (VD: Kim loại quý)"
                        value={prod.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.tradingProducts];
                            copy[idx] = { ...copy[idx], name: val };
                            return { ...prev, tradingProducts: copy };
                          });
                        }}
                        className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs font-bold text-ink-primary sm:col-span-3"
                      />
                      <input
                        type="text"
                        placeholder="Mã ví dụ (XAUUSD, XAGUSD)"
                        value={prod.symbolExample}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.tradingProducts];
                            copy[idx] = { ...copy[idx], symbolExample: val };
                            return { ...prev, tradingProducts: copy };
                          });
                        }}
                        className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-gold-light sm:col-span-3"
                      />
                      <input
                        type="text"
                        placeholder="Mô tả"
                        value={prod.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.tradingProducts];
                            copy[idx] = { ...copy[idx], description: val };
                            return { ...prev, tradingProducts: copy };
                          });
                        }}
                        className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-secondary sm:col-span-5"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditing((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  tradingProducts: prev.tradingProducts.filter(
                                    (_, i) => i !== idx
                                  ),
                                }
                              : null
                          )
                        }
                        className="flex h-9 items-center justify-center rounded text-danger hover:bg-danger-muted sm:col-span-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: BACKCOM POLICY & CALCULATOR SYMBOL RULES */}
            {editorTab === "rebate" && editing.rebateConfig && (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                      Nhãn Tóm tắt Rebate (Hiển thị ở Bảng So sánh /brokers)
                    </label>
                    <input
                      type="text"
                      value={editing.rebateTableLabel}
                      onChange={(e) =>
                        setEditing((prev) =>
                          prev
                            ? { ...prev, rebateTableLabel: e.target.value }
                            : null
                        )
                      }
                      placeholder="VD: Up to $19.8/Lot hoặc Liên hệ"
                      className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-gold-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-ink-secondary">
                    Tóm tắt Chính sách Hoàn phí trên Trang Chi tiết Sàn
                  </label>
                  <textarea
                    rows={3}
                    value={editing.rebateConfig.policySummary}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev?.rebateConfig
                          ? {
                              ...prev,
                              rebateConfig: {
                                ...prev.rebateConfig,
                                policySummary: e.target.value,
                              },
                            }
                          : prev
                      )
                    }
                    className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-xs text-ink-primary"
                  />
                </div>

                <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                      Biểu phí Hoàn trả cho Công cụ Calculator (Symbol Rules)
                    </span>
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      onClick={() =>
                        setEditing((prev) =>
                          prev?.rebateConfig
                            ? {
                                ...prev,
                                rebateConfig: {
                                  ...prev.rebateConfig,
                                  symbolRules: [
                                    ...prev.rebateConfig.symbolRules,
                                    {
                                      symbol: "XAUUSD",
                                      label: "XAUUSD (Gold)",
                                      officialRate: null,
                                      demoSuggestedRate: 5,
                                      unitLabel: "USD / Lot",
                                      method: "PER_LOT",
                                      note: "",
                                    },
                                  ],
                                },
                              }
                            : prev
                        )
                      }
                    >
                      <Plus className="h-3.5 w-3.5" /> Thêm mã tính phí
                    </Button>
                  </div>

                  {editing.rebateConfig.symbolRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="space-y-2 rounded-lg border border-line bg-card p-3"
                    >
                      <div className="grid gap-2 sm:grid-cols-12">
                        <input
                          type="text"
                          placeholder="Mã (XAUUSD)"
                          value={rule.symbol}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev?.rebateConfig) return prev;
                              const copy = [...prev.rebateConfig.symbolRules];
                              copy[idx] = { ...copy[idx], symbol: val };
                              return {
                                ...prev,
                                rebateConfig: {
                                  ...prev.rebateConfig,
                                  symbolRules: copy,
                                },
                              };
                            });
                          }}
                          className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs font-bold text-ink-primary sm:col-span-2"
                        />
                        <input
                          type="text"
                          placeholder="Tên hiển thị"
                          value={rule.label}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev?.rebateConfig) return prev;
                              const copy = [...prev.rebateConfig.symbolRules];
                              copy[idx] = { ...copy[idx], label: val };
                              return {
                                ...prev,
                                rebateConfig: {
                                  ...prev.rebateConfig,
                                  symbolRules: copy,
                                },
                              };
                            });
                          }}
                          className="h-9 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-primary sm:col-span-3"
                        />
                        <select
                          value={rule.method}
                          onChange={(e) => {
                            const method = e.target
                              .value as RebateCalculationMethod;
                            setEditing((prev) => {
                              if (!prev?.rebateConfig) return prev;
                              const copy = [...prev.rebateConfig.symbolRules];
                              copy[idx] = { ...copy[idx], method };
                              return {
                                ...prev,
                                rebateConfig: {
                                  ...prev.rebateConfig,
                                  symbolRules: copy,
                                },
                              };
                            });
                          }}
                          className="h-9 rounded border border-line-strong bg-background-secondary px-2 text-xs text-ink-primary sm:col-span-3"
                        >
                          <option value="PER_LOT">PER_LOT ($/Lot)</option>
                          <option value="PER_COMMISSION">
                            PER_COMMISSION (% Comm)
                          </option>
                          <option value="PER_VOLUME">
                            PER_VOLUME ($/1M Vol)
                          </option>
                        </select>
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Mức chính thức ($)"
                          value={rule.officialRate ?? ""}
                          onChange={(e) => {
                            const raw = e.target.value;
                            setEditing((prev) => {
                              if (!prev?.rebateConfig) return prev;
                              const copy = [...prev.rebateConfig.symbolRules];
                              copy[idx] = {
                                ...copy[idx],
                                officialRate: raw === "" ? null : Number(raw),
                              };
                              return {
                                ...prev,
                                rebateConfig: {
                                  ...prev.rebateConfig,
                                  symbolRules: copy,
                                },
                              };
                            });
                          }}
                          className="h-9 rounded border border-gold/45 bg-background-secondary px-2.5 text-xs font-bold text-gold-light tabular-nums-fin sm:col-span-3"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditing((prev) => {
                              if (!prev?.rebateConfig) return prev;
                              return {
                                ...prev,
                                rebateConfig: {
                                  ...prev.rebateConfig,
                                  symbolRules:
                                    prev.rebateConfig.symbolRules.filter(
                                      (_, i) => i !== idx
                                    ),
                                },
                              };
                            })
                          }
                          className="flex h-9 items-center justify-center rounded text-danger hover:bg-danger-muted sm:col-span-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Ghi chú áp dụng cho mã này"
                        value={rule.note}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev?.rebateConfig) return prev;
                            const copy = [...prev.rebateConfig.symbolRules];
                            copy[idx] = { ...copy[idx], note: val };
                            return {
                              ...prev,
                              rebateConfig: {
                                ...prev.rebateConfig,
                                symbolRules: copy,
                              },
                            };
                          });
                        }}
                        className="h-8 w-full rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-secondary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: TRUST REVIEWS, REGULATION & BROKER FAQS */}
            {editorTab === "trust" && (
              <div className="space-y-6">
                <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
                  <span className="block text-xs font-bold uppercase tracking-wider text-gold-light">
                    Thông tin Pháp lý &amp; Đánh giá Độc lập (Regulation,
                    License, Trustpilot, WikiFX, Myfxbook)
                  </span>

                  {editing.trustReviews.map((rev, idx) => (
                    <div
                      key={rev.platform}
                      className="grid gap-2 rounded-lg border border-line bg-card p-3 sm:grid-cols-12"
                    >
                      <div className="flex items-center font-heading text-xs font-bold text-ink-primary sm:col-span-2">
                        {rev.platform}
                      </div>
                      <input
                        type="text"
                        placeholder="Điểm / Giấy phép (Để trống = Chưa cập nhật)"
                        value={rev.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.trustReviews];
                            copy[idx] = {
                              ...copy[idx],
                              value: val || null,
                              status: val ? "confirmed" : "pending",
                            };
                            return { ...prev, trustReviews: copy };
                          });
                        }}
                        className="h-8 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-gold-light sm:col-span-4"
                      />
                      <input
                        type="url"
                        placeholder="Link nguồn gốc https://..."
                        value={rev.sourceUrl ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.trustReviews];
                            copy[idx] = {
                              ...copy[idx],
                              sourceUrl: val || null,
                            };
                            return { ...prev, trustReviews: copy };
                          });
                        }}
                        className="h-8 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-primary sm:col-span-4"
                      />
                      <input
                        type="text"
                        placeholder="Ngày cập nhật"
                        value={rev.updatedAt ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.trustReviews];
                            copy[idx] = {
                              ...copy[idx],
                              updatedAt: val || null,
                            };
                            return { ...prev, trustReviews: copy };
                          });
                        }}
                        className="h-8 rounded border border-line-strong bg-background-secondary px-2.5 text-xs text-ink-secondary sm:col-span-2"
                      />
                    </div>
                  ))}
                </div>

                {/* Broker Specific FAQs */}
                <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                      Câu hỏi Thường gặp Riêng của Sàn {editing.shortName}
                    </span>
                    <Button
                      type="button"
                      variant="subtle"
                      size="sm"
                      onClick={() =>
                        setEditing((prev) =>
                          prev
                            ? {
                                ...prev,
                                faqs: [
                                  ...prev.faqs,
                                  {
                                    id: `faq-${Date.now()}`,
                                    question: "",
                                    answer: "",
                                  },
                                ],
                              }
                            : null
                        )
                      }
                    >
                      <Plus className="h-3.5 w-3.5" /> Thêm câu hỏi
                    </Button>
                  </div>

                  {editing.faqs.map((faq, idx) => (
                    <div
                      key={faq.id || idx}
                      className="space-y-2 rounded-lg border border-line bg-card p-3"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Câu hỏi"
                          value={faq.question}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditing((prev) => {
                              if (!prev) return null;
                              const copy = [...prev.faqs];
                              copy[idx] = { ...copy[idx], question: val };
                              return { ...prev, faqs: copy };
                            });
                          }}
                          className="h-8 flex-1 rounded border border-line-strong bg-background-secondary px-2.5 text-xs font-bold text-ink-primary"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setEditing((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    faqs: prev.faqs.filter((_, i) => i !== idx),
                                  }
                                : null
                            )
                          }
                          className="rounded p-1.5 text-danger hover:bg-danger-muted"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Câu trả lời"
                        value={faq.answer}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditing((prev) => {
                            if (!prev) return null;
                            const copy = [...prev.faqs];
                            copy[idx] = { ...copy[idx], answer: val };
                            return { ...prev, faqs: copy };
                          });
                        }}
                        className="w-full rounded border border-line-strong bg-background-secondary p-2.5 text-xs text-ink-secondary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
              <div className="flex flex-wrap items-center gap-5">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-primary">
                  <input
                    type="checkbox"
                    checked={editing.isPublished !== false}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev ? { ...prev, isPublished: e.target.checked } : null
                      )
                    }
                    className="h-4 w-4 accent-[#00C2FF]"
                  />
                  <span>Hiển thị công khai trên Website</span>
                </label>

                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gold-light">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) =>
                      setEditing((prev) =>
                        prev ? { ...prev, featured: e.target.checked } : null
                      )
                    }
                    className="h-4 w-4 accent-[#00C2FF]"
                  />
                  <span>Gắn nhãn FEATURED BROKER ưu tiên</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditing(null)}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? "Đang lưu..." : "Lưu Toàn bộ Thông tin Sàn"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* Brokers List */}
      <div className="grid gap-4">
        {items.map((broker) => (
          <Card
            key={broker.slug}
            className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={broker.logo}
                alt={broker.name}
                className="h-11 w-32 shrink-0 rounded-lg object-contain"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {broker.featured && (
                    <Badge variant="featured">FEATURED</Badge>
                  )}
                  {broker.isPublished !== false ? (
                    <Badge variant="success">Đang hiển thị</Badge>
                  ) : (
                    <Badge variant="neutral">Đang ẩn</Badge>
                  )}
                  {broker.referralUrl ? (
                    <Badge variant="gold">Đã gắn Link Referral</Badge>
                  ) : (
                    <Badge variant="pending">Chưa gắn Link Referral</Badge>
                  )}
                </div>
                <h3 className="mt-1 font-heading text-lg font-bold text-ink-primary">
                  {broker.name}{" "}
                  <span className="font-mono text-xs font-normal text-ink-muted">
                    (/brokers/{broker.slug})
                  </span>
                </h3>
                <p className="text-xs text-ink-secondary">
                  Tài khoản: {broker.accountsTableLabel} • Nền tảng:{" "}
                  {broker.platforms.length > 0
                    ? broker.platforms.join(" / ")
                    : "Đang cập nhật"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/brokers/${broker.slug}`}
                target="_blank"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-background-secondary px-3 text-xs font-semibold text-ink-secondary hover:border-gold/45 hover:text-gold-light"
              >
                <span>Xem</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Button
                type="button"
                variant="subtle"
                size="sm"
                onClick={() => handleTogglePublish(broker)}
              >
                {broker.isPublished !== false ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" /> Ẩn
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" /> Hiện
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => openEditor(broker, false)}
              >
                <Edit3 className="h-3.5 w-3.5" />
                Chỉnh sửa Sàn
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(broker.slug, broker.name)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 bg-danger-muted text-danger hover:bg-danger/20"
                title="Xóa sàn giao dịch"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
