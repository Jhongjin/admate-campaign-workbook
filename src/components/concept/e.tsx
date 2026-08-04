"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./e.module.css";
import { MAILTO } from "./use-reveal";

/* 시안 E — Agentive형 · 제품 데모 화법
   결과물(검수 파일)을 먼저 보여주고, 그것이 나오기까지를 뒤에서 설명합니다. */

const ROWS = [
  { g: "AG-01", t: "숙제 봐주다 지치는 저녁이라면?", c: "부모가 매번 설명하지 않아도 되는 영어 학습을 경험해 보세요.", st: "통과", cls: "stOk" },
  { g: "AG-01", t: "아는 영어, 막상 쓰려면 어렵죠?", c: "단어·문장·말하기를 반복 훈련하며 실제 실력으로 이어가요.", st: "통과", cls: "stOk" },
  { g: "AG-02", t: "성수기 숙소값, 지금 잡으면 다릅니다", c: "아이 동반 가능한 객실만 모아 비교해 보세요.", st: "통과", cls: "stOk" },
  { g: "AG-03", t: "환절기마다 뒤집어지는 피부라면", c: "자극 성분을 뺀 진정 라인을 먼저 확인해 보세요.", st: "확인", cls: "stWarn" },
];

const STEPS = [
  { n: "1", t: "워크북에 적습니다", d: "상품과 타깃, 쓰면 안 되는 표현을 정해진 항목에 채웁니다. 자료를 새로 만들 필요는 없습니다." },
  { n: "2", t: "저희가 만듭니다", d: "광고그룹을 나누고 그룹별 발화를 확장한 뒤, 제목과 본문을 생성하고 검수까지 마칩니다." },
  { n: "3", t: "확인하고 승인합니다", d: "위 화면처럼 정리된 파일을 받아, 항목별로 승인하거나 수정 요청하시면 됩니다." },
];

export function ConceptE() {
  return (
    <div className={s.root}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={40} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}>
            <a href="#how">사용 흐름</a><a href="#detail">기능</a>
          </nav>
          <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
        </div>
      </header>

      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.tag}>OPENAI ADS · CONTEXT CREATIVE AGENT</span>
          <h1 className={s.h1}>받아 보실 결과물은<br /><em>이렇게 생겼습니다</em></h1>
          <p className={s.sub}>
            무엇을 해드리는지 설명하기 전에, 무엇을 받으시는지 먼저 보여 드립니다.
            아래가 실제로 전달되는 검수 파일의 형태입니다.
          </p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
          </div>
          <p className={s.note}>제출만으로 광고가 게시되거나 비용이 발생하지 않습니다.</p>

          <div className={s.mock} aria-hidden="true">
            <div className={s.mockBar}><i /><i /><i /><span>검수 파일 · 광고 문안</span></div>
            <div className={s.tableHd}>
              <span>광고그룹</span><span>제목</span><span>본문</span><span>상태</span>
            </div>
            {ROWS.map((r, i) => (
              <div className={s.tableRow} key={i}>
                <span className={s.grp}>{r.g}</span>
                <div><p>{r.t}</p></div>
                <div><p>{r.c}</p></div>
                <span className={`${s.st} ${s[r.cls]}`}>{r.st}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.secLight}`} id="how">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>HOW TO USE</span>
            <h2 className={s.h2}>세 번만 움직이시면 됩니다</h2>
            <p className={s.lead}>나머지 과정은 저희가 맡습니다.</p>
          </div>
          <div className={s.three}>
            {STEPS.map((st) => (
              <div className={s.tCard} key={st.n}>
                <span className={s.tNo}>{st.n}</span>
                <b>{st.t}</b><p>{st.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.sec} id="detail">
        <div className={s.wrap}>
          <div className={s.hd}>
            <span className={s.eyebrow}>UNDER THE HOOD</span>
            <h2 className={s.h2}>그 파일이 나오기까지</h2>
          </div>
          <div className={s.alt}>
            <div className={s.altRow}>
              <div className={s.altText}>
                <i>STEP 01 · GROUPING</i>
                <b>먼저 그룹을 나눕니다</b>
                <p>
                  상품과 세부 의도, 구매여정 단계를 기준으로 광고그룹을 쪼갭니다. 한 덩어리로 묶으면
                  어떤 문안도 어중간해집니다.
                </p>
              </div>
              <div className={s.altVis}>
                <div className={s.vLine}><span className={`${s.vKey} ${s.vKeyOn}`}>AG-01</span><p>초등 영어 · 학습 부담</p></div>
                <div className={s.vLine}><span className={s.vKey}>AG-02</span><p>가족여행 · 성수기 가격</p></div>
                <div className={s.vLine}><span className={s.vKey}>AG-03</span><p>민감성 피부 · 성분 확인</p></div>
              </div>
            </div>

            <div className={s.altRow}>
              <div className={s.altText}>
                <i>STEP 02 · CONTEXT</i>
                <b>그룹마다 발화를 넓힙니다</b>
                <p>
                  같은 주제라도 짧게 검색하듯 묻는 사람, 질문으로 던지는 사람, 사정을 풀어놓는 사람이 있습니다.
                  세 갈래로 나눠 각각에 맞는 자리를 만듭니다.
                </p>
              </div>
              <div className={s.altVis}>
                <div className={s.vLine}><span className={s.vKey}>검색어형</span><p>초등 영어 숙제 봐주는 방법</p></div>
                <div className={s.vLine}><span className={`${s.vKey} ${s.vKeyOn}`}>질문형</span><p>어떻게 쉽게 설명하죠?</p></div>
                <div className={s.vLine}><span className={s.vKey}>상황형</span><p>제가 영어를 못해서 어려워요</p></div>
              </div>
            </div>

            <div className={s.altRow}>
              <div className={s.altText}>
                <i>STEP 03 · REVIEW</i>
                <b>쓴 다음 다시 읽습니다</b>
                <p>
                  생성한 문안을 검수 에이전트가 다시 확인하고, 글자수와 의미 중복, 표현 기준 위반을
                  자동으로 표시합니다. 그 결과가 앞서 보신 상태 표시입니다.
                </p>
              </div>
              <div className={s.altVis}>
                <div className={s.vLine}><span className={`${s.vKey} ${s.vKeyOn}`}>통과</span><p>규격과 기준 모두 충족</p></div>
                <div className={s.vLine}><span className={s.vKey}>확인</span><p>표현 기준 재검토 필요</p></div>
                <div className={s.vLine}><span className={s.vKey}>반려</span><p>재생성 대상으로 표시</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <h2>같은 파일을 우리 상품으로 받아 보세요</h2>
          <p>브리프를 주시면 실제 광고그룹과 문안으로 채워 보내 드립니다.</p>
          <div className={s.acts}>
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
