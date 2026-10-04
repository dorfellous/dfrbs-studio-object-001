# Immersive campaign implementation plan

**Goal:** Amplify DFRBS's existing campaign identity with a more deliberate product and film experience.

**Architecture:** Keep React state and URL handling in App.jsx. Isolate dialog accessibility in a small hook. Put scoped campaign refinements in campaign.css, imported after the existing stylesheet so studio layout remains stable.

**Tech stack:** React 19, Vite 6, existing Phosphor icons and bundled fonts. No new production dependencies.

## Global constraints

- Preserve AGENTS.md product anatomy, imagery, neutral backgrounds, exact copy/prices and all four routes.
- Keep .openai/hosting.json, worker/index.js, scripts/prepare-sites-build.mjs and tests/sites-worker.test.mjs intact.
- Keep genuine product cutouts in object-fit: contain with full silhouettes.
- Ship visible content by default and honor reduced motion.

## Task 1 — Campaign presentation

Files: src/App.jsx, src/campaign.css, src/main.jsx, AGENTS.md.

- [x] Implement hero editorial layout and colorway dock using existing product/campaign data.
- [x] Implement a colorway specimen stage with keyed image reveal, selected-color data and details action.
- [x] Refine film spread and add pause/play alongside sound; preserve autoplay defaults.
- [x] Improve collection selected state, product-panel type and mobile navigation.
- [x] Give radiogroups roving focus and arrow/Home/End behavior.
- [x] Clear overlays on popstate; use reduced-motion scrolling.
- [x] Record collaborator's durable direction in AGENTS.md.

## Task 2 — Dialog accessibility

File: src/useDialogAccessibility.js.

- [x] Provide useDialogAccessibility(open, onClose, dialogRef).
- [x] Focus the close control after mount, trap Tab/Shift+Tab, close with Escape, restore prior focus.
- [x] Make background siblings inert while a dialog is open; restore original inert state on cleanup.
- [x] Integrate independent menu and drawer refs in App.jsx.

## Task 3 — Verification and delivery

- [x] Run npm run build and npm run test:sites; confirm all three required build outputs.
- [x] Inspect desktop/mobile in one batched browser round; exercise controls and routes, then fix material issues in one batch.
- [x] Review code and captured screenshots in a fresh agent; resolve actionable findings.
- [x] Run git diff --check and design detector once; capture final screenshots.
- [x] Save preview images in outputs, commit reviewed changes, open and attach a draft PR, keep local preview available.
