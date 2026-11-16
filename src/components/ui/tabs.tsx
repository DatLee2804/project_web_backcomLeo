"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabOption {
  id: string;
  label: string;
  badge?: string;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ options, value, onChange, className }: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-line bg-background-secondary p-1.5",
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm",
              active
                ? "bg-card-hover text-gold-light shadow-sm ring-1 ring-gold/35"
                : "text-ink-secondary hover:bg-white/[0.03] hover:text-ink-primary"
            )}
          >
            <span>{opt.label}</span>
            {opt.badge && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  active
                    ? "bg-gold/20 text-gold-light"
                    : "bg-white/[0.06] text-ink-muted"
                )}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

