"use client";

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import s from "./d.module.css";
import { MAILTO } from "./use-reveal";

/* 시안 D — Bento UI형 · 라이트
   설명을 길게 쓰지 않고, 크기가 다른 카드에 한 문장씩 나눠 담습니다. */

export function ConceptD() {
  return (
    <div className={s.root}>
      <header className={s.nav}>
        <div className={`${s.wrap} ${s.navIn}`}>
          <Link href="/concept" className={s.brand}><BrandMark size={38} className="" /><b>KT nasmedia</b></Link>
          <nav className={s.navLinks}><a href="#bento">한눈에 보기</a></nav>
          <Link href="/workbook" className={`${s.btn} ${s.sm}`}>브리프 작성</Link>
        </div>
      </header>

      <section className={s.hero}>
        <div className={s.wrap}>
          <span className={s.tag}>OPENAI ADS</span>
          <h1 className={s.h1}>ChatGPT 안에서 만나는 광고, 한 화면에 정리했습니다</h1>
          <p className={s.sub}>
            길게 설명하지 않겠습니다. 무엇을 맡아 드리는지 카드로 나눠 담았습니다.
          </p>
          <div className={s.acts}>
            <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
            <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
          </div>
          <p className={s.note}>제출만으로 광고가 게시되거나 비용이 발생하지 않습니다.</p>
        </div>
      </section>

      <section className={s.wrap} id="bento">
        <div className={s.bento}>
          <div className={`${s.cell} ${s.c4} ${s.dark}`}>
            <i>CONTEXT HINTS</i>
            <b>키워드 하나를 세 갈래 발화로 넓힙니다</b>
            <p>같은 상품도 검색하듯 묻는 사람, 사정을 풀어놓는 사람이 따로 있습니다.</p>
            <div className={s.chips}>
              <span className={s.chip}>검색어형</span>
              <span className={`${s.chip} ${s.chipOn}`}>질문형</span>
              <span className={s.chip}>상황형</span>
            </div>
          </div>

          <div className={`${s.cell} ${s.c2} ${s.accent}`}>
            <i>JOURNEY</i>
            <span className={s.big}>6단계</span>
            <span className={s.bigLabel}>구매여정으로 나눈 광고그룹</span>
          </div>

          <div className={`${s.cell} ${s.c2}`}>
            <i>BRIEF</i>
            <span className={s.big}>15분</span>
            <span className={s.bigLabel}>워크북 작성에 드는 시간</span>
          </div>

          <div className={`${s.cell} ${s.c4}`}>
            <i>PIPELINE</i>
            <b>수집에서 업로드까지 끊기지 않습니다</b>
            <div className={s.flowMini}>
              <span><b>1</b>자료 수집과 표준화</span>
              <span><b>2</b>광고그룹·Context Hints 설계</span>
              <span><b>3</b>제목·본문 생성</span>
              <span><b>4</b>글자수·중복·표현 기준 검증</span>
              <span><b>5</b>검수 파일 출력과 업로드</span>
            </div>
          </div>

          <div className={`${s.cell} ${s.c3}`}>
            <i>DUAL AGENT</i>
            <b>쓰는 AI와 읽는 AI를 나눴습니다</b>
            <p>생성한 문안을 다른 에이전트가 다시 읽고 연결성과 표현 기준을 확인합니다.</p>
          </div>

          <div className={`${s.cell} ${s.c3}`}>
            <i>GUARDRAIL</i>
            <b>업로드 전에 걸러 냅니다</b>
            <p>글자수 초과, 의미 중복, 쓰면 안 되는 표현을 미리 표시해 드립니다.</p>
          </div>

          <div className={`${s.cell} ${s.c2}`}>
            <i>HANDOFF</i>
            <b>검수 파일로 확인</b>
            <p>항목별로 승인하거나 반려하실 수 있습니다.</p>
          </div>

          <div className={`${s.cell} ${s.c4} ${s.quoteCell} ${s.dark}`}>
            <i>WHY IT MATTERS</i>
            <b>대화에 끼어드는 문장이 아니라, 대화에 답하는 문장을 씁니다.</b>
          </div>

          <div className={`${s.cell} ${s.c3}`}>
            <i>WHO WE ARE</i>
            <b>KT그룹 미디어렙</b>
            <p>매체 운영 체계 위에서 설계·생성·검수·업로드를 함께 맡습니다.</p>
          </div>

          <div className={`${s.cell} ${s.c3} ${s.accent}`}>
            <i>SAFE TO START</i>
            <b>제출한다고 바로 나가지 않습니다</b>
            <p>담당자 확인과 광고주 승인을 거친 뒤에 진행합니다.</p>
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.wrap}>
          <div className={s.ctaBox}>
            <h2>카드로 본 내용을 실제로 받아 보세요</h2>
            <p>브리프를 주시면 광고그룹과 문안 초안을 만들어 검수 파일로 보내 드립니다.</p>
            <div className={s.ctaActs}>
              <Link href="/workbook" className={`${s.btn} ${s.lg}`}>브리프 작성하기</Link>
              <a href={MAILTO} className={`${s.ghost} ${s.lg}`}>도입 문의</a>
            </div>
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
