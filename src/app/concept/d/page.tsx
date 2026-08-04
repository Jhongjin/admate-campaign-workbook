import type { Metadata } from "next";
import { ConceptD } from "@/components/concept/d";

export const metadata: Metadata = {
  title: "시안 D · Bento | 나스미디어 OpenAI Ads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConceptD />;
}
