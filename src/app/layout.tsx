import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SponsorKey.Global | Cross-Border Sports Partnerships",
  description: "Connecting ambitious Chinese brands with international sports properties and helping global rights holders build meaningful commercial relationships with China.",
  keywords: ["sports sponsorship", "China", "Europe", "cross-border partnerships", "SponsorKey.Global"],
  authors: [{ name: "Sponsor Key" }],
  openGraph: {
    title: "SponsorKey.Global | Cross-Border Sports Partnerships",
    description: "Connecting brands and sport across markets.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
