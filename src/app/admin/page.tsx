import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import {
  getAllBrokersAdmin,
  getAllIndicatorsAdmin,
  getAllLeadsAdmin,
  getAllMastersAdmin,
  getAllRobotsAdmin,
  getCmsStorageInfo,
} from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Bảng điều khiển Admin",
  description: "Quản trị sản phẩm và nội dung hệ sinh thái Backcom Mr Leo.",
  path: "/admin",
  noIndex: true,
});

export default async function AdminHomePage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, indicators, robots, masters, brokers, leads] =
    await Promise.all([
      getCmsStorageInfo(),
      getAllIndicatorsAdmin(),
      getAllRobotsAdmin(),
      getAllMastersAdmin(),
      getAllBrokersAdmin(),
      getAllLeadsAdmin(),
    ]);

  const newLeads = leads.filter((l) => l.status === "new").length;

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={newLeads}
    >
      <DashboardOverview
        counts={{
          indicators: indicators.length,
          robots: robots.length,
          masters: masters.length,
          brokers: brokers.length,
          totalLeads: leads.length,
          newLeads,
        }}
        storageInfo={storageInfo}
      />
    </AdminShell>
  );
}
