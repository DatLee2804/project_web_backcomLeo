import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-btn text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.99]",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-gradient text-[#020813] font-bold shadow-ocean-glow hover:brightness-110 hover:-translate-y-0.5",
        secondary:
          "bg-[#091628]/90 border border-line-strong text-ink-primary hover:bg-card-hover hover:border-gold/55 hover:text-gold-light",
        outline:
          "border border-gold/45 bg-gold/10 text-gold-light hover:bg-gold/20 hover:border-gold hover:shadow-gold",
        ghost:
          "text-ink-secondary hover:text-gold-light hover:bg-gold/[0.07]",
        subtle:
          "bg-background-secondary border border-line text-ink-secondary hover:text-ink-primary hover:border-line-strong",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-sm sm:text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
