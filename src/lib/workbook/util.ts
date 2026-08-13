/** 폼과 서버가 같이 쓰는 작은 도우미들입니다. */

/** 이미지 주소에서 파일명만 뽑습니다. 실패하면 주소를 그대로 씁니다. */
export function fileNameFromUrl(imageUrl: string) {
  const raw = String(imageUrl ?? "").trim();
  if (!raw) return "";
  try {
    const last = new URL(raw).pathname.split("/").filter(Boolean).pop() ?? "";
    return decodeURIComponent(last) || raw;
  } catch {
    return raw.split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? raw;
  }
}
