import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  ShieldAlert,
} from "lucide-react";
import { getLiveMasterBySlug, getLiveMasters } from "@/lib/cms";
import { MasterCharts } from "@/components/copy-trading/master-charts";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const masters = await getLiveMasters();
  return masters.map((m) => ({ slug: m.slug }));
}

interface MasterDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: MasterDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const master = await getLiveMasterBySlug(slug);
  if (!master) {
    return constructMetadata({
      title: "Hồ sơ Master không tồn tại",
      description: "Không tìm thấy hồ sơ Master Trader.",
      path: "/copy-trading",
      noIndex: true,
    });
  }
  return constructMetadata({
    title: `${master.name} — Hồ sơ Copy Trading`,
    description: master.summary,
    path: `/copy-trading/masters/${master.slug}`,
  });
}

export default async function MasterDetailPage({
  params,
}: MasterDetailPageProps) {
  const { slug } = await params;
  const master = await getLiveMasterBySlug(slug);

  if (!master) {
    notFound();
  }

  return (
    <div className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="container">
        <Link
          href="/copy-trading"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại danh sách Master Traders
        </Link>

        {/* Conditional DEMO Banner */}
        {master.isDemo && (
          <div className="mt-6 flex items-start gap-3 rounded-card border border-gold/35 bg-gold/10 p-4 text-xs leading-relaxed text-ink-secondary sm:text-sm">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
            <div>
              <strong className="text-gold-light">
                HỒ SƠ DỮ LIỆU DEMO MINH HỌA:
              </strong>{" "}
              Hồ sơ <strong>{master.name}</strong> và các biểu đồ bên dưới sử
              dụng dữ liệu mô phỏng để trình diễn cấu trúc phân tích hiệu suất
              của nền tảng.
            </div>
          </div>
        )}

        {/* 1. Master Profile */}
        <Card className="mt-6 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <Image
                src={master.avatar}
                alt={`Avatar ${master.name}`}
                width={72}
                height={72}
                className="h-16 w-16 rounded-2xl object-cover sm:h-20 sm:w-20"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {master.isDemo ? (
                    <Badge variant="demo">DEMO PROFILE • {master.code}</Badge>
                  ) : (
                    <Badge variant="featured">
                      MASTER PROFILE • {master.code}
                    </Badge>
                  )}
                  <Badge
                    variant={
                      master.riskLevel === "Low"
                        ? "success"
                        : master.riskLevel === "Moderate"
                          ? "gold"
                          : "danger"
                    }
                  >
                    Risk Level: {master.riskLevel} ({master.riskScore}/10)
                  </Badge>
                </div>
                <h1 className="mt-2 font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
                  {master.name}
                </h1>
                <p className="mt-1 text-sm text-ink-secondary">
                  {master.strategyName} • Thị trường:{" "}
                  {master.primaryMarkets.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" })
                )}
              >
                Tư vấn kết nối Copy Trade
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 2. Performance Overview */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-5">
            <div className="rounded-xl border border-line bg-background-secondary p-4">
              <div className="text-xs text-ink-muted">
                ROI {master.isDemo ? "(Demo)" : ""}
              </div>
              <div className="mt-1 font-heading text-2xl font-bold text-success tabular-nums-fin">
                +{master.roiPct.toFixed(1)}%
              </div>
            </div>
            <div className="rounded-xl border border-line bg-background-secondary p-4">
              <div className="text-xs text-ink-muted">Max Drawdown</div>
              <div className="mt-1 font-heading text-2xl font-bold text-danger tabular-nums-fin">
                -{master.maxDrawdownPct.toFixed(1)}%
              </div>
            </div>
            <div className="rounded-xl border border-line bg-background-secondary p-4">
              <div className="text-xs text-ink-muted">Win Rate</div>
              <div className="mt-1 font-heading text-2xl font-bold text-ink-primary tabular-nums-fin">
                {master.winRatePct.toFixed(1)}%
              </div>
            </div>
            <div className="rounded-xl border border-line bg-background-secondary p-4">
              <div className="text-xs text-ink-muted">Thời gian vận hành</div>
              <div className="mt-1 font-heading text-lg font-bold text-gold-light">
                {master.tradingDurationMonths} tháng
              </div>
            </div>
            <div className="col-span-2 rounded-xl border border-line bg-background-secondary p-4 sm:col-span-1">
              <div className="text-xs text-ink-muted">Vốn tối thiểu</div>
              <div className="mt-1 font-heading text-sm font-bold text-vip-light">
                {master.minCopyBalanceUsd
                  ? `$${master.minCopyBalanceUsd}`
                  : "Chưa cập nhật"}
              </div>
            </div>
          </div>
        </Card>

        {/* 3, 4 & 5. Charts */}
        <div className="mt-8">
          <MasterCharts
            equityCurve={master.equityCurve}
            monthlyReturns={master.monthlyReturns}
            isDemo={master.isDemo}
          />
        </div>

        {/* 6 & 7. Strategy + Trading History */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Card className="h-full p-6">
              <h2 className="font-heading text-xl font-bold text-ink-primary">
                Mô tả Chiến lược &amp; Quy tắc Quản trị Vốn
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary">
                {master.strategyDescription.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <div className="mt-6 border-t border-line pt-4">
                <div className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Nguyên tắc kiểm soát rủi ro
                </div>
                <ul className="mt-3 space-y-2">
                  {master.riskManagementRules.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2 text-xs text-ink-secondary sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-6">
            <Card className="h-full p-6">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-heading text-xl font-bold text-ink-primary">
                  Bảng Lịch sử Giao dịch Tiêu biểu
                </h2>
                {master.isDemo && <Badge variant="demo">DEMO</Badge>}
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-line text-ink-muted">
                      <th className="pb-2.5">Mã lệnh</th>
                      <th className="pb-2.5">Symbol</th>
                      <th className="pb-2.5">Loại lệnh</th>
                      <th className="pb-2.5">Lots</th>
                      <th className="pb-2.5 text-right">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {master.sampleHistory.map((item) => (
                      <tr key={item.id}>
                        <td className="py-3 text-ink-muted">{item.id}</td>
                        <td className="py-3 font-semibold text-ink-primary">
                          {item.symbol}
                        </td>
                        <td className="py-3">
                          <span
                            className={cn(
                              "font-bold",
                              item.type === "BUY"
                                ? "text-success"
                                : "text-danger"
                            )}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3 tabular-nums-fin text-ink-secondary">
                          {item.lots}
                        </td>
                        <td className="py-3 text-right font-medium text-ink-primary">
                          {item.resultNote}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>

        {/* 8. Risk Disclosure */}
        <div className="mt-8 rounded-card border border-danger/35 bg-danger-muted p-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
            <div className="text-xs leading-relaxed text-ink-secondary sm:text-sm">
              <strong className="text-ink-primary">
                Cảnh báo rủi ro Copy Trading:
              </strong>{" "}
              Giao dịch ngoại hối và CFD thông qua hình thức sao chép tín hiệu
              tiềm ẩn nguy cơ mất một phần hoặc toàn bộ vốn đầu tư. Hiệu suất
              trong quá khứ không đảm bảo kết quả tương lai. Backcom Mr Leo
              không nhận ủy thác vốn và không chịu trách nhiệm đối với kết quả
              giao dịch cá nhân.
            </div>
          </div>
        </div>

        {/* 9. Connect CTA */}
        <Card className="mt-8 border-gold/40 p-8 text-center">
          <AlertTriangle className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-3 font-heading text-2xl font-bold text-ink-primary">
            Đăng ký kết nối theo dõi chiến lược {master.name}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-secondary">
            Liên hệ đội ngũ Backcom Mr Leo để nhận hướng dẫn cấu hình tỷ lệ sao
            chép và thiết lập ngưỡng an toàn vốn phù hợp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Liên hệ bộ phận Copy Trade
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/copy-trading"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" })
              )}
            >
              Xem các hồ sơ khác
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
