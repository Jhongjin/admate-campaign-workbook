import type { Metadata } from "next";
import { ConceptC } from "@/components/concept/c";

export const metadata: Metadata = {
  title: "시안 C · Review First | 나스미디어 OpenAI Ads",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConceptC />;
}
