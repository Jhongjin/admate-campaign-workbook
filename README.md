# AdMate Campaign Workbook

외부 광고주와 대행사가 OpenAI Ads 캠페인 제작에 필요한 정보를 단계별로 작성하는 독립 웹 서비스입니다.

## 현재 범위

- 담당자, 캠페인, 상품·고객, 광고 이미지, 표현 기준 단계형 입력
- 각 필드의 작성 목적·방법·예시 제공
- 여러 캠페인·상품·이미지 추가 및 연결
- 브라우저 저장 없이 제출 전 누락 확인
- 반응형·키보드 접근 가능한 기본 UI
- 제출 시 통합워크북 xlsx 생성 후 담당자 메일 발송

서버 저장, 실제 이미지 파일 업로드, 인증은 다음 단계입니다.

## 실행

```bash
npm install
npm run dev
```

## 검사

```bash
npm run lint
npm run build
```

## 제출 → 워크북 발송

`/workbook` 마지막 단계에서 제출하면 `POST /api/workbook/submit` 이
입력값을 "ChatGPT 광고 작업용 통합 워크북" 양식에 채워 xlsx 로 만들고
`openai@nasmedia.co.kr` 로 메일을 보냅니다.

관련 파일:

| 파일 | 역할 |
| --- | --- |
| `src/lib/workbook/types.ts` | 폼과 서버가 공유하는 자료 구조 |
| `src/lib/workbook/template.ts` | 어떤 값이 어느 시트·어느 칸에 들어가는지 |
| `src/lib/workbook/template.xlsx` | 실물 통합워크북 빈 양식 |
| `src/lib/workbook/template-data.ts` | 위 파일을 base64 로 구운 것 (자동 생성) |
| `src/lib/workbook/build-xlsx.ts` | 양식을 열어 값을 채우는 로직 |
| `src/lib/workbook/mailer.ts` | 사내 SMTP Relay 또는 Resend 발송 |

`campaigns` / `상품·브리프` / `이미지소재` / `정책·참고자료` /
`(추가자료)고객질문·검색데이터` / `(추가자료)주력키워드` 시트를 채우고,
`adgroups` · `ads` 는 AI 에이전트가 나중에 채우므로 비워 둡니다.
폼에 없는 담당자 정보는 `담당자·제출정보` 시트를 한 장 덧붙여 기록합니다.

### 메일 환경변수

`.env.example` 참고. 기본 발송 경로는 `WORKBOOK_MAIL_TRANSPORT=resend`이며,
사내 SMTP 자격증명을 등록해도 기존 Resend 발송을 유지합니다. 사내 Relay가
실제 발송 검증을 통과한 뒤에만 `WORKBOOK_MAIL_TRANSPORT=smtp`로 명시 전환합니다.
선택된 발송 경로가 실패하면 브라우저에서 파일을 내려받도록 안내합니다.

Resend와 사내 SMTP는 발신 주소를 분리합니다. Resend는 `RESEND_MAIL_FROM`
(기본 `noreply@nasmedia.co.kr`), 사내 SMTP는 `SMTP_MAIL_FROM`
(기본 `alert@nasmedia.co.kr`)만 사용합니다. 한 쪽의 발신 주소 변경이 다른
발송 경로에 영향을 주지 않도록 합니다.

사내 Relay 주소와 발신 주소는 운영 환경변수로만 등록합니다. `SMTP_PASS`는
비밀값으로 등록하며 `SMTP_REQUIRE_TLS`는 기본적으로 `true`입니다. TLS를
지원하지 않는 Relay는 비밀번호를 평문으로 전송할 수 있으므로, 예외 해제 대신
IT운영팀에 STARTTLS 또는 별도 안전한 연동 방식을 요청합니다.

### 양식이 개정되면

```bash
node scripts/make-blank-template.mjs "<새 워크북.xlsx>"   # 샘플 값을 지워 빈 양식 저장
node scripts/build-template.mjs                          # 번들용 모듈 다시 굽기
```

시트명·컬럼 문구가 바뀌었다면 `src/lib/workbook/template.ts` 도 함께 고칩니다.
컬럼은 이름으로 찾으므로 순서가 바뀌는 것은 코드 수정 없이 따라갑니다.
