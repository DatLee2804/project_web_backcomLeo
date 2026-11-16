import type { TradingRobot } from "@/types";

export const tradingRobots: TradingRobot[] = [
  {
    slug: "amix-gold-cent",
    name: "AMIX TRADE – GOLD CENT BOT",
    shortName: "Amix Gold Cent Bot",
    subtitle:
      "Giải pháp Expert Advisor (EA) vận hành tự động trên nền tảng MetaTrader 5, thiết kế chuyên biệt cho cặp XAUUSD trên cấu trúc tài khoản Cent.",
    badge: "MT5 EXPERT ADVISOR",
    status: "pending",
    heroImage: "/images/robots/amix-gold-cent-preview.svg",
    supportedPlatforms: ["MetaTrader 5 (MT5)", "Windows VPS 24/5"],
    targetSymbols: ["XAUUSDc (Gold Cent)", "XAUUSD (Cấu hình mở rộng)"],
    recommendedAccount: "Tài khoản Cent (hoặc cấu hình theo khuyến nghị kỹ thuật từng sàn)",
    introduction: [
      "AMIX TRADE – GOLD CENT BOT là giải pháp giao dịch tự động (Expert Advisor) thuộc hệ sinh thái Backcom Mr Leo, hướng tới việc loại bỏ yếu tố tâm lý cảm tính và duy trì kỷ luật quản lý vị thế khi giao dịch Vàng (XAUUSD).",
      "Việc vận hành trên đơn vị tài khoản Cent cho phép chia nhỏ quy mô khối lượng giao dịch thành nhiều lớp linh hoạt hơn so với tài khoản Standard truyền thống, đồng thời tối ưu hóa hiệu quả cộng hưởng cùng cơ chế hoàn phí Backcom.",
      "Tất cả báo cáo hiệu suất thực chiến và thông số backtest kiểm toán độc lập hiện đang trong quá trình chuẩn hóa dữ liệu — chúng tôi không công bố số liệu lợi nhuận giả định.",
    ],
    strategyPoints: [
      {
        title: "Thực thi tự động theo biên độ biến động XAUUSD",
        description:
          "Thuật toán theo dõi cấu trúc biến động giá của Vàng theo phiên giao dịch Á – Âu – Mỹ, tự động tính toán khoảng cách lệnh và điểm thoát vị thế trung bình theo thông số cài đặt.",
      },
      {
        title: "Phân bổ đơn vị vốn trên tài khoản Cent",
        description:
          "Sử dụng mệnh giá Cent (1 USD = 100 USC) để kiểm soát tỷ lệ ký quỹ chi tiết, cho phép thiết lập khối lượng khởi điểm nhỏ và giới hạn mức chịu đựng rủi ro theo ngưỡng vốn được cấp.",
      },
      {
        title: "Bộ lọc thời gian & bảo vệ biến động tin tức mạnh",
        description:
          "Hỗ trợ thiết lập khung giờ tạm ngưng mở chuỗi lệnh mới trước các sự kiện kinh tế vĩ mô quan trọng (FOMC, CPI, Non-Farm Payrolls) kết hợp cơ chế giới hạn sụt giảm tài khoản (Equity Stop).",
      },
      {
        title: "Kết hợp tối ưu cùng cơ chế Backcom",
        description:
          "Khi vận hành EA đều đặn trên tài khoản đã liên kết đối tác Backcom Mr Leo, phần hoàn phí giao dịch giúp bù đắp một phần chi phí spread dài hạn (lưu ý: hoàn phí không phải cam kết lợi nhuận).",
      },
    ],
    features: [
      {
        title: "Tương thích chuẩn MT5",
        description: "Cài đặt trực tiếp dưới dạng file biên dịch .ex5 trên nền tảng MetaTrader 5 máy tính hoặc VPS.",
      },
      {
        title: "Bảng điều khiển trực quan trên Chart",
        description: "Hiển thị trạng thái chuỗi lệnh, mức ký quỹ hiện hành, drawdown tạm tính và trạng thái kết nối máy chủ.",
      },
      {
        title: "Quản trị rủi ro Equity Protection",
        description: "Cho phép người vận hành cài đặt ngưỡng cắt lỗ tổng tài sản để giới hạn rủi ro khi thị trường biến động cực đoan.",
      },
      {
        title: "Tùy biến thông số theo khẩu vị rủi ro",
        description: "Hỗ trợ các bộ preset tham khảo (An toàn / Cân bằng) kèm hướng dẫn kỹ thuật 1-1 từ đội ngũ.",
      },
    ],
    accountRequirements: [
      { label: "Nền tảng bắt buộc", value: "MetaTrader 5 (MT5)" },
      { label: "Loại tài khoản mục tiêu", value: "Tài khoản Cent (hỗ trợ XAUUSD)" },
      { label: "Mức vốn tối thiểu khuyến nghị", value: "Đang cập nhật theo từng preset", isPending: true },
      { label: "Đòn bẩy khuyến nghị", value: "Đang cập nhật theo quy định sàn", isPending: true },
      { label: "Hạ tầng treo máy", value: "VPS Windows ổn định hoạt động 24/5 (độ trễ thấp)" },
      { label: "Điều kiện cấp quyền sử dụng", value: "Liên hệ đội ngũ Backcom Mr Leo để xác nhận tài khoản đối tác" },
    ],
    riskNotes: [
      "Giao dịch tự động bằng Robot (EA) trên cặp XAUUSD luôn tiềm ẩn rủi ro thua lỗ cao, đặc biệt trong điều kiện thị trường chạy một chiều biên độ lớn không có nhịp hồi.",
      "Tài khoản Cent giúp chia nhỏ quy mô vốn nhưng KHÔNG loại bỏ rủi ro cháy tài khoản nếu cài đặt khối lượng vượt quá sức chịu đựng của vốn.",
      "Backcom Mr Leo cung cấp giải pháp công cụ kỹ thuật, tuyệt đối không cam kết tỷ suất sinh lời cố định và không nhận ủy thác giữ vốn của khách hàng.",
    ],
    installationSteps: [
      {
        step: 1,
        title: "Chuẩn bị tài khoản MT5 & VPS",
        description:
          "Mở tài khoản giao dịch phù hợp dưới mã đối tác Backcom Mr Leo và chuẩn bị máy chủ ảo VPS Windows chạy nền tảng MT5.",
      },
      {
        step: 2,
        title: "Xác thực ID tài khoản nhận bản quyền EA",
        description:
          "Gửi ID tài khoản MT5 (không gửi mật khẩu) cho đội ngũ hỗ trợ để kích hoạt giấy phép sử dụng theo số tài khoản.",
      },
      {
        step: 3,
        title: "Cài đặt file EA vào thư mục MQL5/Experts",
        description:
          "Mở Data Folder trên MT5, sao chép file Amix Gold Cent Bot vào thư mục MQL5/Experts, bật Algo Trading và làm mới Navigator.",
      },
      {
        step: 4,
        title: "Nạp bộ thông số (Preset) & Giám sát định kỳ",
        description:
          "Kéo EA vào biểu đồ XAUUSD khung thời gian khuyến nghị, nạp file cấu hình .set được hướng dẫn và theo dõi định kỳ đặc biệt vào ngày có tin mạnh.",
      },
    ],
    performancePlaceholderNote:
      "Báo cáo hiệu suất thực tế (Myfxbook / MQL5 Signal đã kiểm chứng) và dữ liệu kiểm thử lịch sử của AMIX TRADE – GOLD CENT BOT hiện đang chờ cập nhật chính thức. Website không hiển thị biểu đồ backtest giả định.",
    faqs: [
      {
        id: "amix-cost",
        question: "Chi phí sử dụng Amix Trade – Gold Cent Bot như thế nào?",
        answer:
          "Chính sách cấp quyền sử dụng EA dành cho thành viên liên kết tài khoản đối tác trong hệ sinh thái đang được cập nhật chi tiết. Vui lòng liên hệ trực tiếp đội ngũ để được tư vấn điều kiện kích hoạt.",
      },
      {
        id: "amix-broker-support",
        question: "Amix Gold Cent Bot chạy được trên những sàn nào?",
        answer:
          "EA được thiết kế cho nền tảng MT5 trên các sàn có cung cấp loại tài khoản Cent cho cặp XAUUSD. Đội ngũ kỹ thuật sẽ kiểm tra thông số hợp đồng (Contract Size, Step Lot, Stop Level) của sàn bạn chọn trước khi cài đặt.",
      },
      {
        id: "amix-vps-required",
        question: "Tôi có bắt buộc phải thuê VPS để chạy Bot không?",
        answer:
          "Có. Vì EA trên MT5 cần kết nối máy chủ liên tục 24/5 để quản lý các vị thế đang mở và đặt lệnh đóng tự động, việc tắt máy tính cá nhân hoặc mất mạng sẽ làm gián đoạn thuật toán quản lý rủi ro.",
      },
    ],
  },
];

export function getRobotBySlug(slug: string): TradingRobot | undefined {
  return tradingRobots.find((r) => r.slug === slug);
}

