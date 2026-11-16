import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-card bg-card-radial shadow-card transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}

export function InteractiveCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-card bg-card-radial shadow-card transition-all duration-300 hover:-translate-y-1 hover:bg-card-hover hover:border-gold/50 hover:shadow-card-hover",
        className
      )}
      {...props}
    />
  );
}
