"use client";

import React, { useRef } from "react";
import FadeIn from "./FadeIn";
import { usePortfolio } from "@/context/PortfolioContext";
import { TextEffect } from "@/components/ui/text-effect";
import Timeline, { TimelineItem } from "@/components/ui/timeline-01-utils/timeline";
import { ArrowUpRight, DownloadSimple } from "@phosphor-icons/react";

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { portfolio } = usePortfolio();
  const journeyMilestones = portfolio.journey;
  const { profile } = portfolio;

  // Curated images from /images/abhi for each career milestone
  // 1. First image: WhatsApp Image 2026-10-31 at 9.35.01 PM
  // 2. Second image: proper (kept as abhi-03)
  // 3. Third image: WhatsApp Image 2026-10-31 at 9.34.57 PM
  const milestoneImages = [
    "/images/abhi/abhi-02.jpeg",
    "/images/abhi/abhi-03.jpeg",
    "/images/abhi/abhi-01.jpeg",
  ];

  const timelineItems: TimelineItem[] = journeyMilestones.map((item, index) => ({
    title: item.company,
    role: item.role,
    date: item.period,
    description: item.summary,
    highlights: item.highlights,
    image: milestoneImages[index % milestoneImages.length],
    company: item.company,
  }));

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#070707] font-kanit text-[#D7E2EA] overflow-hidden"
      aria-label="Professional Experience and Career History"
    >
      {/* Background ambient specular lighting - Pure Monochrome */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/4 w-[700px] h-[500px] rounded-full opacity-[0.05] blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[600px] h-[400px] rounded-full opacity-[0.025] blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(215,226,234,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <FadeIn delay={0} y={30}>
            <TextEffect
              as="h2"
              per="char"
              preset="fade"
              className="hero-heading font-display-hero font-extrabold uppercase text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none"
            >
              Experience
            </TextEffect>
          </FadeIn>
          <FadeIn delay={0.1} y={35}>
            <p className="text-[#D7E2EA]/85 text-sm sm:text-base max-w-xl mt-4 font-light leading-relaxed font-sans">
              Chronological milestones across high-volume trade settlement, custody management, exception resolution, and institutional client service.
            </p>
          </FadeIn>
        </div>

        {/* ── RICH LUXURY MONOCHROME TIMELINE WITH SCROLL-FOLLOWING BEAM ── */}
        <Timeline items={timelineItems} />

        {/* Minimal Bottom Free-Floating Text Link (No Card Box) */}
        <div className="mt-14 sm:mt-16 flex items-center justify-center">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer underline underline-offset-8 decoration-white/20 hover:decoration-white"
          >
            <DownloadSimple size={14} weight="bold" />
            <span>Download Verified Resume PDF</span>
            <ArrowUpRight
              size={12}
              weight="bold"
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
