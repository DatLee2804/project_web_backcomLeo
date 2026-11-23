import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import {
  getAllLeadsAdmin,
  getAllUsersAdmin,
  getCmsStorageInfo,
} from "@/lib/cms";
import { AdminShell } from "@/components/admin/admin-shell";
import { UsersManager } from "@/components/admin/users-manager";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Quản lý Tài khoản Thành viên — Admin",
  description: "Danh sách người dùng đăng ký và phân quyền hệ thống.",
  path: "/admin/users",
  noIndex: true,
});

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    redirect("/admin/login");
  }

  const [storageInfo, users, leads] = await Promise.all([
    getCmsStorageInfo(),
    getAllUsersAdmin(),
    getAllLeadsAdmin(),
  ]);

  const safeUsers = users.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    phoneOrZalo: u.phoneOrZalo,
    provider: u.provider,
    googleId: u.googleId,
    avatarUrl: u.avatarUrl,
    role: u.role,
    createdAt: u.createdAt,
  }));

  return (
    <AdminShell
      storageMode={storageInfo.mode}
      supabaseReady={storageInfo.supabaseReady}
      newLeadsCount={leads.filter((l) => l.status === "new").length}
    >
      <UsersManager initialItems={safeUsers} />
    </AdminShell>
  );
}
