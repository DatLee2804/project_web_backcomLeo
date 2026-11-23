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
  slug: string;
  name: string;
  shortName: string;
  logo: string;
  featured: boolean;
  priorityOrder: number;
  isPublished?: boolean;
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
  isPublished?: boolean;
  sortOrder?: number;
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
  isPublished?: boolean;
  sortOrder?: number;
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
  isDemo: boolean;
  isPublished?: boolean;
  sortOrder?: number;
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

export type LeadStatus = "new" | "contacted" | "completed";

export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  phoneOrZalo: string;
  interestedBroker: string;
  message: string;
  status: LeadStatus;
  adminNote: string;
  createdAt: string;
}

export type UserRole = "user" | "admin";
export type AuthProviderType = "credentials" | "google" | "env-admin";

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  phoneOrZalo: string;
  passwordHash?: string | null;
  provider: AuthProviderType;
  googleId?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  provider: AuthProviderType;
  avatarUrl?: string | null;
}

export interface HomePageCmsContent {
  promoBar: {
    enabled: boolean;
    badge: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    floatingTagTitle: string;
    floatingTagSub: string;
    stats: { value: string; label: string }[];
  };
  promoVideo: {
    videoSrc: string | null;
    posterSrc: string | null;
    badge: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
  };
  rebateLoop: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    footnote: string;
  };
  community: {
    badge: string;
    title: string;
    description: string;
    zaloGroupUrl: string;
    ctaLabel: string;
    imageUrl: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  faqs: FaqItem[];
}

export interface BackcomPageCmsContent {
  hero: {
    badge: string;
    title: string;
    highlightWord: string;
    description: string;
  };
  explanation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    importantNote: string;
    flowSteps: { actor: string; desc: string }[];
  };
  benefits: { title: string; description: string }[];
  bottomCta: {
    title: string;
    description: string;
  };
  deepGuide: {
    badge: string;
    title: string;
    intro: string;
    sections: { heading: string; content: string }[];
    warnings: string[];
  };
}

export interface BrokersPageCmsContent {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  comparisonTable: {
    title: string;
    subtitle: string;
  };
}

export interface SitePagesContent {
  home: HomePageCmsContent;
  backcom: BackcomPageCmsContent;
  brokersPage: BrokersPageCmsContent;
}

