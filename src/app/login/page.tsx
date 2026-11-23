import { redirect } from "next/navigation";
import { getCurrentUserSession, isGoogleOAuthConfigured } from "@/lib/auth";
import { LoginCard } from "@/components/auth/auth-forms";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Đăng nhập Tài khoản & Quản trị",
  description:
    "Đăng nhập tài khoản thành viên hoặc quản trị viên hệ sinh thái Backcom Mr Leo.",
  path: "/login",
});

interface LoginPageProps {
  searchParams: Promise<{ oauth?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getCurrentUserSession();
  if (session) {
    redirect(session.role === "admin" ? "/admin" : "/account");
  }

  const params = await searchParams;

  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-hero-glow" />
      <div className="container relative z-10">
        <LoginCard
          oauthNoticeKey={params.oauth}
          googleConfigured={isGoogleOAuthConfigured()}
        />
      </div>
    </section>
  );
}
