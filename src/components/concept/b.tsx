"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./b.module.css";
import { MAILTO, useReveal } from "./use-reveal";

/* 시안 B — Gen1형 · 데이터/인사이트 화법
   히어로에서 곧바로 '확장 결과'를 보여주고, 구매여정 6단계를 본문의 축으로 씁니다. */

const STATS = [
  { n: "3가지", l: "발화 유형으로 확장" },
  { n: "6단계", l: "구매여정 분류" },
  { n: "2중", l: "AI 검수 구조" },
  { n: "15분", l: "브리프 작성" },
];

const FUNNEL = [
  { n: "01", t: "문제 정의", d: "아직 해결책을 모르는 단계. 증상과 상황을 말하는 발화를 잡습니다." },
  { n: "02", t: "제품 발견", d: "해결 수단을 처음 찾는 단계. 방법과 종류를 묻는 질문에 붙습니다." },
  { n: "03", t: "비교 검토", d: "선택지를 좁히는 단계. 차이와 기준을 묻는 대화에 대응합니다." },
  { n: "04", t: "평가", d: "구매 직전 확인 단계. 조건과 후기를 확인하려는 발화를 맡습니다." },
  { n: "05", t: "전환", d: "결정 단계. 신청과 시작을 앞둔 문장에 맞춰 씁니다." },
  { n: "06", t: "사용 도움", d: "구매 이후 단계. 사용법과 활용을 묻는 대화까지 이어집니다." },
];

const HINTS = [
  { k: "k1", t: "검색어형", p: "제주 아이 동반 숙소 추천" },
  { k: "k2", t: "질문형", p: "아이 둘 데리고 제주 3박이면 어디가 좋을까요?" },
  { k: "k3", t: "상황형", p: "성수기라 숙소값이 너무 올라서 고민이에요." },
];

export function ConceptB() {
  const p = useReveal<HTMLDivElement>(s.in);
  return (
    <div className={s.root}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#funnel">구매여정</a><a href="#copy">문안</a><a href="#run">운영</a>
          </nav>
          <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
        </div>
      </header>

      <section className={s.hero}>
        <div className={`${s.wrap} ${s.heroIn}`}>
          <div>
            <span className={s.tag}>OPENAI ADS</span>
            <h1 className={s.h1}>사람들이 묻는 방식으로<br /><em>광고를 설계</em>합니다</h1>
            <p className={s.sub}>
              같은 상품이라도 묻는 방식은 제각각입니다. 검색하듯 짧게 던지기도 하고, 사정을 길게 풀어놓기도 합니다.
              그 차이를 그대로 광고그룹으로 옮깁니다.
            </p>
            <div className={s.acts}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
              <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
            </div>
            <p className={s.note}>브리프 제출만으로 광고가 게시되거나 비용이 발생하지 않습니다.</p>
          </div>

          <div className={`${s.panel} ${p.cls}`} ref={p.ref} aria-hidden="true">
            <div className={s.panelHd}><span>확장 결과</span><span>여행 · 숙박</span></div>
            <div className={s.split}>
              {HINTS.map((h, i) => (
                <div className={s.splitRow} key={h.t} style={{ animationDelay: `${i * 150}ms` }}>
                  <span className={`${s.splitKey} ${s[h.k]}`}>{h.t}</span>
                  <p>{h.p}</p>
                </div>
              ))}
            </div>
            <p className={s.seed}>광고주가 준 원본<b>제주 가족여행 숙소 추천</b></p>
          </div>
        </div>
      </section>

      <section className={s.stats}>
        <div className={`${s.wrap} ${s.statsIn}`}>
          {STATS.map((st) => (
            <div className={s.stat} key={st.l}><b>{st.n}</b><span>{st.l}</span></div>
          ))}
        </div>
      </section>

      <section className={s.sec} id="funnel">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>BUYING JOURNEY</span>
            <h2 className={s.h2}>같은 사람도 단계마다 다르게 묻습니다</h2>
            <p className={s.lead}>
              구매여정을 여섯 단계로 나누고, 단계마다 어떤 발화가 나오는지에 맞춰 광고그룹과 문안을 따로 만듭니다.
            </p>
          </div>
          <div className={s.funnel}>
            {FUNNEL.map((f) => (
              <div className={s.fRow} key={f.n}>
                <span className={s.fNo}>{f.n}</span>
                <b>{f.t}</b>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.secAlt}`} id="copy">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>CREATIVE</span>
            <h2 className={s.h2}>기능을 읊는 대신, 상황을 짚습니다</h2>
            <p className={s.lead}>
              상품 설명을 그대로 옮기면 대화에 끼어드는 문장이 됩니다. 사용자가 처한 장면을 먼저 말하고 해결을 뒤에 둡니다.
            </p>
          </div>
          <div className={s.two}>
            <div className={s.cCard}>
              <h3>일반적인 광고 문안</h3>
              <div className={s.cLine}>
                <i>제목 + 본문</i>
                <p>영어는 아는 것보다 직접 쓰는 게 중요하죠.<br />ChatGPT가 설명해준 영어, ○○○와 실력으로 만들어보세요.</p>
              </div>
              <p className={s.cNote}>상품이 무엇인지는 알려주지만, 지금 그 사람의 상황과는 닿지 않습니다.</p>
            </div>
            <div className={`${s.cCard} ${s.on}`}>
              <h3>맥락에 맞춘 문안</h3>
              <div className={s.cLine}>
                <i>제목 — 상황 인식</i>
                <p>아는 영어, 막상 쓰려면 어렵죠?</p>
              </div>
              <div className={s.cLine}>
                <i>본문 — 해결 제시</i>
                <p>단어·문장·말하기를 반복 훈련하며 실제 실력으로 이어가요.</p>
              </div>
              <p className={s.cNote}>대화에서 나온 고민을 되받고, 다음 행동을 제안합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={s.sec} id="run">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>OPERATION</span>
            <h2 className={s.h2}>만든 다음이 더 중요합니다</h2>
            <p className={s.lead}>
              생성한 문안은 다른 에이전트가 다시 읽습니다. 글자수 초과와 의미 중복, 표현 기준 위반을 업로드 전에
              표시하고, 승인한 문안만 Ads Manager로 올립니다.
            </p>
          </div>
          <div className={s.funnel}>
            <div className={s.fRow}><span className={s.fNo}>A</span><b>생성 에이전트</b><p>그룹별 제목과 본문을 씁니다.</p></div>
            <div className={s.fRow}><span className={s.fNo}>B</span><b>검수 에이전트</b><p>연결성과 자연스러움, 광고로서의 설득력을 확인합니다.</p></div>
            <div className={s.fRow}><span className={s.fNo}>C</span><b>자동 검증</b><p>글자수·중복·표현 기준을 기계적으로 걸러 냅니다.</p></div>
            <div className={s.fRow}><span className={s.fNo}>D</span><b>승인·업로드</b><p>검수 파일로 확인하고 승인한 것만 반영합니다.</p></div>
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <h2>어떤 대화에서 우리 브랜드가 나와야 할까요</h2>
          <p>브리프를 주시면 그 질문부터 함께 정리하겠습니다.</p>
          <div className={s.ctaActs}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
          </div>
        </div>
      </section>

      <footer className={s.foot}>
        <div className={`${s.wrap} ${s.footIn}`}>
          <span>㈜나스미디어 · KT그룹 미디어렙</span>
          <span><a href={MAILTO}>openai@nasmedia.co.kr</a> · <Link href="/concept">시안 목록</Link></span>
        </div>
      </footer>
    </div>
  );
}
