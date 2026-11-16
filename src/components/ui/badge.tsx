import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        gold: "bg-gold/12 text-gold-light border border-gold/35 shadow-[0_0_16px_rgba(0,194,255,0.14)]",
        featured:
          "bg-gold-gradient text-[#020813] font-extrabold shadow-[0_0_18px_rgba(0,194,255,0.38)]",
        vip: "bg-vip/15 text-vip-light border border-vip/45",
        neutral: "bg-[#0B1B30]/80 text-ink-secondary border border-line",
        pending: "bg-vip/12 text-vip-light border border-vip/30",
        demo: "bg-gold/15 text-gold-light border border-gold/40",
        success: "bg-success-muted text-success border border-success/35",
        danger: "bg-danger-muted text-danger border border-danger/35",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
