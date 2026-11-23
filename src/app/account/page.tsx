import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Bot,
  Building2,
  Calculator,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { getCurrentUserSession } from "@/lib/auth";
import { AccountLogoutButton } from "@/components/auth/account-logout-button";
import { Badge } from "@/components/ui/badge";
import { Card, InteractiveCard } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Hồ sơ Tài khoản Thành viên",
  description: "Trung tâm quản lý tài khoản thành viên hệ sinh thái Backcom Mr Leo.",
  path: "/account",
  noIndex: true,
});

export default async function AccountPage() {
  const user = await getCurrentUserSession();
  if (!user) {
    redirect("/login");
  }

  const quickModules = [
    {
      title: "Ước tính Hoàn phí Backcom",
      desc: "Tính toán khoản hoàn phí hàng tháng theo từng sàn và loại tài khoản.",
      href: "/tools/calculator",
      icon: Calculator,
    },
    {
      title: "Kết nối 5 Sàn Đối tác",
      desc: "Xem cấu hình Austex STD05, Exness, Tickmill, FxPro và BCR.",
      href: "/brokers",
      icon: Building2,
    },
    {
      title: "Thư viện Chỉ báo Indicator",
      desc: "Khám phá bộ công cụ TradingView & MT5 dành cho thành viên.",
      href: "/tools",
      icon: BarChart2,
    },
    {
      title: "Giải pháp Bot Trading",
      desc: "Xem thông số kỹ thuật và quy trình cài đặt EA trên MT5.",
      href: "/robots",
      icon: Bot,
    },
  ];

  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="container max-w-5xl space-y-8">
        {/* Profile Header Card */}
        <Card className="tech-glass-panel border-line-strong p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="h-16 w-16 rounded-2xl border border-gold/50 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient font-heading text-xl font-extrabold text-[#020813] shadow-gold">
                  {user.fullName.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {user.role === "admin" ? (
                    <Badge variant="featured">QUẢN TRỊ VIÊN (ADMIN)</Badge>
                  ) : (
                    <Badge variant="gold">THÀNH VIÊN HỆ SINH THÁI</Badge>
                  )}
                  <Badge variant="neutral">
                    {user.provider === "google"
                      ? "Google Account"
                      : "Email Account"}
                  </Badge>
                </div>

                <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
                  Xin chào, {user.fullName}
                </h1>
                <p className="text-xs text-ink-secondary sm:text-sm">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" })
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Vào Bảng Quản trị Admin
                </Link>
              )}
              <AccountLogoutButton />
            </div>
          </div>
        </Card>

        {/* Quick Ecosystem Actions */}
        <div>
          <h2 className="font-heading text-xl font-bold text-ink-primary">
            Tiện ích Dành cho Thành viên
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {quickModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <InteractiveCard
                  key={mod.href}
                  className="flex flex-col justify-between p-6"
                >
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold-light">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                      {mod.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                      {mod.desc}
                    </p>
                  </div>

                  <Link
                    href={mod.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-gold-light hover:underline"
                  >
                    <span>Truy cập ngay</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </InteractiveCard>
              );
            })}
          </div>
        </div>

        {/* IB Link Request Banner */}
        <Card className="flex flex-col items-start justify-between gap-4 border-gold/35 p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
            <div>
              <h3 className="font-heading text-base font-bold text-ink-primary">
                Xác nhận liên kết ID Tài khoản Sàn nhận Backcom
              </h3>
              <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
                Gửi số ID tài khoản giao dịch (không gửi mật khẩu) để đội ngũ
                kích hoạt hoàn phí và cấp quyền bộ Indicator/Bot.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "shrink-0"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            Gửi yêu cầu liên kết
          </Link>
        </Card>
      </div>
    </div>
  );
}
