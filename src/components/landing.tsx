"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "openai@nasmedia.co.kr";

const MARQUEE_ITEMS = [
  { type: "question", tag: "질문형", text: "아이 영어 숙제, 어떻게 도와줘야 할까요?" },
  { type: "situation", tag: "상황형", text: "성수기라 숙소 가격이 너무 올라서 고민이에요" },
  { type: "search", tag: "검색어형", text: "민감성 피부 진정 크림 추천" },
  { type: "question", tag: "질문형", text: "첫 차, 리스와 할부 중 뭐가 더 낫죠?" },
  { type: "situation", tag: "상황형", text: "운동을 시작했는데 무릎이 자꾸 아파요" },
  { type: "search", tag: "검색어형", text: "재택근무용 의자 추천" },
  { type: "question", tag: "질문형", text: "겨울 제주, 아이랑 갈 만한 곳 있을까요?" },
  { type: "situation", tag: "상황형", text: "이직 준비 중인데 포트폴리오가 막막해요" },
];

const DEMO_TABS = [
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

const PIPELINE = [
  { no: "STEP 1", en: "Input", ko: "구조화", desc: "상품, 랜딩, 키워드, 타깃, 정책 등 흩어진 광고주 자료의 표준화 수집" },
  { no: "STEP 2", en: "Context", ko: "설계", desc: "구매여정, 질문 의도, 상황을 결합한 광고그룹과 Context Hints 확장" },
  { no: "STEP 3", en: "Creative", ko: "생성", desc: "이용자 고민을 직접 건드리는 Title & Copy 자동 생성" },
  { no: "STEP 4", en: "Validation", ko: "검증", desc: "글자수, 의미 중복, 정책 위반 요소 사전 플래그 (Auto QA)" },
  { no: "STEP 5", en: "Review & Upload", ko: "확정", desc: "광고주가 즉시 확인 가능한 검수용 파일 출력과 최종 업로드" },
];

const PROCESS = [
  { no: "01", title: "브리프 작성", desc: "AdMate 워크북에서 캠페인, 상품, 표현 기준을 입력합니다. 약 15분이면 충분합니다." },
  { no: "02", title: "맥락 설계·카피 생성", desc: "Context Creative Agent가 광고그룹, Context Hints, 카피 초안을 만듭니다." },
  { no: "03", title: "검수·승인", desc: "AI 자동 검수를 통과한 초안을 검수용 파일로 전달하고, 광고주 승인 후 확정합니다." },
  { no: "04", title: "라이브 & 리포트", desc: "Ads Manager 업로드로 캠페인을 라이브하고 운영 현황을 리포트합니다." },
];

const EFFECTS = [
  { en: "SCALE & SPEED", title: "제작 효율화와 대량 확장", desc: "수작업 카피 제작 시간을 획기적으로 단축하고, 상품(SKU)·타깃·구매여정별 카피를 즉시 대량 확장합니다." },
  { en: "STANDARDIZATION", title: "품질 표준화", desc: "담당자 역량에 따른 카피 품질 편차를 제거하고, 항상 일관되고 수준 높은 광고 문구를 유지합니다." },
  { en: "CONTEXTUAL PRECISION", title: "맥락 정교화", desc: "단순 키워드를 넘어 질문·상황 기반의 입체적 Context Hints를 설계해, ChatGPT 유저의 실제 대화 맥락에 동기화합니다." },
  { en: "RISK MANAGEMENT", title: "리스크 사전 통제", desc: "글자수 초과, 의미 중복, 정책 위반 요소를 사전에 플래그 처리하고, 직관적이고 빠른 검수 파일을 제공합니다." },
];

const FAQS = [
  { q: "브리프를 제출하면 광고가 바로 게시되나요?", a: "아니요. 제출과 동시에 광고가 게시되지 않습니다. 담당자가 입력 내용을 확인하고, 생성된 광고 문안을 광고주가 검수·승인한 뒤에 다음 단계가 진행됩니다." },
  { q: "어떤 자료를 준비해야 하나요?", a: "상품 소개, 랜딩 URL, 타깃 고객, 브랜드·법무 표현 기준 정도면 충분합니다. 워크북이 6단계로 안내하므로 흩어진 자료를 그대로 옮겨 적기만 하면 됩니다." },
  { q: "기존 검색광고 카피를 그대로 쓸 수 있나요?", a: "그대로 옮기는 것은 권장하지 않습니다. ChatGPT 광고는 검색어가 아닌 대화 맥락에 반응하므로, Agent가 기존 소재를 질문·상황 기반 구조로 재설계해 드립니다." },
  { q: "생성된 광고 문안을 광고주가 직접 검수할 수 있나요?", a: "네. 모든 문안은 검수용 파일로 정리되어 전달되며, 광고주와 대행사가 항목별로 승인·수정 요청할 수 있습니다. 승인된 문안만 업로드됩니다." },
  { q: "비용과 집행 조건이 궁금합니다.", a: "캠페인 목표와 규모에 따라 달라집니다. 브리프를 제출해 주시면 담당자가 검토 후 구체적인 조건과 함께 연락드립니다." },
];

function BrandMark({ size = 34 }: { size?: number }) {
  return (
    <svg className="lp-brand-logo" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path d="M12 3h24a9 9 0 0 1 9 9v20a9 9 0 0 1-9 9H21.5L12.5 47v-6H12a9 9 0 0 1-9-9V12a9 9 0 0 1 9-9Z" fill="#E51D35" />
      <path d="M17 30.5V15.5L31 30.5V15.5" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="31" cy="15.5" r="3.4" fill="#37D5A1" />
    </svg>
  );
}

function ContextMarquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="lp-marquee" aria-hidden="true">
      <div className="lp-marquee-track">
        {items.map((m, i) => (
          <span key={i} className={`lp-marquee-item t-${m.type}`}>
            <b>{m.tag}</b>
            {m.text}
          </span>
        ))}
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("lp-in");
      return;
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
      el.classList.add("lp-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("lp-in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="lp-reveal" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

function HeroChat() {
  return (
    <div className="lp-chat" aria-hidden="true">
      <div className="lp-chat-head"><i />ChatGPT 대화 시뮬레이션</div>
      <div className="lp-chat-body">
        <div className="lp-bubble lp-bubble-user">아이 영어 숙제 봐주기가 너무 벅차요. 좋은 방법이 있을까요?</div>
        <div className="lp-typing"><i /><i /><i /></div>
        <div className="lp-bubble lp-bubble-ai">아이 수준에 맞춰 설명을 잘게 나누는 것이 좋아요. 매일 짧게 반복할 수 있는 학습 도구를 함께 쓰면 부담을 크게 줄일 수 있어요.</div>
        <div className="lp-ad">
          <span className="lp-ad-tag">SPONSORED</span>
          <strong>숙제 봐주다 지치는 저녁이라면?</strong>
          <p>7일 체험으로 아이에게 맞는지 먼저 확인해 보세요.</p>
          <span>자세히 보기</span>
        </div>
      </div>
      <p className="lp-chat-cap">대화 맥락에 맞춰, 광고가 답변처럼 자연스럽게 노출됩니다.</p>
    </div>
  );
}

function ContextHintsDemo() {
  const [tab, setTab] = useState(0);
  const current = DEMO_TABS[tab];
  return (
    <div className="lp-demo">
      <div className="lp-tabs" role="tablist" aria-label="업종별 Context Hints 예시">
        {DEMO_TABS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={i === tab}
            className={`lp-tab${i === tab ? " is-on" : ""}`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="lp-demo-flow" key={tab}>
        <div className="lp-demo-seed">
          <span>광고주 원본 키워드</span>
          <strong>{current.seed}</strong>
        </div>
        <div className="lp-demo-arrow">→</div>
        <div className="lp-hints">
          {current.hints.map((h, i) => (
            <div key={h.type} className={`lp-hint t-${h.type}`} style={{ animationDelay: `${i * 140}ms` }}>
              <b>{h.title}</b>
              <p>{h.text}</p>
              <small>{h.note}</small>
            </div>
          ))}
        </div>
      </div>
      <p className="lp-demo-result">
        <b>Result</b> — 검색어형·질문형·상황형을 혼합 설계하여, 다양한 유저 발화 상황에서 광고 노출 기회를 극대화합니다.
      </p>
    </div>
  );
}

export function Landing() {
  return (
    <div className="lp">
      <header className="lp-header">
        <div className="lp-container lp-header-in">
          <Link href="/" className="lp-brand">
            <BrandMark />
            <span>
              <strong>KT nasmedia</strong>
              <small>OpenAI Ads · AdMate</small>
            </span>
          </Link>
          <nav className="lp-nav" aria-label="주요 메뉴">
            <a href="#why">왜 ChatGPT 광고인가</a>
            <a href="#solution">솔루션</a>
            <a href="#process">진행 프로세스</a>
            <a href="#impact">도입 효과</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Link href="/workbook-dev" className="lp-cta lp-cta-sm">브리프 작성하기</Link>
        </div>
      </header>

      <main>
        <section className="lp-hero lp-grid-bg">
          <div className="lp-container lp-hero-in">
            <div>
              <span className="lp-badge"><i />KT그룹 미디어렙 나스미디어 · OpenAI Ads</span>
              <h1>
                단순 키워드를 넘어,
                <br />
                대화의 <em>맥락</em>을 설계합니다
              </h1>
              <p className="lp-hero-sub">
                ChatGPT 광고는 검색어 하나가 아니라 질문 의도, 상황, 구매여정에 반응합니다.
                나스미디어 Context Creative Agent가 맥락 설계부터 카피 생성, 검수, 업로드까지
                하나의 파이프라인으로 해결합니다.
              </p>
              <div className="lp-hero-actions">
                <Link href="/workbook-dev" className="lp-cta lp-cta-lg">캠페인 브리프 작성하기</Link>
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[OpenAI Ads] 도입 문의")}`} className="lp-cta-ghost lp-cta-lg">도입 문의</a>
              </div>
              <p className="lp-hero-note">브리프를 제출해도 광고가 바로 게시되지 않습니다. 담당자 검토 후 진행됩니다.</p>
            </div>
            <HeroChat />
          </div>
        </section>

        <ContextMarquee />

        <section className="lp-trust">
          <div className="lp-container lp-trust-in">
            <div className="lp-trust-item"><strong>KT그룹 미디어렙</strong><span>검증된 매체 운영 체계와 신뢰</span></div>
            <div className="lp-trust-item"><strong>OpenAI Ads 운영</strong><span>국내 캠페인 세팅·운영 노하우</span></div>
            <div className="lp-trust-item"><strong>원스톱 파이프라인</strong><span>맥락 설계·생성·검수·업로드</span></div>
            <div className="lp-trust-item"><strong>AI 자동 검수</strong><span>정책·글자수 리스크 사전 차단</span></div>
          </div>
        </section>

        <section className="lp-section" id="why">
          <div className="lp-container">
            <Reveal>
              <div className="lp-sec-head">
                <span className="lp-kicker">WHY CHATGPT ADS</span>
                <h2 className="lp-h2">ChatGPT 광고는, 만들던 방식대로 만들 수 없습니다</h2>
                <p className="lp-sub">
                  ChatGPT 광고는 사용자의 검색어 하나가 아닌 질문 의도·상황·고민·구매여정을 기반으로 노출됩니다.
                  일반적인 검색·DA 카피 제작 방식으로는 충분하지 않습니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="lp-compare">
                <div className="lp-compare-card">
                  <h3>기존 검색·DA 광고</h3>
                  <ul>
                    <li><b>기준</b><span>키워드, 타깃, 지면 중심</span></li>
                    <li><b>메시지</b><span>상품, 기능, 혜택 중심의 카피</span></li>
                    <li><b>운영</b><span>정형화된 단일 소재 운영</span></li>
                    <li><b>방식</b><span>운영자의 수작업 중심</span></li>
                  </ul>
                </div>
                <div className="lp-compare-card is-new">
                  <h3>ChatGPT 광고</h3>
                  <ul>
                    <li><b>기준</b><span>대화 맥락, 질문 의도 중심</span></li>
                    <li><b>메시지</b><span>사용자의 고민과 상황에 반응하는 카피</span></li>
                    <li><b>운영</b><span>다양한 Context별 카피 대량 확장</span></li>
                    <li><b>방식</b><span>AI 기반 대량 생성, 검수, 표준화 필수</span></li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <p className="lp-quote">
                ChatGPT 광고의 성과는 카피의 &lsquo;양&rsquo;이 아닌, <b>대화 맥락에 맞춘 정교한 &lsquo;설계&rsquo;</b>에 달려 있습니다.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="lp-section" id="solution">
          <div className="lp-container">
            <Reveal>
              <div className="lp-sec-head">
                <span className="lp-kicker">OUR SOLUTION</span>
                <h2 className="lp-h2">Nasmedia <b>Context Creative Agent</b></h2>
                <p className="lp-sub">
                  광고주 정보를 단순 복제하지 않고, ChatGPT 대화 맥락에 맞는 운영 가능한 구조로 재설계하는
                  나스미디어 전용 AI 크리에이티브 파이프라인입니다.
                </p>
              </div>
            </Reveal>
            <div className="lp-steps">
              {PIPELINE.map((s, i) => (
                <Reveal key={s.en} delay={i * 90}>
                  <div className="lp-step">
                    <i>{s.no}</i>
                    <strong>
                      {s.en}
                      <small>{s.ko}</small>
                    </strong>
                    <p>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container">
            <Reveal>
              <div className="lp-sec-head">
                <span className="lp-kicker">CONTEXT HINTS</span>
                <h2 className="lp-h2">키워드 하나가, 세 갈래의 대화가 됩니다</h2>
                <p className="lp-sub">
                  광고주가 제공한 1차원적 검색어를 AI가 파악하여, ChatGPT 유저의 실제 대화 맥락(검색·질문·상황)으로
                  입체화합니다. 업종을 선택해 확인해 보세요.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContextHintsDemo />
            </Reveal>
          </div>
        </section>

        <section className="lp-section">
          <div className="lp-container">
            <Reveal>
              <div className="lp-sec-head">
                <span className="lp-kicker">TITLE &amp; COPY</span>
                <h2 className="lp-h2">&lsquo;상품·기능 나열&rsquo;에서 &lsquo;이용자 고민 해결&rsquo;로</h2>
                <p className="lp-sub">
                  상품 기능만 나열하던 원본 카피를, 사용자의 상황을 공감(Title)하고 구체적 대안을 제시(Copy)하는
                  구조로 변환합니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="lp-ba">
                <div className="lp-ba-card">
                  <h3>광고주 제공 원본 (기능 중심)</h3>
                  <div className="lp-ba-line">
                    <b>TITLE</b>
                    <p>영어는 아는 것보다 직접 쓰는 게 중요하죠.</p>
                  </div>
                  <div className="lp-ba-line">
                    <b>COPY</b>
                    <p>AI가 설명해준 영어, 이제 실전 실력으로 만들어보세요.</p>
                  </div>
                  <p className="lp-ba-insight">Insight — 상품의 기능과 브랜드명을 일방적으로 전달합니다.</p>
                </div>
                <div className="lp-ba-card is-after">
                  <h3>Agent 생성본 (맥락 중심)</h3>
                  <div className="lp-ba-line">
                    <b>[고민 자극] TITLE</b>
                    <p>숙제 봐주다 지치는 저녁이라면?</p>
                  </div>
                  <div className="lp-ba-line">
                    <b>[해결 제시] COPY</b>
                    <p>7일 동안 써보고 아이에게 맞는지 판단해 보세요.</p>
                  </div>
                  <p className="lp-ba-insight">Insight — 부모의 실제 피로도를 짚어주고, 부담 없는 해결책을 제시해 클릭을 유도합니다.</p>
                </div>
              </div>
            </Reveal>
            <p className="lp-ba-note">* 위 카피는 이해를 돕기 위한 가상의 예시입니다.</p>
          </div>
        </section>

        <section className="lp-section" id="process">
          <div className="lp-container">
            <Reveal>
              <div className="lp-sec-head">
                <span className="lp-kicker">HOW WE WORK</span>
                <h2 className="lp-h2">브리프 한 번이면, 라이브까지 연결됩니다</h2>
                <p className="lp-sub">
                  광고주와 대행사는 브리프 작성까지만. 이후의 맥락 설계, 카피 생성, 검수, 업로드는
                  나스미디어의 파이프라인이 이어받습니다.
                </p>
              </div>
            </Reveal>
            <div className="lp-process">
              {PROCESS.map((p, i) => (
                <Reveal key={p.no} delay={i * 90}>
                  <div className="lp-proc">
                    <i>{p.no}</i>
                    <strong>{p.title}</strong>
                    <p>{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section" id="impact">
          <div className="lp-container">
            <Reveal>
              <div className="lp-sec-head">
                <span className="lp-kicker">IMPACT</span>
                <h2 className="lp-h2">도입하면 달라지는 네 가지</h2>
              </div>
            </Reveal>
            <div className="lp-effects">
              {EFFECTS.map((e, i) => (
                <Reveal key={e.en} delay={i * 80}>
                  <div className="lp-effect">
                    <i>{e.en}</i>
                    <strong>{e.title}</strong>
                    <p>{e.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={120}>
              <p className="lp-banner">
                Context Creative Agent는 ChatGPT 광고의 가장 큰 진입 장벽인 <b>&lsquo;맥락 설계&rsquo;</b>와{" "}
                <em>&lsquo;카피 확장&rsquo;</em>을 자동화하여, 운영 고도화를 이끄는 AI 기반 솔루션입니다.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="lp-section" id="faq">
          <div className="lp-container">
            <Reveal>
              <div className="lp-sec-head" style={{ textAlign: "center" }}>
                <span className="lp-kicker">FAQ</span>
                <h2 className="lp-h2">자주 묻는 질문</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="lp-faq">
                {FAQS.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="lp-final lp-grid-bg">
          <div className="lp-container">
            <Reveal>
              <h2>
                대화 속에서 브랜드가
                <br />
                <b>발견되는 순간</b>을 설계하세요
              </h2>
              <p>브리프 작성은 약 15분. 제출 후 담당자가 검토하여 연락드립니다.</p>
              <div className="lp-final-actions">
                <Link href="/workbook-dev" className="lp-cta lp-cta-lg">지금 캠페인 브리프 작성하기</Link>
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[OpenAI Ads] 도입 문의")}`} className="lp-cta-ghost lp-cta-lg">도입 문의</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-in">
            <div className="lp-footer-brand">
              <strong style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                <BrandMark size={26} />
                KT nasmedia
              </strong>
              <span>
                ㈜나스미디어 · KT그룹 미디어렙
                <br />
                OpenAI Ads 캠페인의 설계, 제작, 검수, 운영을 지원합니다.
              </span>
            </div>
            <div className="lp-footer-links">
              <a href={`mailto:${CONTACT_EMAIL}`}>도입 문의 {CONTACT_EMAIL}</a>
              <Link href="/workbook-dev">캠페인 브리프 작성</Link>
              <a href="https://www.nasmedia.co.kr" target="_blank" rel="noreferrer">회사 소개</a>
            </div>
          </div>
          <p className="lp-footer-legal">
            © 2026 Nasmedia. All rights reserved. 본 페이지에 사용된 광고 카피와 대화 예시는 이해를 돕기 위한
            가상의 예시입니다. 브리프 제출만으로 광고 게시나 비용이 발생하지 않습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
