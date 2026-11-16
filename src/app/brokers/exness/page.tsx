import { BrokerDetailTemplate } from "@/components/brokers/broker-detail-template";
import { getBrokerBySlug } from "@/data/brokers";
import { constructMetadata } from "@/lib/seo";

const broker = getBrokerBySlug("exness")!;

export const metadata = constructMetadata({
  title: "Exness — Hướng dẫn Liên kết IB & Hoàn phí Backcom",
  description:
    "Tìm hiểu cách liên kết tài khoản giao dịch Exness trên nền tảng MT4/MT5 cùng hệ sinh thái Backcom Mr Leo và ước tính hoàn phí trực quan.",
  path: "/brokers/exness",
});

export default function ExnessBrokerPage() {
  return <BrokerDetailTemplate broker={broker} />;
}

