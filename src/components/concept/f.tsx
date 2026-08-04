"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./f.module.css";
import { HeaderControls } from "./chrome";
import { DEMO, getCopy } from "./copy";
import { MAILTO, useCountUp, useInView, useTheme, type Variant } from "./hooks";

const SPANS = [s.c4, s.c2, s.c2, s.c4, s.c3, s.c3];
const TONE = [s.accent, "", "", s.pos, "", ""];

/** 히어로 — 단어가 순환하며 바뀌는 동적 요소 */
function Rotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      setFade(false);
      window.setTimeout(() => { setI((v) => (v + 1) % words.length); setFade(true); }, 240);
    }, 2600);
    return () => window.clearInterval(t);
  }, [words.length]);
  return (
    <em className={s.rotate} style={{ opacity: fade ? 1 : 0, transition: "opacity .24s ease" }}>
      {words[i]}
    </em>
  );
}

function Stat({ n, l, on }: { n: string; l: string; on: boolean }) {
  const num = parseInt(n, 10) || 0;
  const suffix = n.replace(/^\d+/, "");
  const v = useCountUp(num, on);
  return <div className={s.stat}><b>{v}{suffix}</b><span>{l}</span></div>;
}

export function ConceptF({ variant = "new" }: { variant?: Variant }) {
  const c = getCopy(variant);
  const { theme, toggle } = useTheme("f");
  const stats = useInView<HTMLDivElement>("");
  const grid = useInView<HTMLDivElement>(s.in);
  const [open, setOpen] = useState(0);
  const [hint, setHint] = useState(1);

  const words = variant === "legacy" ? ["질문", "상황", "고민"] : ["질문", "고민", "상황"];

  return (
    <div className={s.root} data-theme={theme}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={48} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#what">무엇을 하나</a><a href="#how">어떻게 하나</a>
          </nav>
          <div className={s.navActs}>
            <HeaderControls slug="f" variant={variant} theme={theme} onToggleTheme={toggle}
              cls={{ toggle: s.toggle, swap: s.swap, btn: s.btn, sm: s.sm }} />
          </div>
        </div>
      </header>

      <section className={`${s.hero} ${s.gridBg}`}>
        <div className={s.wrap}>
          <span className={s.pill}><i />{c.hero.badge}</span>
          <h1 className={s.h1}>
            사람들이 <Rotator words={words} />을 던지는 자리에<br />브랜드를 놓습니다
          </h1>
          <p className={s.sub}>{c.hero.sub}</p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
          </div>
          <p className={s.note}>{c.hero.note}</p>
        </div>
      </section>

      <section className={s.stats} ref={stats.ref}>
        <div className={`${s.wrap} ${s.statsIn}`}>
          {c.stats.map((st) => <Stat key={st.l} n={st.n} l={st.l} on={stats.on} />)}
        </div>
      </section>

      <section className={s.sec} id="what" ref={grid.ref}>
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.bento.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.bento.title}</h2>
            <p className={s.lead}>{c.sections.bento.lead}</p>
          </div>
          <div className={`${s.bento} ${grid.cls}`}>
            {c.bento.slice(0, 6).map((cell, i) => {
              const isNumber = /^\d/.test(cell.t) && cell.t.length < 6;
              return (
                <div className={`${s.cell} ${SPANS[i]} ${TONE[i]}`} key={cell.k} style={{ animationDelay: `${i * 90}ms` }}>
                  <i>{cell.k}</i>
                  {isNumber ? (
                    <><span className={s.big}>{cell.t}</span><p>{cell.d}</p></>
                  ) : (
                    <><b>{cell.t}</b>{cell.d && <p>{cell.d}</p>}</>
                  )}
                  {i === 0 && (
                    <>
                      <div className={s.chips}>
                        {DEMO[0].hints.map((h, hi) => (
                          <button key={h.type} type="button"
                            className={`${s.chip} ${hi === hint ? (hi === 2 ? s.chipP : s.chipA) : ""}`}
                            onClick={() => setHint(hi)}>{h.title}</button>
                        ))}
                      </div>
                      <p className={s.chipLine}>{DEMO[0].hints[hint].text}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={s.sec} id="how">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.how.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.how.title}</h2>
            <p className={s.lead}>{c.sections.how.lead}</p>
          </div>
          <div className={s.steps}>
            {c.steps.map((st, i) => (
              <button type="button" key={st.t}
                className={`${s.step} ${open === i ? s.stepOn : ""}`}
                onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className={s.stepNo}>{st.k}</span>
                <span>
                  <b>{st.t}</b>
                  <span className={`${s.stepBody} ${open === i ? s.stepBodyOn : ""}`}><p>{st.d}</p></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.cta} ${s.gridBg}`}>
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
