import { BrokerDetailTemplate } from "@/components/brokers/broker-detail-template";
import { getBrokerBySlug } from "@/data/brokers";
import { constructMetadata } from "@/lib/seo";

const broker = getBrokerBySlug("fxpro")!;

export const metadata = constructMetadata({
  title: "FxPro — Thông tin Sàn giao dịch & Hoàn phí Backcom",
  description:
    "Kết nối hoàn phí giao dịch Forex & CFD tại sàn FxPro trên nền tảng MT4/MT5 cùng hệ sinh thái đối tác Backcom Mr Leo.",
  path: "/brokers/fxpro",
});

export default function FxProBrokerPage() {
  return <BrokerDetailTemplate broker={broker} />;
}

