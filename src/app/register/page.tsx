import { redirect } from "next/navigation";
import { getCurrentUserSession, isGoogleOAuthConfigured } from "@/lib/auth";
import { RegisterCard } from "@/components/auth/auth-forms";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Đăng ký Tài khoản Thành viên",
  description:
    "Tạo tài khoản miễn phí trong hệ sinh thái Backcom Mr Leo bằng Email hoặc Google.",
  path: "/register",
});

export default async function RegisterPage() {
  const session = await getCurrentUserSession();
  if (session) {
    redirect(session.role === "admin" ? "/admin" : "/account");
  }

  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-hero-glow" />
      <div className="container relative z-10">
        <RegisterCard googleConfigured={isGoogleOAuthConfigured()} />
      </div>
    </section>
  );
}
