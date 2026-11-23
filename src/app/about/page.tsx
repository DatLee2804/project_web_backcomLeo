import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Eye,
  Layers,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { getLiveBrokers } from "@/lib/cms";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONFIG, constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Về Backcom Mr Leo — Định vị Thương hiệu & Hệ sinh thái Trading",
  description:
    "Tìm hiểu câu chuyện thương hiệu, sứ mệnh, tầm nhìn và cấu trúc hệ sinh thái hỗ trợ nhà giao dịch Forex của Backcom Mr Leo tại Việt Nam.",
  path: "/about",
});

export default async function AboutPage() {
  const brokers = await getLiveBrokers();

  return (
    <div className="bg-background">
      {/* Brand Story Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10 max-w-4xl">
          <Badge variant="gold">ABOUT BACKCOM MR LEO</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
            Kiến tạo Hệ sinh thái hỗ trợ Trader{" "}
            <span className="text-gold-gradient">Minh bạch &amp; Bền vững</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-secondary sm:text-lg">
            <strong>BACKCOM MR LEO</strong> được định hình với triết lý cốt lõi{" "}
            <em className="text-gold-light">&ldquo;TRADE SMARTER. GET MORE BACK.&rdquo;</em>{" "}
            — không chỉ dừng lại ở dịch vụ hoàn phí giao dịch đơn thuần mà hướng
            tới một hệ sinh thái công cụ, kết nối đa sàn và cộng đồng kỷ luật
            dành cho nhà giao dịch tại Việt Nam.
          </p>
        </div>
      </section>

      {/* Brand Story + Mission & Vision */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="p-7">
              <Compass className="h-6 w-6 text-gold" />
              <h2 className="mt-4 font-heading text-xl font-bold text-ink-primary">
                Câu chuyện Thương hiệu
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Trên thị trường ngoại hối, rất nhiều nhà giao dịch tập trung tìm
                kiếm điểm vào lệnh nhưng lại bỏ qua bài toán tối ưu chi phí
                spread/commission dài hạn và thiếu hụt bộ công cụ kiểm soát rủi
                ro chuẩn mực. Backcom Mr Leo ra đời để giải quyết đồng thời hai
                nhu cầu thiết thực đó trên nền tảng minh bạch dữ liệu.
              </p>
            </Card>

            <Card className="p-7">
              <Target className="h-6 w-6 text-gold" />
              <h2 className="mt-4 font-heading text-xl font-bold text-ink-primary">
                Sứ mệnh (Mission)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Giúp nhà giao dịch cá nhân và đối tác IB tối ưu chi phí giao
                dịch hợp pháp thông qua cơ chế hoàn phí minh bạch, đồng thời
                cung cấp các giải pháp công nghệ (Calculator, Indicator, Robot
                EA) kèm cảnh báo rủi ro trung thực.
              </p>
            </Card>

            <Card className="p-7">
              <Eye className="h-6 w-6 text-gold" />
              <h2 className="mt-4 font-heading text-xl font-bold text-ink-primary">
                Tầm nhìn (Vision)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Trở thành hệ sinh thái Fintech &amp; Trading Support đáng tin
                cậy tại Việt Nam, nơi mọi thông tin về điều kiện tài khoản sàn,
                mô hình hoàn phí và công cụ giao dịch đều được trình bày rõ
                ràng, có nguồn đối chiếu xác thực.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trading Ecosystem Pillars */}
      <section className="border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="7 ECOSYSTEM PILLARS"
            title="Cấu trúc Hệ sinh thái Backcom Mr Leo"
            subtitle="Bảy mảnh ghép bổ trợ lẫn nhau nhằm phục vụ trọn vẹn hành trình của nhà giao dịch."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "1. Forex Rebate / Backcom",
              "2. Broker Partnership (5 Sàn)",
              "3. Trading Tools & Indicators",
              "4. Robot Trading (MT5 EA)",
              "5. Copy Trade Analytics",
              "6. Trading Community",
              "7. IB Partnership Network",
              "8. Minh bạch Quản trị Rủi ro",
            ].map((pillar) => (
              <div
                key={pillar}
                className="flex items-center gap-3 rounded-card border border-line bg-card p-4"
              >
                <Layers className="h-4 w-4 shrink-0 text-gold" />
                <span className="font-heading text-sm font-semibold text-ink-primary">
                  {pillar}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Broker Partners & Community Commitment */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Card className="h-full p-7">
                <h2 className="font-heading text-xl font-bold text-ink-primary">
                  Mạng lưới 5 Sàn giao dịch Đối tác
                </h2>
                <p className="mt-2 text-sm text-ink-secondary">
                  Hệ thống tích hợp 5 đối tác sàn giao dịch, trong đó ưu tiên
                  cấu hình tài khoản mặc định STD05 tại Austex Markets:
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {brokers.map((b) => (
                    <Link
                      key={b.slug}
                      href={`/brokers/${b.slug}`}
                      className="rounded-xl border border-line bg-background-secondary px-4 py-2.5 text-xs font-semibold text-ink-primary transition-colors hover:border-gold hover:text-gold-light"
                    >
                      {b.name} {b.featured ? "• STD05" : ""}
                    </Link>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-5">
              <Card className="flex h-full flex-col justify-between border-gold/35 p-7">
                <div>
                  <div className="flex items-center gap-2 text-gold-light">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-heading text-sm font-bold uppercase tracking-wider">
                      Cam kết Minh bạch
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                    Không tự tạo số liệu thành tích giả, không nhận giữ tiền ủy
                    thác và không bao giờ yêu cầu mật khẩu giao dịch của khách
                    hàng.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={SITE_CONFIG.zaloGroupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "primary", size: "sm" })
                    )}
                  >
                    <Users className="h-4 w-4" />
                    Cộng đồng Zalo
                  </a>
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" })
                    )}
                  >
                    Liên hệ trực tiếp
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

