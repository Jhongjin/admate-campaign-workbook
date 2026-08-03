import type { Metadata } from "next";
import { V2Solution } from "@/components/v2/solution";

export const metadata: Metadata = {
  title: "솔루션 | 나스미디어 OpenAI Ads (v2)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V2Solution />;
}
