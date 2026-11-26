import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  MessageCircle,
  ShieldAlert,
  Sliders,
  Terminal,
} from "lucide-react";
import { getLiveIndicatorBySlug, getLiveIndicators } from "@/lib/cms";
import { ProductCoverFrame } from "@/components/shared/product-cover-frame";
import { SectionHeading } from "@/components/shared/section-heading";
import { ShowcaseGallerySection } from "@/components/shared/showcase-gallery-section";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, InteractiveCard } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONFIG, constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export async function generateStaticParams() {
  const indicators = await getLiveIndicators();
  return indicators.map((i) => ({ slug: i.slug }));
}

interface IndicatorDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: IndicatorDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const indicator = await getLiveIndicatorBySlug(slug);
  if (!indicator) {
    return constructMetadata({
      title: "Chỉ báo không tồn tại",
      description: "Không tìm thấy công cụ chỉ báo yêu cầu.",
      path: "/tools",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${indicator.name} (${indicator.platform}) — Thông số & Hướng dẫn`,
    description: indicator.subtitle,
    path: `/tools/indicators/${indicator.slug}`,
  });
}

export default async function IndicatorDetailPage({
  params,
}: IndicatorDetailPageProps) {
  const { slug } = await params;
  const [indicator, allIndicators] = await Promise.all([
    getLiveIndicatorBySlug(slug),
    getLiveIndicators(),
  ]);

  if (!indicator) {
    notFound();
  }

  const otherIndicators = allIndicators.filter(
    (item) => item.slug !== indicator.slug
  );

  return (
    <div className="bg-background">
      {/* 1. Product Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Quay lại trang Công cụ Trading
          </Link>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Badge variant="featured">{indicator.platform}</Badge>
                <Badge variant="gold">{indicator.category}</Badge>
                <Badge variant="pending">Cấp quyền thành viên</Badge>
              </div>

              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
                {indicator.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
                {indicator.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" })
                  )}
                >
                  Đăng ký nhận quyền truy cập
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#installation-guide"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" })
                  )}
                >
                  Xem hướng dẫn cài đặt
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ProductCoverFrame
                src={indicator.previewImage}
                alt={`Giao diện minh họa chỉ báo ${indicator.name}`}
                outerGlow
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Introduction */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container max-w-4xl">
          <SectionHeading
            align="left"
            eyebrow="01 • INDICATOR OVERVIEW"
            title={`Giới thiệu tổng quan về ${indicator.name}`}
          />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
            {indicator.introduction.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 2B. Performance & Parameter Showcase Gallery (4-6 Images) */}
      <ShowcaseGallerySection
        eyebrow="02 • PERFORMANCE & PARAMETER SHOWCASE"
        title={
          indicator.showcaseTitle?.trim() ||
          `Thống kê Hiệu suất & Hình ảnh Thực chiến — ${indicator.name}`
        }
        subtitle={indicator.showcaseSubtitle}
        images={indicator.showcaseGallery}
        variant="indicator"
      />

      {/* 3. How It Works & Core Features */}
      <section className="border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="03 • ANALYTICAL MECHANISM & FEATURES"
            title="Nguyên lý hoạt động & Tính năng nổi bật"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {indicator.howItWorks.map((item) => (
              <Card key={item.title} className="p-6">
                <div className="flex items-start gap-3">
                  <Cpu className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {indicator.features.map((feat) => (
              <div
                key={feat}
                className="rounded-card border border-line bg-card p-5"
              >
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <p className="mt-3 text-xs font-medium leading-relaxed text-ink-primary sm:text-sm">
                  {feat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technical Specs & Recommended Markets */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Card className="h-full p-6">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-gold" />
                  <h2 className="font-heading text-xl font-bold text-ink-primary">
                    Thị trường &amp; Khung thời gian
                  </h2>
                </div>

                <div className="mt-5 space-y-5 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-muted">
                      Nền tảng tương thích
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="gold">{indicator.platform}</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-muted">
                      Sản phẩm áp dụng tối ưu
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {indicator.targetMarkets.map((mkt) => (
                        <Badge key={mkt} variant="neutral">
                          {mkt}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-ink-muted">
                      Khung thời gian khuyến nghị
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {indicator.recommendedTimeframes.map((tf) => (
                        <Badge key={tf} variant="gold">
                          {tf}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="h-full p-6">
                <div className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-gold" />
                  <h2 className="font-heading text-xl font-bold text-ink-primary">
                    Bảng thông số kỹ thuật (Technical Parameters)
                  </h2>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {indicator.parameters.map((param) => (
                    <div
                      key={param.label}
                      className="rounded-xl border border-line bg-background-secondary p-4"
                    >
                      <div className="text-xs text-ink-muted">{param.label}</div>
                      <div className="mt-1 font-heading text-sm font-bold text-ink-primary">
                        {param.value}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Installation Guide */}
      <section
        id="installation-guide"
        className="scroll-mt-24 border-b border-line bg-background-secondary py-14 sm:py-18"
      >
        <div className="container">
          <SectionHeading
            eyebrow="04 • SETUP WORKFLOW"
            title={`Quy trình 4 bước kích hoạt & cài đặt ${indicator.name}`}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {indicator.installationSteps.map((step) => (
              <Card key={step.step} className="p-6">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gold/45 bg-gold/15 font-heading text-sm font-bold text-gold-light">
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

      {/* 6. Practical Usage & Risk Notes */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container max-w-4xl">
          <div className="rounded-card-lg border border-vip/35 bg-vip/10 p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="h-6 w-6 text-vip" />
              <h2 className="font-heading text-xl font-bold text-ink-primary sm:text-2xl">
                Lưu ý sử dụng thực chiến &amp; Quản trị rủi ro
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary">
              {indicator.usageNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-vip" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="container max-w-4xl">
          <SectionHeading
            eyebrow="INDICATOR FAQ"
            title={`Câu hỏi thường gặp về ${indicator.name}`}
          />
          <div className="mt-8">
            <Accordion items={indicator.faqs} />
          </div>
        </div>
      </section>

      {/* 8. Related Indicators */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="EXPLORE MORE TOOLS"
            title="Các chỉ báo khác trong Thư viện Hệ sinh thái"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {otherIndicators.map((other) => (
              <InteractiveCard
                key={other.slug}
                className="flex flex-col justify-between p-5"
              >
                <div>
                  <Badge variant="gold">{other.platform}</Badge>
                  <h3 className="mt-3 font-heading text-lg font-bold text-ink-primary">
                    {other.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-secondary">
                    {other.summary}
                  </p>
                </div>
                <Link
                  href={`/tools/indicators/${other.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-gold-light hover:underline"
                >
                  Xem thông số chi tiết
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <div className="tech-glass-panel mx-auto max-w-4xl rounded-card-lg border border-gold/45 p-8 text-center shadow-gold sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
              Nhận quyền sử dụng {indicator.name}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-secondary sm:text-base">
              Gửi thông tin tài khoản đối tác hoặc tham gia nhóm Zalo hỗ trợ kỹ
              thuật để được kích hoạt quyền sử dụng và hướng dẫn cài đặt 1-1.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                Đăng ký cấp quyền ngay
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={SITE_CONFIG.zaloGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                <MessageCircle className="h-4 w-4 text-gold-light" />
                Hỗ trợ qua Zalo Cộng đồng
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
