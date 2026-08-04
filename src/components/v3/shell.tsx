"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import s from "./v3.module.css";
import { CONTACT_EMAIL, HERO, MAILTO, NAV, NEXT_PAGE } from "./content";

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) { setInView(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setInView(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, cls: inView ? s.inView : "" };
}

export function Header() {
  const pathname = usePathname();
  return (
    <header className={s.header}>
      <div className={`${s.wrap} ${s.headerIn}`}>
        <Link href="/v3" className={s.brand} aria-label="KT nasmedia 홈">
          <BrandMark size={48} className="" />
          <strong>KT nasmedia</strong>
        </Link>
        <nav className={s.nav} aria-label="주요 메뉴">
          {NAV.map((n) => {
            const on = pathname === n.href;
            return (
              <Link key={n.href} href={n.href} className={`${s.navLink} ${on ? s.navOn : ""}`} aria-current={on ? "page" : undefined}>
                {n.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
      </div>
    </header>
  );
}

export function PageHead({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div className={`${s.pageHead} ${s.gridBg}`}>
      <div className={s.wrap}>
        <span className={s.kicker}>{kicker}</span>
        <h1 className={s.h1}>{title}</h1>
        {lead && <p className={s.lead}>{lead}</p>}
      </div>
    </div>
  );
}

export function NextPage() {
  const pathname = usePathname();
  const next = NEXT_PAGE[pathname];
  if (!next) return null;
  return (
    <div className={s.nextWrap}>
      <div className={s.wrap}>
        <Link href={next.href} className={s.next}>
          <span>다음<strong>{next.label}</strong></span>
          <i>→</i>
        </Link>
      </div>
    </div>
  );
}

export function FinalCta({ title, lead }: { title: string; lead: string }) {
  return (
    <section className={`${s.final} ${s.gridBg}`}>
      <div className={s.wrap}>
        <h2 className={s.finalTitle}>{title}</h2>
        <p className={s.finalLead}>{lead}</p>
        <div className={s.finalActions}>
          <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{HERO.primary}</Link>
          <a href={MAILTO} className={`${s.btnGhost} ${s.lg}`}>{HERO.secondary}</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrap}>
        <div className={s.footerIn}>
          <div className={s.footerBrand}>
            <strong>KT nasmedia</strong>
            <span>㈜나스미디어 · KT그룹 미디어렙<br />OpenAI Ads 캠페인의 설계, 제작, 검수, 운영을 지원합니다.</span>
          </div>
          <div className={s.footerLinks}>
            <a href={MAILTO}>도입 문의 {CONTACT_EMAIL}</a>
            <Link href="/workbook">캠페인 브리프 작성</Link>
            <a href="https://www.nasmedia.co.kr" target="_blank" rel="noreferrer">회사 소개</a>
          </div>
        </div>
        <p className={s.legal}>
          © 2026 Nasmedia. All rights reserved. 본 페이지의 광고 카피와 대화 예시는 이해를 돕기 위한 가상의
          예시입니다. 브리프 제출만으로 광고 게시나 비용이 발생하지 않습니다.
        </p>
      </div>
    </footer>
  );
}
