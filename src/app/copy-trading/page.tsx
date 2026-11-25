import { AlertTriangle } from "lucide-react";
import { MastersExplorer } from "@/components/copy-trading/masters-explorer";
import { Badge } from "@/components/ui/badge";
import { getLiveMasters } from "@/lib/cms";
import { constructMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = constructMetadata({
  title: "Copy Trading & Danh sách Master Traders",
  description:
    "Tìm hiểu hệ thống phân tích hiệu suất Copy Trading và cấu trúc đánh giá rủi ro Master Traders trong hệ sinh thái Backcom Mr Leo.",
  path: "/copy-trading",
});

export default async function CopyTradingPage() {
  const masters = await getLiveMasters();

  return (
    <div className="bg-background py-14 sm:py-18 lg:py-22">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="gold">COPY TRADING ECOSYSTEM</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
            DISCOVER MASTER TRADERS
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            Đánh giá toàn diện chiến lược giao dịch thông qua bộ chỉ số minh
            bạch: Tỷ suất lợi nhuận (ROI), Sụt giảm vốn tối đa (Max Drawdown),
            Tỷ lệ thắng và Đường cong vốn (Equity Curve).
          </p>
        </div>

        <div className="mt-10">
          <MastersExplorer items={masters} />
        </div>

        {/* Risk Governance Notice */}
        <div className="mt-14 rounded-card border border-amber-400/30 bg-amber-500/[0.07] p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <div className="text-xs leading-relaxed text-ink-secondary sm:text-sm">
              <strong className="text-ink-primary">
                Nguyên tắc Quản trị Rủi ro trong Copy Trading:
              </strong>{" "}
              Giao dịch sao chép không đồng nghĩa với lợi nhuận thụ động an
              toàn. Mọi chiến lược trên thị trường Forex/CFD đều có giai đoạn
              sụt giảm tài sản (Drawdown). Nhà đầu tư chỉ nên phân bổ phần vốn
              nhàn rỗi có thể chấp nhận rủi ro và chủ động cài đặt hạn mức ngắt
              sao chép (Stop Copy Equity).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

