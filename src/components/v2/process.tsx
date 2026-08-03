"use client";

import s from "./v2.module.css";
import { PREPARE, PROCESS } from "./content";
import { NextPage, PageHead, useInView } from "./shell";

export function V2Process() {
  const tl = useInView<HTMLDivElement>();
  const prep = useInView<HTMLDivElement>();

  return (
    <>
      <PageHead
        kicker="HOW WE WORK"
        title="브리프 한 번이면, 라이브까지 연결됩니다"
        lead="광고주와 대행사는 브리프 작성까지만 하시면 됩니다. 이후의 맥락 설계와 카피 생성, 검수, 업로드는 나스미디어의 파이프라인이 이어받습니다."
      />

      <section className={s.section} ref={tl.ref}>
        <div className={`${s.wrap} ${tl.cls}`}>
          <div className={s.tl}>
            <span className={s.tlLine}><span className={s.tlFill} /></span>
            {PROCESS.map((p, i) => (
              <div className={s.tlRow} key={p.no}>
                <span className={s.tlDot} style={{ animationDelay: `${i * 450 + 200}ms` }}>{p.no}</span>
                <div>
                  <div className={s.tlHead}>
                    <strong>{p.title}</strong>
                    <span className={s.tlWho}>{p.who}</span>
                  </div>
                  <p className={s.tlDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`} ref={prep.ref}>
        <div className={`${s.wrap} ${prep.cls}`}>
          <h2 className={s.h2}>미리 준비하시면 좋은 것</h2>
          <p className={s.sectionLead}>
            아래 네 가지만 있으면 브리프 작성을 시작할 수 있습니다. 완벽하지 않아도 괜찮습니다.
          </p>
          <div className={s.prepare}>
            <strong>브리프 작성 전 체크리스트</strong>
            <ul className={s.prepareList}>
              {PREPARE.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <NextPage />
    </>
  );
}
