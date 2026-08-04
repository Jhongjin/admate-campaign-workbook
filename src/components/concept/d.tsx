"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./d.module.css";
import { HeaderControls } from "./chrome";
import { DEMO, getCopy } from "./copy";
import { MAILTO, useInView, useTheme, type Variant } from "./hooks";

const SPANS = [s.c4, s.c2, s.c2, s.c4, s.c3, s.c3, s.c2, s.c4, s.c3, s.c3];
const TONE = ["dark", "accent", "", "", "", "", "", "dark", "", "accent"];

export function ConceptD({ variant = "new" }: { variant?: Variant }) {
  const c = getCopy(variant);
  const { theme, toggle } = useTheme("d", "light");
  const grid = useInView<HTMLDivElement>(s.in);
  const [hint, setHint] = useState(1); // 첫 셀에서 눌러 보는 유형 칩

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

      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.tag}>{c.hero.badge}</span>
          <h1 className={s.h1}>{c.hero.title.join(" ")}</h1>
          <p className={s.sub}>{c.hero.sub}</p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
          </div>
          <p className={s.note}>{c.hero.note}</p>
        </div>
      </section>

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
