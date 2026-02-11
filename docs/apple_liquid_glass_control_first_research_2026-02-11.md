# Apple Liquid Glass Control-First 심층 조사 보강 (2026-02-11)

## 왜 추가 조사가 필요했는가

초기 적용에서 패널(면적 큰 영역) 중심 blur가 먼저 강조되면서, 사용자 체감 기준의 "유리 질감 버튼/컨트롤"이 약하게 보였다.

즉, 조사 방향이 틀린 것이 아니라 구현 우선순위가 Apple의 실제 강조점과 어긋나 있었다.

## Apple 1차 소스 기준 재정렬

다음 항목은 Apple 공식 세션/문서에서 공통으로 드러나는 핵심이다.

1. Liquid Glass는 단순 배경 blur가 아니라, 컨트롤 레이어에서 존재감을 만드는 동적 재질이다.
2. 기본 버튼/세그먼트/툴바 같은 "기능 요소"에 적용될 때 효과가 가장 명확하다.
3. 커스텀 뷰에서 내부 하위 요소를 따로 스타일링하기보다, 컨트롤 단위로 재질을 적용하는 것이 권장된다.
4. 스크롤 엣지/바 영역은 콘텐츠 위에 떠 있는 레이어처럼 동작해야 한다.

핵심 해석:

- 면적 큰 카드보다 "버튼/탭/바"의 유리 질감이 먼저 살아야 Liquid Glass처럼 보인다.

## Control Texture를 구성하는 6개 시각 레이어

웹 구현 시 컨트롤(버튼/내비 탭) 기준으로 아래 순서가 필요하다.

1. Base Translucent Fill  
   반투명 본체 레이어(`linear-gradient + rgba`)
2. Edge Contrast  
   상단 밝은 엣지 + 하단 어두운 엣지(inset shadow 2중)
3. Specular Highlight  
   상단 곡면 하이라이트(radial/linear 혼합)
4. Refraction Tint  
   우하단/측면의 색 유입(약한 blue tint)로 굴절감 형성
5. Depth Shadow  
   바깥 그림자로 떠 있는 느낌 부여
6. Motion Sweep  
   hover 시 좁은 하이라이트 streak가 이동해 "유리 표면" 감각 강화

## Control-First 구현 원칙 (본 프로젝트 적용 기준)

1. 패널은 보조, 버튼/내비는 핵심
2. glass-on-glass 중첩 금지
3. 텍스트 대비 우선(질감은 가독성 침해 금지)
4. 고대비/강제색/투명도 축소 환경 fallback 필수
5. hover/press 반응은 짧고 명확하게

## 이번 보정에서 반영한 구현 요약

- Hero CTA 3개를 전부 glass-control로 통일
- top nav 링크를 glass capsule 탭 스타일로 재설계
- 버튼 하이라이트 스윕(`::after`) 추가
- `prefers-contrast`, `forced-colors`, `prefers-reduced-transparency` fallback 확장
- 패널 재질 강도를 낮추고 컨트롤 질감 중심으로 재정렬

## 추가 확인 필요 항목

1. 실기기(모바일/저전력)에서 스크롤 중 글래스 컨트롤 체감 성능
2. 밝은 배경 이미지 위에서 버튼 라벨 대비 유지
3. 키보드 포커스 시 유리 하이라이트와 포커스 링 충돌 여부

## 출처

Apple

1. Meet Liquid Glass (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/219/
2. Get to know the new design system (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/356/
3. What’s new in UIKit (WWDC25)  
   https://developer.apple.com/videos/play/wwdc2025/243/
4. Apple Developer Forums - Liquid Glass 관련 기술 질의응답  
   https://developer.apple.com/forums/topics/ui-frameworks-topic/ui-frameworks-topic-swiftui?sortBy=oldest
5. Apple Newsroom - Apple introduces a delightful and elegant new software design  
   https://www.apple.com/hk/en/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/

Web Platform

6. MDN - `backdrop-filter`  
   https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
7. MDN - `prefers-reduced-transparency`  
   https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-transparency
8. CSSWG - Filter Effects Module Level 2  
   https://drafts.csswg.org/filter-effects-2/

