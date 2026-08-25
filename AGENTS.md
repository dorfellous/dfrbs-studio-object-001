# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## DFRBS prototype decisions

- The approved visual target is `reference/selected-mockup.png`.
- Keep the page predominantly black, charcoal, smoky gray, and chrome. Orange-to-pink belongs on the HEAT eyewear and small active-state accents only; never reintroduce a large colored background.
- Preserve the exact eyewear silhouette from the supplied product photos, especially the narrow organic central nose bridge. Never stretch or redraw the eyewear to fill a slot.
- The defining lens geometry is four strongly convex bubble lenses: two stacked lenses per eye, upper and lower. Never flatten, merge, remove, or reinterpret any of the four lenses.
- Product cutouts must use genuine transparent PNGs with transparent openings and decontaminated, matte-free edges on black. Keep all three colorways on the shared 1600 × 1200 canvas and keep the oversized campaign product fully legible instead of cropping the silhouette aggressively.
- Use the supplied DFRBS campaign imagery and wordmark; do not substitute generic fashion assets.
- The repository must stay GitHub-ready: relative asset paths, a clean README, a production build, and no secrets or machine-specific paths.
- The approved second product page is `reference/approved-object-002-mockup.png`. OBJECT 002 is a removable 3D-printed organic Clipper lighter sleeve with BLACK, PEARL, and HEAT colorways.
- Keep the site scalable through the persistent 001 EYEWEAR / 002 CLIPPER SLEEVE switcher and the bottom OBJECT INDEX. Each object uses a shareable `?object=` URL state while remaining inside the same React site.
- OBJECT 002 is priced at `$420`. Its product description is `3D PRINTED LIGHTER CASE.` and its drawer uses the standard `ADD TO BAG` purchase state.
- Preserve the lighter anatomy in every asset: ignition assembly at the top, open base at the bottom, organic PETG frame, and exactly four convex front pods.
