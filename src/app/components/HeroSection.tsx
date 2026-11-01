"use client";

import { useEffect, useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { TiltedGridHero, TiltedGridImage } from "@/components/ui/tilted-grid-hero";

const HERO_IMAGES: TiltedGridImage[] = [
  {
    src: "/images/abhi/abhi-01.jpeg",
    alt: "Abhijith Sunil - Precision at Scale",
  },
  {
    src: "/images/abhi/abhi-02.jpeg",
    alt: "Institutional Financial Operations",
  },
  {
    src: "/images/abhi/abhi-03.jpeg",
    alt: "Trade Settlement Specialist",
  },
  {
    src: "/images/abhi/abhi-04.jpeg",
    alt: "Abhijith Sunil Portrait",
  },
  {
    src: "/images/abhi/abhi-05.jpeg",
    alt: "Custody Management & Operations",
  },
  {
    src: "/images/abhi/abhi-07.jpeg",
    alt: "Financial Market Professional",
  },
  {
    src: "/images/abhi/abhi-08.jpeg",
    alt: "Abhijith Sunil",
  },
  {
    src: "/images/abhi/abhi-10.jpeg",
    alt: "Trade Affirmation & Settlements",
  },
  {
    src: "/images/abhi/abhi-11.jpeg",
    alt: "Abhijith Sunil Portfolio",
  },
  {
    src: "/images/abhi/abhi-12.jpeg",
    alt: "Institutional Client Support",
  },
  {
    src: "/images/abhi/abhi-13.jpeg",
    alt: "Exception Resolution Workflows",
  },
  {
    src: "/images/abhi/abhi-15.jpeg",
    alt: "High-Volume Trade Settlement",
  },
  {
    src: "/images/abhi/abhi-16.jpeg",
    alt: "State Street Corporation & Infosys BPM",
  },
  {
    src: "/images/abhi/abhi-17.jpeg",
    alt: "Financial Risk & STP Excellence",
  },
  {
    src: "/images/abhi/abhi-18.jpeg",
    alt: "Abhijith Sunil Operations Specialist",
  },
  {
    src: "/images/abhi/abhi-19.jpeg",
    alt: "Global Custody & Markets",
  },
];

export default function HeroSection() {
  const { portfolio } = usePortfolio();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#070707] font-kanit text-cream select-none"
      aria-label="Hero"
    >
      <TiltedGridHero
        images={HERO_IMAGES}
        className="w-full h-full bg-[#070707]"
        speed={4.2}
        tileHeight={isMobile ? 24 : 20}
        aspectRatio={16 / 9}
        gap={6}
        axis={isMobile ? 54 : 58}
        curve={80}
        fade={14}
      >
        {/* Soft edge blend overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/30"
          aria-hidden="true"
        />

        {/* ─────────────────────────────────────────────────────────────
            BALANCED EDITORIAL PLACEMENT (MOBILE & DESKTOP CALIBRATED)
            - Desktop: Headline raised up & cylinder lowered so they never touch
            - Mobile: Headline sits slightly lower with balanced breathing room
            - Bottom: 2-line caption strictly below images
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pt-22 sm:pt-14 md:pt-16 lg:pt-18 pb-5 sm:pb-8 md:pb-10 px-4 sm:px-6 text-center pointer-events-none select-none">
          {/* 1. TOP: Eyebrow + Ultra-Heavy Headline */}
          <div className="pointer-events-auto">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#D7E2EA]/60 block mb-1.5 sm:mb-2.5">
              Institutional Operations
            </span>
            <h1 className="text-balance text-2xl sm:text-4xl md:text-5xl lg:text-[4.25rem] font-display-hero text-white leading-[0.98] sm:leading-[0.95] tracking-tight">
              ABHIJITH SUNIL,
              <br />
              PRECISION AT SCALE.
            </h1>
          </div>

          {/* 2. BOTTOM: Clean 2-Line Caption */}
          <div className="max-w-[280px] sm:max-w-md mx-auto pointer-events-auto pb-1 sm:pb-3">
            <p className="text-balance text-[11px] sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed font-sans text-center">
              Trade settlement, custody operations, and proactive exception resolution across US and global markets.
            </p>
          </div>
        </div>
      </TiltedGridHero>
    </section>
  );
}
