import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAllLeadsAdmin, getCmsStorageInfo } from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { LeadsManager } from "@/components/admin/leads-manager";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Quản lý Khách hàng Tư vấn — Admin",
  description: "Danh sách khách hàng gửi biểu mẫu tư vấn trên website.",
  path: "/admin/leads",
  noIndex: true,
});

export default async function AdminLeadsPage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, leads] = await Promise.all([
    getCmsStorageInfo(),
    getAllLeadsAdmin(),
  ]);

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={leads.filter((l) => l.status === "new").length}
    >
      <LeadsManager initialItems={leads} />
    </AdminShell>
  );
}
