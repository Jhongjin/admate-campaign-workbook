"use client";

import s from "./v2.module.css";
import { FAQS, FINAL, IMPACT } from "./content";
import { FinalCta, PageHead, useInView } from "./shell";

export function V2Impact() {
  const cards = useInView<HTMLDivElement>();
  const faq = useInView<HTMLDivElement>();

  return (
    <>
      <PageHead
        kicker="IMPACT"
        title="도입하면 달라지는 네 가지"
        lead="맥락 설계와 카피 확장을 체계적으로 자동화하면, 운영에서 이런 변화가 생깁니다."
      />

      <section className={s.section} ref={cards.ref}>
        <div className={`${s.wrap} ${cards.cls}`}>
          <div className={s.impact}>
            {IMPACT.map((it, i) => (
              <div className={s.impactCard} key={it.en} style={{ animationDelay: `${i * 130}ms` }}>
                <span className={s.impactBar} style={{ animationDelay: `${i * 130 + 250}ms` }} />
                <i>{it.en}</i>
                <strong>{it.title}</strong>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>

          <p className={s.banner}>
            Nasmedia Context Creative Agent는 ChatGPT 광고의 핵심 진입 장벽인 <b>‘맥락 설계’</b>와{" "}
            <em>‘카피 확장’</em>을 체계적으로 자동화하여, 운영 품질을 높이는 AI 기반 솔루션입니다.
          </p>
        </div>
      </section>

      <section className={`${s.section} ${s.sectionAlt}`} ref={faq.ref}>
        <div className={`${s.narrow} ${faq.cls}`}>
          <h2 className={s.h2}>자주 묻는 질문</h2>
          <p className={s.sectionLead}>도입 전에 가장 많이 받는 질문을 정리했습니다.</p>
          <div className={s.faq}>
            {FAQS.map((f) => (
              <details className={s.faqItem} key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title={FINAL.title} lead={FINAL.lead} />
    </>
  );
}
