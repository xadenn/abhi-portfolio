"use client";

import React, { useState, useRef } from "react";
import FadeIn from "./FadeIn";
import TiltCard from "./TiltCard";
import { ChartLineUp, Cpu, Sparkle, CaretDown, CaretUp } from "@phosphor-icons/react";
import { TextEffect } from "@/components/ui/text-effect";
import { usePortfolio } from "@/context/PortfolioContext";
import { useCenterSpotlight } from "@/lib/use-center-spotlight";
import { cn } from "@/lib/utils";
import { ToolItem } from "@/types/portfolio";

function ToolCard({ tool, isActive }: { tool: ToolItem; isActive?: boolean }) {
  return (
    <TiltCard maxAngle={6} className="h-full">
      <div
        className={cn(
          "relative h-full min-h-[148px] p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 transition-all duration-500 flex flex-col justify-between group overflow-hidden",
          isActive
            ? "bg-white/[0.06] border-[#D7E2EA]/35 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(215,226,234,0.08)]"
            : "hover:bg-white/[0.05] hover:border-[#D7E2EA]/30 hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
        )}
      >
        {/* Subtle institutional ambient light */}
        <div
          className={cn(
            "absolute -bottom-10 -left-10 w-44 h-44 rounded-full transition-opacity duration-700 pointer-events-none blur-2xl",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className={cn(
            "absolute -top-10 -right-10 w-44 h-44 rounded-full transition-opacity duration-700 pointer-events-none blur-2xl",
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Top: Tool Title & Frosted Glass Pill Badge */}
          <div className="flex items-center justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "transition-all duration-500 transform",
                  isActive
                    ? "text-white scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                    : "text-[#D7E2EA]/60 group-hover:text-white group-hover:scale-110"
                )}
              >
                <Sparkle size={16} weight="fill" />
              </span>
              <h4
                className={cn(
                  "text-lg sm:text-xl font-bold tracking-wide transition-colors duration-500 font-kanit",
                  isActive ? "text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.35)]" : "text-[#D7E2EA] group-hover:text-white"
                )}
              >
                {tool.name}
              </h4>
            </div>

            <span
              className={cn(
                "text-xs font-mono px-3 py-1 rounded-full border transition-all duration-500",
                isActive
                  ? "bg-white/[0.12] border-white/25 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.04] group-hover:bg-white/[0.08] border-white/10 group-hover:border-[#D7E2EA]/25 text-[#D7E2EA]/70 group-hover:text-white"
              )}
            >
              {tool.proficiency}
            </span>
          </div>

          {/* Bottom: Description */}
          <p
            className={cn(
              "text-xs sm:text-sm font-light leading-relaxed transition-colors duration-500",
              isActive ? "text-white/95" : "text-[#D7E2EA]/75 group-hover:text-[#D7E2EA]/90"
            )}
          >
            {tool.desc}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}

export default function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { portfolio } = usePortfolio();
  const allTools = portfolio.tools;

  const [marketsLimit, setMarketsLimit] = useState(6);
  const [systemsLimit, setSystemsLimit] = useState(6);

  // Group into Financial Markets vs Systems & Platforms
  const marketsTools = allTools.filter(
    (t) => t.category === "Design & Prototyping"
  );
  const systemsTools = allTools.filter(
    (t) => t.category === "Engineering & Workflow"
  );

  const visibleMarketsTools = marketsTools.slice(0, marketsLimit);
  const visibleSystemsTools = systemsTools.slice(0, systemsLimit);

  const { containerRef: marketsGridRef, activeIndex: activeMarketsIndex } =
    useCenterSpotlight(visibleMarketsTools.length);
  const { containerRef: systemsGridRef, activeIndex: activeSystemsIndex } =
    useCenterSpotlight(visibleSystemsTools.length);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#070707] font-kanit text-[#D7E2EA] overflow-hidden"
      aria-label="Financial Tools and Operational Competencies"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.03] blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(215,226,234,0.06) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Title (No eyebrow text) */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <FadeIn delay={0} y={30}>
            <TextEffect
              as="h2"
              per="char"
              preset="fade"
              className="hero-heading font-display-hero font-extrabold uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none"
            >
              Skills &amp; Systems
            </TextEffect>
          </FadeIn>
          <FadeIn delay={0.1} y={35}>
            <p className="text-[#D7E2EA]/70 text-sm sm:text-base max-w-xl mt-4 font-light leading-relaxed">
              Operational expertise across institutional settlement applications, risk control architectures, and high-frequency post-trade reconciliation.
            </p>
          </FadeIn>
        </div>

        {/* Category 1: Systems & Technical Tools */}
        {systemsTools.length > 0 && (
          <div className="mb-14 sm:mb-16">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <Cpu size={20} weight="light" className="text-white" />
              <h3 className="text-lg sm:text-xl font-display-hero font-bold uppercase tracking-wider text-white">
                Systems &amp; Technical Platforms
              </h3>
            </div>

            <div
              ref={systemsGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6"
            >
              {visibleSystemsTools.map((tool, index) => (
                <FadeIn key={tool.id || tool.name} delay={0.03 * (index % 4)} y={20}>
                  <ToolCard
                    tool={tool}
                    isActive={activeSystemsIndex === index}
                  />
                </FadeIn>
              ))}
            </div>

            {systemsTools.length > 6 && (
              <div className="flex justify-center mt-8">
                {systemsLimit < systemsTools.length ? (
                  <button
                    type="button"
                    onClick={() => setSystemsLimit((prev) => prev + 6)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase text-[#D7E2EA] bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/10 hover:border-white/40 transition-all cursor-pointer group shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95"
                  >
                    <span>Load More</span>
                    <CaretDown size={14} weight="bold" className="text-white group-hover:translate-y-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSystemsLimit(6)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider text-[#D7E2EA]/60 hover:text-[#D7E2EA] bg-transparent border border-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
                  >
                    <span>Show Less</span>
                    <CaretUp size={14} weight="bold" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Category 2: Financial Markets & Operations */}
        {marketsTools.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <ChartLineUp size={20} weight="light" className="text-white" />
              <h3 className="text-lg sm:text-xl font-display-hero font-bold uppercase tracking-wider text-white">
                Financial Instruments &amp; Operational Governance
              </h3>
            </div>

            <div
              ref={marketsGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6"
            >
              {visibleMarketsTools.map((tool, index) => (
                <FadeIn key={tool.id || tool.name} delay={0.04 * (index % 4)} y={20}>
                  <ToolCard
                    tool={tool}
                    isActive={activeMarketsIndex === index}
                  />
                </FadeIn>
              ))}
            </div>

            {marketsTools.length > 6 && (
              <div className="flex justify-center mt-8">
                {marketsLimit < marketsTools.length ? (
                  <button
                    type="button"
                    onClick={() => setMarketsLimit((prev) => prev + 6)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase text-[#D7E2EA] bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/10 hover:border-[#D7E2EA]/30 transition-all cursor-pointer group shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95"
                  >
                    <span>Load More</span>
                    <CaretDown size={14} weight="bold" className="text-[#D7E2EA] group-hover:translate-y-0.5 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMarketsLimit(6)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider text-[#D7E2EA]/60 hover:text-[#D7E2EA] bg-transparent border border-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
                  >
                    <span>Show Less</span>
                    <CaretUp size={14} weight="bold" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
