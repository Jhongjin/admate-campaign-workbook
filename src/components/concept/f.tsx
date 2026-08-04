"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./f.module.css";
import { HeaderControls } from "./chrome";
import { DEMO, getCopy } from "./copy";
import { MAILTO, useCountUp, useInView, useTheme, type Variant } from "./hooks";
import { useMouseGlow } from "./hero-fx";

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

/** 히어로 대화 시뮬레이션 — 질문에서 광고가 놓이기까지를 반복 재생합니다. */
function ChatDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const gaps = [900, 1200, 1000, 1400, 2600];
    const t = window.setTimeout(() => setStep((v) => (v + 1) % 5), gaps[step]);
    return () => window.clearTimeout(t);
  }, [step]);

  return (
    <div className={s.chat} aria-hidden="true">
      <div className={s.chatHd}><i />대화 예시 · 초등 영어</div>
      <div className={s.chatBody}>
        {step >= 1 && (
          <div className={`${s.bubble} ${s.bUser}`}>아이가 영어를 싫어하는데 어떻게 시작해야 할까요?</div>
        )}
        {step === 2 && <div className={s.typing}><i /><i /><i /></div>}
        {step >= 3 && (
          <div className={`${s.bubble} ${s.bAi}`}>
            처음에는 짧게, 자주 접하는 방식이 부담이 적습니다. 아이가 흥미를 붙일 만한 소재부터 시작해 보세요.
          </div>
        )}
        {step >= 4 && (
          <div className={s.adCard}>
            <span className={s.adTag}>SPONSORED</span>
            <strong>숙제 봐주다 지치는 저녁이라면</strong>
            <p>단어·문장·말하기를 반복 훈련하며 실제 실력으로 이어가요.</p>
          </div>
        )}
      </div>
      <p className={s.chatCap}>질문이 오가는 흐름을 읽고, 그 맥락에 맞는 문안을 준비합니다.</p>
    </div>
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
  const glow = useMouseGlow<HTMLElement>();

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

      <section className={`${s.hero} ${s.gridBg}`} ref={glow}>
        <span className={`${s.orb} ${s.orb1}`} aria-hidden="true" />
        <span className={`${s.orb} ${s.orb2}`} aria-hidden="true" />
        <div className={`${s.wrap} ${s.heroLayer}`}>
          <span className={`${s.pill} ${s.fadeUp}`}><i />{c.hero.badge}</span>
          <h1 className={s.h1}>
            <span className={s.fadeUp} style={{ animationDelay: "120ms", display: "inline-block" }}>사람들이</span>{" "}
            <Rotator words={words} />
            <span className={s.fadeUp} style={{ animationDelay: "260ms", display: "inline-block" }}>을 던지는 자리에</span>
            <br />
            <span className={s.fadeUp} style={{ animationDelay: "400ms", display: "inline-block" }}>브랜드를 놓습니다</span>
          </h1>
          <p className={`${s.sub} ${s.fadeUp}`} style={{ animationDelay: "560ms" }}>{c.hero.sub}</p>
          <div className={`${s.acts} ${s.fadeUp}`} style={{ animationDelay: "660ms" }}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
          </div>
          <p className={`${s.note} ${s.fadeUp}`} style={{ animationDelay: "740ms" }}>{c.hero.note}</p>
          <div className={s.fadeUp} style={{ animationDelay: "840ms" }}><ChatDemo /></div>
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
