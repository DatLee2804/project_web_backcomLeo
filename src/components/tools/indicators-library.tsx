"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { tradingIndicators } from "@/data/indicators";
import { Tabs, type TabOption } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { InteractiveCard } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLATFORM_TABS: TabOption[] = [
  { id: "all", label: "Tất cả chỉ báo", badge: "4" },
  { id: "TradingView", label: "TradingView", badge: "2" },
  { id: "MT5", label: "MT4 / MT5", badge: "2" },
];

export function IndicatorsLibrary() {
  const [platformFilter, setPlatformFilter] = React.useState<string>("all");

  const filtered = React.useMemo(() => {
    if (platformFilter === "all") return tradingIndicators;
    if (platformFilter === "MT5") {
      return tradingIndicators.filter(
        (item) => item.platform === "MT5" || item.platform === "MT4/MT5"
      );
    }
    return tradingIndicators.filter((item) => item.platform === platformFilter);
  }, [platformFilter]);

  return (
    <div>
      <Tabs
        options={PLATFORM_TABS}
        value={platformFilter}
        onChange={setPlatformFilter}
      />

      <div className="mt-8 grid gap-7 md:grid-cols-2">
        {filtered.map((ind) => (
          <InteractiveCard
            key={ind.id}
            className="flex flex-col overflow-hidden"
          >
            <div className="border-b border-line bg-[#0B0F18] p-4">
              <Image
                src={ind.previewImage}
                alt={`Hình minh họa chỉ báo ${ind.name}`}
                width={480}
                height={280}
                className="h-48 w-full rounded-xl object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="gold">{ind.platform}</Badge>
                  <Badge variant="pending">Cấp quyền thành viên</Badge>
                </div>

                <h3 className="mt-4 font-heading text-xl font-bold text-ink-primary">
                  {ind.name}
                </h3>
                <div className="mt-1 text-xs font-medium text-gold-light">
                  Phân nhóm: {ind.category}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                  {ind.summary}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {ind.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-ink-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "md" }),
                    "w-full justify-between"
                  )}
                >
                  <span>Đăng ký nhận quyền truy cập chỉ báo</span>
                  <ArrowRight className="h-4 w-4 text-gold" />
                </Link>
              </div>
            </div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}

