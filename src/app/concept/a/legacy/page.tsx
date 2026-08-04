import type { Metadata } from "next";
import { ConceptA } from "@/components/concept/a";

export const metadata: Metadata = {
  title: "시안 A · Agent Console (기존 문구) | 나스미디어 OpenAI Ads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConceptA variant="legacy" />;
}
