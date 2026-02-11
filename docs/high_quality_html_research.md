# Pen-Testing 포트폴리오 하이퀄리티 HTML 조사/해부 문서

작성일: 2026-02-11  
대상: `index.html`, `vercel.json`, `Pen_Testing.pdf`, `img/`

## 1) 조사 목표

본 문서는 단순 스타일 개선이 아니라, 채용 담당자 관점에서 "짧은 시간에 전문성과 결과물을 신뢰할 수 있게 전달되는 페이지"를 만들기 위한 기준서다.  
핵심은 다음 2가지를 동시에 만족하는 것이다.

1. 전달력: 30초 내 핵심 역량과 성과가 읽히는 구조
2. 신뢰성: 접근성/성능/보안/배포 품질이 객관 지표로 방어되는 구조

---

## 2) 조사 방법

1. 현재 코드 해부: `index.html`, `vercel.json` 라인 단위 분석
2. 자산 계측: PDF/이미지 용량, 해상도, 비율 분포
3. 공식 문서 기준 수집: WHATWG, WCAG 2.2, MDN, web.dev, Vercel, Google Search Central, Open Graph
4. 기준-현황 갭 분석: 무엇이 "뼈대"인지, 무엇이 "하이퀄리티"를 막고 있는지 명시

---

## 3) 현재 상태 해부

### 3.1 HTML 구조 해부 (`index.html`)

- `<!doctype html>`와 `<html lang="ko">` 적용됨 (`index.html:1-2`)
- `<meta charset>`, `<meta viewport>`, `<title>`, `<meta description>` 존재 (`index.html:4-7`)
- 메인 콘텐츠가 `<main>`으로 감싸져 있음 (`index.html:31`)
- 페이지 정보 구조가 사실상 2영역:
  - 요약 카드 (`<section class="card">`)
  - PDF iframe (`<section class="viewer">`)
- CTA는 2개:
  - 새 창 보기 (`target="_blank" rel="noreferrer"`)
  - 다운로드 (`download`)

### 3.2 자산 계측

- `Pen_Testing.pdf`: `25,684,143 bytes` (약 24.5MB)
- 이미지 수: 44개
- 이미지 총합: `3,957,156 bytes` (약 3.77MB)
- 상위 10개 큰 이미지가 대부분 150~280KB
- 해상도 분포:
  - 가로형 41장
  - 세로형 3장
  - 정사각형 0장

의미:

- 현재 페이지는 이미지 자산을 거의 활용하지 않고 있어 "증빙 스토리텔링"이 비어 있음
- PDF 단일 진입 구조라 초기 로딩/브라우저 정책/모바일 UX 리스크가 큼

### 3.3 배포/라우팅 해부 (`vercel.json`)

- `builds` + `routes` 기반 구성 (`vercel.json:3-10`)
- 현재 문제는 동작 여부가 아니라 "확장성"이다.
- 향후 보안 헤더/CSP/캐시 정책을 추가하려면 `routes` 기반에서 충돌이 발생할 수 있다(아래 공식 근거 참고).

---

## 4) 하이퀄리티의 기술적 정의 (본 프로젝트용)

하이퀄리티를 아래 8개 축으로 정의한다.

1. 정보 전달력 (채용관 스캔 친화성)
2. 시맨틱 구조 정합성
3. 접근성(WCAG 2.2 핵심 충족)
4. 성능(Core Web Vitals 중심)
5. 보안 헤더/링크 안전성
6. 검색/공유 최적화(SEO + OG)
7. 배포 운영성(Vercel 설정 현대화)
8. 유지보수성(확장 가능한 HTML/CSS 구조)

---

## 5) 공식 문서 조사 결과 (핵심 근거)

### 5.1 시맨틱 HTML

- WHATWG는 `<section>`을 "일반적인 섹션"으로 정의하고, 맥락상 의미 있는 구획에 사용하도록 안내한다. [R1]
- MDN은 `<main>`이 문서의 지배적인(핵심) 콘텐츠를 나타내며, 스킵 내비게이션의 타겟으로 유용하다고 명시한다. [R2]

프로젝트 해석:

- 현재 `main`은 존재하지만 `header/nav/section`의 역할 분리가 약함
- "채용관 스캔"에 필요한 정보계층(핵심 성과, 역할, 방법론, 결과, 증빙)이 HTML 구조로 충분히 표현되지 않음

### 5.2 접근성 (WCAG 2.2 기준)

- 2.4.2 Page Titled: 페이지 목적을 설명하는 제목 필요. [R3]
- 3.1.1 Language of Page: 페이지 기본 언어를 판별 가능해야 함. [R3]
- 1.4.3 Contrast (Minimum): 일반 텍스트 4.5:1 이상, 큰 텍스트 3:1 이상. [R3]
- MDN iframe 문서는 `title` 속성이 스크린리더 사용자의 컨텍스트 파악에 중요하다고 설명한다. [R6]

프로젝트 해석:

- `lang`, `title`, iframe `title`은 이미 존재해 기반은 양호
- 그러나 실제 하이퀄리티 관점에서는 포커스 가시성, 키보드 탭 동선, 스킵 링크, 대비 검증 수치까지 필요

### 5.3 성능 (Core Web Vitals + 로딩 전략)

- web.dev는 Core Web Vitals 기준을 다음과 같이 제시한다:
  - LCP <= 2.5초
  - INP <= 200ms
  - CLS <= 0.1 (75번째 백분위) [R4]
- MDN은 lazy loading을 비필수 리소스 지연 로딩 전략으로 설명한다. [R5]
- web.dev CLS 가이드는 이미지/iframe의 `width`/`height` 지정이 레이아웃 이동 최소화에 중요하다고 명시한다. [R7]

프로젝트 해석:

- 현재 PDF iframe은 즉시 로딩되어 초기 체감 성능을 악화시킬 수 있음
- 이미지가 추가될 경우 크기 속성 누락 시 CLS 리스크 확대
- 24.5MB PDF는 네트워크 환경에 따라 이탈을 유발할 가능성이 큼

### 5.4 보안/링크 안전성

- MDN: `rel="noopener"`는 새 창에서 `window.opener`를 차단해 탭 간 제어 위험을 줄인다. [R10]
- MDN: `<a download>`는 same-origin에서 동작 조건이 더 안정적이다. [R11]
- Vercel은 `headers` 설정으로 CSP 등 보안 헤더를 지정할 수 있다고 명시한다. [R9]
- Vercel의 Conformance 문서에는 누락 시 문제로 보는 보안 헤더 세트(CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)가 제시된다. [R8]

프로젝트 해석:

- 현재 새 창 링크에 `noreferrer`가 있어 최소 방어는 존재
- 하지만 전역 보안 헤더 정책이 없음
- 정적 페이지라도 헤더 레벨 통제가 필요

### 5.5 검색/공유 최적화

- Google Search Central: 메타 설명은 페이지 요약 정보로, 검색 결과 스니펫에 활용될 수 있다. [R12]
- Open Graph: `og:title`, `og:type`, `og:image`, `og:url` 기본 메타 사용 권장. [R13]

프로젝트 해석:

- 현재 `meta description`은 있으나 OG/Twitter 카드 부재
- 링크 공유 시 신뢰감 있는 미리보기(제목/요약/대표 이미지)가 약함

### 5.6 Vercel 구성 현대화

- Vercel 문서에서 `routes`는 레거시로 분류되고, 최신 설정(`rewrites`, `redirects`, `headers`)으로 전환을 권고한다. [R8]
- 또한 `routes`는 `headers`, `redirects`, `rewrites` 등과 함께 사용할 수 없는 제약이 명시된다. [R8]

프로젝트 해석:

- 현재 설정은 동작하지만 "하이퀄리티 운영 요구(보안 헤더/정교한 정책)"를 수용하기 어려운 형태

---

## 6) 갭 분석 (현재 vs 하이퀄리티 기준)

| 축 | 현재 상태 | 리스크 | 목표 상태 |
|---|---|---|---|
| 정보 전달 | PDF 중심 2패널 구조 | 채용관이 PDF 열기 전 핵심 파악 어려움 | 핵심 성과/역할/결과를 상단에서 즉시 스캔 가능 |
| 시맨틱 | `main`, `section` 일부 사용 | 구조적 의미 계층 약함 | `header/nav/main/section/footer` + 명확한 heading 체계 |
| 접근성 | `lang`, `title`, iframe `title` 있음 | 스킵 링크/포커스/대비 검증 부재 | WCAG 핵심 SC 점검표를 통과 |
| 성능 | PDF iframe 즉시 로드 | 초기 로딩 부담, 모바일 체감 저하 | 지연/점진 로딩 + 자산 경량화 + CWV 목표 충족 |
| 보안 | 링크 수준 방어 일부 | 전역 헤더 부재 | CSP 등 보안 헤더를 Vercel에서 강제 |
| SEO/공유 | description만 존재 | 공유 미리보기 취약 | OG/Twitter/canonical 포함 |
| 배포 구조 | `routes` 레거시 사용 | 확장성 제약 | `headers/rewrites` 중심 현대 구성 |
| 유지보수 | 단일 인라인 CSS | 규모 확장 시 관리 난이도 증가 | 토큰 기반 CSS 구조/섹션 컴포넌트화 |

---

## 7) 본 프로젝트를 위한 고품질 설계 원칙 (조사 결론)

### 7.1 "PDF를 보여주는 페이지"에서 "역량을 설득하는 페이지"로 전환

- PDF는 근거 자료다. 메인 메시지는 HTML 본문에서 먼저 전달해야 한다.
- 채용관은 긴 문서를 먼저 읽지 않는다. 먼저 "요약된 증거"를 확인한다.
- 따라서 상단에 반드시 들어가야 하는 정보:
  - 역할/기간/목표
  - 수행 환경(허가된 교육/실습 범위)
  - 핵심 성과 3개(정량 가능하면 수치 포함)
  - 기술 스택/도구

### 7.2 접근성과 전달력은 동시 달성

- 접근성은 별도 기능이 아니라 "읽히는 구조"를 만드는 기술적 방법이다.
- 구체적 항목:
  - 스킵 링크 제공 (`main`으로 점프)
  - 의미 있는 heading 계층(h1 > h2 > h3)
  - 버튼/링크 라벨에서 동작 명시(새 창 열림 여부 포함)
  - 색 대비 수치 검증

### 7.3 성능은 "PDF 우선 로드 금지"가 핵심

- 초기에는 요약 콘텐츠와 대표 이미지 중심으로 빠르게 표시
- PDF iframe은 사용자 의도 기반(클릭) 또는 하단 진입 시 지연 로드
- 이미지는 크기 명시 + lazy loading으로 CLS/네트워크 비용 제어

### 7.4 보안/운영은 정적 페이지라도 예외 없음

- 보안 헤더는 운영 품질의 일부
- Vercel 설정을 레거시 `routes`에서 전환해 헤더 정책을 우선 적용 가능하게 설계

---

## 8) 구현 전 필수 품질 게이트 (Definition of Ready)

아래 조건이 정의되지 않으면 구현 품질이 흔들린다.

1. 상단 1스크린에 노출할 핵심 메시지 3~5개 확정
2. 이미지 44개 중 대표 증빙 8~12개 선별 완료
3. PDF 경량화 가능 여부 판단(원본/압축본 운영 정책)
4. Vercel 설정 전환 원칙 확정(`routes` 제거 여부 포함)
5. 접근성 기준치 확정(대비/포커스/키보드 동선 체크 방식)

---

## 9) 완료 판정 기준 (Definition of Done)

### 9.1 접근성

1. `lang`, 페이지 제목, iframe 제목, heading 구조 검증
2. 스킵 링크와 키보드만으로 주요 CTA 접근 가능
3. 본문 대비 비율이 WCAG 1.4.3 기준 만족 [R3]

### 9.2 성능

1. CWV 목표(LCP/INP/CLS) 기준 충족 [R4]
2. 이미지와 iframe 크기 명시로 레이아웃 이동 최소화 [R7]
3. lazy loading 적용 위치가 사용자 경험을 저해하지 않음 [R5]

### 9.3 보안/배포

1. Vercel `headers` 기반 보안 헤더 적용 [R9]
2. 레거시 `routes` 의존 최소화 또는 제거 [R8]
3. 외부 링크 정책(`noopener`/`noreferrer`) 점검 [R10]

### 9.4 SEO/공유

1. `meta description` 품질 개선 [R12]
2. Open Graph 메타 구성 완료 [R13]

---

## 10) 위험요소와 완화 전략

| 위험 | 영향 | 완화 |
|---|---|---|
| 24.5MB PDF 단일 의존 | 모바일 이탈/로딩 지연 | 요약 우선 + PDF 지연 로드 + 압축본 병행 |
| 레거시 `routes` 고착 | 보안 헤더 확장 난항 | Vercel 최신 설정으로 전환 |
| 콘텐츠 과다 텍스트화 | 채용관 스캔 실패 | 핵심 카드 + 증빙 이미지 중심 구성 |
| 접근성 미검증 | 일부 사용자 접근 불가 | WCAG 기준 체크리스트 기반 검증 |
| 링크 공유 미리보기 부재 | 외부 전달력 저하 | OG/Twitter 카드 적용 |

---

## 11) 즉시 활용 가능한 점검 체크리스트

아래 항목은 구현 전에 "예/아니오"로 바로 점검 가능하다.

1. 첫 화면에서 프로젝트 목적/역할/핵심성과 3개가 보이는가
2. PDF를 열지 않아도 실무 역량을 판단할 근거가 있는가
3. 모든 인터랙션이 키보드 탭으로 도달 가능한가
4. PDF 미지원/차단 환경에서도 대체 열람 경로가 분명한가
5. 이미지에 고정 크기가 지정되어 CLS 위험이 통제되는가
6. 외부 열기 링크의 보안 속성이 명시되어 있는가
7. Vercel에서 보안 헤더를 중앙 통제할 수 있는가
8. 공유 링크 미리보기(제목/설명/이미지)가 정상 생성되는가

---

## 12) 참고 문헌 (공식 문서 중심)

[R1] WHATWG HTML Living Standard, Sections  
https://html.spec.whatwg.org/multipage/sections.html

[R2] MDN, `<main>`: The Main element  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main

[R3] W3C, Web Content Accessibility Guidelines (WCAG) 2.2  
https://www.w3.org/TR/WCAG22/

[R4] web.dev, Web Vitals  
https://web.dev/articles/vitals

[R5] MDN, Lazy loading  
https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading

[R6] MDN, `<iframe>`: The Inline Frame element  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

[R7] web.dev, Optimize Cumulative Layout Shift  
https://web.dev/articles/optimize-cls

[R8] Vercel Docs (LLMs full text), legacy routes / project configuration notes  
https://vercel.com/docs/llms-full.txt

[R9] Vercel Docs, project `headers` and CSP examples  
https://vercel.com/docs/project-configuration

[R10] MDN, `rel="noopener"`  
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener

[R11] MDN, `<a>` element (`download`)  
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download

[R12] Google Search Central, Control your snippets in search results  
https://developers.google.com/search/docs/appearance/snippet

[R13] Open Graph protocol  
https://ogp.me/

[R14] MDN, `rel="preconnect"`  
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preconnect

---

## 13) 문서 사용 방식

이 문서는 다음 단계에서 "기획/디자인/구현 체크리스트"의 기준으로 바로 사용한다.

1. 문서 6~11장을 기준으로 정보구조 확정
2. 문서 9장의 완료 판정 기준으로 개발 산출물 검수
3. 문서 12장의 근거 문서를 PR 설명/기술 의사결정 근거로 재사용

