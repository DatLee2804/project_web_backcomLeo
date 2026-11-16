import { BrokerDetailTemplate } from "@/components/brokers/broker-detail-template";
import { getBrokerBySlug } from "@/data/brokers";
import { constructMetadata } from "@/lib/seo";

const broker = getBrokerBySlug("tickmill")!;

export const metadata = constructMetadata({
  title: "Tickmill — Cấu hình Tài khoản MT4/MT5 & Chính sách Backcom",
  description:
    "Khám phá thông tin đối tác sàn giao dịch Tickmill, nền tảng MT4/MT5 và công cụ mô phỏng hoàn phí giao dịch Forex tại Backcom Mr Leo.",
  path: "/brokers/tickmill",
});

export default function TickmillBrokerPage() {
  return <BrokerDetailTemplate broker={broker} />;
}

