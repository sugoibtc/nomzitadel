# NoM Zitadel — Design Guide

> This is the implementation source of truth. Update this file when design decisions change, then instruct Claude to implement the changes.

---

## 1. Color System

The palette follows a **60 / 30 / 10 rule**:

| Tier | % | Purpose |
|---|---|---|
| Neutral (Black/White) | 60% | Backgrounds, surfaces, typography |
| Secondary Greens | 30% | Depth, borders, subtle highlights |
| Neon Green (Brand) | 10% | CTAs, badges, key interactive elements |

---

### 60% — Neutral Foundation

| Token | Value | Role |
|---|---|---|
| `bg` | `#000000` | App / page background |
| `card` | `#0A0A0A` | Elevated surfaces (cards, modals) |
| White | `#FFFFFF` | Headings, titles, primary text |
| `text-dim` | `rgba(255,255,255,0.70)` / `#ffffffb3` | Paragraphs, secondary copy |

**Rules:**
- All page backgrounds use `bg`.
- Any elevated surface (card, panel, dropdown) uses `card`.
- Headings and titles are always pure white.
- Body copy and secondary labels always use `text-dim`.

---

### 30% — Secondary (Depth & Subtle Highlights)

| Token | Value | Role |
|---|---|---|
| `neon-green` low opacity | `#6CEF4B` at 5–20% | Cyber-grid lines, card borders, glow shadows |
| `jade` | `#1C7C54` | Deeper gradient layers, glassmorphism depth |
| `mint` | `#73E2A7` | Secondary accents, positive/success indicators |
| `pistachio` | `#DEF4C6` | Supporting accent text, illustration highlights |
| White low opacity | `rgba(255,255,255,0.05–0.10)` | Neutral card borders (e.g. Community section) |

**Rules:**
- `neon-green` at low opacity (`/10` to `/20`) is used for borders, card backgrounds, and box-shadows — never as a fill at full opacity in this tier.
- `jade` is used within gradients and deep layered backgrounds only — not as a standalone fill.
- `mint` and `pistachio` are reserved for secondary elements and illustrations that support the brand color without competing with it.
- Neutral white borders (`rgba(255,255,255,0.05–0.10)`) are used on cards where a green tint would feel out of place (community cards, neutral info surfaces).

---

### 10% — Accent (Brand)

| Token | Value | Role |
|---|---|---|
| `neon-green` | `#6CEF4B` | Primary CTAs, active states, badges, key hooks |

**Rules:**
- Use `neon-green` at full opacity **only** for elements that need to draw the eye: CTA buttons, active nav indicators, badge labels, highlighted text/spans.
- Never use neon-green as a large fill (e.g. section background). It should always feel like a signal, not a surface.
- Glow effects on neon-green elements: `box-shadow: 0 0 20px rgba(108,239,75,0.4)` on hover.
- Text glow: `text-shadow: 0 0 10px rgba(108,239,75,0.3)`.

---

## 2. Typography

**Font:** Satoshi (loaded via Fontshare)

### Type Scale

| Level | Size | Usage |
|---|---|---|
| `h1` | 3.815rem (~61px) | Hero headlines only |
| `h2` | 3.052rem (~49px) | Section titles |
| `h3` | 2.441rem (~39px) | Sub-section titles |
| `h4` | 1.953rem (~31px) | Card headings, feature titles |
| `h5` | 1.563rem (~25px) | Labels, smaller feature titles |
| `h6` | 1.25rem (~20px) | Captions, overline text |
| Body | 1rem (16px) | Paragraph text |
| Small | 0.875rem (14px) | Helper text, metadata |

**Rules:**
- All headings (`h1`–`h6`) are white (`#FFFFFF`) with `letter-spacing: -0.02em`.
- Body text uses `text-dim` (`rgba(255,255,255,0.70)`).
- Font weight: 400 (body), 500 (labels/sub), 700 (headings/CTAs), 900 (hero h1 only).
- Line height: `leading-tight` (1.25) for headings, `leading-relaxed` (1.625) for body.

---

## 3. Spacing & Layout

*(To be defined — Phase 2)*

---

## 4. Component Library

*(To be defined — Phase 2)*

### Button Variants (Draft)

| Variant | Style | Usage |
|---|---|---|
| Primary | `bg-neon-green text-bg font-bold` | Main CTA — one per section max |
| Secondary | `border border-white/20 text-white` | Supporting action |
| Ghost | `text-neon-green` (no border/bg) | Tertiary action, inline links |

**States for all buttons:** default → hover (lift + glow) → active → disabled (50% opacity).

---

## 5. Elevation & Surfaces

| Layer | Style | Usage |
|---|---|---|
| Page | `bg-bg` (#000) | Base canvas |
| Card | `bg-card` (#0A0A0A) + `border border-neon-green/10` | Standard content cards |
| Elevated card | `bg-card` + `border border-neon-green/20` + `shadow-[0_0_15px_rgba(108,239,75,0.1)]` | Featured/highlighted cards |
| Cyber-grid | `cyber-grid` utility | Hero sections, accent backgrounds |
| Glass | `bg-white/5 backdrop-blur-sm border border-white/10` | Neutral surfaces (community, info) |

---

## 6. Motion Principles

*(To be defined — Phase 2)*

**Established patterns (already in use):**
- Hover translate: `hover:-translate-y-1` on primary buttons
- Glow on hover: `hover:shadow-[0_0_20px_rgba(108,239,75,0.4)]`
- Transition: `transition-all` (200ms ease default)
- Background animations: `curves-shift` (20s), `momentum-drift` (45s), `particles-pulse` (8s)

---

## 7. Iconography

*(To be defined — Phase 2)*

**Current pattern:** Inline SVG, stroke icons, `stroke-width="2"`, sized at `w-4 h-4` to `w-6 h-6`.

---

## Changelog

| Date | Change |
|---|---|
| 2026-03-16 | Initial design guide created — Color system + Typography |
