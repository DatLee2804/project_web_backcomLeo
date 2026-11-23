import Link from "next/link";
import Image from "next/image";
import { getOrderedBrokers } from "@/data/brokers";
import type { Broker } from "@/types";
import { cn } from "@/lib/utils";

export function BrokerLogoMarquee({
  brokersList,
}: {
  brokersList?: Broker[];
}) {
  const brokers = brokersList ?? getOrderedBrokers();
  // Repeat list inside each half so even ultra-wide monitors have a full continuous strip
  const halfTrack = [...brokers, ...brokers];

  return (
    <section
      aria-label="Đối tác sàn giao dịch"
      className="relative overflow-hidden border-b border-line bg-[#040B16]/95 py-5 sm:py-6"
    >
      <div className="container">
        <div className="mb-3.5 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/50 sm:w-16" />
          <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-ink-secondary">
            ĐỐI TÁC SÀN GIAO DỊCH TRONG HỆ SINH THÁI
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/50 sm:w-16" />
        </div>

        {/* Seamless Infinite Horizontal Marquee */}
        <div className="marquee-mask overflow-hidden py-1">
          <div className="animate-marquee-track gap-4 sm:gap-6">
            {/* Track Copy 1 */}
            <div className="flex shrink-0 items-center gap-4 sm:gap-6">
              {halfTrack.map((broker, idx) => (
                <Link
                  key={`track-a-${broker.slug}-${idx}`}
                  href={`/brokers/${broker.slug}`}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5",
                    broker.featured
                      ? "border-gold/45 bg-[#091C34]/90 shadow-[0_0_20px_rgba(0,194,255,0.14)] hover:border-gold"
                      : "border-line bg-[#071324]/80 hover:border-gold/45 hover:bg-card-hover"
                  )}
                >
                  <Image
                    src={broker.logo}
                    alt={`Logo đối tác ${broker.name}`}
                    width={148}
                    height={42}
                    className="h-9 w-auto transition-transform duration-200 group-hover:scale-[1.03] sm:h-10"
                  />
                </Link>
              ))}
            </div>

            {/* Track Copy 2 (Identical clone for seamless -50% loop) */}
            <div
              aria-hidden="true"
              className="flex shrink-0 items-center gap-4 sm:gap-6"
            >
              {halfTrack.map((broker, idx) => (
                <Link
                  key={`track-b-${broker.slug}-${idx}`}
                  href={`/brokers/${broker.slug}`}
                  tabIndex={-1}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5",
                    broker.featured
                      ? "border-gold/45 bg-[#091C34]/90 shadow-[0_0_20px_rgba(0,194,255,0.14)] hover:border-gold"
                      : "border-line bg-[#071324]/80 hover:border-gold/45 hover:bg-card-hover"
                  )}
                >
                  <Image
                    src={broker.logo}
                    alt=""
                    width={148}
                    height={42}
                    className="h-9 w-auto transition-transform duration-200 group-hover:scale-[1.03] sm:h-10"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
