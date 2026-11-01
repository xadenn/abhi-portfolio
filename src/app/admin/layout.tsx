import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Control Panel & Operations Console | Abhijith Sunil",
  description: "Administrative workspace and data engine for Abhijith Sunil's portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
