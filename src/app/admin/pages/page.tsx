import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import {
  getAllLeadsAdmin,
  getCmsStorageInfo,
  getSitePagesContentAdmin,
} from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { PagesContentManager } from "@/components/admin/pages-content-manager";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Quản lý Nội dung & Video Các Trang — Admin",
  description:
    "Chỉnh sửa nội dung, hình ảnh và video của Trang chủ, Backcom và Sàn giao dịch.",
  path: "/admin/pages",
  noIndex: true,
});

export default async function AdminPagesContentPage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, sitePages, leads] = await Promise.all([
    getCmsStorageInfo(),
    getSitePagesContentAdmin(),
    getAllLeadsAdmin(),
  ]);

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={leads.filter((l) => l.status === "new").length}
    >
      <PagesContentManager initialContent={sitePages} />
    </AdminShell>
  );
}
