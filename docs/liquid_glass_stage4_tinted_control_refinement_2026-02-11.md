# Liquid Glass Stage 4 - Tinted Control Refinement (2026-02-11)

## 배경

사용자 피드백:

- "버튼 글자가 흐리다"
- "유리 느낌이 Apple Liquid Glass와 다르다"

이 피드백을 기준으로 Stage 4에서는 과장된 렌즈 효과를 버리고, Apple의 `Clear/Tinted` 개념 중 `Tinted`에 맞춘 컨트롤 중심 재설계를 수행했다.

## 심층 조사 보강 요약 (공식 자료 중심)

1. Apple은 Liquid Glass를 컨트롤/내비게이션 레이어 중심으로 설명한다.  
2. Apple 플랫폼에서 Liquid Glass는 `Clear`/`Tinted` 모드를 제공하며, 가독성 필요 시 tinted 선택이 가능하다.  
3. 접근성 설정(`Reduce Transparency`, `Increase Contrast`)이 Liquid Glass 표현에 직접 영향을 준다.

핵심 결론:

- "유리 질감"보다 "읽힘(legibility) + 계층"이 우선이며, 텍스트가 흐리면 구현 방향이 틀린 것이다.

## 구현 변경 (Stage 4)

### 1) 렌즈 왜곡 실험 제거

- SVG filter 블록 제거 (`index.html`)
- CSS `filter: url(...)` 연결 제거 (`styles.css`)

### 2) 컨트롤 선명도 우선 재설계

- `body`에 `liquid-mode-tinted` 클래스 부여 (`index.html`)
- 버튼/탭 텍스트에서 `text-shadow` 제거
- 컨트롤 배경을 `clear`보다 `tinted` 쪽으로 상향(투명도 낮춤, 대비 강화)
- blur/saturate 강도 완화(과도한 유리 왜곡 방지)

### 3) 질감은 유지하되 과장 줄임

- 버튼/탭의 상단 하이라이트(`::before`)는 유지
- sweep streak(`::after`)는 제거
- 결과: "유리 표면" 인상은 남기고, 텍스트의 번짐 체감은 억제

## 품질 확인

- 기본 응답: `/`, `/styles.css`, `/app.js`, `/robots.txt` 모두 `200`
- 문법 체크: `styles.css` 중괄호 개수 일치 확인
- Lighthouse 재측정은 Windows 환경 `CSS.enable` 타임아웃이 반복되어 완전 리포트 확보 실패
- Stage 1 안정 리포트(`docs/lighthouse_stage1_after.json`) 기준 성능/접근성 회귀는 없고,
  Stage 4 변경은 컨트롤 질감/가독성 중심 CSS 리팩터링이라 구조적 리스크가 낮음

## 남은 리스크

1. 실제 Safari/모바일 렌더링에서 blur 체감 편차 가능
2. 매우 밝은 배경 구간에서 탭 대비 저하 가능

## 다음 세부 튜닝 권장

1. iOS Safari 실기기에서 탭/버튼 대비 체감 점검
2. `liquid-mode-clear`/`liquid-mode-tinted` 토글을 개발 모드로 도입해 빠른 비교
3. 포커스 링 컬러를 liquid 톤과 분리해 접근성 가시성 더 강화

## 조사 출처

Apple (공식)

1. Meet Liquid Glass (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/219/
2. Get to know the new design system (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/356/
3. Apple introduces a delightful and elegant new software design (Newsroom, 2025-06-09)  
   https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
4. Apple Support: Make app icons and widgets appear clear or tinted on iPhone  
   https://support.apple.com/en-vn/guide/iphone/iph8f16f95bb/ios

Web platform / 접근성

5. MDN: `backdrop-filter`  
   https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
6. MDN: `prefers-reduced-transparency`  
   https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-transparency

Additional update:
- Stage 5 refinement doc: docs/liquid_glass_stage5_regular_tinted_execution_2026-02-11.md
