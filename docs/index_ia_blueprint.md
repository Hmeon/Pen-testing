# index.html IA Blueprint (Phase C)

작성일: 2026-02-11  
목표: `index.html`을 "PDF 뷰어 중심"에서 "핵심 성과 전달 중심" 구조로 개편

## 1) 페이지 구조 (확정)

1. `Skip Link`
2. `Header / Hero`
3. `Quick Facts`
4. `Method`
5. `Key Findings`
6. `Evidence Gallery`
7. `Full Report (PDF)`
8. `Footer`

## 2) 섹션별 목적과 콘텐츠

| 섹션 | 목적 | 핵심 콘텐츠 | CTA |
|---|---|---|---|
| Hero | 첫 인상/주제 확정 | 프로젝트 한 줄 가치, 역할, 범위 | PDF 보기, 다운로드 |
| Quick Facts | 스캔 속도 향상 | 기간, 도구, 환경, 핵심 수치 | 상세 보기 앵커 |
| Method | 수행 정당성 | 단계(준비-수집-분석-공격-사후) | 단계 설명 링크 |
| Key Findings | 실무성 전달 | 대표 취약점 3건 요약 | 상세 Finding 섹션 이동 |
| Evidence Gallery | 증빙 신뢰 강화 | 대표 이미지 8~12장 + 캡션 | 이미지 원본 보기 |
| Full Report | 원문 접근 | PDF iframe(지연), 폴백 안내 | 새 창, 다운로드 |
| Footer | 책임/윤리 명시 | 교육 목적/허가 범위/연락 | 외부 링크 |

## 3) 와이어프레임 (텍스트)

### Desktop

```text
[Skip to content]
[Hero: 제목 | 핵심성과 3개 | CTA 2개]
[Quick Facts: 카드 4~6개]
[Method: 단계 타임라인]
[Key Findings: 3개 카드]
[Evidence Gallery: 3열 카드]
[Full Report: PDF 패널 + 폴백 버튼]
[Footer]
```

### Mobile

```text
[Skip to content]
[Hero(단일열)]
[Quick Facts(2열 카드)]
[Method(세로 스텝)]
[Key Findings(세로 카드)]
[Evidence Gallery(1열/2열 혼합)]
[Full Report]
[Footer]
```

## 4) 접근성/UX 규칙

1. heading 계층을 `h1 -> h2 -> h3`로 고정
2. 키보드 탭 순서를 시각 순서와 일치
3. 모든 상호작용 요소는 `:focus-visible` 상태 제공
4. 새 창 링크는 `noopener noreferrer` 고정
5. PDF 실패 시 대체 경로를 섹션 내부에 명시

## 5) 성능 규칙

1. 초기 렌더에서 PDF iframe 로딩 우선순위 낮춤
2. 이미지는 `width/height` 명시 + `loading="lazy"` 적용
3. Hero 인접 핵심 요소는 우선 렌더 대상으로 유지

## 6) 구현 체크포인트

1. 첫 화면 30초 스캔 테스트 통과 여부
2. PDF 미열람 상태에서 핵심 메시지 전달 여부
3. 모바일(360~430px) 가독성 유지 여부
