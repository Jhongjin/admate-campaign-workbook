"use client";

import s from "./v2.module.css";
import { WHY_ROWS } from "./content";
import { NextPage, PageHead, useInView } from "./shell";

export function V2Why() {
  const table = useInView<HTMLDivElement>();

  return (
    <>
      <PageHead
        kicker="WHY CHATGPT ADS"
        title="ChatGPT 광고는, 만들던 방식대로 만들 수 없습니다"
        lead="ChatGPT 광고는 사용자의 검색어 하나가 아닌, 질문 의도와 상황, 고민과 구매여정을 기반으로 노출됩니다. 일반적인 DA 카피 제작 방식으로는 충분하지 않습니다."
      />

      <section className={s.section} ref={table.ref}>
        <div className={`${s.wrap} ${table.cls}`}>
          <div className={s.compareHead}>
            <span />
            <span>기존 검색 / DA 광고</span>
            <span />
            <span className={s.colNew}>ChatGPT 광고</span>
          </div>
          {WHY_ROWS.map((r, i) => (
            <div
              className={s.cmpRow}
              key={r.key}
              style={{ animationDelay: `${i * 120}ms` } as React.CSSProperties}
            >
              <span className={s.cmpKey}>{r.key}</span>
              <span className={s.cmpBefore} style={{ animationDelay: `${i * 140}ms` }}>{r.before}</span>
              <span className={s.cmpArrow} style={{ animationDelay: `${i * 140 + 300}ms` }}>→</span>
              <span className={s.cmpAfter} style={{ animationDelay: `${i * 140 + 140}ms` }}>{r.after}</span>
            </div>
          ))}

          <p className={s.quote}>
            ChatGPT 광고의 성과는 카피의 ‘양’이 아닌, <b>대화 맥락에 맞춘 정교한 ‘설계’</b>에 달려 있습니다.
          </p>
        </div>
      </section>

      <NextPage />
    </>
  );
}
