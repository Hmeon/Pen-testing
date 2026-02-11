# Liquid Glass Stage 0 Baseline (2026-02-11)

## 목적

Liquid Glass 적용 전 현재 포트폴리오 상태를 정량/정성 기준으로 고정해, 적용 후 비교 가능한 기준선을 확보한다.

## 측정 환경

- 측정일시: 2026-02-11
- 로컬 서버: `python -m http.server 8000`
- URL: `http://127.0.0.1:8000/`
- Lighthouse: `npx lighthouse` (headless, JSON 출력)
- 리포트 파일: `docs/lighthouse_stage0_before.json`

## 현재 UI 구조 기준선

- Hero 구역: 본문 카피 + `Paper Preview` + `Snapshot` 3블록
- PDF 미리보기: 상단 우측 패널(`iframe`) + 확대 토글 버튼
- 주요 섹션: `#top`, `#paper`, `#evidence`, `#findings`, `#method`
- 버튼 CTA: 상단 Hero에 집중(`PDF 열기`, `PDF 다운로드`, `핵심 증빙 바로 보기`)

## 자산 크기 기준선

- `index.html`: 10,606 bytes
- `styles.css`: 11,483 bytes
- `app.js`: 1,517 bytes
- `Pen_Testing.pdf`: 25,684,143 bytes

## 접근성/표현 관련 현황

- `prefers-reduced-motion`: 적용됨
- `prefers-contrast`: 미적용
- `forced-colors`: 미적용
- `backdrop-filter`: topbar 1곳만 사용

## Lighthouse 기준선 (Before)

- Performance: 100
- Accessibility: 100
- Best Practices: 96
- SEO: 92

Core timing:

- FCP: 1.4s
- LCP: 1.4s
- Speed Index: 1.4s
- TBT: 0ms
- CLS: 0

주요 감점 항목(후속 개선 후보):

1. `errors-in-console`: 브라우저 콘솔 오류 감지(주요 원인: `favicon.ico` 404)
2. `robots-txt`: `robots.txt` 부재
3. `unminified-css`, `cache-insight`: 정적 최적화 미적용 상태

## Stage 1 착수 조건 확인

다음 조건을 충족했으므로 Stage 1~2 구현에 착수한다.

1. 구조 기준선 문서화 완료
2. 성능/접근성 초기 점수 확보 완료
3. 적용 후 비교할 측정 파일(`lighthouse_stage0_before.json`) 확보 완료

