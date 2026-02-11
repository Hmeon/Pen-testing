# Pen-Testing 프로젝트 해부 및 심층 조사 기반 실행 기획서

작성일: 2026-02-11  
대상 저장소: `C:\Users\Administrator\Documents\Pen-Testing`  
핵심 목표: 현재 정적 포트폴리오를 "PDF 열람 페이지"에서 "실무 역량이 증거 기반으로 전달되는 보안 포트폴리오"로 고도화하기 위한 조사·기획 기준 확정

## 1. 프로젝트 해부 (As-Is)

### 1.1 저장소 구조

- 핵심 파일: `index.html`, `Pen_Testing.pdf`, `vercel.json`
- 증빙 자산: `img/*.png` 44개
- 기획 문서: `docs/*.md` (기존 프론트엔드 중심 분석 문서 3개 존재)

### 1.2 페이지 구조 해부 (`index.html`)

- 현 구조는 사실상 2영역:
1. 요약 카드(텍스트 + CTA)
2. PDF iframe 뷰어
- 장점:
1. 접근 경로가 단순함 (`새 창 보기`, `다운로드`)
2. 실습/교육 목적 고지 문구가 이미 있음
- 한계:
1. 채용 관점 핵심 판단 정보(역할/기여/성과/한계/개선)가 HTML 계층으로 분해되어 있지 않음
2. PDF 의존도가 높아 "빠른 스캔" UX가 약함

### 1.3 자산 실측

| 항목 | 실측값 | 해석 |
|---|---:|---|
| PDF 크기 | 25,684,143 bytes (24.49 MB) | 단일 대용량 진입으로 초기 체감 속도 저하 가능 |
| 이미지 수 | 44장 | 증빙 자산은 충분하나 페이지 미활용 |
| 이미지 총량 | 3,957,156 bytes (3.77 MB) | HTML 증빙 섹션 추가 시 최적화 전략 필요 |
| 이미지 평균 | 87.8 KB | 적절한 편이나 해상도 편차 존재 |
| 비율 분포 | 가로형 41 / 세로형 3 | 갤러리 레이아웃을 가로형 중심으로 설계 가능 |
| 챕터 분포 | 1장(1), 5장(2), 8장(3), 8장(4), 2장(5), 17장(6), 3장(7) | 6장 비중 과다, 대표 증빙 선별 필요 |
| 파일명 이슈 | `fig_2-3 (1).png`, `fig_6-13(2).png` | 중복/정렬/자동화 파이프라인에 불리 |

### 1.4 배포 설정 해부 (`vercel.json`)

- 현재는 `builds` + `routes` 기반의 최소 라우팅 구성
- 확인된 운영 리스크:
1. Vercel 문서 기준 `routes`는 레거시이며, 최신 `headers/rewrites/redirects`와 동시 사용 제약이 큼
2. 보안 헤더 정책(CSP 등) 확장 시 구조적 재작업 가능성이 높음

## 2. 핵심 갭 분석

### 2.1 콘텐츠 갭

- 현재: "무엇을 했는가" 중심
- 필요: "왜 중요한가 + 어떻게 검증했는가 + 어떤 리스크를 줄였는가"까지 정량/정성 결합

### 2.2 증빙 갭

- 현재: PDF 내부 증빙 의존
- 필요: HTML에서 대표 증거(스크린샷/핵심 패킷/취약점 재현 흐름)를 먼저 노출

### 2.3 표준 매핑 갭

- 현재: 보고서가 어느 산업 표준과 연결되는지 외부에서 즉시 파악 어려움
- 필요: PTES/WSTG/NIST, CVSS/CWE/ATT&CK, OWASP Top 10 매핑 표를 명시

### 2.4 운영 품질 갭

- 현재: 기본 동작 중심
- 필요: 접근성(WCAG), 성능(Web Vitals), 보안 헤더, 메타데이터(OG)까지 포함한 배포 품질 체계

## 3. 심층 조사 결과 (필수 기준선)

### 3.1 침투테스트 방법론 기준

1. OWASP WSTG(Stable v4.2)는 웹 애플리케이션 테스트 프레임워크와 체크리스트를 제공한다.
2. WSTG의 Test Delivery and Reporting 섹션은 PTES를 연결하며, 표준 단계(사전준비/정보수집/위협모델링/취약점분석/공격/사후활동/리포팅)를 참고 가능하게 한다.
3. NIST SP 800-115는 계획(Planning) - 수행(Execution) - 사후(Post-Testing)의 평가 라이프사이클을 제공한다.

프로젝트 적용 결론:

- 보고서 내용을 "단일 문서"가 아니라 "방법론 단계별 증빙 카드"로 재구성해야 설득력이 올라간다.

### 3.2 취약점 분류/위험도 표준

1. OWASP Top 10:2025가 공개되어 최신 위험 카테고리 기준으로 결과 재라벨링이 가능하다.
2. CWE는 연간 3~4회 업데이트되므로 취약점 설명을 CWE ID와 함께 유지해야 재현성과 호환성이 높아진다.
3. FIRST CVSS v4.0 사양은 Base/Threat/Environmental/Supplemental 메트릭 기반의 위험도 평가 프레임을 제공한다.
4. MITRE ATT&CK Navigator는 TTP 매핑 시각화에 활용 가능하다.
5. CISA Known Exploited Vulnerabilities(KEV) 카탈로그는 "실제 악용 여부"를 우선순위 판단에 반영할 근거로 유효하다.

프로젝트 적용 결론:

- 각 취약점은 최소 `CVSS v4 + CWE + OWASP Top10:2025 + (가능 시 ATT&CK/KEV)`로 표준화해야 채용/실무 문맥에서 재사용성이 높다.

### 3.3 포트폴리오 공개 품질 기준 (Web)

1. WCAG 2.2(권고안) 및 ISO/IEC 40500:2025는 접근성 준수 기준선으로 활용 가능하다.
2. Web Vitals 기준은 LCP <= 2.5s, INP <= 200ms, CLS <= 0.1이 핵심 목표치다.
3. OWASP Secure Headers Project는 운영 환경 헤더 정책 수립의 기준 자료로 활용할 수 있다.
4. Vercel 프로젝트 설정은 `headers`로 보안 헤더를 구성할 수 있으며, 레거시 `routes`는 최신 설정과 조합 제약이 있다.

프로젝트 적용 결론:

- 보안 프로젝트 포트폴리오라면 콘텐츠 품질뿐 아니라 페이지 자체의 보안/접근성/성능 품질을 같이 증명해야 한다.

## 4. 본 프로젝트에 필요한 자료 (심층 수집 목록)

아래 자료를 확보하면, 단순 UI 개선이 아니라 "평가 가능한 보안 포트폴리오"로 전환 가능하다.

### 4.1 법적·윤리적 정당성 자료

1. 실습/허가 범위 설명서(대상, 기간, 허가 유형)
2. 민감정보 비식별 처리 원칙(마스킹 규칙)
3. 비공개 정보 제외 기준

### 4.2 방법론 추적 자료

1. 테스트 범위/목표 정의서
2. 사용 도구 및 버전 기록(예: Metasploit, Wireshark, Nmap)
3. 단계별 수행 로그 요약(PTES 또는 WSTG 기준 단계 태그 포함)

### 4.3 취약점 정규화 자료

각 Finding에 대해 아래 필드를 최소 확보:

1. Finding ID
2. 제목/요약
3. 재현 절차(Precondition, Steps, Evidence)
4. 영향 범위(C/I/A)
5. CVSS v4 점수 및 벡터
6. CWE ID
7. OWASP Top10:2025 매핑
8. (가능 시) ATT&CK Technique ID
9. 수정 권고 및 검증 결과

### 4.4 증빙 시각 자료

1. 대표 이미지 8~12장 선별
2. 챕터별 균형 재배치(현재는 6장 편중)
3. 각 이미지의 캡션 템플릿 통일:
- "무엇을 보여주는가"
- "왜 중요한가"
- "어떤 리스크를 입증하는가"

### 4.5 웹 공개 운영 자료

1. 접근성 체크리스트(WCAG 2.2 기준)
2. 성능 기준값(Lighthouse/Web Vitals 전후 비교)
3. 보안 헤더 정책안(CSP, X-Content-Type-Options, Referrer-Policy 등)
4. 공유 메타(OG/Twitter) 정책

## 5. 실행 로드맵 (문서 중심)

### Phase 1. 증빙 자산 재인벤토리 (0.5일)

산출물:

1. 이미지 선정표(`img` 기준 챕터/중요도/노출 여부)
2. PDF 핵심 섹션 맵(요약/방법/결과/시사점)
3. 파일명 정규화 계획

### Phase 2. 표준 매핑 문서화 (1일)

산출물:

1. `finding_catalog_template.md` 초안
2. 표준 매핑표(PTES/WSTG/NIST/CVSS/CWE/OWASP/ATT&CK)
3. 리스크 우선순위 규칙(KEV 포함 여부)

### Phase 3. 정보구조/스토리보드 설계 (1일)

산출물:

1. `index.html`용 섹션 IA
2. 30초 스캔용 핵심 문장 3~5개
3. 증빙 갤러리 배치안

### Phase 4. 배포 품질 설계 (0.5일)

산출물:

1. `vercel.json` 현대화 초안(`headers` 중심)
2. 접근성/성능/보안 품질 게이트 체크리스트
3. 회귀 테스트 시나리오(새 창 보기, 다운로드, 모바일, 키보드 동선)

### Phase 5. 최종 기획 패키지 확정 (0.5일)

산출물:

1. 최종 기획서(본 문서 갱신본)
2. 구현 우선순위 백로그(P0/P1/P2)
3. 릴리즈 전 점검표(DoD)

## 6. Definition of Done (기획 완료 기준)

1. 프로젝트 핵심 메시지가 PDF 열람 전 30초 내 이해 가능
2. 대표 취약점 3개 이상이 표준 필드(CVSS/CWE/OWASP)로 정규화됨
3. 증빙 이미지가 캡션과 함께 스토리 흐름으로 배치됨
4. 접근성/성능/보안 체크리스트가 문서화되고 측정 방식이 정의됨
5. `vercel.json` 개선 방향이 레거시 제약을 해소하는 방식으로 확정됨

## 7. 리스크 및 대응

| 리스크 | 영향 | 대응 |
|---|---|---|
| PDF 의존 유지 | 초반 이탈/가독성 저하 | HTML 요약 우선 + PDF 후순위 노출 |
| 표준 매핑 누락 | 실무 재사용성 약화 | Finding 템플릿 필드 강제 |
| 자산 과다 노출 | 시각 피로/로드 증가 | 대표 증빙 선별 + lazy 전략 |
| 보안 헤더 미정 | 보안 포트폴리오 신뢰 저하 | `headers` 정책을 설계 산출물로 포함 |
| 파일명 불규칙 | 자동화/정렬 오류 | 이미지 네이밍 정규화 규칙 수립 |

## 8. 바로 착수할 우선순위 (P0)

1. `img/` 44장 중 대표 증빙 10장 선정 및 캡션 초안 작성
2. PDF에서 대표 Finding 3건 추출 후 `CVSS/CWE/OWASP Top10:2025` 매핑
3. `index.html` IA 개편안(섹션 구조) 문서화
4. `vercel.json`의 `routes` 의존 제거 가능성 검토 및 헤더 정책 초안 작성

## 9. 심층 조사 출처

1. OWASP Web Security Testing Guide (Stable v4.2): https://owasp.org/www-project-web-security-testing-guide/
2. OWASP WSTG Test Delivery and Reporting (PTES 연결): https://owasp.org/www-project-web-security-testing-guide/stable/7-Reporting/README.html
3. PTES (Penetration Testing Execution Standard): http://www.pentest-standard.org
4. NIST SP 800-115 (Technical Guide to Information Security Testing and Assessment): https://csrc.nist.gov/pubs/sp/800/115/final
5. OWASP Top 10 (Top 10:2025): https://owasp.org/Top10/
6. CWE (Update cadence 안내): https://cwe.mitre.org/data/index.html
7. FIRST CVSS v4.0 Specification: https://www.first.org/cvss/specification-document
8. MITRE ATT&CK Navigator: https://attack.mitre.org/resources/attack-data-and-tools/
9. CISA Known Exploited Vulnerabilities Catalog: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
10. W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
11. ISO/IEC 40500:2025 (WCAG 2.2 채택): https://www.iso.org/standard/58625.html
12. web.dev Web Vitals: https://web.dev/articles/vitals
13. OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
14. Vercel Project Configuration (`routes` legacy/조합 제약 포함): https://vercel.com/docs/project-configuration
15. Vercel LLM docs (legacy routes 상세): https://vercel.com/docs/llms-full.txt

---

이 문서는 "UI 개선 아이디어"가 아니라, 프로젝트를 평가 가능한 보안 결과물로 재구성하기 위한 기준 문서다.  
다음 단계 구현은 본 문서의 P0 항목과 DoD를 게이트로 사용한다.
