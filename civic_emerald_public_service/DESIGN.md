---
name: Civic Emerald Public Service
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3f4944'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6f7973'
  outline-variant: '#bec9c2'
  surface-tint: '#1b6b51'
  primary: '#004532'
  on-primary: '#ffffff'
  primary-container: '#065f46'
  on-primary-container: '#8bd6b7'
  inverse-primary: '#8bd6b6'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#5e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#804300'
  on-tertiary-container: '#ffb87e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6f2d1'
  primary-fixed-dim: '#8bd6b6'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#00513b'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative, accessible, and structured digital framework tailored specifically for municipal governance under Dinas Perumahan dan Kawasan Permukiman (Disperkim) Kota Samarinda. The visual posture conveys institutional transparency, civic competence, and structural order, balancing regulatory authority with citizen-facing clarity.

The aesthetic follows an institutional Corporate-Modern approach:
- High typographic legibility prioritizing clear hierarchy for all demographic groups and civic field officers.
- Crisp structural lines and intentional boundary definition, avoiding ambiguous floating cards or overly soft consumer app motifs.
- Institutional dignity anchored by regional forest and riverine green tones paired with formal government slate and formal civic badges.
- Kiosk-ready affordances: clear tap states, high contrast ratios (WCAG AAA for critical body text), and non-decorative functional layouts suited for civic portals, public kiosks, and internal department dashboards.

## Colors

The color palette reflects municipal responsibility, public land and housing integrity, and civic verification:

- **Primary (`#065F46` Samarinda Emerald Green)**: Anchors primary actions, institutional headers, active navigation states, and primary status indicators. Supported by `#047857` (hover/interactive) and `#10B981` (positive states / active verification highlights).
- **Secondary (`#1E293B` Civic Slate)**: Structural container backgrounds, division headers, table header fills, and high-order metadata containers.
- **Tertiary (`#D97706` / `#F59E0B` Official Amber/Gold)**: Reserved exclusively for official municipal seals, verification badges, urgent statutory advisories, and certified application status tags.
- **Neutral (`#0F172A` Deep Ink)**: The primary text color across light backgrounds, ensuring a contrast ratio exceeding 10:1. Neutral surface backgrounds scale from pure white (`#FFFFFF`) to cool stone grey (`#F8FAFC` and `#F1F5F9`) for strict visual separation.

### Divisional Coding
To support organizational workflows across Disperkim Kota Samarinda, subtle status accents are mapped systematically:
- **Sekretariat**: Civic Slate (`#334155`)
- **Bidang Perumahan**: Emerald Green (`#065F46`)
- **Bidang Kawasan Permukiman**: Deep Teal (`#0F766E`)
- **Bidang PSU (Prasarana, Sarana, & Utilitas Umum)**: Industrial Ochre (`#B45309`)

## Typography

The type scale combines the modern civic geometric presence of **Plus Jakarta Sans** for prominent headers with the rigorous, neutral, tabular-capable precision of **Inter** for form inputs, administrative records, and regulatory body text.

- Headings use tightened letter-spacing (`-0.02em` on `headline-xl` and `headline-lg`) to preserve spatial authority in government titles.
- Body copy adheres to standard tabular numerals (`tnum`) for monetary figures (APBD, bantuan bansos RTLH), asset square meters, and RT/RW residential identification.
- Labels are set in medium-to-bold weights with exact vertical alignment for multi-lingual or standardized Indonesian civil administration terms (e.g., NIK, Surat Keputusan, Berita Acara).

## Layout & Spacing

The layout is grounded on a disciplined 12-column responsive fluid grid designed for density, accessibility, and high data throughput:

- **Desktop (>= 1280px)**: 12 columns, `1.5rem` (24px) gutters, `2rem` (32px) outer margins, capped at a maximum layout width of 1440px to ensure wide-screen administrative utility.
- **Tablet / Kiosk (768px - 1279px)**: 8 columns, `1.25rem` (20px) gutters, `1.5rem` (24px) margins. Critical touch elements scale to a minimum tap height of 48px to accommodate both citizen touch kiosks and counter terminals.
- **Mobile (< 768px)**: 4 columns, `1rem` (16px) gutters, `1rem` (16px) margins. Lateral scrolling is strictly forbidden except within explicitly framed tabular data components.

Component spacing utilizes an 8-point baseline rhythm. `space-xs` (4px) and `space-sm` (8px) govern tight metadata badges and form grouping. `space-md` (16px) separates interactive elements, while `space-lg` (24px) and `space-xl` (40px) define section boundaries and legal declaration blocks.

## Elevation & Depth

This design system avoids decorative blurred drop shadows or skeuomorphic bevels, adhering instead to institutional clarity through **crisp low-contrast outlines** paired with subtle tonal layering:

- **Ground Level (Canvas)**: Background surface `#F8FAFC`.
- **Level 1 (Panels & Data Surfaces)**: `#FFFFFF` encased in a 1px border of `#E2E8F0`. No shadow is applied; boundary definition is purely structural.
- **Level 2 (Interactive Floating Elements, Dropdowns, Datepickers)**: `#FFFFFF` bordered with `#CBD5E1`, anchored by a shallow, restrained administrative shadow: `0px 4px 6px -1px rgba(15, 23, 42, 0.08), 0px 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modal Dialogs & Confirmation Overlays)**: `#FFFFFF` framed by `#94A3B8`, with backdrop scrim `rgba(15, 23, 42, 0.65)` ensuring total focus on legal acknowledgments or statutory submissions.
- **Focus Rings**: A crisp, high-contrast dual-ring (`2px solid #FFFFFF` inner ring with `2px solid #065F46` outer ring) for complete accessibility on both public kiosk touch interfaces and physical keyboard navigation.

## Shapes

The design system employs a **Soft (`1`)** shape language (`4px` base border radius, `8px` for containers, `12px` for major modal shells). 

Rounded forms are purposefully restrained to evoke official government documentation, civic certificates, and architectural precision:
- Standard interactive elements (buttons, inputs, dropdown triggers, table row selectors) use `4px` (`0.25rem`) corner rounding.
- Information panels, tabular cards, and dashboard metrics use `8px` (`0.5rem`).
- Pills (`9999px`) are strictly reserved for statutory status chips and division acronym badges to clearly distinguish non-clickable metadata from actionable interactive buttons.

## Components

### Buttons
- **Primary Button**: Solid Emerald `#065F46`, text `#FFFFFF`, 1px border `#047857`. Hover: `#047857`. Focus: 2px offset civic emerald ring. Minimum height: 44px (48px for kiosk displays).
- **Secondary Button**: Solid Civic Slate `#1E293B`, text `#FFFFFF`. Used for municipal exports, downloads, and record generation.
- **Tertiary / Outline Button**: Transparent fill, 1.5px border `#CBD5E1`, text `#0F172A`. Hover: `#F1F5F9`.
- **Destructive Button**: Solid `#DC2626`, text `#FFFFFF`. Used for archival, revocation of permits, or rejection of claims.

### Inputs & Form Controls
- **Text & Select Fields**: Minimum height 44px, 1px border `#CBD5E1`, background `#FFFFFF`, text `#0F172A`. Label placed above input in `label-md` weight 600. Active focus turns border `#065F46` with 3px `#065F4620` halo. Error state utilizes 1.5px `#DC2626` border accompanied by explicit error text.
- **Checkboxes & Radios**: 20px x 20px hit-boxes with 1.5px `#64748B` border. When checked: `#065F46` fill with pure white icons.

### Badges & Division Chips
- Badges use pill rounding (`rounded-full`), `space-xs` vertical padding, `space-sm` horizontal padding, with uppercase `label-sm` typography:
  - **Perumahan**: `#ECFDF5` background, `#065F46` text, `#A7F3D0` border.
  - **PSU**: `#FEF3C7` background, `#B45309` text, `#FDE68A` border.
  - **Kawasan Permukiman**: `#F0FDFA` background, `#0F766E` text, `#99F6E4` border.
  - **Sekretariat**: `#F1F5F9` background, `#334155` text, `#CBD5E1` border.
  - **Official Status (Verified/Sah)**: `#FEF9C3` background, `#854D0E` text with gold municipal seal icon.

### Data Tables
- Administrative tables are dense and structured:
  - Table header: `#F8FAFC` background with a distinct 2px bottom border `#CBD5E1`, text uppercase `label-sm` in `#475569`.
  - Rows: `#FFFFFF` alternating with subtle zebra `#FBFCFD`, bordered with 1px `#E2E8F0`. Hover row state: `#F0FDF4` (subtle emerald tint).
  - Row height: 48px baseline (expanded to 56px for tablet kiosk scanning).

### Cards & Information Containers
- White background (`#FFFFFF`), 1px solid border (`#E2E8F0`), 8px border radius. Cards do not use drop shadows. Header segments within cards are separated by a clean 1px border divider. Top-edge color bars (3px) in division colors indicate departmental ownership.