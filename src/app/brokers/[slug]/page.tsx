import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrokerDetailTemplate } from "@/components/brokers/broker-detail-template";
import { getLiveBrokerBySlug, getLiveBrokers } from "@/lib/cms";
import { constructMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface BrokerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BrokerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const broker = await getLiveBrokerBySlug(slug);
  if (!broker) {
    return constructMetadata({
      title: "Sàn giao dịch không tồn tại",
      description: "Không tìm thấy thông tin sàn giao dịch yêu cầu.",
      path: "/brokers",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${broker.name} — Cấu hình Tài khoản & Chính sách Backcom`,
    description: broker.shortDescription,
    path: `/brokers/${broker.slug}`,
  });
}

export default async function BrokerDetailPage({
  params,
}: BrokerDetailPageProps) {
  const { slug } = await params;
  const [broker, allBrokers] = await Promise.all([
    getLiveBrokerBySlug(slug),
    getLiveBrokers(),
  ]);

  if (!broker) {
    notFound();
  }

  return <BrokerDetailTemplate broker={broker} allBrokers={allBrokers} />;
}
