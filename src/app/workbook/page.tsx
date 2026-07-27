import type { Metadata } from "next";
import { CampaignWorkbook } from "@/components/campaign-workbook";

export const metadata: Metadata = {
  title: "캠페인 브리프 작성 | 나스미디어 OpenAI Ads",
  description:
    "OpenAI Ads 캠페인 제작에 필요한 상품, 고객, 이미지와 표현 기준을 쉽고 안전하게 작성합니다.",
};

export default function WorkbookPage() {
  return (
    <div className="wb-dark">
      <CampaignWorkbook />
    </div>
  );
}
