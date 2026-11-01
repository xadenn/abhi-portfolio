"use client";

import React from "react";

interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function ContactButton({
  label = "Contact Me",
  href = "#contact",
  onClick,
  className = "",
}: ContactButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full font-kanit font-semibold uppercase tracking-widest text-black bg-white hover:bg-[#F2ECE4] shadow-[0_4px_20px_rgba(255,255,255,0.18)] transition-all duration-300 hover:scale-105 active:scale-95 px-8 py-3.5 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base cursor-pointer min-h-[44px] ${className}`}
      aria-label={label}
    >
      <span>{label}</span>
    </a>
  );
}

