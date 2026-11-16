import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-3.5">
          <Badge variant="gold">{eyebrow}</Badge>
        </div>
      )}
      <h2 className="font-heading text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-base leading-relaxed text-ink-secondary sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

