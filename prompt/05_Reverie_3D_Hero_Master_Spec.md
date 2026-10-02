# REVERIE --- Antigravity Master Build Specification

## 3D Luxury Watch Hero / Production-Quality Prototype V1.0

**Primary reference:**
https://dribbble.com/shots/27440082-A-3D-Luxury-Watch-Hero-Section\
**Brand:** REVERIE\
**Product:** Premium mechanical watches

## 0. Execution rule

Do not immediately generate random UI/code.

First inspect the repository, framework, entry points, styling system,
assets, existing homepage, package manager, build scripts, and current
runtime. Run the site. Inspect desktop and mobile in the browser. Check
console and terminal errors. Produce a short plan and asset-dependency
report, then implement in stages. After each major stage, run and
visually verify the site. Do not stop at "build passes"; the acceptance
condition is visual and interactive quality.

## 1. Reference interpretation

Use the supplied Dribbble shot as the primary reference for luxury mood,
simplicity, composition, 3D product prominence, dark environment,
restrained typography, negative space, scroll-driven feeling, transition
quality, and premium pacing.

Do not copy the exact brand, watch, text, assets, source code, or
distinctive artwork. Create an original Reverie experience.

## 2. Creative direction

The design statement is:

> A luxury product film wrapped inside an extremely simple ecommerce
> interface.

The watch is the visual event. Motion must have a purpose.

Avoid the "AI-generated website" look:

-   no random floating objects
-   no particles
-   no neon
-   no glowing rings
-   no excessive gradients
-   no glassmorphism
-   no excessive blur
-   no fake holograms
-   no giant animated words everywhere
-   no constantly spinning product
-   no excessive parallax
-   no random cards flying around
-   no decorative 3D objects
-   no excessive rounded UI
-   no generic dashboard components
-   no default browser styling

## 3. Technical stack

Preserve the existing project stack where reasonable.

Preferred:

-   React
-   TypeScript
-   Vite
-   Three.js
-   React Three Fiber if the project is React-based
-   @react-three/drei where useful
-   GSAP
-   GSAP ScrollTrigger
-   Lenis
-   GLB/glTF
-   Draco or Meshopt where appropriate
-   KTX2/Basis compressed textures where appropriate
-   modern CSS
-   semantic HTML

Do not add unnecessary frameworks or replace working architecture
without a concrete reason.

## 4. Hero composition

The first screen must feel like a luxury watch campaign.

Concept:

``` text
REVERIE                         COLLECTION  MENU


                    REAL 3D WATCH


        R01 — ORION
        AUTOMATIC MECHANICAL WATCH

                    ↓
              SCROLL TO EXPLORE
```

Desktop: - full viewport hero - watch roughly 55--75% of viewport height
depending on model proportions - product dominates - generous negative
space - copy is secondary

Mobile: - watch roughly 50--70% of viewport height - readable
typography - minimal navigation - no horizontal overflow

## 5. Real 3D requirement

Use a real `.glb`/`.gltf` model when available.

Preferred asset:

`/public/models/reverie-r01-orion.glb`

Do not fake 3D with PNGs, CSS shapes, SVG illustrations, gradients, or a
static image pretending to be 3D.

If the final GLB is absent: 1. Build the complete integration
architecture. 2. Use a clearly documented temporary placeholder only to
validate the scene. 3. Make replacing it with the final GLB a one-file
asset swap. 4. Report the missing final GLB as an external dependency.
5. Never pretend a placeholder is production quality.

## 6. R01 Orion model requirements

Ideally contain separate logical objects/materials for: - case - bezel -
lugs - crown - dial - hands - indices - crystal - caseback -
bracelet/strap - clasp - visible movement components if applicable

Normalize scale, center, rotation, and framing during loading so the
hero is not dependent on one exporter setup.

## 7. Three.js scene

Create a physically believable art-directed studio scene:

``` text
Scene
├── Environment / studio lighting
├── Key light
├── Fill light
├── Rim light
├── Optional subtle floor/reflection
├── Watch group
└── Camera
```

The goal is premium product photography translated into real-time 3D.

## 8. Lighting

Base tones:

``` text
#080808
#111111
#151515
#F4F1EA
#E9E5DC
#A5A29B
#6F6D68
#B89B63
```

Gold is only a tiny accent.

Lighting must reveal brushed metal, polished metal, crystal, dial
texture, bevels, bracelet edges, and case curvature.

Avoid flat lighting, blown highlights, plastic metal, excessive bloom,
neon, and fantasy lighting.

## 9. Camera

Use a perspective camera. Camera movement should feel like a real
product camera:

-   subtle orbit
-   dolly in/out
-   slight elevation
-   slight lateral movement
-   controlled framing
-   optional close-up

Avoid extreme movement, sudden perspective changes, uncontrolled zoom,
and camera shake.

## 10. Scroll film

Use a pinned hero approximately 400--550vh.

Starting structure:

``` text
0–15%   Arrival
15–35%  Product reveal
35–55%  Camera/product detail
55–75%  Mechanical/caseback reveal
75–90%  Product story
90–100% Transition to next section
```

These are starting points, not rigid values.

Use GSAP ScrollTrigger with scrubbed animation. Start around:

``` text
pin: true
scrub: 0.6–1.0
anticipatePin: 1
```

Tune through browser testing.

Do not over-smooth.

## 11. Animation storyboard

### Phase 1 --- Arrival

-   obsidian background
-   minimal navigation
-   watch slightly reduced and slightly low
-   understated copy
-   asset-aware loader
-   watch fades/scales into final position

### Phase 2 --- Hero lock

-   watch reaches primary composition
-   product copy remains minimal

Suggested copy:

``` text
REVERIE
R01 — ORION
AUTOMATIC MECHANICAL WATCH
EXPLORE
```

### Phase 3 --- Product movement

-   gradual rotation
-   subtle camera angle change
-   lighting reveals metal
-   restrained copy movement

Never make it look like a spinning ecommerce thumbnail.

### Phase 4 --- Detail reveal

Camera approaches: - dial - indices - hands - case finishing - crown -
crystal

Do not zoom so close that geometry breaks down.

### Phase 5 --- Mechanical reveal

If the model supports a visible movement: - turn toward caseback -
reveal mechanical details - subtle lighting - optional
craftsmanship/specification line

If the model does not contain a movement, do not invent one.

### Phase 6 --- Exit

-   watch scales/moves naturally
-   product information transitions
-   pinned hero releases
-   next section enters smoothly

No giant title explosion.

## 12. GSAP architecture

Use one readable master timeline where practical, with labels for
phases.

Control: - watch position - watch rotation - watch scale - camera
position/target - lighting intensity - copy opacity/position -
next-section transition

Use `gsap.matchMedia()` for responsive setups. Clean up timelines and
ScrollTriggers on unmount/context changes.

Do not use deprecated `ScrollTrigger.matchMedia()` for new code.

## 13. Lenis

Use Lenis only if it improves the experience.

Desired: - smooth - precise - controlled - physical

Not: - slow - rubbery - laggy - disconnected

Synchronize Lenis and GSAP correctly. There must be one authoritative
scroll position and no competing scroll containers.

## 14. Interaction

Desktop: - optional subtle pointer response - optional drag rotation
only when it does not conflict with scrolling

Mobile: - natural vertical touch scrolling - no scroll hijacking -
optional gesture only if it does not interfere with page scroll

Do not make the user fight the interface.

## 15. Typography

Use: - Cormorant Garamond --- display - Inter --- body/UI - IBM Plex
Mono --- technical/specification

Keep typography restrained. Do not fill empty space with huge text.

## 16. Navigation

Minimal header.

Desktop concept:

``` text
REVERIE                         COLLECTION
                                WATCHES
                                JOURNAL
                                MENU
```

Mobile:

``` text
REVERIE                              MENU
```

Do not let the header compete with the watch.

## 17. Transitions

Preferred: - fade - subtle scale - mask/reveal - controlled movement -
product-driven camera transitions - soft opacity changes

Preferred easing:

`cubic-bezier(0.22, 1, 0.36, 1)`

Avoid bounce, elastic, cartoon easing, aggressive blur, and random
stagger.

## 18. Loading

Create a real asset-aware loader. Reflect actual model/texture loading
when practical.

Example:

``` text
REVERIE
01 / 01
```

Do not create a fake 5-second loader.

If loading fails: - show graceful fallback - keep site usable - log
useful developer diagnostics - never leave a blank black page

## 19. GLB performance

Optimize the model.

Targets: - preferably under \~10--15 MB - compressed geometry where
useful - compressed textures - KTX2/Basis where useful - no huge 8K
textures unless justified - reuse materials - avoid excessive draw
calls - dispose resources correctly

Use Three.js `GLTFLoader` with Draco/KTX2/Meshopt support as
appropriate.

## 20. Resource management

On cleanup: - dispose geometries - dispose owned materials/textures -
clean renderer resources appropriately - remove event listeners - kill
GSAP timelines - kill ScrollTriggers - clean Lenis integration if
owned - cancel pending animation frames

Avoid memory leaks.

## 21. DPR and rendering

Cap device pixel ratio rather than blindly using maximum DPR.

Starting target: - high-end desktop: \~1.5--2 - mobile: \~1--1.5 -
constrained devices: \~1

Do not render unnecessary pixels.

## 22. Responsive behavior

Do not merely scale desktop down.

Desktop: - larger watch - more negative space - more camera travel

Tablet: - medium watch - reduced camera travel

Mobile: - strong vertical composition - reduced animation distance -
simplified lighting - lower DPR - reduced texture quality if necessary -
minimal navigation - natural touch scrolling

Use `gsap.matchMedia()` for distinct animation setups.

## 23. Accessibility

Respect `prefers-reduced-motion`.

Reduced-motion mode: - disable heavy camera movement - disable
scroll-scrubbed animation - stabilize the watch - retain product
information - preserve navigation

## 24. WebGL fallback

If WebGL is unavailable/fails:

``` text
high-quality R01 image
+
same typography
+
same product information
+
simple transitions
```

Never show an empty canvas.

## 25. Low-performance fallback

Where practical:

``` text
High capability → full real-time 3D
Medium → optimized real-time 3D
Low → static/product-sequence fallback
```

Do not make performance detection intrusive.

## 26. Homepage after hero

Only build enough to validate the transition:

``` text
HERO
↓
Featured Collection
↓
Craftsmanship
↓
Selected Watches
↓
Brand Story
↓
Footer
```

The hero gets most of the effort.

Do not build the entire ecommerce backend before the hero is correct.

## 27. Product card motion

Cards should feel like ecommerce, not a motion graphics demo.

Rest: static.

Desktop hover: - image scale about 1.02 - subtle image movement - text
stable

Mobile: no hover dependency.

Do not add 3D to every product card.

## 28. Reusable architecture

Adapt this to the existing repository:

``` text
src/
├── components/
│   ├── layout/
│   ├── hero/
│   │   ├── ReverieHero
│   │   ├── HeroScene
│   │   ├── HeroModel
│   │   ├── HeroLighting
│   │   ├── HeroCamera
│   │   ├── HeroTimeline
│   │   └── heroConfig
│   ├── three/
│   └── product/
├── hooks/
├── styles/
├── data/
└── assets/
```

Do not create duplicate systems if equivalent code already exists.

## 29. Data-driven product

Keep product data separate from visual components.

Concept:

``` ts
{
  id: "r01",
  name: "Orion",
  reference: "R01",
  collection: "Core",
  type: "Automatic Mechanical Watch",
  model: "/models/reverie-r01-orion.glb",
  heroImage: "/images/watches/r01/hero.webp"
}
```

This allows future watch replacement without rebuilding the hero.

## 30. CSS foundation

If the current project lacks it, establish:

``` css
:root {
  --color-obsidian: #080808;
  --color-charcoal: #111111;
  --color-surface: #151515;
  --color-surface-elevated: #1C1C1C;
  --color-ivory: #F4F1EA;
  --color-warm-white: #E9E5DC;
  --color-muted: #A5A29B;
  --color-subtle: #6F6D68;
  --color-gold: #B89B63;
  --color-gold-light: #D2B77C;
  --ease-luxury: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## 31. Eliminate browser defaults

Mandatory: - CSS reset - `box-sizing` - body margin reset - button/input
reset - link reset - responsive images - block canvas - correct font
loading

Verify there is no Times New Roman, default blue links, default white
buttons, unexpected borders, or unstyled controls.

## 32. Hero copy

Use only:

``` text
REVERIE
R01 — ORION
AUTOMATIC MECHANICAL WATCH
EXPLORE
```

Do not add generic marketing filler.

## 33. Micro-interactions

Allowed: - subtle nav hover - tiny opacity transitions - underline/line
movement - \~1.02 product image scale - subtle pointer response

Avoid: - bouncing icons - spinning logo - animated cursor - excessive
hover effects - magnetic buttons everywhere - floating labels

## 34. Scroll indicator

Use a tiny `SCROLL ↓` or subtle line. It should recede once scrolling
begins.

## 35. Error handling

Handle: - GLB load failure - WebGL failure - texture failure - animation
cleanup - resize - mobile viewport

Technical errors belong in developer diagnostics, not in the visual
design.

## 36. Testing

Verify at:

Desktop: - 1440×900 - 1280×800 - 1920×1080

Mobile: - 390×844 - 375×812 - 430×932

Tablet: - \~768px width

Test: - first paint - loader - model - normal scroll - reverse scroll -
fast scroll - resize - mobile touch - refresh - return to top - reduced
motion - WebGL fallback

## 37. Performance target

Aim for smooth 60fps on modern desktop hardware and stable behavior on
normal scrolling.

Avoid: - repeated model loads - unnecessary React renders - duplicate
animation loops - long main-thread tasks - memory leaks

Do not put high-frequency Three.js animation into React state.

## 38. Postprocessing

Start with none.

Do not add bloom, chromatic aberration, film grain, lens distortion, or
heavy depth-of-field unless a measured visual need exists. Add at most
one effect at a time and verify performance.

## 39. Implementation order

### Step 1 --- Audit

Inspect repository, current site, assets, runtime, and errors.

### Step 2 --- Foundation

Fix reset, fonts, colors, layout, background, viewport behavior.

### Step 3 --- Three.js

Renderer, camera, scene, lighting, GLB loader, normalization.

### Step 4 --- Static product quality

Make the watch beautiful before animation.

### Step 5 --- Hero UI

Header, product copy, scroll indicator.

### Step 6 --- GSAP / ScrollTrigger

Implement the scroll film.

### Step 7 --- Lenis

Integrate only after the scroll animation itself works.

### Step 8 --- Responsive

Desktop/tablet/mobile setups.

### Step 9 --- Performance

Compression, DPR, rendering optimization.

### Step 10 --- Fallback

Static image/WebGL fallback.

### Step 11 --- Browser verification

Use Antigravity browser tools and inspect the running site.

### Step 12 --- Final polish

Fix every visible issue before completion.

## 40. Do not build everything at once

Do not build authentication, checkout, admin, reviews, AI support, or
complex ecommerce infrastructure before the hero is visually correct.

This task is to prove the Reverie 3D visual identity and interaction.

## 41. Missing GLB rule

If `/public/models/reverie-r01-orion.glb` is absent:

Create the integration architecture and temporary development
placeholder only.

Then report:

`BLOCKER: Final hero fidelity requires the actual Reverie R01 GLB asset.`

Do not invent a fake final watch.

## 42. Troubleshooting rules

If the GLB looks bad, inspect model scale, normals, materials, textures,
roughness, metallic values, environment, camera, and lighting before
compensating with CSS.

If scrolling stutters, profile: - model triangles - texture memory -
draw calls - DPR - postprocessing - React re-renders - scroll handler
work - per-frame allocations

If pinning jumps, inspect trigger dimensions, pin spacing,
`anticipatePin`, refresh timing, font loading, and dynamic canvas
sizing.

If mobile breaks, create a mobile-specific composition instead of simply
disabling the experience.

## 43. Final report

When finished, provide:

1.  Working hero
2.  Real-time 3D integration
3.  Scroll-driven animation
4.  Responsive desktop/mobile behavior
5.  Loading state
6.  WebGL fallback
7.  Reduced-motion mode
8.  Optimized asset loading
9.  Maintainable architecture
10. No console errors
11. No obvious visual defects

Also report:

``` text
Implemented:
...

Assets required:
...

Performance:
...

Fallback:
...

Known limitations:
...
```

Never claim something is implemented if it is only mocked.

## 44. Definition of done

Visual: - \[ \] premium luxury appearance - \[ \] large watch - \[ \]
product is the focus - \[ \] believable lighting - \[ \] correct
typography - \[ \] no browser-default styling - \[ \] no generic
AI-template artifacts

3D: - \[ \] real GLB loads - \[ \] correct framing - \[ \] believable
materials - \[ \] stable camera - \[ \] no geometry glitches

Motion: - \[ \] scroll controls scene - \[ \] smooth scrubbing - \[ \]
reverse scroll works - \[ \] fast scroll does not break it - \[ \]
pinning is stable - \[ \] exit transition is clean

Mobile: - \[ \] 390px - \[ \] 375px - \[ \] 430px - \[ \] no horizontal
overflow - \[ \] natural touch scroll - \[ \] acceptable performance

Accessibility: - \[ \] reduced motion - \[ \] usable navigation - \[ \]
content remains understandable without 3D

Engineering: - \[ \] no console errors - \[ \] no memory leaks - \[ \]
no duplicate render loops - \[ \] no unnecessary per-frame React state -
\[ \] optimized assets - \[ \] maintainable code

## 45. Final instruction

Build this as a **real luxury product experience**, not as a
visual-effects demo.

The reference is a direction for composition, motion, simplicity,
product prominence, and luxury.

Reverie must remain original.

The target feeling is:

> A beautifully photographed mechanical watch brought to life in real
> time, with the scroll acting like a camera operator.

The interface should almost disappear.

The watch should remain unforgettable.

**Do not stop after the first implementation. Open the running site in
the browser, inspect it at desktop and mobile sizes, identify visual and
interaction problems, and iterate until the acceptance checklist
passes.**
