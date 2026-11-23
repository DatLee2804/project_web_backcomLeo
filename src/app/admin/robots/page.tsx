import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import {
  getAllLeadsAdmin,
  getAllRobotsAdmin,
  getCmsStorageInfo,
} from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { RobotsManager } from "@/components/admin/robots-manager";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Quản lý Bot Trading — Admin",
  description: "Quản trị danh mục sản phẩm Bot EA.",
  path: "/admin/robots",
  noIndex: true,
});

export default async function AdminRobotsPage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, robots, leads] = await Promise.all([
    getCmsStorageInfo(),
    getAllRobotsAdmin(),
    getAllLeadsAdmin(),
  ]);

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={leads.filter((l) => l.status === "new").length}
    >
      <RobotsManager initialItems={robots} />
    </AdminShell>
  );
}
