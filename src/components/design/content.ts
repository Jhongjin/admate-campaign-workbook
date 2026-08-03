// 시안 공통 콘텐츠. 두 시안이 같은 문구를 쓰도록 해 디자인만 비교합니다.
// 현재 운영 페이지 대비 문구를 크게 줄인 축약본입니다.

export const CONTACT_EMAIL = "openai@nasmedia.co.kr";

export const HERO = {
  eyebrow: "KT그룹 미디어렙 · OpenAI Ads",
  title: ["대화의 맥락을", "설계합니다"],
  accent: "맥락",
  lead: "ChatGPT 광고는 검색어가 아닌 질문과 상황에 반응합니다.",
  primary: "캠페인 브리프 작성",
  secondary: "도입 문의",
  note: "제출해도 광고가 바로 게시되지 않습니다.",
};

export const PROOF = [
  "KT그룹 미디어렙",
  "OpenAI Ads 국내 운영",
  "설계·생성·검수 원스톱",
  "AI 자동 검수",
];

export const WHY = {
  title: "만들던 방식으로는 안 됩니다",
  rows: [
    { k: "기준", before: "키워드 · 지면", after: "대화 맥락 · 질문 의도" },
    { k: "메시지", before: "상품 · 기능 중심", after: "고민 · 상황에 반응" },
    { k: "방식", before: "수작업 세팅", after: "AI 대량 생성 · 검수" },
  ],
  statement: "성과는 카피의 ‘양’이 아니라 ‘설계’에서 나옵니다.",
};

export const PIPELINE = [
  { no: "01", en: "Data Input", ko: "자료 표준화 수집" },
  { no: "02", en: "Context", ko: "광고그룹 · Context Hints 설계" },
  { no: "03", en: "Creative", ko: "카피 생성 · 2차 검수", tag: "Dual AI Agent" },
  { no: "04", en: "Validation", ko: "정책 · 글자수 사전 검증" },
  { no: "05", en: "Upload", ko: "검수 파일 출력 · 업로드" },
];

export const FLOW = ["브리프 작성", "맥락 설계 · 생성", "검수 · 승인", "라이브"];

export const DEMO_TABS = [
  {
    label: "교육",
    seed: "초등 영어 문법 쉽게 설명하는 방법",
    hints: [
      { type: "search", title: "검색어형", text: "초등 영어 숙제 봐주는 방법" },
      { type: "question", title: "질문형", text: "영어 문장을 초등학생 수준으로 어떻게 설명하죠?" },
      { type: "situation", title: "상황형", text: "제가 영어를 못해서 아이를 봐주기 어려워요." },
    ],
  },
  {
    label: "여행",
    seed: "제주 가족여행 숙소 추천",
    hints: [
      { type: "search", title: "검색어형", text: "제주 아이 동반 숙소 추천" },
      { type: "question", title: "질문형", text: "아이 둘과 제주 3박이면 어디가 좋을까요?" },
      { type: "situation", title: "상황형", text: "성수기라 숙소 가격이 너무 올랐어요." },
    ],
  },
  {
    label: "뷰티",
    seed: "민감성 피부 진정 크림",
    hints: [
      { type: "search", title: "검색어형", text: "민감성 피부 진정 크림 추천" },
      { type: "question", title: "질문형", text: "환절기에 어떤 성분을 피해야 하나요?" },
      { type: "situation", title: "상황형", text: "새 화장품만 쓰면 트러블이 나요." },
    ],
  },
];

export const BA = {
  title: "기능 나열에서 고민 해결로",
  before: {
    label: "광고주 원본",
    lines: ["영어는 아는 것보다 직접 쓰는 게 중요하죠.", "ChatGPT가 설명해준 영어, ○○○와 실력으로 만들어보세요."],
  },
  after: {
    label: "Agent 생성본",
    title: "아는 영어, 막상 쓰려면 어렵죠?",
    copy: "단어·문장·말하기를 반복 훈련하며 실제 실력으로 이어가요.",
  },
  note: "브랜드명은 가림 처리한 예시입니다.",
};

export const IMPACT = [
  { en: "SPEED", ko: "속도", desc: "제작 시간 단축, 즉시 대량 확장" },
  { en: "STANDARD", ko: "표준화", desc: "담당자 편차 없는 일관된 품질" },
  { en: "PRECISION", ko: "정교함", desc: "실제 대화 맥락에 맞춘 설계" },
  { en: "SAFETY", ko: "안전", desc: "정책·글자수 리스크 사전 차단" },
];

export const FAQS = [
  { q: "제출하면 광고가 바로 게시되나요?", a: "아니요. 담당자 확인과 광고주 승인 후 진행됩니다." },
  { q: "무엇을 준비해야 하나요?", a: "상품 소개, 랜딩 URL, 타깃, 표현 기준이면 충분합니다." },
  { q: "기존 검색광고 카피를 써도 되나요?", a: "권장하지 않습니다. 질문·상황 기반 구조로 재설계해 드립니다." },
  { q: "비용은 어떻게 되나요?", a: "캠페인 목표와 규모에 따라 다릅니다. 브리프 제출 후 안내드립니다." },
];

export const FINAL = {
  title: "브리프 한 번이면 됩니다",
  lead: "작성 15분. 이후는 나스미디어가 이어받습니다.",
};
