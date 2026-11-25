import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getSitePagesContent } from "@/lib/cms";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export const metadata = constructMetadata({
  title: "Câu hỏi thường gặp (FAQ) — Backcom, Sàn giao dịch & Công cụ",
  description:
    "Giải đáp các câu hỏi trọng tâm về cơ chế hoàn phí Forex Backcom, cách liên kết tài khoản hiện tại, chu kỳ thanh toán, Robot EA và rủi ro Copy Trade.",
  path: "/faq",
});

export default async function FaqPage() {
  const sitePages = await getSitePagesContent();
  const faqs = sitePages.home.faqs;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-background py-14 sm:py-18 lg:py-22">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container max-w-4xl">
        <div className="text-center">
          <Badge variant="gold">SUPPORT KNOWLEDGE BASE</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
            Câu hỏi thường gặp (FAQ)
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-secondary sm:text-lg">
            Tổng hợp câu trả lời minh bạch cho những thắc mắc phổ biến nhất của
            nhà giao dịch khi tìm hiểu về hệ sinh thái Backcom Mr Leo.
          </p>
        </div>

        <div className="mt-12">
          <Accordion items={faqs} />
        </div>

        <Card className="mt-12 flex flex-col items-center justify-between gap-4 border-gold/35 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
          <div className="flex items-start gap-3.5">
            <HelpCircle className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
            <div>
              <h2 className="font-heading text-lg font-bold text-ink-primary">
                Vẫn còn câu hỏi riêng về tài khoản của bạn?
              </h2>
              <p className="mt-1 text-sm text-ink-secondary">
                Đội ngũ hỗ trợ sẵn sàng kiểm tra trường hợp cụ thể của từng sàn
                giao dịch.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "shrink-0"
            )}
          >
            Liên hệ trực tiếp
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    </div>
  );
}

