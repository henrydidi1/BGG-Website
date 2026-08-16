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
  title: "BrandGo.Global | AI-Driven Global Growth Studio",
  description: "No guesswork. Only compute. AI-powered cross-border marketing, global content strategy, and fractional CMO services.",
  keywords: ["AI marketing", "global expansion", "cross-border", "fractional CMO", "BrandGo.Global"],
  authors: [{ name: "BrandGo.Global Studio" }],
  icons: {
    icon: '/icon.png?v=3',
  },
  openGraph: {
    title: "BrandGo.Global | AI-Driven Global Growth Studio",
    description: "No guesswork. Only compute.",
    type: "website",
    locale: "en",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
