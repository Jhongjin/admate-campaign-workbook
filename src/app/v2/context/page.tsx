import type { Metadata } from "next";
import { V2Context } from "@/components/v2/context";

export const metadata: Metadata = {
  title: "Context Hints | 나스미디어 OpenAI Ads (v2)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V2Context />;
}
