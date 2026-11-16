import { BrokerDetailTemplate } from "@/components/brokers/broker-detail-template";
import { getBrokerBySlug } from "@/data/brokers";
import { constructMetadata } from "@/lib/seo";

const broker = getBrokerBySlug("bcr")!;

export const metadata = constructMetadata({
  title: "BCR — Hướng dẫn Tài khoản, Cổng Đăng nhập & Kiểm tra Rebate",
  description:
    "Hướng dẫn liên kết tài khoản sàn BCR, lối tắt cổng khách hàng BCR (thebcr.com) và quy trình kiểm tra hoàn phí độc lập cùng Backcom Mr Leo.",
  path: "/brokers/bcr",
});

export default function BcrBrokerPage() {
  return <BrokerDetailTemplate broker={broker} />;
}

