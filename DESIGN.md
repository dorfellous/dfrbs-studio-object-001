---
name: DFRBS Studio
description: A black and chrome fashion campaign for sculptural physical objects.
colors:
  page: "#020202"
  ink: "#f4f4f1"
  muted: "#9b9b99"
  hairline: "rgba(255, 255, 255, 0.18)"
  accent: "#ff3159"
  accent-black: "#f1f1ee"
  accent-pearl: "#d9e0e3"
  accent-studio: "#ff0f69"
  film-surface: "#090909"
  drawer-surface: "#0a0a0a"
  collection-black: "#101010"
  collection-pearl: "#1b1c1d"
  collection-heat: "#121212"
  swatch-black: "#151515"
  swatch-heat-orange: "#fc7a24"
  purchase-surface: "#f4f4f0"
  purchase-ink: "#090909"
typography:
  display:
    fontFamily: "Bebas Neue, Arial Narrow, sans-serif"
    fontSize: "clamp(140px, 19vw, 320px)"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "-.018em"
  headline:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(110px, 14vw, 220px)"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "-.015em"
  body:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    letterSpacing: ".06em"
rounded:
  swatch: "50%"
spacing:
  gutter: "clamp(24px, 4vw, 72px)"
  gutter-mobile: "20px"
  campaign-section: "100px"
  campaign-section-mobile: "64px"
components:
  purchase-button:
    backgroundColor: "{colors.purchase-surface}"
    textColor: "{colors.purchase-ink}"
    padding: "20px 22px"
  purchase-button-added:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.purchase-ink}"
  product-drawer:
    backgroundColor: "{colors.drawer-surface}"
    textColor: "{colors.ink}"
    width: "min(100%, 570px)"
    padding: "44px 36px 28px"
---

# Design System: DFRBS Studio

## Overview

**Creative North Star: "Sculptural fashion campaign"**

Full-bleed supplied photography, chrome reflections, oversized condensed titles and small monospaced captions establish the identity. Objects occupy substantial space; navigation and purchasing controls remain restrained and legible. The studio retains its approved office hero, two-line title, manifesto and boardroom composition.

This document records `src/styles.css` with the later `src/campaign.css` refinements, plus the interaction and imagery constraints in `src/App.jsx` and `AGENTS.md`.

## Colors

The page, film, drawer and collection surfaces form a near-black tonal range. Warm white is primary text; muted gray supports metadata. Hairlines divide sections and states. Chrome comes from the supplied imagery rather than a decorative interface gradient.

The active accent changes with BLACK, PEARL or HEAT; the studio uses its established hot pink. HEAT swatches combine orange and pink. Eyewear collection surfaces use the frontmatter colors; the lighter retains its black (`#111`) and subtly warm HEAT (`#130f10`) card surfaces.

**The Restrained Heat Rule.** Orange-to-pink belongs to the product and small swatches, underlines, focus outlines or active controls. Keep large backgrounds neutral.

## Typography

Bundle Bebas Neue at weight 400 and IBM Plex Mono at weights 400 and 500. Condensed display type supplies scale and tension; mono type supplies navigation, numbers, copy and labels. Use the supplied wordmark image.

- Product heroes use the display token. On mobile, titles scale to `clamp(82px, 23vw, 164px)` and remain on one line.
- Specimen colorway headings use the headline token. Film type uses `clamp(88px, 9.8vw, 160px)`, line-height `.84`; eyewear detail headings use `clamp(96px, 10vw, 170px)`.
- Studio hero type retains `clamp(150px, 17vw, 286px)` and line-height `.72`; its mobile title remains two lines.
- Mono body copy is generally 10–12px with generous line-height (1.75–1.9). Hero introductions cap at 58 characters per line on desktop and 42 on mobile. Labels and numbers generally use 8–13px; stronger drawer copy uses weight 500.

**The Type Hierarchy Rule.** Give object names and campaign language the largest type. Keep explanatory copy compact and clearly separated from imagery.

## Layout

The opening is a viewport-height portrait film with the wordmark above three numbered destinations. Product pages progress through the photograph hero, bottom colorway dock, specimen/campaign, film for eyewear, object detail, collection, object index and footer. Studio uses its established editorial sequence.

Product sections share the fluid gutter token and broad vertical spacing. Studio and legacy index/footer gutters retain `clamp(28px, 4vw, 72px)`. Product heroes use `100svh`, constrained to 760–1200px on desktop and 700–1000px on mobile. The eyewear specimen is an overlapping composition with heading at upper left, campaign photograph at upper right and a complete cutout across the center.

Desktop film layout has title, portrait player and metadata columns; preserve the player's `512 / 910` aspect ratio. Eyewear detail uses two main columns and a full-width facts row. Collection and object index each use three columns.

| Breakpoint | Implemented behavior |
| --- | --- |
| At or below 1100px | Film becomes two columns; detail gaps tighten and the detail heading uses `clamp(72px, 9vw, 110px)`; collection's selected text hides at intermediate widths. |
| At or below 1000px | Studio manifesto gutters narrow; disciplines wrap; lighter/detail and footer grids adapt. |
| At or below 720px | Gutter becomes 20px; desktop navigation yields to the menu. Product object navigation stays visible below the header. Film, collection and index stack; selected collection text returns; details become vertical; the drawer fills the width. |

Mobile specimen height is 670px. The menu uses full-width numbered rows, large display names and compact mono section links. Layout supports a minimum body width of 320px.

## Elevation & Depth

Depth comes from photography, overlapping product cutouts, dark overlays and tonal surfaces. Floating cutouts use a dark drop shadow: eyewear (`0 28px 34px rgba(0,0,0,.72)`) and lighter (`0 30px 36px rgba(0,0,0,.72)`). The drawer sits above a 72% black backdrop. Cards remain flat; selected index cards have a 2px inset accent underline.

## Shapes

Interface surfaces, cards and buttons have square corners and fine straight borders. Circular exceptions are the 10px color swatches and bag-count badge. Product geometry supplies the organic curves.

**The Complete Silhouette Rule.** Product cutouts use `object-fit: contain`. Preserve the eyewear's narrow bridge, transparent openings and four convex lenses, and the lighter's top ignition assembly, open base and four front pods. Keep the shared eyewear canvas and matte-free transparent edges.

## Components

- **Navigation:** Supplied wordmark, compact mono links, numbered object switcher and bag/menu icons. Active pages use an underline and `aria-current`. The bottom object index repeats the destinations through imagery and large display names.
- **Colorway controls:** BLACK / PEARL / HEAT combine real swatches, text and an accent underline. Radio groups use one tab stop, arrow-key cycling and Home/End selection. Collection cards expose pressed state and an explicit selected label where space allows.
- **Actions:** Exploration and detail actions use transparent backgrounds, a bottom rule and an arrow. Purchase uses the pale full-width button, then the current accent for confirmation. Most navigation, colorway, film and close controls have 44px minimum targets; the persistent mobile object row uses 42px. Purchase has a 58px minimum height.
- **Film:** Muted autoplay, looping and inline portrait playback with poster fallback. Visible pause/play and sound controls remain available over the film; sound exposes pressed state.
- **Dialogs:** Menu and product drawer focus the close control, trap Tab/Shift+Tab, close with Escape and restore prior connected focus. Background branches become inert and page scrolling is locked. Addition feedback uses a polite live status.
- **Focus:** Buttons and links use a 2px current-accent outline with 4px offset; collection outlines sit inside their cards. Product and studio pages include a focus-visible skip link.
- **Motion:** Specimen changes reveal brightness over 700ms; the drawer arrives from 32px to the right over 380ms. Both use `cubic-bezier(.16,1,.3,1)`. Arrows move 6px over 280ms; card images scale subtly. Opening wordmark and destinations reveal in sequence. Reduced motion removes specimen/drawer animation, minimizes other transitions and reveals, and uses immediate scrolling. Product campaign content remains readable without a reveal animation.

## Do's and Don'ts

- **Do** reuse the supplied DFRBS wordmark, campaign photographs, films and accurate transparent product assets.
- **Do** retain strong display/mono contrast, neutral surfaces, visible numbered destinations and complete product silhouettes.
- **Do** preserve keyboard selection, visible focus, dialog behavior, film controls and reduced-motion support when extending the interface.
- **Don't** introduce broad colored backgrounds, generic fashion imagery or rounded interface cards.
- **Don't** stretch, redraw, merge lenses or crop away defining product anatomy to fill a layout slot.
- **Don't** replace the approved studio composition or add invented product claims, availability states or payment flows.
