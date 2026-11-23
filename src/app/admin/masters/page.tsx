import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import {
  getAllLeadsAdmin,
  getAllMastersAdmin,
  getCmsStorageInfo,
} from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { MastersManager } from "@/components/admin/masters-manager";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Quản lý Master Copy Trade — Admin",
  description: "Quản trị danh sách Master Traders và biểu đồ hiệu suất.",
  path: "/admin/masters",
  noIndex: true,
});

export default async function AdminMastersPage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, masters, leads] = await Promise.all([
    getCmsStorageInfo(),
    getAllMastersAdmin(),
    getAllLeadsAdmin(),
  ]);

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={leads.filter((l) => l.status === "new").length}
    >
      <MastersManager initialItems={masters} />
    </AdminShell>
  );
}
