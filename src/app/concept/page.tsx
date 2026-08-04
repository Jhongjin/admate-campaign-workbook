import type { Metadata } from "next";
import Link from "next/link";
import s from "./index.module.css";

export const metadata: Metadata = {
  title: "메인 페이지 시안 6종 | 나스미디어 OpenAI Ads",
  description: "Figma 템플릿 5종과 조합안 1종을 기반으로 만든 검토용 시안입니다.",
  robots: { index: false, follow: false },
};

const ITEMS = [
  {
    href: "/concept/a", tag: "시안 A", name: "Agent Console", sub: "Agentix형 · 다크 퍼플",
    bg: "#0b0713", fg: "#f4f1fb", sw: ["#0b0713", "#a855f7", "#f4f1fb"],
    hook: "카피를 손으로 쓰는 일은 여기서 끝냅니다",
    struct: "히어로 + 운영 콘솔 → 가치 3 → 기능 6 → 실행 5단계",
    tone: "문제 해결형. 에이전트가 대신한다는 점을 앞세웠습니다.",
  },
  {
    href: "/concept/b", tag: "시안 B", name: "Journey Data", sub: "Gen1형 · 딥네이비 + 인디고",
    bg: "#070a14", fg: "#eef1f9", sw: ["#070a14", "#818cf8", "#4ade80"],
    hook: "사람들이 묻는 방식으로 광고를 설계합니다",
    struct: "좌우 히어로 + 확장 패널 → 지표 4 → 구매여정 6단계 → 문안 비교 → 운영",
    tone: "분석적. 구매여정 6단계를 본문의 축으로 삼았습니다.",
  },
  {
    href: "/concept/c", tag: "시안 C", name: "Review First", sub: "Premium형 · 차콜 + 오렌지",
    bg: "#0c0a09", fg: "#faf7f4", sw: ["#0c0a09", "#fb923c", "#faf7f4"],
    hook: "확인되지 않은 문장은 내보내지 않습니다",
    struct: "중앙 히어로 → 지표 스트립 → 검수 원칙 아코디언 5 → 일정 타임라인 → FAQ",
    tone: "신뢰·근거 중심. 규제 민감 업종 설득에 유리합니다.",
  },
  {
    href: "/concept/d", tag: "시안 D", name: "Bento", sub: "Bento UI형 · 라이트",
    bg: "#f4f4f5", fg: "#18181b", sw: ["#f4f4f5", "#18181b", "#2563eb"],
    hook: "ChatGPT 안에서 만나는 광고, 한 화면에",
    struct: "짧은 히어로 → 벤토 그리드 10칸 → CTA. 섹션을 거의 쓰지 않습니다.",
    tone: "압축형. 카드당 한 문장으로 끊어 읽는 부담을 줄였습니다.",
  },
  {
    href: "/concept/e", tag: "시안 E", name: "Product Demo", sub: "Agentive형 · 딥슬레이트 + 바이올렛",
    bg: "#0f1117", fg: "#f1f5f9", sw: ["#0f1117", "#8b5cf6", "#f8fafc"],
    hook: "받아 보실 결과물은 이렇게 생겼습니다",
    struct: "히어로 + 검수 파일 목업 → 사용 3단계(라이트 반전) → 좌우 교차 상세 3",
    tone: "제품 데모형. 결과물을 먼저 보여주고 과정을 뒤에 둡니다.",
  },
  {
    href: "/concept/f", tag: "시안 F", name: "Composite", sub: "조합형 · 나스미디어 토큰", reco: true,
    bg: "#0a0e16", fg: "#eef2f8", sw: ["#0a0e16", "#3d8bfd", "#37d5a1"],
    hook: "사람들이 묻는 자리에 브랜드를 놓습니다",
    struct: "A의 히어로 + C의 지표 스트립 + D의 벤토 그리드 + A의 실행 단계",
    tone: "균형형. 기존 디자인 시스템 색을 그대로 써서 전환 비용이 가장 낮습니다.",
  },
];

export default function ConceptIndex() {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <span className={s.kicker}>INTERNAL · 검토용</span>
        <h1 className={s.title}>메인 페이지 시안 6종</h1>
        <p className={s.lead}>
          Figma 커뮤니티 템플릿 5종과 조합안 1종을 기반으로 만들었습니다.
          운영 페이지(<b>/</b>)와 이전 검토본(<b>/v2</b>, <b>/v3</b>)은 그대로 두었습니다.
        </p>

        <div className={s.rules}>
          <b>이번 시안의 규칙</b>
          <ul>
            <li>여섯 시안 모두 <b>구조와 문구가 다릅니다.</b> 같은 문장을 재사용하지 않았습니다.</li>
            <li>색은 각 템플릿이 제공하는 테마를 따랐습니다. <b>라이트/다크 토글은 채택된 시안에만</b> 구현합니다.</li>
            <li>수치는 성과 지표가 아니라 <b>시스템 구성값</b>(5단계·3유형·6단계·2중·15분)만 썼습니다.</li>
          </ul>
        </div>

        <div className={s.grid}>
          {ITEMS.map((it) => (
            <Link key={it.href} href={it.href} className={s.card} style={{ background: it.bg, color: it.fg }}>
              <div className={s.sw}>{it.sw.map((c) => <span key={c} style={{ background: c }} />)}</div>
              <span className={s.tag}>{it.tag}{it.reco && <em className={s.reco}>추천</em>}</span>
              <h2 className={s.name}>{it.name}</h2>
              <p className={s.sub}>{it.sub}</p>
              <p className={s.meta}><em>훅</em> — {it.hook}</p>
              <p className={s.meta}><em>구조</em> — {it.struct}</p>
              <p className={s.meta}><em>화법</em> — {it.tone}</p>
              <span className={s.go}>시안 보기 →</span>
            </Link>
          ))}
        </div>

        <div className={s.foot}>
          <Link href="/">운영 중인 메인 페이지</Link>
          <Link href="/v2">v2 (페이지 분리)</Link>
          <Link href="/v3">v3 (디자인 시스템)</Link>
          <Link href="/design">이전 시안 A/B</Link>
        </div>
      </div>
    </div>
  );
}
