import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, LineChart, Sliders } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ECOSYSTEM_PILLARS = [
  {
    badge: "AUTOMATED EA",
    title: "ROBOT TRADING",
    description:
      "Giải pháp giao dịch tự động hóa trên MetaTrader 5 hỗ trợ thực thi kỷ luật và quản trị rủi ro theo cấu trúc vốn Cent.",
    items: ["Amix Trade", "Gold Cent Bot", "MT5 Expert Advisor"],
    image: "/images/robots/amix-gold-cent-preview.svg",
    imageAlt: "Giao diện minh họa Robot Trading Amix Gold Cent Bot",
    href: "/robots/amix-gold-cent",
    cta: "Explore Robot EA",
    icon: Bot,
  },
  {
    badge: "TECHNICAL SUITE",
    title: "TRADING TOOLS",
    description:
      "Bộ công cụ tính toán hoàn phí trực quan và hệ thống chỉ báo xác định biên độ phiên, xu hướng đa khung thời gian.",
    items: [
      "TradingView Indicators",
      "MT5 Indicators",
      "Trading Calculator",
    ],
    image: "/images/indicators/indicator-session-preview.svg",
    imageAlt: "Minh họa bộ công cụ chỉ báo TradingView và MT5",
    href: "/tools",
    cta: "Explore Tools",
    icon: Sliders,
  },
  {
    badge: "SOCIAL & SIGNALS",
    title: "COPY TRADE",
    description:
      "Theo dõi bộ chỉ số hiệu suất, mức sụt giảm tài khoản (Drawdown) và chiến lược quản trị vốn minh bạch.",
    items: [
      "Master Traders",
      "Trading Performance",
      "Copy Trading Solutions",
    ],
    image: "/images/indicators/indicator-trend-preview.svg",
    imageAlt: "Minh họa giải pháp Copy Trade và phân tích hiệu suất",
    href: "/copy-trading",
    cta: "Explore Copy Trade",
    icon: LineChart,
  },
];

export function EcosystemSection() {
  return (
    <section className="border-b border-line bg-background py-12 sm:py-14 lg:py-16">
      <div className="container">
        <SectionHeading
          eyebrow="FULL-STACK TRADER SUPPORT"
          title="MORE THAN JUST REBATE"
          subtitle="Backcom Mr Leo xây dựng hệ sinh thái công cụ đồng bộ giúp nhà giao dịch chuẩn hóa từ chi phí đến phương pháp thực thi."
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {ECOSYSTEM_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <InteractiveCard
                key={pillar.title}
                className="flex flex-col overflow-hidden"
              >
                <div className="relative border-b border-line bg-[#0B0F18] p-4">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    width={480}
                    height={280}
                    className="h-44 w-full rounded-xl object-cover"
                  />
                  <div className="absolute left-7 top-7">
                    <Badge variant="gold">{pillar.badge}</Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 text-gold" />
                      <h3 className="font-heading text-xl font-bold text-ink-primary">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                      {pillar.description}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-line pt-4">
                      {pillar.items.map((subItem) => (
                        <li
                          key={subItem}
                          className="flex items-center gap-2.5 text-xs font-medium text-ink-primary sm:text-sm"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-2">
                    <Link
                      href={pillar.href}
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "md" }),
                        "w-full justify-between"
                      )}
                    >
                      <span>{pillar.cta}</span>
                      <ArrowRight className="h-4 w-4 text-gold" />
                    </Link>
                  </div>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

