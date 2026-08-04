"use client";

import { useEffect, useRef, useState } from "react";

/** 커서를 따라다니는 광원. 히어로 영역에 --mx/--my 를 심어 줍니다. */
export function useMouseGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia?.("(hover: none)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => { el.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

/** 헤드라인을 어절 단위로 끊어 순서대로 올라오게 합니다. */
export function Words({
  text, className, wordClass, delay = 0, step = 70,
}: { text: string; className?: string; wordClass: string; delay?: number; step?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={`${w}-${i}`} className={wordClass} style={{ animationDelay: `${delay + i * step}ms` }}>
          {w}
          {i < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/** 값이 목표까지 올라갔다가 잠시 뒤 다시 도는 루프 카운터. */
export function useLoopCount(target: number, ms = 1400, hold = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf = 0, to = 0, start = 0;
    const run = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(run);
      else to = window.setTimeout(() => { start = 0; setN(0); raf = requestAnimationFrame(run); }, hold);
    };
    raf = requestAnimationFrame(run);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(to); };
  }, [target, ms, hold]);
  return n;
}

/** 0 → 100 을 반복하는 진행률. 진행 바 연출에 씁니다. */
export function useLoopProgress(ms = 2600) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setP(100); return; }
    let raf = 0, start = 0;
    const run = (t: number) => {
      if (!start) start = t;
      const v = ((t - start) % ms) / ms;
      setP(Math.round(v * 100));
      raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [ms]);
  return p;
}

/** 한 글자씩 찍고 지우기를 반복합니다. */
export function useTypeLoop(words: string[], typeMs = 85, backMs = 40, holdMs = 1500) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [back, setBack] = useState(false);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setLen(words[0].length); return; }
    const w = words[i];
    const done = !back && len === w.length;
    const empty = back && len === 0;
    const d = done ? holdMs : empty ? 260 : back ? backMs : typeMs;
    const t = window.setTimeout(() => {
      if (done) setBack(true);
      else if (empty) { setBack(false); setI((v) => (v + 1) % words.length); }
      else setLen((v) => v + (back ? -1 : 1));
    }, d);
    return () => window.clearTimeout(t);
  }, [i, len, back, words, typeMs, backMs, holdMs]);
  return words[i].slice(0, len);
}
