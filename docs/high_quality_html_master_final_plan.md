# Pen-Testing HTML 하이퀄리티 마스터 최종 기획서

작성일: 2026-02-11  
상태: 심층조사 완료 / 구현 단계 진입 승인본  
범위: `index.html`, `img/`, `Pen_Testing.pdf`, `vercel.json`

## 1. 결론 요약

본 프로젝트는 사전 심층조사와 해부 분석을 완료했다.  
이제 기획 단계는 종료하고, 구현 단계(Phase A~D)로 진입한다.

최종 목표:

1. 디자인/미관: "보안 전문성 + 증빙 신뢰"가 즉시 보이는 고급 포트폴리오 화면
2. 정보 전달: PDF를 열기 전에 핵심 역량과 결과가 30초 내 이해되는 구조
3. 운영 품질: 접근성/성능/보안 기준을 충족하는 공개 페이지

## 2. 심층조사 완료 체크 (2026-02-11 검증)

| 항목 | 완료 | 채택 결론 | 근거 |
|---|---|---|---|
| 침투테스트 방법론 | 예 | PTES/WSTG/NIST 단계 태깅 방식으로 결과 재구성 | OWASP WSTG, PTES, NIST SP 800-115 |
| 위험도 표준화 | 예 | Finding 필드를 CVSS v4 + CWE + OWASP Top 10:2025로 고정 | FIRST CVSS v4.0, CWE, OWASP Top10:2025 |
| 위협 문맥 확장 | 예 | 선택 필드로 ATT&CK/KEV 포함 | MITRE ATT&CK, CISA KEV |
| 접근성 기준 | 예 | WCAG 2.2를 최소 기준으로 고정 | W3C WCAG 2.2 |
| 성능 기준 | 예 | LCP/INP/CLS 목표치 기반 최적화 | web.dev / PageSpeed Insights docs |
| 보안 헤더 운영 | 예 | `routes` 축소, `headers` 중심 전환 | Vercel Project Configuration, OWASP Secure Headers |

판정: 하이퀄리티 제작을 위한 심층조사 범위는 충분하며, 추가 조사 없이 구현 착수 가능.

## 3. 프로젝트 해부 최종 요약 (수치 고정)

1. PDF: 24.49MB (`Pen_Testing.pdf`)
2. 이미지: 44장, 총 3.77MB, 평균 87.8KB
3. 비율: 가로형 41 / 세로형 3
4. 챕터 편중: 6장 이미지 17개로 과밀
5. 배포 설정: `vercel.json`은 레거시 `routes` 패턴 사용 중

핵심 해석:

- 현재는 "PDF 열람 페이지"로는 충분하지만 "하이퀄리티 보안 포트폴리오"로는 전달 구조가 약하다.
- 미관 고도화는 단순 스타일 변경이 아니라 정보 계층/증빙 배치/품질 게이트까지 함께 설계해야 성립한다.

## 4. 디자인/미관 최종 방향 (확정)

## 4.1 비주얼 컨셉

컨셉명: `Security Editorial + Evidence Dashboard`

의도:

1. 에디토리얼 타이포로 전문 문서 신뢰감 확보
2. 대시보드형 메트릭 카드로 "결과 중심" 인상 강화
3. 증빙 이미지를 카드형으로 배치해 "증거 기반" 메시지 고정

## 4.2 컬러 시스템

기본 토큰:

- `--bg: #f2f5f7`
- `--surface: #ffffff`
- `--text: #0f1720`
- `--text-muted: #4b5b68`
- `--brand: #0057d9`
- `--brand-strong: #003e9c`
- `--accent: #0b8f5a`
- `--warning: #c26a00`
- `--focus: #ff9f1a`

원칙:

1. 브랜드 색은 CTA와 핵심 수치 강조에만 제한 사용
2. 본문은 고대비 중성 팔레트 우선
3. 모든 텍스트 대비는 WCAG 2.2 기준 이상 유지

## 4.3 타이포/레이아웃 시스템

폰트 방향:

1. 본문: `Noto Sans KR` 또는 `Pretendard` 계열
2. 코드/지표: `IBM Plex Mono` 계열

레이아웃 원칙:

1. Hero 1스크린 완결형 구성
2. 12-column 그리드(데스크톱), 단일 흐름(모바일)
3. 섹션 간 여백은 리듬형 스케일(`8/12/16/24/32/48`)

## 4.4 모션/상호작용

1. 의미 있는 모션만 사용(섹션 진입, 카드 등장, CTA 상태)
2. `prefers-reduced-motion` 환경은 모션 최소화
3. 포커스 링은 고대비 색(`--focus`)으로 명확히 표시

## 5. 정보구조 최종안 (확정 IA)

1. Hero: 프로젝트 요약 + Primary CTA
2. Quick Facts: 역할/기간/환경/도구/핵심 수치
3. Method: 수행 단계(PTES/WSTG 정렬)
4. Key Findings: 대표 취약점 3건 요약
5. Evidence Gallery: 대표 캡처 8~12장
6. Full Report: PDF 보기/다운로드/폴백 안내
7. Footer: 윤리 고지/연락 정보

## 6. 단계 진입 계획 (실행 확정)

### Phase A (즉시): 증빙 선별

산출물:

1. `docs/evidence_selection_sheet.md`
2. 대표 이미지 10장 확정

게이트: 챕터 균형 + 캡션 초안 완료

### Phase B: Finding 표준화

산출물:

1. `docs/finding_catalog_template.md`
2. 핵심 Finding 3건 기입 시작

게이트: CVSS/CWE/OWASP 필드 충족

### Phase C: IA 상세 설계

산출물:

1. `docs/index_ia_blueprint.md`

게이트: 데스크톱/모바일 동선 고정

### Phase D: 배포 정책

산출물:

1. `docs/vercel_security_headers_draft.md`

게이트: `headers` 중심 설정안 확정

## 7. 구현 착수 전 고정 규칙

1. 디자인 변경은 IA와 분리하지 않는다.
2. 증빙 없는 문장은 우선순위를 낮춘다.
3. PDF는 상세 근거, HTML은 핵심 설득이라는 역할을 유지한다.
4. 접근성/성능/보안 점검 없이 배포하지 않는다.

## 8. 참고 출처

1. OWASP WSTG: https://owasp.org/www-project-web-security-testing-guide/stable/
2. PTES: https://www.pentest-standard.org
3. NIST SP 800-115: https://csrc.nist.gov/pubs/sp/800/115/final
4. OWASP Top 10:2025: https://owasp.org/Top10/2025/
5. FIRST CVSS v4.0: https://www.first.org/cvss/v4-0/specification-document
6. CWE: https://cwe.mitre.org
7. ATT&CK Data & Tools: https://attack.mitre.org/resources/attack-data-and-tools/
8. CISA KEV: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
9. WCAG 2.2: https://www.w3.org/TR/WCAG22/
10. Web Vitals: https://web.dev/articles/vitals
11. PageSpeed Insights docs: https://developers.google.com/speed/docs/insights/v5/about
12. Vercel Project Configuration: https://vercel.com/docs/project-configuration
13. OWASP Secure Headers: https://owasp.org/www-project-secure-headers/

---

최종 판정: 본 문서를 기준으로 기획은 마감하며, 즉시 구현 단계로 전환한다.
