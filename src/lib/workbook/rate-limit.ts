/**
 * 제출 API 속도 제한 (최선 노력).
 *
 * 서버리스 환경에서는 인스턴스마다 메모리가 분리되므로 완전한 제한은 아니다.
 * 자동화된 대량 제출을 늦추는 1차 방어이며, 확실한 차단은 WAF/게이트웨이에서
 * 처리해야 한다.
 */
const WINDOW_MS = 10 * 60 * 1000; // 10분
const MAX_HITS = 5; // 동일 IP 기준 허용 횟수

type Bucket = { hits: number[] };
const buckets = new Map<string, Bucket>();

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for") ?? "";
  const first = fwd.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "unknown";
}

/** 허용되면 null, 초과되면 남은 대기 초를 반환한다. */
export function checkRateLimit(key: string): number | null {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);

  if (bucket.hits.length >= MAX_HITS) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0] ?? now;
    return Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000));
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // 오래된 항목 정리 (메모리 누수 방지)
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.hits.every((t) => now - t >= WINDOW_MS)) buckets.delete(k);
    }
  }
  return null;
}
