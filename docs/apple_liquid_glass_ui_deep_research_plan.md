# Apple Liquid Glass UI 심층 해부 및 웹 구현 기획서

- 작성일: 2026-02-11
- 대상 프로젝트: `Pen-Testing` 정적 포트폴리오(`index.html`, `styles.css`, `app.js`)
- 목표: "Apple Liquid Glass UI"를 웹에서 고품질로 재현 가능한 수준까지 해부하고, 실제 구현 단계 계획을 확정한다.

## 1. 리서치 목표와 질문

이 문서는 아래 4개 질문에 답하기 위해 작성했다.

1. Apple이 말하는 Liquid Glass의 핵심 시각 원리와 사용 원칙은 무엇인가?
2. 웹 표준(CSS/JS)만으로 어느 수준까지 구현 가능한가?
3. 성능/접근성 제약은 무엇이며, 어떤 설계 규칙이 필요한가?
4. 본 프로젝트에 적용할 단계별 실행 계획(착수-완료 기준 포함)은 어떻게 설계할 것인가?

## 2. 1차 소스 기준 핵심 정의 (Apple)

### 2.1 Liquid Glass의 본질

Apple WWDC25 자료 기준으로 Liquid Glass는 단순 blur가 아니라 다음을 포함하는 "동적 재질(material) 시스템"이다.

- 광학: 배경 굴절(lensing/refraction), 하이라이트, 그림자, 투명도 변조
- 동작: 터치/상호작용 시 유동적인 반응, 머티리얼 변형/병합, 전환 중 형태 모핑
- 적응: 배경 콘텐츠에 따라 tint/명암/다이내믹 레인지/그림자 강도 조정
- 계층: 콘텐츠 위에 떠 있는 기능 레이어(내비게이션/컨트롤)로 동작

핵심 해석:

- Liquid Glass는 "효과 1개"가 아니라 "복합 레이어 동기화 시스템"이다.
- 따라서 웹에서 구현할 때도 단일 `backdrop-filter`로 끝내면 품질이 낮다.

### 2.2 사용 원칙 (Apple 가이드 발췌 해석)

WWDC25 세션에서 반복되는 원칙은 다음과 같다.

- Liquid Glass는 콘텐츠 레이어 전체가 아니라 "상호작용 레이어"에 제한해 사용
- "glass on glass" 중첩 회피
- 기본 컴포넌트/표준 구조를 우선 사용하고 커스텀은 필요 지점만 적용
- 장식 목적이 아닌 계층/가독성/상호작용 명확화 목적
- 스크롤 엣지 효과는 장식이 아니라 UI/콘텐츠 경계 명확화용
- tint는 중요 액션 강조용으로 제한

핵심 해석:

- "많이 바를수록 고급"이 아니라 "계층을 명확히 보이게 최소 적용"이 정답이다.

### 2.3 근거 로그 (핵심 주장-출처 연결)

1. Liquid Glass는 굴절/반사/동적 반응을 포함한 재질 체계다.  
   출처: WWDC25 `Meet Liquid Glass`, `SwiftUI What’s New`
2. 콘텐츠 전체 도포가 아닌 "기능 레이어" 중심 적용이 원칙이다.  
   출처: WWDC25 `Meet Liquid Glass`, `Get to know the new design system`
3. 커스텀 바 배경/글래스 중첩은 제거 또는 최소화가 권장된다.  
   출처: WWDC25 `What’s new in UIKit`, `Build a UIKit app with the new design`
4. 그룹화된 glass 동작(연동/모핑)은 컨테이너 단위 설계가 필요하다.  
   출처: WWDC25 `What’s new in SwiftUI`
5. `backdrop-filter`/mix-blend 계열은 렌더링 비용이 크며 중첩 시 위험하다.  
   출처: CSSWG Filter Effects Level 2, WebKit Blog
6. 대비/모션 접근성 기준을 충족하지 못하면 효과보다 가독성을 우선해야 한다.  
   출처: WCAG 2.2 SC 1.4.3, 1.4.11, 2.3.3

## 3. 효과 해부 (Visual Decomposition)

Liquid Glass를 웹 구현 관점에서 8개 모듈로 분해한다.

### 3.1 Base Material (투명 재질층)

- 역할: 콘텐츠를 완전히 가리지 않으면서 분리감 제공
- 웹 대응: `background: rgba(...)` + `backdrop-filter: blur(...)`
- 난이도: 낮음

### 3.2 Lensing Edge (렌즈 가장자리)

- 역할: 경계에서 빛이 휘는 듯한 존재감
- 웹 대응: pseudo-element + radial/linear gradient + inner highlight
- 난이도: 중간

### 3.3 Adaptive Contrast (적응 가독성)

- 역할: 배경 변화에도 버튼/라벨 가독성 유지
- 웹 대응: 명도 기반 overlay/tint 단계화 + 상태별 텍스트/아이콘 톤 전환
- 난이도: 중간~높음

### 3.4 Dynamic Shadow (문맥형 그림자)

- 역할: 배경이 복잡할수록 분리감 강화
- 웹 대응: 복수 shadow 프리셋 + 스크롤/배경 상태에 따른 토글
- 난이도: 중간

### 3.5 Interaction Glow (터치 반응)

- 역할: 클릭/호버 지점에서 내부 발광 및 생동감
- 웹 대응: pointer 위치 기반 gradient 변수 + keyframe/transition
- 난이도: 중간

### 3.6 Morph/Group Behavior (집합 모핑)

- 역할: 요소가 분리/결합될 때 액체처럼 이어지는 전환
- 웹 대응: FLIP 전환 + 공통 컨테이너 애니메이션 + clip-path/scale
- 난이도: 높음

### 3.7 Scroll Edge Separation (스크롤 경계 레이어)

- 역할: UI 레이어와 콘텐츠 레이어 경계 가독성 유지
- 웹 대응: sticky edge overlay + blur/gradient 조합
- 난이도: 낮음~중간

### 3.8 Tint Mapping (색 강조)

- 역할: primary action 강조 + 배경 기반 tone 맵핑
- 웹 대응: limited accent tokens + brightness-aware tint step
- 난이도: 중간

## 4. 웹 구현 가능성 판정

### 4.1 결론 요약

- 결론: "완전 동일 재현"은 불가, "고품질 근사 구현"은 가능
- 목표 수준: 정적 포트폴리오 기준으로 시각 체감 80~90% 근접 가능
- 제약 원인: Apple 시스템 레벨 재질 엔진/프레임워크 내장 동작(자동 적응/동기 모핑/광학 모델) 비공개

### 4.2 구현 가능 항목 (High Confidence)

- 반투명 재질 + 배경 blur
- 글래스 엣지 하이라이트
- hover/click 반응 글로우
- 스크롤 경계 분리 효과
- 강조 tint 체계
- 가독성 우선 모드 전환

### 4.3 부분 가능 항목 (Medium Confidence)

- 배경 문맥 기반 동적 그림자 강도 최적화
- 그룹 모핑(요소 병합/분리) 자연스러운 동작
- 배경 색상 유입(light spill) 느낌

### 4.4 제한 항목 (Low Confidence)

- Apple 네이티브 수준의 실시간 광학 굴절 정합도
- 시스템 전역 상태와 동기화되는 자동 재질 변형
- 복잡한 중첩 구조에서도 안정적인 고프레임 유지

### 4.5 브라우저 현실성/지원성

- MDN 기준 `backdrop-filter`는 Baseline 2024로 표기되어 최신 브라우저군에서 공통 사용 가능 영역으로 진입
- caniuse 기준(조회일: 2026-02-11) 전 세계 사용량 커버리지 약 95.76%
- 다만 구형 브라우저/특정 환경에서는 품질 편차가 존재하므로 `@supports (backdrop-filter: blur(1px))` 분기 필요

지원성 전략:

1. 지원 브라우저: Liquid Glass 근사 렌더링 활성화
2. 비지원 브라우저: 반투명 단색 + 명확한 경계선 + 그림자 fallback
3. 강제색/고대비: 효과를 최소화하고 정보 식별성 우선

## 5. 성능 제약 분석 (중요)

`backdrop-filter`는 성능 비용이 큰 영역이다.

- 브라우저가 추가 렌더 패스를 수행해야 함
- 중첩/대면적/다수 사용 시 GPU 대역폭/메모리 비용 상승
- 스펙 문서도 backdrop/mix-blend 조합의 성능 폭증 리스크를 명시

본 프로젝트 운영 규칙:

1. 한 화면 동시 글래스 핵심 영역 수 제한
2. 큰 면적 blur는 최소화하고, 필요한 핵심 UI에만 적용
3. 중첩 backdrop-filter 금지
4. 스크롤 중 실시간 계산은 최소화하고 상태 기반 토글 우선
5. 저사양/모바일에서 강도 낮춘 fallback 사용

권장 초기 예산:

- 동시 주요 glass surface: 모바일 1~2개, 데스크톱 2~3개
- blur radius: 기본 10~18px, 확대 상태 외 과도한 blur 금지
- glass-on-glass: 금지

### 5.1 성능 측정 및 합격 기준

Stage별 측정 항목:

1. 스크롤 중 프레임 안정성(체감 끊김 여부 + DevTools 프레임 타임)
2. 렌더링 비용(Paint/Composite 이벤트 급증 여부)
3. 상호작용 응답성(hover/click 시 지연 여부)
4. 모바일 저전력 기기에서 발열/버벅임 체감

합격 기준(실무형):

- 주 사용 해상도(데스크톱/모바일)에서 스크롤 시 체감 저하 없음
- 핵심 CTA 상호작용 지연 체감 없음
- glass 효과 제거 fallback에서도 정보 구조 유지

## 6. 접근성 제약 분석 (필수)

Liquid Glass 류 UI는 배경이 보이기 때문에 대비 저하 위험이 크다.
아래 기준을 강제해야 한다.

- 텍스트 대비: WCAG 2.2 SC 1.4.3 (일반 텍스트 4.5:1, 큰 텍스트 3:1)
- 비텍스트 UI 대비: WCAG 2.2 SC 1.4.11 (컴포넌트/상태 3:1)
- 모션 민감 사용자 대응:
  - `prefers-reduced-motion` 존중
  - 불필요한 상호작용 모션 축소/비활성
- 고대비/강제색 모드 대응:
  - `prefers-contrast`, `forced-colors` 대응 스타일 제공

접근성 설계 원칙:

- 미려함보다 식별성 우선
- 효과가 대비를 무너뜨리면 효과를 제거
- 커스텀 포커스 링/경계는 항상 명확히 유지

## 7. 구현 아키텍처 계획 (본 프로젝트 적용)

### 7.1 토큰 계층

- `--lg-blur`, `--lg-surface`, `--lg-edge`, `--lg-shadow`
- `--lg-tint-primary`, `--lg-tint-strong`, `--lg-contrast-boost`
- `--lg-motion-fast`, `--lg-motion-fluid`

### 7.2 컴포넌트 계층

- `glass-surface`: 기본 머티리얼
- `glass-control`: 버튼/탭/툴바용 인터랙션 표면
- `glass-edge-soft|hard`: 스크롤 경계 분리
- `glass-group`: 모핑/집합 동작 관리 컨테이너

### 7.3 상태 계층

- `is-glass-active`: 표준 상태
- `is-glass-emphasis`: 주요 액션 tint
- `is-glass-muted`: 저강도 상태
- `is-accessibility-safe`: 대비 우선 모드
- `is-reduced-motion`: 모션 축소 모드

## 8. 단계별 실행 로드맵 (착수 기준 확정)

### Stage 0. 기준선 확보 (Baseline)

- 현재 UI 스냅샷, Lighthouse, 수동 접근성 점검 기록
- 목표 성능/가독성 지표 설정
- 종료 조건: "비교 가능한 before 데이터" 확보

### Stage 1. 재질 기반층 구축

- 핵심 1~2개 영역에만 글래스 표면 도입
- blur/투명도/경계 하이라이트 기본 토큰화
- 종료 조건: 시각적 일관성 + 크로스브라우저 기본 동작 확인

### Stage 2. 계층/경계 정리

- 스크롤 엣지 분리 도입(soft 기본, hard 제한 사용)
- 콘텐츠/컨트롤 분리 규칙 적용
- 종료 조건: 스크롤 시 가독성 유지, 경계 인지 가능

### Stage 3. 인터랙션/모션 적용

- hover/focus/press 반응 통일
- 모핑은 1개 플로우에 제한 적용 후 검증
- 종료 조건: 과한 애니메이션 없이 반응성 향상

### Stage 4. 적응 가독성/틴트 튜닝

- 강조 액션만 tint 적용
- 배경 복잡도 높은 구간 대비 보정 로직 적용
- 종료 조건: 텍스트/아이콘 식별성 저하 없음

### Stage 5. 접근성 강제 모드 구현

- `prefers-reduced-motion` 대응
- `prefers-contrast`, `forced-colors` 대응
- 키보드 포커스/명도 대비 재검증
- 종료 조건: 핵심 경로 접근성 실패 항목 0

### Stage 6. 성능 튜닝/릴리즈 고정

- 렌더 비용 높은 영역 축소
- 중첩 효과 제거, 토큰 강도 최적화
- 모바일 실기기 확인
- 종료 조건: 스크롤/상호작용에서 체감 저하 없음

## 9. 리스크와 대응

1. 리스크: glass 과다 사용으로 계층 혼탁  
   대응: "핵심 인터랙션 레이어만 적용" 규칙 강제

2. 리스크: blur 과다로 성능 저하  
   대응: 면적/개수/강도 상한선 도입

3. 리스크: 배경 이미지와 겹쳐 대비 붕괴  
   대응: dimming/contrast boost 토큰 자동 적용

4. 리스크: 모션 과다로 사용자 피로  
   대응: 모션 축소 모드 + 비필수 모션 제거

5. 리스크: 브라우저 호환 편차  
   대응: fallback 스타일 + feature query 기반 분기

## 10. 최종 판정 (Go / No-Go)

- Go 조건:
  - 핵심 레이어에 한정 적용
  - 접근성 기준(대비/모션) 충족
  - 성능 예산 내 유지

- No-Go 조건:
  - glass를 콘텐츠 레이어까지 확장
  - 중첩 필터로 프레임 저하 발생
  - 대비 기준 미충족 상태로 시각효과 우선

최종 판단:

- 본 프로젝트는 Liquid Glass 스타일 "고품질 근사 구현" 대상으로 적합하다.
- 단, "전역 도포"가 아니라 "핵심 인터랙션 레이어 정밀 적용" 전략으로 진행해야 한다.

## 11. 다음 구현 단계에서 바로 사용할 체크리스트

1. 이 요소는 콘텐츠가 아니라 인터랙션 레이어인가?
2. glass-on-glass 중첩이 발생하지 않는가?
3. 텍스트 대비 4.5:1(또는 대형 텍스트 3:1), UI 경계 3:1 충족하는가?
4. `prefers-reduced-motion`에서 모션이 충분히 줄어드는가?
5. 강제색/고대비 모드에서 식별성 유지되는가?
6. 모바일 스크롤에서 렌더 저하가 없는가?
7. 효과가 장식이 아니라 계층/가독성에 기여하는가?

## 12. 조사 출처 (인터넷 1차 자료)

Apple / WWDC25

1. Meet Liquid Glass (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/219/
2. Get to know the new design system (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/356/
3. What’s new in UIKit (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/243/
4. Build a UIKit app with the new design (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/284/
5. Build a SwiftUI app with the new design (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/323/
6. What’s new in SwiftUI (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/256/
7. SwiftUI What’s New (Apple Developer)  
   https://developer.apple.com/swiftui/whats-new/

Web standards / implementation

8. MDN: `backdrop-filter`  
   https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
9. MDN: `filter`  
   https://developer.mozilla.org/en-US/docs/Web/CSS/filter
10. MDN: `mix-blend-mode`  
    https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
11. CSSWG Draft: Filter Effects Module Level 2 (`backdrop-filter`, Backdrop Root)  
    https://drafts.csswg.org/filter-effects-2/
12. WebKit Blog: Introducing Backdrop Filters  
    https://webkit.org/blog/3632/introducing-backdrop-filters/
13. Can I use: CSS Backdrop Filter  
    https://caniuse.com/css-backdrop-filter

Accessibility

14. WCAG 2.2 Understanding SC 1.4.3 Contrast (Minimum)  
    https://w3c.github.io/wcag/understanding/contrast-minimum.html
15. WCAG 2.2 Understanding SC 1.4.11 Non-text Contrast  
    https://w3c.github.io/wcag/understanding/non-text-contrast.html
16. WCAG 2.2 Understanding SC 2.3.3 Animation from Interactions  
    https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
17. MDN: `prefers-reduced-motion`  
    https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion
18. MDN: `prefers-contrast`  
    https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-contrast
19. MDN: `forced-colors`  
    https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/forced-colors
