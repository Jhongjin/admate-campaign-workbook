"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./e.module.css";
import { HeaderControls } from "./chrome";
import { getCopy, REVIEW_ROWS } from "./copy";
import { MAILTO, useInView, useTheme, type Variant } from "./hooks";

/* 시안 E — Agentive형 · 제품 데모 화법
   결과물(검수 파일)을 먼저 보여주고, 그것이 나오기까지를 뒤에서 설명합니다. */

export function ConceptE({ variant = "new" }: { variant?: Variant }) {
  const c = getCopy(variant);
  const { theme, toggle } = useTheme("e");
  const alt = useInView<HTMLDivElement>(s.in);
  const steps = c.steps.slice(0, 3);
  return (
    <div className={s.root} data-theme={theme}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#how">사용 흐름</a><a href="#detail">기능</a>
          </nav>
          <div className={s.navActs}>
            <HeaderControls slug="e" variant={variant} theme={theme} onToggleTheme={toggle}
              cls={{ toggle: s.toggle, swap: s.swap, btn: s.btn, sm: s.sm }} />
          </div>
        </div>
      </header>

      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.tag}>{c.hero.badge}</span>
          <h1 className={s.h1}>
            {variant === "legacy" ? "단순 키워드 매칭을 넘어," : "받아보실 결과물은"}
            <br /><em>{variant === "legacy" ? "대화의 맥락을 설계하다" : "이렇게 전달됩니다"}</em>
          </h1>
          <p className={s.sub}>{c.hero.sub}</p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
          </div>
          <p className={s.note}>{c.hero.note}</p>

          <div className={s.mock} aria-hidden="true">
            <div className={s.mockBar}><i /><i /><i /><span>검수 파일 · 광고 문안</span></div>
            <div className={s.tableHd}>
              <span>광고그룹</span><span>제목</span><span>본문</span><span>상태</span>
            </div>
            {REVIEW_ROWS.map((r, i) => (
              <div className={s.tableRow} key={i} style={{ animationDelay: `${i * 160 + 300}ms` }}>
                <span className={s.grp}>{r.g}</span>
                <div><p>{r.t}</p></div>
                <div><p>{r.c}</p></div>
                <span className={`${s.st} ${r.st === "통과" ? s.stOk : s.stWarn}`}>{r.st}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.secLight}`} id="how">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.usage.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.usage.title}</h2>
            <p className={s.lead}>{c.sections.usage.lead}</p>
          </div>
          <div className={s.three}>
            {steps.map((st, i) => (
              <div className={s.tCard} key={st.t}>
                <span className={s.tNo}>{i + 1}</span>
                <b>{st.t}</b><p>{st.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="detail" ref={alt.ref}>
        <div className={`${s.wrap} ${alt.cls}`}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.detail.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.detail.title}</h2>
          </div>
          <div className={s.alt}>
            <div className={s.altRow} style={{ animationDelay: "0ms" }}>
              <div className={s.altText}>
                <i>STEP 01 · GROUPING</i>
                <b>먼저 그룹을 나눕니다</b>
                <p>
                  상품과 세부 의도, 구매여정 단계를 기준으로 광고그룹을 나눕니다. 한 덩어리로 묶으면
                  어떤 문안을 써도 어중간해집니다.
                </p>
              </div>
              <div className={s.altVis}>
                <div className={s.vLine}><span className={`${s.vKey} ${s.vKeyOn}`}>AG-01</span><p>초등 영어 · 학습 부담</p></div>
                <div className={s.vLine}><span className={s.vKey}>AG-02</span><p>가족여행 · 성수기 가격</p></div>
                <div className={s.vLine}><span className={s.vKey}>AG-03</span><p>민감성 피부 · 성분 확인</p></div>
              </div>
            </div>

            <div className={s.altRow} style={{ animationDelay: "140ms" }}>
              <div className={s.altText}>
                <i>STEP 02 · CONTEXT</i>
                <b>그룹마다 표현을 넓힙니다</b>
                <p>
                  같은 주제라도 짧게 검색하듯 묻는 분, 질문으로 던지는 분, 사정을 풀어놓는 분이 있습니다.
                  세 가지로 나눠 각각에 맞는 자리를 만듭니다.
                </p>
              </div>
              <div className={s.altVis}>
                <div className={s.vLine}><span className={s.vKey}>검색어형</span><p>초등 영어 숙제 봐주는 방법</p></div>
                <div className={s.vLine}><span className={`${s.vKey} ${s.vKeyOn}`}>질문형</span><p>어떻게 쉽게 설명하죠?</p></div>
                <div className={s.vLine}><span className={s.vKey}>상황형</span><p>제가 영어를 못해서 어려워요</p></div>
              </div>
            </div>

            <div className={s.altRow} style={{ animationDelay: "280ms" }}>
              <div className={s.altText}>
                <i>STEP 03 · REVIEW</i>
                <b>쓴 다음 다시 읽습니다</b>
                <p>
                  생성한 문안을 검수 에이전트가 다시 확인하고, 글자수와 의미 중복, 표현 기준 위반을
                  자동으로 표시합니다. 그 결과가 위 화면의 상태 표시입니다.
                </p>
              </div>
              <div className={s.altVis}>
                <div className={s.vLine}><span className={`${s.vKey} ${s.vKeyOn}`}>통과</span><p>규격과 기준 모두 충족</p></div>
                <div className={s.vLine}><span className={s.vKey}>확인</span><p>표현 기준 재검토 필요</p></div>
                <div className={s.vLine}><span className={s.vKey}>반려</span><p>재생성 대상으로 표시</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <h2>{c.cta.title}</h2>
          <p>{c.cta.lead}</p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
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
