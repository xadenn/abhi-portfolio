"use client";

import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useLenis } from "./SmoothScrollProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const { portfolio } = usePortfolio();
  const { profile } = portfolio;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  const brandName = profile.name.split(" ")[0]?.toUpperCase() || "ABHIJITH";

  // Detect scroll to give fixed header subtle backdrop contrast
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open & ESC to close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const navLinks = [
    { num: "01", label: "Profile", href: "#about" },
    { num: "02", label: "Expertise", href: "#services" },
    { num: "03", label: "Experience", href: "#journey" },
    { num: "04", label: "Performance", href: "#achievements" },
    { num: "05", label: "Skills", href: "#tools" },
    { num: "06", label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      if (href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }, 280);
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* ── FIXED TOP BAR (z-50) - PURE FLOATING TEXTS, ZERO GLASS/CARDS ────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300 select-none bg-transparent py-5 sm:py-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between pointer-events-auto">
          {/* Brand Logo / Name - Floating typography */}
          <button
            type="button"
            onClick={() => handleLinkClick("#hero")}
            className="group flex items-center gap-2 cursor-pointer focus:outline-none transition-opacity"
            aria-label="Back to top"
          >
            <span className="font-display-hero font-extrabold text-base sm:text-lg tracking-[0.22em] text-white group-hover:text-white/80 transition-colors uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {brandName}
            </span>
          </button>

          {/* Minimal Floating Menu Button - Pure text & icon, zero card/glass */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="group inline-flex items-center gap-3 cursor-pointer focus:outline-none p-1.5 transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/80 group-hover:text-white transition-colors">
              {isOpen ? "Close" : "Menu"}
            </span>

            {/* Clean Animated 2-Line Hamburger / Cross */}
            <div className="relative w-4 h-3 flex flex-col justify-between items-center">
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ease-out origin-center ${
                  isOpen ? "rotate-45 translate-y-[5.25px]" : ""
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-white transition-all duration-300 ease-out origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[5.25px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* ── MINIMAL LUXURY FULLSCREEN MENU OVERLAY (z-40) ────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#070707]/98 backdrop-blur-3xl flex flex-col justify-between pt-16 sm:pt-20 pb-5 sm:pb-7 px-6 sm:px-12 md:px-16 h-[100dvh] max-h-[100dvh] overflow-hidden"
          >
            {/* Top Subtitle */}
            <div className="max-w-6xl w-full mx-auto flex items-center justify-between border-b border-white/[0.08] pb-2.5 sm:pb-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D7E2EA]/50">
                Navigation
              </span>
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/70">
                Institutional Operations
              </span>
            </div>

            {/* Central Vertical Stack of Editorial Links (Guaranteed Single Page Fit) */}
            <div className="max-w-6xl w-full mx-auto my-auto py-2 sm:py-4 flex flex-col gap-1.5 sm:gap-2 md:gap-2.5">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => handleLinkClick(link.href)}
                    className="group flex items-baseline gap-3 sm:gap-5 text-left cursor-pointer focus:outline-none w-fit"
                  >
                    <span className="font-mono text-xs sm:text-sm text-white/40 group-hover:text-white tracking-widest font-normal transition-colors">
                      [{link.num}]
                    </span>
                    <span className="font-display-hero font-extrabold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] leading-[1.05] text-white/50 group-hover:text-white transition-all duration-300 tracking-tight group-hover:translate-x-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                      {link.label}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Minimal Luxury Footer */}
            <div className="max-w-6xl w-full mx-auto pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-white/50">
              <div>
                <p className="uppercase tracking-wider text-white/80">
                  {profile.name} · {profile.role}
                </p>
                <p className="text-white/40 tracking-wider mt-0.5">
                  {profile.location} · Infosys BPM & State Street Corporation
                </p>
              </div>

              <div className="flex items-center gap-6 text-white/70">
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors uppercase tracking-wider"
                  >
                    LinkedIn ↗
                  </a>
                )}
                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors uppercase tracking-wider"
                  >
                    Resume PDF ↗
                  </a>
                )}
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-white transition-colors uppercase tracking-wider"
                >
                  Email ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
