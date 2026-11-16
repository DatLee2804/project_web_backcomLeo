import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Calculator,
  Gauge,
  Terminal,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { InteractiveCard } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Công cụ Trading & Hệ thống Chỉ báo (Trading Tools & Indicators)",
  description:
    "Bộ công cụ hỗ trợ nhà giao dịch trong hệ sinh thái Backcom Mr Leo: Backcom Calculator, TradingView Indicators, MT5 Indicators và định hướng công cụ quản trị rủi ro.",
  path: "/tools",
});

const TOOL_CARDS = [
  {
    title: "Backcom Calculator",
    statusLabel: "Hoạt động trực tuyến",
    statusVariant: "success" as const,
    icon: Calculator,
    description:
      "Ước tính trực quan khoản hoàn phí giao dịch hàng tháng và hàng năm theo từng sàn, loại tài khoản (ưu tiên Austex STD05) và mô hình tính phí.",
    href: "/tools/calculator",
    cta: "Mở công cụ tính Backcom",
  },
  {
    title: "TradingView Indicators",
    statusLabel: "Thư viện thành viên",
    statusVariant: "gold" as const,
    icon: BarChart2,
    description:
      "Các chỉ báo hỗ trợ nhận diện biên độ phiên Á – Âu – Mỹ, vùng thanh khoản và ma trận đồng thuận xu hướng đa khung thời gian trên TradingView.",
    href: "/tools/indicators",
    cta: "Xem thư viện chỉ báo",
  },
  {
    title: "MT5 Indicators",
    statusLabel: "Tiện ích MetaTrader",
    statusVariant: "gold" as const,
    icon: Terminal,
    description:
      "Bộ tiện ích hiển thị thông số Spread thực tế, đếm ngược đóng nến và đánh dấu vùng cung cầu trực tiếp trên nền tảng MetaTrader 4 / MetaTrader 5.",
    href: "/tools/indicators#mt5-indicators",
    cta: "Xem tiện ích MT5",
  },
  {
    title: "Risk Calculator",
    statusLabel: "Lộ trình mở rộng",
    statusVariant: "pending" as const,
    icon: Gauge,
    description:
      "Mô-đun tính toán khối lượng vào lệnh (Lot Size) theo phần trăm rủi ro tài khoản và khoảng cách Stop Loss — đang được chuẩn hóa cho bản cập nhật tiếp theo.",
    href: "/tools/calculator#roadmap",
    cta: "Xem lộ trình phát triển",
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge variant="gold">TRADER UTILITY SUITE</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
              TRADING TOOLS &amp; INDICATORS
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
              Chuẩn hóa quy trình phân tích biểu đồ, kiểm soát chi phí giao dịch
              và nâng cao kỷ luật thực thi lệnh với hệ thống công cụ dành cho
              cộng đồng Backcom Mr Leo.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link
                href="/tools/calculator"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                Sử dụng Backcom Calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/indicators"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                Khám phá Thư viện Indicators
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Tool Cards */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="CORE MODULES"
            title="Danh mục Công cụ hỗ trợ Nhà giao dịch"
            subtitle="Thiết kế tối giản, tập trung vào số liệu thực tế và khả năng ứng dụng hàng ngày."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TOOL_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <InteractiveCard
                  key={card.title}
                  className="flex flex-col justify-between p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-gold-light">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant={card.statusVariant}>
                        {card.statusLabel}
                      </Badge>
                    </div>

                    <h2 className="mt-5 font-heading text-2xl font-bold text-ink-primary">
                      {card.title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary sm:text-base">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link
                      href={card.href}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "md" }),
                        "w-full justify-between"
                      )}
                    >
                      <span>{card.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

