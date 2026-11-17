import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Backcom",
    href: "/backcom",
    children: [
      {
        title: "Tổng quan dịch vụ Backcom",
        href: "/backcom",
        description:
          "Cơ chế hoàn phí giao dịch Forex, quy trình liên kết IB và công cụ tính toán.",
      },
      {
        title: "Backcom là gì?",
        href: "/backcom/what-is-backcom",
        description:
          "Giải thích chuyên sâu về Forex Rebate, hoa hồng IB và các mô hình hoàn phí.",
      },
      {
        title: "Công cụ tính Backcom",
        href: "/tools/calculator",
        description:
          "Ước tính khoản hoàn phí theo sàn, loại tài khoản và khối lượng giao dịch.",
      },
    ],
  },
  {
    title: "Sàn giao dịch",
    href: "/brokers",
    children: [
      {
        title: "Austex Markets",
        href: "/brokers/austex",
        description:
          "Tài khoản mặc định STD05 (XAUUSD Spread: 36) tối ưu cho đối tác hệ sinh thái.",
        badge: "FEATURED",
      },
      {
        title: "Exness",
        href: "/brokers/exness",
        description:
          "Đối tác sàn giao dịch hỗ trợ MT4/MT5 với đa dạng cấu hình tài khoản.",
      },
      {
        title: "Tickmill",
        href: "/brokers/tickmill",
        description: "Giải pháp giao dịch Forex & CFD trên nền tảng MT4/MT5.",
      },
      {
        title: "FxPro",
        href: "/brokers/fxpro",
        description: "Sàn giao dịch quốc tế hỗ trợ hệ sinh thái MT4/MT5.",
      },
      {
        title: "BCR",
        href: "/brokers/bcr",
        description:
          "Hướng dẫn liên kết tài khoản, cổng đăng nhập BCR và tra cứu hoàn phí.",
      },
      {
        title: "Xem tất cả sàn giao dịch",
        href: "/brokers",
        description:
          "So sánh chi tiết 5 sàn đối tác trong hệ sinh thái Backcom Mr Leo.",
      },
    ],
  },
  {
    title: "Công cụ Trading",
    href: "/tools",
  },
  {
    title: "Bot Trading",
    href: "/robots",
  },
  {
    title: "Copy Trade",
    href: "/copy-trading",
    children: [
      {
        title: "Danh sách Master Traders",
        href: "/copy-trading",
        description:
          "Khám phá các cấu hình chiến lược giao dịch và bộ chỉ số quản trị rủi ro.",
      },
      {
        title: "Câu hỏi thường gặp (FAQ)",
        href: "/faq",
        description:
          "Giải đáp thắc mắc về Backcom, liên kết sàn, Bot Trading và rủi ro Copy Trade.",
      },
    ],
  },
  {
    title: "Cộng đồng",
    href: "/community",
  },
];

export const footerLinks = {
  ecosystem: [
    { title: "Dịch vụ Backcom", href: "/backcom" },
    { title: "Backcom là gì?", href: "/backcom/what-is-backcom" },
    { title: "Sàn giao dịch đối tác", href: "/brokers" },
    { title: "Công cụ tính Backcom", href: "/tools/calculator" },
    { title: "Công cụ Trading (Indicators)", href: "/tools" },
    { title: "Bot Trading (EA MT5)", href: "/robots" },
  ],
  company: [
    { title: "Copy Trading", href: "/copy-trading" },
    { title: "Cộng đồng Trader", href: "/community" },
    { title: "Về Backcom Mr Leo", href: "/about" },
    { title: "Câu hỏi thường gặp", href: "/faq" },
    { title: "Liên hệ hỗ trợ", href: "/contact" },
  ],
  legal: [
    { title: "Chính sách bảo mật", href: "/legal/privacy-policy" },
    { title: "Điều khoản dịch vụ", href: "/legal/terms" },
    { title: "Cảnh báo rủi ro", href: "/legal/risk-disclosure" },
    { title: "Miễn trừ trách nhiệm", href: "/legal/disclaimer" },
  ],
};
