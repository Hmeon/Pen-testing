# Repository Guidelines

## Project Structure & Module Organization
This repository is a static portfolio site for security work samples.

- `index.html`: main landing page and PDF access UI.
- `Pen_Testing.pdf`: primary deliverable shown/downloaded by visitors.
- `img/`: evidence screenshots (`fig_<chapter>-<number>.png` pattern).
- `vercel.json`: Vercel static routing/runtime config.
- `docs/`: planning and research notes for design/quality upgrades.

Keep paths stable: `index.html` links directly to `Pen_Testing.pdf` and image assets.

## Build, Test, and Development Commands
No build pipeline is required; this is static content.

- `python -m http.server 8000`: local preview at `http://localhost:8000`.
- `vercel dev`: run with Vercel routing behavior locally.
- `vercel --prod`: deploy to production (if you have Vercel access).

## Coding Style & Naming Conventions
- Use semantic HTML (`main`, `section`, `header`, `footer`) and accessible labels.
- Indentation: 2 spaces for HTML/CSS/JSON.
- Keep CSS readable and token-oriented (variables in `:root` when adding themes).
- File names:
  - Keep existing report filename `Pen_Testing.pdf`.
  - New docs: lowercase snake_case in `docs/`.
  - New images: follow existing `img/fig_*` style unless a migration is planned.

## Testing Guidelines
There is no automated test suite yet. Run manual checks before PRs:

1. Open `/` and confirm layout works on desktop and mobile widths.
2. Verify `PDF 새 창으로 보기` opens correctly.
3. Verify `PDF 다운로드` triggers file download.
4. Confirm key assets return `200` (HTML, PDF, representative images).
5. Re-check keyboard navigation and visible focus states after UI changes.

## Commit & Pull Request Guidelines
Current git history uses short, imperative messages (`implement`, `commit`). Keep imperative style, but make messages specific:

- `feat: redesign hero and CTA layout`
- `fix: add pdf iframe fallback message`
- `docs: update frontend trend analysis`

PRs should include:

1. Summary of user-facing changes.
2. Files changed and reason.
3. Manual test results.
4. Before/after screenshots for UI updates.

## Security & Content Handling
- Publish only authorized lab/education material.
- Do not commit credentials, private keys, or sensitive target data.
- For external links, use `rel="noopener noreferrer"` where applicable.
