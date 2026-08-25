# DFRBS Studio — Design QA

Final result: passed

## Visual target

- Reference: `reference/selected-mockup.jpg`
- Desktop verification viewport: 1348 × 926
- Mobile verification viewport: 390 × 844 (rendered in a same-origin QA frame)
- Normalized comparisons:
  - `qa/comparison-hero.jpg`
  - `qa/comparison-object.jpg`
- Live implementation capture: `https://dorfellous.github.io/dfrbs-studio-object-001/#campaign` (cloud-browser viewport capture, 1363 × 936 CSS px, device scale 1)
- Source pixels: `reference/selected-mockup.jpg`; implementation pixels/CSS size: 1363 × 936; no density normalization was required for the live browser capture.
- State: desktop, HEAT selected, campaign section aligned to the top of the viewport.

## Iteration history

### Pass 1

- **P1 — HEAT cutout showed a checkerboard/white-background artifact.** Rebuilt the cutout from the supplied product photograph, removed the connected background and shadow fringe, and upscaled the transparent asset for the oversized campaign treatment.
- **P1 — Product geometry could drift from the selected visual.** Replaced generated-looking product geometry with source-derived product imagery. The large black product uses the original supplied photograph, preserving the narrow organic nose bridge.
- **P2 — First browser capture used the fallback heading font.** Waited for the bundled Bebas Neue font to finish loading before final capture.

### Pass 2

- Compared the normalized hero and object views side by side with the selected mockup.
- Confirmed the black, pearl, and heat states maintain the same dark editorial system and keep strong color limited to the product.
- Confirmed no product cutout background, broken crop, overflow, or unreadable text remained at the tested states.
- Confirmed the deliberate geometry correction: the source-accurate black product differs from the more symmetrical mockup rendering in order to preserve the real nose bridge.

No open P0 or P1 issues.

### Pass 3 — cutout correction

- **P1 — All transparent product assets showed a light matte fringe on black.** Rebuilt the BLACK, PEARL, and HEAT alpha edges and removed white background remnants from the HEAT frame openings.
- **P1 — The oversized HEAT asset was initially published only partially.** Re-uploaded the complete lossless PNG, verified the deployed byte size (1,347,663 bytes), and moved the corrected image to a versioned URL to invalidate the stale browser cache.
- **P2 — The campaign product crop was too aggressive.** Reduced the desktop width from 118vw to 96vw and mobile width from 150vw to 110vw while preserving the product silhouette and editorial overlap.
- Post-fix evidence: the live browser capture at `#campaign` shows the complete HEAT product, transparent openings, no white matte, and left/right breathing room inside the 1363 px viewport.
- Focused region evidence was the campaign product itself; no additional crop was needed because the eyewear occupies most of the captured viewport and its full edge is readable.

## Functional verification

- BLACK / PEARL / HEAT controls update the campaign and product state.
- Deployed cutout dimensions loaded successfully: BLACK 1446 px, PEARL 1265 px, HEAT 1920 px.
- Campaign CTA scrolls to the product section.
- Product drawer opens and closes.
- Adding a product updates the local bag count and button state.
- Mobile menu opens, exposes all navigation items, and closes.
- No application-origin console errors were recorded in the cloud-browser session; extension-only metadata errors were excluded.

## Build verification

- `npm run build` — passed
- `node --test tests/sites-worker.test.mjs` — 4/4 passed
