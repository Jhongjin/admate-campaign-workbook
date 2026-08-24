import type { WorkbookDraft } from "./types";

/**
 * 개인정보 비수집 운영 전환 스위치입니다.
 *
 * 다시 수집해야 하는 승인이 나면 `true`로만 바꾸면 화면·메일·워크북 항목을
 * 함께 되살릴 수 있습니다. 현재는 클라이언트 화면뿐 아니라 서버 수신값도
 * 비워, 임의 요청으로 들어온 개인정보가 파일이나 메일에 남지 않게 합니다.
 */
export const COLLECT_CONTACT_PII = false;

export function withoutContactPii(draft: WorkbookDraft): WorkbookDraft {
  if (COLLECT_CONTACT_PII) return draft;

  return {
    ...draft,
    contact: {
      ...draft.contact,
      name: "",
      email: "",
      phone: "",
      agencyName: "",
      agencyEmail: "",
      agencyPhone: "",
    },
  };
}
