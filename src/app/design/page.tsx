import type { Metadata } from "next";
import Link from "next/link";
import s from "./index.module.css";

export const metadata: Metadata = {
  title: "메인 페이지 리디자인 시안 | 나스미디어 OpenAI Ads",
  description: "메인 페이지 리디자인 시안 A/B 비교용 페이지입니다.",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    href: "/design/a",
    tag: "시안 A",
    name: "Paper",
    sub: "밝은 에디토리얼",
    palette: ["#faf9f6", "#14161b", "#e51d35"],
    points: [
      "종이 톤의 밝은 배경 + KT 레드 단일 액센트",
      "카드 박스 대신 헤어라인과 여백으로 구획",
      "큰 타이포 중심, 나스미디어 홈페이지와 톤 연결",
    ],
    className: "cardA",
  },
  {
    href: "/design/b",
    tag: "시안 B",
    name: "Ink",
    sub: "정제된 다크",
    palette: ["#0b0b0c", "#f4f2ee", "#ff5a5f"],
    points: [
      "남색·블루·민트를 걷어낸 뉴트럴 다크",
      "따뜻한 아이보리 텍스트 + 코럴 액센트 하나",
      "큰 숫자를 축으로 한 세로 흐름, 카드 최소화",
    ],
    className: "cardB",
  },
];

export default function DesignIndexPage() {
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <span className={s.kicker}>INTERNAL · 검토용</span>
        <h1 className={s.title}>메인 페이지 리디자인 시안</h1>
        <p className={s.lead}>
          현재 운영 페이지는 그대로 두고 별도 경로에 만든 검토용 시안입니다. 두 시안은
          <strong> 같은 문구</strong>를 쓰기 때문에 색상과 레이아웃만 비교하시면 됩니다.
          문구는 현재 페이지 대비 약 60% 줄였습니다.
        </p>

        <div className={s.grid}>
          {CONCEPTS.map((c) => (
            <Link key={c.href} href={c.href} className={`${s.card} ${s[c.className]}`}>
              <div className={s.swatches}>
                {c.palette.map((p) => <span key={p} style={{ background: p }} />)}
              </div>
              <span className={s.tag}>{c.tag}</span>
              <h2 className={s.name}>{c.name}</h2>
              <p className={s.sub}>{c.sub}</p>
              <ul className={s.points}>
                {c.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <span className={s.go}>시안 보기 →</span>
            </Link>
          ))}
        </div>

        <div className={s.foot}>
          <Link href="/">현재 운영 중인 메인 페이지 보기</Link>
        </div>
      </div>
    </div>
  );
}
