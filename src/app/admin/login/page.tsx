import { redirect } from "next/navigation";
import { getAdminAuthStatus, getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/login-form";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Đăng nhập Quản trị viên (Admin)",
  description: "Cổng đăng nhập quản trị nội dung Backcom Mr Leo.",
  path: "/admin/login",
  noIndex: true,
});

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.authenticated) {
    redirect("/admin");
  }

  const status = getAdminAuthStatus();

  return (
    <AdminLoginForm
      configured={status.configured}
      defaultUsername={status.expectedUsername}
      configReason={status.reason}
    />
  );
}
