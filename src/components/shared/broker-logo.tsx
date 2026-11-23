import Image from "next/image";
import type { Broker } from "@/types";
import { cn } from "@/lib/utils";

export type BrokerLogoSize = "pill" | "xs" | "sm" | "md" | "lg";

interface BrokerLogoProps {
  broker: Pick<Broker, "slug" | "name" | "logo">;
  size?: BrokerLogoSize;
  decorative?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<
  BrokerLogoSize,
  { wrapper: string; width: number; height: number; pad: string }
> = {
  pill: {
    wrapper: "h-6 w-11 rounded-md",
    width: 88,
    height: 48,
    pad: "p-0.5",
  },
  xs: {
    wrapper: "h-9 w-[72px] rounded-lg",
    width: 144,
    height: 72,
    pad: "p-1",
  },
  sm: {
    wrapper: "h-11 w-[88px] rounded-xl",
    width: 176,
    height: 88,
    pad: "p-1.5",
  },
  md: {
    wrapper: "h-12 w-24 rounded-xl",
    width: 192,
    height: 96,
    pad: "p-1.5",
  },
  lg: {
    wrapper: "h-16 w-32 rounded-2xl",
    width: 256,
    height: 128,
    pad: "p-2",
  },
};

export function BrokerLogo({
  broker,
  size = "md",
  decorative = false,
  className,
}: BrokerLogoProps) {
  const dim = SIZE_CLASSES[size];
  const logoSrc = broker.logo || `/images/brokers/${broker.slug}-logo.png`;

  // Full-bleed brand squares/rectangles look best with object-cover inside a 2:1 frame
  const isFullBleedLogo =
    logoSrc.includes("exness-logo.png") ||
    logoSrc.includes("fxpro-logo.png") ||
    logoSrc.includes("bcr-logo.png");

  const bgClass = logoSrc.includes("exness-logo.png")
    ? "bg-[#FFDE02]"
    : logoSrc.includes("fxpro-logo.png")
      ? "bg-[#EE1D23]"
      : "bg-white";

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-white/15 shadow-[0_4px_14px_rgba(0,0,0,0.35)]",
        dim.wrapper,
        bgClass,
        className
      )}
    >
      <Image
        src={logoSrc}
        alt={decorative ? "" : `Logo sàn ${broker.name}`}
        width={dim.width}
        height={dim.height}
        className={cn(
          "h-full w-full",
          isFullBleedLogo ? "object-cover" : cn("object-contain", dim.pad)
        )}
      />
    </span>
  );
}
