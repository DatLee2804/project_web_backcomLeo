"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  User,
  UserPlus,
  X,
  Zap,
} from "lucide-react";
import { mainNavigation } from "@/data/navigation";
import { defaultSitePagesContent } from "@/data/site-pages";
import type { HomePageCmsContent, NavSubItem, SessionUser } from "@/types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith("/admin");

  const [scrolled, setScrolled] = React.useState(false);
  const [dismissedPromoBar, setDismissedPromoBar] = React.useState(false);
  const [promoBar, setPromoBar] = React.useState<
    HomePageCmsContent["promoBar"]
  >(defaultSitePagesContent.home.promoBar);
  const [dynamicBrokersNav, setDynamicBrokersNav] = React.useState<
    NavSubItem[] | null
  >(null);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(
    null
  );
  const [currentUser, setCurrentUser] = React.useState<SessionUser | null>(
    null
  );
  const [authLoaded, setAuthLoaded] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpenDropdown(null);
    setAccountMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const navItems = React.useMemo(() => {
    if (!dynamicBrokersNav) return mainNavigation;
    return mainNavigation.map((item) =>
      item.href === "/brokers"
        ? { ...item, children: dynamicBrokersNav }
        : item
    );
  }, [dynamicBrokersNav]);

  React.useEffect(() => {
    if (isAdminRoute) return;
    let active = true;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then(
        (data: {
          user?: SessionUser | null;
          promoBar?: HomePageCmsContent["promoBar"];
          brokersNav?: NavSubItem[];
        }) => {
          if (active) {
            setCurrentUser(data.user ?? null);
            if (data.promoBar) setPromoBar(data.promoBar);
            if (Array.isArray(data.brokersNav) && data.brokersNav.length > 0) {
              setDynamicBrokersNav(data.brokersNav);
            }
            setAuthLoaded(true);
          }
        }
      )
      .catch(() => {
        if (active) setAuthLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [pathname, isAdminRoute]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setAccountMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setAccountMenuOpen(false);
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

  if (isAdminRoute) {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
    setAccountMenuOpen(false);
    setMobileOpen(false);
    router.push("/");
    router.refresh();
  };

  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/tools") {
      return (
        pathname === "/tools" ||
        pathname === "/tools/indicators" ||
        pathname.startsWith("/tools/indicators/")
      );
    }
    if (href === "/backcom" && pathname === "/tools/calculator") {
      return true;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full">
      {/* High-Tech Top Announcement Bar */}
      {promoBar.enabled && !dismissedPromoBar && (
        <div className="border-b border-line bg-[#040B15]/95 backdrop-blur-md">
          <div className="container relative flex min-h-9 items-center justify-center gap-2.5 py-1.5 pr-8 text-xs">
            {promoBar.badge && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-gold-light">
                <Zap className="h-3 w-3 fill-current" />
                {promoBar.badge}
              </span>
            )}
            <span className="truncate text-ink-secondary">{promoBar.text}</span>
            {promoBar.ctaLabel && (
              <Link
                href={promoBar.ctaHref || "/brokers"}
                className="hidden shrink-0 items-center gap-1 rounded-full bg-gold-gradient px-2.5 py-0.5 text-[11px] font-bold text-[#020813] transition-transform hover:scale-105 sm:inline-flex"
              >
                {promoBar.ctaLabel}
                <ArrowRight className="h-3 w-3" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setDismissedPromoBar(true)}
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
            "flex h-14 items-center justify-between gap-3 rounded-2xl border px-4 transition-all duration-200 sm:px-5 lg:h-16",
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
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gold/50 bg-[#162029] shadow-[0_0_18px_rgba(0,194,255,0.28)] transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11">
              <Image
                src="/images/brand/leo-emblem.png"
                alt="Logo thương hiệu Backcom Mr Leo"
                width={88}
                height={88}
                priority
                className="h-full w-full object-cover"
              />
            </span>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-extrabold tracking-wider text-ink-primary sm:text-base">
                BACKCOM <span className="text-gold-gradient">MR LEO</span>
              </span>
              <span className="hidden text-[9px] font-semibold tracking-[0.18em] text-ink-muted sm:block">
                LEO TRADING ECOSYSTEM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navItems.map((item) => {
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
                        "py-2 pl-0.5 pr-2 text-ink-secondary transition-colors hover:text-gold-light",
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

                  {isOpen && item.children && (
                    <div className="absolute left-0 top-full w-[350px] pt-2.5 animate-in fade-in slide-in-from-top-1 duration-150">
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
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Auth & Account Actions */}
          <div className="hidden items-center gap-2 lg:flex">
            {authLoaded && currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-gold/45 bg-[#091C34] py-1 pl-1.5 pr-3 text-xs font-semibold text-ink-primary transition-colors hover:border-gold"
                >
                  {currentUser.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient text-[11px] font-extrabold text-[#020813]">
                      {currentUser.fullName.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span className="max-w-[115px] truncate">
                    {currentUser.fullName}
                  </span>
                  {currentUser.role === "admin" && (
                    <span className="rounded bg-vip/20 px-1.5 py-0.5 text-[9px] font-extrabold text-vip-light">
                      ADMIN
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-gold-light transition-transform",
                      accountMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-2xl border border-line-strong bg-[#061222]/98 p-2 shadow-2xl backdrop-blur-2xl">
                    <div className="border-b border-line px-3 py-2">
                      <div className="truncate text-xs font-bold text-ink-primary">
                        {currentUser.fullName}
                      </div>
                      <div className="truncate text-[11px] text-ink-muted">
                        {currentUser.email}
                      </div>
                    </div>

                    <div className="mt-1.5 space-y-1">
                      {currentUser.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl bg-gold/15 px-3 py-2 text-xs font-bold text-gold-light hover:bg-gold/25"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Bảng Quản trị Admin</span>
                        </Link>
                      )}

                      <Link
                        href="/account"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-primary hover:bg-card"
                      >
                        <User className="h-4 w-4 text-gold-light" />
                        <span>Hồ sơ Tài khoản</span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-medium text-danger hover:bg-danger-muted"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "rounded-full"
                  )}
                >
                  <LogIn className="h-3.5 w-3.5 text-gold-light" />
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" }),
                    "rounded-full px-4"
                  )}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Đăng ký
                </Link>
              </>
            )}
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
      {mobileOpen && (
        <div className="container pb-3 animate-in fade-in slide-in-from-top-2 duration-150 xl:hidden">
          <div className="max-h-[calc(100vh-6rem)] space-y-1.5 overflow-y-auto rounded-2xl border border-line-strong bg-[#061222]/98 p-4 shadow-2xl backdrop-blur-2xl">
            {navItems.map((item) => {
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

            {currentUser ? (
              <div className="space-y-2 pt-3">
                {currentUser.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "primary", size: "md" }),
                      "w-full"
                    )}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Vào Quản trị Admin
                  </Link>
                )}
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "md" }),
                      "w-full"
                    )}
                  >
                    Hồ sơ Tài khoản
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={cn(
                      buttonVariants({ variant: "subtle", size: "md" }),
                      "w-full text-danger"
                    )}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 pt-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "md" }),
                    "w-full"
                  )}
                >
                  <LogIn className="h-4 w-4 text-gold-light" />
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" }),
                    "w-full"
                  )}
                >
                  <UserPlus className="h-4 w-4" />
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
