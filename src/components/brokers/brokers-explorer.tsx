"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Lock, ExternalLink } from "lucide-react";
import { getOrderedBrokers } from "@/data/brokers";
import type { Broker } from "@/types";
import { Tabs, type TabOption } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { InteractiveCard } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BrokerFilterId = "all" | "forex" | "mt4" | "mt5" | "featured";

export function BrokersExplorer({
  brokersList,
  comparisonHeading,
}: {
  brokersList?: Broker[];
  comparisonHeading?: { title: string; subtitle: string };
}) {
  const [activeFilter, setActiveFilter] = React.useState<BrokerFilterId>("all");
  const allBrokers = React.useMemo(
    () => brokersList ?? getOrderedBrokers(),
    [brokersList]
  );

  const filterTabs: TabOption[] = React.useMemo(
    () => [
      { id: "all", label: "All", badge: String(allBrokers.length) },
      {
        id: "forex",
        label: "Forex",
        badge: String(
          allBrokers.filter((b) => b.categories.includes("Forex")).length
        ),
      },
      {
        id: "mt4",
        label: "MT4",
        badge: String(
          allBrokers.filter((b) => b.platforms.includes("MT4")).length
        ),
      },
      {
        id: "mt5",
        label: "MT5",
        badge: String(
          allBrokers.filter((b) => b.platforms.includes("MT5")).length
        ),
      },
      {
        id: "featured",
        label: "Featured",
        badge: String(allBrokers.filter((b) => b.featured).length),
      },
    ],
    [allBrokers]
  );

  const filteredBrokers = React.useMemo(() => {
    switch (activeFilter) {
      case "forex":
        return allBrokers.filter((b) => b.categories.includes("Forex"));
      case "mt4":
        return allBrokers.filter((b) => b.platforms.includes("MT4"));
      case "mt5":
        return allBrokers.filter((b) => b.platforms.includes("MT5"));
      case "featured":
        return allBrokers.filter((b) => b.featured);
      default:
        return allBrokers;
    }
  }, [allBrokers, activeFilter]);

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Tabs
          options={filterTabs}
          value={activeFilter}
          onChange={(val) => setActiveFilter(val as BrokerFilterId)}
        />
        <span className="text-xs text-ink-muted">
          Hiển thị {filteredBrokers.length} / {allBrokers.length} sàn đối tác
        </span>
      </div>

      {/* Cards Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBrokers.map((broker) => (
          <InteractiveCard
            key={broker.slug}
            className={cn(
              "flex flex-col justify-between p-6",
              broker.featured &&
                "border-gold/50 bg-gradient-to-b from-card-hover to-card shadow-gold"
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <Image
                  src={broker.logo}
                  alt={`Logo minh họa ${broker.name}`}
                  width={150}
                  height={44}
                  className="h-10 w-auto"
                />
                {broker.featured ? (
                  <Badge variant="featured">FEATURED BROKER</Badge>
                ) : (
                  <Badge variant="neutral">PARTNER</Badge>
                )}
              </div>

              <h2 className="mt-5 font-heading text-xl font-bold text-ink-primary">
                {broker.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                {broker.shortDescription}
              </p>

              {/* Key specs */}
              <div className="mt-5 space-y-2 rounded-xl border border-line bg-background-secondary p-4 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-ink-muted">Tài khoản:</span>
                  <span
                    className={cn(
                      "font-semibold",
                      broker.slug === "austex"
                        ? "text-gold-light"
                        : "text-ink-primary"
                    )}
                  >
                    {broker.accountsTableLabel}
                  </span>
                </div>
                {broker.slug === "austex" && (
                  <div className="flex items-center justify-between gap-2 border-t border-line/60 pt-2">
                    <span className="text-ink-muted">XAUUSD Spread (STD05):</span>
                    <span className="font-bold text-gold-light tabular-nums-fin">
                      36 (Mặc định)
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between gap-2 border-t border-line/60 pt-2">
                  <span className="text-ink-muted">Nền tảng:</span>
                  <span className="font-medium text-ink-primary">
                    {broker.platforms.length > 0
                      ? broker.platforms.join(" / ")
                      : "Đang cập nhật"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-line/60 pt-2">
                  <span className="text-ink-muted">Chính sách Rebate:</span>
                  <span className="font-medium text-amber-300">
                    {broker.rebateTableLabel}
                  </span>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5">
                {broker.highlights.slice(0, 2).map((hl) => (
                  <li
                    key={hl}
                    className="flex items-start gap-2 text-xs text-ink-secondary"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href={`/brokers/${broker.slug}`}
                className={cn(
                  buttonVariants({
                    variant: broker.featured ? "primary" : "outline",
                    size: "sm",
                  }),
                  "flex-1"
                )}
              >
                Chi tiết sàn
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {broker.referralUrl ? (
                <a
                  href={broker.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" })
                  )}
                >
                  Đăng ký
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Đường dẫn referral đang chờ cập nhật"
                  className={cn(
                    buttonVariants({ variant: "subtle", size: "sm" }),
                    "cursor-not-allowed opacity-60"
                  )}
                >
                  <Lock className="h-3 w-3" />
                  Chờ link
                </button>
              )}
            </div>
          </InteractiveCard>
        ))}
      </div>

      {/* Comparison Table (Section 8.1) */}
      <div className="mt-16">
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-ink-primary">
            {comparisonHeading?.title ??
              "Bảng tổng hợp & So sánh thông số Sàn giao dịch"}
          </h2>
          <p className="mt-1.5 text-sm text-ink-secondary">
            {comparisonHeading?.subtitle ??
              "Đối chiếu nhanh các hạng mục tài khoản, nền tảng và chính sách hoàn phí của tất cả các sàn trong hệ sinh thái."}
          </p>
        </div>

        <div className="overflow-x-auto rounded-card border border-line bg-card">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-background-secondary text-xs uppercase tracking-wider text-ink-secondary">
                <th className="px-5 py-4">Broker</th>
                <th className="px-5 py-4">Account</th>
                <th className="px-5 py-4">Platform</th>
                <th className="px-5 py-4">Rebate</th>
                <th className="px-5 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {allBrokers.map((broker) => (
                <tr
                  key={broker.slug}
                  className={cn(
                    "transition-colors hover:bg-card-hover/60",
                    broker.featured && "bg-gold/[0.05]"
                  )}
                >
                  <td className="px-5 py-4 font-heading font-bold text-ink-primary">
                    <div className="flex items-center gap-2">
                      <span>{broker.name}</span>
                      {broker.featured && (
                        <Badge variant="featured">PRIORITY</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-ink-secondary">
                    <span
                      className={cn(
                        broker.featured && "font-semibold text-gold-light"
                      )}
                    >
                      {broker.accountsTableLabel || "Đang cập nhật"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-ink-secondary">
                    {broker.platforms.length > 0
                      ? broker.platforms.join(" / ")
                      : "Đang cập nhật"}
                  </td>
                  <td className="px-5 py-4 text-ink-secondary">
                    {broker.rebateTableLabel || "Liên hệ / Đang cập nhật"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/brokers/${broker.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold-light hover:underline"
                    >
                      Xem chi tiết
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

