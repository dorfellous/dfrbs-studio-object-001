# Verification — complete DFRBS Studio website

Verified on 5 October 2026. This is the broader joint-studio build, superseding the earlier campaign refinement.

## Automated checks

- `npm run build` passed, emitting `dist/client/index.html`, `dist/server/index.js` and `dist/.openai/hosting.json`.
- `npm run test:studio`: 5/5 passed (required fields, reply address, safely encoded multiline/Unicode data and context, service fallback, optional fields).
- `npm run test:sites`: 4/4 passed (static assets, app route fallback, API/write requests, required packaging).
- The direction contract survives the production HTML build (`dfrbs-open-drawer-2`).
- Impeccable detector ran once: no findings. The protected worker, hosting configuration, packaging script and hosting tests remain unchanged.

## Browser verification

Desktop at 1440 × 1000 and mobile at 390 × 844; the inquiry also checked at 320 px width. Work, services and inquiry had no horizontal overflow. Header links, service drawers (including keyboard opening), filter counts, project routes, service preselection and browser Back were verified in the built preview.

The inquiry identifies blank required fields, focuses the first invalid field, prepares a readable brief and generates the correctly encoded draft to the verified address. No message was sent during verification.

The object archive retains 000 / 001 / 002; product colorway arrow selection, FORM/WORN tabs, image dialog Escape, bag quantities/removal/totals and empty state were checked. The campaign film loaded with the supplied 30-second duration and its sound state toggled. The film was paused during browser observations, so these observations do not certify uninterrupted playback or autoplay on every device. The native controls and original-work links remain available.

Keyboard opening of a project film focuses Close film; closing restores Watch film. No console error/warning was observed in the captured built-site session. Founder media loaded without broken images.

## Fresh finish review — Pass

All five contract sections passed: thesis, visual world, story, first viewport, form/finish. The review distinguished the approved object-only composition from the broader studio website that inherits its system.

| Finding | Final status |
| --- | --- |
| Cropped desktop colorway thumbnails | Resolved. Complete silhouettes and distinct colours are visible. |
| OBJECT 002 specimen cut off at the plate bottom | Resolved. The full sleeve fits at substantial scale. |
| Invalid OBJECT 002 mobile capture | Resolved. Normal mobile rendering establishes readable content and complete product imagery. |
| Initial desktop home heading clipping | Resolved. Corrected capture shows the complete heading. |
| Film player keyboard focus loss | Resolved. Keyboard verification confirms transfer and restoration. |

The first home/mobile-002 captures reflected browser scroll anchoring or stale resizing; corrected captures established actual top-of-page/mobile rendering. Image fitting and player focus were source fixes. No open material UI findings remain.

## Delivery boundary

The source, preview, design system, strategy and draft pull request are reviewable. No public deployment or merge was performed. Inquiry uses an email draft; the product bag has no checkout backend. These are clearly disclosed in the interface and README.
