# Pen-Testing 하이퀄리티 제작을 위한 사전 심층조사 최종 기획서 (Final)

작성일: 2026-02-11  
적용 범위: `index.html`, `Pen_Testing.pdf`, `img/`, `vercel.json`  
문서 상태: 사전 심층조사 완료본 (구현 착수 기준서)

## 1) 최종 목표 확정

본 프로젝트의 목표는 다음 2가지를 동시에 달성하는 것이다.

1. `Pen_Testing.pdf`를 안전하고 안정적으로 공개하는 정적 포트폴리오 페이지 운영
2. PDF 열람 전 30초 내에 역량/성과/증빙이 전달되는 하이퀄리티 보안 포트폴리오 구조 확립

## 2) 프로젝트 해부 요약 (실측 기반)

## 2.1 자산 현황

| 항목 | 값 | 해석 |
|---|---:|---|
| PDF 용량 | 25,684,143 bytes (24.49 MB) | 대용량 단일 진입은 모바일/저속망 UX 리스크 |
| 이미지 개수 | 44장 | 증빙 자산 충분, 현재 페이지 미활용 |
| 이미지 총용량 | 3,957,156 bytes (3.77 MB) | 갤러리 도입 가능, 로딩 전략 필요 |
| 이미지 평균 | 87.8 KB | 평균은 양호, 해상도 편차 존재 |
| 방향 분포 | 가로형 41 / 세로형 3 | 가로형 우선 레이아웃 가능 |
| 챕터 분포 | 1:1, 2:5, 3:8, 4:8, 5:2, 6:17, 7:3 | 6장 과밀, 대표 증빙 선별 필요 |
| 파일명 이슈 | `fig_2-3 (1).png`, `fig_6-13(2).png` | 자동정렬/자동화에 불리 |

## 2.2 구조 현황

현재 `index.html`은 요약 카드 + PDF iframe의 2영역 구조로 단순하고 안정적이나, 채용 관점의 평가 정보(역할, 기여, 성과, 리스크, 개선)가 HTML 계층으로 충분히 분해되지 않았다.

## 2.3 배포 현황

현재 `vercel.json`은 `builds` + `routes` 레거시 패턴 기반이며, 보안 헤더 중심 운영으로 확장하려면 구조 전환이 필요하다.

## 3) 심층 조사 완료 체크 (검증일: 2026-02-11)

| 조사 항목 | 상태 | 최종 판단 | 검증 근거 |
|---|---|---|---|
| 침투테스트 방법론(PTES/WSTG/NIST) | 완료 | 보고서를 단계형(준비-수집-분석-공격-사후-보고)으로 재구성 | OWASP WSTG Stable TOC, Penetration Testing Methodologies, NIST SP 800-115 |
| 취약점 표준화(CVSS/CWE/OWASP) | 완료 | Finding 필드를 CVSS v4 + CWE + OWASP Top10:2025로 고정 | FIRST CVSS v4.0 Spec v1.2, CWE News 2026, OWASP Top10:2025 |
| 위협 문맥(ATT&CK/KEV) | 완료 | 선택 항목으로 ATT&CK TTP/KEV 악용여부를 우선순위에 반영 | MITRE ATT&CK Data & Tools, CISA KEV Catalog |
| 접근성 기준 | 완료 | WCAG 2.2 + ISO/IEC 40500:2025 기준선 채택 | W3C WCAG 2.2, W3C 2025-10-21 Press Release |
| 성능 기준 | 완료 | Core Web Vitals LCP/INP/CLS 목표치 확정 | web.dev Web Vitals |
| 보안 헤더 운영 | 완료 | `headers` 중심 정책으로 전환 설계 | Vercel Project Configuration, Vercel Security Headers, OWASP Secure Headers Project |
| 링크 보안 | 완료 | 새 창 링크는 `noopener noreferrer` 규칙 유지 | MDN `rel=noopener` |
| Vercel 라우팅 전략 | 완료 | `routes` 축소, `headers/rewrites/redirects` 중심 이관 | Vercel Project Configuration (Legacy routes 안내) |

판정: 하이퀄리티 제작을 위한 사전 심층조사 범위는 완료 상태다.

## 4) 확정 아키텍처 결정 (Final Decisions)

## 4.1 콘텐츠/정보구조

1. PDF 중심 구조에서 메시지 중심 구조로 전환한다.
2. 상단 1스크린에 역할/목표/핵심성과/CTA를 고정한다.
3. 대표 증빙 이미지 8~12장을 HTML에서 우선 노출한다.

## 4.2 보안 결과물 표준화

1. 주요 Finding 최소 3건을 표준 필드로 정규화한다.
2. 필수 필드: `Finding ID`, `요약`, `재현 절차`, `영향(CIA)`, `CVSS v4`, `CWE`, `OWASP Top10:2025`, `개선/재검증`.
3. 선택 필드: `MITRE ATT&CK`, `CISA KEV`.

## 4.3 성능/접근성/운영

1. PDF iframe은 초기 렌더 우선순위에서 분리한다.
2. 이미지는 크기 예약 + 지연 로딩을 적용한다.
3. 접근성은 WCAG 2.2 체크리스트 기반으로 검증한다.
4. 배포 정책은 `vercel.json`의 `headers` 중심으로 재설계한다.

## 5) 구현 전 준비물 (자료 수집 완료 기준)

다음 자료가 모두 준비되면 구현으로 전환한다.

1. 법적/윤리적 범위 고지 문안(허가된 실습 환경, 비식별 원칙)
2. 대표 Finding 3건의 표준화 시트
3. 대표 증빙 이미지 10장 선정표 + 캡션
4. 섹션 IA 초안(Hero/Quick Facts/Method/Evidence/Findings/Report)
5. 보안 헤더 초안(`CSP`, `X-Content-Type-Options`, `Referrer-Policy` 등)

## 6) 실행 로드맵 (확정본)

### Phase A (0.5일): 증빙 선별

1. 이미지 44장 중 대표 10장 선정
2. 파일명 정규화 계획 수립
3. 챕터 균형 배치안 작성

완료 게이트: 캡션 포함 증빙 목록 확정

### Phase B (1일): Finding 표준화

1. PDF에서 핵심 취약점 3건 추출
2. CVSS v4 + CWE + OWASP Top10:2025 매핑
3. 재현 절차/영향/대응 작성

완료 게이트: Finding 카탈로그 3건 이상

### Phase C (1일): IA/스토리보드

1. `index.html` 섹션 구조 확정
2. 30초 스캔용 핵심 문장 3~5개 고정
3. CTA 동선(새 창/다운로드/갤러리) 확정

완료 게이트: HTML 개편 설계 확정

### Phase D (0.5일): 운영 정책

1. `vercel.json` 전환안(`routes` 축소, `headers` 도입) 작성
2. 접근성/성능/보안 체크리스트 고정
3. 회귀 테스트 시나리오 확정

완료 게이트: 배포/검수 정책 문서화 완료

## 7) Definition of Done (기획 마감 기준)

다음 항목이 모두 충족되면 사전 기획 단계를 종료한다.

1. 조사 근거가 공식/권위 출처로 문서화됨
2. 프로젝트 해부 데이터(자산/구조/리스크)가 수치로 고정됨
3. 하이퀄리티 품질 축(콘텐츠/증빙/접근성/성능/보안/운영)이 모두 결정됨
4. 구현 착수용 백로그(P0)가 확정됨
5. 구현 완료 판정 기준(DoD)이 측정 가능한 문장으로 정의됨

판정 결과: 2026-02-11 기준, 본 문서로 기획 마감 가능.

## 8) 즉시 실행 P0 백로그

1. `docs/finding_catalog_template.md` 작성
2. `docs/evidence_selection_sheet.md` 작성
3. `docs/index_ia_blueprint.md` 작성
4. `docs/vercel_security_headers_draft.md` 작성

## 9) 최종 조사 출처 (검증 완료)

1. OWASP WSTG Stable: https://owasp.org/www-project-web-security-testing-guide/stable/
2. OWASP WSTG Penetration Testing Methodologies: https://owasp.org/www-project-web-security-testing-guide/stable/3-The_OWASP_Testing_Framework/1-Penetration_Testing_Methodologies
3. PTES: https://www.pentest-standard.org
4. NIST SP 800-115: https://csrc.nist.gov/pubs/sp/800/115/final
5. OWASP Top 10:2025: https://owasp.org/Top10/2025/
6. FIRST CVSS v4.0 Spec: https://www.first.org/cvss/v4-0/specification-document
7. CWE News 2026: https://cwe.mitre.org/news/archives/news2026.html
8. MITRE ATT&CK Data & Tools: https://attack.mitre.org/resources/attack-data-and-tools/
9. CISA KEV Catalog: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
10. WCAG 2.2: https://www.w3.org/TR/WCAG22/
11. W3C WCAG 2.2 ISO 승인(2025-10-21): https://www.w3.org/press-releases/2025/wcag22-iso-pas/
12. web.dev Web Vitals: https://web.dev/articles/vitals
13. Vercel Project Configuration: https://vercel.com/docs/project-configuration
14. Vercel Security Headers: https://vercel.com/docs/headers/security-headers
15. OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
16. MDN `rel=noopener`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener

---

본 문서는 하이퀄리티 제작을 위한 사전 심층조사를 종료하고 구현 단계로 전환하기 위한 최종 마감본이다.
