# Liquid Glass Stage 6 - Optical Edge Refinement (2026-02-11)

## Goal
- Keep control body as transparent glass.
- Move optical color effects to edge only.
- Increase glass realism without reducing text readability.

## Deep Research Notes
1. Apple Liquid Glass focuses on unified control/navigation material and legibility, not just heavy blur.
2. Apple platform settings explicitly include clear/tinted appearance and transparency/contrast controls.
3. Physically based optics: glass reflectance grows near grazing angles (Fresnel). In UI terms, this supports stronger edge lighting vs center fill.
4. Web implementation constraints: use `backdrop-filter` for transmission and masked pseudo-elements for edge-only effects.

## Stage 6 Design Model
1. Glass Core (center):
  - low-alpha transparent fill
  - controlled backdrop blur/saturation
  - no rainbow in center
2. Specular Ring (edge highlight):
  - thin white highlight ring only on border band
  - stronger at hover
3. Prism Ring (chromatic edge):
  - conic-gradient color dispersion
  - masked to border band only
  - slightly stronger/rotated on hover
4. Text Plane:
  - dark text, no blur, no overlay on glyph area

## Implementation (CSS)
- Token additions:
  - `--lg-specular-ring`
  - `--lg-prism-edge`, `--lg-prism-edge-hover`
  - `--lg-prism-opacity`, `--lg-prism-opacity-hover`
- Transparent body tuning:
  - reduced center alpha in `.btn`, `.site-nav a`
  - preserve `backdrop-filter` and inner shadows for thickness
- Edge-only optics via mask:
  - `@supports ((-webkit-mask-composite: xor) or (mask-composite: exclude))`
  - `.btn::before`, `.site-nav a::before`: specular ring (white)
  - `.btn::after`, `.site-nav a::after`: prism ring (rainbow)
  - both pseudo layers clipped to border band using content-box mask subtraction

## Validation
- CSS brace balance checked.
- Local static serving check passed:
  - `/` 200
  - `/styles.css` 200
  - `/app.js` 200
  - `/Pen_Testing.pdf` 200

## Sources
- Apple WWDC25: Meet Liquid Glass
  - https://developer.apple.com/videos/play/wwdc2025/219/
- Apple WWDC25: Get to know the new design system
  - https://developer.apple.com/videos/play/wwdc2025/356/
- Apple Newsroom (2025-06-09): new software design
  - https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- Apple Support: clear/tinted appearance on iPhone
  - https://support.apple.com/en-vn/guide/iphone/iph8f16f95bb/ios
- Apple Support: reduce transparency on iPhone
  - https://support.apple.com/en-vn/guide/iphone/iph3e2e1fb0/ios
- Apple Support: increase contrast
  - https://support.apple.com/guide/iphone/increase-screen-contrast-iph3e2e367e/ios
- PBRT v4: Reflection Models (Fresnel basis)
  - https://www.pbr-book.org/4ed/Reflection_Models
- MDN: `backdrop-filter`
  - https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
- MDN: `mask-composite`
  - https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite
- MDN: `-webkit-mask-composite`
  - https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-composite
- MDN: `prefers-reduced-transparency`
  - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency
