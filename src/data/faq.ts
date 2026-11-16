import type { FaqItem } from "@/types";

export const globalFaqs: FaqItem[] = [
  {
    id: "what-is-backcom",
    category: "backcom",
    question: "1. Backcom là gì?",
    answer:
      "Backcom (viết tắt của Back Commission, còn gọi là Forex Rebate) là khoản hoàn trả một phần phí giao dịch (spread hoặc commission) mà sàn giao dịch trích từ hoa hồng đối tác giới thiệu (IB - Introducing Broker) để chia sẻ lại cho nhà giao dịch thông qua hệ thống đối tác như Backcom Mr Leo.",
  },
  {
    id: "affect-trading",
    category: "backcom",
    question: "2. Backcom có ảnh hưởng đến giao dịch không?",
    answer:
      "Khi bạn đăng ký đúng loại tài khoản tiêu chuẩn của sàn theo mã đối tác, lệnh giao dịch của bạn vẫn khớp trực tiếp trên máy chủ của sàn với điều kiện thanh khoản do sàn quy định. Riêng một số sàn có nhiều mã tài khoản với cấu trúc spread khác nhau (ví dụ tài khoản STD05 và STD tại Austex Markets), bạn cần xem kỹ thông số cấu hình tài khoản trước khi lựa chọn để phù hợp chiến lược.",
  },
  {
    id: "how-to-register",
    category: "backcom",
    question: "3. Làm sao để đăng ký nhận Backcom?",
    answer:
      "Quy trình gồm 4 bước cơ bản: (1) Chọn sàn giao dịch phù hợp trong danh mục đối tác của Backcom Mr Leo, (2) Mở tài khoản mới qua đường dẫn đối tác chính thức hoặc chuyển mã IB cho tài khoản sẵn có, (3) Gửi ID tài khoản giao dịch (MT4/MT5 ID) để đội ngũ xác nhận liên kết, và (4) Giao dịch bình thường để ghi nhận hoàn phí theo chính sách từng sàn.",
  },
  {
    id: "existing-account",
    category: "broker",
    question: "4. Có thể dùng tài khoản hiện tại không?",
    answer:
      "Hoàn toàn có thể ở phần lớn các sàn giao dịch. Nếu bạn đã có tài khoản tại Exness, Tickmill, FxPro, Austex Markets hoặc BCR, bạn chỉ cần thực hiện thủ tục yêu cầu chuyển đối tác giới thiệu (IB Transfer) trên cổng khách hàng của sàn hoặc mở thêm một tài khoản giao dịch phụ dưới mã IB của Backcom Mr Leo. Đội ngũ hỗ trợ sẽ hướng dẫn chi tiết từng sàn.",
  },
  {
    id: "payout-schedule",
    category: "backcom",
    question: "5. Bao lâu nhận được hoàn phí?",
    answer:
      "Chu kỳ thanh toán hoàn phí phụ thuộc vào cơ chế đối soát của từng sàn giao dịch (có thể tự động hàng ngày, hàng tuần hoặc đối soát định kỳ theo tháng). Trước khi kích hoạt liên kết, đội ngũ Backcom Mr Leo sẽ thông báo rõ lịch trả hoàn phí cụ thể áp dụng cho sàn và loại tài khoản bạn chọn.",
  },
  {
    id: "lot-or-commission",
    category: "backcom",
    question: "6. Backcom được tính theo Lot hay Commission?",
    answer:
      "Tùy theo sàn và loại tài khoản, hoàn phí có thể được tính theo 3 phương thức: cố định USD trên mỗi Lot tiêu chuẩn đóng lệnh (PER_LOT), tỷ lệ phần trăm trên phí Commission đã thu (PER_COMMISSION), hoặc tính theo tổng khối lượng USD giao dịch quy đổi (PER_VOLUME). Công cụ tính Backcom trên website hỗ trợ mô phỏng đầy đủ cả 3 phương thức này.",
  },
  {
    id: "verify-account-link",
    category: "broker",
    question: "7. Làm sao kiểm tra tài khoản đã liên kết?",
    answer:
      "Sau khi hoàn tất mở tài khoản hoặc gửi yêu cầu chuyển IB, bạn chỉ cần cung cấp số tài khoản giao dịch (chỉ gửi ID tài khoản, tuyệt đối không gửi mật khẩu) qua kênh Liên hệ hoặc Zalo hỗ trợ chính thức. Đội ngũ Backcom Mr Leo sẽ kiểm tra trên cổng đối tác của sàn và phản hồi trạng thái xác nhận.",
  },
  {
    id: "multiple-brokers",
    category: "broker",
    question: "8. Có thể đăng ký nhiều sàn không?",
    answer:
      "Có. Bạn có thể liên kết nhận Backcom đồng thời trên nhiều sàn giao dịch khác nhau trong hệ sinh thái Backcom Mr Leo để phân bổ vốn, đa dạng hóa nền tảng khớp lệnh hoặc tách biệt tài khoản đánh tay và tài khoản chạy Robot EA.",
  },
  {
    id: "how-robot-works",
    category: "ecosystem",
    question: "9. Robot Trading hoạt động như thế nào?",
    answer:
      "Robot Trading (Expert Advisor - EA) như Amix Trade – Gold Cent Bot là phần mềm tự động hóa quy tắc vào lệnh, quản lý khối lượng và đóng lệnh trên nền tảng MetaTrader 5 (MT5) thông qua máy chủ VPS hoạt động liên tục. Lưu ý rằng EA là công cụ hỗ trợ kỷ luật thực thi chiến lược, không phải công cụ cam kết lợi nhuận và luôn tiềm ẩn rủi ro biến động thị trường.",
  },
  {
    id: "copy-trade-risk",
    category: "ecosystem",
    question: "10. Copy Trade có rủi ro không?",
    answer:
      "Có. Giao dịch sao chép (Copy Trade) trên thị trường Forex/CFD sử dụng đòn bẩy tài chính cao nên luôn đi kèm nguy cơ sụt giảm vốn (Drawdown) hoặc thua lỗ một phần/toàn bộ số vốn đầu tư. Hiệu suất quá khứ của bất kỳ Master Trader nào cũng không đảm bảo kết quả trong tương lai. Nhà đầu tư cần tự đánh giá khẩu vị rủi ro trước khi tham gia.",
  },
];

