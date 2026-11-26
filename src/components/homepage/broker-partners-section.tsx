import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { brokers as seedBrokers } from "@/data/brokers";
import type { Broker } from "@/types";
import { BrokerLogo } from "@/components/shared/broker-logo";
import { SectionHeading } from "@/components/shared/section-heading";
import { InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTION_02_ORDER = ["austex", "exness", "tickmill", "fxpro", "bcr"];

export function BrokerPartnersSection({
  brokersList,
}: {
  brokersList?: Broker[];
}) {
  const source = brokersList ?? seedBrokers;
  const knownOrdered = SECTION_02_ORDER.map((slug) =>
    source.find((b) => b.slug === slug)
  ).filter((b): b is Broker => Boolean(b));
  const extras = source.filter((b) => !SECTION_02_ORDER.includes(b.slug));
  const orderedList = [...knownOrdered, ...extras];

  return (
    <section className="border-b border-line bg-background-secondary py-12 sm:py-14 lg:py-16">
      <div className="container">
        <SectionHeading
          eyebrow="PARTNER NETWORK"
          title="OUR BROKER PARTNERS"
          subtitle="Kết nối với các sàn giao dịch và lựa chọn giải pháp phù hợp với chiến lược của bạn."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {orderedList.map((broker) => (
            <InteractiveCard
              key={broker.slug}
              className={cn(
                "flex flex-col justify-between p-5",
                broker.featured && "border-gold/40 bg-card-hover/60"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <BrokerLogo broker={broker} size="md" />
                  {broker.featured && (
                    <Badge variant="gold" className="text-[9px]">
                      PRIORITY
                    </Badge>
                  )}
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                  {broker.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-secondary">
                  {broker.shortDescription}
                </p>

                <dl className="mt-4 space-y-2 border-t border-line pt-3.5 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-ink-muted">Nền tảng:</dt>
                    <dd className="font-medium text-ink-primary">
                      {broker.platforms.length > 0
                        ? broker.platforms.join(" / ")
                        : "Đang cập nhật"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <dt className="text-ink-muted">Tài khoản:</dt>
                    <dd className="font-medium text-gold-light">
                      {broker.slug === "austex"
                        ? "STD05 / STD"
                        : "Cấu hình theo sàn"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                {broker.referralUrl && (
                  <a
                    href={broker.referralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "primary", size: "sm" }),
                      "w-full justify-between"
                    )}
                  >
                    <span>Mở tài khoản</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <Link
                  href={`/brokers/${broker.slug}`}
                  className="inline-flex items-center justify-between rounded-lg border border-line bg-background-secondary px-3.5 py-2 text-xs font-semibold text-ink-primary transition-colors hover:border-gold/45 hover:text-gold-light"
                >
                  <span>Chi tiết sàn</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-gold" />
                </Link>
              </div>
            </InteractiveCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/brokers"
            className={cn(buttonVariants({ variant: "outline", size: "md" }))}
          >
            Khám phá tất cả sàn giao dịch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

