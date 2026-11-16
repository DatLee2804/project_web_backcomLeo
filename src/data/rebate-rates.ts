import type { Broker, BrokerRebateConfig } from "@/types";

export const DEMO_REBATE_RATE_PER_LOT = 5;

export const brokerRebateConfigs: Record<Broker["slug"], BrokerRebateConfig> = {
  austex: {
    defaultMethod: "PER_LOT",
    payoutFrequency: null,
    payoutMethod: null,
    officialStatus: "pending",
    policySummary:
      "Chính sách hoàn phí tại Austex Markets được cấu hình riêng theo mã tài khoản (ưu tiên mặc định tài khoản STD05 với thông số cấu hình XAUUSD Spread: 36). Biểu phí hoàn trả chính thức đang chờ cập nhật từ bảng đối soát đối tác.",
    symbolRules: [
      {
        symbol: "XAUUSD",
        label: "XAUUSD (Gold / Vàng)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot tiêu chuẩn",
        method: "PER_LOT",
        note: "Áp dụng theo loại tài khoản đã chọn (mặc định STD05 - thông số cấu hình Gold Spread: 36).",
      },
      {
        symbol: "EURUSD",
        label: "EURUSD (Forex Majors)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot tiêu chuẩn",
        method: "PER_LOT",
        note: "Mức hoàn phí chính thức cho cặp tiền chính đang chờ cập nhật.",
      },
      {
        symbol: "GBPUSD",
        label: "GBPUSD (Forex Majors)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot tiêu chuẩn",
        method: "PER_LOT",
        note: "Mức hoàn phí chính thức đang chờ cập nhật.",
      },
      {
        symbol: "US30",
        label: "US30 / Chỉ số CFD",
        officialRate: null,
        demoSuggestedRate: null,
        unitLabel: "USD / Lot",
        method: "PER_LOT",
        note: "Đơn vị hợp đồng CFD chỉ số cần xác nhận trước khi áp dụng.",
      },
    ],
  },
  exness: {
    defaultMethod: "PER_LOT",
    payoutFrequency: null,
    payoutMethod: null,
    officialStatus: "pending",
    policySummary:
      "Mức hoàn phí Exness phụ thuộc vào từng phân hạng tài khoản và sản phẩm giao dịch (Vàng, Forex, Crypto, Chỉ số). Dữ liệu biểu phí chính thức đang được cập nhật.",
    symbolRules: [
      {
        symbol: "XAUUSD",
        label: "XAUUSD (Gold / Vàng)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot đóng lệnh",
        method: "PER_LOT",
        note: "Chưa cập nhật biểu phí chính thức; hỗ trợ tính thử bằng dữ liệu minh họa.",
      },
      {
        symbol: "EURUSD",
        label: "EURUSD (Forex Majors)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot đóng lệnh",
        method: "PER_LOT",
        note: "Chưa cập nhật biểu phí chính thức.",
      },
      {
        symbol: "BTCUSD",
        label: "BTCUSD (Crypto CFD)",
        officialRate: null,
        demoSuggestedRate: null,
        unitLabel: "USD / 1M USD Volume",
        method: "PER_VOLUME",
        note: "Sản phẩm Crypto CFD thường tính theo khối lượng USD quy đổi (chờ cập nhật).",
      },
    ],
  },
  tickmill: {
    defaultMethod: "PER_COMMISSION",
    payoutFrequency: null,
    payoutMethod: null,
    officialStatus: "pending",
    policySummary:
      "Tùy cấu trúc tài khoản tại Tickmill, hoàn phí có thể được trích theo tỷ lệ % Commission hoặc USD cố định mỗi Lot. Thông số chính thức đang chờ cập nhật.",
    symbolRules: [
      {
        symbol: "EURUSD",
        label: "EURUSD (Forex Majors)",
        officialRate: null,
        demoSuggestedRate: null,
        unitLabel: "% Commission hoặc USD / Lot",
        method: "PER_COMMISSION",
        note: "Chưa cập nhật tỷ lệ hoàn Commission chính thức.",
      },
      {
        symbol: "XAUUSD",
        label: "XAUUSD (Gold / Vàng)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot tiêu chuẩn",
        method: "PER_LOT",
        note: "Chưa cập nhật biểu phí chính thức; có thể mô phỏng minh họa theo Lot.",
      },
      {
        symbol: "GBPUSD",
        label: "GBPUSD (Forex Majors)",
        officialRate: null,
        demoSuggestedRate: null,
        unitLabel: "% Commission",
        method: "PER_COMMISSION",
        note: "Chưa cập nhật tỷ lệ hoàn Commission chính thức.",
      },
    ],
  },
  fxpro: {
    defaultMethod: "PER_VOLUME",
    payoutFrequency: null,
    payoutMethod: null,
    officialStatus: "pending",
    policySummary:
      "Cơ chế hoàn phí FxPro thay đổi tùy theo nền tảng khớp lệnh (MT4/MT5) và nhóm sản phẩm. Bảng tỷ lệ hoàn phí theo khối lượng giao dịch đang được cập nhật.",
    symbolRules: [
      {
        symbol: "EURUSD",
        label: "EURUSD (Forex Majors)",
        officialRate: null,
        demoSuggestedRate: null,
        unitLabel: "USD / 1M USD Volume",
        method: "PER_VOLUME",
        note: "Chưa cập nhật mức hoàn theo triệu USD khối lượng giao dịch.",
      },
      {
        symbol: "XAUUSD",
        label: "XAUUSD (Gold / Vàng)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot tiêu chuẩn",
        method: "PER_LOT",
        note: "Chưa cập nhật biểu phí chính thức.",
      },
    ],
  },
  bcr: {
    defaultMethod: "PER_LOT",
    payoutFrequency: null,
    payoutMethod: null,
    officialStatus: "pending",
    policySummary:
      "Hoàn phí tại BCR được đối soát dựa trên tài khoản đã liên kết mã đối tác Backcom Mr Leo (độc lập với cổng đăng nhập khách hàng BCR). Biểu phí chính thức đang chờ cập nhật.",
    symbolRules: [
      {
        symbol: "XAUUSD",
        label: "XAUUSD (Gold / Vàng)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot tiêu chuẩn",
        method: "PER_LOT",
        note: "Chưa cập nhật biểu phí chính thức cho tài khoản BCR.",
      },
      {
        symbol: "EURUSD",
        label: "EURUSD (Forex Majors)",
        officialRate: null,
        demoSuggestedRate: 5,
        unitLabel: "USD / Lot tiêu chuẩn",
        method: "PER_LOT",
        note: "Chưa cập nhật biểu phí chính thức cho tài khoản BCR.",
      },
    ],
  },
};

