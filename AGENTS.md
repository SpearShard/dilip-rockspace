<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## RockSpace — Mobbin × Aceternity Polish

**Stack**: Next.js 16.2.7 / Tailwind v4 / GSAP 3.15 + @gsap/react + ScrollTrigger / Framer Motion / Lenis / shadcn/ui / React Bits (SplitText patch) / R3F + drei

**Color System**: White bg (Under25-inspired)
- `--bg: #FFFFFF` (body background)
- `--surface: #F8F7F4` (alternate section bg)
- `--text: #1C1816` (primary text)
- `--text-muted: #6B6560` (secondary)
- `--text-tertiary: #B0A9A3` (tertiary)
- `--accent: #D96C4A` (terracotta)
- `--accent-dark: #E8B84B` (gold)
- `--border: #E8E3DE` (subtle borders)
- `--font-display: Fraunces` (serif display)
- `--font-body: DM Sans` (sans body)
- `--font-mono: JetBrains Mono` (code/meta)

### Build Status
- `bun run build` → ~4s, zero errors, zero CSS warnings
- `bun run lint` → zero errors, zero warnings

### Section Order (page.tsx)
1. **Nav** — Light glassmorphism bar, rockspace.png logo only (no text), centered links, "Reach out" CTA
2. **Hero** — fulllogo.png centered in max-w-7xl rounded-3xl container, full viewport height, GSAP entrance
3. **Team** — Vertical name list left + photo/description right, AnimatePresence transitions, 3D wireframe scene
4. **Story** — 3-beat timeline (01/02/03), italic pull quote, morphing icosahedron scene
5. **Services** — 6-card bento grid, card-hover effects, category tags
6. **Process** — 4-phase card grid (Listen → Shape → Build → Ship & Grow), dual ring scene
7. **Contact** — Single heading + CTA buttons + 3D dot field + built-in footer below

### Key Features
- **Lenis**: duration 0.8, cubic easing, wheelMultiplier 0.8, touchMultiplier 1.0, GSAP ticker integration with lagSmoothing(0)
- **Three.js**: 5 scenes via R3F + drei, all dynamically imported with IntersectionObserver-based SceneGate lazy mounting (200% rootMargin)
  - HeroScene: torus knot + 1200-particle field
  - StoryScene: morphing icosahedron wireframe
  - ProcessScene: dual concentric torus rings
  - TeamScene: wireframe octahedron (3 persona colors)
  - ContactScene: 300-particle dot field
- **GSAP scroll-triggered animations** on all sections (fade + slide, directional reveals)
- **Framer Motion**: AnimatePresence only for Team panel transitions
- **Card-hover utility**: `.card-hover` class — subtle translateY shadow + border-color transition (Aceternity-style)
- **Section-titles**: `section-title` class with Fraunces display, tight tracking, clean hierarchy
- **Mobbin spacing**: Generous padding (py-24 md:py-32), large headings, clean margins
- **Reduced motion**: All GPU effects disabled on touch devices and `prefers-reduced-motion: reduce`
- **SceneGate**: IntersectionObserver-based wrapper that only mounts children when in/near viewport — prevents unloaded Three.js from blocking page render

### Component Structure
```
app/
  globals.css              — Light white color system, Tailwind v4 theme, card-hover/section-title utilities, shadcn CSS vars
  layout.tsx               — Fraunces + DM Sans + JetBrains Mono fonts, LenisProvider
  page.tsx                 — 7-section composition
components/
  LenisProvider.tsx         — Lenis smooth scroll + GSAP ticker
  Nav.tsx                   — rockspace.png logo, glassmorphism, centered links, Reach out CTA
  Hero.tsx                  — fulllogo.png in max-w-7xl rounded-3xl container, GSAP entrance
  Team.tsx                  — Tab switcher (vertical on desktop, horizontal on mobile), AnimatePresence, tilt card, 3D scene bg
  Story.tsx                 — 3-beat numbered timeline, pull quote, 3D scene bg
  Services.tsx              — 6-card grid, card-hover, category tags
  Process.tsx               — 4-phase card grid, 3D scene bg
  Contact.tsx               — CTA heading + buttons + 3D scene + integrated footer
  SplitText.tsx             — Character-split scroll-reveal (kept for potential use)
  scene/
    FloatingGeometry.tsx     — Torus knot with mouse-reactive rotation
    ParticleField.tsx        — 1200-particle starfield
    HeroScene.tsx            — R3F Canvas wrapper for Hero 3D
    StoryScene.tsx           — Morphing icosahedron wireframe
    ProcessScene.tsx         — Dual torus rings
    TeamScene.tsx            — Octahedron wireframe, persona-based colors
    ContactScene.tsx         — 300-particle field
  ui/
    button.tsx, badge.tsx, dialog.tsx, sheet.tsx, tabs.tsx — shadcn/ui primitives
    spotlight.tsx, background-beams.tsx — kept for potential use
lib/
  gsap.ts                   — GSAP + ScrollTrigger registration
  utils.ts                  — cn() utility
  projectData.ts            — TeamMember + Project data
  useInView.tsx             — SceneGate component (IntersectionObserver lazy mount for Three.js canvases)
```

### Key CSS Utilities (globals.css)
- `.card-hover` — transform + shadow + border-color transition on hover (Aceternity-inspired)
- `.section-title` — Fraunces display, thin weight, tight tracking, text/text-muted color
- `contain: layout style paint` on section wrappers

### Design Principles (Mobbin × Aceternity)
1. **Whitespace is a feature** — generous padding, loose layouts, breathing room
2. **Typography first** — Fraunces for display impact, DM Sans for readability, minimal decoration
3. **Subtle hierarchy** — muted meta labels (font-mono, uppercase, tiny), bold section titles
4. **Card polish** — card-hover class with lift + shadow + border tint
5. **No decorative fluff** — no text-gradient, glow-pulse, shimmer, corner brackets, or custom cursor
6. **Raw copy** — human-sounding language, no marketing speak

### File Conventions
- All components use `'use client'` for GSAP/R3F interactions
- Dynamic imports for all Three.js scenes (`ssr: false`)
- `SceneGate` wraps all `<canvas>` elements
- Reduced-motion: `useState` with lazy initializer checking `matchMedia`
- Section ids match nav anchor links
- Footer is part of Contact component
