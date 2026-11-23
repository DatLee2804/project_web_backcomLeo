"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Sparkles, UserCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { defaultSitePagesContent } from "@/data/site-pages";
import type { HomePageCmsContent } from "@/types";
import { cn } from "@/lib/utils";

export function WhatIsBackcomLoop({
  content,
}: {
  content?: HomePageCmsContent["rebateLoop"];
}) {
  const loopCopy = content ?? defaultSitePagesContent.home.rebateLoop;

  // Synchronized 3-step active phase (0: Trader -> Broker, 1: Broker -> Mr Leo, 2: Mr Leo -> Trader)
  const [activePhase, setActivePhase] = React.useState<0 | 1 | 2>(0);
  const [hoveredNode, setHoveredNode] = React.useState<0 | 1 | 2 | null>(null);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePhase((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const currentStep = hoveredNode ?? activePhase;

  return (
    <section className="border-b border-line bg-background py-12 sm:py-14 lg:py-16">
      <div className="container">
        <div className="tech-glass-panel relative overflow-hidden rounded-card-lg border border-line-strong p-6 sm:p-10 lg:p-12">
          {/* Ambient radial ocean glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/15 blur-[95px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#0066FF]/10 blur-[90px]" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-light">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-gold-light" />
                {loopCopy.badge}
              </span>

              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink-primary sm:text-4xl">
                {loopCopy.title}
              </h2>

              <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
                <p>{loopCopy.paragraph1}</p>
                <p>{loopCopy.paragraph2}</p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/brokers"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "rounded-full"
                  )}
                >
                  Khám phá các sàn hỗ trợ
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/backcom/what-is-backcom"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "rounded-full"
                  )}
                >
                  Tìm hiểu chuyên sâu
                </Link>
              </div>

              <p className="mt-5 text-xs text-ink-muted">{loopCopy.footnote}</p>
            </div>

            {/* Right Animated 3-Node Circular Cashflow Loop */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto h-[370px] max-w-[460px] sm:h-[400px]">
                {/* Animated SVG Orbiting Rings & Energy Comet */}
                <svg
                  viewBox="0 0 440 400"
                  className="h-full w-full"
                  aria-label="Sơ đồ chuyển động vòng tuần hoàn hoàn phí Backcom"
                >
                  <defs>
                    <linearGradient
                      id="oceanLoopTrack"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#5CE6FF" stopOpacity="0.35" />
                      <stop offset="50%" stopColor="#00C2FF" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0077FF" stopOpacity="0.35" />
                    </linearGradient>

                    <linearGradient
                      id="cometStream"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#5CE6FF" stopOpacity="1" />
                      <stop offset="60%" stopColor="#00C2FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0077FF" stopOpacity="0" />
                    </linearGradient>

                    <filter
                      id="cyanGlowFilter"
                      x="-30%"
                      y="-30%"
                      width="160%"
                      height="160%"
                    >
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Circular clockwise path starting from Bottom-Left (Trader) -> Top (Broker) -> Bottom-Right (Mr Leo) -> Bottom-Left */}
                    <path
                      id="rebateOrbitPath"
                      d="M 122 283 A 118 118 0 1 1 121.9 283.1"
                    />
                  </defs>

                  {/* Outer Slow-Rotating Cyber Radar Ring */}
                  <motion.circle
                    cx="220"
                    cy="208"
                    r="138"
                    fill="none"
                    stroke="rgba(0, 194, 255, 0.14)"
                    strokeWidth="1"
                    strokeDasharray="5 9"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 32,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "220px 208px" }}
                  />

                  {/* Inner Counter-Rotating Ring */}
                  <motion.circle
                    cx="220"
                    cy="208"
                    r="94"
                    fill="none"
                    stroke="rgba(92, 230, 255, 0.12)"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 24,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ transformOrigin: "220px 208px" }}
                  />

                  {/* Base Orbit Track */}
                  <circle
                    cx="220"
                    cy="208"
                    r="118"
                    fill="none"
                    stroke="url(#oceanLoopTrack)"
                    strokeWidth="2.2"
                  />

                  {/* Animated Traveling Energy Stream (Clockwise) */}
                  <motion.circle
                    cx="220"
                    cy="208"
                    r="118"
                    fill="none"
                    stroke="#38F2FF"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeDasharray="150 592"
                    filter="url(#cyanGlowFilter)"
                    animate={{ strokeDashoffset: [742, 0] }}
                    transition={{
                      duration: 6.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Secondary Trailing Glow Stream */}
                  <motion.circle
                    cx="220"
                    cy="208"
                    r="118"
                    fill="none"
                    stroke="#0088FF"
                    strokeOpacity="0.45"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="95 647"
                    animate={{ strokeDashoffset: [742, 0] }}
                    transition={{
                      duration: 6.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Orbiting Photon Dot using SVG animateMotion */}
                  <g filter="url(#cyanGlowFilter)">
                    <circle r="5.5" fill="#FFFFFF">
                      <animateMotion
                        dur="6.6s"
                        repeatCount="indefinite"
                        path="M 128 282 A 118 118 0 1 1 127.9 282.1"
                      />
                    </circle>
                    <circle r="10" fill="#00C2FF" fillOpacity="0.35">
                      <animateMotion
                        dur="6.6s"
                        repeatCount="indefinite"
                        path="M 128 282 A 118 118 0 1 1 127.9 282.1"
                      />
                    </circle>
                  </g>

                  {/* Directional Arrowheads on the Ring */}
                  {/* Left-up: Trader -> Broker */}
                  <polygon points="124,136 112,146 125,150" fill="#5CE6FF" />
                  {/* Right-down: Broker -> Backcom Mr Leo */}
                  <polygon points="319,147 308,135 305,149" fill="#00C2FF" />
                  {/* Bottom-left: Backcom Mr Leo -> Trader */}
                  <polygon points="212,326 226,319 224,333" fill="#5CE6FF" />
                </svg>

                {/* Center Core Medallion (Cleanly sized inside inner ring, zero overlap!) */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-4">
                  <motion.div
                    animate={{ scale: [1, 1.035, 1] }}
                    transition={{
                      duration: 3.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-gold/30 bg-[#05101F]/90 px-3 text-center shadow-[0_0_35px_rgba(0,194,255,0.18)] backdrop-blur-md sm:h-40 sm:w-40"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-light/80">
                      AUTO CYCLE
                    </span>
                    <div className="mt-1 font-heading text-lg font-extrabold tracking-tight text-gold-gradient sm:text-xl">
                      REBATE LOOP
                    </div>
                    <span className="mt-1 text-[10px] leading-tight text-ink-secondary">
                      Tối ưu chi phí trên từng Lot
                    </span>
                  </motion.div>
                </div>

                {/* Top Node (Step 1 Target): Broker */}
                <motion.div
                  onMouseEnter={() => setHoveredNode(1)}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={cn(
                    "absolute left-1/2 top-0 w-60 -translate-x-1/2 cursor-default rounded-2xl border p-3.5 backdrop-blur-md transition-all duration-300",
                    currentStep === 1
                      ? "border-gold bg-[#0B213D]/95 shadow-[0_0_28px_rgba(0,194,255,0.38)]"
                      : "border-line-strong bg-[#071528]/95 shadow-card"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
                        currentStep === 1
                          ? "border-gold bg-gold-gradient text-[#020813]"
                          : "border-gold/40 bg-gold/15 text-gold-light"
                      )}
                    >
                      <Building2 className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-heading text-xs font-bold text-ink-primary">
                        Sàn giao dịch (Broker)
                      </div>
                      <p className="text-[11px] leading-snug text-ink-secondary">
                        Lệnh phát sinh phí Spread / Commission
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Middle Left Step Pill (Phase 0) */}
                <div
                  className={cn(
                    "pointer-events-none absolute left-0 top-[46%] -translate-y-1/2 rounded-full border px-3 py-1 text-[10px] font-semibold backdrop-blur-md transition-all duration-300",
                    currentStep === 0
                      ? "border-gold bg-[#0A223F] text-gold-light shadow-[0_0_16px_rgba(0,194,255,0.35)]"
                      : "border-line-strong bg-[#05101F]/90 text-ink-secondary"
                  )}
                >
                  1. Bạn giao dịch
                </div>

                {/* Middle Right Step Pill (Phase 1) */}
                <div
                  className={cn(
                    "pointer-events-none absolute right-0 top-[46%] -translate-y-1/2 rounded-full border px-3 py-1 text-[10px] font-semibold backdrop-blur-md transition-all duration-300",
                    currentStep === 1
                      ? "border-gold bg-[#0A223F] text-gold-light shadow-[0_0_16px_rgba(0,194,255,0.35)]"
                      : "border-line-strong bg-[#05101F]/90 text-ink-secondary"
                  )}
                >
                  2. Sàn trích IB
                </div>

                {/* Bottom Center Step Pill (Phase 2) */}
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-[78px] left-1/2 z-20 -translate-x-1/2 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md transition-all duration-300 sm:bottom-[84px]",
                    currentStep === 2
                      ? "border-gold bg-[#0A223F] text-gold-light shadow-[0_0_16px_rgba(0,194,255,0.35)]"
                      : "border-line-strong bg-[#05101F]/90 text-ink-secondary"
                  )}
                >
                  3. Hoàn lại cho bạn
                </div>

                {/* Bottom Left Node: You (Trader) */}
                <motion.div
                  onMouseEnter={() => setHoveredNode(0)}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                  className={cn(
                    "absolute bottom-0 left-0 w-[46%] cursor-default rounded-2xl border p-3.5 backdrop-blur-md transition-all duration-300 sm:w-48",
                    currentStep === 0
                      ? "border-gold bg-[#0B213D]/95 shadow-[0_0_28px_rgba(0,194,255,0.38)]"
                      : "border-line-strong bg-[#071528]/95 shadow-card"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors",
                        currentStep === 0
                          ? "border-gold bg-gold-gradient text-[#020813]"
                          : "border-gold/40 bg-gold/15 text-gold-light"
                      )}
                    >
                      <UserCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-heading text-xs font-bold text-ink-primary">
                        Bạn (Trader)
                      </div>
                      <p className="mt-0.5 text-[10px] leading-snug text-ink-secondary">
                        Liên kết mã đối tác &amp; nhận hoàn phí
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Right Node: Backcom Mr Leo */}
                <motion.div
                  onMouseEnter={() => setHoveredNode(2)}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                  className={cn(
                    "absolute bottom-0 right-0 w-[46%] cursor-default rounded-2xl border p-3.5 backdrop-blur-md transition-all duration-300 sm:w-48",
                    currentStep === 2
                      ? "border-gold bg-[#0B213D]/95 shadow-[0_0_30px_rgba(0,194,255,0.42)]"
                      : "border-gold/40 bg-[#081A32]/95 shadow-card"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all",
                        currentStep === 2
                          ? "bg-gold-gradient text-[#020813] shadow-[0_0_14px_rgba(0,194,255,0.6)]"
                          : "border border-gold/45 bg-gold/15 text-gold-light"
                      )}
                    >
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="font-heading text-xs font-bold text-gold-light">
                        Backcom Mr Leo
                      </div>
                      <p className="mt-0.5 text-[10px] leading-snug text-ink-secondary">
                        Đối tác IB đối soát &amp; hoàn trả phí
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
