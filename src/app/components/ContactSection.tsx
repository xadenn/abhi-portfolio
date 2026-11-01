"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { animate, stagger } from "animejs";
import { ArrowRight, Copy, Check } from "@phosphor-icons/react";
import { useToast } from "./Toast";
import { usePortfolio } from "@/context/PortfolioContext";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { portfolio } = usePortfolio();
  const { profile } = portfolio;
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailLettersRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentYear, setCurrentYear] = useState("2026");
  const reduce = useReducedMotion();
  const { showToast } = useToast();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  // GSAP Entrance
  useEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(headlineRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.1,
        ease: "expo.out",
      })
        .from(
          emailLettersRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  // Anime.js character wave hover on email address
  const handleEmailMouseEnter = () => {
    if (reduce) return;
    const letters = emailLettersRef.current?.querySelectorAll(".email-char");
    if (letters && letters.length > 0) {
      animate(letters, {
        translateY: [
          { to: -8, duration: 180, ease: "outQuad" },
          { to: 0, duration: 320, ease: "outBounce" },
        ],
        delay: stagger(22),
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    showToast(`${profile.email} copied to clipboard`, "copy");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyOrCallPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    showToast(`${profile.phone} copied to clipboard`, "copy");
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const emailText = profile.email;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-2 sm:pb-3 overflow-hidden bg-[#070707] font-kanit text-[#D7E2EA]"
      aria-label={`Contact ${profile.name}`}
    >
      {/* Seamless top edge blend gradient into #070707 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070707] via-[#070707]/80 to-transparent z-10" />

      {/* Ambient specular wash */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "1000px",
          height: "400px",
          background:
            "radial-gradient(ellipse at center bottom, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── OPTICALLY CENTERED CONTACT HERO ── */}
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 text-center relative z-10 my-auto py-2 sm:py-4">
        <h2
          ref={headlineRef}
          className="hero-heading font-display-hero font-extrabold uppercase text-2xl sm:text-4xl lg:text-5xl max-w-4xl mx-auto mb-3 sm:mb-5 tracking-tight leading-tight"
        >
          {profile.headline}
        </h2>

        {/* Anime.js Interactive Kinetic Email Link */}
        <div className="mb-5 sm:mb-7">
          <a
            ref={emailLettersRef}
            href={`mailto:${profile.email}`}
            onMouseEnter={handleEmailMouseEnter}
            className="inline-flex items-center text-xl sm:text-3xl lg:text-4xl font-extralight text-[#D7E2EA]/90 hover:text-white transition-colors duration-300 font-kanit tracking-tight break-all"
            aria-label={`Send email to ${profile.email}`}
          >
            {emailText.split("").map((char, index) => (
              <span
                key={index}
                className="email-char inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </a>
        </div>

        {/* Action Buttons: Cleanly structured for mobile & desktop (Pure Monochrome) */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full max-w-sm sm:max-w-none mx-auto mb-0"
        >
          {/* 1. Primary CTA: Full width on mobile, sleek inline pill on desktop */}
          <div className="w-full sm:w-auto p-1 rounded-full border border-white/20 bg-white/[0.04] shrink-0">
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary group min-h-[44px] sm:min-h-[46px] w-full sm:w-auto whitespace-nowrap px-6 sm:px-7 py-2.5 sm:py-3 rounded-full inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold shadow-lg bg-white text-black hover:bg-white/90"
              aria-label="Direct email inquiry"
            >
              <span className="whitespace-nowrap">Send Message</span>
              <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                <ArrowRight size={13} weight="bold" />
              </span>
            </a>
          </div>

          {/* 2. Phone Button: Monochrome */}
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            onClick={handleCopyOrCallPhone}
            className="btn-ghost group w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider text-white cursor-pointer min-h-[44px] sm:min-h-[46px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 hover:border-white/50 transition-all bg-white/[0.04] hover:bg-white/[0.08] shrink-0"
            aria-label={`Call or copy ${profile.phone}`}
          >
            {copiedPhone ? (
              <>
                <Check size={14} weight="bold" className="text-white shrink-0" />
                <span className="text-white whitespace-nowrap font-bold">Copied</span>
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 shrink-0 text-white group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="whitespace-nowrap font-semibold tracking-wider text-white">
                  {profile.phone}
                </span>
              </>
            )}
          </a>

          {/* 3. Secondary Utilities: Balanced 2-column grid on mobile (50/50), inline on desktop */}
          <div className="grid grid-cols-2 gap-2.5 w-full sm:w-auto sm:flex sm:items-center sm:gap-2.5 shrink-0">
            {/* Copy Email */}
            <button
              onClick={handleCopyEmail}
              className="btn-ghost w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/85 hover:text-white cursor-pointer min-h-[44px] sm:min-h-[46px] px-3.5 sm:px-5 py-2.5 rounded-full border border-white/15 hover:border-white/40 transition-all bg-white/[0.03] hover:bg-white/[0.08] shrink-0"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={14} weight="bold" className="text-white shrink-0" />
                  <span className="text-white whitespace-nowrap">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} weight="light" className="shrink-0 text-white/70" />
                  <span className="whitespace-nowrap">Copy Email</span>
                </>
              )}
            </button>

            {/* Download CV */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/85 hover:text-white cursor-pointer min-h-[44px] sm:min-h-[46px] px-3.5 sm:px-5 py-2.5 rounded-full border border-white/15 hover:border-white/40 transition-all bg-white/[0.03] hover:bg-white/[0.08] shrink-0"
              aria-label="Download resume PDF"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 shrink-0 text-white/70"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span className="whitespace-nowrap">Download CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── MINIMAL SIGNATURE FOOTER (Compact & Clean) ── */}
      <footer
        className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-2.5 sm:py-3.5 border-t border-white/10 font-hn relative z-10 shrink-0"
        aria-label="Site footer"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-xs text-[#D7E2EA]/60">
          {/* Left: Brand Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="font-semibold text-white tracking-widest uppercase text-xs sm:text-sm">
              {profile.name}
            </span>
            <span className="hidden sm:inline text-white/20">/</span>
            <span className="text-[#D7E2EA]/50 font-light text-[11px] sm:text-xs">
              {profile.role} · {profile.location}
            </span>
          </div>

          {/* Center: Social links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-light text-[11px] sm:text-xs text-[#D7E2EA]/75">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-white transition-colors duration-200"
            >
              Email
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              Resume PDF
            </a>
          </div>

          {/* Right: Studio Location & Copyright */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-2 text-center sm:text-right text-[#D7E2EA]/50 font-light text-[10px] sm:text-xs">
            <span>&copy; {currentYear} {profile.name} · {profile.location}</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
