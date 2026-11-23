import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import {
  getAllBrokersAdmin,
  getAllLeadsAdmin,
  getCmsStorageInfo,
} from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { BrokersManager } from "@/components/admin/brokers-manager";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Quản lý Sàn & Biểu phí Backcom — Admin",
  description: "Cập nhật link Referral, tài khoản và biểu phí hoàn trả.",
  path: "/admin/brokers",
  noIndex: true,
});

export default async function AdminBrokersPage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, brokers, leads] = await Promise.all([
    getCmsStorageInfo(),
    getAllBrokersAdmin(),
    getAllLeadsAdmin(),
  ]);

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={leads.filter((l) => l.status === "new").length}
    >
      <BrokersManager initialItems={brokers} />
    </AdminShell>
  );
}
