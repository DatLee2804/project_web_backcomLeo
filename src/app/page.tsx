import Link from "next/link";
import { ArrowRight, Calculator, MessageSquare } from "lucide-react";
import { HeroSection } from "@/components/homepage/hero-section";
import { BrokerLogoMarquee } from "@/components/homepage/broker-logo-marquee";
import { WhatIsBackcomLoop } from "@/components/homepage/what-is-backcom-loop";
import { BrokerPartnersSection } from "@/components/homepage/broker-partners-section";
import { WhyUsSection } from "@/components/homepage/why-us-section";
import { HowItWorksSection } from "@/components/homepage/how-it-works-section";
import { FeaturedBrokersSection } from "@/components/homepage/featured-brokers-section";
import { WithVsWithoutSection } from "@/components/homepage/with-vs-without-section";
import { EcosystemSection } from "@/components/homepage/ecosystem-section";
import { MasterPerformanceSection } from "@/components/homepage/master-performance-section";
import { CommunitySection } from "@/components/homepage/community-section";
import { BackcomCalculator } from "@/components/backcom/backcom-calculator";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Accordion } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { globalFaqs } from "@/data/faq";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Hệ sinh thái Forex Rebate, Sàn giao dịch & Công cụ Trading",
  description:
    "Tối ưu chi phí giao dịch Forex cùng Backcom Mr Leo. Kết nối 5 sàn giao dịch đối tác (ưu tiên Austex STD05), công cụ tính hoàn phí, Robot EA và cộng đồng Trader Việt Nam.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* SECTION 01 – HERO BANNER + 9:16 VERTICAL PROMO VIDEO */}
      <HeroSection />

      {/* HORIZONTAL SCROLLING BROKER LOGOS MARQUEE */}
      <BrokerLogoMarquee />

      {/* HIGH-TECH 3-NODE BACKCOM LOOP */}
      <ScrollReveal>
        <WhatIsBackcomLoop />
      </ScrollReveal>

      {/* SECTION 02 – BROKER PARTNERS */}
      <ScrollReveal>
        <BrokerPartnersSection />
      </ScrollReveal>

      {/* SECTION 03 – WHY BACKCOM MR LEO */}
      <ScrollReveal>
        <WhyUsSection />
      </ScrollReveal>

      {/* SECTION 04 – FULL BACKCOM CALCULATOR */}
      <section
        id="backcom-calculator"
        className="scroll-mt-24 border-b border-line bg-background-secondary py-12 sm:py-14 lg:py-16"
      >
        <div className="container">
          <SectionHeading
            eyebrow="TRANSPARENT ESTIMATOR"
            title="CALCULATE YOUR FOREX REBATE"
            subtitle="Ước tính khoản hoàn phí giao dịch của bạn theo từng sàn, loại tài khoản và mô hình quy đổi."
          />
          <div className="mt-10">
            <BackcomCalculator initialBrokerSlug="austex" />
          </div>
        </div>
      </section>

      {/* SECTION 05 – HOW BACKCOM WORKS */}
      <ScrollReveal>
        <HowItWorksSection />
      </ScrollReveal>

      {/* SECTION 06 – INTERACTIVE SPLIT BROKER TERMINAL */}
      <ScrollReveal>
        <FeaturedBrokersSection />
      </ScrollReveal>

      {/* WITH VS WITHOUT REBATES MATRIX */}
      <ScrollReveal>
        <WithVsWithoutSection />
      </ScrollReveal>

      {/* SECTION 07 – TRADING ECOSYSTEM */}
      <ScrollReveal>
        <EcosystemSection />
      </ScrollReveal>

      {/* SECTION 08 – MASTER PERFORMANCE */}
      <ScrollReveal>
        <MasterPerformanceSection />
      </ScrollReveal>

      {/* SECTION 09 – COMMUNITY */}
      <ScrollReveal>
        <CommunitySection />
      </ScrollReveal>

      {/* SECTION 10 – FAQ */}
      <section className="border-b border-line bg-background-secondary py-12 sm:py-14 lg:py-16">
        <div className="container max-w-4xl">
          <SectionHeading
            eyebrow="KNOWLEDGE BASE"
            title="CÂU HỎI THƯỜNG GẶP (FAQ)"
            subtitle="Giải đáp rõ ràng về cơ chế hoàn phí Backcom, liên kết sàn giao dịch, Robot EA và quản trị rủi ro."
          />
          <div className="mt-8">
            <Accordion items={globalFaqs} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-light hover:underline"
            >
              Xem trang tổng hợp FAQ chuyên sâu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 11 – FINAL CTA */}
      <section className="relative overflow-hidden bg-background py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-90" />
        <div className="container relative z-10">
          <div className="tech-glass-panel mx-auto max-w-4xl rounded-card-lg border border-gold/45 p-8 text-center shadow-gold sm:p-12">
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-ink-primary sm:text-4xl">
              READY TO OPTIMIZE YOUR TRADING COST?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink-secondary sm:text-lg">
              Bắt đầu khám phá hệ sinh thái Backcom Mr Leo ngay hôm nay.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link
                href="/tools/calculator"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "w-full rounded-xl sm:w-auto"
                )}
              >
                <Calculator className="h-4 w-4" />
                Tính Backcom
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "w-full rounded-xl sm:w-auto"
                )}
              >
                <MessageSquare className="h-4 w-4 text-gold-light" />
                Liên hệ tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
