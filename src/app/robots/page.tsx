import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  Server,
} from "lucide-react";
import { tradingRobots } from "@/data/robots";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Bot Trading & Giải pháp Expert Advisor (EA MT5)",
  description:
    "Danh mục các sản phẩm Bot Trading tự động hóa trên nền tảng MetaTrader 5 thuộc hệ sinh thái Backcom Mr Leo — nổi bật với AMIX TRADE – GOLD CENT BOT.",
  path: "/robots",
});

export default function RobotsPage() {
  const firstBot = tradingRobots[0];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge variant="gold">ALGORITHMIC BOT TRADING</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
              AUTOMATED TRADING SOLUTIONS
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
              Ứng dụng hệ thống Bot giao dịch tự động (Expert Advisor) trên nền
              tảng MetaTrader 5 nhằm chuẩn hóa quy tắc quản lý vị thế, giảm
              thiểu sai lầm cảm tính và cộng hưởng tối ưu cùng cơ chế hoàn phí
              Backcom.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              {firstBot && (
                <a
                  href="#bot-list"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" })
                  )}
                >
                  Xem danh sách Bot Trading
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                Tư vấn hạ tầng Bot &amp; VPS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bot List Showcase */}
      <section id="bot-list" className="scroll-mt-24 border-b border-line py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="BOT TRADING CATALOG"
            title="Các dòng Bot Trading trong Hệ sinh thái"
            subtitle="Chọn xem chi tiết thông số kỹ thuật, yêu cầu tài khoản và quy trình cài đặt cho từng con Bot."
          />

          <div className="mt-12 space-y-10">
            {tradingRobots.map((bot) => (
              <div
                key={bot.slug}
                className="overflow-hidden rounded-card-lg border border-gold/45 bg-card p-6 shadow-gold sm:p-10"
              >
                <div className="grid items-center gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-6">
                    <Image
                      src={bot.heroImage}
                      alt={`Giao diện minh họa ${bot.name}`}
                      width={640}
                      height={400}
                      className="w-full rounded-card border border-line"
                    />
                  </div>

                  <div className="lg:col-span-6">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="featured">{bot.badge}</Badge>
                      <Badge variant="gold">XAUUSDc • Cent Structure</Badge>
                    </div>

                    <h2 className="mt-4 font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
                      {bot.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
                      {bot.introduction[0]}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {bot.features.map((feat) => (
                        <li
                          key={feat.title}
                          className="flex items-start gap-2.5 text-sm text-ink-primary"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span>
                            <strong>{feat.title}:</strong>{" "}
                            <span className="text-ink-secondary">
                              {feat.description}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href={`/robots/${bot.slug}`}
                        className={cn(
                          buttonVariants({ variant: "primary", size: "md" })
                        )}
                      >
                        Xem chi tiết thông số &amp; Hướng dẫn
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "md" })
                        )}
                      >
                        Liên hệ cấp quyền Bot
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Standards & Risk Principles */}
      <section className="bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <Bot className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                Thực thi kỷ luật 24/5
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Tự động hóa thao tác đặt lệnh và chốt lời theo công thức định
                sẵn trên MT5 mà không bị chi phối bởi tâm lý sợ hãi hay FOMO.
              </p>
            </Card>
            <Card className="p-6">
              <Server className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                Vận hành trên hạ tầng VPS riêng
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Bot chạy trực tiếp trên tài khoản MT5 cá nhân của khách hàng đặt
                trên VPS, đảm bảo quyền tự chủ hoàn toàn về vốn và thiết lập.
              </p>
            </Card>
            <Card className="p-6">
              <Cpu className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                Kiểm soát rủi ro chủ động
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Hỗ trợ người vận hành tạm dừng trước tin tức lớn và giới hạn tỷ
                lệ sụt giảm tài sản theo ngưỡng chịu đựng cá nhân.
              </p>
            </Card>
          </div>

          <div className="mt-8 rounded-card border border-amber-400/30 bg-amber-500/[0.07] p-5 text-xs leading-relaxed text-ink-secondary sm:text-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <strong className="text-ink-primary">
                  Tuyên bố rủi ro Bot Trading:
                </strong>{" "}
                Mọi phần mềm giao dịch tự động đều tồn tại rủi ro thua lỗ khi thị
                trường biến động vượt ngoài biên độ thiết kế. Backcom Mr Leo
                không công bố số liệu lợi nhuận giả định và không cam kết lợi
                nhuận cố định dưới mọi hình thức.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
