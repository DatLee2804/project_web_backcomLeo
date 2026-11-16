import { LegalLayout } from "@/components/shared/legal-layout";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Chính sách Bảo mật (Privacy Policy)",
  description:
    "Dự thảo Chính sách bảo mật thông tin người dùng khi truy cập và gửi yêu cầu tư vấn tại Backcom Mr Leo.",
  path: "/legal/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Chính sách Bảo mật (Privacy Policy)"
      subtitle="Quy định về phạm vi thu thập, mục đích sử dụng và nguyên tắc bảo vệ thông tin liên hệ của người dùng."
      currentPath="/legal/privacy-policy"
    >
      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          1. Phạm vi thông tin thu thập
        </h2>
        <p>
          Khi bạn chủ động điền biểu mẫu tư vấn trên website{" "}
          <strong>backcommrleo.com.vn</strong>, các trường thông tin cơ bản có
          thể bao gồm: Họ tên, Địa chỉ Email, Số điện thoại/Zalo, sàn giao dịch
          quan tâm và nội dung câu hỏi.
        </p>
        <p>
          <strong className="text-gold-light">Nguyên tắc cốt lõi:</strong> Chúng
          tôi KHÔNG bao giờ yêu cầu hoặc thu thập mật khẩu đăng nhập sàn giao
          dịch, mật khẩu Master MT4/MT5, mã PIN rút tiền hay thông tin thẻ thanh
          toán của khách hàng.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          2. Mục đích sử dụng thông tin
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Phản hồi yêu cầu hướng dẫn mở tài khoản đối tác hoặc kiểm tra trạng
            thái liên kết mã IB thông qua số ID tài khoản giao dịch.
          </li>
          <li>
            Cấp quyền truy cập các tiện ích kỹ thuật (TradingView Invite-only
            Indicators, gói cài đặt MT5) khi người dùng đăng ký.
          </li>
          <li>
            Thông báo thay đổi quan trọng về cấu hình tài khoản hoặc chính sách
            hoàn phí của các sàn đối tác.
          </li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          3. Liên kết bên thứ ba
        </h2>
        <p>
          Website có chứa liên kết dẫn tới các nền tảng bên thứ ba độc lập (như
          nhóm Zalo cộng đồng hoặc trang cổng đăng nhập khách hàng của sàn giao
          dịch). Mỗi nền tảng bên ngoài đều có chính sách bảo mật riêng mà người
          dùng cần tự rà soát trước khi thao tác.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-bold text-ink-primary">
          4. Quyền của người dùng
        </h2>
        <p>
          Người dùng có quyền yêu cầu chỉnh sửa hoặc ngừng nhận thông tin hỗ trợ
          bất kỳ lúc nào bằng cách liên hệ trực tiếp với quản trị viên qua các
          kênh hỗ trợ chính thức trên website.
        </p>
      </section>
    </LegalLayout>
  );
}

