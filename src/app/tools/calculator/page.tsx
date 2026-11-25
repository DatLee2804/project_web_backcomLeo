import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CalculatorHub } from "@/components/tools/calculator-hub";
import { Badge } from "@/components/ui/badge";
import { getLiveBrokers } from "@/lib/cms";
import { constructMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = constructMetadata({
  title: "Công cụ Tính Backcom & Khối lượng Giao dịch (Trading Calculator)",
  description:
    "Tính toán trực tiếp khoản hoàn phí Forex (Backcom/Rebate) theo sàn giao dịch, loại tài khoản (mặc định Austex STD05) và khối lượng lot hàng tháng.",
  path: "/tools/calculator",
});

export default async function CalculatorPage() {
  const brokers = await getLiveBrokers();

  return (
    <div className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="container">
        <Link
          href="/backcom"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại trang Dịch vụ Backcom
        </Link>

        <div className="mt-6 max-w-3xl">
          <Badge variant="gold">EXTENSIBLE CALCULATOR SUITE</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
            Backcom &amp; Trading Calculator
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            Phiên bản hiện tại ưu tiên vận hành hoàn chỉnh{" "}
            <strong className="text-gold-light">Backcom Calculator</strong> với
            3 mô hình quy đổi hoàn phí độc lập. Các mô-đun tính Lot Size và Quản
            trị rủi ro được thiết kế sẵn kiến trúc mở rộng cho giai đoạn tiếp
            theo.
          </p>
        </div>

        <div id="roadmap" className="mt-10 scroll-mt-24">
          <CalculatorHub brokersList={brokers} />
        </div>
      </div>
    </div>
  );
}

