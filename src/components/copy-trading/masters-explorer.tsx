"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Info, RotateCcw } from "lucide-react";
import { masterTraders } from "@/data/masters";
import type { MasterTrader } from "@/types";
import { Badge } from "@/components/ui/badge";
import { InteractiveCard } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MastersExplorer() {
  const [riskFilter, setRiskFilter] = React.useState<string>("all");
  const [periodFilter, setPeriodFilter] = React.useState<string>("all");
  const [roiSort, setRoiSort] = React.useState<string>("desc");

  const filteredMasters = React.useMemo(() => {
    let list: MasterTrader[] = [...masterTraders];

    if (riskFilter !== "all") {
      list = list.filter((m) => m.riskLevel === riskFilter);
    }

    if (periodFilter === "8m") {
      list = list.filter((m) => m.tradingDurationMonths >= 8);
    } else if (periodFilter === "12m") {
      list = list.filter((m) => m.tradingDurationMonths >= 12);
    }

    if (roiSort === "desc") {
      list.sort((a, b) => b.roiPct - a.roiPct);
    } else if (roiSort === "asc") {
      list.sort((a, b) => a.roiPct - b.roiPct);
    } else if (roiSort === "dd_low") {
      list.sort((a, b) => a.maxDrawdownPct - b.maxDrawdownPct);
    }

    return list;
  }, [riskFilter, periodFilter, roiSort]);

  const resetFilters = () => {
    setRiskFilter("all");
    setPeriodFilter("all");
    setRoiSort("desc");
  };

  const getRiskBadgeVariant = (level: MasterTrader["riskLevel"]) => {
    if (level === "Low") return "success";
    if (level === "Moderate") return "gold";
    return "danger";
  };

  return (
    <div>
      {/* Demo Transparency Callout */}
      <div className="mb-8 flex items-start gap-3 rounded-card border border-sky-400/30 bg-sky-500/10 p-4 text-xs leading-relaxed text-sky-200 sm:text-sm">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
        <div>
          <strong>Thông báo dữ liệu DEMO:</strong> Danh sách Master Trader dưới
          đây là các hồ sơ dữ liệu mô phỏng (gắn nhãn <code>DEMO</code>) nhằm
          giới thiệu giao diện phân tích chỉ số rủi ro của hệ sinh thái. Đây
          không phải kết quả đầu tư thực tế hay cam kết lợi nhuận.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid gap-4 rounded-card border border-line bg-card p-4 sm:grid-cols-4 sm:p-5">
        <div>
          <label
            htmlFor="filter-roi"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Sắp xếp ROI / Drawdown
          </label>
          <select
            id="filter-roi"
            value={roiSort}
            onChange={(e) => setRoiSort(e.target.value)}
            className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary focus:border-gold focus:outline-none sm:text-sm"
          >
            <option value="desc">ROI (Demo): Cao đến thấp</option>
            <option value="asc">ROI (Demo): Thấp đến cao</option>
            <option value="dd_low">Max Drawdown: Thấp nhất trước</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-risk"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Mức độ rủi ro (Risk Level)
          </label>
          <select
            id="filter-risk"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary focus:border-gold focus:outline-none sm:text-sm"
          >
            <option value="all">Tất cả mức rủi ro</option>
            <option value="Low">Low Risk (Thận trọng)</option>
            <option value="Moderate">Moderate Risk (Cân bằng)</option>
            <option value="High">High Risk (Mạo hiểm)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="filter-period"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Thời gian vận hành (Period)
          </label>
          <select
            id="filter-period"
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary focus:border-gold focus:outline-none sm:text-sm"
          >
            <option value="all">Tất cả thời gian</option>
            <option value="8m">Từ 8 tháng trở lên</option>
            <option value="12m">Từ 12 tháng trở lên</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={resetFilters}
            className={cn(
              buttonVariants({ variant: "subtle", size: "md" }),
              "h-10 w-full text-xs"
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Đặt lại bộ lọc
          </button>
        </div>
      </div>

      {/* Master Cards */}
      {filteredMasters.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-line-strong bg-card p-10 text-center">
          <p className="text-sm text-ink-secondary">
            Không có hồ sơ Master Demo nào khớp với bộ lọc hiện tại.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "mt-4"
            )}
          >
            Xem lại tất cả hồ sơ
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filteredMasters.map((master) => (
            <InteractiveCard
              key={master.slug}
              className="flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <Image
                      src={master.avatar}
                      alt={`Avatar minh họa ${master.name}`}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-2xl"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-heading text-lg font-bold text-ink-primary">
                          {master.name}
                        </h2>
                      </div>
                      <p className="mt-0.5 text-xs text-ink-secondary">
                        {master.strategyName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={getRiskBadgeVariant(master.riskLevel)}>
                      Risk: {master.riskLevel}
                    </Badge>
                    <Badge variant="demo">DEMO</Badge>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                  {master.summary}
                </p>

                {/* 4 Key Metrics */}
                <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-line bg-background-secondary p-4 sm:grid-cols-4">
                  <div>
                    <div className="text-[11px] text-ink-muted">ROI (Demo)</div>
                    <div className="mt-1 font-heading text-lg font-bold text-success tabular-nums-fin">
                      +{master.roiPct.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-muted">
                      Max Drawdown
                    </div>
                    <div className="mt-1 font-heading text-lg font-bold text-danger tabular-nums-fin">
                      -{master.maxDrawdownPct.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-muted">Win Rate</div>
                    <div className="mt-1 font-heading text-lg font-bold text-ink-primary tabular-nums-fin">
                      {master.winRatePct.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-muted">Period</div>
                    <div className="mt-1 font-heading text-lg font-bold text-gold-light tabular-nums-fin">
                      {master.tradingDurationMonths} tháng
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
                <span className="text-xs text-ink-muted">
                  Sản phẩm chính: {master.primaryMarkets.join(", ")}
                </span>
                <Link
                  href={`/copy-trading/masters/${master.slug}`}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" })
                  )}
                >
                  View Profile (Demo)
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </InteractiveCard>
          ))}
        </div>
      )}
    </div>
  );
}

