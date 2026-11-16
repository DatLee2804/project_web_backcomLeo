import type { RebateCalculationMethod } from "@/types";

export interface RebateCalculationInput {
  method: RebateCalculationMethod;
  monthlyLots: number;
  rate: number;
  commissionPerLotUsd?: number;
  contractVolumeUsdPerLot?: number;
}

export interface RebateCalculationResult {
  rebatePerLotUsd: number;
  monthlyRebateUsd: number;
  yearlyRebateUsd: number;
  formulaDescription: string;
}

/**
 * Calculates estimated Forex Rebate / Backcom supporting 3 broker calculation models:
 * - PER_LOT: Rebate = Monthly Lots * Rate ($/lot)
 * - PER_COMMISSION: Rebate = Monthly Lots * Commission per Lot ($) * (Rate / 100)
 * - PER_VOLUME: Rebate = (Monthly Lots * Contract Volume per Lot / 1,000,000) * Rate ($ per $1M volume)
 */
export function calculateRebate({
  method,
  monthlyLots,
  rate,
  commissionPerLotUsd = 7,
  contractVolumeUsdPerLot = 100_000,
}: RebateCalculationInput): RebateCalculationResult {
  const safeLots = Math.max(0, Number.isFinite(monthlyLots) ? monthlyLots : 0);
  const safeRate = Math.max(0, Number.isFinite(rate) ? rate : 0);

  let rebatePerLotUsd = 0;
  let formulaDescription = "";

  switch (method) {
    case "PER_LOT": {
      rebatePerLotUsd = safeRate;
      formulaDescription = `Rebate = Khối lượng (${safeLots} lots) × Mức hoàn phí ($${safeRate.toFixed(2)}/lot)`;
      break;
    }
    case "PER_COMMISSION": {
      const safeComm = Math.max(0, commissionPerLotUsd);
      const cappedPct = Math.min(100, safeRate);
      rebatePerLotUsd = safeComm * (cappedPct / 100);
      formulaDescription = `Rebate = ${safeLots} lots × Commission ($${safeComm.toFixed(2)}/lot) × ${cappedPct}% hoàn phí`;
      break;
    }
    case "PER_VOLUME": {
      const volumeMillionsPerLot = contractVolumeUsdPerLot / 1_000_000;
      rebatePerLotUsd = volumeMillionsPerLot * safeRate;
      formulaDescription = `Rebate = Khối lượng quy đổi USD (${(safeLots * volumeMillionsPerLot).toFixed(2)}M USD) × $${safeRate.toFixed(2)}/1M USD`;
      break;
    }
  }

  const monthlyRebateUsd = safeLots * rebatePerLotUsd;
  const yearlyRebateUsd = monthlyRebateUsd * 12;

  return {
    rebatePerLotUsd,
    monthlyRebateUsd,
    yearlyRebateUsd,
    formulaDescription,
  };
}

