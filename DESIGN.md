---
name: DFRBS Studio
description: Authored images and working creative systems, presented through artifact plates and open drawers.
colors:
  charcoal: "#111"
  pearl: "#e5e2db"
  muted: "#a7a59f"
  seam: "#53534f"
  heat: "#fa7a25"
  white: "#fff"
  inspection: "#141414"
  drawer: "#151515"
  film: "#171717"
  dossier: "#191919"
  archive: "#111110"
  archive-ink: "#f2f1ed"
  archive-muted: "#a9a9a4"
  archive-seam: "rgba(242, 241, 237, 0.27)"
  ghost: "#20201e"
  row-hover: "#1b1b19"
  service-open: "#1a1a18"
  field-rule: "#666660"
  thumbnail-rule: "#454540"
  added: "#d9d8d1"
  inquiry-error: "#ffa894"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(50px,5.9vw,95px)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-.04em"
  page-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(56px,6.5vw,96px)"
    fontWeight: 900
    lineHeight: 0.96
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(35px,4.3vw,64px)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-.03em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "21px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.015em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: ".1em"
  navigation:
    fontFamily: "Archivo, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: ".12em"
  primary-action:
    fontFamily: "Archivo, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    letterSpacing: ".1em"
  object-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(24px, 2.7vw, 44px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-.025em"
  service-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(25px, 2.7vw, 41px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-.025em"
  field:
    fontFamily: "Archivo, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  square: "0"
spacing:
  site-gutter: "clamp(20px,3.2vw,50px)"
  services-gutter: "clamp(20px, 3vw, 46px)"
  inquiry-gutter: "clamp(20px, 3.6vw, 56px)"
  archive-gutter: "clamp(24px, 3.1vw, 48px)"
  object-gutter: "36px"
  tablet-object-gutter: "24px"
  mobile-gutter: "20px"
  narrow-object-gutter: "14px"
  section: "80px"
  broad-section: "100px"
  mobile-section: "48px"
  grid-column-gap: "24px"
  grid-row-gap: "44px"
components:
  button-primary:
    backgroundColor: "{colors.pearl}"
    textColor: "{colors.charcoal}"
    typography: "{typography.primary-action}"
    rounded: "{rounded.square}"
    padding: "20px 24px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
  purchase-button:
    backgroundColor: "{colors.pearl}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.square}"
    padding: "16px 19px"
    width: "100%"
  purchase-button-added:
    backgroundColor: "{colors.added}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.pearl}"
    rounded: "{rounded.square}"
    padding: "12px 0"
  service-action:
    backgroundColor: "{colors.pearl}"
    textColor: "{colors.archive}"
    rounded: "{rounded.square}"
    padding: "15px 20px"
  inquiry-action:
    backgroundColor: "{colors.pearl}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.square}"
    padding: "17px 22px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.pearl}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "11px 0"
  service-drawer-summary:
    backgroundColor: "transparent"
    textColor: "{colors.pearl}"
    rounded: "{rounded.square}"
    padding: "26px clamp(20px, 3vw, 46px)"
  service-drawer-summary-open:
    backgroundColor: "{colors.service-open}"
  bag-panel:
    backgroundColor: "{colors.drawer}"
    textColor: "{colors.pearl}"
    rounded: "{rounded.square}"
    padding: "28px"
    width: "min(620px,100%)"
  detail-panel:
    backgroundColor: "{colors.inspection}"
    textColor: "{colors.pearl}"
    rounded: "{rounded.square}"
    width: "min(1400px,100%)"
---

# Design System: DFRBS Studio

## Overview

**Creative North Star: "The open studio drawer"**

Authored images and working creative systems share one studio. Charcoal, pearl, the supplied chrome wordmark and strong Archivo type create a restrained frame for the actual work of Ran Bensimon and Dor Fellous. Colour comes primarily from the work itself; flat artifact plates, fine drawer seams and rectangular actions carry the interface.

This is the built system after the approved Open drawer composition 2 reinvention and its expansion into a complete joint creative studio. It replaces the earlier campaign refinement. The homepage introduces the practice, work pages foreground individually credited artifacts, services disclose their scope in drawers, and the project brief uses a quieter form layout. Shared materials and controls connect those surfaces; their composition follows their purpose.

The source of truth is [atelier.css](src/atelier.css), [studioWebsite.css](src/studioWebsite.css), [services.css](src/services.css), [inquiry.css](src/inquiry.css), [studio.css](src/studio.css) and the matching JSX. [PRODUCT.md](PRODUCT.md), the body contract in [index.html](index.html) and the [complete-studio specification](docs/superpowers/specs/2026-10-05-complete-studio.md) establish the approved scope. The object authority is [Open drawer composition 2](.impeccable/mocks/reinvention-comp-2.png). Tokens above record implemented values; the sidecar carries extensions and preview snippets. Its generated tonal ramps are preview metadata, not additional implemented palette steps.

**Key Characteristics:**

- Authored founder imagery and films lead.
- Charcoal, pearl and chrome form the shared material language.
- Archivo provides expressive headings and readable prose; DM Mono handles compact indexes and technical captions.
- Artifact plates, ruled rows and native drawers replace rounded cards.
- Rectangular pale actions remain easy to find beside large images.
- Each surface changes its density and spatial structure to serve its task.

## Colors

The palette is a warm neutral range with a small HEAT accent. The frontmatter preserves the CSS source notation.

### Primary

- **Pearl:** Primary reading colour, selected navigation marks and pale filled actions. On filled actions, Charcoal becomes the text colour.
- **HEAT:** The warm orange accent used on selected object thumbnails and names, plus the object detail action on hover. It stays local to those states rather than becoming a general studio call-to-action colour.

### Neutral

- **Charcoal:** Page, sticky navigation, order slip and control backgrounds.
- **Inspection, Drawer, Film and Dossier:** Small tonal shifts distinguish media plates, bag contents and project media without card elevation.
- **Muted:** Descriptions, individual credits, technical captions and secondary context.
- **Seam:** Straight section dividers, row boundaries and secondary-action rules.
- **White:** Hover brightening and readable labels over authored media.
- **Ghost:** Low-contrast oversized numerals and marks belong to the object archive and its 000 studio dossier.
- **Archive, Archive Ink, Archive Muted and Archive Seam:** The close neutral variants retained by the original 000 studio surface.
- **Row Hover and Service Open:** Subtle surface changes indicate interactive or expanded rows.
- **Field Rule and Thumbnail Rule:** Stronger local outlines for editable fields and object choices.
- **Added:** The pale grey purchase confirmation state.
- **Inquiry Error:** Inline validation messages, error summary and invalid field underline. Errors retain text and semantic state as well as colour.

**The Restrained Heat Rule.** HEAT belongs to product imagery and small object-selection states. Keep broad interface backgrounds neutral.

## Typography

**Display and Body Font:** Archivo, with a sans-serif fallback.
**Label/Mono Font:** DM Mono, with a monospace fallback.
**Identity:** Use the supplied wordmark image rather than recreating its lettering as text.

The bundled Archivo weights are 400, 500, 800 and 900; DM Mono is bundled at 400. Heavy, tightly tracked headings sit beside ordinary Archivo paragraphs and small, spaced mono captions. The wider studio's body copy is comfortably readable rather than inheriting the compact uppercase object specification style.

### Hierarchy

- **Display:** The homepage headline uses the display token; work and studio introduction titles use page-title. Services use a closely related title at `clamp(54px, 6.5vw, 96px)`, line-height `.93`; inquiry uses `clamp(58px, 7.2vw, 96px)`, line-height `.94`.
- **Headline:** Section headings use headline; large closing invitations rise to weight 900 and tighter line-height. Project dossier headings are 43px at weight 800.
- **Title:** Work titles use the quieter title token. Service drawer titles use service-title; object identification uses object-title and uppercase.
- **Body:** Project explanations use body with a maximum width of 50ch. Homepage introduction is 15px / 1.6 at 34ch. Service descriptions use `clamp(17px, 1.45vw, 22px)` / 1.55 at 56ch. Supporting text generally falls between 12px and 16px.
- **Label:** Mono labels are generally 8–11px with `.07em`–`.16em` spacing. Object descriptions use uppercase 10px / 1.7 mono. Navigation in the wider studio uses Archivo; archive navigation uses DM Mono.
- **Fields:** Editable text is 17px / 1.5, reduced to 16px on mobile. Labels are 14px. Inquiry CSS requests weights 600 for labels and 700 for its filled actions; those declarations do not introduce separately bundled font weights.

**The Two Voices Rule.** Use Archivo for ideas, readable descriptions and action hierarchy. Use DM Mono for compact indexes, object specifications and production metadata.

## Layout

The system uses full-width sections and asymmetrical grids separated by one-pixel seams. Gutters are fluid where each surface defines them; there is no universal centred maximum-width card shell. Large media plates coexist with narrow, deliberate copy widths.

| Surface | Built composition |
| --- | --- |
| Homepage | A 62% authored-media plate and 38% introduction/action panel, minimum height 660px. Media has its own bottom selector rail. Practice index has three ruled columns. Selected work uses two columns. |
| Work archive | Page introduction, horizontal underlined filters, then a two-column artifact grid with separate image and credit metadata. |
| Project dossier | Wide contained media, then a 1.25fr / 1fr explanation-and-credit grid. Embedded film players use 16:9. |
| Services | A 1.35fr / 1fr introduction, six numbered native disclosure drawers, and expanded scope/delivery columns at 1.45fr / 1fr. |
| Joint studio | Two founder work-image/profile columns, followed by a 1fr / 1.15fr process section and a large typographic statement. These are work images, not founder portraits. |
| Project brief | A 1.25fr / .75fr introduction, then a narrow supporting aside beside a broad form at .7fr / 1.6fr. Paired fields use two columns; the reviewed brief follows the form. |
| Objects 001 / 002 | A 67.2% inspection plate and 32.8% order slip, minimum height 690px. Cabinet rows provide onward navigation; campaign chapters use their own split grids. |
| Archived studio 000 | Statement/office plate at 1.6fr / 1fr; boardroom/copy at 1.85fr / 1fr. It retains its office and boardroom imagery within the current material world. |

The wide studio header is sticky, minimum height 76px, with brand, navigation and project contact across three columns. The object header starts at 64px. Section breathing room is commonly 80–100px; mobile sections commonly use 48px. Work grids use 24px horizontal and 44px vertical gaps.

| Breakpoint | Implemented change |
| --- | --- |
| 1650px and above | Homepage and object openings increase to 800px minimum height; related internal spacing expands. |
| 1100px and below | Homepage opening becomes 58% / 42%; object inspection becomes 62% / 38%. Headers and gaps tighten. |
| 1080px and below | Service drawer number/title/copy columns tighten and expanded content indents reduce. |
| 1050px and below | Inquiry and archived studio layouts tighten independently. The inquiry submit row becomes vertical. |
| 760px and below | Headers become two rows with visible navigation. Homepage identity/action comes before its media plate. Work and founder grids, dossiers, service content and brief fields become single-column. Inquiry aside comes before the form. Object inspection comes before ordering; the order photograph follows the controls. Gutters are predominantly 20px. |
| 360px and below | Object header and cabinet gutters become 14px and archive labels tighten. |

Mobile archive filters scroll horizontally; their work count hides. Homepage metadata in the selector rail hides. Object cabinet imagery and notes hide while the numbered destination remains. Object inspection height uses `clamp(360px, 100vw, 580px)`; homepage fashion media has a taller mobile plate than its film/object alternatives. These are surface-specific behaviours, not one shared hero preset.

## Elevation & Depth

Surfaces are flat. There are no interface box shadows or product drop-shadow effects in the current stylesheets. Depth comes from genuine images, graphite texture on inspection/detail plates, small neutral shifts, thin seams, and dark dialog backdrops. Media captions alone use small dark text shadows to preserve readability.

The bag and inspection dialog use a `#000b` backdrop at overlay level 60. The bag slides in as a bordered side panel; the inspection dialog is a large centred bordered plate. The two sticky headers use levels 20 and 25, and the keyboard skip link uses 100. No glass blur or decorative gradient is used.

**The Flat Plate Rule.** Express interface structure through seams, tonal changes and media placement. Keep containers and actions flat.

## Shapes

Buttons, fields, media plates, thumbnails, ruled rows and dialogs are rectangular with square corners. There are no rounded cards, pill filters or circular swatches in the built interface. Phosphor arrows, plus, check, playback and close icons provide small geometric cues.

Products keep their supplied geometry. Eyewear is shown from its original transparent canvas, enlarged to 108% on desktop and 113% on mobile; the lighter plate explicitly uses contained fit. Thumbnails, project object media and the detail viewer use contained fit. Editorial archive tiles and campaign photographs crop with cover; full project dossier media preserves the complete image with contain. Respect that distinction when reusing a media component.

**The Complete Silhouette Rule.** Preserve the four-lens eyewear and the lighter sleeve anatomy. Use the real assets and their established fitting behaviour; never stretch an artifact to fill a plate.

## Components

### Buttons

Pale rectangular actions anchor the next step without competing with authored images.

- **Studio primary:** Pearl on Charcoal text, weight 800, spaced uppercase copy and a right arrow. Padding is defined in button-primary; hover brightens to White.
- **Object purchase:** Full-width pale action; confirmation changes to Added and a check icon, with a polite live status. Mobile minimum height is 56px.
- **Service action:** Compact DM Mono copy, a 54px minimum height and a wide arrow gap. The matching secondary action is transparent with a bottom seam.
- **Inquiry action:** Readable mixed-case Archivo, 58px minimum height, 17px / 22px padding. On mobile it spans the form and uses 56px minimum height.
- **Text links:** Transparent, square, underlined by a straight seam, with small directional icons. Hover brightens the rule or text.

### Navigation and filters

The supplied wordmark anchors the sticky header. Wider studio navigation uses Archivo at the navigation token; numbered object navigation uses mono. Active routes and hover reveal a one-pixel underline. Both headers keep their navigation visible on a second mobile row.

Work filters are text links with an active bottom rule and `aria-current`. They scroll horizontally on mobile. They are not filled chips. Navigation preserves query links and browser history; route changes move focus to the page heading without adding a visible heading outline.

### Artifact plates and work tiles

Work tiles have an image plate, a square bottom-right arrow tab and a separate title/individual-credit row. There is no enclosing card border, rounding or shadow. Desktop image aspect ratio is 1.45, mobile 1.2. Editorial images cover; object images contain. Hover image scale is 1.035, so the artifact remains the dominant content.

Project media uses contained fit, bounded by its actual dimensions rather than forcing every work into an archive crop. Founder profile images are selected work with descriptive alt text and individual portfolio links.

### Service drawers

Native `details` / `summary` disclosures form six full-width numbered rows. The default route opens the first; a linked service opens its matching row. Their shared `name` establishes a single-open group. The expanded state changes the row tone and rotates the plus icon 45 degrees.

Expanded content separates scope and related founder work from outputs, client fit and starting inputs. Actions sit below a straight seam. Mobile places summary copy below the title, collapses content to one column and replaces the delivery column's left border with a top border. Keyboard focus is an inset Pearl outline.

### Brief inputs and review

Inputs, select and textareas have transparent backgrounds, square corners and one bottom rule. Fields use field typography and a 50px minimum height. Textareas resize vertically; idea is taller than optional context. Labels identify required or optional fields in text.

Focus strengthens the underline and adds a Pearl outline with 5px offset. Invalid fields use Inquiry Error plus inline messages and `aria-invalid`; validation focuses the first invalid field. Review has its own heading, editable/copyable text, copy status and pale email-draft action. Preparing the brief moves focus to the review heading. Copying has a busy/disabled state. Editing returns to the name field. This is a local review-and-draft flow: its visual states never imply server delivery.

### Object inspection and selection

FORM and WORN / IN HAND are underlined tabs with a roving tab stop, arrow navigation and Home/End support. Selected tabs use Pearl; the selected underline is 2px. Detail inspection opens the focus-managed large plate and offers fit/enlarge controls.

Colourways use three rectangular real-image thumbnails, mono labels and a check mark. Selection uses the small HEAT border and label; hover shifts the thumbnail rule to Pearl. The radio group uses one tab stop, arrow cycling and Home/End selection.

### Bag and dialogs

The bag is a full-height side panel at the bag-panel width, with flat item rows, square quantity stepper, underlined removal and a large pale continuation action. It supports local quantities and totals. The detail viewer is centred, textured and square.

Dialogs focus the close control, trap Tab and Shift+Tab, close with Escape, make background branches inert, lock scrolling and restore prior connected focus. Preserve that interaction contract when changing their appearance.

### Focus and motion

Ordinary links, buttons and focusable surfaces use a 2px Pearl outline with 4px offset. Services and inquiry actions generally use 5px offset; the service summary uses -5px so its focus stays inside the row. Skip links appear on focus. Programmatically focused route and review headings remain visually quiet.

State changes are short and purposeful: navigation underline and pale actions use 250ms ease-out; drawer row and plus state use 180ms ease-out; work image hover uses 600ms with `cubic-bezier(.16,1,.3,1)`. Artifact plate entry uses 750ms, or 800ms on the homepage, from a 16px vertical offset with a small bottom clip; bag entry uses 500ms from a 40px horizontal offset. Inspection zoom uses 400ms with the same curve.

A global reduced-motion rule removes all animations/transitions and uses immediate scrolling. The homepage moving image starts paused for a reduced-motion preference; the object campaign player also responds to a changed preference. Keep visible playback controls, muted inline preview playback and poster fallbacks. Project videos use native controls or an explicitly opened film player whose close control and trigger exchange focus.

## Do's and Don'ts

### Do:

- **Do** reuse the supplied wordmark, authored founder work, campaign films and accurate object assets.
- **Do** use charcoal/pearl surfaces, square actions and straight seams as the shared interface language.
- **Do** retain the separate individual-credit metadata beside portfolio imagery.
- **Do** adapt layout to the surface: image archive, credited dossier, service drawer or reviewable brief.
- **Do** preserve contained artifact/project-media fitting and deliberate editorial cropping.
- **Do** retain native controls, visible focus, keyboard selection, focus-managed dialogs and reduced-motion behaviour.

### Don't:

- **Don't** bring back the discarded Bebas Neue / IBM Plex Mono campaign identity.
- **Don't** introduce rounded cards, pill filters, broad HEAT backgrounds or decorative interface gradients.
- **Don't** turn the homepage's 62% / 38% split into a mandatory layout for every page.
- **Don't** stretch, redraw or crop away defining object anatomy.
- **Don't** substitute stock imagery or describe selected-work images as founder portraits.
- **Don't** present local brief preparation or the object bag as completed server submission, payment or inventory.
