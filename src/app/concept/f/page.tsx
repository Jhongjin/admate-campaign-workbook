import type { Metadata } from "next";
import { ConceptF } from "@/components/concept/f";

export const metadata: Metadata = {
  title: "시안 F · Composite | 나스미디어 OpenAI Ads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConceptF />;
}
