"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Info,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { getOrderedBrokers } from "@/data/brokers";
import { DEMO_REBATE_RATE_PER_LOT } from "@/data/rebate-rates";
import { calculateRebate } from "@/lib/calculator";
import { cn, formatUsd } from "@/lib/utils";
import type { Broker, RebateCalculationMethod } from "@/types";
import { BrokerLogo } from "@/components/shared/broker-logo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface BackcomCalculatorProps {
  initialBrokerSlug?: Broker["slug"];
  brokersList?: Broker[];
  lockBroker?: boolean;
  isLoading?: boolean;
  className?: string;
}

const LOT_PRESETS = [5, 20, 50, 100, 250];

const METHOD_LABELS: Record<
  RebateCalculationMethod,
  { title: string; unit: string; placeholder: string }
> = {
  PER_LOT: {
    title: "Theo Lot đóng lệnh (PER_LOT)",
    unit: "USD / Lot",
    placeholder: "Ví dụ: 5",
  },
  PER_COMMISSION: {
    title: "Theo % Commission (PER_COMMISSION)",
    unit: "% Commission",
    placeholder: "Ví dụ: 30",
  },
  PER_VOLUME: {
    title: "Theo khối lượng USD (PER_VOLUME)",
    unit: "USD / 1M USD",
    placeholder: "Ví dụ: 25",
  },
};

export function BackcomCalculator({
  initialBrokerSlug = "austex",
  brokersList,
  lockBroker = false,
  isLoading = false,
  className,
}: BackcomCalculatorProps) {
  const orderedBrokers = React.useMemo(
    () => brokersList ?? getOrderedBrokers(),
    [brokersList]
  );

  const [selectedBrokerSlug, setSelectedBrokerSlug] =
    React.useState<Broker["slug"]>(initialBrokerSlug);

  const selectedBroker = React.useMemo(
    () =>
      orderedBrokers.find((b) => b.slug === selectedBrokerSlug) ??
      orderedBrokers[0],
    [orderedBrokers, selectedBrokerSlug]
  );

  const defaultAccountForBroker = React.useMemo(() => {
    return (
      selectedBroker.accounts.find((acc) => acc.isDefault) ??
      selectedBroker.accounts[0]
    );
  }, [selectedBroker]);

  const [selectedAccountId, setSelectedAccountId] = React.useState<string>(
    defaultAccountForBroker?.id ?? ""
  );

  const symbolRules = React.useMemo(
    () => selectedBroker.rebateConfig?.symbolRules ?? [],
    [selectedBroker]
  );

  const [selectedSymbol, setSelectedSymbol] = React.useState<string>(
    symbolRules[0]?.symbol ?? "XAUUSD"
  );

  const activeSymbolRule = React.useMemo(
    () =>
      symbolRules.find((r) => r.symbol === selectedSymbol) ?? symbolRules[0],
    [symbolRules, selectedSymbol]
  );

  const [method, setMethod] = React.useState<RebateCalculationMethod>(
    activeSymbolRule?.method ??
      selectedBroker.rebateConfig?.defaultMethod ??
      "PER_LOT"
  );

  const [monthlyLotsInput, setMonthlyLotsInput] = React.useState<string>("50");
  const [rateInput, setRateInput] = React.useState<string>(
    activeSymbolRule?.officialRate !== null &&
      activeSymbolRule?.officialRate !== undefined
      ? String(activeSymbolRule.officialRate)
      : activeSymbolRule?.demoSuggestedRate !== null &&
          activeSymbolRule?.demoSuggestedRate !== undefined
        ? String(activeSymbolRule.demoSuggestedRate)
        : ""
  );
  const [isDemoRateActive, setIsDemoRateActive] = React.useState<boolean>(
    activeSymbolRule?.officialRate === null &&
      activeSymbolRule?.demoSuggestedRate !== null
  );
  const [commissionPerLotInput, setCommissionPerLotInput] =
    React.useState<string>("7");

  // Sync account, symbol & method whenever broker changes (always selecting isDefault account, e.g. Austex STD05)
  const handleBrokerChange = (slug: Broker["slug"]) => {
    setSelectedBrokerSlug(slug);
    const nextBroker =
      orderedBrokers.find((b) => b.slug === slug) ?? orderedBrokers[0];
    const nextDefaultAcc =
      nextBroker.accounts.find((a) => a.isDefault) ?? nextBroker.accounts[0];
    setSelectedAccountId(nextDefaultAcc?.id ?? "");

    const nextRules = nextBroker.rebateConfig?.symbolRules ?? [];
    const nextRule = nextRules[0];
    const nextSymbol = nextRule?.symbol ?? "XAUUSD";
    const nextMethod =
      nextRule?.method ?? nextBroker.rebateConfig?.defaultMethod ?? "PER_LOT";

    setSelectedSymbol(nextSymbol);
    setMethod(nextMethod);

    if (nextRule?.officialRate !== null && nextRule?.officialRate !== undefined) {
      setRateInput(String(nextRule.officialRate));
      setIsDemoRateActive(false);
    } else if (
      nextRule?.demoSuggestedRate !== null &&
      nextRule?.demoSuggestedRate !== undefined
    ) {
      setRateInput(String(nextRule.demoSuggestedRate));
      setIsDemoRateActive(true);
    } else {
      setRateInput("");
      setIsDemoRateActive(false);
    }
  };

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
    const nextRule = symbolRules.find((r) => r.symbol === symbol);
    if (!nextRule) return;
    setMethod(nextRule.method);
    if (nextRule.officialRate !== null) {
      setRateInput(String(nextRule.officialRate));
      setIsDemoRateActive(false);
    } else if (nextRule.demoSuggestedRate !== null) {
      setRateInput(String(nextRule.demoSuggestedRate));
      setIsDemoRateActive(true);
    } else {
      setRateInput("");
      setIsDemoRateActive(false);
    }
  };

  const applyDemoRate = () => {
    setMethod("PER_LOT");
    setRateInput(String(DEMO_REBATE_RATE_PER_LOT));
    setIsDemoRateActive(true);
  };

  const clearToOfficialState = () => {
    if (
      activeSymbolRule?.officialRate !== null &&
      activeSymbolRule?.officialRate !== undefined
    ) {
      setRateInput(String(activeSymbolRule.officialRate));
      setIsDemoRateActive(false);
    } else {
      setRateInput("");
      setIsDemoRateActive(false);
    }
  };

  const selectedAccount = React.useMemo(
    () =>
      selectedBroker.accounts.find((a) => a.id === selectedAccountId) ??
      defaultAccountForBroker,
    [selectedBroker, selectedAccountId, defaultAccountForBroker]
  );

  // Validation
  const parsedLots = Number(monthlyLotsInput);
  const parsedRate = Number(rateInput);
  const parsedCommission = Number(commissionPerLotInput);

  const lotsError =
    monthlyLotsInput.trim() === ""
      ? "Vui lòng nhập khối lượng giao dịch (Lots/tháng)."
      : Number.isNaN(parsedLots) || parsedLots < 0
        ? "Khối lượng giao dịch phải là số lớn hơn hoặc bằng 0."
        : parsedLots > 50000
          ? "Khối lượng vượt giới hạn mô phỏng (tối đa 50,000 lots)."
          : null;

  const rateError =
    rateInput.trim() !== "" && (Number.isNaN(parsedRate) || parsedRate < 0)
      ? "Mức hoàn phí không hợp lệ."
      : method === "PER_COMMISSION" && parsedRate > 100
        ? "Tỷ lệ phần trăm hoàn commission không vượt quá 100%."
        : null;

  const hasOfficialRate =
    activeSymbolRule?.officialRate !== null &&
    activeSymbolRule?.officialRate !== undefined;
  const hasValidRateInput =
    rateInput.trim() !== "" && !rateError && parsedRate > 0;

  const calculation = React.useMemo(() => {
    if (lotsError || !hasValidRateInput) {
      return null;
    }
    return calculateRebate({
      method,
      monthlyLots: parsedLots,
      rate: parsedRate,
      commissionPerLotUsd: Number.isNaN(parsedCommission)
        ? 7
        : parsedCommission,
    });
  }, [lotsError, hasValidRateInput, method, parsedLots, parsedRate, parsedCommission]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "rounded-card-lg border border-line bg-card p-8 text-center",
          className
        )}
      >
        <RefreshCw className="mx-auto h-8 w-8 animate-spin text-gold" />
        <p className="mt-3 text-sm text-ink-secondary">
          Đang tải cấu hình biểu phí hoàn trả từ hệ thống...
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-card-lg border border-line-strong bg-surface-gradient shadow-card",
        className
      )}
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-[#061120]/95 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/35 bg-gold/10 text-gold-light">
            <Calculator className="h-4 w-4" />
          </span>
          <div>
            <div className="font-heading text-sm font-bold text-ink-primary sm:text-base">
              Backcom &amp; Rebate Dashboard Calculator
            </div>
            <p className="text-xs text-ink-muted">
              Cấu hình độc lập theo từng sàn, loại tài khoản và phương thức quy đổi
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasOfficialRate ? (
            <Badge variant="success">Biểu phí chính thức</Badge>
          ) : (
            <Badge variant="pending">Biểu phí chính thức: Chưa cập nhật</Badge>
          )}
          {isDemoRateActive && hasValidRateInput && (
            <Badge variant="demo">Dữ liệu minh họa</Badge>
          )}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-12">
        {/* Left Column: Inputs */}
        <div className="space-y-5 p-5 sm:p-7 lg:col-span-7 lg:border-r lg:border-line">
          {/* 1. Broker Selector */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-secondary">
              1. Chọn sàn giao dịch
            </label>
            {lockBroker ? (
              <div className="flex items-center justify-between rounded-input border border-gold/40 bg-card-hover px-4 py-3">
                <div className="flex items-center gap-3">
                  <BrokerLogo broker={selectedBroker} size="xs" />
                  <span className="font-heading text-sm font-bold text-gold-light">
                    {selectedBroker.name}
                  </span>
                </div>
                {selectedBroker.featured && (
                  <Badge variant="featured">FEATURED</Badge>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {orderedBrokers.map((broker) => {
                  const active = broker.slug === selectedBroker.slug;
                  return (
                    <button
                      key={broker.slug}
                      type="button"
                      onClick={() => handleBrokerChange(broker.slug)}
                      className={cn(
                        "relative flex flex-col items-start gap-2 rounded-input border px-2.5 py-2.5 text-left transition-all",
                        active
                          ? "border-gold bg-card-hover text-gold-light shadow-sm"
                          : "border-line bg-background-secondary text-ink-secondary hover:border-line-strong hover:text-ink-primary"
                      )}
                    >
                      <BrokerLogo broker={broker} size="pill" />
                      <div>
                        <div className="text-xs font-bold">
                          {broker.shortName}
                        </div>
                        <div className="mt-0.5 text-[10px] text-ink-muted">
                          {broker.featured ? "Ưu tiên • STD05" : "Đối tác"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Account Type & Symbol */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="calc-account"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                2. Loại tài khoản ({selectedBroker.shortName})
              </label>
              <select
                id="calc-account"
                value={selectedAccount?.id ?? ""}
                onChange={(e) => setSelectedAccountId(e.target.value)}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary focus:border-gold focus:outline-none"
              >
                {selectedBroker.accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.code} — {acc.isDefault ? "Mặc định" : "So sánh"}
                    {acc.goldSpread !== null
                      ? ` (Gold Spread: ${acc.goldSpread})`
                      : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="calc-symbol"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                3. Sản phẩm giao dịch (Symbol)
              </label>
              <select
                id="calc-symbol"
                value={selectedSymbol}
                onChange={(e) => handleSymbolChange(e.target.value)}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary focus:border-gold focus:outline-none"
              >
                {symbolRules.map((rule) => (
                  <option key={rule.symbol} value={rule.symbol}>
                    {rule.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Austex / Account Specific Callout */}
          {selectedAccount && (
            <div className="rounded-xl border border-line bg-background-secondary/80 px-4 py-3 text-xs text-ink-secondary">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-ink-primary">
                  Cấu hình đang chọn: {selectedAccount.name}
                </span>
                {selectedAccount.goldSpread !== null ? (
                  <span className="rounded-md border border-gold/35 bg-gold/10 px-2 py-0.5 font-semibold text-gold-light tabular-nums-fin">
                    XAUUSD Spread: {selectedAccount.goldSpread}
                  </span>
                ) : (
                  <span className="text-ink-muted">
                    Thông số spread: Chưa cập nhật
                  </span>
                )}
              </div>
              <p className="mt-1 text-ink-muted">
                {selectedAccount.spreadNote ?? selectedAccount.description}
              </p>
            </div>
          )}

          {/* 4. Monthly Trading Lots + Slider */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="calc-lots"
                className="text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                4. Khối lượng giao dịch hàng tháng (Lots)
              </label>
              <span className="text-xs font-bold text-gold-light tabular-nums-fin">
                {!lotsError ? `${parsedLots} Lots / tháng` : "Kiểm tra giá trị"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="calc-lots"
                type="number"
                min={0}
                max={50000}
                step="1"
                value={monthlyLotsInput}
                onChange={(e) => setMonthlyLotsInput(e.target.value)}
                className="h-11 w-32 shrink-0 rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm font-semibold text-ink-primary tabular-nums-fin focus:border-gold focus:outline-none"
              />
              <input
                type="range"
                aria-label="Thanh trượt khối lượng giao dịch hàng tháng"
                min={1}
                max={500}
                step={1}
                value={
                  Number.isFinite(parsedLots)
                    ? Math.min(500, Math.max(1, parsedLots))
                    : 50
                }
                onChange={(e) => setMonthlyLotsInput(e.target.value)}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-card-hover accent-[#00C2FF]"
              />
            </div>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {LOT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMonthlyLotsInput(String(preset))}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs font-medium tabular-nums-fin transition-colors",
                    parsedLots === preset
                      ? "border-gold/50 bg-gold/15 text-gold-light"
                      : "border-line bg-background-secondary text-ink-muted hover:text-ink-primary"
                  )}
                >
                  {preset} lots
                </button>
              ))}
            </div>

            {lotsError && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-danger">
                <AlertCircle className="h-3.5 w-3.5" />
                {lotsError}
              </p>
            )}
          </div>

          {/* 5. Calculation Method & Rebate Rate */}
          <div className="rounded-xl border border-line bg-background-secondary/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="calc-rate"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-gold" />
                5. Phương thức &amp; Mức Rebate ({METHOD_LABELS[method].unit})
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyDemoRate}
                  className="rounded-md border border-sky-400/35 bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
                >
                  Thử Demo $5/lot
                </button>
                {rateInput !== "" && !hasOfficialRate && (
                  <button
                    type="button"
                    onClick={clearToOfficialState}
                    className="rounded-md border border-line px-2 py-1 text-[11px] text-ink-muted hover:text-ink-primary"
                  >
                    Xem trạng thái gốc
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <span className="mb-1 block text-[11px] text-ink-muted">
                  Phương thức tính của cấu hình
                </span>
                <select
                  aria-label="Phương thức tính hoàn phí"
                  value={method}
                  onChange={(e) => {
                    setMethod(e.target.value as RebateCalculationMethod);
                    setIsDemoRateActive(true);
                  }}
                  className="h-10 w-full rounded-input border border-line-strong bg-card px-3 text-xs text-ink-primary focus:border-gold focus:outline-none"
                >
                  <option value="PER_LOT">PER_LOT — USD cố định mỗi Lot</option>
                  <option value="PER_COMMISSION">
                    PER_COMMISSION — % trên phí Commission
                  </option>
                  <option value="PER_VOLUME">
                    PER_VOLUME — USD trên 1M USD Volume
                  </option>
                </select>
              </div>

              <div>
                <span className="mb-1 block text-[11px] text-ink-muted">
                  Mức hoàn phí ({METHOD_LABELS[method].unit})
                </span>
                <input
                  id="calc-rate"
                  type="number"
                  min={0}
                  step="0.1"
                  placeholder={
                    hasOfficialRate
                      ? "Biểu phí xác nhận"
                      : "Chưa cập nhật (Nhập số để mô phỏng)"
                  }
                  value={rateInput}
                  onChange={(e) => {
                    setRateInput(e.target.value);
                    setIsDemoRateActive(!hasOfficialRate);
                  }}
                  className="h-10 w-full rounded-input border border-line-strong bg-card px-3 text-sm font-semibold text-ink-primary tabular-nums-fin placeholder:font-normal placeholder:text-ink-muted focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {method === "PER_COMMISSION" && (
              <div className="mt-3">
                <label
                  htmlFor="calc-comm-per-lot"
                  className="mb-1 block text-[11px] text-ink-muted"
                >
                  Phí Commission gốc giả định của tài khoản (USD / Lot khứ hồi)
                </label>
                <input
                  id="calc-comm-per-lot"
                  type="number"
                  min={0}
                  step="0.5"
                  value={commissionPerLotInput}
                  onChange={(e) => setCommissionPerLotInput(e.target.value)}
                  className="h-9 w-40 rounded-input border border-line bg-card px-3 text-xs text-ink-primary tabular-nums-fin focus:border-gold focus:outline-none"
                />
              </div>
            )}

            {rateError && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-danger">
                <AlertCircle className="h-3.5 w-3.5" />
                {rateError}
              </p>
            )}

            <p className="mt-2.5 text-[11px] leading-relaxed text-ink-muted">
              {activeSymbolRule?.note}
            </p>
          </div>
        </div>

        {/* Right Column: Live Outputs */}
        <div className="flex flex-col justify-between bg-[#050C18]/90 p-5 sm:p-7 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-secondary">
                Kết quả ước tính hoàn phí
              </span>
              {!hasOfficialRate && (
                <span className="text-[11px] font-medium text-amber-300">
                  Chính thức: Chưa cập nhật
                </span>
              )}
            </div>

            {/* Empty State when no rate is active */}
            {!calculation ? (
              <div className="mt-5 rounded-card border border-dashed border-line-strong bg-card/60 p-6 text-center">
                <Info className="mx-auto h-7 w-7 text-gold" />
                <h4 className="mt-3 font-heading text-base font-bold text-ink-primary">
                  Biểu phí chính thức: Chưa cập nhật
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Mức hoàn phí chính thức của{" "}
                  <strong className="text-ink-primary">
                    {selectedBroker.name}
                  </strong>{" "}
                  ({selectedAccount?.code} • {selectedSymbol}) hiện đang chờ cập
                  nhật từ bảng đối soát đối tác. Bạn có thể bấm nút bên dưới để
                  mô phỏng công thức với mức minh họa $5/lot hoặc nhập mức hoàn
                  phí đã được tư vấn.
                </p>
                <button
                  type="button"
                  onClick={applyDemoRate}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-4"
                  )}
                >
                  Kích hoạt dữ liệu minh họa ($5/lot)
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                {isDemoRateActive && (
                  <div className="flex items-start gap-2 rounded-xl border border-sky-400/25 bg-sky-500/10 p-3 text-xs text-sky-200">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                    <span>
                      <strong>Dữ liệu minh họa:</strong> Kết quả bên dưới sử
                      dụng thông số giả định để minh họa công thức tính, không
                      phải cam kết biểu phí thực tế của {selectedBroker.name}.
                    </span>
                  </div>
                )}

                {/* Primary Monthly Output */}
                <div className="rounded-card border border-gold/35 bg-gradient-to-br from-card-hover to-card p-5 shadow-gold">
                  <div className="flex items-center justify-between text-xs text-ink-secondary">
                    <span>Estimated Monthly Rebate (Hàng tháng)</span>
                    {isDemoRateActive && (
                      <span className="rounded bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300">
                        DEMO
                      </span>
                    )}
                  </div>
                  <div className="mt-2 font-heading text-3xl font-bold text-gold-light tabular-nums-fin sm:text-4xl">
                    {formatUsd(calculation.monthlyRebateUsd)}
                  </div>
                  <div className="mt-2 text-xs text-ink-muted">
                    {calculation.formulaDescription}
                  </div>
                </div>

                {/* Per Lot & Yearly Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-line bg-card p-4">
                    <div className="text-[11px] text-ink-muted">
                      Rebate quy đổi / Lot
                    </div>
                    <div className="mt-1 font-heading text-lg font-bold text-ink-primary tabular-nums-fin sm:text-xl">
                      {formatUsd(calculation.rebatePerLotUsd)}
                    </div>
                    <div className="mt-0.5 text-[10px] text-ink-muted">
                      Mỗi lot tiêu chuẩn
                    </div>
                  </div>

                  <div className="rounded-xl border border-line bg-card p-4">
                    <div className="text-[11px] text-ink-muted">
                      Estimated Yearly Rebate
                    </div>
                    <div className="mt-1 font-heading text-lg font-bold text-success tabular-nums-fin sm:text-xl">
                      {formatUsd(calculation.yearlyRebateUsd)}
                    </div>
                    <div className="mt-0.5 text-[10px] text-ink-muted">
                      Ước tính 12 tháng
                    </div>
                  </div>
                </div>

                {/* Configuration Summary */}
                <div className="rounded-xl border border-line bg-background-secondary/75 p-3.5 text-xs text-ink-secondary">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-ink-muted">Sàn đối tác:</span>
                    <span className="font-semibold text-ink-primary">
                      {selectedBroker.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-line/60 py-1">
                    <span className="text-ink-muted">Mã tài khoản:</span>
                    <span className="font-semibold text-gold-light">
                      {selectedAccount?.code}
                      {selectedAccount?.goldSpread !== null
                        ? ` (Gold Spread: ${selectedAccount?.goldSpread})`
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-line/60 py-1">
                    <span className="text-ink-muted">Biểu phí chính thức:</span>
                    <span>
                      {hasOfficialRate ? "Đã xác nhận" : "Chưa cập nhật"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom CTAs */}
          <div className="mt-6 space-y-2.5 border-t border-line pt-5">
            <Link
              href={`/contact?broker=${selectedBroker.slug}`}
              className={cn(
                buttonVariants({ variant: "primary", size: "md" }),
                "w-full"
              )}
            >
              Nhận bảng Backcom {selectedBroker.shortName} chính thức
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/brokers/${selectedBroker.slug}`}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "w-full"
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
              Xem chi tiết cấu hình sàn {selectedBroker.shortName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

