"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
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
      ? "Hình ảnh thông số cài đặt chuẩn, biểu đồ tăng trưởng vốn và thống kê lịch sử lợi nhuận thực chiến từ hệ thống IB Mr Leo."
      : "Tổng hợp hình ảnh thông số kỹ thuật, kết quả tín hiệu trên biểu đồ và thống kê hiệu suất thực chiến từ đội ngũ IB Mr Leo.";

  // Symmetric 6-column Bento span calculation for 1..6+ pure image frames
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
              {validImages.length} HÌNH ẢNH • NHẤN ĐỂ PHÓNG TO
            </Badge>
          )}
        </div>

        {validImages.length > 0 ? (
          /* Pure Image-Only Showcase Grid (Zero text below images) */
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {validImages.map((img, idx) => (
              <button
                key={`${img.url}-${idx}`}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Phóng to hình ảnh thống kê ${idx + 1}`}
                className={cn(
                  "tech-glass-panel group relative overflow-hidden rounded-2xl border border-line-strong bg-[#061224]/90 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-gold/65 hover:shadow-[0_18px_45px_rgba(0,0,0,0.85),0_0_26px_rgba(0,194,255,0.22)] focus:outline-none",
                  getColSpanClass(idx, validImages.length)
                )}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-[#030811]">
                  {/* Ambient blurred backdrop so vertical mobile profit screenshots look seamless */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl"
                  />

                  {/* Pure crisp uncropped foreground screenshot */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={`Hình ảnh thực tế #${idx + 1}`}
                    loading="lazy"
                    className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Minimal hover zoom icon only */}
                  <span className="pointer-events-none absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-[#040B16]/80 text-ink-primary opacity-0 backdrop-blur-md transition-all duration-200 group-hover:border-gold group-hover:text-gold-light group-hover:opacity-100">
                    <ZoomIn className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Pure Image-Frame Placeholders (Zero text paragraphs underneath) */
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((slotNum) => (
              <div
                key={slotNum}
                className="tech-glass-panel overflow-hidden rounded-2xl border border-dashed border-line-strong bg-[#061224]/70 p-2"
              >
                <div className="flex aspect-[16/10] w-full flex-col items-center justify-center rounded-xl border border-line bg-[#040A14]/90">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light/80">
                    <ImageIcon className="h-5 w-5" />
                  </span>
                  <span className="mt-2.5 text-[11px] font-medium text-ink-muted">
                    Đang cập nhật hình ảnh
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Fullscreen Lightbox Modal (Pure Image View) */}
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
            <Badge variant="gold">
              {lightboxIndex + 1} / {validImages.length}
            </Badge>

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
            className="relative my-auto flex max-h-[78vh] w-full max-w-6xl items-center justify-center"
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
              alt={`Hình ảnh thực tế #${lightboxIndex + 1}`}
              className="max-h-[76vh] w-auto max-w-full rounded-2xl border border-line-strong bg-[#040A14] object-contain shadow-2xl"
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

          {/* Bottom Thumbnail Strip */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl text-center"
          >
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
