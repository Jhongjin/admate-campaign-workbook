"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./c.module.css";
import { HeaderControls } from "./chrome";
import { getCopy } from "./copy";
import { MAILTO, useCountUp, useInView, useTheme, type Variant } from "./hooks";
import { Words, useMouseGlow } from "./hero-fx";

/** 히어로 — 문장 뒷부분이 타이핑되며 반복 재생됩니다. */
function Typed({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [back, setBack] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setLen(words[0].length);
      return;
    }
    const w = words[i];
    const done = !back && len === w.length;
    const empty = back && len === 0;
    const delay = done ? 1600 : empty ? 260 : back ? 45 : 90;
    const t = window.setTimeout(() => {
      if (done) setBack(true);
      else if (empty) { setBack(false); setI((v) => (v + 1) % words.length); }
      else setLen((v) => v + (back ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [i, len, back, words]);
  return <em>{words[i].slice(0, len)}<span className={s.caret} /></em>;
}

const SCAN = [
  { t: "숙제 봐주다 지치는 저녁이라면?", s: "AG-01 · 제목 · 15자", st: "통과" },
  { t: "단어·문장·말하기를 반복 훈련하며 실제 실력으로 이어가요.", s: "AG-01 · 본문 · 31자", st: "통과" },
  { t: "누구나 3주면 원어민처럼 말할 수 있습니다", s: "AG-02 · 제목 · 근거 없음", st: "보류" },
  { t: "아이 동반 가능한 객실만 모아 비교해 보세요.", s: "AG-03 · 본문 · 24자", st: "통과" },
];

/** 스캔선이 훑고 지나가면 항목마다 검수 도장이 찍힙니다. */
function ScanDoc() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setN((v) => (v + 1) % (SCAN.length + 2)), 850);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className={s.scan} aria-hidden="true">
      <span className={s.scanBeam} />
      <div className={s.scanHd}><span>업로드 전 검수</span><span>{Math.min(n, SCAN.length)} / {SCAN.length}</span></div>
      {SCAN.map((r, i) => (
        <div className={s.scanRow} key={r.t}>
          <div><p>{r.t}</p><small>{r.s}</small></div>
          {i < n
            ? <span className={`${s.stamp} ${r.st === "통과" ? s.stampOk : s.stampWarn}`}>{r.st}</span>
            : <span className={s.stampWait}>검수 중</span>}
        </div>
      ))}
    </div>
  );
}

function Stat({ n, l, on }: { n: string; l: string; on: boolean }) {
  const num = parseInt(n, 10) || 0;
  const suffix = n.replace(/^\d+/, "");
  const v = useCountUp(num, on);
  return (
    <div className={s.stat}>
      <b>{v}{suffix}</b>
      <span>{l.split("\n").map((x, i) => <span key={i} style={{ display: "block" }}>{x}</span>)}</span>
    </div>
  );
}

export function ConceptC({ variant = "new" }: { variant?: Variant }) {
  const c = getCopy(variant);
  const { theme, toggle } = useTheme("c");
  const stats = useInView<HTMLDivElement>("");
  const tl = useInView<HTMLDivElement>(s.in);
  const glow = useMouseGlow<HTMLElement>();

  const typed = variant === "legacy"
    ? ["대화의 맥락을 설계합니다", "광고그룹을 나눕니다", "문안을 검수합니다"]
    : ["내보내지 않습니다", "다시 확인합니다", "근거를 남깁니다"];

  return (
    <div className={s.root} data-theme={theme}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#rules">검수 원칙</a><a href="#flow">진행 일정</a><a href="#faq">FAQ</a>
          </nav>
          <div className={s.navActs}>
            <HeaderControls slug="c" variant={variant} theme={theme} onToggleTheme={toggle}
              cls={{ toggle: s.toggle, swap: s.swap, btn: s.btn, sm: s.sm }} />
          </div>
        </div>
      </header>

      <section className={s.hero} ref={glow}>
        <span className={`${s.orb} ${s.orb1}`} aria-hidden="true" />
        <span className={`${s.orb} ${s.orb2}`} aria-hidden="true" />
        <div className={`${s.wrap} ${s.heroIn} ${s.heroLayer}`}>
          <span className={`${s.tag} ${s.fadeUp}`}>{c.hero.badge}</span>
          <h1 className={s.h1}>
            <Words text={variant === "legacy" ? "단순 키워드 매칭을 넘어," : "확인되지 않은 문장은"} wordClass={s.word} delay={100} />
            <br />
            <Typed words={typed} />
          </h1>
          <p className={`${s.sub} ${s.fadeUp}`} style={{ animationDelay: "520ms" }}>{c.hero.sub}</p>
          <div className={`${s.acts} ${s.fadeUp}`} style={{ animationDelay: "640ms" }}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{c.primary}</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>{c.secondary}</a>
          </div>
          <p className={`${s.note} ${s.fadeUp}`} style={{ animationDelay: "720ms" }}>{c.hero.note}</p>
          <div className={s.fadeUp} style={{ animationDelay: "820ms" }}><ScanDoc /></div>
        </div>
      </section>

      <section className={s.stats} ref={stats.ref}>
        <div className={`${s.wrap} ${s.statsIn}`}>
          {c.stats.map((st) => <Stat key={st.l} n={st.n} l={st.l} on={stats.on} />)}
        </div>
      </section>

      <section className={s.sec} id="rules">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.rules.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.rules.title}</h2>
            <p className={s.lead}>{c.sections.rules.lead}</p>
          </div>
          <div className={s.acc}>
            {c.reviewRules.map((f, i) => (
              <details className={s.accItem} key={f.t} open={i === 0}>
                <summary>
                  <span className={s.accNo}>{f.k}</span>
                  <span className={s.accTitle}>{f.t}</span>
                  <span className={s.accSign}>+</span>
                </summary>
                <p>{f.d}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="flow" ref={tl.ref}>
        <div className={`${s.wrap} ${tl.cls}`}>
          <div className={s.hd}>
            <span className={s.eyebrow}>{c.sections.timeline.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.timeline.title}</h2>
            <p className={s.lead}>{c.sections.timeline.lead}</p>
          </div>
          <div className={s.tl}>
            <span className={s.tlFill} />
            {c.timeline.map((t, i) => (
              <div className={s.tlRow} key={t.t} style={{ animationDelay: `${i * 160}ms` }}>
                <span className={s.tlDot}><i /></span>
                <span className={s.tlWhen}>{t.k}</span>
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
            <span className={s.eyebrow}>{c.sections.faq.eyebrow}</span>
            <h2 className={s.h2}>{c.sections.faq.title}</h2>
          </div>
          <div className={s.faq}>
            {c.faq.map((f) => (
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
