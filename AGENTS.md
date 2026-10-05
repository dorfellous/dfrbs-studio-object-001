# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## DFRBS prototype decisions

- The collaborator rejected literal use of the black-office/pink-fur/long-manicure metaphor in marketing copy. The imagery already carries that atmosphere. Public text must add an independent layer: creative judgment, the connection between direction and production, and what clients can make or use. Do not explain the office joke or turn its props into slogans. This supersedes the earlier literal “Black room. Pink fur. Sharp minds.” and “Long nails. High standards.” copy. Keep image descriptions accurate for accessibility and the concept label truthful.
- The collaborator clarified the studio's spirit: an imagined all-black office, pink fur carpets, black clothing and extravagant pink manicures; “confident bitches” who know their craft and do not mess around. Treat this as attitude and creative culture, never a claim about current premises, staff or a dress code. Preserve wit, queer/fashion sensibility, strong taste and technical competence. Let project evidence earn the confidence, and keep client-facing actions and form messages clear and welcoming.
- The wider studio may use precise hot-pink accents alongside black and chrome, authorised by this brand clarification. Pink appears in small active/hover marks and conceptual studio imagery. It does not replace the HEAT product palette or become a large page background. The black/pink concept image is explicitly labelled “Studio daydream / concept image.”

- On October 5, 2026, the collaborator expanded the objective from an object campaign to a complete creative studio website for Ran Bensimon and Dor Fellous. The confirmed name is **DFRBS Studio** and the primary audience is **brands, artists and cultural organisations**. This is the current scope.
- The bare root is now the full studio homepage. Persistent navigation leads to Work, Services, Studio and a project inquiry. Earlier objects remain shareable at `?object=000`, `001` and `002`, reachable through the Object Archive footer link and the eyewear project. This supersedes the former requirement that the bare root be an object cabinet.
- Present six proposed offers: films and campaigns, 3D and digital fashion, websites and creative tools, AI production workflows, art and experiences, workshops and team training. Explain client outcomes before tool names. “Vibe coding” is described to clients as websites, interactive experiences and creative tools.
- Earlier portfolio projects belong to each founder’s individual practice. Retain original roles and collaborator credits. Do not imply these were commissioned from the newly imagined joint studio. Dor’s generic study titles are descriptive labels where official titles/dates were unavailable.
- Inquiry prepares a reviewable brief locally, then opens an email draft to the verified public address `info@ranbensimon.com`. It does not submit or claim to send a message. The object bag remains a local prototype with no checkout backend.

- The collaborator approved the recommended second reinvention composition (open drawer) with "yes" on October 5, 2026. Its local reference is `.impeccable/mocks/reinvention-comp-2.png`, with the contract in `docs/superpowers/specs/2026-10-05-object-atelier.md`. Build the object atelier across all routes: huge product inspection plate, adjacent order slip, drawer seams and a studio dossier. HEAT is the initial eyewear colorway; preserve all three selectable colors.

- On October 5, 2026, the collaborator rejected the immersive campaign polish with: "no. do a overhaul reinovation". This requests a complete reinvention of page composition, navigation, and interactions. It supersedes the earlier extend-the-existing-identity instruction, approved mock compositions, protected studio layout, and film-only opening composition. Preserve product truth, supplied imagery and wordmark, prices, colorways, shareable URL states, and working purchase and film controls; the earlier layouts are references and anti-references, not visual authority.

- `reference/selected-mockup.png` records the earlier visual target; its layout is superseded by the overhaul request.
- Keep the page predominantly black, charcoal, smoky gray, and chrome. Orange-to-pink belongs on the HEAT eyewear and small active-state accents only; never reintroduce a large colored background.
- Preserve the exact eyewear silhouette from the supplied product photos, especially the narrow organic central nose bridge. Never stretch or redraw the eyewear to fill a slot.
- The defining lens geometry is four strongly convex bubble lenses: two stacked lenses per eye, upper and lower. Never flatten, merge, remove, or reinterpret any of the four lenses.
- Product cutouts must use genuine transparent PNGs with transparent openings and decontaminated, matte-free edges on black. Keep all three colorways on the shared 1600 × 1200 canvas and keep the oversized campaign product fully legible instead of cropping the silhouette aggressively.
- Use the supplied DFRBS campaign imagery and wordmark; do not substitute generic fashion assets.
- The repository must stay GitHub-ready: relative asset paths, a clean README, a production build, and no secrets or machine-specific paths.
- `reference/approved-object-002-mockup.png` records the earlier second-product composition; its layout is superseded. OBJECT 002 remains a removable 3D-printed organic Clipper lighter sleeve with BLACK, PEARL, and HEAT colorways.
- Keep all three destinations easy to reach through persistent object navigation and an object index, with their placement and visual form open to reinvention. Each object uses a shareable `?object=` URL state while remaining inside the same React site.
- OBJECT 001 is priced at `$1,500`; preserve its supplied four-lens eyewear assets, product descriptions, and `ADD TO BAG` purchase state.
- OBJECT 002 is priced at `$420`. Its product description is `3D PRINTED LIGHTER CASE.` and its drawer uses the standard `ADD TO BAG` purchase state.
- Preserve the lighter anatomy in every asset: ignition assembly at the top, open base at the bottom, organic PETG frame, and exactly four convex front pods.
- OBJECT 001 includes the user-supplied 30-second portrait campaign film at `public/assets/object-001-campaign-film.mp4`. Keep it autoplaying muted, looping, inline on mobile, and paired with the functional SOUND toggle and poster asset.
- `reference/approved-our-studio-mockup.png` records the earlier studio composition; its layout is superseded. The studio remains page `000 / OUR STUDIO`, available at `?object=000`, and appears before 001 and 002 in persistent object navigation.
- Preserve the studio's 2026–2040 manifesto, supplied office and boardroom imagery, disciplines, and object destinations. The office hero, oversized two-line title, and three-card index composition may all be replaced.
- Preserve the supplied object campaign film and the original `?object=` routes inside the wider studio website. The object archive links to all three destinations.
