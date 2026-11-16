import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";
import { brokers } from "@/data/brokers";
import { masterTraders } from "@/data/masters";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;
  const now = new Date();

  const staticRoutes = [
    "",
    "/backcom",
    "/backcom/what-is-backcom",
    "/brokers",
    "/tools",
    "/tools/calculator",
    "/tools/indicators",
    "/robots",
    "/robots/amix-gold-cent",
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

  const masterEntries: MetadataRoute.Sitemap = masterTraders.map((m) => ({
    url: `${baseUrl}/copy-trading/masters/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...brokerEntries, ...masterEntries];
}

