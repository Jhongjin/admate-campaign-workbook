import type { Metadata } from "next";
import { CampaignWorkbook } from "@/components/campaign-workbook";

export const metadata: Metadata = {
  title: "AdMate Campaign Workbook | 광고 캠페인 정보 작성",
  description:
    "OpenAI Ads 캠페인 제작에 필요한 상품, 고객, 이미지와 표현 기준을 쉽고 안전하게 작성합니다.",
};

export default function WorkbookPage() {
  return <CampaignWorkbook />;
}
