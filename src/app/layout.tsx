import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brand Go Studio | AI驱动的出海营销专家",
  description: "AI-Powered Outbound Marketing Arsenal — Precision Targeting, Breakthrough, Localization. 让中国品牌赢在全球舞台。",
  keywords: ["品牌出海", "海外营销", "AI营销", "全球化", "跨境电商", "Brand Go Studio"],
  authors: [{ name: "Brand Go Studio" }],
  openGraph: {
    title: "Brand Go Studio | AI驱动的出海营销专家",
    description: "让中国品牌赢在全球舞台。AI驱动的出海营销武器库，精准定位、强势破局、本土化落地。",
    type: "website",
    locale: "zh_CN",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="zh" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050208] relative overflow-x-hidden">
        {/* Background Layer - High-impact neon AI SaaS style */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 15% 10%, rgba(0, 220, 255, 0.75) 0%, rgba(0, 180, 230, 0.45) 18%, rgba(20, 30, 80, 0.25) 40%, transparent 65%), radial-gradient(ellipse 90% 70% at 85% 90%, rgba(255, 0, 180, 0.75) 0%, rgba(220, 30, 180, 0.45) 18%, rgba(80, 20, 100, 0.25) 40%, transparent 65%), linear-gradient(135deg, #050208 0%, #0a0418 50%, #050208 100%)',
            zIndex: -1,
          }}
          aria-hidden="true"
        />
        {/* Subtle grid overlay for depth */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            zIndex: -1,
          }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
