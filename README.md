# DFRBS Studio

A complete creative studio website for the proposed shared practice of Ran Bensimon and Dor Fellous, speaking to brands, artists and cultural organisations. The charcoal/chrome atelier identity combines large authored imagery, individually credited project dossiers, detailed service drawers and a reviewable project brief.

## Experience

- Home with selectable fashion, film and object showcase, motion controls and project entry points.
- Nine selected-work dossiers, service filters, films, original credits and links to source projects.
- Six offers: films and campaigns, 3D and digital fashion, websites and creative tools, AI production workflows, art and experiences, workshops and team training.
- Studio profiles, process and direct links to both individual portfolios.
- Project inquiry with service preselection, validation, local brief review, copy and email-draft actions.
- Preserved object archive: studio manifesto, four-lens eyewear and Clipper sleeve; color selection, image inspection and local bag quantities/removal/totals.
- Responsive layouts, keyboard controls, accessible dialogs and reduced-motion support.

Earlier commissions keep their founder and collaborator credits. The shared studio’s service scopes and engagement models are proposals; see [the strategy](docs/STUDIO-STRATEGY.md).

## Routes

| Destination | Query |
| --- | --- |
| Home | bare root |
| Work | `?page=work` |
| Services | `?page=services` |
| Studio | `?page=studio` |
| Project brief | `?page=contact` |
| Project dossier | `?project=ran-bring-your-love` (or another ID in `src/studioProjects.js`) |
| Service selection/filter | add `&service=film`, `3d`, `web`, `pipeline`, `art` or `workshop` |
| Original studio archive | `?object=000` |
| Eyewear / Clipper sleeve | `?object=001` / `?object=002` |

Query routes retain direct links and browser history on GitHub Pages. The Object Archive footer link reaches the original collection.

## Development and verification

React 19, Vite 6, Phosphor Icons and locally bundled Archivo / DM Mono.

```sh
npm ci
npm run dev
npm run test:studio
npm run build
npm run test:sites
```

`npm run build` emits the production client to `dist/client` and retains the existing worker and hosting metadata for a future Sites handoff. `vite.config.js` sets the GitHub Pages base `/dfrbs-studio-object-001/`.

The five inquiry tests cover required fields, reply address validation, multiline/Unicode/email encoding, service fallback and optional fields. Four hosting tests preserve asset serving, route fallback, API/write behavior and packaging.

## Functional boundaries

The inquiry prepares a brief locally and opens an email draft addressed to the verified public contact `info@ranbensimon.com`. The visitor sends it through their email app. There is no server submission or misleading “sent” state.

The object bag is a local prototype: no payment, stock, persistence or checkout backend. Film embeds load only when requested and retain original-work links. Official titles/dates for Dor’s selected studies can replace the descriptive labels when supplied. Public launch, the final domain and a dedicated studio inbox remain business decisions.

## Content and design

[Product truth](PRODUCT.md), [design system](DESIGN.md), [service strategy](docs/STUDIO-STRATEGY.md), [media provenance](docs/MEDIA-SOURCES.md) and [verification](docs/VERIFICATION.md) record the current scope. Product, campaign and portfolio media remain their creators’ work; do not redistribute them independently.
