import { NextResponse } from "next/server";
import {
  getCurrentUserSession,
  isGoogleOAuthConfigured,
} from "@/lib/auth";
import { getLiveBrokers, getSitePagesContent } from "@/lib/cms";

export async function GET() {
  const [user, sitePages, brokers] = await Promise.all([
    getCurrentUserSession(),
    getSitePagesContent(),
    getLiveBrokers(),
  ]);

  const brokersNav = [
    {
      title: "Tất cả sàn giao dịch",
      href: "/brokers",
      description: `So sánh tổng quan ${brokers.length} sàn đối tác chiến lược.`,
    },
    ...brokers.map((b) => ({
      title: b.name,
      href: `/brokers/${b.slug}`,
      description: b.shortDescription,
      badge: b.featured ? "Priority" : undefined,
    })),
  ];

  return NextResponse.json({
    user,
    googleConfigured: isGoogleOAuthConfigured(),
    promoBar: sitePages.home.promoBar,
    brokersNav,
  });
}
