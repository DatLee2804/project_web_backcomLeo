import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  ShieldAlert,
  Terminal,
} from "lucide-react";
import { getLiveRobotBySlug, getLiveRobots } from "@/lib/cms";
import { ProductCoverFrame } from "@/components/shared/product-cover-frame";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShowcaseGallerySection } from "@/components/shared/showcase-gallery-section";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const robots = await getLiveRobots();
  return robots.map((r) => ({ slug: r.slug }));
}

interface RobotDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RobotDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const robot = await getLiveRobotBySlug(slug);
  if (!robot) {
    return constructMetadata({
      title: "Bot Trading không tồn tại",
      description: "Không tìm thấy sản phẩm Bot yêu cầu.",
      path: "/robots",
      noIndex: true,
    });
  }
  return constructMetadata({
    title: `${robot.name} (${robot.badge})`,
    description: robot.subtitle,
    path: `/robots/${robot.slug}`,
  });
}

export default async function RobotDetailPage({
  params,
}: RobotDetailPageProps) {
  const { slug } = await params;
  const robot = await getLiveRobotBySlug(slug);

  if (!robot) {
    notFound();
  }

  return (
    <div className="bg-background">
      {/* 1. Product Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10">
          <Link
            href="/robots"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Quay lại trang Bot Trading
          </Link>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Badge variant="featured">{robot.badge}</Badge>
                {robot.targetSymbols[0] && (
                  <Badge variant="gold">{robot.targetSymbols[0]}</Badge>
                )}
              </div>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
                {robot.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
                {robot.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" })
                  )}
                >
                  Đăng ký tư vấn &amp; Cấp quyền Bot
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#installation-guide"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" })
                  )}
                >
                  Xem quy trình cài đặt MT5
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto max-w-[460px] lg:ml-auto lg:mr-0">
                <ProductCoverFrame
                  src={robot.heroImage}
                  alt={`Giao diện minh họa ${robot.name}`}
                  className="shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Introduction */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container max-w-4xl">
          <SectionHeading
            align="left"
            eyebrow="01 • PRODUCT INTRODUCTION"
            title={`Giới thiệu tổng quan về ${robot.shortName}`}
          />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
            {robot.introduction.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2B. Bot Parameters & Profit Statistics Gallery (4-6 Images) */}
      <ShowcaseGallerySection
        eyebrow="02 • BOT PARAMETERS & PROFIT STATISTICS"
        title={
          robot.showcaseTitle?.trim() ||
          `Thông số Cấu hình & Thống kê Lợi nhuận — ${robot.shortName}`
        }
        subtitle={robot.showcaseSubtitle}
        images={robot.showcaseGallery}
        variant="robot"
      />

      {/* 3 & 4. Trading Strategy + Features */}
      <section className="border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="03 • STRATEGY & ARCHITECTURE"
            title="Nguyên lý vận hành & Tính năng kỹ thuật"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {robot.strategyPoints.map((pt) => (
              <Card key={pt.title} className="p-6">
                <div className="flex items-start gap-3">
                  <Cpu className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink-primary">
                      {pt.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {pt.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {robot.features.map((feat) => (
              <div
                key={feat.title}
                className="rounded-card border border-line bg-card p-5"
              >
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <h4 className="mt-3 font-heading text-sm font-bold text-ink-primary">
                  {feat.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 & 6. Supported Platforms + Account Requirements */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Card className="h-full p-6">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-gold" />
                  <h2 className="font-heading text-xl font-bold text-ink-primary">
                    Nền tảng &amp; Sản phẩm hỗ trợ
                  </h2>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-muted">
                      Supported Platforms
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {robot.supportedPlatforms.map((plat) => (
                        <Badge key={plat} variant="gold">
                          {plat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-muted">
                      Mã giao dịch mục tiêu
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {robot.targetSymbols.map((sym) => (
                        <Badge key={sym} variant="neutral">
                          {sym}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-line bg-background-secondary p-3.5 text-xs text-ink-secondary">
                    Khuyến nghị tài khoản:{" "}
                    <strong>{robot.recommendedAccount}</strong>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="h-full p-6">
                <h2 className="font-heading text-xl font-bold text-ink-primary">
                  Yêu cầu cấu hình tài khoản (Account Requirements)
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {robot.accountRequirements.map((req) => (
                    <div
                      key={req.label}
                      className="rounded-xl border border-line bg-background-secondary p-4"
                    >
                      <div className="text-xs text-ink-muted">{req.label}</div>
                      <div
                        className={cn(
                          "mt-1 font-heading text-sm font-bold",
                          req.isPending ? "text-vip-light" : "text-ink-primary"
                        )}
                      >
                        {req.value}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Risk Information */}
      <section className="border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="container max-w-4xl">
          <div className="rounded-card-lg border border-danger/35 bg-danger-muted p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="h-6 w-6 text-danger" />
              <h2 className="font-heading text-xl font-bold text-ink-primary sm:text-2xl">
                Thông tin Rủi ro bắt buộc đọc trước khi vận hành Bot
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary">
              {robot.riskNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Installation Guide */}
      <section
        id="installation-guide"
        className="scroll-mt-20 border-b border-line py-14 sm:py-18"
      >
        <div className="container">
          <SectionHeading
            eyebrow="04 • SETUP WORKFLOW"
            title={`Quy trình cài đặt ${robot.shortName} trên MT5`}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {robot.installationSteps.map((step) => (
              <Card key={step.step} className="p-6">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 font-heading text-sm font-bold text-gold-light">
                  0{step.step}
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-ink-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Performance Report */}
      <section className="border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="container max-w-4xl">
          <Card className="border-dashed border-line-strong p-8 text-center sm:p-10">
            <BarChart3 className="mx-auto h-10 w-10 text-gold" />
            <div className="mt-3">
              <Badge variant="pending">THÔNG TIN HIỆU SUẤT</Badge>
            </div>
            <h2 className="mt-4 font-heading text-2xl font-bold text-ink-primary">
              Báo cáo Hiệu suất &amp; Kiểm chứng
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary">
              {robot.performancePlaceholderNote}
            </p>
          </Card>
        </div>
      </section>

      {/* 10. FAQ */}
      {robot.faqs.length > 0 && (
        <section className="border-b border-line py-14 sm:py-18">
          <div className="container max-w-4xl">
            <SectionHeading
              eyebrow="BOT FAQ"
              title={`Câu hỏi thường gặp về ${robot.shortName}`}
            />
            <div className="mt-8">
              <Accordion items={robot.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* 11. Contact CTA */}
      <section className="bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-card-lg border border-gold/40 bg-card p-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
              Nhận tư vấn cấu hình tài khoản &amp; Cài đặt {robot.shortName}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-secondary sm:text-base">
              Đội ngũ kỹ thuật Backcom Mr Leo sẵn sàng hỗ trợ kiểm tra sự tương
              thích của sàn giao dịch và hướng dẫn thiết lập VPS an toàn.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                Liên hệ kỹ thuật viên Bot
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/brokers"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                Xem các sàn giao dịch đối tác
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
