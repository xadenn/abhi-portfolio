"use client";

import React from "react";
import FadeIn from "./FadeIn";
import { usePortfolio } from "@/context/PortfolioContext";
import { TextEffect } from "@/components/ui/text-effect";
import { useCenterSpotlight } from "@/lib/use-center-spotlight";
import { cn } from "@/lib/utils";

export default function ServicesSection() {
  const { portfolio } = usePortfolio();
  const services = portfolio.services;
  const { containerRef, activeIndex } = useCenterSpotlight(services.length);

  return (
    <section
      id="services"
      className="relative w-full bg-[#070707] text-[#D7E2EA] font-kanit px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 select-none z-10"
      aria-label="Services"
    >
      {/* Subtle edge blend gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070707] via-[#070707]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070707] via-[#070707]/80 to-transparent z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Heading (No eyebrow text) */}
        <FadeIn delay={0} y={30} duration={0.8} className="text-center mb-16 sm:mb-20 md:mb-28">
          <TextEffect
            as="h2"
            per="char"
            preset="fade"
            className="hero-heading font-display-hero font-extrabold uppercase text-[clamp(3rem,12vw,160px)] leading-none tracking-tight"
          >
            Expertise
          </TextEffect>
        </FadeIn>

        {/* 5 Service Items List: Pure Free Floating Editorial Rows (No Cards, Subtle Glow) */}
        <div ref={containerRef} className="border-t border-white/[0.08]">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={service.number}
                className="group relative border-b border-white/[0.08] py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 transition-colors duration-400 px-2 sm:px-4 cursor-default"
              >
                {/* Left: Giant Number with Subtle Refined Glow (Not Too Much) */}
                <div className="flex-shrink-0 relative">
                  <span
                    className={cn(
                      "font-display-hero font-black text-[clamp(3rem,10vw,140px)] leading-none select-none tracking-tighter transition-all duration-300 inline-block transform-gpu will-change-transform",
                      isActive
                        ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.22)]"
                        : "text-[#D7E2EA]/20 group-hover:text-white/85 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.18)]"
                    )}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Right: Stacked Name + Description */}
                <div className="flex flex-col gap-2.5 max-w-2xl md:text-left">
                  <h3
                    className={cn(
                      "font-display-hero font-bold uppercase text-[clamp(1.15rem,2.2vw,2.1rem)] tracking-tight transition-colors duration-300",
                      isActive ? "text-white" : "text-[#D7E2EA] group-hover:text-white"
                    )}
                  >
                    {service.name}
                  </h3>
                  <p
                    className={cn(
                      "font-light leading-relaxed text-[clamp(0.85rem,1.6vw,1.25rem)] transition-colors duration-300 font-sans",
                      isActive ? "text-white/95" : "text-[#D7E2EA]/75 group-hover:text-[#D7E2EA]/90"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
