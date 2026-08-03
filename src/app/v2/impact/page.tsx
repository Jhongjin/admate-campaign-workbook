import type { Metadata } from "next";
import { V2Impact } from "@/components/v2/impact";

export const metadata: Metadata = {
  title: "도입 효과 | 나스미디어 OpenAI Ads (v2)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V2Impact />;
}
