"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./concept-b.module.css";
import { BA, CONTACT_EMAIL, DEMO_TABS, FAQS, FINAL, FLOW, HERO, IMPACT, PIPELINE, PROOF, WHY } from "./content";

const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("[OpenAI Ads] 도입 문의")}`;

function SecHead({ no, title, lead }: { no: string; title: string; lead?: string }) {
  return (
    <div className={s.secHead}>
      <span className={s.secNo}>{no}</span>
      <h2 className={s.h2}>{title}</h2>
      {lead && <p className={s.secLead}>{lead}</p>}
    </div>
  );
}

export function ConceptB() {
  const [tab, setTab] = useState(0);
  const demo = DEMO_TABS[tab];

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <Link href="/design" className={s.brand}>
            <BrandMark size={34} className="" />
            <span>
              <strong>KT nasmedia</strong>
              <small>OpenAI Ads · 시안 B</small>
            </span>
          </Link>
          <nav className={s.nav}>
            <a href="#why">왜 다른가</a>
            <a href="#how">작동 방식</a>
            <a href="#impact">도입 효과</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
        </div>
      </header>

      <main>
        <section className={s.hero}>
          <div className={s.wrap}>
            <span className={s.eyebrow}>{HERO.eyebrow}</span>
            <h1 className={s.heroTitle}>
              대화의 <em>맥락</em>을 설계합니다
            </h1>
            <p className={s.lead}>{HERO.lead}</p>
            <div className={s.heroActions}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{HERO.primary}</Link>
              <a href={mailto} className={`${s.btnGhost} ${s.lg}`}>{HERO.secondary}</a>
            </div>
            <p className={s.note}>{HERO.note}</p>

            <div className={s.chat} aria-hidden="true">
              <div className={s.chatHead}><span className={s.dot} />ChatGPT 대화</div>
              <div className={s.chatBody}>
                <div className={s.bubbleUser}>아이 영어 숙제 봐주기가 너무 벅차요.</div>
                <div className={s.bubbleAi}>아이 수준에 맞춰 설명을 잘게 나누고, 매일 짧게 반복하면 부담을 줄일 수 있어요.</div>
                <div className={s.ad}>
                  <span className={s.adTag}>SPONSORED</span>
                  <strong>숙제 봐주다 지치는 저녁이라면?</strong>
                  <p>부모가 매번 설명하지 않아도 되는 영어 학습.</p>
                  <span className={s.adLink}>바로가기 →</span>
                </div>
              </div>
              <p className={s.chatCap}>대화 맥락에 맞춰 광고가 답변처럼 놓입니다.</p>
            </div>
          </div>
        </section>

        <section className={s.proof}>
          <div className={`${s.wrap} ${s.proofIn}`}>
            {PROOF.map((p) => <span key={p} className={s.proofItem}>{p}</span>)}
          </div>
        </section>

        <section className={s.section} id="why">
          <div className={s.wrap}>
            <SecHead no="01 / WHY" title={WHY.title} />
            <div className={s.rows}>
              {WHY.rows.map((r) => (
                <div className={s.row} key={r.k}>
                  <span className={s.rowKey}>{r.k}</span>
                  <span className={s.rowBefore}>{r.before}</span>
                  <span className={s.rowAfter}>{r.after}</span>
                </div>
              ))}
            </div>
            <p className={s.statement}>
              성과는 카피의 ‘양’이 아니라 <em>‘설계’</em>에서 나옵니다.
            </p>
          </div>
        </section>

        <section className={s.section} id="how">
          <div className={s.wrap}>
            <SecHead no="02 / HOW" title="Data to Context, 다섯 단계" lead="광고주 자료를 복제하지 않고 대화 맥락에 맞는 구조로 재설계합니다." />
            <div className={s.steps}>
              {PIPELINE.map((p) => (
                <div className={s.step} key={p.no}>
                  <span className={s.stepNo}>{p.no}</span>
                  <span className={s.stepEn}>
                    {p.en}
                    {p.tag && <span className={s.stepTag}>{p.tag}</span>}
                  </span>
                  <span className={s.stepKo}>{p.ko}</span>
                </div>
              ))}
            </div>
            <div className={s.flow}>
              {FLOW.map((f, i) => (
                <span key={f} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                  {i > 0 && <span className={s.flowSep}>→</span>}
                  <span className={s.flowItem}>{f}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <SecHead no="03 / CONTEXT" title="키워드 하나가 세 갈래 대화로" lead="검색어형·질문형·상황형으로 확장해 노출 기회를 넓힙니다." />
            <div className={s.tabs}>
              {DEMO_TABS.map((t, i) => (
                <button key={t.label} type="button" className={`${s.tab} ${i === tab ? s.tabOn : ""}`} onClick={() => setTab(i)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className={s.demo} key={tab}>
              <div className={s.seed}>
                <span className={s.seedLabel}>광고주 제공</span>
                <span className={s.seedText}>{demo.seed}</span>
              </div>
              <div className={s.arrow}>→</div>
              <div className={s.hints}>
                {demo.hints.map((h, i) => (
                  <div key={h.type} className={`${s.hint} ${h.type !== "search" ? s.hintOn : ""}`} style={{ animationDelay: `${i * 120}ms` }}>
                    <span className={s.hintLabel}>{h.title}</span>
                    <p className={s.hintText}>{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.wrap}>
            <SecHead no="04 / COPY" title={BA.title} />
            <div className={s.ba}>
              <div className={s.baCol}>
                <span className={s.baLabel}>{BA.before.label}</span>
                <p className={s.baBody}>{BA.before.lines[0]}<br />{BA.before.lines[1]}</p>
              </div>
              <div className={`${s.baCol} ${s.baColAfter}`}>
                <span className={s.baLabel}>{BA.after.label}</span>
                <h3 className={s.baTitle}>{BA.after.title}</h3>
                <p className={s.baCopy}>{BA.after.copy}</p>
              </div>
            </div>
            <p className={s.baNote}>{BA.note}</p>
          </div>
        </section>

        <section className={s.section} id="impact">
          <div className={s.wrap}>
            <SecHead no="05 / IMPACT" title="도입하면 달라지는 것" />
            <div className={s.impact}>
              {IMPACT.map((it) => (
                <div className={s.impactItem} key={it.en}>
                  <span className={s.impactEn}>{it.en}</span>
                  <span className={s.impactKo}>{it.ko}</span>
                  <p className={s.impactDesc}>{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={s.section} id="faq">
          <div className={s.wrap}>
            <SecHead no="06 / FAQ" title="자주 묻는 질문" />
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

        <section className={s.final}>
          <div className={s.wrap}>
            <h2 className={s.finalTitle}>{FINAL.title}</h2>
            <p className={s.finalLead}>{FINAL.lead}</p>
            <div className={s.finalActions}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>{HERO.primary}</Link>
              <a href={mailto} className={`${s.btnGhost} ${s.lg}`}>{HERO.secondary}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.footerIn}`}>
          <div>
            <strong>KT nasmedia</strong>
            <br />
            <span>㈜나스미디어 · KT그룹 미디어렙</span>
          </div>
          <div className={s.footerLinks}>
            <a href={mailto}>{CONTACT_EMAIL}</a>
            <Link href="/workbook">캠페인 브리프 작성</Link>
            <Link href="/design">시안 목록</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
