"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reliable viewport reveal that works across all zoom levels, React 19 StrictMode,
 * and tall sections without ever trapping content at opacity: 0.
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(true);
  const [armed, setArmed] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    // If element is already in or above the viewport on mount, keep it immediately visible
    if (rect.top < window.innerHeight * 0.95) {
      setVisible(true);
      return;
    }

    // Only animate elements below the fold
    setArmed(true);
    setVisible(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.01,
        rootMargin: "80px 0px 80px 0px",
      }
    );

    observer.observe(el); 

    const onScrollFallback = () => {
      if (!ref.current) return;
      if (ref.current.getBoundingClientRect().top < window.innerHeight + 80) {
        setVisible(true);
        observer.disconnect();
        window.removeEventListener("scroll", onScrollFallback);
      }
    };

    window.addEventListener("scroll", onScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollFallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        armed && "transition-all duration-500 ease-out will-change-transform",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
    >
      {children}
    </div>
  );
}
