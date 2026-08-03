import type { Metadata } from "next";
import { ConceptB } from "@/components/design/concept-b";

export const metadata: Metadata = {
  title: "시안 B · Ink | 나스미디어 OpenAI Ads",
  description: "메인 페이지 리디자인 시안 B — 정제된 다크 모노크롬 레이아웃.",
  robots: { index: false, follow: false },
};

export default function DesignBPage() {
  return <ConceptB />;
}
