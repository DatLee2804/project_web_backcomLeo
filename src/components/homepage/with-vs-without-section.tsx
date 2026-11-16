"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";
import { DEMO_REBATE_RATE_PER_LOT } from "@/data/rebate-rates";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatUsd } from "@/lib/utils";

const COMPARE_LOTS = [10, 50, 200] as const;

const COMPARISON_ROWS = [
  {
    title: "Hoa hồng IB (Commission)",
    sub: "Phần phí sàn trích từ lệnh giao dịch đi về đâu",
    withBackcom: "Đối tác chia sẻ ngược lại cho chính nhà giao dịch",
    withoutBackcom: "Sàn giữ toàn bộ hoặc thuộc về KOL giới thiệu",
  },
  {
    title: "Chi phí giao dịch ròng",
    sub: "Mức phí thực tế bạn chịu sau mỗi chu kỳ",
    withBackcom: "Được hoàn giảm đáng kể trên mỗi Lot đóng lệnh",
    withoutBackcom: "Chịu 100% chi phí Spread & Commission gốc",
  },
  {
    title: "Hiệu lực nhận hoàn phí",
    sub: "Thời gian duy trì quyền lợi tài khoản",
    withBackcom: "Xuyên suốt thời gian tài khoản duy trì mã đối tác",
    withoutBackcom: "Không có cơ chế hoàn trả phí giao dịch",
  },
  {
    title: "Hệ sinh thái hỗ trợ đi kèm",
    sub: "Công cụ phân tích & tự động hóa",
    withBackcom: "Hỗ trợ bộ Indicator TV/MT5, tư vấn EA & Cộng đồng",
    withoutBackcom: "Tự giao dịch đơn lẻ, không có bộ công cụ hệ sinh thái",
  },
];

export function WithVsWithoutSection() {
  const [selectedLots, setSelectedLots] = React.useState<number>(50);

  const monthlyDemo = selectedLots * DEMO_REBATE_RATE_PER_LOT;
  const yearlyDemo = monthlyDemo * 12;

  return (
    <section className="border-b border-line bg-background py-12 sm:py-14 lg:py-16">
      <div className="container">
        <SectionHeading
          eyebrow="COST EFFICIENCY MATRIX"
          title="So sánh Có Backcom vs Không có Backcom"
          subtitle="Cùng một khối lượng giao dịch hàng tháng, chi phí ròng trên mỗi lệnh thấp hơn rõ rệt khi tài khoản được kết nối hoàn phí."
        />

        <div className="mt-12 overflow-x-auto">
          <div className="tech-glass-panel min-w-[720px] overflow-hidden rounded-card-lg border border-line-strong">
            {/* Header Row */}
            <div className="grid grid-cols-12 border-b border-line-strong">
              {/* Lot Selector Cell */}
              <div className="col-span-4 flex flex-wrap items-center justify-between gap-3 p-6">
                <div>
                  <div className="font-heading text-base font-bold text-ink-primary">
                    Mốc so sánh
                  </div>
                  <div className="text-xs text-ink-muted">
                    Khối lượng: {selectedLots} lots / tháng
                  </div>
                </div>
                <div className="inline-flex rounded-xl border border-line-strong bg-[#050C17] p-1">
                  {COMPARE_LOTS.map((lotOpt) => (
                    <button
                      key={lotOpt}
                      type="button"
                      onClick={() => setSelectedLots(lotOpt)}
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-xs font-bold transition-all tabular-nums-fin",
                        selectedLots === lotOpt
                          ? "bg-gold/20 text-gold-light ring-1 ring-gold/60"
                          : "text-ink-muted hover:text-ink-primary"
                      )}
                    >
                      {lotOpt} lot
                    </button>
                  ))}
                </div>
              </div>

              {/* Middle Highlight Header: Backcom Mr Leo */}
              <div className="relative col-span-4 border-x border-gold/35 bg-gradient-to-b from-gold/18 via-[#0A1F38]/90 to-transparent p-6 text-center">
                <div className="inline-flex items-center gap-2 font-heading text-lg font-extrabold text-ink-primary">
                  <Sparkles className="h-4 w-4 text-gold-light" />
                  <span>Backcom Mr Leo</span>
                </div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-gold-light">
                  CÓ HOÀN PHÍ REBATE
                </div>
              </div>

              {/* Right Header: Direct / No Rebate */}
              <div className="col-span-4 p-6 text-center">
                <div className="font-heading text-lg font-bold text-ink-secondary">
                  Mở trực tiếp / KOL thường
                </div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-danger">
                  KHÔNG HOÀN PHÍ
                </div>
              </div>
            </div>

            {/* Feature Rows */}
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.title}
                className="grid grid-cols-12 border-b border-line text-sm"
              >
                <div className="col-span-4 p-5 sm:px-6">
                  <div className="font-heading font-bold text-ink-primary">
                    {row.title}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-muted">{row.sub}</div>
                </div>

                <div className="col-span-4 flex items-center gap-3 border-x border-gold/25 bg-[#091B31]/65 p-5 sm:px-6">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-gold-light">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium text-ink-primary">
                    {row.withBackcom}
                  </span>
                </div>

                <div className="col-span-4 flex items-center gap-3 p-5 text-ink-muted sm:px-6">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-background-secondary text-ink-muted">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span>{row.withoutBackcom}</span>
                </div>
              </div>
            ))}

            {/* Bottom Summary Calculation Row */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-4 p-6">
                <div className="font-heading text-base font-bold text-ink-primary">
                  Khoản nhận lại mỗi tháng
                </div>
                <div className="mt-1 text-xs text-ink-muted">
                  Dữ liệu minh họa ${DEMO_REBATE_RATE_PER_LOT}/lot (Chưa phải
                  chính sách thực tế từng sàn)
                </div>
              </div>

              <div className="col-span-4 border-x border-gold/30 bg-gradient-to-t from-gold/15 via-[#091B31]/80 to-[#091B31]/65 p-6 text-center">
                <div className="font-heading text-3xl font-extrabold text-gold-gradient tabular-nums-fin">
                  {formatUsd(monthlyDemo, 0)}
                  <span className="text-base font-semibold text-ink-secondary">
                    {" "}
                    / tháng
                  </span>
                </div>
                <div className="mt-1 text-xs text-ink-secondary tabular-nums-fin">
                  ≈ {formatUsd(yearlyDemo, 0)} / năm (Minh họa)
                </div>

                <Link
                  href="/backcom"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" }),
                    "mt-4 w-full rounded-xl"
                  )}
                >
                  Đăng ký nhận Backcom ngay
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="col-span-4 p-6 text-center">
                <div className="font-heading text-3xl font-bold text-ink-secondary tabular-nums-fin">
                  $0
                </div>
                <div className="mt-1 text-xs font-medium text-danger tabular-nums-fin">
                  Bỏ lỡ ước tính ≈ {formatUsd(monthlyDemo, 0)} mỗi tháng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
