<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## RockSpace — Peak Rebuild Complete

**Stack**: Next.js 16.2.7 / Tailwind v4 / GSAP 3.15 + @gsap/react + ScrollTrigger / Framer Motion / Lenis / shadcn/ui / React Bits (SplitText patch) / Aceternity-style (Spotlight, BackgroundBeams)

### Build Status
- `bun run build` → 2.4s, zero errors
- `bun run lint` → zero errors, zero warnings

### File Structure
```
app/
  globals.css          — Cream/purple palette + marquee keyframes + shadcn CSS vars + text-gradient + glow-pulse classes
  layout.tsx           — Geist + JetBrains Mono fonts, LenisProvider wrapper
  page.tsx             — 8-section composition (Nav → Hero → Story → Services → Work → Process → Team → Contact)
components/
  LenisProvider.tsx    — Lenis smooth scroll + GSAP ticker integration
  Nav.tsx              — GSAP scroll hide/show, underline hover, mobile overlay
  Hero.tsx             — 3D Three.js scene (torus knot + particle field), narrative "classmates" headline, GSAP 6-step timeline, magnetic button, word-split stagger
  Story.tsx            — Origin narrative (3 scroll-triggered beats), 3D morphing icosahedron scene, GSAP scrub reveal cards
  Services.tsx         — GSAP stagger cards, radial gradient hover, gradient background wash
  Process.tsx          — GSAP stagger cards with rotateX, number counter animation, 3D floating ring scene, gradient background
  Work.tsx             — GSAP stagger grid, radial hover, filter pills (no brackets), AnimatePresence, gradient overlay
  Team.tsx             — Perspective tilt card, pill-tab switcher, 3D wireframe octahedron scene, gradient avatar bg, corrected roles
  Contact.tsx          — BackgroundBeams canvas + 3D dot field scene, GSAP heading parallax, gradient text CTA, glow-pulse
  SplitText.tsx        — Character-split scroll-reveal with useGSAP (no paid plugins)
  scene/
    FloatingGeometry.tsx — Three.js torus knot with mouse-reactive rotation, color-cycling MeshDistortMaterial
    ParticleField.tsx   — 1200-particle starfield with seeded random, orbital rotation
    HeroScene.tsx       — R3F Canvas with Float wrapper, environment, lights
    StoryScene.tsx      — Morphing icosahedron wireframe with vertex displacement
    ProcessScene.tsx    — Dual concentric torus rings with drift animation
    TeamScene.tsx       — Wireframe octahedron gem floating animation
    ContactScene.tsx    — 300-particle dot field with slow rotation
ui/
    spotlight.tsx       — Cursor-follow radial gradient glow
    background-beams.tsx — Canvas particle lines with hue movement
    button.tsx, badge.tsx, dialog.tsx, sheet.tsx, tabs.tsx — shadcn/ui primitives
lib/
  gsap.ts              — Centralized GSAP + ScrollTrigger registration
  utils.ts             — cn() utility (clsx + tailwind-merge)
  projectData.ts       — Project + TeamMember data (corrected roles, shortened descriptions)
```

### Key Features
- **GSAP Timeline** on Hero entry (4-step stagger: label → headline → description → CTAs)
- **Proper Counter** animation (`gsap.to` with `onUpdate`, `Math.round`, `tabular-nums`)
- **Marquee strip** at bottom of Hero (GSAP `x: '-50%'` infinite loop)
- **Magnetic button** on primary CTA (GSAP `elastic.out` on hover leave)
- **Lenis smooth scroll** with GSAP ticker integration
- **SplitText** character-by-character scroll reveal on headline
- **SVG connecting line** draw animation between Process phases
- **Radial gradient hover** on Services and Work cards
- **Perspective tilt** on Team avatar card
- **BackgroundBeams** canvas in Contact section
- **Touch/reduced-motion guards** on all GPU-heavy effects

### Team (Corrected)
1. **Debasis Maharana** — Founder & Creative Director
2. **G. Jayaditya** — Technical Lead (Frontend)
3. **Dilip** — AI & Automation Polymath

### Key Constraints
- Cream (#FAF8F5) + light purple (#A78BFA) + deep purple (#7C3AED) + warm amber (#FF8A65) spot accent
- No `//` brackets, no custom cursor
- Google Meet CTA in Hero and Contact
- Pill-shaped buttons, rounded-2xl cards, backdrop-blur-xl nav
- GSAP: scroll-scrubbed + timeline sequences + SVG draw + counters + stagger
- Framer Motion: minimal — AnimatePresence for filter/layout transitions only
- All GPU effects disabled on touch devices and `prefers-reduced-motion: reduce`
- shadcn `:root` CSS variables overridden to match cream/purple palette

### Nav — "Rock" Theme
- Dark (`#0A0A14`) glassmorphism, solid grounded feel, white/cream text
- Logo with subtle glow ring, "RockSpace" wordmark (Rock solid / Space muted)
- Border-based CTA button, underline hover on links

### Footer — "Space" Theme  
- Full dark gradient footer (`transparent → #0A0A14`), CSS radial-gradient stars
- Top edge glow line, 3-column layout (brand / navigate / connect)
- Muted white text, coordinate display, ∞ symbol

### Process — Visual Flow  
- Icon-based animated nodes (🔍 → 🧭 → 🎨 → 🚀) with bounce-in rotation
- SVG dashed gradient line drawn on scroll (scrub: 1.5)
- Color-coded phases with hover scale, centered vertical layout on desktop
