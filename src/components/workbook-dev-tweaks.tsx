"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function WorkbookDevTweaks() {
  const router = useRouter();
  useEffect(() => {
    const brand = document.querySelector<HTMLAnchorElement>(".wbd .brand");
    if (!brand) return;
    const goHome = (e: MouseEvent) => {
      e.preventDefault();
      router.push("/");
    };
    brand.addEventListener("click", goHome);
    brand.setAttribute("aria-label", "메인 페이지로 이동");
    return () => brand.removeEventListener("click", goHome);
  }, [router]);
  return null;
}
