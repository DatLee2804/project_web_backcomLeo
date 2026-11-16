"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Coins,
  Film,
  Layers,
  Pause,
  Play,
  Sparkles,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";
import { heroPromoVideo } from "@/data/hero-media";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TRUST_STATS = [
  {
    value: "5",
    label: "BROKER PARTNERS",
    icon: Building2,
  },
  {
    value: "STD05",
    label: "AUSTEX DEFAULT",
    icon: Coins,
  },
  {
    value: "MT5 / TV",
    label: "EA & INDICATORS",
    icon: Layers,
  },
  {
    value: "VI-VN",
    label: "TRADER COMMUNITY",
    icon: Users,
  },
];

export function HeroSection() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-background pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-18">
      {/* Cyber Tech Dot Matrix & Ocean Radial Glows */}
      <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-[580px] bg-hero-glow" />
      <div className="pointer-events-none absolute -left-32 top-28 h-96 w-96 rounded-full bg-gold/[0.08] blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#0066FF]/[0.12] blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: High-Tech Copy & Actions */}
          <div className="lg:col-span-7">
            {/* Capsule Trust Pill */}
            <div className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-[#071426]/90 px-3.5 py-1.5 shadow-card backdrop-blur-md">
              <div className="flex -space-x-1.5">
                {["AU", "EX", "TM", "FX"].map((code, i) => (
                  <span
                    key={code}
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border border-[#03070E] text-[9px] font-extrabold",
                      i === 0
                        ? "bg-gold-gradient text-[#020813]"
                        : "bg-[#0E223D] text-gold-light"
                    )}
                  >
                    {code}
                  </span>
                ))}
              </div>
              <span className="text-xs font-medium text-ink-secondary">
                <strong className="text-gold-light">Hệ sinh thái 5 Sàn</strong>{" "}
                • Tối ưu phí giao dịch Forex
              </span>
            </div>

            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.06] tracking-tight text-ink-primary sm:text-5xl lg:text-[62px]">
              <span className="block">TRADE SMARTER.</span>
              <span className="mt-1.5 block text-gold-gradient">
                GET MORE BACK.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary sm:text-lg">
              Tối ưu chi phí giao dịch Forex cùng{" "}
              <strong className="text-ink-primary">Backcom Mr Leo</strong>. Kết
              nối hệ sinh thái sàn giao dịch đối tác, công cụ Trading, Robot EA
              và giải pháp hoàn phí minh bạch trọn đời tài khoản.
            </p>

            {/* Pill CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Link
                href="/brokers"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "w-full rounded-xl sm:w-auto"
                )}
              >
                Khám phá sàn giao dịch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#backcom-calculator"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "w-full rounded-xl sm:w-auto"
                )}
              >
                Tính Backcom chi tiết
              </a>
            </div>

            {/* Clean Tech Metrics Strip */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-7 sm:grid-cols-4">
              {TRUST_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label}>
                    <div className="flex items-center gap-1.5 font-heading text-xl font-extrabold text-ink-primary sm:text-2xl">
                      <Icon className="h-4 w-4 text-gold" />
                      <span>{stat.value}</span>
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Vertical 9:16 Ad / Promo Video Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto flex max-w-[330px] justify-center sm:max-w-[355px]">
              {/* Ambient electric cyan halo behind vertical video */}
              <div className="pointer-events-none absolute -inset-3 rounded-[34px] bg-gradient-to-b from-gold/25 via-[#0077FF]/15 to-transparent blur-2xl" />

              {/* Floating Tech Tag Top-Left */}
              <div className="pointer-events-none absolute -left-4 top-8 z-20 hidden items-center gap-2 rounded-xl border border-gold/45 bg-[#061325]/95 px-3 py-2 shadow-gold backdrop-blur-md sm:flex">
                <Sparkles className="h-3.5 w-3.5 text-gold-light" />
                <div className="text-[11px] leading-tight">
                  <div className="font-heading font-bold text-ink-primary">
                    Austex STD05
                  </div>
                  <div className="text-[10px] text-gold-light">
                    XAUUSD Spread: 36
                  </div>
                </div>
              </div>

              {/* 9:16 Vertical Frame */}
              <div className="tech-glass-panel relative z-10 w-full overflow-hidden rounded-[28px] border border-gold/45 p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_32px_rgba(0,194,255,0.22)]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] border border-line-strong bg-[#040B16]">
                  {heroPromoVideo.videoSrc ? (
                    <>
                      <video
                        ref={videoRef}
                        src={heroPromoVideo.videoSrc}
                        poster={heroPromoVideo.posterSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />

                      {/* Video Controls Overlay */}
                      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                        <span className="rounded-full border border-gold/40 bg-[#040B16]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-light backdrop-blur-md">
                          {heroPromoVideo.badge}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Tạm dừng video" : "Phát video"}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-[#040B16]/80 text-ink-primary backdrop-blur-md hover:border-gold hover:text-gold-light"
                          >
                            {isPlaying ? (
                              <Pause className="h-3.5 w-3.5" />
                            ) : (
                              <Play className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={toggleMute}
                            aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-[#040B16]/80 text-ink-primary backdrop-blur-md hover:border-gold hover:text-gold-light"
                          >
                            {isMuted ? (
                              <VolumeX className="h-3.5 w-3.5" />
                            ) : (
                              <Volume2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* High-Tech Vertical Video Placeholder Ready for Ad Video Upload */
                    <div className="relative flex h-full w-full flex-col justify-between p-5">
                      {/* Animated Cyber Background inside 9:16 Frame */}
                      <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-75" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gold/20 via-[#0077FF]/10 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#03070E] via-[#040B16]/90 to-transparent" />

                      {/* Top Bar */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#07172C]/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gold-light">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-light" />
                          {heroPromoVideo.badge}
                        </span>
                        <span className="rounded-lg border border-line bg-[#07172C]/80 px-2 py-1 font-mono text-[10px] text-ink-secondary">
                          1080×1920
                        </span>
                      </div>

                      {/* Center Glowing Play Emblem */}
                      <div className="relative z-10 my-auto flex flex-col items-center text-center">
                        <div className="relative flex h-20 w-20 items-center justify-center">
                          <span className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
                          <span className="absolute -inset-2 rounded-full border border-gold/30" />
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-[#020813] shadow-ocean-glow">
                            <Play className="ml-1 h-7 w-7 fill-current" />
                          </div>
                        </div>

                        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-[#08192F]/90 px-3 py-1 text-[11px] font-semibold text-gold-light">
                          <Film className="h-3.5 w-3.5" />
                          Khung Video Quảng Cáo Dọc
                        </div>

                        <p className="mt-2.5 max-w-[230px] text-xs leading-relaxed text-ink-secondary">
                          Chèn file video <code>.mp4</code> tỷ lệ 9:16 vào{" "}
                          <code className="text-gold-light">
                            src/data/hero-media.ts
                          </code>{" "}
                          để tự động phát tại đây.
                        </p>
                      </div>

                      {/* Bottom Reel Caption & CTA */}
                      <div className="relative z-10 space-y-3 rounded-2xl border border-line-strong bg-[#071528]/90 p-3.5 backdrop-blur-md">
                        <div>
                          <div className="font-heading text-sm font-bold text-ink-primary">
                            {heroPromoVideo.title}
                          </div>
                          <div className="mt-0.5 text-[11px] text-ink-secondary">
                            Trade Smarter. Get More Back.
                          </div>
                        </div>
                        <Link
                          href={heroPromoVideo.ctaHref}
                          className={cn(
                            buttonVariants({ variant: "primary", size: "sm" }),
                            "w-full rounded-xl"
                          )}
                        >
                          {heroPromoVideo.ctaLabel}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
