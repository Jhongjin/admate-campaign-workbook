import type { Metadata } from "next";
import { Footer, Header } from "@/components/v2/shell";
import s from "@/components/v2/v2.module.css";

export const metadata: Metadata = {
  title: "나스미디어 OpenAI Ads (v2)",
  description: "페이지 분리와 가독성 개선을 적용한 검토용 버전입니다.",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  );
}
