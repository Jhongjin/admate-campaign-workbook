"use client";

import s from "./v2.module.css";
import { DUAL_AGENT, PIPELINE } from "./content";
import { NextPage, PageHead, useInView } from "./shell";

export function V2Solution() {
  const pipe = useInView<HTMLDivElement>();
  const dual = useInView<HTMLDivElement>();

  return (
    <>
      <PageHead
        kicker="OUR SOLUTION"
        title="Data to Context: 5-Step Creative Pipeline"
        lead="광고주 정보를 단순 복제하지 않고, ChatGPT 대화 맥락에 맞는 운영 가능한 구조로 재설계합니다."
      />

      <section className={s.section} ref={pipe.ref}>
        <div className={`${s.wrap} ${pipe.cls}`}>
          <div className={s.pipe}>
            <span className={s.pipeLine}><span className={s.pipeLineFill} /></span>
            {PIPELINE.map((p, i) => (
              <div className={s.pipeRow} key={p.no}>
                <span className={s.pipeDot} style={{ animationDelay: `${i * 380 + 200}ms` }}>{p.no}</span>
                <div className={s.pipeName}>
                  <strong>{p.en}</strong>
                  <small>{p.ko}</small>
                  {p.tag && <span className={s.pipeTag}>{p.tag}</span>}
                </div>
                <p className={s.pipeDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`} ref={dual.ref}>
        <div className={`${s.wrap} ${dual.cls}`}>
          <h2 className={s.h2}>생성과 검수를 나눈 Dual AI Agent</h2>
          <p className={s.sectionLead}>
            한 번 생성하고 끝내지 않습니다. 생성과 검수를 각각 담당하는 두 개의 Agent가 문안 품질을 이중으로
            책임집니다.
          </p>
          <div className={s.dual}>
            {DUAL_AGENT.map((d) => (
              <div className={s.dualCard} key={d.tag}>
                <i>{d.tag}</i>
                <strong>{d.title}</strong>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NextPage />
    </>
  );
}
