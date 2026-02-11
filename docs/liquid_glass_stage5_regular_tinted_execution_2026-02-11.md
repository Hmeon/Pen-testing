# Liquid Glass Stage 5 - Regular/Tinted 고정 구현 (2026-02-11)

## 1. 목표
- 모드 전환 UI 없이, 기본 상태를 Apple Liquid Glass 계열의 `Regular/Tinted` 느낌으로 고정한다.
- 버튼/네비게이션 텍스트 선명도를 유지하면서 유리 질감(배경 굴절 + 하이라이트 + 이중 경계)을 강화한다.
- 접근성 옵션(`contrast`, `forced-colors`, `reduced-transparency`, `reduced-motion`)은 유지한다.

## 2. 추가 심층 조사 요약
Apple의 공개 자료 기준으로 Liquid Glass는 "컨트롤 계층의 일관성"과 "콘텐츠 가독성 보전"을 동시에 목표로 한다.

1. Liquid Glass는 컨트롤, 내비게이션, 앱 구조 전반에 공통 시각 원칙으로 적용된다.
2. Clear/Regular/Tinted 변형이 있으며, 상황에 맞는 대비 확보가 핵심이다.
3. 시각 효과 자체보다 읽기 쉬운 텍스트, 명확한 경계, 상태 변화 일관성이 우선이다.

참고:
- https://developer.apple.com/videos/play/wwdc2025/219/
- https://developer.apple.com/videos/play/wwdc2025/356/
- https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- https://support.apple.com/en-vn/guide/iphone/iph8f16f95bb/ios

## 3. Stage 5 구현 변경

### 3.1 토큰 재조정 (`styles.css`)
- Liquid Glass 변수 재조정:
  - `--lg-surface-alpha`, `--lg-blur`, `--lg-saturate`
  - `--lg-control-fill`, `--lg-control-border`, `--lg-control-shadow`
  - `--lg-control-backdrop` (blur/saturate/brightness 통합)
- `body.liquid-mode-tinted`에서 Regular/Tinted 고정용 오버라이드 적용.

### 3.2 컨트롤 질감 강화 + 선명도 보전
- 대상: `.btn`, `.glass-control`, `.site-nav a`
- 추가/조정:
  - 배경 다층 그라디언트
  - 상단 스펙큘러 하이라이트(`::before`)
  - 내부 얇은 경계 링(`::after`)
  - `backdrop-filter` 강화
  - 텍스트 선명도 보정(`text-shadow: none`, font smoothing 계열 설정)

### 3.3 패널 계층 정리
- `.paper-panel`을 유리 패널 계층으로 재설계:
  - 반투명 배경 + 경계 + 그림자 + backdrop-filter
  - 정적 하이라이트 오버레이(`.paper-panel::before`)
- PDF 컨테이너는 내부 실체층처럼 보이도록 경계/음영 재조정.

### 3.4 접근성/폴백 확장
- `@supports not (backdrop-filter...)`에서 새 레이어(`::after`, `.paper-panel::before`)까지 비활성화.
- `prefers-contrast: more`, `forced-colors: active`, `prefers-reduced-transparency: reduce`에 동일하게 반영.

## 4. 검증
- 정적 서빙 검증:
  - `/` -> 200
  - `/styles.css` -> 200
  - `/app.js` -> 200
  - `/Pen_Testing.pdf` -> 200
- CSS 구조 검증:
  - `{` / `}` 개수 동일(137 / 137)

## 5. 결론
- Stage 5는 "효과 과장"이 아니라 "컨트롤 선명도 + 유리 질감" 균형에 맞춘 고정형 Liquid Glass 조정이다.
- 다음 단계에서는 실제 기기(iOS Safari/macOS Safari/Chromium)에서 체감 차이를 확인하며 blur 강도와 경계 대비를 미세 조정한다.
