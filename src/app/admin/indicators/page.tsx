import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import {
  getAllIndicatorsAdmin,
  getAllLeadsAdmin,
  getCmsStorageInfo,
} from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { IndicatorsManager } from "@/components/admin/indicators-manager";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Quản lý Chỉ báo Indicator — Admin",
  description: "Quản trị danh sách chỉ báo TradingView & MT5.",
  path: "/admin/indicators",
  noIndex: true,
});

export default async function AdminIndicatorsPage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, indicators, leads] = await Promise.all([
    getCmsStorageInfo(),
    getAllIndicatorsAdmin(),
    getAllLeadsAdmin(),
  ]);

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={leads.filter((l) => l.status === "new").length}
    >
      <IndicatorsManager initialItems={indicators} />
    </AdminShell>
  );
}
