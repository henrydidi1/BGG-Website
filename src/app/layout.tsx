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
      <body className="min-h-full flex flex-col bg-[#0B0C10]">
        {children}
      </body>
    </html>
  );
}
