import type { Metadata } from "next";
import { Landing } from "@/components/landing";

export const metadata: Metadata = {
  title: "나스미디어 OpenAI Ads | 대화의 맥락을 설계하는 ChatGPT 광고 파트너",
  description:
    "KT그룹 미디어렙 나스미디어의 Context Creative Agent가 ChatGPT 광고의 맥락 설계부터 카피 생성, 검수, 업로드까지 하나의 파이프라인으로 지원합니다.",
  openGraph: {
    title: "나스미디어 OpenAI Ads | 대화의 맥락을 설계하다",
    description:
      "단순 키워드를 넘어 대화의 맥락을 설계하는 나스미디어의 ChatGPT 광고 솔루션, Context Creative Agent를 소개합니다.",
    type: "website",
  },
};

export default function Home() {
  return <Landing />;
}
