import type { Metadata } from "next";
import { ConceptE } from "@/components/concept/e";

export const metadata: Metadata = {
  title: "시안 E · Product Demo (기존 문구) | 나스미디어 OpenAI Ads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConceptE variant="legacy" />;
}
