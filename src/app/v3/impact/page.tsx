import type { Metadata } from "next";
import { V3Impact } from "@/components/v3/pages";

export const metadata: Metadata = {
  title: "도입 효과 | 나스미디어 OpenAI Ads (v3)",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <V3Impact />;
}
