import type { Metadata } from "next";
import { ConceptB } from "@/components/concept/b";

export const metadata: Metadata = {
  title: "시안 B · Journey Data (기존 문구) | 나스미디어 OpenAI Ads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConceptB variant="legacy" />;
}
