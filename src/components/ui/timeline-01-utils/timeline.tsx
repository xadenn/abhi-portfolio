"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TimelineItem {
  title: string;
  description: string;
  date: string;
  image?: string;
  company?: string;
  role?: string;
  highlights?: string[];
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

function TextColumn({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <div className="w-full text-left">
      {/* Date & Period Tag: Pure floating typography (No card box) */}
      <div className="inline-flex items-center gap-2.5 mb-3 select-none">
        <span className="font-mono text-xs uppercase tracking-[0.28em] font-medium text-white/85">
          {item.date}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-white/40">
          [{String(index + 1).padStart(2, "0")}]
        </span>
      </div>

      {/* Title & Role */}
      <h3 className="font-display-hero font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight">
        {item.title}
      </h3>
      {item.role && (
        <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white/60 mt-1.5 mb-2 font-medium">
          {item.role}
        </p>
      )}

      {/* Description */}
      <p className="font-sans text-sm sm:text-base text-[#D7E2EA]/85 font-light leading-relaxed mt-3">
        {item.description}
      </p>

      {/* Bullet Highlights */}
      {item.highlights && item.highlights.length > 0 && (
        <ul className="mt-5 space-y-2.5 text-left">
          {item.highlights.map((h, hIdx) => (
            <li
              key={hIdx}
              className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ImageColumn({ item }: { item: TimelineItem }) {
  if (!item.image) return null;
  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover object-center"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070707]/70 via-transparent to-transparent" />
    </div>
  );
}

export default function Timeline({ items, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Butter-smooth hardware-accelerated scroll tracking (Zero React re-renders)
  useEffect(() => {
    const container = containerRef.current;
    const beam = beamRef.current;
    if (!container || !beam) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      end: "bottom 80%",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Direct DOM update: buttery smooth 60fps/120fps with zero React state re-renders
        beam.style.height = `${Math.min(100, Math.max(0, p * 100))}%`;

        // Milestone nodes illuminate smoothly as the beam touches them
        nodeRefs.current.forEach((node, idx) => {
          if (!node) return;
          const targetP = (idx + 0.35) / Math.max(1, items.length);
          if (p >= targetP) {
            node.classList.add("node-active");
          } else {
            node.classList.remove("node-active");
          }
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [items.length]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full py-10 md:py-20 select-none", className)}
    >
      {/* ── BASE TIMELINE TRACK (Left on Mobile, Center on Desktop) ─────── */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-white/[0.08]" />

      {/* ── SCROLL-FOLLOWING ACTIVE BEAM (Follows line without touching text) ─ */}
      <div
        ref={beamRef}
        className="absolute left-6 md:left-1/2 top-4 -translate-x-1/2 w-[2px] pointer-events-none will-change-[height]"
        style={{
          height: "0%",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.7) 60%, #FFFFFF 100%)",
          boxShadow:
            "0 0 16px rgba(255, 255, 255, 0.7), 0 0 32px rgba(255, 255, 255, 0.35)",
        }}
      >
        {/* Glowing follower bead at the tip of the beam */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-white flex items-center justify-center pointer-events-none"
          style={{
            boxShadow:
              "0 0 16px rgba(255, 255, 255, 0.95), 0 0 32px rgba(255, 255, 255, 0.6)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#070707]" />
        </div>
      </div>

      {/* ── MILESTONE ROWS ──────────────────────────────────────────────── */}
      <div className="space-y-16 md:space-y-28">
        {items.map((item, index) => {
          // Alternating side-by-side layout on desktop:
          // Milestone 1: Left = Image, Right = Text
          // Milestone 2: Left = Text, Right = Image
          // Milestone 3: Left = Image, Right = Text
          const isImageLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-14"
            >
              {/* ── DESKTOP LEFT COLUMN (50% width) ── */}
              <div className="hidden md:block md:w-[calc(50%-3.5rem)] text-left">
                {isImageLeft ? (
                  <ImageColumn item={item} />
                ) : (
                  <TextColumn item={item} index={index} />
                )}
              </div>

              {/* ── TIMELINE NODE (Left on Mobile, Center on Desktop) ── */}
              <div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center z-20 pointer-events-none"
                style={{ background: "#070707" }}
              >
                <div
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className="timeline-node w-5 h-5 rounded-full flex items-center justify-center border-2 border-white/20 bg-[#070707] transition-all duration-500 [&.node-active]:bg-white [&.node-active]:border-white [&.node-active]:shadow-[0_0_16px_rgba(255,255,255,0.95),0_0_32px_rgba(255,255,255,0.5)] [&.node-active]:scale-110"
                >
                  <div className="timeline-dot w-1.5 h-1.5 rounded-full bg-white/40 transition-colors duration-500 [.node-active_&]:bg-[#070707]" />
                </div>
              </div>

              {/* ── DESKTOP RIGHT COLUMN (50% width) ── */}
              <div className="hidden md:block md:w-[calc(50%-3.5rem)] text-left">
                {isImageLeft ? (
                  <TextColumn item={item} index={index} />
                ) : (
                  <ImageColumn item={item} />
                )}
              </div>

              {/* ── MOBILE VIEW: IMAGE FIRST, THEN TEXT (Clean & Elevated Hierarchy) ── */}
              <div className="block md:hidden w-full pl-14 pr-4 space-y-4 text-left">
                {/* Floating Date (No card) */}
                <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.28em] text-white/85 select-none">
                  <span>{item.date}</span>
                  <span className="text-white/40">[{String(index + 1).padStart(2, "0")}]</span>
                </div>

                {/* Image FIRST */}
                <ImageColumn item={item} />

                {/* Title & Role */}
                <div className="pt-1">
                  <h3 className="font-display-hero font-extrabold text-2xl text-white uppercase tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  {item.role && (
                    <p className="font-mono text-xs uppercase tracking-wider text-white/60 mt-1 font-medium">
                      {item.role}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-[#D7E2EA]/85 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2.5 text-left">
                    {item.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 font-sans text-xs text-[#D7E2EA]/80 font-light leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
