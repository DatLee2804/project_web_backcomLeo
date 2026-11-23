"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, Calculator, Mail, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function FloatingActions() {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Sleek Right-Side Tech Dock (like Images 1-4) */}
      <div className="fixed bottom-20 right-4 z-40 hidden flex-col items-center gap-2.5 sm:flex lg:bottom-8 lg:right-5">
        <a
          href={SITE_CONFIG.zaloGroupUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Tham gia Cộng đồng Zalo"
          aria-label="Tham gia Cộng đồng Zalo Backcom Mr Leo"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-[#020813] shadow-ocean-glow transition-transform hover:scale-110"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg border border-gold/35 bg-[#061222]/95 px-3 py-1.5 text-xs font-semibold text-gold-light opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Cộng đồng Zalo
          </span>
        </a>

        <Link
          href="/contact"
          title="Liên hệ tư vấn IB"
          aria-label="Liên hệ tư vấn IB"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-[#09182B]/95 text-ink-primary shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-gold hover:text-gold-light"
        >
          <Mail className="h-4 w-4" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg border border-line-strong bg-[#061222]/95 px-3 py-1.5 text-xs font-semibold text-ink-primary opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Biểu mẫu Tư vấn
          </span>
        </Link>

        <Link
          href="/tools/calculator"
          title="Công cụ tính Backcom"
          aria-label="Công cụ tính Backcom"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-[#09182B]/95 text-gold-light shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-gold"
        >
          <Calculator className="h-4 w-4" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg border border-line-strong bg-[#061222]/95 px-3 py-1.5 text-xs font-semibold text-gold-light opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Tính Backcom
          </span>
        </Link>

        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            title="Lên đầu trang"
            aria-label="Cuộn lên đầu trang"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-[#06101E]/95 text-ink-secondary shadow-lg backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold-light"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-[#040A14]/95 px-3 py-2.5 backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href="/tools/calculator"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "h-10 w-full text-xs"
            )}
          >
            <Calculator className="h-3.5 w-3.5 text-gold-light" />
            Tính Backcom
          </Link>
          <a
            href={SITE_CONFIG.zaloGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "h-10 w-full text-xs"
            )}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Cộng đồng Zalo
          </a>
        </div>
      </div>
    </>
  );
}
