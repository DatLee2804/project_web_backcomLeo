"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { tradingIndicators as seedIndicators } from "@/data/indicators";
import type { TradingIndicator } from "@/types";
import { ProductCoverFrame } from "@/components/shared/product-cover-frame";
import { Tabs, type TabOption } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { InteractiveCard } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IndicatorsLibraryProps {
  items?: TradingIndicator[];
}

export function IndicatorsLibrary({
  items = seedIndicators,
}: IndicatorsLibraryProps) {
  const [platformFilter, setPlatformFilter] = React.useState<string>("all");

  const platformTabs: TabOption[] = React.useMemo(() => {
    const tvCount = items.filter((i) => i.platform === "TradingView").length;
    const mtCount = items.filter(
      (i) => i.platform === "MT5" || i.platform === "MT4/MT5"
    ).length;
    return [
      { id: "all", label: "Tất cả chỉ báo", badge: String(items.length) },
      { id: "TradingView", label: "TradingView", badge: String(tvCount) },
      { id: "MT5", label: "MT4 / MT5", badge: String(mtCount) },
    ];
  }, [items]);

  const filtered = React.useMemo(() => {
    if (platformFilter === "all") return items;
    if (platformFilter === "MT5") {
      return items.filter(
        (item) => item.platform === "MT5" || item.platform === "MT4/MT5"
      );
    }
    return items.filter((item) => item.platform === platformFilter);
  }, [items, platformFilter]);

  return (
    <div>
      <Tabs
        options={platformTabs}
        value={platformFilter}
        onChange={setPlatformFilter}
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ind) => (
          <InteractiveCard
            key={ind.slug}
            className="group flex flex-col overflow-hidden"
          >
            <Link
              href={`/tools/indicators/${ind.slug}`}
              className="block overflow-hidden"
            >
              <ProductCoverFrame
                src={ind.previewImage}
                alt={`Hình minh họa chỉ báo ${ind.name}`}
                className="rounded-none"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="gold">{ind.platform}</Badge>
                  <Badge variant="pending">Cấp quyền thành viên</Badge>
                </div>

                <h3 className="mt-3.5 font-heading text-lg font-bold text-ink-primary">
                  <Link
                    href={`/tools/indicators/${ind.slug}`}
                    className="transition-colors hover:text-gold-light"
                  >
                    {ind.name}
                  </Link>
                </h3>
                <div className="mt-1 text-xs font-medium text-gold-light">
                  Phân nhóm: {ind.category}
                </div>
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                  {ind.summary}
                </p>

                <ul className="mt-4 space-y-1.5 border-t border-line pt-3.5">
                  {ind.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-ink-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span className="line-clamp-2">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 pt-1">
                <Link
                  href={`/tools/indicators/${ind.slug}`}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" }),
                    "flex-1"
                  )}
                >
                  <span>Chi tiết &amp; Hướng dẫn</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  Cấp quyền
                </Link>
              </div>
            </div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}
