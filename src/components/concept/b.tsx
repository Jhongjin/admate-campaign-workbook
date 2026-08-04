"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./b.module.css";
import { HeaderControls } from "./chrome";
import { BA, DEMO, getCopy } from "./copy";
import { MAILTO, useAutoRotate, useCountUp, useInView, useTheme, type Variant } from "./hooks";

const KEYS = [s.k1, s.k2, s.k3];

function Stat({ n, l, on }: { n: string; l: string; on: boolean }) {
  const num = parseInt(n, 10) || 0;
  const suffix = n.replace(/^\d+/, "");
  const v = useCountUp(num, on);
  return <div className={s.stat}><b>{v}{suffix}</b><span>{l}</span></div>;
}

export function ConceptB({ variant = "new" }: { variant?: Variant }) {
  const c = getCopy(variant);
  const { theme, toggle } = useTheme("b");
  const stats = useInView<HTMLDivElement>("");
  const [open, setOpen] = useState(0);
  const [after, setAfter] = useState(true);
  const demo = useAutoRotate(DEMO.length);
  const d = DEMO[demo.i];

  return (
    <div className={s.root} data-theme={theme}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#funnel">구매여정</a><a href="#copy">문안</a><a href="#ops">운영</a>
          </nav>
          <div className={s.navActs}>
            <HeaderControls slug="b" variant={variant} theme={theme} onToggleTheme={toggle}
              cls={{ toggle: s.toggle, swap: s.swap, btn: s.btn, sm: s.sm }} />
          </div>
        </div>
      </header>

      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroIn}`}>
          <div>
            <span className={s.tag}>{c.hero.badge}</span>
            <h1 className={s.h1}>{c.hero.title[0]}<br />{c.hero.title[1]}</h1>
            <p className={s.sub}>{c.hero.sub}</p>
            <div className={s.acts}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
              <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
            </div>
            <p className={s.note}>{c.hero.note}</p>
          </div>

          {/* 히어로 동적 요소 — 업종이 자동으로 넘어가고, 탭을 누르면 멈춥니다 */}
          <div className={s.panel}>
            <div className={s.panelHd}>
              <span>확장 결과</span>
              <div className={s.tabs}>
                {DEMO.map((t, i) => (
                  <button key={t.label} type="button" className={`${s.tab} ${i === demo.i ? s.tabOn : ""}`}
                    onClick={() => demo.pick(i)}>{t.label}</button>
                ))}
              </div>
            </div>
            <div className={s.split} key={demo.i}>
              {d.hints.map((h, i) => (
                <div className={s.splitRow} key={h.type} style={{ animationDelay: `${i * 140}ms` }}>
                  <span className={`${s.splitKey} ${KEYS[i]}`}>{h.title}</span>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
            <p className={s.seed}>광고주가 제공한 키워드<b>{d.seed}</b></p>
          </div>
        </div>
      </section>

      <section className={s.stats} ref={stats.ref}>
        <div className={`${s.wrap} ${s.statsIn}`}>
          {c.stats.map((st) => <Stat key={st.l} n={st.n} l={st.l} on={stats.on} />)}
        </div>
      </section>

      <section className={s.sec} id="funnel">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.funnel.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.funnel.title}</h2>
            <p className={s.lead}>{c.sections.funnel.lead}</p>
          </div>
          <div className={s.funnel}>
            {c.funnel.map((f, i) => (
              <button type="button" key={f.t} className={`${s.fRow} ${open === i ? s.fOn : ""}`}
                onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className={s.fNo}>{f.k}</span>
                <span>
                  <b>{f.t}</b>
                  <span className={`${s.fBody} ${open === i ? s.fBodyOn : ""}`}><p>{f.d}</p></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.secAlt}`} id="copy">
        <div className={s.wrap}>
          <div className={s.hd} style={{ margin: "0 auto 40px", textAlign: "center" }}>
            <span className={s.eyebrow}>{c.sections.copy.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.copy.title}</h2>
            <p className={s.lead}>{c.sections.copy.lead}</p>
          </div>
          {/* 스위치로 전후를 바꿔 봅니다 */}
          <div className={s.switchWrap}>
            <button type="button" className={`${s.switch} ${!after ? s.switchOn : ""}`} onClick={() => setAfter(false)}>원본</button>
            <button type="button" className={`${s.switch} ${after ? s.switchOn : ""}`} onClick={() => setAfter(true)}>생성본</button>
          </div>
          {after ? (
            <div className={`${s.cCard} ${s.cOn}`}>
              <h3>{BA.after.label}</h3>
              <div className={s.cLine}><i>{BA.after.title.kind}</i><p>{BA.after.title.text}</p></div>
              <div className={s.cLine}><i>{BA.after.copy.kind}</i><p>{BA.after.copy.text}</p></div>
              <p className={s.cNote}>{BA.after.insight}</p>
            </div>
          ) : (
            <div className={s.cCard}>
              <h3>{BA.before.label}</h3>
              <div className={s.cLine}>
                <i>{BA.before.kind}</i>
                <p>{BA.before.lines[0]}<br />{BA.before.lines[1]}</p>
              </div>
              <p className={s.cNote}>{BA.before.insight}</p>
            </div>
          )}
        </div>
      </section>

      <section className={s.sec} id="ops">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.ops.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.ops.title}</h2>
            <p className={s.lead}>{c.sections.ops.lead}</p>
          </div>
          <div className={s.funnel}>
            {c.steps.map((x, i) => (
              <button type="button" key={x.t} className={`${s.fRow} ${open === 100 + i ? s.fOn : ""}`}
                onClick={() => setOpen(open === 100 + i ? -1 : 100 + i)} aria-expanded={open === 100 + i}>
                <span className={s.fNo}>{x.k}</span>
                <span>
                  <b>{x.t}</b>
                  <span className={`${s.fBody} ${open === 100 + i ? s.fBodyOn : ""}`}><p>{x.d}</p></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <h2>{c.cta.title}</h2>
          <p>{c.cta.lead}</p>
          <div className={s.ctaActs}>
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
