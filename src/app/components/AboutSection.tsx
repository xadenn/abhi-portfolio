"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactButton from "./ContactButton";
import { usePortfolio } from "@/context/PortfolioContext";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { portfolio } = usePortfolio();
  const aboutText = portfolio.profile.aboutText;
  const pinTrackRef = useRef<HTMLDivElement>(null);
  const pinnedViewportRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pin section on BOTH mobile and desktop until character-by-character scrub completes 100%
  useEffect(() => {
    const pinTrack = pinTrackRef.current;
    const pinnedViewport = pinnedViewportRef.current;
    if (!pinTrack || !pinnedViewport) return;

    const total = charRefs.current.length;

    const st = ScrollTrigger.create({
      trigger: pinTrack,
      pin: pinnedViewport,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      anticipatePin: 1,
      fastScrollEnd: true,
      preventOverlaps: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Text animation finishes completely at 75% of pinned scroll,
        // so the user reads the 100% revealed text before the pin unlocks.
        const leadIn = 0.04;
        const revealEnd = 0.75;
        const animT = Math.max(0, Math.min(1, (p - leadIn) / (revealEnd - leadIn)));

        for (let i = 0; i < total; i++) {
          const el = charRefs.current[i];
          if (!el) continue;
          const charStart = i / total;
          const charEnd = Math.min(1, charStart + 0.03);
          if (animT <= charStart) {
            el.style.opacity = "0.18";
          } else if (animT >= charEnd) {
            el.style.opacity = "1";
          } else {
            const localT = (animT - charStart) / (charEnd - charStart);
            el.style.opacity = String(0.18 + 0.82 * localT);
          }
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [aboutText, isMobile]);

  const characters = aboutText.split("");

  return (
    <section
      id="about"
      ref={pinTrackRef}
      className="relative w-full bg-[#070707]"
      style={{ height: isMobile ? "220vh" : "260vh" }}
      aria-label="About Abhijith Sunil"
    >
      {/* Fullscreen Stage: Pinned on both mobile and desktop so scrub completes before section scrolls */}
      <div
        ref={pinnedViewportRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 bg-[#070707] font-kanit text-[#D7E2EA] select-none"
      >
        {/* Subtle radial lighting for deep editorial contrast */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.04] blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* ─────────────────────────────────────────────────────────────
            EXPANSIVE CENTER COLUMN: OPTICALLY CENTERED ON BOTH MOBILE & DESKTOP
            ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl lg:max-w-5xl w-full mx-auto my-auto px-3 sm:px-6">
          {/* Bold Display Heading - Centered with commanding typographic presence */}
          <h2 className="hero-heading font-display-hero font-extrabold uppercase leading-none tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white select-none">
            Profile
          </h2>

          {/* Dynamic Gap */}
          <div className="h-3 sm:h-5 md:h-7" />

          {/* Character-by-Character Pinned Scroll Animated Text */}
          <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-1 sm:px-4">
            <p className="text-[#D7E2EA] font-normal leading-relaxed text-xs sm:text-base md:text-lg lg:text-xl text-center">
              {characters.map((char, i) => (
                <span
                  key={i}
                  ref={(node) => {
                    charRefs.current[i] = node;
                  }}
                  className="inline transition-opacity duration-75 text-white"
                  style={{ opacity: 0.18 }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Collaborator badges - Monochrome */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-3 sm:mt-5">
            {portfolio.profile.collaborations.map((company) => (
              <span
                key={company}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono tracking-wider text-white/80 bg-white/[0.04] border border-white/15 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                {company}
              </span>
            ))}
          </div>

          {/* Dynamic Gap */}
          <div className="h-3 sm:h-5 md:h-7" />

          {/* Dual Action: Contact Me & See Experience - Monochrome */}
          <div className="relative z-30 flex flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-sm sm:max-w-none px-2">
            <ContactButton
              label="Contact Me"
              href="#contact"
              className="px-5 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold shrink-0 bg-white text-black hover:bg-white/90"
            />
            <a
              href="#journey"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-7 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 transition-all duration-300 shrink-0 whitespace-nowrap"
            >
              <span>See Experience</span>
              <span className="text-white/70">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
