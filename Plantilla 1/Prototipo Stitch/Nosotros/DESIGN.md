---
name: Academic Prestige
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d9e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#44474d'
  inverse-surface: '#273143'
  inverse-on-surface: '#ecf0ff'
  outline: '#75777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4d5f7d'
  primary: '#000615'
  on-primary: '#ffffff'
  primary-container: '#0b1f3a'
  on-primary-container: '#7587a7'
  inverse-primary: '#b5c7ea'
  secondary: '#0050d7'
  on-secondary: '#ffffff'
  secondary-container: '#2a69fa'
  on-secondary-container: '#fefcff'
  tertiary: '#0a0500'
  on-tertiary: '#ffffff'
  tertiary-container: '#2b1c00'
  on-tertiary-container: '#a9802a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b5c7ea'
  on-primary-fixed: '#071c36'
  on-primary-fixed-variant: '#364764'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003da9'
  tertiary-fixed: '#ffdea6'
  tertiary-fixed-dim: '#f0bf64'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d9e3fb'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  stat-counter:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 52px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system establishes an aura of institutional authority, intellectual rigor, and premium methodology for thesis advisory and academic consulting. It serves ambitious undergraduate, master's, and doctoral candidates facing high-stakes graduation requirements across Peru's leading universities.

The aesthetic fuses modern academic corporate architecture with refined editorial minimalism:
- **Authority over Trendiness:** Structural precision, measured alignments, and disciplined spacing inspire trust, scholarly seriousness, and institutional security.
- **Distinguished Excellence:** Deep Navy establishes solemn credibility, balanced by a sharp Professional Blue for operational efficiency and a restrained Warm Gold accent reserved strictly for milestones, high honors, and quality assurances.
- **Cognitive Clarity:** Dense academic pathways, scientific methodologies, and multi-tier thesis stages are presented with calm, unhurried negative space and crisp typographic contrast.

## Colors

The palette is tuned specifically for light-mode clarity, clean paper metaphors, and authoritative academic presentation.

- **Primary Deep Navy (`#0B1F3A`):** The foundational tone. Applied to major display headers, locked navigation structures, formal card surfaces, and core brand anchoring.
- **Secondary Professional Blue (`#155EEF`):** The functional engine. Governs primary calls-to-action, text links, active navigation items, progress steppers, and interactive focus states.
- **Tertiary Gold Accent (`#D6A84F`):** Used selectively for verification seals, graduation capstone highlights, distinction badges, and five-star rating emblems. Never applied to bulk UI containers.
- **Light Blue Canvas Tint (`#EAF2FF`):** Tinted foundational backing for badge pills, subtle card highlights, table header bands, and hovered list rows.
- **Neutral Charcoal Gray (`#667085`):** Structural supporting tone for body narrative, academic footnotes, secondary metadata, and icon strokes.
- **Surface Gray (`#F8FAFC`):** Soft foundational backdrops to break large sections from stark white while sustaining clean reading conditions.
- **Pure White (`#FFFFFF`):** Base canvas for cards, editorial content sheets, and elevated modals.

## Typography

The pairing combines the geometric confidence of Plus Jakarta Sans for structural navigation, numbers, and headlines with the clinical, neutral readability of Inter for dense research plans, requirements, and narrative text.

- **Headline Hierarchy:** Headers use tight tracking (-0.02em) to enforce authority and eliminate visual drift in large titles.
- **Body Layout:** Set with comfortable line heights (1.5x to 1.55x) to accommodate Spanish syntactic phrasing and academic nomenclature.
- **Numbers & Metrics:** Statistics, graduation rates, and step indexes are formatted in Plus Jakarta Sans with bold weights to create sharp optical anchor points across long advisory overviews.

## Layout & Spacing

A 12-column responsive fluid grid anchored by a maximum content container width of 1280px ensures readability on ultra-wide desktop monitors without sacrificing compact density.

- **Breakpoints:**
  - Mobile: `< 768px` (4-column grid, 16px margins, 16px gutters)
  - Tablet: `768px - 1024px` (8-column grid, 24px margins, 20px gutters)
  - Desktop: `> 1024px` (12-column grid, 32px margins, 24px gutters, max-width 1280px)
- **Vertical Rhythm:** Macro-sections utilize `space-2xl` padding to allow institutional propositions and research tracks room to breathe. Components inside cards adhere strictly to an 8px modular baseline (`space-xs` through `space-xl`).

## Elevation & Depth

Visual hierarchy uses a refined hybrid of crisp 1px borders and soft, low-opacity ambient shadows tinted with Deep Navy (`#0B1F3A`).

- **Surface Layer 0 (Canvas):** Pure `#FFFFFF` or `#F8FAFC` depending on section alternating rhythm.
- **Surface Layer 1 (Standard Card / Tile):** Pure `#FFFFFF` resting on a 1px border colored `#E4E7EC`. Shadow: `0 1px 3px 0 rgba(11, 31, 58, 0.05)`.
- **Surface Layer 2 (Interactive Hover / Floating Elements):** Border transitions to `#155EEF` or `#D0D5DD`. Shadow lifts to `0 12px 24px -4px rgba(11, 31, 58, 0.08), 0 4px 8px -2px rgba(11, 31, 58, 0.04)`.
- **Layer 3 (Modals, Sticky Bars, Dropdowns):** Shadow: `0 20px 32px -6px rgba(11, 31, 58, 0.12), 0 8px 16px -4px rgba(11, 31, 58, 0.06)` with crisp `#E4E7EC` perimeter boundary.
- **Rule of Restraint:** Heavy drop shadows, saturated glow fills, and bright neon gradients are strictly prohibited.

## Shapes

The geometric personality aligns to Level 1 (`Soft`), providing institutional gravitas while remaining modern and approachable.

- **Standard Elements (Cards, Text Inputs, Modals):** Radii set to `0.5rem` (`8px`) to produce neat, squared structural anchors.
- **Small Controls (Buttons, Form Selectors, Dropdown Menus):** Radii set to `0.375rem` (`6px`) for clean, precise clickable areas.
- **Status Pills and Badges:** Fully rounded capsule styling (`9999px`) to create clear differentiation between actionable square components and static informational tags.
- **Dividers:** 1px hairline rules using `#E4E7EC` for horizontal rhythm across content segments.

## Components

### Buttons
- **Primary Action:** Solid `#155EEF` fill, `#FFFFFF` text, `0.375rem` border radius, padding `12px 24px`, font `label-md`. Hover state shifts fill to `#1047B8` with an ambient shadow boost.
- **Secondary Authority:** Transparent background, 1.5px solid border `#0B1F3A`, text `#0B1F3A`, `0.375rem` radius. Hover fills with `#0B1F3A` and changes text to `#FFFFFF`.
- **Ghost/Tertiary:** No border, text `#155EEF` with trailing directional arrow icon. Underline on hover.

### Badges & Chips
- **Academic Distinction / Verified:** Capsule shape, background `#FFF9EB`, border 1px solid `#F3D896`, text `#975B00` accompanied by a micro Gold (`#D6A84F`) star or laurel icon.
- **Degree Tier (Pregrado / Maestría / Doctorado):** Capsule shape, background `#EAF2FF`, border 1px solid `#C2DAFF`, text `#155EEF`, font `label-sm`.

### Statistic Cards
- White `#FFFFFF` background, 1px solid `#E4E7EC`, padding `24px`.
- Large metric displayed in `stat-counter` using `#0B1F3A`.
- 2px accent rule in `#D6A84F` under the numeric metric.
- Label description beneath in `body-sm` using `#667085`.

### Input Fields & Forms
- Height `48px`, background `#FFFFFF`, border 1px solid `#D0D5DD`, radius `0.375rem`, text `#0B1F3A`, placeholder `#98A2B3`.
- Focus state: Border color shifts to `#155EEF` with a `0 0 0 3px rgba(21, 94, 239, 0.14)` focus ring.

### Locked Navigation Bar
- Fixed at top (`z-index: 1000`), height `76px`, background `#0B1F3A` with a subtle bottom hairline border `#1D3557`.
- Left: Brand lockup with crisp academic emblem and clean wordmark in pure `#FFFFFF`.
- Center: Links in `label-md` with color `#EAF2FF` hovering to `#D6A84F`.
- Right: Quick contact trigger and solid "Diagnóstico de Tesis" button in `#155EEF`.

### Locked Footer
- Deep institutional baseline with `#0B1F3A` background and `#061224` sub-footer copyright row.
- Content structured into 4 disciplined columns: Academic Faculty Coverage, Thesis Services & Methodologies, Regulatory Compliance (SUNEDU-oriented quality criteria), and Official Legal Data (RUC, Peruvian consumer book link).
- Footnote links in Inter `body-sm` with color `#98A2B3`, moving to `#FFFFFF` on hover.

### Floating WhatsApp Advisory Trigger
- Locked to bottom-right (`bottom: 24px`, `right: 24px`, `z-index: 999`).
- Outer circle diameter `60px`, vibrant WhatsApp green `#25D366` with `#FFFFFF` glyph.
- Ambient drop shadow: `0 8px 24px rgba(0, 0, 0, 0.18)`.
- Paired with an optional dismissible white pill prompt: "Asesoría en línea disponible", font `label-sm`, color `#0B1F3A`, border 1px solid `#E4E7EC`.