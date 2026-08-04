"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./a.module.css";
import { HeaderControls } from "./chrome";
import { getCopy } from "./copy";
import { MAILTO, useInView, useTheme, type Variant } from "./hooks";

const SIDE = ["실행 현황", "광고그룹", "Context Hints", "문안", "검수 결과"];
const JOBS = [
  { t: "광고그룹 12개로 분할", s: "구매여정 6단계 · 세부 의도 기준" },
  { t: "Context Hints 36건 확장", s: "검색어형 12 · 질문형 12 · 상황형 12" },
  { t: "제목·본문 생성", s: "그룹 12개 · 문안 48건" },
  { t: "표현 기준 검수", s: "글자수 · 중복 · 금지 표현 확인" },
];

/** 히어로 콘솔 — 작업이 차례로 끝나는 모습을 반복 재생합니다. */
function Console() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setStep((v) => (v + 1) % (JOBS.length + 1)), 1800);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className={s.console} aria-hidden="true">
      <div className={s.consoleBar}><span /><span /><span /><b>운영 콘솔</b></div>
      <div className={s.consoleBody}>
        <div className={s.consoleSide}>
          {SIDE.map((x, i) => (
            <div key={x} className={`${s.sideItem} ${i === Math.min(step, SIDE.length - 1) ? s.sideOn : ""}`}>{x}</div>
          ))}
        </div>
        <div className={s.consoleMain}>
          {JOBS.map((j, i) => {
            const done = i < step;
            const running = i === step;
            return (
              <div className={`${s.jobRow} ${running ? s.jobActive : ""}`} key={j.t}>
                <p>{j.t}<small>{j.s}</small></p>
                <span className={`${s.badge} ${done ? s.bDone : running ? s.bRun : s.bWait}`}>
                  {done ? "완료" : running ? "진행" : "대기"}
                </span>
                {running && <span className={s.bar}><span className={s.barFill} style={{ width: "62%" }} /></span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ConceptA({ variant = "new" }: { variant?: Variant }) {
  const c = getCopy(variant);
  const { theme, toggle } = useTheme("a");
  const v = useInView<HTMLDivElement>(s.in);
  const f = useInView<HTMLDivElement>(s.in);
  const [open, setOpen] = useState(0);

  return (
    <div className={s.root} data-theme={theme}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>{c.nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
          <div className={s.navActs}>
            <HeaderControls slug="a" variant={variant} theme={theme} onToggleTheme={toggle}
              cls={{ toggle: s.toggle, swap: s.swap, btn: s.btn, sm: s.sm }} />
          </div>
        </div>
      </header>

      <section className={`${s.hero} ${s.glow}`}>
        <div className={s.wrap}>
          <span className={s.pill}><i />{c.hero.badge}</span>
          <h1 className={s.h1}>
            {c.hero.title[0]}<br />{c.hero.title[1]}
          </h1>
          <p className={s.sub}>{c.hero.sub}</p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
          </div>
          <p className={s.note}>{c.hero.note}</p>
          <Console />
        </div>
      </section>

      <section className={s.sec} id="value" ref={v.ref}>
        <div className={`${s.wrap} ${v.cls}`}>
          <span className={s.eyebrow}>{c.sections.value.eyebrow}</span>
          <h2 className={s.h2}>{c.sections.value.title}</h2>
          <p className={s.lead}>{c.sections.value.lead}</p>
          <div className={s.three}>
            {c.values.map((x, i) => (
              <div className={s.vCard} key={x.t} style={{ animationDelay: `${i * 120}ms` }}>
                <i className={s.vIcon}>{["◇", "◈", "◉"][i]}</i>
                <b>{x.t}</b><p>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.secAlt}`} id="feature" ref={f.ref}>
        <div className={`${s.wrap} ${f.cls}`}>
          <span className={s.eyebrow}>{c.sections.feature.eyebrow}</span>
          <h2 className={s.h2}>{c.sections.feature.title}</h2>
          <div className={s.grid6}>
            {c.features.map((x, i) => (
              <div className={s.fCard} key={x.t} style={{ animationDelay: `${i * 90}ms` }}>
                <i>{x.k}</i><b>{x.t}</b><p>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="how">
        <div className={s.wrap}>
          <span className={s.eyebrow}>{c.sections.how.eyebrow}</span>
          <h2 className={s.h2}>{c.sections.how.title}</h2>
          <p className={s.lead}>{c.sections.how.lead}</p>
          <div className={s.steps}>
            {c.steps.map((x, i) => (
              <button
                type="button" key={x.t}
                className={`${s.step} ${open === i ? s.stepOn : ""}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className={s.stepNo}>{x.k}</span>
                <span className={s.stepHd}>
                  <b>{x.t}</b>
                  <span className={`${s.stepBody} ${open === i ? s.stepBodyOn : ""}`}><p>{x.d}</p></span>
                </span>
                <span className={s.stepSign}>+</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <div className={s.ctaBox}>
            <h2>{c.cta.title}</h2>
            <p>{c.cta.lead}</p>
            <div className={s.acts}>
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
