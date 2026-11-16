"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [showPromoBar, setShowPromoBar] = React.useState(true);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(
    null
  );
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full">
      {/* High-Tech Top Announcement Bar (like Image 1) */}
      {showPromoBar && (
        <div className="border-b border-line bg-[#040B15]/95 backdrop-blur-md">
          <div className="container relative flex min-h-9 items-center justify-center gap-2.5 py-1.5 pr-8 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-gold-light">
              <Zap className="h-3 w-3 fill-current" />
              AUSTEX PRIORITY
            </span>
            <span className="truncate text-ink-secondary">
              Cấu hình tài khoản mặc định{" "}
              <strong className="text-gold-light">STD05</strong> (XAUUSD Spread:
              36) — Tối ưu hoàn phí hệ sinh thái
            </span>
            <Link
              href="/brokers/austex"
              className="hidden shrink-0 items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-0.5 text-[11px] font-bold text-[#020813] transition-transform hover:scale-105 sm:inline-flex"
            >
              Xem chi tiết
              <ArrowRight className="h-3 w-3" />
            </Link>
            <button
              type="button"
              onClick={() => setShowPromoBar(false)}
              aria-label="Ẩn thanh thông báo"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-ink-muted transition-colors hover:text-ink-primary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Capsule Glass Navbar */}
      <div className="container pt-2.5 pb-2">
        <div
          className={cn(
            "flex h-14 items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-200 sm:px-5 lg:h-16",
            scrolled
              ? "border-gold/30 bg-[#050E1B]/92 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(0,194,255,0.12)] backdrop-blur-2xl"
              : "border-line-strong bg-[#061120]/82 shadow-[0_8px_30px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          )}
        >
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 focus:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold/50 bg-[#0A1C33] text-gold-light shadow-[0_0_18px_rgba(0,194,255,0.28)] transition-transform duration-200 group-hover:scale-105">
              <span className="font-heading text-xs font-extrabold tracking-tight">
                ML
              </span>
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-extrabold tracking-wider text-ink-primary sm:text-base">
                BACKCOM <span className="text-gold-gradient">MR LEO</span>
              </span>
              <span className="hidden text-[9px] font-semibold tracking-[0.18em] text-ink-muted sm:block">
                FINTECH ECOSYSTEM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {mainNavigation.map((item) => {
              const active = isRouteActive(item.href);
              const hasChildren = Boolean(item.children && item.children.length);
              const isOpen = openDropdown === item.href;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative whitespace-nowrap rounded-xl px-2.5 py-2 text-[13px] font-medium transition-all 2xl:px-3 2xl:text-sm",
                      active
                        ? "bg-gold/12 text-gold-light"
                        : "text-ink-secondary hover:bg-white/[0.04] hover:text-ink-primary"
                    )}
                  >
                    {item.title}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div
                    className={cn(
                      "flex items-center whitespace-nowrap rounded-xl transition-colors",
                      (active || isOpen) && "bg-gold/12"
                    )}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "whitespace-nowrap py-2 pl-2.5 pr-1 text-[13px] font-medium transition-colors 2xl:pl-3 2xl:text-sm",
                        active || isOpen
                          ? "text-gold-light"
                          : "text-ink-secondary hover:text-ink-primary"
                      )}
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Mở danh mục ${item.title}`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.href ? null : item.href
                        )
                      }
                      className={cn(
                        "py-2 pl-0.5 pr-2.5 text-ink-secondary transition-colors hover:text-gold-light",
                        (active || isOpen) && "text-gold-light"
                      )}
                    >
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isOpen && item.children && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute left-0 top-full w-[350px] pt-2.5"
                      >
                        <div className="overflow-hidden rounded-2xl border border-line-strong bg-[#061222]/98 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_24px_rgba(0,194,255,0.12)] backdrop-blur-2xl">
                          {item.children.map((sub) => {
                            const subActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className={cn(
                                  "group flex flex-col gap-1 rounded-xl p-3 transition-all",
                                  subActive
                                    ? "border border-gold/35 bg-card-hover"
                                    : "hover:bg-card"
                                )}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={cn(
                                      "text-sm font-semibold transition-colors",
                                      subActive
                                        ? "text-gold-light"
                                        : "text-ink-primary group-hover:text-gold-light"
                                    )}
                                  >
                                    {sub.title}
                                  </span>
                                  {sub.badge ? (
                                    <span className="rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-light">
                                      {sub.badge}
                                    </span>
                                  ) : (
                                    <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-gold-light" />
                                  )}
                                </div>
                                <p className="text-xs leading-relaxed text-ink-secondary">
                                  {sub.description}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Pill CTAs */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "rounded-full"
              )}
            >
              Liên hệ
            </Link>
            <Link
              href="/backcom"
              className={cn(
                buttonVariants({ variant: "primary", size: "sm" }),
                "rounded-full px-4"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Nhận Backcom
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-card text-ink-primary transition-colors hover:border-gold/50 xl:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-gold-light" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="container pb-3 xl:hidden"
          >
            <div className="max-h-[calc(100vh-6rem)] space-y-1.5 overflow-y-auto rounded-2xl border border-line-strong bg-[#061222]/98 p-4 shadow-2xl backdrop-blur-2xl">
              {mainNavigation.map((item) => {
                const active = isRouteActive(item.href);
                const hasChildren = Boolean(
                  item.children && item.children.length
                );
                const expanded = mobileExpanded === item.href;

                return (
                  <div
                    key={item.href}
                    className="rounded-xl border border-line bg-card/70"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex-1 px-4 py-3 text-sm font-semibold",
                          active ? "text-gold-light" : "text-ink-primary"
                        )}
                      >
                        {item.title}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`Mở danh mục con ${item.title}`}
                          onClick={() =>
                            setMobileExpanded((prev) =>
                              prev === item.href ? null : item.href
                            )
                          }
                          className="px-4 py-3 text-ink-secondary hover:text-gold-light"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expanded && "rotate-180 text-gold-light"
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && expanded && item.children && (
                      <div className="space-y-1 border-t border-line px-3 py-2.5">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-ink-secondary hover:bg-card-hover hover:text-gold-light"
                          >
                            <span>{sub.title}</span>
                            {sub.badge && (
                              <span className="rounded bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold text-gold-light">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="grid grid-cols-2 gap-2.5 pt-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "md" }),
                    "w-full"
                  )}
                >
                  Liên hệ
                </Link>
                <Link
                  href="/backcom"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" }),
                    "w-full"
                  )}
                >
                  Nhận Backcom
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
