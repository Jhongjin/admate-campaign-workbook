"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./v3.module.css";
import {
  BA, DEMO_TABS, DUAL_AGENT, FAQS, FINAL, HERO, HOME_CARDS, IMPACT, MAILTO,
  MARQUEE, PIPELINE, PREPARE, PROCESS, TRUST, WHY_ROWS,
} from "./content";
import { FinalCta, NextPage, PageHead, useInView } from "./shell";

/* ---------------- home ---------------- */

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
        </div>
      </div>
      <p className={s.chatCap}>대화 맥락에 맞춰, 광고가 답변처럼 자연스럽게 노출됩니다.</p>
    </div>
  );
}

export function V3Home() {
  const cards = useInView<HTMLDivElement>();
  return (
    <>
      <section className={`${s.hero} ${s.gridBg}`}>
        <div className={`${s.wrap} ${s.heroIn}`}>
          <div>
            <span className={s.badge}><i />{HERO.badge}</span>
            <h1 className={s.heroTitle}>
              단순 키워드 매칭을 넘어,<br />대화의 <em>맥락</em>을 설계하다
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
          <p className={s.sectionLead}>한 화면에 몰아 담지 않고 주제별로 나눴습니다. 필요한 부분만 골라 보셔도 됩니다.</p>
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

/* ---------------- why ---------------- */

export function V3Why() {
  const t = useInView<HTMLDivElement>();
  return (
    <>
      <PageHead
        kicker="WHY CHATGPT ADS"
        title="ChatGPT 광고는, 만들던 방식대로 만들 수 없습니다"
        lead="ChatGPT 광고는 사용자의 검색어 하나가 아닌, 질문 의도와 상황, 고민과 구매여정을 기반으로 노출됩니다. 일반적인 DA 카피 제작 방식으로는 충분하지 않습니다."
      />
      <section className={s.section} ref={t.ref}>
        <div className={`${s.wrap} ${t.cls}`}>
          <div className={s.cmpHead}>
            <span />
            <span>기존 검색 / DA 광고</span>
            <span />
            <span className={s.colNew}>ChatGPT 광고</span>
          </div>
          {WHY_ROWS.map((r, i) => (
            <div className={s.cmpRow} key={r.key}>
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

/* ---------------- solution ---------------- */

export function V3Solution() {
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
          <div className={s.flow}>
            <span className={s.flowLine}><span className={s.flowFill} /></span>
            {PIPELINE.map((p, i) => (
              <div className={s.flowRow} key={p.no}>
                <span className={s.flowDot} style={{ animationDelay: `${i * 380 + 200}ms` }}>{p.no}</span>
                <div className={s.flowName}>
                  <strong>{p.en}</strong>
                  <small>{p.ko}</small>
                  {p.tag && <span className={s.flowTag}>{p.tag}</span>}
                </div>
                <p className={s.flowDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.sectionAlt}`} ref={dual.ref}>
        <div className={`${s.wrap} ${dual.cls}`}>
          <h2 className={s.h2}>생성과 검수를 나눈 Dual AI Agent</h2>
          <p className={s.sectionLead}>
            한 번 생성하고 끝내지 않습니다. 생성과 검수를 각각 담당하는 두 개의 Agent가 문안 품질을 이중으로 책임집니다.
          </p>
          <div className={s.cards2}>
            {DUAL_AGENT.map((d) => (
              <div className={s.reveal} key={d.tag}>
                <div className={s.card}>
                  <i>{d.tag}</i>
                  <strong>{d.title}</strong>
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <NextPage />
    </>
  );
}

/* ---------------- context ---------------- */

export function V3Context() {
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const ba = useInView<HTMLDivElement>();
  const demo = DEMO_TABS[tab];

  useEffect(() => {
    if (!auto) return;
    const timer = window.setInterval(() => setTab((t) => (t + 1) % DEMO_TABS.length), 4200);
    return () => window.clearInterval(timer);
  }, [auto]);

  const pick = (i: number) => { setAuto(false); setTab(i); };

  return (
    <>
      <PageHead
        kicker="CONTEXT HINTS"
        title="키워드 하나가, 세 갈래의 대화가 됩니다"
        lead="광고주가 제공한 1차원적 검색어를 AI가 파악하여, ChatGPT 유저의 실제 대화 맥락으로 입체화합니다."
      />
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.demo}>
            <div className={s.demoTop}>
              <div>
                <span className={s.seedLabel}>광고주 제공 Context Hints</span>
                <span className={s.seedWord}>{demo.seed}</span>
              </div>
              <div className={s.tabs} role="tablist" aria-label="업종 예시">
                {DEMO_TABS.map((t, i) => (
                  <button key={t.label} type="button" role="tab" aria-selected={i === tab}
                    className={`${s.tab} ${i === tab ? s.tabOn : ""}`} onClick={() => pick(i)}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.expandBar}>
              <i>↓</i>
              AI가 세 가지 대화 맥락으로 확장합니다
              <span className={s.autoNote}>{auto ? "업종 자동 전환 중 · 탭을 누르면 멈춥니다" : "자동 전환을 멈췄습니다"}</span>
            </div>
            <div className={s.hintRows} key={tab}>
              {demo.hints.map((h, i) => (
                <div key={h.type}
                  className={`${s.hintRow} ${h.type === "search" ? s.hSearch : h.type === "question" ? s.hQuestion : s.hSituation}`}
                  style={{ animationDelay: `${i * 150}ms` }}>
                  <span className={s.hintChip}>{h.title}</span>
                  <p className={s.hintText}>{h.text}</p>
                  <span className={s.hintNote}>{h.note}</span>
                </div>
              ))}
            </div>
            <p className={s.demoResult}>
              <b>Result</b> — 검색어형·질문형·상황형을 혼합 설계하여, 다양한 유저 발화 상황에서 광고 노출 기회를 극대화합니다.
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
          <div className={s.cards2}>
            <div className={s.baCard}>
              <h3>{BA.before.label}</h3>
              <div className={s.baLine}>
                <b>{BA.before.kind}</b>
                <p>{BA.before.lines[0]}<br />{BA.before.lines[1]}</p>
              </div>
              <p className={s.baInsight}>Insight — {BA.before.insight}</p>
            </div>
            <div className={`${s.baCard} ${s.baAfter}`}>
              <h3>{BA.after.label}</h3>
              <div className={s.baLine}><b>{BA.after.title.kind}</b><p>{BA.after.title.text}</p></div>
              <div className={s.baLine}><b>{BA.after.copy.kind}</b><p>{BA.after.copy.text}</p></div>
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

/* ---------------- process ---------------- */

export function V3Process() {
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
          <div className={s.flow}>
            <span className={s.flowLine}><span className={s.flowFill} /></span>
            {PROCESS.map((p, i) => (
              <div className={`${s.flowRow} ${s.flowRowWide}`} key={p.no}>
                <span className={s.flowDot} style={{ animationDelay: `${i * 450 + 200}ms` }}>{p.no}</span>
                <div>
                  <div className={s.flowHead}>
                    <strong>{p.title}</strong>
                    <span className={s.flowWho}>{p.who}</span>
                  </div>
                  <p className={s.flowDesc} style={{ marginTop: "var(--s-3)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`${s.section} ${s.sectionAlt}`} ref={prep.ref}>
        <div className={`${s.wrap} ${prep.cls}`}>
          <h2 className={s.h2}>미리 준비하시면 좋은 것</h2>
          <p className={s.sectionLead}>아래 네 가지만 있으면 브리프 작성을 시작할 수 있습니다. 완벽하지 않아도 괜찮습니다.</p>
          <div className={s.prepare}>
            <strong>브리프 작성 전 체크리스트</strong>
            <ul className={s.prepareList}>{PREPARE.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>
      <NextPage />
    </>
  );
}

/* ---------------- impact ---------------- */

export function V3Impact() {
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
          <div className={s.cards2}>
            {IMPACT.map((it, i) => (
              <div className={s.reveal} key={it.en} style={{ animationDelay: `${i * 130}ms` }}>
                <div className={`${s.card} ${s.cardHover}`}>
                  <span className={s.accentBar} style={{ animationDelay: `${i * 130 + 250}ms` }} />
                  <span className={s.impactEn}>{it.en}</span>
                  <strong style={{ marginTop: 0 }}>{it.title}</strong>
                  <p>{it.desc}</p>
                </div>
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

export const MARQUEE_UNUSED = MARQUEE;
