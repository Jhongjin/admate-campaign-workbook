import type { Metadata } from "next";
import { V2Home } from "@/components/v2/home";

export const metadata: Metadata = {
  title: "나스미디어 OpenAI Ads | 나스미디어 OpenAI Ads (v2)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V2Home />;
}
