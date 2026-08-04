"use client";

import Link from "next/link";
import type { Theme, Variant } from "./hooks";

/** 시안 6종이 공통으로 쓰는 헤더 컨트롤.
 *  스타일은 각 시안의 CSS 모듈에서 클래스로 주입합니다. */
export function HeaderControls({
  slug, variant, theme, onToggleTheme, cls,
}: {
  slug: string;
  variant: Variant;
  theme: Theme;
  onToggleTheme: () => void;
  cls: { toggle: string; swap: string; btn: string; sm: string };
}) {
  const other: Variant = variant === "new" ? "legacy" : "new";
  const otherHref = other === "legacy" ? `/concept/${slug}/legacy` : `/concept/${slug}`;
  return (
    <>
      <button
        type="button"
        className={cls.toggle}
        onClick={onToggleTheme}
        aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
        title={theme === "dark" ? "라이트 모드" : "다크 모드"}
      >
        {theme === "dark" ? "☀" : "☾"}
      </button>
      <Link
        href={otherHref}
        className={cls.swap}
        title={other === "legacy" ? "기존 메인 페이지 문구로 보기" : "새로 쓴 문구로 보기"}
      >
        {other === "legacy" ? "기존 텍스트 적용" : "새 텍스트 적용"}
      </Link>
      <Link href="/workbook" className={`${cls.btn} ${cls.sm}`}>브리프 작성</Link>
    </>
  );
}
