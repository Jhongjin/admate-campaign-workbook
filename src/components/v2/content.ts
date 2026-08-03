export const CONTACT_EMAIL = "openai@nasmedia.co.kr";
export const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[OpenAI Ads] 도입 문의")}`;

export const NAV = [
  { href: "/v2/why", label: "왜 다른가" },
  { href: "/v2/solution", label: "솔루션" },
  { href: "/v2/context", label: "Context Hints" },
  { href: "/v2/process", label: "진행 프로세스" },
  { href: "/v2/impact", label: "도입 효과" },
];

/** 페이지 하단 순차 이동. 스크롤 내러티브를 대체합니다. */
export const NEXT_PAGE: Record<string, { href: string; label: string }> = {
  "/v2": { href: "/v2/why", label: "왜 다른가" },
  "/v2/why": { href: "/v2/solution", label: "솔루션" },
  "/v2/solution": { href: "/v2/context", label: "Context Hints" },
  "/v2/context": { href: "/v2/process", label: "진행 프로세스" },
  "/v2/process": { href: "/v2/impact", label: "도입 효과" },
};

export const HERO = {
  badge: "KT그룹 미디어렙 나스미디어 · OpenAI Ads",
  lead:
    "ChatGPT 광고의 대화 맥락 기반 광고그룹·Context Hints, Title & Copy 생성을 지원하는 나스미디어 전용 AI 운영 솔루션입니다.",
  note: "브리프를 제출해도 광고가 바로 게시되지 않습니다. 담당자 검토 후 진행됩니다.",
  primary: "캠페인 브리프 작성하기",
  secondary: "도입 문의",
};

export const TRUST = [
  { title: "KT그룹 미디어렙", desc: "검증된 매체 운영 체계와 신뢰" },
  { title: "OpenAI Ads 운영", desc: "국내 캠페인 세팅·운영 노하우" },
  { title: "원스톱 파이프라인", desc: "맥락 설계·생성·검수·업로드" },
  { title: "AI 자동 검수", desc: "정책·글자수 리스크 사전 차단" },
];

export const HOME_CARDS = [
  { href: "/v2/why", no: "01", title: "왜 다른가", desc: "ChatGPT 광고가 기존 검색·DA 광고와 무엇이 다른지 정리했습니다." },
  { href: "/v2/solution", no: "02", title: "솔루션", desc: "자료 수집부터 업로드까지 이어지는 5단계 파이프라인을 소개합니다." },
  { href: "/v2/context", no: "03", title: "Context Hints", desc: "키워드 하나가 세 갈래 대화로 확장되는 과정을 직접 확인해 보세요." },
  { href: "/v2/process", no: "04", title: "진행 프로세스", desc: "브리프 작성부터 라이브까지, 무엇을 언제 하는지 안내합니다." },
  { href: "/v2/impact", no: "05", title: "도입 효과", desc: "운영에서 실제로 달라지는 네 가지와 자주 묻는 질문입니다." },
];

export const MARQUEE = [
  { type: "question", tag: "질문형", text: "아이 영어 숙제, 어떻게 도와줘야 할까요?" },
  { type: "situation", tag: "상황형", text: "성수기라 숙소 가격이 너무 올라서 고민이에요" },
  { type: "search", tag: "검색어형", text: "민감성 피부 진정 크림 추천" },
  { type: "question", tag: "질문형", text: "첫 차, 리스와 할부 중 뭐가 더 낫죠?" },
  { type: "situation", tag: "상황형", text: "운동을 시작했는데 무릎이 자꾸 아파요" },
  { type: "search", tag: "검색어형", text: "재택근무용 의자 추천" },
  { type: "question", tag: "질문형", text: "겨울 제주, 아이랑 갈 만한 곳 있을까요?" },
  { type: "situation", tag: "상황형", text: "이직 준비 중인데 포트폴리오가 막막해요" },
];

export const WHY_ROWS = [
  {
    key: "기준",
    before: "키워드·타깃·지면 중심",
    after: "대화 맥락과 질문 의도 중심",
  },
  {
    key: "메시지",
    before: "상품·기능·혜택 중심 카피",
    after: "사용자의 고민과 상황에 반응하는 카피",
  },
  {
    key: "운영",
    before: "캠페인 구조와 소재 규격 기반의 정형 운영",
    after: "다양한 Context별 카피를 대량으로 확장",
  },
  {
    key: "방식",
    before: "매체 세팅·입찰·타기팅 중심의 최적화",
    after: "AI 기반 대량 생성과 검수, 품질 표준화",
  },
];

export const PIPELINE = [
  {
    no: "01",
    en: "Data Input",
    ko: "자료 수집",
    desc: "상품, 혜택, 키워드, 타깃, 소재, 정책 등 흩어져 있는 광고주 자료를 하나의 표준 양식으로 모읍니다.",
  },
  {
    no: "02",
    en: "Context",
    ko: "맥락 설계",
    desc: "구매여정과 질문 의도, 이용 상황을 결합해 광고그룹을 나누고 그룹별 Context Hints를 확정합니다.",
  },
  {
    no: "03",
    en: "Creative",
    ko: "생성·검수",
    desc: "이용자의 고민을 직접 건드리는 Title과 해결 방향을 제시하는 Copy를 생성하고, 2차 품질 검수를 거칩니다.",
    tag: "Dual AI Agent",
  },
  {
    no: "04",
    en: "Validation",
    ko: "사전 검증",
    desc: "글자수 초과, 의미 중복, 근거 부족, 정책 위반 소지를 업로드 전에 자동으로 찾아 표시합니다.",
  },
  {
    no: "05",
    en: "Review & Upload",
    ko: "확정·업로드",
    desc: "운영자와 광고주가 항목별로 바로 판단할 수 있는 검수용 파일을 출력하고, 승인된 문안만 업로드합니다.",
  },
];

export const DUAL_AGENT = [
  {
    tag: "1차 생성 AI Agent",
    title: "고민과 해결 기반 카피 생성",
    desc: "Context Hints에 맞춰 이용자의 고민을 자극하는 Title과, 해결 방향을 제시하는 Copy를 생성합니다.",
  },
  {
    tag: "2차 검수 AI Agent",
    title: "연결성·자연스러움·매력도 검수",
    desc: "생성된 문안을 다시 읽고 맥락 연결성, 문장의 자연스러움, 광고로서의 매력도를 점검합니다.",
  },
];

export const DEMO_TABS = [
  {
    label: "교육",
    seed: "초등 영어 문법 쉽게 설명하는 방법",
    hints: [
      { type: "search", title: "검색어형", text: "초등 영어 숙제 봐주는 방법", note: "의도 기반 타겟팅" },
      { type: "question", title: "질문형", text: "영어 문장을 초등학생 수준으로 어떻게 풀어서 설명하죠?", note: "질의응답 최적화" },
      { type: "situation", title: "상황형", text: "제가 영어를 잘 못해서 아이 영어를 계속 봐주기 어려워요.", note: "페인포인트·공감" },
    ],
  },
  {
    label: "여행",
    seed: "제주 가족여행 숙소 추천",
    hints: [
      { type: "search", title: "검색어형", text: "제주 아이 동반 숙소 추천", note: "의도 기반 타겟팅" },
      { type: "question", title: "질문형", text: "아이 둘 데리고 제주 3박 4일이면 어디에 묵는 게 좋을까요?", note: "질의응답 최적화" },
      { type: "situation", title: "상황형", text: "성수기라 숙소 가격이 너무 올라서 고민이에요.", note: "페인포인트·공감" },
    ],
  },
  {
    label: "뷰티",
    seed: "민감성 피부 진정 크림",
    hints: [
      { type: "search", title: "검색어형", text: "민감성 피부 진정 크림 추천", note: "의도 기반 타겟팅" },
      { type: "question", title: "질문형", text: "환절기마다 뒤집어지는 피부, 어떤 성분을 피해야 하나요?", note: "질의응답 최적화" },
      { type: "situation", title: "상황형", text: "새 화장품만 쓰면 트러블이 나서 바꾸기가 무서워요.", note: "페인포인트·공감" },
    ],
  },
];

export const BA = {
  before: {
    label: "광고주 제공 원본",
    kind: "TITLE + COPY",
    lines: ["영어는 아는 것보다 직접 쓰는 게 중요하죠.", "ChatGPT가 설명해준 영어, ○○○와 실제 실력으로 만들어보세요."],
    insight: "상품의 기능과 혜택을 일방적으로 전달합니다.",
  },
  after: {
    label: "Context Creative Agent 생성본",
    title: { kind: "[고민 자극] TITLE", text: "아는 영어, 막상 쓰려면 어렵죠?" },
    copy: { kind: "[해결 및 판단 제시] COPY", text: "단어·문장·말하기를 반복 훈련하며 실제 실력으로 이어가요." },
    insight: "ChatGPT로 이해한 영어를 직접 쓰는 학습 행동으로 연결합니다.",
  },
  note: "* 위 예시의 브랜드명은 가림 처리했습니다.",
};

export const PROCESS = [
  {
    no: "01",
    title: "브리프 작성",
    who: "광고주·대행사",
    desc: "OpenAI Ads 워크북에 캠페인, 상품, 표현 기준을 입력합니다. 흩어진 자료를 옮겨 적는 수준으로 약 15분이면 충분합니다.",
  },
  {
    no: "02",
    title: "맥락 설계·카피 생성",
    who: "나스미디어",
    desc: "Context Creative Agent가 광고그룹과 Context Hints를 설계하고, Dual AI Agent가 카피를 생성하고 검수합니다.",
  },
  {
    no: "03",
    title: "검수·승인",
    who: "함께",
    desc: "AI 자동 검수를 통과한 초안을 검수용 파일로 전달합니다. 항목별로 승인하거나 수정을 요청하실 수 있습니다.",
  },
  {
    no: "04",
    title: "라이브 & 리포트",
    who: "나스미디어",
    desc: "승인된 문안만 Ads Manager에 업로드해 캠페인을 라이브하고, 운영 현황을 정기적으로 리포트합니다.",
  },
];

export const PREPARE = [
  "상품·서비스 소개와 주요 혜택",
  "광고를 연결할 랜딩 페이지 주소",
  "주요 고객과 고객이 겪는 고민",
  "브랜드·법무상 피해야 할 표현",
];

export const IMPACT = [
  {
    en: "SCALE & SPEED",
    title: "제작 효율화와 대량 확장",
    desc: "수작업 카피 제작 시간을 크게 단축하고, 상품과 타깃, 구매여정별 카피를 즉시 대량으로 확장합니다.",
  },
  {
    en: "STANDARDIZATION",
    title: "품질 표준화",
    desc: "담당자 역량에 따른 품질 편차를 없애고, 일관된 기준의 광고 문구 품질을 유지합니다.",
  },
  {
    en: "CONTEXTUAL PRECISION",
    title: "맥락 정교화",
    desc: "질문과 상황에 기반한 입체적 Context Hints를 설계해, 실제 대화 맥락에 맞춘 카피를 만듭니다.",
  },
  {
    en: "RISK MANAGEMENT",
    title: "리스크 사전 통제",
    desc: "글자수 초과와 의미 중복, 정책 위반 요소를 사전에 표시하고 빠른 검수 파일을 제공합니다.",
  },
];

export const FAQS = [
  {
    q: "브리프를 제출하면 광고가 바로 게시되나요?",
    a: "아니요. 제출과 동시에 광고가 게시되지 않습니다. 담당자가 입력 내용을 확인하고, 생성된 광고 문안을 광고주가 검수·승인한 뒤에 다음 단계가 진행됩니다.",
  },
  {
    q: "어떤 자료를 준비해야 하나요?",
    a: "상품 소개, 랜딩 URL, 타깃 고객, 브랜드·법무 표현 기준 정도면 충분합니다. 워크북이 6단계로 안내하므로 흩어진 자료를 그대로 옮겨 적기만 하면 됩니다.",
  },
  {
    q: "기존 검색광고 카피를 그대로 쓸 수 있나요?",
    a: "그대로 옮기는 것은 권장하지 않습니다. ChatGPT 광고는 검색어가 아닌 대화 맥락에 반응하므로, Agent가 기존 소재를 질문·상황 기반 구조로 재설계해 드립니다.",
  },
  {
    q: "생성된 광고 문안을 광고주가 직접 검수할 수 있나요?",
    a: "네. 모든 문안은 검수용 파일로 정리되어 전달되며, 광고주와 대행사가 항목별로 승인하거나 수정을 요청할 수 있습니다. 승인된 문안만 업로드됩니다.",
  },
  {
    q: "비용과 집행 조건이 궁금합니다.",
    a: "캠페인 목표와 규모에 따라 달라집니다. 브리프를 제출해 주시면 담당자가 검토 후 구체적인 조건과 함께 연락드립니다.",
  },
];

export const FINAL = {
  title: "대화 속에서 브랜드가 발견되는 순간을 설계하세요",
  lead: "브리프 작성은 약 15분. 제출 후 담당자가 검토하여 연락드립니다.",
};
