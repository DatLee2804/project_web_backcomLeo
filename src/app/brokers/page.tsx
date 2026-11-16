import { BrokersExplorer } from "@/components/brokers/brokers-explorer";
import { Badge } from "@/components/ui/badge";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Danh sách Sàn giao dịch Đối tác (Brokers)",
  description:
    "Khám phá và so sánh 5 sàn giao dịch đối tác trong hệ sinh thái Backcom Mr Leo: Austex Markets (ưu tiên mặc định STD05), Exness, Tickmill, FxPro và BCR.",
  path: "/brokers",
});

export default function BrokersListingPage() {
  return (
    <div className="bg-background py-14 sm:py-18 lg:py-22">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="gold">BROKER ECOSYSTEM</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
            EXPLORE OUR BROKERS
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            Lựa chọn đối tác sàn giao dịch phù hợp với phương pháp của bạn, đối
            chiếu minh bạch cấu hình tài khoản (ưu tiên{" "}
            <strong className="text-gold-light">Austex Markets STD05</strong>) và
            kết nối nhận hoàn phí giao dịch an toàn.
          </p>
        </div>

        <div className="mt-10">
          <BrokersExplorer />
        </div>
      </div>
    </div>
  );
}

