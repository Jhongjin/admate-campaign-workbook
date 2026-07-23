import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdMate Campaign Workbook | 광고 캠페인 정보 작성",
  description: "OpenAI Ads 캠페인 제작에 필요한 상품, 고객, 이미지와 표현 기준을 쉽고 안전하게 작성합니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
