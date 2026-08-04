"use client";

import { useEffect, useRef, useState } from "react";

/** 시안 6종이 공유하는 등장 애니메이션 훅. 스타일은 각 시안이 따로 가집니다. */
export function useReveal<T extends HTMLElement>(inClass: string) {
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
  return { ref, cls: on ? inClass : "" };
}

export const CONTACT = "openai@nasmedia.co.kr";
export const MAILTO = `mailto:${CONTACT}?subject=${encodeURIComponent("[OpenAI Ads] 도입 문의")}`;

/**
 * 시안 전반에서 쓰는 '구조적 사실' 수치.
 * 성과 지표가 아니라 시스템 구성값이라 과장 없이 쓸 수 있습니다.
 */
export const FACTS = {
  steps: "5단계",
  hintTypes: "3가지",
  journey: "6단계",
  review: "2중",
  brief: "15분",
};
