import { LegalLayout } from "@/components/shared/legal-layout";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Điều khoản Dịch vụ (Terms of Service)",
  description:
    "Dự thảo Điều khoản sử dụng thông tin, công cụ tính toán và dịch vụ hỗ trợ đối tác tại Backcom Mr Leo.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalLayout
      title="Điều khoản Dịch vụ (Terms of Service)"
      subtitle="Các nguyên tắc áp dụng khi truy cập thông tin, sử dụng công cụ tính toán và tham gia hệ sinh thái Backcom Mr Leo."
      currentPath="/legal/terms"
    >
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          1. Vai trò của Backcom Mr Leo
        </h2>
        <p>
          <strong>BACKCOM MR LEO</strong> hoạt động với vai trò cổng thông tin
          đối tác giới thiệu (Introducing Broker / Affiliate Partner) và cung
          cấp công cụ kỹ thuật hỗ trợ nhà giao dịch. Chúng tôi không phải là sàn
          môi giới tài chính, không phải tổ chức tín dụng, không nhận tiền gửi
          ký quỹ và không thực hiện khớp lệnh giao dịch của khách hàng.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          2. Điều kiện ghi nhận Hoàn phí (Backcom / Rebate)
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Khoản hoàn phí phụ thuộc hoàn toàn vào việc sàn giao dịch xác nhận
            tài khoản của khách hàng nằm dưới mã đối tác hợp lệ và ghi nhận hoa
            hồng IB cho các lệnh đã đóng.
          </li>
          <li>
            Nếu sàn giao dịch từ chối ghi nhận hoa hồng do vi phạm điều khoản
            giao dịch của sàn (lạm dụng bonus, arbitrage, thời gian giữ lệnh tối
            thiểu...), khoản hoàn phí tương ứng cũng không phát sinh.
          </li>
          <li>
            Số liệu trên Backcom Calculator mang tính ước tính tham khảo hoặc mô
            phỏng minh họa, không thay thế báo cáo đối soát thực tế từ sàn.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          3. Sử dụng Công cụ Chỉ báo &amp; Robot EA
        </h2>
        <p>
          Các chỉ báo kỹ thuật và phần mềm Expert Advisor (như Amix Trade – Gold
          Cent Bot) được cung cấp như công cụ hỗ trợ tự động hóa thao tác kỹ
          thuật. Người dùng chịu hoàn toàn trách nhiệm về việc lựa chọn thông số
          cài đặt, giám sát VPS và quyết định khối lượng vốn vận hành.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          4. Cập nhật nội dung
        </h2>
        <p>
          Các điều kiện giao dịch, mức spread, danh mục tài khoản và biểu phí
          của các sàn đối tác có thể thay đổi theo chính sách từng thời kỳ của
          sàn mà không cần báo trước. Người dùng cần kiểm tra lại thông số trực
          tiếp trên trang chủ của sàn trước khi giao dịch.
        </p>
      </section>
    </LegalLayout>
  );
}

