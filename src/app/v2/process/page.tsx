import type { Metadata } from "next";
import { V2Process } from "@/components/v2/process";

export const metadata: Metadata = {
  title: "진행 프로세스 | 나스미디어 OpenAI Ads (v2)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V2Process />;
}
