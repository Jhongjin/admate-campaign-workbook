"use client";

import Link from "next/link";
import s from "./v2.module.css";
import { FINAL, HERO, HOME_CARDS, MAILTO, MARQUEE, TRUST } from "./content";
import { FinalCta, useInView } from "./shell";

function Chat() {
  return (
    <div className={s.chat} aria-hidden="true">
      <div className={s.chatHead}><i />ChatGPT 대화 시뮬레이션</div>
      <div className={s.chatBody}>
        <div className={`${s.bubble} ${s.bubbleUser}`}>아이 영어 숙제 봐주기가 너무 벅차요. 좋은 방법이 있을까요?</div>
        <div className={s.typing}><i /><i /><i /></div>
        <div className={`${s.bubble} ${s.bubbleAi}`}>
          아이 수준에 맞춰 설명을 잘게 나누는 것이 좋아요. 매일 짧게 반복할 수 있는 학습 도구를 함께 쓰면 부담을 크게 줄일 수 있어요.
        </div>
        <div className={s.ad}>
          <span className={s.adTag}>SPONSORED</span>
          <strong>숙제 봐주다 지치는 저녁이라면?</strong>
          <p>부모가 매번 설명하지 않아도 되는 영어 학습을 경험해 보세요.</p>
          <span className={s.cta}>바로가기</span>
        </div>
      </div>
      <p className={s.chatCap}>대화 맥락에 맞춰, 광고가 답변처럼 자연스럽게 노출됩니다.</p>
    </div>
  );
}

export function V2Home() {
  const cards = useInView<HTMLDivElement>();
  const items = [...MARQUEE, ...MARQUEE];

  return (
    <>
      <section className={`${s.hero} ${s.grid}`}>
        <div className={`${s.wrap} ${s.heroIn}`}>
          <div>
            <span className={s.badge}><i />{HERO.badge}</span>
            <h1 className={s.heroTitle}>
              단순 키워드 매칭을 넘어,
              <br />
              대화의 <em>맥락</em>을 설계하다
            </h1>
            <p className={s.heroLead}>{HERO.lead}</p>
            <div className={s.heroActions}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{HERO.primary}</Link>
              <a href={MAILTO} className={`${s.btnGhost} ${s.lg}`}>{HERO.secondary}</a>
            </div>
            <p className={s.heroNote}>{HERO.note}</p>
          </div>
          <Chat />
        </div>
      </section>

      <div className={s.marquee} aria-hidden="true">
        <div className={s.marqueeTrack}>
          {items.map((m, i) => (
            <span key={i} className={`${s.marqueeItem} ${m.type === "search" ? s.tSearch : m.type === "question" ? s.tQuestion : s.tSituation}`}>
              <b>{m.tag}</b>
              {m.text}
            </span>
          ))}
        </div>
      </div>

      <section className={s.trust}>
        <div className={`${s.wrap} ${s.trustIn}`}>
          {TRUST.map((t) => (
            <div className={s.trustItem} key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.section} ref={cards.ref}>
        <div className={`${s.wrap} ${cards.cls}`}>
          <h2 className={s.h2}>어떤 내용을 담았나요</h2>
          <p className={s.sectionLead}>
            한 화면에 몰아 담지 않고 주제별로 나눴습니다. 필요한 부분만 골라 보셔도 됩니다.
          </p>
          <div className={s.homeCards}>
            {HOME_CARDS.map((c) => (
              <Link href={c.href} key={c.href} className={s.homeCard}>
                <i>{c.no}</i>
                <strong>{c.title}</strong>
                <p>{c.desc}</p>
                <span>자세히 보기 →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title={FINAL.title} lead={FINAL.lead} />
    </>
  );
}
