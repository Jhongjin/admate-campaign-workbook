import type { Metadata } from "next";
import { CampaignWorkbook } from "@/components/campaign-workbook";
import { WorkbookDevTweaks } from "@/components/workbook-dev-tweaks";

export const metadata: Metadata = {
  title: "AdMate Campaign Workbook (Dev) | 다크 테마 리디자인 검증",
  description: "메인 페이지 디자인 테마에 맞춘 브리프 작성 페이지 리디자인 검증용 페이지입니다.",
  robots: { index: false, follow: false },
};

export default function WorkbookDevPage() {
  return (
    <div className="wbd">
      <WorkbookDevTweaks />
      <CampaignWorkbook />
    </div>
  );
}
