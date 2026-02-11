# Liquid Glass Stage 3 - Lens Experiment 회고 (2026-02-11)

## 요약

Stage 3에서 SVG displacement 기반 렌즈 왜곡을 실험했으나, 사용자 피드백(텍스트가 흐려 보임, Apple 느낌과 거리감)을 반영해 해당 접근은 유지하지 않고 철회했다.

현재 코드 기준:

- SVG 필터/렌즈 블록: 제거됨
- 이유: 컨트롤 내부 라벨 선명도 저하 가능성 및 과장된 질감
- 대체 방향: Stage 4 Control-First Tinted Glass로 전환

## 얻은 교훈

1. Liquid Glass의 핵심은 "왜곡 강도"가 아니라 "가독성 + 질감 균형"이다.
2. 컨트롤의 글자 선명도가 조금이라도 손상되면 Apple 스타일과 멀어진다.
3. 렌즈 왜곡은 웹에서 보조 실험으로만 다루고, 기본 스타일로는 채택하지 않는 것이 안전하다.

## 다음 단계 연결

- Stage 4 문서: `docs/liquid_glass_stage4_tinted_control_refinement_2026-02-11.md`
- 보강 조사 문서: `docs/apple_liquid_glass_control_first_research_2026-02-11.md`
