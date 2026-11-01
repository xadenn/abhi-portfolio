"use client";

import React, { useRef } from "react";
import FadeIn from "./FadeIn";
import { usePortfolio } from "@/context/PortfolioContext";
import { TextEffect } from "@/components/ui/text-effect";
import { cn } from "@/lib/utils";
import { Achievement } from "@/types/portfolio";

function AchievementCard({ item }: { item: Achievement }) {
  return (
    <div className="relative h-full p-7 sm:p-9 rounded-2xl border border-white/[0.08] bg-[#0d0d0d] flex flex-col justify-between cursor-default overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
      {/* Subtle monochrome radial background glow */}
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-60 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Metric with refined white glow */}
        <div className="mb-4">
          <div className="text-5xl sm:text-6xl md:text-7xl font-display-hero font-black tracking-tight leading-none select-none inline-block text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.35)]">
            {item.metric}
          </div>
        </div>

        {/* Company Name */}
        <h3 className="font-display-hero font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
          {item.organization}
        </h3>

        {/* Milestone / Title */}
        <p className="font-mono text-xs uppercase tracking-wider text-white/70 font-semibold mb-3">
          {item.title}
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#D7E2EA]/80 font-light leading-relaxed font-sans">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { portfolio } = usePortfolio();
  const achievements = portfolio.achievements;

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#070707] font-kanit text-[#D7E2EA] overflow-hidden"
      aria-label="Performance"
    >
      {/* Background ambient lighting - monochrome specular wash */}
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full opacity-[0.05] blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Header (No eyebrow text) */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <FadeIn delay={0} y={30}>
            <TextEffect
              as="h2"
              per="char"
              preset="fade"
              className="hero-heading font-display-hero font-extrabold uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none"
            >
              Performance
            </TextEffect>
          </FadeIn>
          <FadeIn delay={0.1} y={35}>
            <p className="text-[#D7E2EA]/85 text-sm sm:text-base max-w-xl mt-4 font-light leading-relaxed font-sans">
              Quantified operational impact across institutional trade settlement, custody management, and client service at leading financial institutions.
            </p>
          </FadeIn>
        </div>

        {/* Achievements: Editorial Grid with Center Spotlight & Tactile Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 border-t border-white/[0.08] pt-12 sm:pt-16">
          {achievements.map((item, index) => (
            <FadeIn key={item.id} delay={0.08 * index} y={25}>
              <AchievementCard item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
