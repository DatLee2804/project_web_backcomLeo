import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";
import { masterTraders } from "@/data/masters";
import { SectionHeading } from "@/components/shared/section-heading";
import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MasterPerformanceSection() {
  return (
    <section className="border-b border-line bg-background-secondary py-12 sm:py-14 lg:py-16">
      <div className="container">
        <SectionHeading
          eyebrow="COPY TRADING SHOWCASE"
          title="DISCOVER OUR TRADING MASTERS"
          subtitle="Khám phá cấu trúc đánh giá chiến lược giao dịch thông qua các chỉ số ROI, Max Drawdown và thời gian vận hành."
        />

        {/* Explicit DEMO Transparency Banner */}
        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-2.5 rounded-xl border border-sky-400/25 bg-sky-500/10 px-4 py-2.5 text-center text-xs text-sky-200">
          <Info className="h-4 w-4 shrink-0 text-sky-300" />
          <span>
            <strong>Ghi chú minh bạch:</strong> Các thẻ Master dưới đây sử dụng{" "}
            <strong>dữ liệu DEMO minh họa giao diện</strong> trong giai đoạn chờ
            tích hợp danh sách Master thực tế. Không phải thành tích đầu tư thật.
          </span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {masterTraders.map((master) => (
            <InteractiveCard
              key={master.slug}
              className="flex flex-col justify-between p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={master.avatar}
                      alt={`Avatar minh họa ${master.name}`}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-xl"
                    />
                    <div>
                      <h3 className="font-heading text-sm font-bold text-ink-primary">
                        {master.name}
                      </h3>
                      <p className="text-[11px] text-ink-muted">
                        {master.primaryMarkets.join(" • ")}
                      </p>
                    </div>
                  </div>
                  <Badge variant="demo">DEMO</Badge>
                </div>

                {/* Metrics Grid */}
                <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-xl border border-line bg-background-secondary p-3.5">
                  <div>
                    <div className="text-[11px] text-ink-muted">ROI (Demo)</div>
                    <div className="mt-0.5 font-heading text-lg font-bold text-success tabular-nums-fin">
                      +{master.roiPct.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-ink-muted">
                      Max Drawdown
                    </div>
                    <div className="mt-0.5 font-heading text-lg font-bold text-danger tabular-nums-fin">
                      -{master.maxDrawdownPct.toFixed(1)}%
                    </div>
                  </div>
                  <div className="border-t border-line/60 pt-2">
                    <div className="text-[11px] text-ink-muted">Win Rate</div>
                    <div className="mt-0.5 text-sm font-semibold text-ink-primary tabular-nums-fin">
                      {master.winRatePct.toFixed(1)}%
                    </div>
                  </div>
                  <div className="border-t border-line/60 pt-2">
                    <div className="text-[11px] text-ink-muted">Duration</div>
                    <div className="mt-0.5 text-sm font-semibold text-ink-primary tabular-nums-fin">
                      {master.tradingDurationMonths} tháng
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={`/copy-trading/masters/${master.slug}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "mt-5 w-full"
                )}
              >
                View Profile (Demo)
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </InteractiveCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/copy-trading"
            className={cn(buttonVariants({ variant: "secondary", size: "md" }))}
          >
            Xem toàn bộ hệ thống Copy Trade
            <ArrowRight className="h-4 w-4 text-gold" />
          </Link>
        </div>
      </div>
    </section>
  );
}

