import type { Metadata } from "next";
import { V3Process } from "@/components/v3/pages";

export const metadata: Metadata = {
  title: "진행 프로세스 | 나스미디어 OpenAI Ads (v3)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V3Process />;
}
