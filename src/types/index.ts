export type ConfigStatus = "confirmed" | "pending" | "demo";

export type RebateCalculationMethod =
  | "PER_LOT"
  | "PER_COMMISSION"
  | "PER_VOLUME";

export interface BrokerAccount {
  id: string;
  name: string;
  code: string;
  isDefault: boolean;
  description: string;
  goldSpread: number | null;
  spreadNote?: string;
  commission: string | null;
  minDeposit: string | null;
  leverage: string | null;
  status: ConfigStatus;
}

export interface BrokerTrustItem {
  platform: "Trustpilot" | "WikiFX" | "Myfxbook" | "Regulation" | "License";
  label: string;
  value: string | null;
  sourceName: string;
  sourceUrl: string | null;
  updatedAt: string | null;
  status: ConfigStatus;
}

export interface TradingProductCategory {
  code: string;
  name: string;
  symbolExample: string;
  description: string;
}

export interface BrokerRebateSymbolRule {
  symbol: string;
  label: string;
  officialRate: number | null;
  demoSuggestedRate: number | null;
  unitLabel: string;
  method: RebateCalculationMethod;
  note: string;
}

export interface BrokerRebateConfig {
  defaultMethod: RebateCalculationMethod;
  payoutFrequency: string | null;
  payoutMethod: string | null;
  officialStatus: ConfigStatus;
  policySummary: string;
  symbolRules: BrokerRebateSymbolRule[];
}

export interface BrokerExternalPortal {
  loginUrl: string;
  loginLabel: string;
  rebateCheckNote: string;
}

export interface Broker {
  slug: "exness" | "tickmill" | "fxpro" | "austex" | "bcr";
  name: string;
  shortName: string;
  logo: string;
  featured: boolean;
  priorityOrder: number;
  badge?: string;
  tagline: string;
  shortDescription: string;
  overview: string[];
  categories: ("Forex" | "Metals" | "Indices" | "Crypto")[];
  platforms: ("MT4" | "MT5" | "cTrader" | "WebTerminal")[];
  platformsStatus: ConfigStatus;
  platformsNote: string;
  accounts: BrokerAccount[];
  accountsTableLabel: string;
  tradingProducts: TradingProductCategory[];
  tradingConditions: {
    label: string;
    value: string;
    isPending?: boolean;
  }[];
  rebateConfig: BrokerRebateConfig | null;
  rebateTableLabel: string;
  referralUrl: string | null;
  externalPortal?: BrokerExternalPortal;
  trustReviews: BrokerTrustItem[];
  highlights: string[];
  faqs: FaqItem[];
  status: ConfigStatus;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: "general" | "backcom" | "broker" | "ecosystem";
}

export interface NavSubItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
}

export interface NavItem {
  title: string;
  href: string;
  children?: NavSubItem[];
}

export interface TradingRobot {
  slug: string;
  name: string;
  shortName: string;
  subtitle: string;
  badge: string;
  status: ConfigStatus;
  heroImage: string;
  supportedPlatforms: string[];
  targetSymbols: string[];
  recommendedAccount: string;
  introduction: string[];
  strategyPoints: {
    title: string;
    description: string;
  }[];
  features: {
    title: string;
    description: string;
  }[];
  accountRequirements: {
    label: string;
    value: string;
    isPending?: boolean;
  }[];
  riskNotes: string[];
  installationSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  performancePlaceholderNote: string;
  faqs: FaqItem[];
}

export interface TradingIndicator {
  id: string;
  slug: string;
  name: string;
  platform: "TradingView" | "MT5" | "MT4/MT5";
  category: string;
  status: ConfigStatus;
  subtitle: string;
  summary: string;
  features: string[];
  previewImage: string;
  targetMarkets: string[];
  recommendedTimeframes: string[];
  introduction: string[];
  howItWorks: {
    title: string;
    description: string;
  }[];
  parameters: {
    label: string;
    value: string;
  }[];
  installationSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  usageNotes: string[];
  faqs: FaqItem[];
}

export interface EquityPoint {
  period: string;
  equity: number;
  balance: number;
  drawdown: number;
}

export interface MonthlyReturnPoint {
  month: string;
  returnPct: number;
}

export interface TradeHistorySample {
  id: string;
  symbol: string;
  type: "BUY" | "SELL";
  lots: number;
  resultNote: string;
  closedPeriod: string;
}

export interface MasterTrader {
  slug: string;
  name: string;
  code: string;
  avatar: string;
  isDemo: true;
  strategyName: string;
  primaryMarkets: string[];
  roiPct: number;
  maxDrawdownPct: number;
  winRatePct: number;
  tradingDurationMonths: number;
  tradingDurationLabel: string;
  riskLevel: "Low" | "Moderate" | "High";
  riskScore: number;
  minCopyBalanceUsd: number | null;
  summary: string;
  strategyDescription: string[];
  riskManagementRules: string[];
  equityCurve: EquityPoint[];
  monthlyReturns: MonthlyReturnPoint[];
  sampleHistory: TradeHistorySample[];
}

