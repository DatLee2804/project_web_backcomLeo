import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getSitePagesContent } from "@/lib/cms";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Backcom là gì? Giải thích chuyên sâu về Forex Rebate & IB Commission",
  description:
    "Tài liệu hướng dẫn chi tiết Backcom (Forex Rebate) là gì, cơ chế hoa hồng IB, 3 mô hình hoàn phí phổ biến, điều kiện nhận tiền và các lưu ý quan trọng cho trader.",
  path: "/backcom/what-is-backcom",
});

export default async function WhatIsBackcomPage() {
  const sitePages = await getSitePagesContent();
  const guide = sitePages.backcom.deepGuide;

  return (
    <div className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="container max-w-4xl">
        <Link
          href="/backcom"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại trang Dịch vụ Backcom
        </Link>

        <div className="mt-6">
          <Badge variant="gold">{guide.badge}</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl lg:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            {guide.intro}
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {/* Dynamic Deep Guide Sections */}
          {guide.sections.map((section, idx) => (
            <Card key={`${section.heading}-${idx}`} className="p-6 sm:p-8">
              <h2 className="font-heading text-xl font-bold text-gold-light sm:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
                {section.content
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((para, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">
                      {para}
                    </p>
                  ))}
              </div>
            </Card>
          ))}

          {/* 3 Standard Rebate Calculation Models Reference Card */}
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <Layers className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-xl font-bold text-gold-light sm:text-2xl">
                Các mô hình tính hoàn phí chuẩn trong hệ thống
              </h2>
            </div>
            <p className="mt-3 text-sm text-ink-secondary">
              Mỗi sàn giao dịch và mỗi nhóm tài khoản áp dụng một đơn vị tính
              khác nhau trong công cụ Backcom Calculator:
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-background-secondary p-4">
                <div className="font-heading text-sm font-bold text-ink-primary">
                  Mô hình PER_LOT
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Tính bằng số USD cố định trên mỗi Lot tiêu chuẩn đóng lệnh (ví
                  dụ X USD/lot cho XAUUSD hoặc EURUSD). Thường gặp ở các tài
                  khoản Standard.
                </p>
              </div>
              <div className="rounded-xl border border-line bg-background-secondary p-4">
                <div className="font-heading text-sm font-bold text-ink-primary">
                  Mô hình PER_COMMISSION
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Tính theo tỷ lệ % trên tổng phí Commission mà nhà giao dịch đã
                  trả cho sàn. Thường áp dụng cho các tài khoản Raw Spread / ECN.
                </p>
              </div>
              <div className="rounded-xl border border-line bg-background-secondary p-4">
                <div className="font-heading text-sm font-bold text-ink-primary">
                  Mô hình PER_VOLUME
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Tính bằng số USD trên mỗi 1 triệu USD giá trị hợp đồng danh
                  nghĩa (Notional Volume). Phổ biến với CFD Crypto, Cổ phiếu hoặc
                  một số sàn châu Âu.
                </p>
              </div>
            </div>
          </Card>

          {/* Important Warnings */}
          {guide.warnings.length > 0 && (
            <div className="rounded-card border border-amber-400/30 bg-amber-500/[0.07] p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <h2 className="font-heading text-lg font-bold text-ink-primary sm:text-xl">
                    Các lưu ý quan trọng dành cho nhà giao dịch
                  </h2>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                    {guide.warnings.map((warn, wIdx) => (
                      <li key={wIdx}>• {warn}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-card p-6">
          <div>
            <div className="font-heading text-lg font-bold text-ink-primary">
              Bạn muốn kiểm tra mức hoàn phí cho sàn đang giao dịch?
            </div>
            <p className="text-xs text-ink-secondary sm:text-sm">
              Sử dụng công cụ tính toán hoặc gửi yêu cầu xác nhận biểu phí chính
              thức.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/calculator"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              Mở Backcom Calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "md" })
              )}
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

