// 문구는 v2와 동일하게 공유합니다. 달라지는 것은 디자인 토큰과 경로뿐입니다.
export {
  CONTACT_EMAIL, MAILTO, HERO, TRUST, MARQUEE, WHY_ROWS, PIPELINE, DUAL_AGENT,
  DEMO_TABS, BA, PROCESS, PREPARE, IMPACT, FAQS, FINAL,
} from "@/components/v2/content";

export const NAV = [
  { href: "/v3/why", label: "왜 다른가" },
  { href: "/v3/solution", label: "솔루션" },
  { href: "/v3/context", label: "Context Hints" },
  { href: "/v3/process", label: "진행 프로세스" },
  { href: "/v3/impact", label: "도입 효과" },
];

export const NEXT_PAGE: Record<string, { href: string; label: string }> = {
  "/v3": { href: "/v3/why", label: "왜 다른가" },
  "/v3/why": { href: "/v3/solution", label: "솔루션" },
  "/v3/solution": { href: "/v3/context", label: "Context Hints" },
  "/v3/context": { href: "/v3/process", label: "진행 프로세스" },
  "/v3/process": { href: "/v3/impact", label: "도입 효과" },
};

export const HOME_CARDS = [
  { href: "/v3/why", no: "01", title: "왜 다른가", desc: "ChatGPT 광고가 기존 검색·DA 광고와 무엇이 다른지 정리했습니다." },
  { href: "/v3/solution", no: "02", title: "솔루션", desc: "자료 수집부터 업로드까지 이어지는 5단계 파이프라인을 소개합니다." },
  { href: "/v3/context", no: "03", title: "Context Hints", desc: "키워드 하나가 세 갈래 대화로 확장되는 과정을 직접 확인해 보세요." },
  { href: "/v3/process", no: "04", title: "진행 프로세스", desc: "브리프 작성부터 라이브까지, 무엇을 언제 하는지 안내합니다." },
  { href: "/v3/impact", no: "05", title: "도입 효과", desc: "운영에서 실제로 달라지는 네 가지와 자주 묻는 질문입니다." },
];
