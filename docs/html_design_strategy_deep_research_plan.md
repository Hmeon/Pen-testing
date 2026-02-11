# Pen-Testing HTML 디자인 전략 심층 조사 및 기획서

작성일: 2026-02-11  
대상 프로젝트: `C:\Users\Administrator\Documents\Pen-Testing`  
핵심 산출물: `index.html` 고도화 전략 (채용관 설득 중심)

## 1. 문서 목적

본 문서는 현재 뼈대 수준의 `index.html`을 채용 실무에서 통하는 하이퀄리티 포트폴리오 페이지로 전환하기 위한 전략 문서다.  
요구사항 "해부 및 분석 + 학습 + 기획"에 맞춰 다음 순서로 구성했다.

1. 현재 프로젝트 해부(구조/자산/리스크)
2. HTML 디자인 전략 관련 심층 조사(공식/권위 자료 기반)
3. 조사에서 학습한 원칙의 프로젝트 맞춤 적용
4. 구현 단계별 계획(품질 게이트 포함)

---

## 2. 현재 상태 해부 (As-Is)

### 2.1 구조 해부

현재 `index.html`은 아래 핵심 구조를 가진다.

- 문서 언어/메타 기본값 존재: `index.html:2`, `index.html:5`, `index.html:6`, `index.html:7`
- 메인 컨텐츠 래핑: `index.html:31`
- 2컬럼 성격의 단순 구성:
  - 요약 카드: `index.html:36`
  - PDF iframe 뷰어: `index.html:55`, `index.html:56`
- CTA 2개:
  - 새 창 보기: `index.html:44`
  - 다운로드: `index.html:45`

해석:

- "PDF 열람 기능"은 충족하지만, "실무 역량 설득"을 위한 정보 구조는 부족하다.
- 채용관 입장에서 핵심 판단 요소(역할, 성과, 난도, 기여도)가 첫 화면에서 분리되어 보이지 않는다.

### 2.2 자산 해부

실측값:

- PDF: `25,684,143 bytes` (약 24.5MB)
- 이미지 수: `44`
- 이미지 총량: `3,957,156 bytes` (약 3.77MB)
- 이미지 평균 크기: `89,935 bytes`
- 비율 분포: 가로형 `41`, 세로형 `3`
- 최대 해상도: `1576x3840`

해석:

- 현재는 이미지 44개가 거의 노출되지 않아 증빙 자산이 활용되지 않고 있다.
- PDF 24.5MB 단일 의존 UX는 모바일/저속망에서 초기 이탈 가능성을 높인다.

### 2.3 배포 설정 해부

`vercel.json` 상태:

- `version`, `builds`, `routes` 기반 구성 (`vercel.json:2`, `vercel.json:3`, `vercel.json:7`)

해석:

- 현재 동작은 되지만, 보안 헤더/CSP/캐시 정책을 체계적으로 확장하기엔 구조적 제약이 있다.

---

## 3. 심층 조사: HTML 디자인 전략 핵심 학습

아래 항목은 공식 문서/권위 자료를 기반으로 정리했으며, 각 항목 끝에 본 프로젝트 적용 인사이트를 붙였다.

### 3.1 정보 구조와 스캔 패턴

관찰:

- NN/g의 F-Pattern 연구는 사용자가 웹페이지를 단어 단위 정독보다 스캔 중심으로 읽는 경향이 있음을 보여준다. [S1]
- NN/g의 Visual Hierarchy 설명은 크기/색/대비/간격으로 주목 순서를 의도적으로 설계해야 함을 강조한다. [S2]

학습:

- 상단에서 "핵심 가치 문장 + 성과 카드 + 즉시 CTA"가 먼저 보여야 한다.
- 긴 서술 대신 스캔 가능한 구조(짧은 문장, 섹션 라벨, 숫자 중심 성과)가 중요하다.

프로젝트 적용(추론):

- 현재 PDF-first 구조를 "메시지-first, PDF-proof" 구조로 전환해야 한다.

### 3.2 시맨틱 구조와 내비게이션

관찰:

- WAI Page Structure 가이드는 `header`, `nav`, `main`, `section`, `footer` 등 랜드마크와 레이블링을 통한 탐색성을 강조한다. [S3]
- skip link는 키보드 사용자에게 반복 영역 건너뛰기 효율을 제공한다. [S4]

학습:

- 시맨틱은 SEO보다 먼저, 사용성/탐색성 품질의 기반이다.

프로젝트 적용(추론):

- 상단 고정 `nav` + `skip link` + 섹션 앵커를 도입하면 채용관과 키보드 사용자 모두 탐색 속도가 개선된다.

### 3.3 타이포그래피 전략

관찰:

- web.dev typography 가이드는 본문 line-length(대략 45~75자), 명확한 스케일, 과도한 줄길이 회피를 강조한다. [S5]
- 폰트 최적화에서 preload 남용은 오히려 성능 저하를 유발할 수 있으며, 필요한 리소스에만 전략적으로 적용해야 한다. [S6]

학습:

- 하이퀄리티는 "화려한 폰트"보다 "읽히는 리듬"이다.
- 본문, 캡션, 카드 수치, CTA 텍스트의 역할별 스타일 분리가 필요하다.

프로젝트 적용(추론):

- 현재 단일 타이포 스타일을 "display/headline/body/caption/code" 5계층으로 분리한다.

### 3.4 반응형 레이아웃 전략

관찰:

- web.dev는 반응형 웹디자인 핵심으로 유연한 레이아웃, 미디어/컨테이너 쿼리, 터치/다양한 입력환경 대응을 제시한다. [S7]
- Container Queries는 컴포넌트 단위 반응형 설계를 가능하게 해 재사용성과 독립성을 높인다. [S8]

학습:

- viewport 기준만으로는 카드/갤러리/정보블록의 다양한 문맥 대응이 어렵다.

프로젝트 적용(추론):

- Hero/성과카드/증빙갤러리 각각에 컨테이너 기반 레이아웃 규칙을 부여한다.

### 3.5 색상, 대비, 포커스, 터치 타겟

관찰:

- WCAG 2.2는 일반 텍스트 대비 4.5:1 기준(1.4.3), Reflow(1.4.10), Focus Visible(2.4.7), Target Size Minimum(2.5.8)을 제시한다. [S9]

학습:

- 하이퀄리티 디자인은 "예쁜 색"이 아니라 "의미와 접근성을 같이 갖춘 색 체계"다.

프로젝트 적용(추론):

- 색상 토큰은 `surface/text/brand/accent/status`로 분리하고, CTA/링크/포커스 상태를 독립 정의해야 한다.

### 3.6 모션 및 사용자 선호 반영

관찰:

- `prefers-reduced-motion`는 사용자 수준 설정을 CSS에서 반영할 수 있게 한다. [S10]

학습:

- 모션은 장식이 아니라 정보 우선순위를 강화하는 장치로 제한적으로 사용해야 한다.

프로젝트 적용(추론):

- 페이지 진입 애니메이션은 1회/짧은 duration 중심으로 설계하고, reduced-motion 환경에서는 즉시 렌더로 전환한다.

### 3.7 성능 전략 (PDF 중심 페이지 특화)

관찰:

- Core Web Vitals 기준(LCP/INP/CLS)은 사용자 체감 품질의 핵심 지표다. [S11]
- CLS 최적화는 이미지/iframe 크기 예약이 핵심이다. [S12]
- iframe의 `loading="lazy"`는 초기 리소스 부담을 낮출 수 있다. [S13]

학습:

- 현재처럼 무거운 PDF를 페이지 핵심 렌더 경로에 두면, 디자인 완성도와 무관하게 체감 품질이 낮아진다.

프로젝트 적용(추론):

- "HTML 요약 먼저 -> 증빙 이미지 -> PDF는 의도 기반 로드" 전략이 최적이다.

### 3.8 PDF 임베드 운영 원칙

관찰:

- MDN은 PDF 파일의 경우 브라우저 내장 뷰어가 일반적이므로, 페이지 내 임베드보다 링크 제공이 더 안정적인 선택일 수 있다고 설명한다. [S14]

학습:

- PDF는 "항상 보이게"보다 "언제든 확실히 열리게"가 신뢰성 측면에서 더 중요하다.

프로젝트 적용(추론):

- iframe은 보조 경로로 유지하고, 1차 CTA는 새 창/다운로드 안정 경로로 유지한다.

### 3.9 보안/운영/신뢰 신호

관찰:

- `rel="noopener"`는 새 창 링크 보안에 중요하다. [S15]
- Vercel 설정 문서/레거시 안내는 `routes`보다 `headers`/`rewrites` 중심 구성을 권장한다. [S16]
- Conformance 문서에 보안 헤더(CSP, HSTS, X-Frame-Options 등) 미설정 이슈가 명시된다. [S17]

학습:

- 채용 포트폴리오도 보안/운영 품질이 개발 역량 신뢰에 직접 영향을 준다.

프로젝트 적용(추론):

- `vercel.json`을 현대화해 헤더 정책을 명시하고, 링크/파일 응답 정책을 분리해야 한다.

---

## 4. 전략 기획 (To-Be)

### 4.1 디자인 노스스타 (North Star)

한 문장 정의:

`"30초 스캔으로 역량이 보이고, 3분 탐색으로 증빙이 설득되며, 1클릭으로 원본 PDF를 확인할 수 있는 포트폴리오 페이지"`

### 4.2 UX 목표

1. 첫 화면에서 역할/주제/성과/CTA가 모두 보인다.
2. PDF를 열기 전에도 전문성이 전달된다.
3. 모바일에서도 정보 밀도와 조작성이 유지된다.
4. 접근성/성능/보안 지표가 객관적으로 방어된다.

### 4.3 정보 구조(IA) 전략

권장 섹션 구조:

1. Hero: 프로젝트 가치 제안 + 3개 CTA
2. Quick Facts: 역할, 기간, 환경, 툴, 핵심 수치
3. Method: 접근 절차(문제-가설-실행-검증)
4. Evidence Gallery: 대표 캡처 8~12개 (캡션 포함)
5. Findings: 인사이트/한계/개선안
6. Report Access: PDF 뷰어(선택 로드) + 다운로드
7. Contact/Links: GitHub/이메일/추가 자료

### 4.4 컴포넌트 전략

컴포넌트 단위(HTML/CSS 설계 기준):

1. `hero-block`: 핵심 메시지 + Primary CTA
2. `metric-card`: 수치형 성과 카드
3. `timeline-step`: 방법론 절차 설명
4. `evidence-item`: 이미지 + 캡션 + alt
5. `pdf-panel`: iframe + 실패 폴백 + 다운로드
6. `trust-strip`: 윤리/허가 환경/책임 범위 명시

설계 원칙:

- 각 컴포넌트는 자체 heading/간격/상태 스타일을 가진다.
- viewport 반응형과 별개로 컨테이너 기반 규칙을 추가한다.

### 4.5 비주얼 시스템(Design Tokens) 전략

권장 토큰 축:

1. Color
2. Typography
3. Space
4. Radius
5. Shadow
6. Motion
7. Z-index

예시 토큰 설계(기획 수준):

```css
:root {
  --bg: #f4f6f8;
  --surface: #ffffff;
  --surface-muted: #eef2f5;
  --text: #0f1720;
  --text-dim: #4a5a67;
  --brand: #0b5fff;
  --brand-strong: #0846bd;
  --accent: #0ea56b;
  --focus: #ff9f1a;

  --step--1: clamp(0.85rem, 0.82rem + 0.15vw, 0.95rem);
  --step-0: clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
  --step-1: clamp(1.2rem, 1.12rem + 0.4vw, 1.45rem);
  --step-2: clamp(1.44rem, 1.28rem + 0.75vw, 1.9rem);
  --step-3: clamp(1.72rem, 1.45rem + 1.2vw, 2.4rem);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  --radius-m: 12px;
  --radius-l: 18px;

  --dur-fast: 120ms;
  --dur-base: 200ms;
  --ease-standard: cubic-bezier(.2,.8,.2,1);
}
```

메모:

- 색상/대비는 WCAG 기준으로 실제 수치 검증이 필요하다.
- 토큰은 기획값이며 구현 시 라이트하우스/접근성 검사로 조정한다.

### 4.6 콘텐츠 전략

콘텐츠 원칙:

1. 첫 문장에 프로젝트 목적과 결과를 함께 제시
2. 각 섹션 첫 줄은 결론형 문장 사용
3. 긴 문단 대신 3~5개 bullet로 스캔 가독성 확보
4. 이미지 캡션은 "무엇을 보여주는지 + 왜 중요한지" 2요소로 작성
5. "허가된 환경/교육 목적" 문구를 명시해 윤리 리스크 차단

### 4.7 인터랙션/모션 전략

모션 우선순위:

1. 초기 등장: Hero/카드 소폭 페이드업
2. 스크롤 진입: 증빙 카드 stagger(짧게)
3. 버튼 상태: hover/focus/active 명확화

제약:

- reduced-motion 환경에서는 애니메이션 비활성화 또는 최소화 [S10]
- 모션이 콘텐츠 이해를 방해하면 즉시 제거

### 4.8 성능/로딩 전략

핵심 전략:

1. 최초 렌더에서 PDF iframe 지연 로딩
2. 이미지에 `width/height` 또는 `aspect-ratio` 지정
3. 중요 이미지만 eager, 나머지 lazy
4. 필요 없는 preload 금지 [S6]
5. PDF 접근은 명확한 CTA로 유도하고 실패 폴백 제공

성능 목표:

1. LCP <= 2.5s
2. INP <= 200ms
3. CLS <= 0.1

### 4.9 접근성 전략

필수 체크:

1. skip link 제공 [S4]
2. 명확한 heading 계층
3. 포커스 링 커스텀 시 대비/가시성 확보
4. 링크 텍스트가 행위를 설명
5. 터치 타겟 최소 크기 고려 [S9]

### 4.10 배포/보안 전략

권장 방향:

1. `vercel.json`에서 레거시 `routes` 의존 축소 [S16]
2. `headers` 기반 보안 정책 명시 [S17]
3. 새 창 링크에 `noopener noreferrer` 유지 [S15]
4. PDF 응답 캐시 정책 분리

---

## 5. 단계별 실행 기획

### Phase 0. 기준선 측정 (0.5일)

산출물:

1. 현재 UX 캡처(모바일/데스크톱)
2. Lighthouse 기준값
3. 접근성 체크 초기 결과

완료 조건:

- 현재 품질 수치가 기록되어 개선 전후 비교 가능

### Phase 1. 정보 구조/콘텐츠 재배치 (1일)

산출물:

1. IA 확정
2. 상단 핵심 메시지/성과 문안 확정
3. 증빙 이미지 8~12개 선별

완료 조건:

- PDF 미열람 상태에서도 핵심 역량이 이해되는가

### Phase 2. 비주얼 시스템 구축 (1일)

산출물:

1. 토큰 체계 적용
2. 타이포 스케일/간격 스케일 확정
3. 컴포넌트 스킨(카드/버튼/섹션 헤더) 확정

완료 조건:

- 모든 화면에서 일관된 시각 계층이 유지되는가

### Phase 3. 인터랙션/접근성 구현 (1일)

산출물:

1. skip link, focus, 키보드 동선
2. 모션 정책(reduced-motion 포함)
3. PDF 폴백 UX

완료 조건:

- 키보드 전용 탐색으로 주요 작업 완료 가능

### Phase 4. 성능/배포/보안 정리 (1일)

산출물:

1. 이미지/iframe 로딩 최적화
2. Vercel 헤더 정책
3. 메타/공유 카드 개선

완료 조건:

- Core Web Vitals 목표와 보안 헤더 정책 검증 통과

### Phase 5. 검수/출시 (0.5일)

산출물:

1. 최종 QA 체크리스트
2. 배포 버전 기록
3. 회고 문서(추가 개선 backlog 포함)

완료 조건:

- 문서화된 DoD 항목 100% 충족

---

## 6. 품질 게이트 (DoD)

최종 출시 기준:

1. 첫 화면 30초 스캔 테스트에서 핵심 역량 파악 성공
2. PDF 미지원 환경에서도 다운로드/새창 열람 경로 정상
3. WCAG 핵심 항목(대비/포커스/키보드/구조) 점검 통과
4. CWV 목표값 충족 또는 근접(개선 근거 기록)
5. `vercel.json` 보안 헤더 정책 반영
6. 공유 미리보기(OG) 정상 표시

---

## 7. 핵심 리스크와 대응

1. 리스크: 콘텐츠만 늘고 메시지 선명도가 낮아질 수 있음  
대응: 상단 핵심 메시지 1문장 + 성과 3개 규칙 고정

2. 리스크: 비주얼 강화 과정에서 접근성 후퇴 가능  
대응: 디자인 리뷰마다 WCAG 체크 병행

3. 리스크: PDF/이미지 자산이 커서 성능 저하  
대응: 로딩 우선순위 분리 + 크기 예약 + 지연 로드

4. 리스크: Vercel 설정 변경 시 라우팅 회귀  
대응: 단계별 변경, 경로별 확인 테스트

---

## 8. 다음 구현 단계에서 바로 사용할 작업 목록

1. `index.html` 레이아웃을 Hero 중심 구조로 재편
2. `img/`에서 대표 증빙 8~12개 선정 후 섹션 반영
3. PDF 뷰어를 지연 로딩 및 폴백 구조로 변경
4. 접근성 요소(skip link, focus-visible, landmark labels) 추가
5. `vercel.json` 현대화(`headers` 중심)
6. 메타/OG/공유 프리뷰 태그 추가

---

## 9. 참고 자료

[S1] NN/g, F-Shaped Pattern of Reading on the Web  
https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/

[S2] NN/g, Visual Hierarchy in UX  
https://www.nngroup.com/articles/visual-hierarchy-ux-definition/

[S3] W3C WAI, Page Structure Tutorial  
https://www.w3.org/WAI/tutorials/page-structure/

[S4] W3C WAI, Skip to Content  
https://www.w3.org/WAI/WCAG21/Techniques/general/G1

[S5] web.dev, Typography and fonts  
https://web.dev/learn/design/typography

[S6] web.dev, Optimize web fonts  
https://web.dev/articles/optimize-webfont-loading

[S7] web.dev, Responsive web design basics  
https://web.dev/articles/responsive-web-design-basics

[S8] web.dev, Container queries  
https://web.dev/articles/baseline-in-action-container-queries

[S9] W3C, WCAG 2.2  
https://www.w3.org/TR/WCAG22/

[S10] MDN, `@media (prefers-reduced-motion)`  
https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

[S11] web.dev, Web Vitals  
https://web.dev/articles/vitals

[S12] web.dev, Optimize CLS  
https://web.dev/articles/optimize-cls

[S13] MDN, Lazy loading  
https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading

[S14] MDN, `<embed>` element  
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/embed

[S15] MDN, `rel="noopener"`  
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener

[S16] Vercel Docs, Legacy routes / configuration guidance  
https://vercel.com/docs/llms-full.txt

[S17] Vercel Docs, project configuration / security headers context  
https://vercel.com/docs/project-configuration

