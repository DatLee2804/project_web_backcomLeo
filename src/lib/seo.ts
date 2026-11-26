import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "BACKCOM MR LEO",
  slogan: "TRADE SMARTER. GET MORE BACK.",
  subSlogan: "Your Trading Ecosystem.",
  domain: "https://backcommrleo.com.vn",
  locale: "vi_VN",
  zaloGroupUrl: "https://zalo.me/g/tnhicz815",
  zaloPersonalUrl: "https://zalo.me/0938323830",
  zaloPhone: "0938.323.830",
  bcrPortalLoginUrl: "https://thebcr.com/portal/sign-in?lang=en-us&tenantId=10000",
  description:
    "Hệ sinh thái hỗ trợ trader tối ưu chi phí giao dịch Forex thông qua hoàn phí (Backcom/Rebate), kết nối sàn giao dịch, Trading Tools, Robot EA và Copy Trade.",
};

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const canonicalUrl = `${SITE_CONFIG.domain}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/"
      ? `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan}`
      : `${title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_CONFIG.domain),
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      shortcut: ["/icon.png"],
      apple: [{ url: "/icon.png", type: "image/png" }],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: "/images/hero/og-cover.svg",
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.slogan}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/images/hero/og-cover.svg"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

