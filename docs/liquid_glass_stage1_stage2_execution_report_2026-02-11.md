# Liquid Glass Stage 1~2 실행 보고서 (2026-02-11)

## 실행 범위

- Stage 1: 재질 기반층 구축
- Stage 2: 계층/경계 정리
- 적용 대상: `index.html`, `styles.css`, `app.js`

## 적용 결과 요약

1. 상단바와 논문 미리보기 패널을 Liquid Glass 핵심 레이어로 전환
2. 스크롤 경계 분리(Topbar edge) 도입
3. 논문 미리보기 패널에 포인터 반응 글로우 도입
4. 접근성/호환성 보호막(`prefers-contrast`, `forced-colors`, `@supports`) 추가
5. 품질 보완: `favicon` 추가, `robots.txt` 추가

추가 보정(동일 날짜 후속):

- 사용자 피드백에 따라 "패널 중심"에서 "컨트롤 중심"으로 재정렬
- 버튼/내비 탭의 유리 캡슐 질감(하이라이트/엣지/스윕)을 강화
- 관련 근거와 보강 분석은 `apple_liquid_glass_control_first_research_2026-02-11.md`에 정리

## 파일별 변경 사항

### `index.html`

- Topbar에 glass class 부여  
  `class="topbar glass-surface glass-surface-toolbar"`
- 논문 미리보기 패널에 glass/reactive 훅 부여  
  `class="paper-panel glass-surface glass-surface-paper ..."` + `data-glass-reactive`
- 미리보기 버튼을 glass control 스타일로 전환  
  `class="btn btn-link glass-control"`
- favicon 링크 추가  
  `<link rel="icon" ... href="img/fig_6-16.png" />`

### `styles.css`

- Liquid Glass 토큰 계층 추가
  - `--lg-surface-*`, `--lg-blur`, `--lg-saturate`, `--lg-glow`
- 공통 재질 클래스 추가
  - `.glass-surface`, `.glass-surface-toolbar`, `.glass-surface-paper`
- 반응형 글로우 레이어 추가
  - `[data-glass-reactive]::after`, `.is-pointer-active`
- 스크롤 경계 분리 추가
  - `.topbar::after`, `body.is-scrolled ...`
- 접근성/호환성 방어 추가
  - `@supports not (backdrop-filter...)`
  - `@media (prefers-contrast: more)`
  - `@media (forced-colors: active)`
- 기존 모션 축소 규칙과 연결
  - `prefers-reduced-motion`에서 glass transition 비활성

### `app.js`

- 스크롤 상태 감지
  - `body.is-scrolled` 토글
- 포인터 반응 글로우 좌표 계산
  - `--lg-pointer-x`, `--lg-pointer-y` 업데이트
- 기존 PDF 확대 토글 로직은 유지

### 추가 파일

- `robots.txt` 생성

## 검증 결과

## 1) 기본 응답 체크

- `/` -> `200`
- `/robots.txt` -> `200`
- `/img/fig_6-16.png` -> `200`
- `/Pen_Testing.pdf` -> `200`

## 2) Lighthouse (Before / After)

Before 파일:

- `docs/lighthouse_stage0_before.json`

After 파일:

- `docs/lighthouse_stage1_after.json`

카테고리 점수:

- Before: Performance 100 / Accessibility 100 / Best Practices 96 / SEO 92
- After: Performance 100 / Accessibility 100 / Best Practices 100 / SEO 92

참고:

- After 측정은 Windows 환경에서 Lighthouse 임시 디렉터리 권한 이슈를 우회하기 위해 안정 플래그를 사용해 실행했다.
- SEO의 `robots-txt` 경고는 로컬 `python http.server` 환경에서 계속 보고되며(파일은 200 응답), 배포 환경에서 재검증 필요.

## 3) 수동 확인 포인트

1. Topbar 스크롤 시 경계감(edge shadow) 강화 확인
2. Paper 패널 포인터 이동 시 글로우 반응 확인
3. `미리보기 확대` 토글 정상 동작 확인
4. `prefers-reduced-motion`에서 과도한 전환 비활성 확인
5. 고대비/강제색 모드에서 정보 식별성 유지 확인

## 리스크/메모

1. `backdrop-filter` 효과는 저사양 기기에서 비용이 커질 수 있음  
   대응: Stage 3 이전 모바일 실기기 스크롤 체감 점검 필요
2. Glass 효과 과다 사용 위험  
   대응: 현재는 Topbar/Paper에만 제한 적용(정책 준수)
3. Lighthouse `robots-txt` 로컬 경고 지속  
   대응: 실제 도메인 배포 후 재측정으로 판정

## 다음 단계 제안 (Stage 3)

1. glass 인터랙션 모션 미세조정(hover/focus/press 반응 강도 통일)
2. 논문 뷰어 주변 보조 컨트롤(예: 뷰 모드 표시)의 글래스 일관화
3. 실제 모바일 기기 기준 성능 샘플링(저사양 포함)

실행 상태:

- Stage 3 일부(컨트롤 하이라이트 SVG 렌즈 왜곡)는
  `liquid_glass_stage3_lens_filter_execution_2026-02-11.md`에서 별도 기록
- 이후 사용자 피드백 반영 Stage 4(렌즈 제거 + Tinted Control 재정렬)는
  `liquid_glass_stage4_tinted_control_refinement_2026-02-11.md`에서 별도 기록
