"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./f.module.css";
import { MAILTO } from "./use-reveal";

/* 시안 F — 조합형(추천)
   A의 중앙 히어로 + C의 지표 스트립 + D의 벤토 그리드 + A의 실행 단계.
   색은 나스미디어 토큰(블루/민트)을 그대로 씁니다. */

const STATS = [
  { n: "5단계", l: "수집 → 업로드 파이프라인" },
  { n: "3가지", l: "발화 유형 확장" },
  { n: "6단계", l: "구매여정 분류" },
  { n: "2중", l: "생성·검수 분리" },
];

const STEPS = [
  { n: "01", t: "브리프를 받습니다", d: "상품과 타깃, 표현 기준을 워크북에 적어 주시면 그것으로 시작합니다." },
  { n: "02", t: "구조를 설계합니다", d: "광고그룹을 나누고 그룹마다 어떤 발화에 붙을지 확정합니다." },
  { n: "03", t: "문안을 만듭니다", d: "상황을 짚는 제목과 해결을 제시하는 본문을 짝으로 생성합니다." },
  { n: "04", t: "다시 읽습니다", d: "검수 에이전트와 자동 검증이 표현 기준과 규격을 확인합니다." },
  { n: "05", t: "승인분만 올립니다", d: "검수 파일로 확인하시고 승인한 문안만 Ads Manager에 반영합니다." },
];

export function ConceptF() {
  return (
    <div className={s.root}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={48} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#what">무엇을 하나</a><a href="#how">어떻게 하나</a>
          </nav>
          <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
        </div>
      </header>

      <section className={`${s.hero} ${s.gridBg}`}>
        <div className={s.wrap}>
          <span className={s.pill}><i />KT그룹 미디어렙 · OpenAI Ads</span>
          <h1 className={s.h1}>사람들이 <em>묻는 자리</em>에<br />브랜드를 놓습니다</h1>
          <p className={s.sub}>
            ChatGPT 광고는 검색어가 아니라 대화에 반응합니다. 그 대화를 읽고 광고그룹을 나누는 일부터
            문안을 쓰고 검수하는 일까지 맡습니다.
          </p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
          </div>
          <p className={s.note}>제출만으로 광고가 게시되거나 비용이 발생하지 않습니다.</p>
        </div>
      </section>

      <section className={s.stats}>
        <div className={`${s.wrap} ${s.statsIn}`}>
          {STATS.map((st) => (
            <div className={s.stat} key={st.l}><b>{st.n}</b><span>{st.l}</span></div>
          ))}
        </div>
      </section>

      <section className={s.sec} id="what">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>WHAT WE DO</span>
            <h2 className={s.h2}>맡아 드리는 범위</h2>
            <p className={s.lead}>브리프 이후의 판단과 반복 작업을 넘겨받습니다.</p>
          </div>
          <div className={s.bento}>
            <div className={`${s.cell} ${s.c4} ${s.accent}`}>
              <i>CONTEXT HINTS</i>
              <b>키워드 하나를 세 갈래 발화로 넓힙니다</b>
              <p>짧게 검색하듯 묻는 사람, 질문으로 던지는 사람, 사정을 풀어놓는 사람. 각각에 맞는 자리를 따로 만듭니다.</p>
              <div className={s.chips}>
                <span className={s.chip}>검색어형</span>
                <span className={`${s.chip} ${s.chipA}`}>질문형</span>
                <span className={`${s.chip} ${s.chipP}`}>상황형</span>
              </div>
            </div>

            <div className={`${s.cell} ${s.c2}`}>
              <i>GROUPING</i>
              <span className={s.big}>6단계</span>
              <p>구매여정 단계별로 광고그룹을 나눕니다.</p>
            </div>

            <div className={`${s.cell} ${s.c2}`}>
              <i>BRIEF</i>
              <span className={s.big}>15분</span>
              <p>워크북 작성에 드는 시간입니다.</p>
            </div>

            <div className={`${s.cell} ${s.c4} ${s.pos}`}>
              <i>DUAL AI AGENT</i>
              <b>쓰는 AI와 읽는 AI를 나눴습니다</b>
              <p>한 번 만들고 끝내지 않습니다. 생성한 문안을 다른 에이전트가 다시 읽고 연결성과 설득력을 확인합니다.</p>
            </div>

            <div className={`${s.cell} ${s.c3}`}>
              <i>GUARDRAIL</i>
              <b>업로드 전에 걸러 냅니다</b>
              <p>글자수 초과와 의미 중복, 쓰면 안 되는 표현을 미리 표시합니다.</p>
            </div>

            <div className={`${s.cell} ${s.c3}`}>
              <i>HANDOFF</i>
              <b>검수 파일로 확인하십니다</b>
              <p>항목별로 승인하거나 반려할 수 있고, 반려분만 다시 만듭니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.sec} id="how">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>HOW IT RUNS</span>
            <h2 className={s.h2}>다섯 번의 실행</h2>
            <p className={s.lead}>광고주와 대행사가 움직이는 건 1번과 5번, 두 번뿐입니다.</p>
          </div>
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

      <section className={`${s.cta} ${s.gridBg}`}>
        <div className={s.wrap}>
          <h2>어떤 대화에서 우리 브랜드가 나와야 할까요</h2>
          <p>브리프를 주시면 그 질문부터 함께 정리해 드립니다.</p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
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
