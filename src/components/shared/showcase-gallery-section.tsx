"use client";

import * as React from "react";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Layers,
  ShieldCheck,
  Sliders,
  X,
  ZoomIn,
} from "lucide-react";
import type { ShowcaseImageItem } from "@/types";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ShowcaseGallerySectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  images?: ShowcaseImageItem[];
  variant?: "indicator" | "robot";
}

const DEFAULT_PLACEHOLDER_SLOTS = [
  {
    code: "01",
    tag: "THÔNG SỐ CẤU HÌNH",
    title: "Bảng thông số & Input thực tế",
    desc: "Hiển thị ảnh chụp cấu hình thông số chuẩn do đội ngũ IB Mr Leo thiết lập.",
    icon: Sliders,
  },
  {
    code: "02",
    tag: "THỐNG KÊ LỢI NHUẬN",
    title: "Kết quả vận hành & Tăng trưởng",
    desc: "Ảnh chụp báo cáo thống kê lợi nhuận, tỷ lệ thắng và mức sụt giảm vốn thực tế.",
    icon: BarChart3,
  },
  {
    code: "03",
    tag: "BIỂU ĐỒ TÍN HIỆU",
    title: "Điểm vào lệnh & Quản lý vị thế",
    desc: "Minh họa trực quan lịch sử khớp lệnh và các vùng Entry / SL / TP trên biểu đồ.",
    icon: Layers,
  },
  {
    code: "04",
    tag: "ĐỐI SOÁT TÀI KHOẢN",
    title: "Lịch sử giao dịch xác thực",
    desc: "Cập nhật định kỳ từ tài khoản vận hành thực tế trong hệ sinh thái Backcom Mr Leo.",
    icon: ShieldCheck,
  },
];

export function ShowcaseGallerySection({
  eyebrow = "02 • PERFORMANCE & PARAMETER SHOWCASE",
  title,
  subtitle,
  images,
  variant = "indicator",
}: ShowcaseGallerySectionProps) {
  const validImages = React.useMemo(
    () => (images ?? []).filter((item) => Boolean(item?.url?.trim())),
    [images]
  );

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % validImages.length
        );
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + validImages.length) % validImages.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, validImages.length]);

  const defaultSubtitle =
    variant === "robot"
      ? "Hình ảnh thông số cài đặt chuẩn, biểu đồ tăng trưởng vốn và thống kê lịch sử lợi nhuận thực chiến được cập nhật từ hệ thống IB Mr Leo."
      : "Tổng hợp hình ảnh thông số kỹ thuật, kết quả tín hiệu trên biểu đồ và thống kê hiệu suất thực chiến từ đội ngũ IB Mr Leo.";

  // Smart 6-column Bento span calculation so 1, 2, 3, 4, 5, or 6+ photos always balance symmetrically
  const getColSpanClass = (index: number, total: number): string => {
    if (total === 1) return "lg:col-span-6 max-w-4xl mx-auto w-full";
    if (total === 2) return "sm:col-span-1 lg:col-span-3";
    if (total === 3) return "sm:col-span-1 lg:col-span-2";
    if (total === 4) return "sm:col-span-1 lg:col-span-3";
    if (total === 5) {
      return index < 2
        ? "sm:col-span-1 lg:col-span-3"
        : "sm:col-span-1 lg:col-span-2";
    }
    return "sm:col-span-1 lg:col-span-2";
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-[#040B16] py-14 sm:py-18">
      {/* Subtle Ocean Tech Glow */}
      <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-gold/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#0066FF]/10 blur-[110px]" />

      <div className="container relative z-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle || defaultSubtitle}
          />
          {validImages.length > 0 && (
            <Badge variant="gold" className="shrink-0">
              {validImages.length} HÌNH ẢNH THỰC TẾ • NHẤN ĐỂ PHÓNG TO
            </Badge>
          )}
        </div>

        {validImages.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {validImages.map((img, idx) => (
              <button
                key={`${img.url}-${idx}`}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className={cn(
                  "tech-glass-panel group relative flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-[#061224]/90 p-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/65 hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_26px_rgba(0,194,255,0.22)] focus:outline-none",
                  getColSpanClass(idx, validImages.length)
                )}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-[#030811]">
                  {/* Ambient blurred backdrop so vertical mobile profit screenshots never leave empty black bars */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl"
                  />

                  {/* Crisp uncropped foreground screenshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={
                      img.caption ||
                      `Hình ảnh thống kê & thông số #${idx + 1}`
                    }
                    loading="lazy"
                    className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Top Badges Overlay */}
                  <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#040B16]/85 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gold-light backdrop-blur-md">
                      <span>0{idx + 1}</span>
                      {img.tag && (
                        <>
                          <span className="text-gold/50">•</span>
                          <span>{img.tag}</span>
                        </>
                      )}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-[#040B16]/85 px-2.5 py-1 text-[10px] font-semibold text-ink-primary opacity-80 backdrop-blur-md transition-all group-hover:border-gold group-hover:text-gold-light group-hover:opacity-100">
                      <ZoomIn className="h-3 w-3" />
                      <span className="hidden sm:inline">Phóng to</span>
                    </span>
                  </div>
                </div>

                {img.caption && (
                  <div className="px-2 pt-3 pb-1">
                    <p className="line-clamp-2 text-xs font-medium leading-relaxed text-ink-primary sm:text-sm">
                      {img.caption}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          /* Sleek 4-Slot Ready State before IB Leo uploads photos in Admin */
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DEFAULT_PLACEHOLDER_SLOTS.map((slot) => {
              const Icon = slot.icon;
              return (
                <div
                  key={slot.code}
                  className="tech-glass-panel relative flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-line-strong bg-[#061224]/75 p-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full border border-gold/35 bg-gold/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-gold-light">
                        {slot.code} • {slot.tag}
                      </span>
                      <ImageIcon className="h-4 w-4 text-ink-muted" />
                    </div>

                    <div className="my-6 flex h-28 flex-col items-center justify-center rounded-xl border border-line bg-[#040A14]/90 p-4 text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold-light">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="mt-2.5 text-[11px] font-semibold text-ink-secondary">
                        Đang cập nhật ảnh thực tế
                      </span>
                    </div>

                    <h3 className="font-heading text-sm font-bold text-ink-primary">
                      {slot.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                      {slot.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && validImages[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-between bg-[#02060D]/95 p-4 backdrop-blur-xl sm:p-6"
        >
          {/* Top Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-6xl items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5">
              <Badge variant="gold">
                ẢNH {lightboxIndex + 1} / {validImages.length}
              </Badge>
              {validImages[lightboxIndex].tag && (
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  {validImages[lightboxIndex].tag}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Đóng cửa sổ xem ảnh"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-card text-ink-primary transition-colors hover:border-gold hover:text-gold-light"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main Image Stage */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto flex max-h-[74vh] w-full max-w-6xl items-center justify-center"
          >
            {validImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex(
                    (lightboxIndex - 1 + validImages.length) %
                      validImages.length
                  )
                }
                aria-label="Ảnh trước"
                className="absolute left-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-[#061224]/90 text-ink-primary shadow-lg backdrop-blur-md transition-colors hover:border-gold hover:text-gold-light sm:left-3"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={validImages[lightboxIndex].url}
              alt={
                validImages[lightboxIndex].caption ||
                `Ảnh thống kê #${lightboxIndex + 1}`
              }
              className="max-h-[72vh] w-auto max-w-full rounded-2xl border border-line-strong bg-[#040A14] object-contain shadow-2xl"
            />

            {validImages.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setLightboxIndex((lightboxIndex + 1) % validImages.length)
                }
                aria-label="Ảnh tiếp theo"
                className="absolute right-1 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-[#061224]/90 text-ink-primary shadow-lg backdrop-blur-md transition-colors hover:border-gold hover:text-gold-light sm:right-3"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption & Thumbnail Strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl space-y-3 text-center"
          >
            {validImages[lightboxIndex].caption && (
              <p className="text-xs font-medium text-ink-primary sm:text-sm">
                {validImages[lightboxIndex].caption}
              </p>
            )}

            {validImages.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
                {validImages.map((thumb, tIdx) => (
                  <button
                    key={`${thumb.url}-thumb-${tIdx}`}
                    type="button"
                    onClick={() => setLightboxIndex(tIdx)}
                    className={cn(
                      "h-12 w-20 shrink-0 overflow-hidden rounded-lg border transition-all",
                      tIdx === lightboxIndex
                        ? "border-gold ring-2 ring-gold/40"
                        : "border-line opacity-55 hover:opacity-100"
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumb.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
