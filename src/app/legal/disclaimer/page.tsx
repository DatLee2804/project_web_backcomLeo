import { LegalLayout } from "@/components/shared/legal-layout";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Tuyên bố Miễn trừ Trách nhiệm (Disclaimer)",
  description:
    "Dự thảo Tuyên bố miễn trừ trách nhiệm pháp lý và nguyên tắc trích dẫn thông tin đánh giá sàn trên Backcom Mr Leo.",
  path: "/legal/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Tuyên bố Miễn trừ Trách nhiệm (Disclaimer)"
      subtitle="Làm rõ giới hạn thông tin, nguồn trích dẫn và trách nhiệm tự quyết định của người truy cập."
      currentPath="/legal/disclaimer"
    >
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          1. Không phải Lời khuyên Đầu tư hay Tư vấn Tài chính
        </h2>
        <p>
          Toàn bộ nội dung, bài viết giải thích, chỉ báo kỹ thuật, biểu đồ minh
          họa DEMO và công cụ tính toán trên <strong>backcommrleo.com.vn</strong>{" "}
          chỉ phục vụ mục đích cung cấp thông tin tham khảo và hỗ trợ kỹ thuật.
          Không có bất kỳ nội dung nào trên website cấu thành lời mời chào đầu
          tư, khuyến nghị mua/bán tài sản tài chính hay cam kết sinh lời.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          2. Nguồn gốc thông tin đánh giá Sàn giao dịch
        </h2>
        <p>
          Các mục tra cứu đánh giá và giấy phép sàn (Trustpilot, WikiFX,
          Myfxbook, Regulation) khi được cập nhật đều phải trích dẫn nguồn gốc
          và thời điểm ghi nhận. Những hạng mục chưa được xác minh được hiển thị
          rõ là &ldquo;Chưa cập nhật&rdquo; hoặc &ldquo;Đang cập nhật&rdquo;.
          Người dùng có trách nhiệm tự kiểm chứng trực tiếp với cơ quan quản lý
          và sàn môi giới trước khi mở tài khoản.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          3. Tuân thủ quy định pháp luật sở tại
        </h2>
        <p>
          Thông tin trên website không hướng tới cư dân tại bất kỳ quốc gia hoặc
          khu vực tài phán nào mà việc phân phối hoặc sử dụng các dịch vụ liên
          quan trái với quy định pháp luật hiện hành tại địa phương đó. Người
          truy cập tự chịu trách nhiệm tìm hiểu và tuân thủ quy định pháp luật
          nơi mình cư trú.
        </p>
      </section>
    </LegalLayout>
  );
}

