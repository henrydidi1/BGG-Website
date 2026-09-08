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
  metadataBase: new URL("https://www.brandgo.global"),
  title: "BrandGo.Global | AI 驱动的海外增长团队",
  description: "BrandGo.Global 帮助中国企业看清海外市场、找到客户并推动增长。通过 GoRadar AI、海外内容与本地化、广告投放，以及品牌赞助与达人营销，把市场判断转化为实际行动。",
  keywords: [
    "企业出海",
    "品牌出海",
    "海外市场",
    "海外营销",
    "GoRadar AI",
    "海外广告",
    "内容营销",
    "品牌赞助",
    "达人营销",
    "global growth",
    "market intelligence",
    "content localization",
    "paid media",
    "creator marketing",
    "sponsorships",
  ],
  authors: [{ name: "BrandGo.Global" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png?v=3',
  },
  openGraph: {
    title: "BrandGo.Global | AI 驱动的海外增长团队",
    description: "BrandGo.Global 帮助中国企业看清海外市场、找到客户并推动增长。通过 GoRadar AI、海外内容与本地化、广告投放，以及品牌赞助与达人营销，把市场判断转化为实际行动。",
    type: "website",
    url: "/",
    siteName: "BrandGo.Global",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: "BrandGo.Global | AI 驱动的海外增长团队",
    description: "BrandGo.Global 帮助中国企业看清海外市场、找到客户并推动增长。通过 GoRadar AI、海外内容与本地化、广告投放，以及品牌赞助与达人营销，把市场判断转化为实际行动。",
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
