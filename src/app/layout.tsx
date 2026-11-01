import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PortfolioProvider } from "@/context/PortfolioContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://abhijith-sunil.vercel.app"),
  title: {
    default: "Abhijith Sunil — Trade Settlement & Financial Operations Specialist",
    template: "%s | Abhijith Sunil",
  },
  description:
    "Financial operations professional specializing in trade settlement, custody operations and client service, with hands-on experience supporting institutional clients across US and non-US markets.",
  keywords: [
    "Abhijith Sunil",
    "Trade Settlement",
    "Financial Operations",
    "Custody Management",
    "Repo Settlements",
    "DVP",
    "FICC",
    "STP",
    "Trade Reconciliation",
    "Investment Banking",
    "Bengaluru",
    "Infosys BPM",
    "State Street Corporation",
  ],
  authors: [{ name: "Abhijith Sunil", url: "https://abhijith-sunil.vercel.app" }],
  creator: "Abhijith Sunil",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Abhijith Sunil — Trade Settlement & Financial Operations Specialist",
    description:
      "Financial operations professional specializing in trade settlement, custody operations, and institutional client service across global markets.",
    type: "website",
    url: "https://abhijith-sunil.vercel.app",
    siteName: "Abhijith Sunil",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijith Sunil — Trade Settlement & Financial Operations Specialist",
    description:
      "Financial operations professional specializing in trade settlement, custody operations, and institutional client service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full font-sans")}>
      <body className="min-h-full flex flex-col bg-[#070707] text-white antialiased overflow-x-clip">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
