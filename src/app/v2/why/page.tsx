import type { Metadata } from "next";
import { V2Why } from "@/components/v2/why";

export const metadata: Metadata = {
  title: "왜 다른가 | 나스미디어 OpenAI Ads (v2)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V2Why />;
}
