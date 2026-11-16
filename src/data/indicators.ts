import type { TradingIndicator } from "@/types";

export const tradingIndicators: TradingIndicator[] = [
  {
    id: "leo-session-liquidity",
    name: "Leo Session & Liquidity Zones",
    platform: "TradingView",
    category: "Market Structure & Sessions",
    status: "pending",
    summary:
      "Chỉ báo đánh dấu tự động biên độ phiên Á – Âu – Mỹ (Asian Range, London Killzone, NY Session) cùng các vùng đỉnh/đáy thanh khoản quan trọng trên biểu đồ XAUUSD và Forex.",
    features: [
      "Tự động đóng khung biên độ cao/thấp từng phiên theo múi giờ Việt Nam (UTC+7)",
      "Đánh dấu trực quan vùng Previous Day High/Low (PDH/PDL) và Weekly High/Low",
      "Cảnh báo khi giá quét qua vùng biên thanh khoản phiên trước",
    ],
    previewImage: "/images/indicators/indicator-session-preview.svg",
  },
  {
    id: "leo-trend-confluence",
    name: "Leo Multi-Timeframe Trend Matrix",
    platform: "TradingView",
    category: "Trend & Momentum",
    status: "pending",
    summary:
      "Bảng tổng hợp đồng thuận xu hướng đa khung thời gian (M15, H1, H4, D1) ngay trên góc biểu đồ, hỗ trợ trader giao dịch thuận cấu trúc thị trường lớn.",
    features: [
      "Ma trận trạng thái xu hướng 4 khung thời gian theo thời gian thực",
      "Hiển thị dải EMA động hỗ trợ nhận diện vùng hồi quy hợp lưu",
      "Giao diện tối giản chuẩn Dark Theme không gây rối nến giá",
    ],
    previewImage: "/images/indicators/indicator-trend-preview.svg",
  },
  {
    id: "leo-mt5-spread-risk-hud",
    name: "Leo Spread & Position Risk HUD",
    platform: "MT5",
    category: "Execution & Risk Utility",
    status: "pending",
    summary:
      "Tiện ích hiển thị trực tiếp trên màn hình MetaTrader 5 các thông số thực thi: Spread hiện tại, thời gian đóng nến, giá trị pip và mức rủi ro USD dự kiến trước khi vào lệnh.",
    features: [
      "Theo dõi biến động Spread trực tiếp theo từng tick trên XAUUSD & Forex",
      "Đếm ngược thời gian đóng nến hiện hành (Candle Countdown)",
      "Hiển thị thông số tỷ lệ Margin và mức sụt giảm tài khoản tức thời",
    ],
    previewImage: "/images/indicators/indicator-mt5-hud.svg",
  },
  {
    id: "leo-key-sr-structure",
    name: "Leo Dynamic Supply & Demand Mapper",
    platform: "MT4/MT5",
    category: "Supply / Demand",
    status: "pending",
    summary:
      "Công cụ hỗ trợ khoanh vùng cung cầu mất cân bằng (Order Block / Imbalance) chưa được kiểm định lại, giúp chuẩn hóa góc nhìn phân tích kỹ thuật.",
    features: [
      "Tự động cập nhật và làm mờ các vùng cung cầu đã bị phá vỡ",
      "Tùy chỉnh độ nhạy theo từng cặp tiền tệ và Vàng",
      "Hỗ trợ thông báo đẩy qua ứng dụng MetaTrader di động",
    ],
    previewImage: "/images/indicators/indicator-sr-preview.svg",
  },
];

