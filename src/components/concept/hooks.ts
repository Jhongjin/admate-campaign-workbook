"use client";

import { useEffect, useRef, useState } from "react";

export type Theme = "dark" | "light";
export type Variant = "new" | "legacy";

/** 시안별로 라이트/다크를 기억합니다. 서버 렌더와 어긋나지 않도록 첫 렌더는 기본값으로 둡니다. */
export function useTheme(key: string, initial: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(initial);
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(`concept-theme-${key}`) as Theme | null;
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch { /* 저장소를 못 읽어도 기본값으로 동작합니다 */ }
  }, [key]);
  const toggle = () => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      try { window.localStorage.setItem(`concept-theme-${key}`, next); } catch { /* 무시 */ }
      return next;
    });
  };
  return { theme, toggle };
}

/** 화면에 들어오면 클래스를 붙입니다. */
export function useInView<T extends HTMLElement>(inClass: string) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setOn(true); return; }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { setOn(true); return; }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setOn(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, cls: on ? inClass : "", on };
}

/** 화면에 들어오면 0에서 목표값까지 올라갑니다. */
export function useCountUp(target: number, on: boolean, ms = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    if (typeof window === "undefined") { setN(target); return; }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, on, ms]);
  return n;
}

/** 일정 간격으로 인덱스를 돌립니다. 사용자가 직접 고르면 멈춥니다. */
export function useAutoRotate(len: number, ms = 4200) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || len < 2) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % len), ms);
    return () => window.clearInterval(t);
  }, [auto, len, ms]);
  const pick = (n: number) => { setAuto(false); setI(n); };
  return { i, auto, pick };
}

export const CONTACT = "openai@nasmedia.co.kr";
export const MAILTO = `mailto:${CONTACT}?subject=${encodeURIComponent("[OpenAI Ads] 도입 문의")}`;
