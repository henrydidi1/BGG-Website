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
  title: "BrandGo.Global | 全球市场进入与增长伙伴",
  description: "BrandGo.Global 帮助有成熟产品、供应链或出口基础的中国企业寻找海外市场、买家、经销商和增长机会。通过 GoRadar AI™、市场进入与增长执行，把市场情报转化为实际行动。",
  keywords: [
    "企业出海",
    "海外市场进入",
    "海外市场开发",
    "海外买家",
    "海外经销商",
    "出口获客",
    "制造业出海",
    "外贸获客",
    "GoRadar AI™",
    "B2B lead generation",
    "market entry",
    "global growth",
    "market intelligence",
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
    title: "BrandGo.Global | 全球市场进入与增长伙伴",
    description: "BrandGo.Global 帮助有成熟产品、供应链或出口基础的中国企业寻找海外市场、买家、经销商和增长机会。通过 GoRadar AI™、市场进入与增长执行，把市场情报转化为实际行动。",
    type: "website",
    url: "/",
    siteName: "BrandGo.Global",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: "BrandGo.Global | 全球市场进入与增长伙伴",
    description: "BrandGo.Global 帮助有成熟产品、供应链或出口基础的中国企业寻找海外市场、买家、经销商和增长机会。通过 GoRadar AI™、市场进入与增长执行，把市场情报转化为实际行动。",
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
