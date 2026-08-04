"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./c.module.css";
import { MAILTO } from "./use-reveal";

/* 시안 C — Premium형 · 근거와 신뢰 화법
   지표 스트립으로 시작해 기능을 아코디언으로 접고, 운영을 시간축으로 풀어냅니다. */

const STATS = [
  { n: "5단계", l: "수집부터 업로드까지\n하나의 파이프라인" },
  { n: "2중", l: "생성과 검수를 분리한\nAI 이중 구조" },
  { n: "3가지", l: "검색어·질문·상황\n발화 유형 확장" },
  { n: "15분", l: "브리프 작성에\n필요한 시간" },
];

const FEATURES = [
  { n: "01", t: "표현 기준을 먼저 받습니다", d: "쓰면 안 되는 문구와 브랜드 표기, 법무 검토 사항을 브리프 단계에서 확보합니다. 문안을 만든 뒤에 걸러 내는 것보다 처음부터 반영하는 편이 정확합니다." },
  { n: "02", t: "근거 없는 문장을 만들지 않습니다", d: "상품 소개와 랜딩 페이지에 없는 혜택이나 수치는 문안에 넣지 않습니다. 확인되지 않은 표현은 생성 단계에서 제외합니다." },
  { n: "03", t: "글자수와 중복을 기계적으로 확인합니다", d: "게재 규격을 넘는 문안과 의미가 겹치는 문안을 자동으로 표시합니다. 사람이 눈으로 세지 않아도 됩니다." },
  { n: "04", t: "검수 결과를 파일로 넘깁니다", d: "항목별 상태가 표시된 파일로 전달해, 광고주와 대행사가 같은 화면을 보고 승인하거나 반려할 수 있습니다." },
  { n: "05", t: "승인한 문안만 반영합니다", d: "검수를 통과하고 승인된 항목만 Ads Manager에 올립니다. 반려된 문안은 재생성 대상으로 남습니다." },
];

const TIMELINE = [
  { w: "DAY 0", t: "브리프 접수", d: "워크북에 캠페인 목표와 상품, 표현 기준을 적어 제출합니다." },
  { w: "DAY 0–1", t: "구조 설계", d: "상품과 세부 의도, 구매여정을 기준으로 광고그룹을 나누고 그룹별 Context Hints를 확정합니다." },
  { w: "DAY 1–2", t: "생성과 검수", d: "그룹마다 제목과 본문을 만들고, 검수 에이전트와 자동 검증을 차례로 통과시킵니다." },
  { w: "DAY 2–3", t: "확인과 승인", d: "검수 파일을 전달드립니다. 항목별로 승인하거나 수정 요청하시면 해당 그룹만 다시 만듭니다." },
  { w: "이후", t: "라이브와 리포트", d: "승인된 문안을 업로드해 캠페인을 시작하고 운영 현황을 정기적으로 공유합니다." },
];

const FAQ = [
  { q: "브리프를 내면 바로 광고가 나가나요?", a: "아니요. 담당자 확인과 광고주 승인을 거친 뒤에 진행됩니다. 제출만으로 게시되거나 비용이 발생하지 않습니다." },
  { q: "표현 기준이 까다로운 업종도 가능한가요?", a: "가능합니다. 금지 표현과 필수 고지 문구를 브리프에 적어 주시면 생성 단계부터 반영하고, 검수에서 한 번 더 확인합니다." },
  { q: "이미 쓰던 광고 문안을 넣어도 되나요?", a: "넣어 주시면 참고 자료로 씁니다. 다만 그대로 옮기지는 않습니다. 대화 맥락에 맞는 구조로 다시 설계합니다." },
  { q: "수정 요청은 몇 번까지 되나요?", a: "검수 파일에서 반려하신 항목은 다시 생성합니다. 횟수보다는 승인 가능한 문안이 나올 때까지 맞추는 것을 기준으로 합니다." },
];

export function ConceptC() {
  return (
    <div className={s.root}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#safe">검수 원칙</a><a href="#flow">진행 일정</a><a href="#faq">FAQ</a>
          </nav>
          <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
        </div>
      </header>

      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroIn}`}>
          <span className={s.tag}>KT그룹 미디어렙 · OpenAI Ads</span>
          <h1 className={s.h1}>확인되지 않은 문장은<br /><em>내보내지 않습니다</em></h1>
          <p className={s.sub}>
            대량으로 만드는 것보다 중요한 건, 내보내도 되는 문안인지 판단하는 일입니다.
            생성과 검수를 나눠 업로드 전에 걸러 냅니다.
          </p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
          </div>
          <p className={s.note}>제출만으로 광고 게시나 비용이 발생하지 않습니다.</p>
        </div>
      </section>

      <section className={s.stats}>
        <div className={`${s.wrap} ${s.statsIn}`}>
          {STATS.map((st) => (
            <div className={s.stat} key={st.n}>
              <b>{st.n}</b>
              <span>{st.l.split("\n").map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.sec} id="safe">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>REVIEW PRINCIPLES</span>
            <h2 className={s.h2}>다섯 가지 검수 원칙</h2>
            <p className={s.lead}>항목을 눌러 각 원칙이 실제로 어떻게 적용되는지 확인하실 수 있습니다.</p>
          </div>
          <div className={s.acc}>
            {FEATURES.map((f, i) => (
              <details className={s.accItem} key={f.n} open={i === 0}>
                <summary>
                  <span className={s.accNo}>{f.n}</span>
                  <span className={s.accTitle}>{f.t}</span>
                  <span className={s.accSign}>+</span>
                </summary>
                <p>{f.d}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="flow">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>TIMELINE</span>
            <h2 className={s.h2}>접수부터 라이브까지</h2>
            <p className={s.lead}>일정은 캠페인 규모와 검수 회차에 따라 달라질 수 있습니다.</p>
          </div>
          <div className={s.tl}>
            {TIMELINE.map((t) => (
              <div className={s.tlRow} key={t.t}>
                <span className={s.tlDot}><i /></span>
                <span className={s.tlWhen}>{t.w}</span>
                <b>{t.t}</b>
                <p>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="faq">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>FAQ</span>
            <h2 className={s.h2}>도입 전 확인하시는 것들</h2>
          </div>
          <div className={s.faq}>
            {FAQ.map((f) => (
              <details className={s.faqItem} key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <div className={s.ctaBox}>
            <h2>검수 기준부터 맞춰 보시겠어요</h2>
            <p>업종에 따라 지켜야 할 표현이 다릅니다. 브리프에 적어 주시면 그 기준으로 설계합니다.</p>
            <div className={s.acts}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
              <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
            </div>
          </div>
        </div>
      </section>

      <footer className={s.foot}>
        <div className={`${s.wrap} ${s.footIn}`}>
          <span>㈜나스미디어 · KT그룹 미디어렙</span>
          <span><a href={MAILTO}>openai@nasmedia.co.kr</a> · <Link href="/concept">시안 목록</Link></span>
        </div>
      </footer>
    </div>
  );
}
