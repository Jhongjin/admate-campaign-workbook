"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

type Contact = {
  company: string;
  brand: string;
  name: string;
  email: string;
  phone: string;
  partnerType: "advertiser" | "agency";
  advertiser: string;
};

type Campaign = {
  id: string;
  name: string;
  budget: string;
  budgetType: "daily" | "lifetime";
  startDate: string;
  endDate: string;
  objective: "views" | "clicks";
  country: string;
};

type Product = {
  id: string;
  campaignId: string;
  brand: string;
  name: string;
  summary: string;
  features: string;
  benefit: string;
  difference: string;
  target: string;
  need: string;
  conditions: string;
  keyMessage: string;
  banned: string;
  url: string;
  priority: "high" | "normal" | "low";
  notes: string;
};

type Creative = {
  id: string;
  campaignId: string;
  productId: string;
  fileName: string;
  imageUrl: string;
  message: string;
  target: string;
  scope: string;
  startDate: string;
  endDate: string;
  url: string;
  notice: string;
};

type Policy = {
  tone: string;
  competitor: "yes" | "limited" | "no";
  comparison: "yes" | "limited" | "no";
  legal: string;
  banned: string;
  excluded: string;
  notes: string;
  references: string;
  customerSources: string;
  keywords: string;
};

type WorkbookDraft = {
  contact: Contact;
  campaigns: Campaign[];
  products: Product[];
  creatives: Creative[];
  policy: Policy;
};

const steps = [
  ["담당자 정보", "확인과 보완 연락에 필요한 정보"],
  ["캠페인", "예산·기간·광고 목표 설정"],
  ["상품·고객", "문안의 근거가 되는 핵심 브리프"],
  ["광고 이미지", "이미지와 연결 메시지 등록"],
  ["표현 기준", "브랜드·법무 기준과 참고자료"],
  ["확인·제출", "누락을 확인하고 제출 준비"],
] as const;

const makeId = () => Math.random().toString(36).slice(2, 10);

const emptyCampaign = (): Campaign => ({
  id: makeId(), name: "", budget: "", budgetType: "daily", startDate: "", endDate: "", objective: "views", country: "KR",
});

const emptyProduct = (campaignId = ""): Product => ({
  id: makeId(), campaignId, brand: "", name: "", summary: "", features: "", benefit: "", difference: "", target: "", need: "", conditions: "", keyMessage: "", banned: "", url: "", priority: "high", notes: "",
});

const emptyCreative = (campaignId = "", productId = ""): Creative => ({
  id: makeId(), campaignId, productId, fileName: "", imageUrl: "", message: "", target: "", scope: "", startDate: "", endDate: "", url: "", notice: "",
});

const initialDraft = (): WorkbookDraft => {
  const campaign = emptyCampaign();
  const product = emptyProduct(campaign.id);
  return {
    contact: { company: "", brand: "", name: "", email: "", phone: "", partnerType: "advertiser", advertiser: "" },
    campaigns: [campaign],
    products: [product],
    creatives: [emptyCreative(campaign.id, product.id)],
    policy: { tone: "", competitor: "no", comparison: "limited", legal: "", banned: "", excluded: "", notes: "", references: "", customerSources: "", keywords: "" },
  };
};

type FieldProps = {
  label: string;
  required?: boolean;
  why: string;
  example?: string;
  wide?: boolean;
  children: React.ReactNode;
};

function Field({ label, required, why, example, wide, children }: FieldProps) {
  return (
    <div className={`field ${wide ? "field-wide" : ""}`}>
      <div className="field-label">
        <span>{label}</span>
        <span className={required ? "required" : "optional"}>{required ? "필수" : "선택"}</span>
      </div>
      <p className="field-why">{why}</p>
      {children}
      {example && (
        <details className="field-example">
          <summary>작성 예시</summary>
          <p>{example}</p>
        </details>
      )}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="control" {...props} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="control textarea" rows={4} {...props} />;
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className="control" {...props} />;
}

export function CampaignWorkbook() {
  const [draft, setDraft] = useState<WorkbookDraft>(initialDraft);
  const [step, setStep] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [saveLabel, setSaveLabel] = useState("임시저장 준비");
  const [stepError, setStepError] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("admate-campaign-workbook-draft");
      if (saved) {
        try { setDraft(JSON.parse(saved) as WorkbookDraft); } catch { /* 새 초안 사용 */ }
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem("admate-campaign-workbook-draft", JSON.stringify(draft));
      setSaveLabel(`자동 저장됨 · ${new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [draft, hydrated]);

  const updateContact = (key: keyof Contact, value: string) => setDraft((current) => ({ ...current, contact: { ...current.contact, [key]: value } }));
  const updatePolicy = (key: keyof Policy, value: string) => setDraft((current) => ({ ...current, policy: { ...current.policy, [key]: value } }));
  const updateCampaign = (id: string, key: keyof Campaign, value: string) => setDraft((current) => ({ ...current, campaigns: current.campaigns.map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  const updateProduct = (id: string, key: keyof Product, value: string) => setDraft((current) => ({ ...current, products: current.products.map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  const updateCreative = (id: string, key: keyof Creative, value: string) => setDraft((current) => ({ ...current, creatives: current.creatives.map((item) => item.id === id ? { ...item, [key]: value } : item) }));

  const requiredMissing = useMemo(() => {
    const missing: string[] = [];
    if (!draft.contact.company.trim()) missing.push("회사명");
    if (!draft.contact.brand.trim()) missing.push("브랜드명");
    if (!draft.contact.name.trim()) missing.push("담당자명");
    if (!/^\S+@\S+\.\S+$/.test(draft.contact.email)) missing.push("업무 이메일");
    if (draft.contact.partnerType === "agency" && !draft.contact.advertiser.trim()) missing.push("광고주 회사명");
    draft.campaigns.forEach((item, index) => {
      if (!item.name.trim()) missing.push(`캠페인 ${index + 1} 이름`);
      if (!item.budget || Number(item.budget) <= 0) missing.push(`캠페인 ${index + 1} 예산`);
      if (!item.startDate || !item.endDate) missing.push(`캠페인 ${index + 1} 기간`);
    });
    draft.products.forEach((item, index) => {
      if (!item.name.trim()) missing.push(`상품 ${index + 1} 이름`);
      if (!item.summary.trim()) missing.push(`상품 ${index + 1} 한 줄 소개`);
      if (!item.features.trim()) missing.push(`상품 ${index + 1} 특징·혜택`);
      if (!item.target.trim()) missing.push(`상품 ${index + 1} 주요 고객`);
      if (!item.need.trim()) missing.push(`상품 ${index + 1} 고객 고민`);
      if (!item.url.startsWith("http")) missing.push(`상품 ${index + 1} 연결 페이지`);
    });
    draft.creatives.forEach((item, index) => {
      if (!item.fileName && !item.imageUrl.startsWith("http")) missing.push(`이미지 ${index + 1} 파일 또는 주소`);
      if (!item.message.trim()) missing.push(`이미지 ${index + 1} 핵심 메시지`);
    });
    if (!draft.policy.tone.trim()) missing.push("원하는 문체와 분위기");
    if (!draft.policy.banned.trim()) missing.push("사용하면 안 되는 표현");
    return missing;
  }, [draft]);

  const validateCurrentStep = () => {
    const messages = [
      !draft.contact.company || !draft.contact.brand || !draft.contact.name || !/^\S+@\S+\.\S+$/.test(draft.contact.email) || (draft.contact.partnerType === "agency" && !draft.contact.advertiser) ? "회사·브랜드·담당자와 올바른 업무 이메일을 입력해 주세요. 대행사는 광고주 회사명도 필요합니다." : "",
      draft.campaigns.some((item) => !item.name || !item.budget || !item.startDate || !item.endDate) ? "각 캠페인의 이름, 예산과 기간을 입력해 주세요." : "",
      draft.products.some((item) => !item.name || !item.summary || !item.features || !item.target || !item.need || !item.url.startsWith("http")) ? "상품명, 소개, 특징, 주요 고객, 고객 고민과 연결 페이지를 확인해 주세요." : "",
      draft.creatives.some((item) => (!item.fileName && !item.imageUrl.startsWith("http")) || !item.message) ? "각 이미지의 파일 또는 주소와 핵심 메시지를 입력해 주세요." : "",
      !draft.policy.tone || !draft.policy.banned ? "원하는 문체와 사용하면 안 되는 표현을 입력해 주세요." : "",
      "",
    ];
    setStepError(messages[step]);
    return !messages[step];
  };

  const next = () => {
    if (!validateCurrentStep()) return;
    setStepError("");
    setStep((current) => Math.min(steps.length - 1, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previous = () => {
    setStepError("");
    setStep((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetDraft = () => {
    if (!window.confirm("현재 기기에 임시 저장된 작성 내용을 모두 지울까요?")) return;
    window.localStorage.removeItem("admate-campaign-workbook-draft");
    setDraft(initialDraft());
    setStep(0);
    setCompleted(false);
  };

  const addCampaign = () => setDraft((current) => ({ ...current, campaigns: [...current.campaigns, emptyCampaign()] }));
  const addProduct = () => setDraft((current) => ({ ...current, products: [...current.products, emptyProduct(current.campaigns[0]?.id)] }));
  const addCreative = () => setDraft((current) => ({ ...current, creatives: [...current.creatives, emptyCreative(current.campaigns[0]?.id, current.products[0]?.id)] }));

  const removeItem = (kind: "campaigns" | "products" | "creatives", id: string) => {
    setDraft((current) => ({ ...current, [kind]: current[kind].filter((item) => item.id !== id) }));
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="메인 페이지로 이동">
          <BrandMark size={36} className="brand-logo" />
          <span><strong>KT nasmedia</strong><small>OpenAI Ads · AdMate</small></span>
        </Link>
        <div className="header-actions">
          <span className="save-status"><span className="save-dot" />{saveLabel}</span>
          <button className="text-button" type="button" onClick={resetDraft}>처음부터 작성</button>
        </div>
      </header>

      <main className="workspace" id="top">
        <aside className="progress-panel" aria-label="작성 단계">
          <div className="progress-intro">
            <span className="eyebrow">OpenAI Ads 캠페인 준비</span>
            <h1>광고 제작 정보를<br />쉽게 정리하세요</h1>
            <p>입력한 내용은 담당자가 광고 문안을 준비하고 검토하는 근거로 사용합니다.</p>
          </div>
          <ol className="step-list">
            {steps.map(([title, description], index) => (
              <li key={title} className={`${index === step ? "active" : ""} ${index < step ? "done" : ""}`}>
                <button type="button" onClick={() => index <= step && setStep(index)} aria-current={index === step ? "step" : undefined}>
                  <span className="step-number">{index < step ? "✓" : index + 1}</span>
                  <span><strong>{title}</strong><small>{description}</small></span>
                </button>
              </li>
            ))}
          </ol>
          <div className="trust-note">
            <strong>안심하고 작성하세요</strong>
            <p>제출과 동시에 광고가 게시되지 않습니다. 담당자 확인과 문안 검토 후 다음 단계가 진행됩니다.</p>
          </div>
        </aside>

        <section className="form-panel">
          <div className="mobile-progress">
            <span>{step + 1} / {steps.length}</span>
            <div><i style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
          </div>
          <div className="form-heading">
            <span className="step-kicker">{step + 1}단계</span>
            <h2>{steps[step][0]}</h2>
            <p>{steps[step][1]}. 각 항목의 설명과 예시를 참고해 작성해 주세요.</p>
          </div>

          {step === 0 && (
            <div className="form-grid">
              <Field label="회사명" required why="접수 내용을 회사별로 구분하고 담당 조직을 확인하는 데 사용합니다." example="주식회사 나스미디어">
                <TextInput value={draft.contact.company} onChange={(e) => updateContact("company", e.target.value)} placeholder="회사명을 입력해 주세요" />
              </Field>
              <Field label="브랜드명" required why="광고 문안에 사용할 정확한 브랜드 표기를 확인합니다." example="캐츠잉글리시">
                <TextInput value={draft.contact.brand} onChange={(e) => updateContact("brand", e.target.value)} placeholder="광고할 브랜드명을 입력해 주세요" />
              </Field>
              <Field label="담당자명" required why="입력 내용 확인이나 보완이 필요할 때 연락드릴 담당자입니다." example="홍길동">
                <TextInput value={draft.contact.name} onChange={(e) => updateContact("name", e.target.value)} placeholder="담당자 이름" />
              </Field>
              <Field label="업무 이메일" required why="작성 재개와 접수 결과 안내에 사용할 업무용 이메일입니다." example="campaign@company.co.kr">
                <TextInput type="email" value={draft.contact.email} onChange={(e) => updateContact("email", e.target.value)} placeholder="name@company.co.kr" />
              </Field>
              <Field label="연락처" why="긴급한 확인이 필요한 경우에만 사용합니다." example="010-1234-5678">
                <TextInput value={draft.contact.phone} onChange={(e) => updateContact("phone", e.target.value)} placeholder="선택 입력" />
              </Field>
              <Field label="작성자 구분" required why="광고주와 대행사에 맞는 후속 확인 절차를 준비합니다.">
                <Select value={draft.contact.partnerType} onChange={(e) => updateContact("partnerType", e.target.value)}>
                  <option value="advertiser">광고주</option><option value="agency">대행사</option>
                </Select>
              </Field>
              {draft.contact.partnerType === "agency" && (
                <Field label="광고주 회사명" required why="어느 광고주의 캠페인인지 정확하게 연결합니다." wide>
                  <TextInput value={draft.contact.advertiser} onChange={(e) => updateContact("advertiser", e.target.value)} placeholder="실제 광고주 회사명" />
                </Field>
              )}
              <div className="privacy-callout field-wide"><strong>개인정보 입력 전 확인</strong><p>고객 이름, 전화번호, 이메일, 회원번호 등 소비자 개인정보는 입력하거나 첨부하지 마세요.</p></div>
            </div>
          )}

          {step === 1 && (
            <div className="repeat-stack">
              {draft.campaigns.map((campaign, index) => (
                <article className="repeat-card" key={campaign.id}>
                  <div className="repeat-head"><div><span>캠페인 {index + 1}</span><h3>{campaign.name || "새 캠페인"}</h3></div>{draft.campaigns.length > 1 && <button type="button" onClick={() => removeItem("campaigns", campaign.id)}>삭제</button>}</div>
                  <div className="form-grid">
                    <Field label="캠페인명" required why="여러 캠페인을 구분하는 이름이며 이후 상품과 이미지를 연결할 때 사용합니다." example="2026_여름_무료체험">
                      <TextInput value={campaign.name} onChange={(e) => updateCampaign(campaign.id, "name", e.target.value)} placeholder="한글·영문·숫자로 입력" />
                    </Field>
                    <Field label="최대 광고 예산" required why="선택한 기간 동안 사용할 수 있는 최대 예산입니다." example="500000">
                      <div className="unit-input"><TextInput type="number" min="1" value={campaign.budget} onChange={(e) => updateCampaign(campaign.id, "budget", e.target.value)} placeholder="500000" /><span>원</span></div>
                    </Field>
                    <Field label="예산 사용 방식" required why="하루 기준 또는 전체 기간 기준으로 예산을 관리합니다.">
                      <Select value={campaign.budgetType} onChange={(e) => updateCampaign(campaign.id, "budgetType", e.target.value)}><option value="daily">하루 기준</option><option value="lifetime">전체 기간 기준</option></Select>
                    </Field>
                    <Field label="광고 목표" required why="노출 확대와 사이트 방문 중 우선할 목표를 선택합니다.">
                      <Select value={campaign.objective} onChange={(e) => updateCampaign(campaign.id, "objective", e.target.value)}><option value="views">더 많은 사람에게 알리기</option><option value="clicks">사이트 방문 늘리기</option></Select>
                    </Field>
                    <Field label="시작일" required why="광고를 시작하려는 날짜입니다."><TextInput type="date" value={campaign.startDate} onChange={(e) => updateCampaign(campaign.id, "startDate", e.target.value)} /></Field>
                    <Field label="종료일" required why="광고를 종료하려는 날짜이며 시작일 이후여야 합니다."><TextInput type="date" min={campaign.startDate} value={campaign.endDate} onChange={(e) => updateCampaign(campaign.id, "endDate", e.target.value)} /></Field>
                    <Field label="광고 대상 국가" required why="광고를 보여줄 주요 국가입니다.">
                      <Select value={campaign.country} onChange={(e) => updateCampaign(campaign.id, "country", e.target.value)}><option value="KR">대한민국</option><option value="US">미국</option><option value="JP">일본</option><option value="GB">영국</option><option value="ALL">전체 국가</option></Select>
                    </Field>
                  </div>
                </article>
              ))}
              <button className="add-button" type="button" onClick={addCampaign}>＋ 다른 캠페인 추가</button>
            </div>
          )}

          {step === 2 && (
            <div className="repeat-stack">
              {draft.products.map((product, index) => (
                <article className="repeat-card" key={product.id}>
                  <div className="repeat-head"><div><span>상품·서비스 {index + 1}</span><h3>{product.name || "새 상품·서비스"}</h3></div>{draft.products.length > 1 && <button type="button" onClick={() => removeItem("products", product.id)}>삭제</button>}</div>
                  <div className="form-grid">
                    <Field label="연결할 캠페인" required why="이 상품을 어느 캠페인에 사용할지 연결합니다."><Select value={product.campaignId} onChange={(e) => updateProduct(product.id, "campaignId", e.target.value)}>{draft.campaigns.map((item, i) => <option value={item.id} key={item.id}>{item.name || `캠페인 ${i + 1}`}</option>)}</Select></Field>
                    <Field label="상품·서비스명" required why="광고할 대상을 고객이 부르는 이름으로 입력합니다." example="캐츠잉글리시 7일 무료학습"><TextInput value={product.name} onChange={(e) => updateProduct(product.id, "name", e.target.value)} placeholder="상품 또는 서비스명" /></Field>
                    <Field label="브랜드명" why="상품 브랜드가 담당자 단계의 브랜드와 다를 때 입력합니다."><TextInput value={product.brand} onChange={(e) => updateProduct(product.id, "brand", e.target.value)} placeholder={draft.contact.brand || "브랜드명"} /></Field>
                    <Field label="한 줄 소개" required why="처음 보는 사람도 상품을 바로 이해할 수 있도록 핵심을 요약합니다." example="초등 영어 학습을 집에서 7일간 체험하는 서비스"><TextArea value={product.summary} onChange={(e) => updateProduct(product.id, "summary", e.target.value)} placeholder="무엇을 제공하는 상품인지 한 문장으로 적어 주세요" /></Field>
                    <Field label="주요 특징과 혜택" required why="실제로 제공하는 기능·혜택·구성은 광고 문안의 사실 근거가 됩니다." example="7일 무료학습, 주요 콘텐츠 체험, 학부모 앱에서 학습 데이터 확인"><TextArea value={product.features} onChange={(e) => updateProduct(product.id, "features", e.target.value)} placeholder="쉼표 또는 줄바꿈으로 구분해 주세요" /></Field>
                    <Field label="고객이 얻는 효과" why="기능이 고객에게 어떤 도움으로 이어지는지 설명합니다." example="가입 전 아이에게 맞는 학습인지 직접 확인할 수 있음"><TextArea value={product.benefit} onChange={(e) => updateProduct(product.id, "benefit", e.target.value)} placeholder="고객 관점의 변화를 적어 주세요" /></Field>
                    <Field label="다른 상품과의 차이점" why="비슷한 상품 중 이 상품을 선택할 이유를 찾는 데 사용합니다." example="학습기 기반 통합 학습과 영어 콘텐츠를 함께 경험"><TextArea value={product.difference} onChange={(e) => updateProduct(product.id, "difference", e.target.value)} placeholder="확인 가능한 차별점만 적어 주세요" /></Field>
                    <Field label="주요 고객" required why="누구에게 말하는 광고인지 정해 문안의 어조와 관심사를 맞춥니다." example="예비 초등~초등 6학년 자녀의 영어 학습을 고민하는 학부모"><TextArea value={product.target} onChange={(e) => updateProduct(product.id, "target", e.target.value)} placeholder="연령, 역할, 상황을 함께 적어 주세요" /></Field>
                    <Field label="고객의 고민이나 필요" required why="고객이 상품을 찾는 순간을 이해해 자연스러운 광고 메시지를 만듭니다." example="학원 등록 전에 아이 수준과 학습 지속 가능성을 확인하고 싶음"><TextArea value={product.need} onChange={(e) => updateProduct(product.id, "need", e.target.value)} placeholder="해결하고 싶은 문제를 적어 주세요" /></Field>
                    <Field label="주요 이용 조건" why="기간·대상·가격처럼 오해가 생기기 쉬운 조건을 정확히 반영합니다." example="학습기 수령 후 시작일 포함 7일, 종료 후 무료 회수"><TextArea value={product.conditions} onChange={(e) => updateProduct(product.id, "conditions", e.target.value)} placeholder="대상, 기간, 비용, 제공 조건" /></Field>
                    <Field label="꼭 반영할 메시지" why="모든 문장에 복사하지 않고, 문안 작성 시 중요하게 참고합니다." example="무료학습 체험 / 아이 수준 진단 / 체험 후 결정"><TextArea value={product.keyMessage} onChange={(e) => updateProduct(product.id, "keyMessage", e.target.value)} placeholder="중요한 메시지 후보를 적어 주세요" /></Field>
                    <Field label="사용하면 안 되는 표현" why="과장되거나 사실과 다르거나 브랜드에서 금지한 표현을 제외합니다." example="100% 향상, 누구나 효과 보장, 무조건 1위"><TextArea value={product.banned} onChange={(e) => updateProduct(product.id, "banned", e.target.value)} placeholder="금지어와 금지 문장을 적어 주세요" /></Field>
                    <Field label="연결할 페이지 주소" required why="광고를 누른 고객이 이동할 공식 페이지입니다." example="https://brand.co.kr/promotion"><TextInput type="url" value={product.url} onChange={(e) => updateProduct(product.id, "url", e.target.value)} placeholder="https://" /></Field>
                    <Field label="중요도" why="상품이 여러 개인 경우 문안 제작 우선순위를 정합니다."><Select value={product.priority} onChange={(e) => updateProduct(product.id, "priority", e.target.value)}><option value="high">높음</option><option value="normal">보통</option><option value="low">낮음</option></Select></Field>
                    <Field label="추가 설명" why="앞 항목에 포함되지 않은 담당자 요청사항을 남깁니다." wide><TextArea value={product.notes} onChange={(e) => updateProduct(product.id, "notes", e.target.value)} placeholder="담당자가 함께 알아야 할 내용을 적어 주세요" /></Field>
                  </div>
                </article>
              ))}
              <button className="add-button" type="button" onClick={addProduct}>＋ 다른 상품·서비스 추가</button>
            </div>
          )}

          {step === 3 && (
            <div className="repeat-stack">
              {draft.creatives.map((creative, index) => (
                <article className="repeat-card" key={creative.id}>
                  <div className="repeat-head"><div><span>광고 이미지 {index + 1}</span><h3>{creative.fileName || "새 이미지"}</h3></div>{draft.creatives.length > 1 && <button type="button" onClick={() => removeItem("creatives", creative.id)}>삭제</button>}</div>
                  <div className="form-grid">
                    <Field label="연결할 캠페인" required why="이미지를 사용할 캠페인을 선택합니다."><Select value={creative.campaignId} onChange={(e) => updateCreative(creative.id, "campaignId", e.target.value)}>{draft.campaigns.map((item, i) => <option value={item.id} key={item.id}>{item.name || `캠페인 ${i + 1}`}</option>)}</Select></Field>
                    <Field label="연결할 상품·서비스" required why="이미지와 상품 정보를 정확히 연결합니다."><Select value={creative.productId} onChange={(e) => updateCreative(creative.id, "productId", e.target.value)}>{draft.products.map((item, i) => <option value={item.id} key={item.id}>{item.name || `상품·서비스 ${i + 1}`}</option>)}</Select></Field>
                    <Field label="이미지 파일" required why="광고에 사용할 이미지입니다. 현재 화면에서는 파일명을 임시 저장하며 실제 업로드는 서버 연결 후 제공됩니다." wide>
                      <label className="upload-box"><input type="file" accept="image/png,image/jpeg" onChange={(e) => updateCreative(creative.id, "fileName", e.target.files?.[0]?.name || "")} /><span className="upload-icon">↑</span><strong>{creative.fileName || "PNG 또는 JPG 파일 선택"}</strong><small>권장 5MB 이하 · 실제 저장 기능 연결 예정</small></label>
                    </Field>
                    <Field label="이미지 주소" why="이미지가 공개 주소로 준비되어 있다면 파일 대신 입력할 수 있습니다." example="https://brand.co.kr/images/ad01.png"><TextInput type="url" value={creative.imageUrl} onChange={(e) => updateCreative(creative.id, "imageUrl", e.target.value)} placeholder="https://" /></Field>
                    <Field label="이미지에서 강조할 메시지" required why="이미지와 광고 문안이 서로 다른 말을 하지 않도록 핵심 내용을 연결합니다." example="7일 무료학습으로 아이에게 맞는지 먼저 확인"><TextArea value={creative.message} onChange={(e) => updateCreative(creative.id, "message", e.target.value)} placeholder="이미지가 전달해야 할 핵심 메시지" /></Field>
                    <Field label="주요 고객" why="이 이미지를 우선 보여주고 싶은 고객을 적어 주세요."><TextArea value={creative.target} onChange={(e) => updateCreative(creative.id, "target", e.target.value)} placeholder="비워두면 상품의 주요 고객을 사용합니다" /></Field>
                    <Field label="사용할 캠페인 또는 매체" why="이미지 사용 범위가 제한된 경우 기록합니다." example="OpenAI Ads 여름 캠페인에만 사용"><TextInput value={creative.scope} onChange={(e) => updateCreative(creative.id, "scope", e.target.value)} placeholder="사용 범위" /></Field>
                    <Field label="사용 가능 시작일" why="이미지 사용 권한이나 프로모션 시작일을 확인합니다."><TextInput type="date" value={creative.startDate} onChange={(e) => updateCreative(creative.id, "startDate", e.target.value)} /></Field>
                    <Field label="사용 가능 종료일" why="기간이 지난 이미지를 광고에 사용하지 않도록 확인합니다."><TextInput type="date" min={creative.startDate} value={creative.endDate} onChange={(e) => updateCreative(creative.id, "endDate", e.target.value)} /></Field>
                    <Field label="이미지별 연결 페이지" why="이 이미지만 별도 페이지로 연결해야 할 때 입력합니다."><TextInput type="url" value={creative.url} onChange={(e) => updateCreative(creative.id, "url", e.target.value)} placeholder="비워두면 상품의 연결 페이지를 사용합니다" /></Field>
                    <Field label="반드시 표시하거나 확인할 내용" why="이미지 사용 시 필요한 고지나 주의사항을 담당자가 확인합니다." example="무료 체험 대상 및 학습기 회수 조건 확인"><TextArea value={creative.notice} onChange={(e) => updateCreative(creative.id, "notice", e.target.value)} placeholder="필수 고지와 사용 주의사항" /></Field>
                  </div>
                </article>
              ))}
              <button className="add-button" type="button" onClick={addCreative}>＋ 다른 광고 이미지 추가</button>
            </div>
          )}

          {step === 4 && (
            <div className="form-grid">
              <Field label="원하는 문체와 분위기" required why="브랜드에 맞는 말투와 인상을 유지하는 기준입니다." example="신뢰감 있고 전문적이되, 학부모가 이해하기 쉬운 따뜻한 문체" wide><TextArea value={draft.policy.tone} onChange={(e) => updatePolicy("tone", e.target.value)} placeholder="브랜드가 원하는 말투와 분위기" /></Field>
              <Field label="경쟁사 이름을 언급해도 되나요?" required why="허용되지 않은 브랜드 비교를 예방합니다."><Select value={draft.policy.competitor} onChange={(e) => updatePolicy("competitor", e.target.value)}><option value="no">언급 불가</option><option value="limited">조건부 가능</option><option value="yes">가능</option></Select></Field>
              <Field label="다른 상품과 비교해도 되나요?" required why="비교 표현의 허용 범위와 근거 확인 수준을 정합니다."><Select value={draft.policy.comparison} onChange={(e) => updatePolicy("comparison", e.target.value)}><option value="no">비교 불가</option><option value="limited">공식 근거가 있을 때만 가능</option><option value="yes">가능</option></Select></Field>
              <Field label="사용 전 반드시 확인할 표현이나 조건" why="가격·무료 기간·1위·최다처럼 근거 확인이 필요한 내용을 표시합니다." example="무료학습 대상과 기간, 프로모션 중복 제공 여부, 1위 표현 근거" wide><TextArea value={draft.policy.legal} onChange={(e) => updatePolicy("legal", e.target.value)} placeholder="법무·심의 또는 내부 확인이 필요한 내용" /></Field>
              <Field label="사용하면 안 되는 표현" required why="모든 상품과 이미지에 공통으로 적용할 금지 기준입니다." example="무조건, 100%, 보장, 완벽, 최고"><TextArea value={draft.policy.banned} onChange={(e) => updatePolicy("banned", e.target.value)} placeholder="쉼표 또는 줄바꿈으로 구분" /></Field>
              <Field label="광고에서 다루지 말아야 할 주제" why="민감 정보나 고객 불안을 자극하는 부적절한 주제를 제외합니다." example="개인 건강 추정, 성적 부진 낙인, 개인정보 추정"><TextArea value={draft.policy.excluded} onChange={(e) => updatePolicy("excluded", e.target.value)} placeholder="제외할 주제와 상황" /></Field>
              <Field label="추가 요청사항" why="앞선 기준으로 설명하기 어려운 브랜드 요청을 남깁니다." wide><TextArea value={draft.policy.notes} onChange={(e) => updatePolicy("notes", e.target.value)} placeholder="담당자가 함께 확인할 요청사항" /></Field>
              <Field label="참고할 공식 자료" why="공식 사이트, FAQ, 브랜드 가이드 등 사실 확인에 사용할 자료입니다." example="https://brand.co.kr / 브랜드 소개와 프로모션 조건 확인" wide><TextArea value={draft.policy.references} onChange={(e) => updatePolicy("references", e.target.value)} placeholder="자료명과 공개 URL을 한 줄씩 입력" /></Field>
              <details className="optional-section field-wide">
                <summary><span><strong>고객 질문 자료</strong><small>선택 입력 · FAQ, 검색어, 상담 내용</small></span><b>펼치기</b></summary>
                <div className="optional-body"><p>실제 고객이 자주 묻는 내용을 공유하면 자연스러운 광고 문안을 만드는 데 참고할 수 있습니다. 소비자 개인정보를 제거한 자료만 입력해 주세요.</p><TextArea value={draft.policy.customerSources} onChange={(e) => updatePolicy("customerSources", e.target.value)} placeholder="자료명 | 공유 링크 | 참고할 내용" /></div>
              </details>
              <details className="optional-section field-wide">
                <summary><span><strong>주요 검색어</strong><small>선택 입력 · 보유한 검색어를 한 줄에 하나씩</small></span><b>펼치기</b></summary>
                <div className="optional-body"><p>광고에 참고할 주요 검색어가 있다면 입력해 주세요. 입력하지 않아도 제출할 수 있습니다.</p><TextArea value={draft.policy.keywords} onChange={(e) => updatePolicy("keywords", e.target.value)} placeholder={'초등 영어 무료체험\n온라인 영어 학습\n영어 레벨테스트'} /></div>
              </details>
            </div>
          )}

          {step === 5 && (
            <div className="review-layout">
              <div className={`review-status ${requiredMissing.length ? "warning" : "ready"}`}>
                <span>{requiredMissing.length ? "!" : "✓"}</span>
                <div><strong>{requiredMissing.length ? `확인이 필요한 항목 ${requiredMissing.length}개` : "필수 정보 입력 완료"}</strong><p>{requiredMissing.length ? "아래 항목을 선택하면 해당 단계로 돌아가 수정할 수 있습니다." : "입력 내용과 자료 사용 권한을 확인한 뒤 제출할 수 있습니다."}</p></div>
              </div>
              <div className="summary-grid">
                <button type="button" onClick={() => setStep(1)}><span>캠페인</span><strong>{draft.campaigns.length}</strong><small>예산·기간·목표 확인</small></button>
                <button type="button" onClick={() => setStep(2)}><span>상품·서비스</span><strong>{draft.products.length}</strong><small>고객과 핵심 메시지 확인</small></button>
                <button type="button" onClick={() => setStep(3)}><span>광고 이미지</span><strong>{draft.creatives.length}</strong><small>파일과 연결 정보 확인</small></button>
              </div>
              {requiredMissing.length > 0 && <div className="missing-list"><h3>먼저 확인해 주세요</h3>{requiredMissing.map((item) => <span key={item}>{item}</span>)}</div>}
              <div className="consent-box">
                <h3>제출 전 확인</h3>
                <label><input type="checkbox" /> 입력한 정보가 사실과 다르지 않음을 확인했습니다.</label>
                <label><input type="checkbox" /> 이미지와 자료를 광고 제작에 사용할 권한이 있습니다.</label>
                <label><input type="checkbox" /> 소비자 개인정보를 삭제하거나 비식별 처리했습니다.</label>
                <label><input type="checkbox" /> 개인정보 수집 및 이용 안내를 확인했습니다.</label>
              </div>
              <div className="build-notice"><strong>현재는 화면 검증용 초기 버전입니다.</strong><p>서버 저장·파일 업로드·실제 접수 기능은 다음 개발 단계에서 연결됩니다. 지금 입력한 내용은 이 브라우저에만 임시 저장됩니다.</p></div>
              {completed && <div className="completion-message" role="status"><strong>화면 검토가 완료되었습니다.</strong><p>실제 접수 기능이 연결되면 이 위치에서 접수번호와 제출본 다운로드를 제공합니다.</p></div>}
            </div>
          )}

          {stepError && <div className="step-error" role="alert"><strong>다음 단계로 이동하기 전에 확인해 주세요.</strong><p>{stepError}</p></div>}

          <nav className="form-navigation" aria-label="작성 단계 이동">
            <button className="secondary-button" type="button" onClick={previous} disabled={step === 0}>이전</button>
            <span>{step + 1} / {steps.length}</span>
            {step < steps.length - 1 ? <button className="primary-button" type="button" onClick={next}>저장하고 다음</button> : <button className="primary-button" type="button" disabled={requiredMissing.length > 0} onClick={() => setCompleted(true)}>입력 내용 확인 완료</button>}
          </nav>
        </section>
      </main>
      <footer className="site-footer"><span>© kt nasmedia. All rights reserved.</span><span>자료 제출 문의 · 담당자 연결 준비 중</span></footer>
    </div>
  );
}
