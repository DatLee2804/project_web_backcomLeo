import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";
import {
  getLiveBrokers,
  getLiveIndicators,
  getLiveMasters,
  getLiveRobots,
} from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.domain;
  const now = new Date();

  const [brokers, indicators, robots, masters] = await Promise.all([
    getLiveBrokers(),
    getLiveIndicators(),
    getLiveRobots(),
    getLiveMasters(),
  ]);

  const staticRoutes = [
    "",
    "/backcom",
    "/backcom/what-is-backcom",
    "/brokers",
    "/tools",
    "/tools/calculator",
    "/robots",
    "/copy-trading",
    "/community",
    "/about",
    "/contact",
    "/faq",
    "/legal/privacy-policy",
    "/legal/terms",
    "/legal/risk-disclosure",
    "/legal/disclaimer",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/legal") ? 0.4 : 0.8,
  }));

  const brokerEntries: MetadataRoute.Sitemap = brokers.map((b) => ({
    url: `${baseUrl}/brokers/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: b.featured ? 0.95 : 0.85,
  }));

  const robotEntries: MetadataRoute.Sitemap = robots.map((r) => ({
    url: `${baseUrl}/robots/${r.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const indicatorEntries: MetadataRoute.Sitemap = indicators.map((ind) => ({
    url: `${baseUrl}/tools/indicators/${ind.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const masterEntries: MetadataRoute.Sitemap = masters.map((m) => ({
    url: `${baseUrl}/copy-trading/masters/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...brokerEntries,
    ...robotEntries,
    ...indicatorEntries,
    ...masterEntries,
  ];
}
