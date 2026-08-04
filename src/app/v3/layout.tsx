import type { Metadata } from "next";
import { Footer, Header } from "@/components/v3/shell";
import s from "@/components/v3/v3.module.css";

export const metadata: Metadata = {
  title: "나스미디어 OpenAI Ads (v3)",
  description: "디자인 시스템을 적용한 검토용 버전입니다.",
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  );
}
