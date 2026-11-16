export interface HeroPromoVideoConfig {
  /**
   * Đặt đường dẫn file video dọc (tỷ lệ 9:16, định dạng .mp4 hoặc .webm) trong thư mục public/videos/
   * Ví dụ: "/videos/quang-cao-backcom.mp4"
   * Để null khi chưa tải video thực tế lên.
   */
  videoSrc: string | null;
  posterSrc?: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export const heroPromoVideo: HeroPromoVideoConfig = {
  videoSrc: null,
  badge: "PROMO REEL • 9:16",
  title: "Hệ sinh thái Backcom Mr Leo",
  subtitle:
    "Khung phát Video Quảng cáo Dọc (9:16) — Bổ sung file MP4 vào public/videos/ và cập nhật đường dẫn tại src/data/hero-media.ts",
  ctaLabel: "Nhận tư vấn Backcom",
  ctaHref: "/contact",
};
