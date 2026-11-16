"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Lock, Sparkles } from "lucide-react";
import { getOrderedBrokers } from "@/data/brokers";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Broker } from "@/types";

export function FeaturedBrokersSection() {
  const ordered = React.useMemo(() => getOrderedBrokers(), []);
  const [selectedSlug, setSelectedSlug] =
    React.useState<Broker["slug"]>("austex");
  const [guideMode, setGuideMode] = React.useState<"new" | "existing">("new");

  const activeBroker =
    ordered.find((b) => b.slug === selectedSlug) ?? ordered[0];

  return (
    <section className="border-b border-line bg-background-secondary py-12 sm:py-14 lg:py-16">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="INTERACTIVE BROKER TERMINAL"
            title="CHOOSE YOUR BROKER"
            subtitle="Chọn sàn giao dịch bên trái để xem thông số cấu hình chi tiết và hướng dẫn kích hoạt nhận Backcom."
          />
          <Link
            href="/brokers"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-gold-light transition-colors hover:text-white"
          >
            Xem tất cả sàn giao dịch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Split Interactive Master-Detail Layout (Image 3 Style!) */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Left Column: Selectable Broker Stack */}
          <div className="space-y-2.5 lg:col-span-4">
            {ordered.map((broker) => {
              const isSelected = broker.slug === activeBroker.slug;
              return (
                <button
                  key={broker.slug}
                  type="button"
                  onClick={() => setSelectedSlug(broker.slug)}
                  className={cn(
                    "group relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200",
                    isSelected
                      ? "border-gold/60 bg-[#0C213B] shadow-[0_0_28px_rgba(0,194,255,0.18)]"
                      : "border-line bg-card hover:border-line-strong hover:bg-card-hover"
                  )}
                >
                  {isSelected && (
                    <span className="absolute inset-y-2 left-1 w-1 rounded-full bg-gold-gradient" />
                  )}

                  <div className="flex items-center gap-3.5 pl-1.5">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-heading text-xs font-extrabold",
                        isSelected
                          ? "border-gold bg-gold-gradient text-[#020813]"
                          : "border-line-strong bg-[#071324] text-gold-light"
                      )}
                    >
                      {broker.shortName.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-bold text-ink-primary sm:text-base">
                          {broker.name}
                        </span>
                        {broker.featured && (
                          <span className="rounded bg-vip/20 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-vip-light">
                            PRIORITY
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-ink-muted">
                        {broker.slug === "austex"
                          ? "Mặc định: STD05 (Spread 36)"
                          : broker.platforms.length > 0
                            ? broker.platforms.join(" • ")
                            : "Đối tác hệ sinh thái"}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={cn(
                        "text-xs font-bold",
                        isSelected ? "text-gold-light" : "text-ink-secondary"
                      )}
                    >
                      {broker.slug === "austex" ? "STD05" : "Config"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Glass Panel for Active Broker */}
          <div className="tech-glass-panel relative overflow-hidden rounded-card-lg border border-line-strong p-6 sm:p-8 lg:col-span-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

            {/* Top Broker Header */}
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src={activeBroker.logo}
                  alt={`Logo minh họa ${activeBroker.name}`}
                  width={154}
                  height={44}
                  className="h-11 w-auto"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-2xl font-extrabold text-ink-primary">
                      {activeBroker.name}
                    </h3>
                    {activeBroker.featured && (
                      <Badge variant="featured">FEATURED BROKER</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-secondary">
                    {activeBroker.tagline}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-heading text-2xl font-extrabold text-gold-gradient sm:text-3xl">
                  {activeBroker.slug === "austex"
                    ? "STD05 • 36"
                    : activeBroker.platforms.length > 0
                      ? activeBroker.platforms.join(" / ")
                      : "IB Partner"}
                </div>
                <div className="text-[11px] text-ink-muted">
                  {activeBroker.slug === "austex"
                    ? "Tài khoản mặc định & XAUUSD Spread"
                    : "Cấu hình theo tài khoản đối tác"}
                </div>
              </div>
            </div>

            {/* 4 Key Tech Boxes */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-line bg-[#06101E]/90 p-3.5">
                <div className="text-[11px] text-ink-muted">Loại tài khoản</div>
                <div className="mt-1 font-heading text-sm font-bold text-ink-primary">
                  {activeBroker.slug === "austex"
                    ? "STD05 (Mặc định)"
                    : "Đang cập nhật"}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-[#06101E]/90 p-3.5">
                <div className="text-[11px] text-ink-muted">Đối chiếu phụ</div>
                <div className="mt-1 font-heading text-sm font-bold text-ink-primary">
                  {activeBroker.slug === "austex"
                    ? "STD (Spread 31)"
                    : "Theo phân hạng"}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-[#06101E]/90 p-3.5">
                <div className="text-[11px] text-ink-muted">Nền tảng</div>
                <div className="mt-1 font-heading text-sm font-bold text-ink-primary">
                  {activeBroker.platforms.length > 0
                    ? activeBroker.platforms.join(" • ")
                    : "Đang cập nhật"}
                </div>
              </div>
              <div className="rounded-xl border border-line bg-[#06101E]/90 p-3.5">
                <div className="text-[11px] text-ink-muted">Biểu phí Rebate</div>
                <div className="mt-1 font-heading text-sm font-bold text-gold-light">
                  {activeBroker.slug === "austex"
                    ? "Theo cấu hình STD05"
                    : "Liên hệ / Cấu hình"}
                </div>
              </div>
            </div>

            {/* Quick Guide Segmented Toggle (Exact UX of Image 3!) */}
            <div className="mt-7">
              <div className="text-xs font-bold uppercase tracking-wider text-ink-primary">
                Hướng dẫn kết nối nhanh (Quick Guide)
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-line-strong bg-[#050D18] p-1">
                <button
                  type="button"
                  onClick={() => setGuideMode("new")}
                  className={cn(
                    "rounded-lg py-2.5 text-xs font-bold transition-all sm:text-sm",
                    guideMode === "new"
                      ? "bg-gold-gradient text-[#020813] shadow-gold"
                      : "text-ink-secondary hover:text-ink-primary"
                  )}
                >
                  Chưa có tài khoản tại sàn
                </button>
                <button
                  type="button"
                  onClick={() => setGuideMode("existing")}
                  className={cn(
                    "rounded-lg py-2.5 text-xs font-bold transition-all sm:text-sm",
                    guideMode === "existing"
                      ? "bg-gold-gradient text-[#020813] shadow-gold"
                      : "text-ink-secondary hover:text-ink-primary"
                  )}
                >
                  Đã có tài khoản tại sàn
                </button>
              </div>

              {/* Numbered Steps */}
              <div className="mt-5 space-y-3.5 text-xs sm:text-sm">
                {guideMode === "new" ? (
                  <>
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-xs font-extrabold text-gold-light">
                        1
                      </span>
                      <div className="text-ink-secondary">
                        Mở tài khoản{" "}
                        <strong className="text-ink-primary">
                          {activeBroker.name}
                        </strong>{" "}
                        thông qua luồng đối tác của Backcom Mr Leo
                        {activeBroker.slug === "austex" && (
                          <span>
                            {" "}
                            (lựa chọn đúng mã tài khoản mặc định{" "}
                            <strong className="text-gold-light">STD05</strong>).
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-xs font-extrabold text-gold-light">
                        2
                      </span>
                      <div className="text-ink-secondary">
                        Hoàn tất xác minh danh tính (KYC) trực tiếp trên cổng
                        khách hàng chính thức của {activeBroker.shortName}.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-xs font-extrabold text-gold-light">
                        3
                      </span>
                      <div className="text-ink-secondary">
                        Gửi{" "}
                        <strong className="text-ink-primary">
                          ID tài khoản giao dịch
                        </strong>{" "}
                        (không gửi mật khẩu) cho đội ngũ hỗ trợ để kích hoạt đối
                        soát hoàn phí.
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-xs font-extrabold text-gold-light">
                        1
                      </span>
                      <div className="text-ink-secondary">
                        Liên hệ đội ngũ Backcom Mr Leo để nhận mã đối tác (IB
                        Code) và mẫu yêu cầu chuyển IB chuẩn của{" "}
                        <strong className="text-ink-primary">
                          {activeBroker.name}
                        </strong>
                        .
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-xs font-extrabold text-gold-light">
                        2
                      </span>
                      <div className="text-ink-secondary">
                        Gửi yêu cầu chuyển đối tác giới thiệu trong khu vực cá
                        nhân của sàn và mở thêm tiểu khoản giao dịch mới dưới mã
                        IB.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-xs font-extrabold text-gold-light">
                        3
                      </span>
                      <div className="text-ink-secondary">
                        Cung cấp ID tiểu khoản mới để chúng tôi kiểm tra xác
                        nhận liên kết thành công trước khi bạn nạp vốn giao dịch.
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <Link
                href={`/brokers/${activeBroker.slug}`}
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" })
                )}
              >
                <Sparkles className="h-4 w-4" />
                View Details ({activeBroker.shortName})
                <ArrowRight className="h-4 w-4" />
              </Link>

              {activeBroker.referralUrl ? (
                <a
                  href={activeBroker.referralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "md" })
                  )}
                >
                  Register Now
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Đường dẫn đăng ký đối tác đang chờ cập nhật chính thức"
                  className={cn(
                    buttonVariants({ variant: "subtle", size: "md" }),
                    "cursor-not-allowed opacity-65"
                  )}
                >
                  <Lock className="h-3.5 w-3.5" />
                  Register Now (Chờ cập nhật link)
                </button>
              )}

              {activeBroker.externalPortal && (
                <a
                  href={activeBroker.externalPortal.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "md" })
                  )}
                >
                  Login BCR Portal
                  <ExternalLink className="h-3.5 w-3.5 text-gold-light" />
                </a>
              )}

              <Link
                href={`/contact?broker=${activeBroker.slug}`}
                className="ml-auto text-xs font-semibold text-gold-light hover:underline"
              >
                Nhận hướng dẫn mở tài khoản →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
