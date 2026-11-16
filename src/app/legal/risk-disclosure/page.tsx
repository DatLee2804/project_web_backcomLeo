import { LegalLayout } from "@/components/shared/legal-layout";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Cảnh báo Rủi ro Giao dịch (Risk Disclosure)",
  description:
    "Tuyên bố cảnh báo rủi ro toàn diện về giao dịch Forex/CFD đòn bẩy cao, dịch vụ Backcom, Robot EA và Copy Trade.",
  path: "/legal/risk-disclosure",
});

export default function RiskDisclosurePage() {
  return (
    <LegalLayout
      title="Cảnh báo Rủi ro Giao dịch (Risk Disclosure)"
      subtitle="Thông tin bắt buộc cần cân nhắc kỹ lưỡng trước khi tham gia giao dịch ký quỹ Ngoại hối (Forex), Kim loại quý và CFD."
      currentPath="/legal/risk-disclosure"
    >
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          1. Rủi ro đòn bẩy tài chính trong Forex &amp; CFD
        </h2>
        <p>
          Giao dịch ngoại hối (Forex), vàng (XAUUSD) và hợp đồng chênh lệch
          (CFD) trên cơ sở ký quỹ mang mức độ rủi ro rất cao. Đòn bẩy tài chính
          có thể khuếch đại lợi nhuận nhưng đồng thời cũng khuếch đại khoản lỗ
          nhanh chóng, dẫn đến khả năng mất một phần hoặc toàn bộ số vốn đầu tư
          ban đầu. Bạn chỉ nên giao dịch bằng nguồn vốn nhàn rỗi có thể chấp
          nhận tổn thất.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          2. Rủi ro liên quan đến Hoàn phí (Backcom)
        </h2>
        <p>
          Backcom / Forex Rebate đơn thuần là khoản hoàn trả một phần phí giao
          dịch theo điều kiện từng sàn, <strong>không phải lợi nhuận giao dịch</strong>{" "}
          và không thể bù đắp cho một chiến lược giao dịch thua lỗ hoặc thiếu kỷ
          luật quản lý vốn. Nhà giao dịch tuyệt đối không tăng tần suất hay khối
          lượng lệnh bất hợp lý chỉ nhằm mục đích nhận thêm hoàn phí.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          3. Rủi ro vận hành Robot Trading (EA)
        </h2>
        <p>
          Robot giao dịch tự động (Expert Advisor) không đảm bảo tạo ra lợi
          nhuận. Trong các điều kiện thị trường biến động cực đoan, trượt giá
          (slippage), giãn spread đột biến hoặc sự cố mất kết nối VPS/máy chủ,
          tài khoản chạy EA (bao gồm cả tài khoản Cent) vẫn đối mặt với nguy cơ
          cháy tài khoản (Stop Out).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          4. Rủi ro Copy Trade &amp; Hiệu suất quá khứ
        </h2>
        <p>
          Sao chép giao dịch (Copy Trade) tiềm ẩn nguy cơ thua lỗ tương tự tự
          giao dịch. Hiệu suất trong quá khứ của bất kỳ nhà giao dịch hay thuật
          toán nào cũng hoàn toàn không đảm bảo cho hiệu suất trong tương lai.
        </p>
      </section>
    </LegalLayout>
  );
}

