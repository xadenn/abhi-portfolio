"use client";

import { PortfolioScrollGrid, PortfolioScrollGridImage } from "@/components/ui/portfolio-scroll-grid";

const GRID_IMAGES: PortfolioScrollGridImage[] = [
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
    alt: "Abhijith Sunil",
  },
  {
    src: "/images/abhi/abhi-05.jpeg",
    alt: "Custody Management & Operations",
  },
  {
    src: "/images/abhi/abhi-06.jpeg",
    alt: "Operational Excellence",
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
    src: "/images/abhi/abhi-09.jpeg",
    alt: "Risk Management & STP",
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
    src: "/images/abhi/abhi-14.jpeg",
    alt: "Custody Operations Specialist",
  },
  {
    src: "/images/abhi/abhi-15.jpeg",
    alt: "High-Volume Trade Settlement",
  },
  {
    src: "/images/abhi/abhi-16.jpeg",
    alt: "State Street Corporation Operations",
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

export default function ScrollGridSection() {
  return (
    <section className="relative w-full bg-[#070707] overflow-clip" aria-label="Get In Touch">
      <PortfolioScrollGrid
        title="GET IN TOUCH"
        images={GRID_IMAGES}
        rows={7}
        className="bg-[#070707]"
      />
    </section>
  );
}
