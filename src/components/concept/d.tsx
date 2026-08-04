"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./d.module.css";
import { HeaderControls } from "./chrome";
import { DEMO, getCopy } from "./copy";
import { MAILTO, useInView, useTheme, type Variant } from "./hooks";
import { Words, useMouseGlow } from "./hero-fx";

const TICKER = [
  { k: "검색어형", q: "초등 영어 화상수업 비용" },
  { k: "질문형", q: "아이가 영어를 싫어하는데 어떻게 시작하죠?" },
  { k: "상황형", q: "맞벌이라 저녁에만 봐줄 수 있어요" },
  { k: "검색어형", q: "제주 가족여행 호텔 조식 포함" },
  { k: "질문형", q: "아이랑 같이 묵을 수 있는 객실인가요?" },
  { k: "상황형", q: "성수기라 예산을 넘길까 봐 고민이에요" },
];

const CARDS = [
  { k: "01 · 광고그룹", t: "한 덩어리를 12개로 나눕니다", d: "상품과 세부 의도, 구매여정 단계를 기준으로 나눕니다." },
  { k: "02 · CONTEXT HINTS", t: "그룹마다 표현을 넓힙니다", d: "검색어형·질문형·상황형 세 갈래로 실제 말투를 모읍니다." },
  { k: "03 · 검수", t: "내보내기 전에 다시 봅니다", d: "글자수와 중복, 근거 없는 표현을 사람이 확인합니다." },
];

/** 히어로 카드 스택 — 3장이 차례로 앞으로 나옵니다. */
function Stack() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % CARDS.length), 3000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className={s.stack} aria-hidden="true">
      {CARDS.map((cd, ci) => {
        const off = (ci - i + CARDS.length) % CARDS.length;
        return (
          <div className={s.stackCard} key={cd.k}
            style={{
              transform: `translateY(${off * 16}px) scale(${1 - off * 0.05})`,
              opacity: off > 1 ? 0 : 1,
              zIndex: CARDS.length - off,
            }}>
            <i>{cd.k}</i><b>{cd.t}</b><p>{cd.d}</p>
          </div>
        );
      })}
    </div>
  );
}

const SPANS = [s.c4, s.c2, s.c2, s.c4, s.c3, s.c3, s.c2, s.c4, s.c3, s.c3];
const TONE = ["dark", "accent", "", "", "", "", "", "dark", "", "accent"];

export function ConceptD({ variant = "new" }: { variant?: Variant }) {
  const c = getCopy(variant);
  const { theme, toggle } = useTheme("d", "light");
  const grid = useInView<HTMLDivElement>(s.in);
  const [hint, setHint] = useState(1); // 첫 셀에서 눌러 보는 유형 칩
  const glow = useMouseGlow<HTMLElement>();

  const flow = ["자료 수집과 표준화", "광고그룹·Context Hints 설계", "제목·본문 생성", "글자수·중복·표현 기준 점검", "검수 파일 출력과 업로드"];

  return (
    <div className={s.root} data-theme={theme}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={38} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}><a href="#bento">한눈에 보기</a></nav>
          <div className={s.navActs}>
            <HeaderControls slug="d" variant={variant} theme={theme} onToggleTheme={toggle}
              cls={{ toggle: s.toggle, swap: s.swap, btn: s.btn, sm: s.sm }} />
          </div>
        </div>
      </header>

      <section className={s.hero} ref={glow}>
        <span className={`${s.orb} ${s.orb1}`} aria-hidden="true" />
        <span className={`${s.orb} ${s.orb2}`} aria-hidden="true" />
        <div className={`${s.wrap} ${s.heroLayer} ${s.heroGrid}`}>
          <div>
            <span className={`${s.tag} ${s.fadeUp}`}>{c.hero.badge}</span>
            <h1 className={s.h1}><Words text={c.hero.title.join(" ")} wordClass={s.word} delay={100} /></h1>
            <p className={`${s.sub} ${s.fadeUp}`} style={{ animationDelay: "620ms" }}>{c.hero.sub}</p>
            <div className={`${s.acts} ${s.fadeUp}`} style={{ animationDelay: "720ms" }}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
              <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
            </div>
            <p className={`${s.note} ${s.fadeUp}`} style={{ animationDelay: "800ms" }}>{c.hero.note}</p>
          </div>
          <div className={s.fadeUp} style={{ animationDelay: "360ms" }}><Stack /></div>
        </div>
      </section>

      {/* 실제로 오가는 질문들이 흘러갑니다 — 마우스를 올리면 멈춥니다 */}
      <div className={s.ticker} aria-hidden="true">
        <div className={s.tickerTrack}>
          {[...TICKER, ...TICKER].map((x, i) => (
            <span className={s.tickerItem} key={i}><b>{x.k}</b>{x.q}</span>
          ))}
        </div>
      </div>

      <section className={s.wrap} id="bento" ref={grid.ref}>
        <div className={`${s.bento} ${grid.cls}`}>
          {c.bento.map((cell, i) => {
            const tone = TONE[i] === "dark" ? s.dark : TONE[i] === "accent" ? s.accent : "";
            const isFirst = i === 0;
            const isNumber = /^\d/.test(cell.t) && cell.t.length < 6;
            const isFlow = cell.k === "PIPELINE";
            const isQuote = cell.k === "WHY IT MATTERS";
            return (
              <div className={`${s.cell} ${SPANS[i]} ${tone} ${isQuote ? s.quoteCell : ""}`}
                key={cell.k} style={{ animationDelay: `${i * 70}ms` }}>
                <i>{cell.k}</i>
                {isNumber ? (
                  <>
                    <span className={s.big}>{cell.t}</span>
                    <span className={s.bigLabel}>{cell.d}</span>
                  </>
                ) : (
                  <>
                    <b>{cell.t}</b>
                    {cell.d && <p>{cell.d}</p>}
                  </>
                )}

                {/* 첫 셀 — 칩을 눌러 실제 확장 예시를 바꿔 봅니다 */}
                {isFirst && (
                  <>
                    <div className={s.chips}>
                      {DEMO[0].hints.map((h, hi) => (
                        <button key={h.type} type="button"
                          className={`${s.chip} ${hi === hint ? s.chipOn : ""}`}
                          onClick={() => setHint(hi)}>{h.title}</button>
                      ))}
                    </div>
                    <p className={s.chipLine}>{DEMO[0].hints[hint].text}</p>
                  </>
                )}

                {isFlow && (
                  <div className={s.flowMini}>
                    {flow.map((f, fi) => <span key={f}><b>{fi + 1}</b>{f}</span>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <div className={s.ctaBox}>
            <h2>{c.cta.title}</h2>
            <p>{c.cta.lead}</p>
            <div className={s.ctaActs}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
              <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
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
