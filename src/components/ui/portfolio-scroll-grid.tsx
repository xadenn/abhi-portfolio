"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── types ───────────────────────────────────────────────────── */

export interface PortfolioScrollGridImage {
  src: string;
  alt: string;
}

export interface PortfolioScrollGridProps {
  /** Name or phrase pinned to the centre of the viewport behind/between scrolling photos */
  title: React.ReactNode;
  /** Photos recycled to fill the grid */
  images: PortfolioScrollGridImage[];
  /** Grid rows — sets how long the section scrolls. Default 7 */
  rows?: number;
  className?: string;
}

// Fallback image from abhi img
const FALLBACK_IMAGE = "/images/abhi/abhi-01.jpeg";

/* ── individual grid card (Clean, Spacious & Multi-Depth 3D Layering) ── */

function GridCard({
  image,
  boxWidth,
  boxHeight,
  rowHeight,
  isOverText,
  yOffset,
}: {
  image: PortfolioScrollGridImage;
  boxWidth: number;
  boxHeight: number;
  rowHeight: number;
  isOverText: boolean;
  yOffset?: number;
}) {
  const [imgSrc, setImgSrc] = React.useState(image.src);

  // Update image source if prop changes
  React.useEffect(() => {
    setImgSrc(image.src);
  }, [image.src]);

  const handleClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative flex items-center justify-center pointer-events-auto"
      style={{
        height: `calc(var(--u) * ${rowHeight})`,
        // Depth layering relative to pinned title (z-20):
        // isOverText = true  -> z-index 30 (scrolls OVER / in front of the text)
        // isOverText = false -> z-index 10 (scrolls UNDER / behind the text)
        zIndex: isOverText ? 30 : 10,
        transform: yOffset ? `translateY(calc(var(--u) * ${yOffset}))` : undefined,
      }}
    >
      <div
        onClick={handleClick}
        className="relative overflow-hidden rounded-2xl cursor-pointer select-none border border-white/10 bg-[#0e0e0e] shadow-[0_16px_40px_rgba(0,0,0,0.85)]"
        style={{
          width: `calc(var(--u) * ${boxWidth})`,
          height: `calc(var(--u) * ${boxHeight})`,
        }}
        title="Get in touch"
      >
        <img
          src={imgSrc}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="h-full w-full object-cover select-none"
        />
      </div>
    </div>
  );
}

/* ── component ───────────────────────────────────────────────── */

export function PortfolioScrollGrid({
  title,
  images,
  rows = 7,
  className,
}: PortfolioScrollGridProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTitleClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Spacious, luxury proportions with generous negative space between images:
  // Mobile: 3 columns, 6 rows, airy spacing
  // Desktop: 5 columns, 7 rows, refined airy gallery spacing
  const cols = isMobile ? 3 : 5;
  const colPitch = isMobile ? 36 : 28;
  const boxW = isMobile ? 25 : 19;
  const boxH = isMobile ? 22 : 19.5;
  const rowPitch = isMobile ? 38 : 38;
  const activeRows = isMobile ? 6 : rows;

  return (
    <section
      className={cn("relative w-full overflow-clip bg-[#070707]", className)}
      style={
        {
          containerType: "inline-size",
          "--u": isMobile ? "clamp(3.8px, 1.05cqw, 7px)" : "clamp(4.2px, 1cqw, 14.5px)",
        } as React.CSSProperties
      }
    >
      {/* ── TOP EDGE FADE VIGNETTE (z-40) ───────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-44 z-40 bg-gradient-to-b from-[#070707] via-[#070707]/85 to-transparent" />

      {/* ── PINNED TITLE LAYER (z-20: Floating in the middle depth plane) ──
          Photos with z-10 scroll UNDER the text (the letters sit on top).
          Photos with z-30 scroll OVER the text (the photos pass in front). */}
      <div className="sticky top-0 z-20 flex h-screen w-full items-center justify-center px-4 pointer-events-none">
        <button
          type="button"
          onClick={handleTitleClick}
          className="pointer-events-auto cursor-pointer focus:outline-none"
          aria-label="Contact me"
        >
          <h2
            className="text-center font-display-hero font-extrabold uppercase leading-none tracking-tight text-white select-none drop-shadow-[0_12px_45px_rgba(0,0,0,0.98)]"
            style={{ fontSize: isMobile ? "clamp(2rem, 9vw, 3.25rem)" : "calc(var(--u) * 5.63)" }}
          >
            {title}
          </h2>
        </button>
      </div>

      {/* ── PHOTOS SCROLLING GRID (Pre-filled above viewport: Zero empty space) ──
          Columns do NOT create a stacking context so individual cards weave
          both in front of (z-30) and underneath (z-10) the text! */}
      <div
        className="relative flex justify-center pb-24 sm:pb-36"
        style={{ marginTop: `calc(-1 * var(--u) * ${rowPitch * 1.5})` }}
      >
        {Array.from({ length: cols }, (_, c) => {
          // Odd columns are staggered vertically by half a row for continuous diagonal flow
          const isOddCol = c % 2 === 1;
          const yOffset = isOddCol ? rowPitch / 2 : undefined;

          return (
            <div
              key={c}
              className="shrink-0"
              style={{
                width: `calc(var(--u) * ${colPitch})`,
              }}
            >
              {Array.from({ length: activeRows }, (_, r) => {
                const image =
                  images[(r + c * 3) % images.length];

                // Alternating depth per card:
                // Even cards (r + c) % 2 === 0 -> z-10 (scrolls UNDER the text!)
                // Odd cards (r + c) % 2 === 1  -> z-30 (scrolls OVER the text!)
                // In Column 1 on mobile: half the cards pass UNDER, half pass OVER!
                const isOverText = (r + c) % 2 === 1;

                return (
                  <GridCard
                    key={r}
                    image={image}
                    boxWidth={boxW}
                    boxHeight={boxH}
                    rowHeight={rowPitch}
                    isOverText={isOverText}
                    yOffset={yOffset}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM EDGE FADE VIGNETTE (z-40) ────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-44 z-40 bg-gradient-to-t from-[#070707] via-[#070707]/85 to-transparent" />
    </section>
  );
}
