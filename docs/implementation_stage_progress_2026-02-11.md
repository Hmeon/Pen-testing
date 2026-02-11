# Implementation Stage Progress (2026-02-11)

목적: 하이퀄리티 기획 이후 실제 적용 단계의 진행 상태를 기록한다.

## 1) 적용 완료 범위

1. `index.html` 전면 개편
- Hero/Quick Facts/Method/Findings/Evidence/Report/Footer 구조 반영
- Skip link, 키보드 포커스, 섹션 네비게이션 반영
- 핵심 증빙 6장 삽입 및 원본 링크 연결

2. 스타일/인터랙션 분리
- `styles.css` 신설: 토큰 기반 디자인 시스템, 반응형, 모션, 접근성 상태 포함
- `app.js` 신설: PDF 클릭 로드(지연 로딩) 로직 적용

3. 배포 정책 전환
- `vercel.json`을 `headers + rewrites` 중심으로 전환
- CSP, Referrer-Policy, X-Content-Type-Options 등 기본 보안 헤더 추가
- 정적 자산별 캐시 정책 분리

4. 실제 Finding 반영
- `docs/finding_catalog_actual_2026-02-11.md` 신설
- PDF TABLE XVIII 기준(F-01~F-03)으로 CWE/CVSS/상태값 정리
- `index.html` Findings 섹션을 실제 항목/점수/근거 링크로 교체

5. 이미지 도판 매핑 교정
- 사용자 기준(`fig_x-y.png` = `just_report.pdf`의 X장 그림 x-y)으로 Evidence 캡션/alt 재매핑
- 해석성 문구를 제거하고 도판 번호 기반 표기로 통일

## 2) 검증 결과

## 2.1 정적 검증

1. JSON 파싱: `vercel.json` 정상
2. 내부 앵커: `#main-content`, `#facts`, `#method`, `#findings`, `#evidence`, `#report` 모두 유효
3. 구조 카운트: `H1=1`, `H2=6`, `H3=13`
4. 참조 자산: `Pen_Testing.pdf`, `styles.css`, `app.js`, 갤러리 10개 이미지 경로 모두 존재
5. 접근성/구조 자동 점검:
- 이미지 `alt`: `10/10`
- 내부 앵커 유효: `7/7`
- 새 창 링크 `noopener noreferrer`: `16/16`
- PDF 버튼 ARIA(`aria-controls`, `aria-expanded`) 확인

## 2.2 로컬 서버 응답 검증 (`python -m http.server 8123`)

1. `/` -> `200`
2. `/Pen_Testing.pdf` -> `200`
3. `/img/fig_7-2.png` -> `200`
4. `/styles.css` -> `200`
5. `/app.js` -> `200`

## 3) 남은 수작업 검증 (배포 전 최종)

1. 실제 브라우저에서 키보드 탭 순서 확인
2. 모바일 뷰포트(360~430px)에서 레이아웃/가독성 확인
3. PDF 로드 버튼 동작 및 폴백 동작 확인
4. Vercel 배포 후 응답 헤더 실측 확인

## 4) 다음 실행 우선순위

1. CVSS v4 벡터/점수 재평가 후 카탈로그 갱신
2. 브라우저 수동 QA(모바일/키보드/PDF 동작) 실행 기록 추가
3. 필요 시 이미지 파일명 정규화(`fig_2-3 (1).png`, `fig_6-13(2).png`)
