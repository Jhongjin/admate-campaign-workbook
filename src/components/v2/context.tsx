"use client";

import { useEffect, useState } from "react";
import s from "./v2.module.css";
import { BA, DEMO_TABS } from "./content";
import { NextPage, PageHead, useInView } from "./shell";

export function V2Context() {
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const ba = useInView<HTMLDivElement>();
  const demo = DEMO_TABS[tab];

  // 자동 재생 — 사용자가 탭을 누르면 멈춥니다.
  useEffect(() => {
    if (!auto) return;
    const timer = window.setInterval(() => setTab((t) => (t + 1) % DEMO_TABS.length), 4200);
    return () => window.clearInterval(timer);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setTab(i);
  };

  return (
    <>
      <PageHead
        kicker="CONTEXT HINTS"
        title="키워드 하나가, 세 갈래의 대화가 됩니다"
        lead="광고주가 제공한 1차원적 검색어를 AI가 파악하여, ChatGPT 유저의 실제 대화 맥락으로 입체화합니다."
      />

      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.demoBox}>
            <div className={s.tabs} role="tablist" aria-label="업종 예시">
              {DEMO_TABS.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={i === tab}
                  className={`${s.tab} ${i === tab ? s.tabOn : ""}`}
                  onClick={() => pick(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className={s.autoNote}>{auto ? "업종이 자동으로 넘어갑니다. 탭을 누르면 멈춥니다." : "자동 재생을 멈췄습니다."}</p>

            <div className={s.demoFlow} key={tab}>
              <div className={s.seed}>
                <span>광고주 제공 Context Hints</span>
                <strong>{demo.seed}</strong>
              </div>
              <div className={s.demoArrow}>→</div>
              <div className={s.hints}>
                {demo.hints.map((h, i) => (
                  <div
                    key={h.type}
                    className={`${s.hint} ${h.type === "search" ? s.hSearch : h.type === "question" ? s.hQuestion : s.hSituation}`}
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <b>{h.title}</b>
                    <p>{h.text}</p>
                    <small>{h.note}</small>
                  </div>
                ))}
              </div>
            </div>

            <p className={s.demoResult}>
              <b>Result</b> — 검색어형·질문형·상황형을 혼합 설계하여, 다양한 유저 발화 상황에서 광고 노출 기회를
              극대화합니다.
            </p>
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`} ref={ba.ref}>
        <div className={`${s.wrap} ${ba.cls}`}>
          <h2 className={s.h2}>‘상품·기능 중심’에서 ‘이용자 고민 해결’ 중심으로</h2>
          <p className={s.sectionLead}>
            상품 기능만 나열하던 원본 카피를, 사용자의 상황을 공감하고 구체적 대안을 제시하는 구조로 변환합니다.
          </p>
          <div className={s.ba}>
            <div className={s.baCard}>
              <h3>{BA.before.label}</h3>
              <div className={s.baLine}>
                <b>{BA.before.kind}</b>
                <p>
                  {BA.before.lines[0]}
                  <br />
                  {BA.before.lines[1]}
                </p>
              </div>
              <p className={s.baInsight}>Insight — {BA.before.insight}</p>
            </div>
            <div className={`${s.baCard} ${s.baAfter}`}>
              <h3>{BA.after.label}</h3>
              <div className={s.baLine}>
                <b>{BA.after.title.kind}</b>
                <p>{BA.after.title.text}</p>
              </div>
              <div className={s.baLine}>
                <b>{BA.after.copy.kind}</b>
                <p>{BA.after.copy.text}</p>
              </div>
              <p className={s.baInsight}>Insight — {BA.after.insight}</p>
            </div>
          </div>
          <p className={s.baNote}>{BA.note}</p>
        </div>
      </section>

      <NextPage />
    </>
  );
}
