"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./a.module.css";
import { MAILTO, useReveal } from "./use-reveal";

/* 시안 A — Agentix형 · 에이전트 플랫폼 화법
   문제 제기로 열고, 운영 콘솔을 보여준 뒤, 가치 3 → 기능 6 → 실행 5단계로 좁힙니다. */

const VALUES = [
  { i: "◇", t: "맥락을 읽습니다", d: "검색어가 아니라 질문과 상황을 기준으로 광고그룹을 나눕니다." },
  { i: "◈", t: "스스로 씁니다", d: "구매여정 단계에 맞는 제목과 본문을 그룹 수만큼 만들어 냅니다." },
  { i: "◉", t: "스스로 검수합니다", d: "생성한 문안을 다른 에이전트가 다시 읽고 걸러 냅니다." },
];

const FEATURES = [
  { i: "INTAKE", t: "브리프 한 장", d: "상품·타깃·표현 기준을 워크북에 적으면 나머지 입력은 필요 없습니다." },
  { i: "GROUPING", t: "광고그룹 자동 분할", d: "상품과 세부 의도, 구매여정을 기준으로 그룹을 촘촘하게 나눕니다." },
  { i: "CONTEXT", t: "Context Hints 확장", d: "키워드 하나를 검색어형·질문형·상황형 세 갈래 발화로 넓힙니다." },
  { i: "CREATIVE", t: "제목·본문 생성", d: "고민을 건드리는 제목과 해결을 제시하는 본문을 짝으로 씁니다." },
  { i: "GUARDRAIL", t: "업로드 전 차단", d: "글자수 초과와 의미 중복, 표현 기준 위반을 미리 표시합니다." },
  { i: "HANDOFF", t: "검수 파일 출력", d: "항목별로 승인·반려할 수 있는 파일로 내려받아 확인합니다." },
];

const STEPS = [
  { n: "01", t: "워크북 작성", d: "캠페인 목표와 상품, 쓰면 안 되는 표현을 적습니다." },
  { n: "02", t: "그룹·힌트 설계", d: "에이전트가 광고그룹을 나누고 그룹별 Context Hints를 확정합니다." },
  { n: "03", t: "문안 생성", d: "그룹마다 제목과 본문을 생성합니다." },
  { n: "04", t: "이중 검수", d: "검수 에이전트가 연결성과 표현 기준을 다시 확인합니다." },
  { n: "05", t: "승인 후 업로드", d: "승인한 문안만 Ads Manager로 올립니다." },
];

const JOBS = [
  { t: "광고그룹 12개 분할 완료", s: "구매여정 6단계 · 세부 의도 기준", b: "완료", c: "bDone" },
  { t: "Context Hints 36건 확장", s: "검색어형 12 · 질문형 12 · 상황형 12", b: "완료", c: "bDone" },
  { t: "제목·본문 생성 중", s: "그룹 8 / 12 진행", b: "진행", c: "bRun" },
  { t: "표현 기준 검수 대기", s: "생성 완료 후 자동 시작", b: "대기", c: "bWait" },
];

export function ConceptA() {
  const con = useReveal<HTMLDivElement>(s.in);
  return (
    <div className={s.root}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#value">무엇이 다른가</a><a href="#feature">기능</a><a href="#how">진행</a>
          </nav>
          <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
        </div>
      </header>

      <section className={`${s.hero} ${s.glow}`}>
        <div className={s.wrap}>
          <span className={s.pill}><i />OpenAI Ads · Context Creative Agent</span>
          <h1 className={s.h1}>카피를 <em>손으로 쓰는 일</em>은<br />여기서 끝냅니다</h1>
          <p className={s.sub}>
            브리프 한 장을 넣으면 에이전트가 광고그룹을 나누고, 대화 맥락에 맞는 문안을 만들고,
            스스로 검수까지 마칩니다.
          </p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
          </div>
          <p className={s.note}>제출한다고 광고가 바로 나가지 않습니다. 검토 후 진행합니다.</p>

          <div className={`${s.console} ${con.cls}`} ref={con.ref} aria-hidden="true">
            <div className={s.consoleBar}><span /><span /><span />운영 콘솔</div>
            <div className={s.consoleBody}>
              <div className={s.consoleSide}>
                <div className={`${s.sideItem} ${s.sideOn}`}>실행 현황</div>
                <div className={s.sideItem}>광고그룹</div>
                <div className={s.sideItem}>Context Hints</div>
                <div className={s.sideItem}>문안</div>
                <div className={s.sideItem}>검수 결과</div>
              </div>
              <div className={s.consoleMain}>
                {JOBS.map((j, i) => (
                  <div className={s.jobRow} key={j.t} style={{ animationDelay: `${i * 130}ms` }}>
                    <div><p>{j.t}<small>{j.s}</small></p></div>
                    <span className={`${s.badge} ${s[j.c]}`}>{j.b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.sec} id="value">
        <div className={s.wrap}>
          <span className={s.eyebrow}>WHY AGENT</span>
          <h2 className={s.h2}>사람이 하던 세 가지를 대신합니다</h2>
          <p className={s.lead}>도구를 하나 더 쓰는 게 아니라, 반복되는 판단을 넘겨받습니다.</p>
          <div className={s.three}>
            {VALUES.map((v) => (
              <div className={s.vCard} key={v.t}>
                <i className={s.vIcon}>{v.i}</i>
                <b>{v.t}</b><p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.secAlt}`} id="feature">
        <div className={s.wrap}>
          <span className={s.eyebrow}>CAPABILITIES</span>
          <h2 className={s.h2}>접수부터 업로드까지 한 줄로</h2>
          <div className={s.grid6}>
            {FEATURES.map((f) => (
              <div className={s.fCard} key={f.t}>
                <i>{f.i}</i><b>{f.t}</b><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="how">
        <div className={s.wrap}>
          <span className={s.eyebrow}>HOW IT RUNS</span>
          <h2 className={s.h2}>다섯 번의 실행</h2>
          <div className={s.steps}>
            {STEPS.map((st) => (
              <div className={s.step} key={st.n}>
                <span className={s.stepNo}>{st.n}</span>
                <div><b>{st.t}</b><p>{st.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <div className={s.ctaBox}>
            <h2>먼저 브리프 한 장부터</h2>
            <p>작성에 걸리는 시간은 15분 남짓입니다. 나머지는 저희가 이어받습니다.</p>
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
          <span><a href={MAILTO}>{"openai@nasmedia.co.kr"}</a> · <Link href="/concept">시안 목록</Link></span>
        </div>
      </footer>
    </div>
  );
}
