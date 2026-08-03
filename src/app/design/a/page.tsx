import type { Metadata } from "next";
import { ConceptA } from "@/components/design/concept-a";

export const metadata: Metadata = {
  title: "시안 A · Paper | 나스미디어 OpenAI Ads",
  description: "메인 페이지 리디자인 시안 A — 밝은 에디토리얼 레이아웃.",
  robots: { index: false, follow: false },
};

export default function DesignAPage() {
  return <ConceptA />;
}
