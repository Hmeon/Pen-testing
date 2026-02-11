# Vercel Security Headers Draft (Phase D)

작성일: 2026-02-11  
목표: 레거시 `routes` 중심 구성에서 `headers` 중심 운영 구조로 전환

## 1) 전환 원칙

1. `routes` 의존도를 줄이고 `headers`, `rewrites`, `redirects` 우선 사용
2. 정적 포트폴리오에 필요한 최소 보안 헤더를 기본 적용
3. 기존 기능(PDF 새 창 보기/다운로드)은 유지

## 2) 초안 `vercel.json`

```json
{
  "version": 2,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';"
        }
      ]
    },
    {
      "source": "/Pen_Testing.pdf",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=3600" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/", "destination": "/index.html" }
  ]
}
```

## 3) 단계별 적용 전략

### Step 1

1. `headers` + `rewrites`를 먼저 도입
2. 로컬에서 `/`, `/Pen_Testing.pdf` 정상 동작 검증

### Step 2

1. CSP와 실제 HTML 동작 충돌 여부 점검
2. 필요 시 `style-src` 정책을 단계적으로 강화

### Step 3

1. 배포 후 응답 헤더 실측 확인
2. 다운로드/새 창 보기 회귀 테스트 수행

## 4) 검증 체크리스트

1. `/` 접속 200
2. `/Pen_Testing.pdf` 접속 200
3. PDF 새 창 보기 정상
4. PDF 다운로드 정상
5. 키보드 동선/포커스 스타일 유지
6. 보안 헤더 응답 확인

## 5) 참고

1. Vercel Project Configuration: https://vercel.com/docs/project-configuration
2. Vercel Security Headers: https://vercel.com/docs/headers/security-headers
3. OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
