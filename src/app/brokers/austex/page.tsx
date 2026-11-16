import { BrokerDetailTemplate } from "@/components/brokers/broker-detail-template";
import { getBrokerBySlug } from "@/data/brokers";
import { constructMetadata } from "@/lib/seo";

const broker = getBrokerBySlug("austex")!;

export const metadata = constructMetadata({
  title: "Austex Markets — Tài khoản mặc định STD05 & Chính sách Backcom",
  description:
    "Thông tin đối tác trọng tâm Austex Markets tại Backcom Mr Leo: cấu hình tài khoản mặc định STD05 (XAUUSD Spread: 36), đối chiếu tài khoản STD và công cụ tính hoàn phí.",
  path: "/brokers/austex",
});

export default function AustexBrokerPage() {
  return <BrokerDetailTemplate broker={broker} />;
}

