# REVERIE — Antigravity Interaction & Visual Direction
## Dribbble-Inspired Luxury Watch E-Commerce Experience
### V1.0

**Primary reference:** Dribbble — “E-commerce Watches Web Design” by Bogdan Nikitin / Nixtio  
https://dribbble.com/shots/23365393-E-commerce-Watches-Web-Design

**Secondary reference:** Scrolltide Ora  
https://www.scrolltide.co/#t-ora

---

## 1. Objective

Build **REVERIE** as an original luxury mechanical-watch e-commerce experience inspired by the *interaction quality, simplicity, product hierarchy, motion language, and polish* of the supplied Dribbble reference.

Do **not** copy the reference's watch, brand, text, imagery, layout artwork, or source code.

The target is:

> **A luxury product film wrapped inside an extremely simple e-commerce interface.**

The watch is the protagonist. The interface supports it.

---

## 2. Reference Analysis

The supplied Dribbble shot is titled **“E-commerce Watches Web Design”** and is credited to **Bogdan Nikitin for Nixtio**. Dribbble categorizes it around e-commerce, homepage/product design, watches, web animation, and web design. citeturn2view0

External discussion of the shot describes its direction as dark, luxurious, precise, with clean typography and a layout that guides attention toward the watch and its craftsmanship. citeturn5search9

Use those qualities as the reference—not the literal visual design.

---

# 3. Core Principles

### 01 — PRODUCT FIRST

The watch gets the largest visual area.

### 02 — EMPTY SPACE IS PART OF THE DESIGN

Do not fill every region with text or UI.

### 03 — MOTION HAS A PURPOSE

Animation should communicate:

- product change
- navigation
- hierarchy
- depth
- transition
- interaction

### 04 — UI SHOULD FEEL LIGHT

Navigation, labels and controls should visually disappear behind the product.

### 05 — TRANSITIONS SHOULD FEEL EXPENSIVE

Avoid repetitive generic fade-ins.

Use controlled:

- movement
- opacity
- scale
- clipping
- position
- subtle image transitions

---

# 4. Critical Change From the Current Prototype

The current Antigravity prototype looks like a raw HTML skeleton.

Fix:

- browser-default typography
- weak hierarchy
- default-looking buttons
- excessive text density
- insufficient product scale
- poor spacing
- generic transitions
- lack of visual rhythm
- hero composition

**Do not solve this by adding more content.**

Solve it by:

**reducing + simplifying + enlarging + choreographing + polishing.**

---

# 5. Hero Direction

The hero is the most important part of the website.

Use a full-viewport composition.

Conceptually:

```text
--------------------------------------------------
| REVERIE                         MENU / CART     |
|                                                |
|                                                |
|              LARGE WATCH                       |
|                                                |
|                         R01                    |
|                         REVERIE NO. 01         |
|                         PRICE                  |
|                         EXPLORE →              |
|                                                |
--------------------------------------------------
```

The exact composition may change according to the product image.

The rules do not:

- large product
- very little UI
- sophisticated typography
- generous negative space
- product-led motion

---

# 6. Hero Watch Scale

The watch must NOT appear tiny.

Desktop:

- approximately 55–75% of viewport height
- dominant but surrounded by negative space

Mobile:

- approximately 50–70% of viewport height
- recompose rather than simply shrink

The watch should feel physically present.

---

# 7. Hero Background

Use:

```text
#080808
#111111
#151515
```

Use subtle tonal variation.

Avoid:

- neon
- colorful blobs
- excessive glow
- futuristic backgrounds
- floating particles
- generic AI gradients

---

# 8. Typography

### Display
Cormorant Garamond

### UI / Body
Inter

### Technical
IBM Plex Mono

Use large editorial type selectively.

Use small technical typography for metadata.

Do not make every element large.

---

# 9. Navigation

Desktop:

```text
REVERIE

COLLECTION
WATCHES
CRAFT
ABOUT

SEARCH
WISHLIST
CART
```

Keep it thin, minimal and spacious.

Mobile:

```text
REVERIE

SEARCH
CART
MENU
```

No oversized navigation bar.

No giant filled controls.

---

# 10. Hero Product Information

Keep it concise.

Example:

```text
R01

REVERIE NO. 01

AUTOMATIC / 38 MM

$4,800

EXPLORE
```

Use actual product data.

Never invent technical specifications.

---

# 11. Hero Motion

Motion must be **product-driven**.

Create a sequence of visual states:

```text
STATE 01
watch enters

↓

STATE 02
watch moves / rotates slightly

↓

STATE 03
dial becomes dominant

↓

STATE 04
watch shifts

↓

STATE 05
product information appears

↓

STATE 06
watch transitions toward collection
```

The transitions should feel continuous.

---

# 12. Scroll Behaviour

Use scroll as a storytelling input.

The user should feel:

```text
SCROLL
   ↓
WATCH MOVES
   ↓
TEXT CHANGES
   ↓
DETAIL REVEALED
   ↓
NEXT PRODUCT STATE
```

Not:

```text
SCROLL
   ↓
SECTION
   ↓
RANDOM ANIMATION
   ↓
SECTION
```

Scrolling should be connected to the product.

---

# 13. Hybrid Motion System

Do not force the entire website into one animation technique.

### Homepage

Use:

- GSAP
- ScrollTrigger
- Lenis
- Canvas/image sequence where appropriate

### Collection

Use:

- CSS transforms
- GSAP
- subtle image transitions

### Product Detail

Use:

- Three.js
- real `.glb/.gltf`
- drag rotation
- pinch zoom
- camera controls

Hierarchy:

```text
HOMEPAGE
cinematic storytelling

COLLECTION
subtle product motion

PDP
interactive 3D
```

---

# 14. Do Not Make Everything 3D

Do not put a 3D object everywhere.

Use real 3D where it adds product value:

- hero, when a strong model is available
- product detail page
- technical/product inspection

Use photography for:

- collection cards
- editorial sections
- supporting imagery
- catalog products without GLB assets

---

# 15. Image Transitions

Do not simply swap product images.

Use restrained:

### Crossfade
A → B

### Scale
Slightly oversized → settled

### Horizontal drift
Small positional movement

### Mask reveal
Clean clipping/masking

### Depth transition
Foreground product exits while next product enters

Keep all movement subtle.

---

# 16. Product Switching

If multiple watches are presented in the hero:

```text
R01
 ↓
R06
 ↓
R11
 ↓
R31
```

On change:

1. Current product exits gracefully.
2. Metadata transitions.
3. New product enters.
4. Background remains stable.
5. Layout does not jump.
6. Spatial orientation is preserved.

Do not make it feel like a conventional carousel.

---

# 17. Transition Timing

Use approximately:

```text
micro interaction     180–250ms
UI transition          300–450ms
product transition     600–900ms
cinematic transition   900–1400ms
```

Primary easing:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Motion should start decisively and settle smoothly.

---

# 18. Lenis

Use Lenis for smooth scrolling.

Do not make the scroll excessively floaty.

The user should still feel a direct relationship between their gesture/wheel and product movement.

---

# 19. GSAP

Use GSAP for:

```text
hero choreography
product transitions
typography
navigation
collection reveals
page transitions
micro-interactions
```

Prefer a small number of coordinated timelines over hundreds of unrelated animations.

---

# 20. ScrollTrigger

Use ScrollTrigger for:

- hero pinning
- scroll progress
- product position
- chapter transitions
- editorial reveals

Suggested progression:

```text
0%   → watch arrival
15%  → product centered
30%  → dial emphasis
45%  → detail reveal
60%  → product shift
75%  → product information
90%  → CTA
100% → release into collection
```

Tune visually rather than treating these percentages as fixed requirements.

---

# 21. Hero Scroll Length

Start around:

**300–500vh**

and tune based on the actual visual sequence.

Do not make the hero unnecessarily long.

---

# 22. Optional Cinematic Frame Sequence

If the final hero uses a cinematic image sequence:

```text
/public/reverie/hero/
frame-0001.webp
frame-0002.webp
...
frame-0240.webp
```

Render through canvas.

Conceptually:

```js
frameIndex = Math.round(
  scrollProgress * (frameCount - 1)
)
```

Use smoothing/interpolation where useful.

Do not turn it into a conventional video player.

---

# 23. Important: Do Not Make Reverie Look Like Ora

The previous Ora reference is **secondary**, not the primary visual target.

Use Ora only for:

- cinematic scroll storytelling
- scroll-driven progression
- canvas/frame-sequence technique where appropriate

Do not copy its visual identity.

The primary visual direction is the supplied Dribbble reference plus the established Reverie design system.

---

# 24. Collection

After the hero, transition into a simple editorial collection.

Example:

```text
THE COLLECTION

A CURATED STUDY
IN MECHANICAL TIME.

[ LARGE PRODUCT ]

R01
REVERIE NO. 01
$4,800

[ LARGE PRODUCT ]

R06
REVERIE NO. 06
$3,600
```

Do not immediately use a dense ecommerce grid.

---

# 25. Product Cards

Use:

- large product image
- reference number
- name
- price
- subtle action

Hover:

- image scale approximately 1.02–1.04
- metadata moves a few pixels
- arrow shifts slightly
- optional secondary image

Mobile must provide an equivalent touch interaction.

---

# 26. Product Page Transition

When a user selects a watch:

1. Selected product expands.
2. Product image remains visually continuous.
3. Page transitions.
4. PDP opens around that product.

Avoid a harsh route change into a completely different-looking page.

---

# 27. PDP

PDP should be calmer than the homepage.

Structure:

```text
WATCH / 3D MODEL

R01

REVERIE NO. 01

$4,800

DESCRIPTION

ADD TO BAG

VIEW DETAILS
```

The product remains dominant.

---

# 28. Real 3D PDP

When a `.glb` is available, use Three.js.

Support:

- drag rotation
- touch rotation
- pinch zoom
- reset
- camera presets
- detail inspection

Keep the environment clean.

---

# 29. Microinteractions

Use subtle interactions.

### Buttons
Arrow shifts slightly.

### Wishlist
Smooth icon state transition.

### Cart
Small confirmation movement.

### Navigation
Opacity/underline transition.

### Product cards
Small image scale.

### Filters
Smooth expansion.

Nothing should bounce.

---

# 30. Page Transitions

Use:

```text
current page
      ↓
content gently exits
      ↓
new page enters
      ↓
product becomes visible
```

Use opacity + transform + clipping.

Avoid:

- spinning pages
- 3D page flips
- exaggerated zoom
- white flashes
- loaders between every route

---

# 31. Loading

Only show a meaningful loader when meaningful assets are actually loading.

For a cinematic sequence:

```text
REVERIE

LOADING
34%
```

Progress must reflect actual asset loading.

For normal navigation, avoid unnecessary loading screens.

---

# 32. Color

Use the established Reverie palette:

```text
Obsidian       #080808
Charcoal       #111111
Surface        #151515
Ivory          #F4F1EA
Warm White     #E9E5DC
Muted          #A5A29B
Subtle         #6F6D68
Gold           #B89B63
Gold Light     #D2B77C
```

Gold is an accent, not the primary visual language.

---

# 33. Layout

Desktop:

```text
side padding: 4–6vw
```

Mobile:

```text
side padding: 20–24px
```

Use a strong grid and generous margins.

Avoid filling every horizontal space.

---

# 34. Mobile First

Mobile is a first-class experience.

Translate the reference through:

- large product imagery
- concise typography
- compact navigation
- smooth transitions
- touch interaction
- simple commerce

Do not merely shrink the desktop layout.

Recompose it.

---

# 35. What to Remove From the Current Prototype

Reduce/remove:

- excessive hero copy
- large paragraphs above the fold
- multiple competing CTAs
- unnecessary labels
- default-looking controls
- dense specifications on homepage
- dense product lists
- decorative UI that doesn't support the watch

The homepage must breathe.

---

# 36. What to Keep

Keep:

- 50-product catalog
- Reverie product data
- category structure
- cart
- wishlist
- product pages
- 3D studio concept
- real product specifications
- premium photography
- mobile-first architecture

Present them through a much simpler interface.

---

# 37. Visual Hierarchy

Always prioritize:

```text
1. WATCH
2. PRODUCT NAME
3. BRAND STORY
4. PRICE
5. PRIMARY ACTION
6. SUPPORTING INFORMATION
7. NAVIGATION
```

Navigation and decoration must never overpower the product.

---

# 38. Animation Hierarchy

```text
HIGH
Hero watch
Product transitions
Page transitions

MEDIUM
Collection reveals
Product cards
Navigation

LOW
Buttons
Icons
Metadata
```

This prevents the “everything is animated” problem.

---

# 39. Performance

Target a smooth premium experience.

- prefer transform/opacity
- avoid layout thrashing
- lazy-load below-fold content
- optimize WebP
- use responsive image sizes
- dispose Three.js resources on exit
- avoid unnecessary WebGL scenes
- use canvas only where it adds value

---

# 40. Accessibility

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- reduce scroll-linked movement
- simplify page transitions
- reduce image transforms
- preserve all product information
- keep all controls usable

---

# 41. Tech Stack

Use:

```text
React
Vite
GSAP
ScrollTrigger
Lenis
Three.js
WebP
GLB / GLTF
```

Use each technology only where it adds value.

---

# 42. Component Structure

```text
src/
├── components/
│   ├── Header/
│   ├── Hero/
│   ├── CinematicProduct/
│   ├── ProductTransition/
│   ├── Collection/
│   ├── ProductCard/
│   ├── ProductViewer3D/
│   ├── ProductMeta/
│   └── Footer/
│
├── animations/
│   ├── hero.js
│   ├── transitions.js
│   ├── collection.js
│   └── page.js
│
├── data/
│   └── watches.js
│
├── hooks/
│   ├── useLenis.js
│   ├── useScrollProgress.js
│   └── useFrameSequence.js
│
└── pages/
    ├── Home.jsx
    └── Product.jsx
```

---

# 43. Implementation Order

Do not build everything at once.

### Step 1
Fix global CSS.

### Step 2
Fix fonts.

### Step 3
Rebuild header.

### Step 4
Rebuild hero composition.

### Step 5
Make the watch large.

### Step 6
Implement product animation.

### Step 7
Implement scroll choreography.

### Step 8
Implement collection.

### Step 9
Implement page transitions.

### Step 10
Polish mobile.

### Step 11
Add real Three.js PDP.

### Step 12
Expand remaining ecommerce functionality.

---

# 44. Acceptance Test

### First impression
Immediately feels like a luxury watch brand.

### Product
Watch is the first thing the eye notices.

### Simplicity
No unnecessary UI.

### Motion
Animation explains the product.

### Scroll
Scrolling feels connected to the product.

### Transitions
Product/page transitions feel continuous.

### Mobile
Premium at approximately 390px width.

### Performance
Responsive and smooth.

### Brand
Clearly feels like REVERIE, not a generic template.

---

# 45. Final Visual Test

### Current direction to avoid

```text
Lots of text
Tiny watch
Default-looking UI
Many labels
Generic sections
Animation as decoration
```

### Target direction

```text
Large watch
Very little text
Excellent typography
Large negative space
Quiet UI
Product-led motion
Smooth transitions
Luxury pacing
```

If the result still feels like a normal ecommerce template, stop and redesign the hero.

---

# 46. Final Antigravity Instruction

Build **REVERIE** using the supplied Dribbble shot as the primary interaction and art-direction reference.

The goal is NOT:

> “Make Reverie look like this screenshot.”

The goal is:

> **“Make Reverie feel as polished, simple, luxurious, product-focused and motion-driven as this reference.”**

Preserve Reverie's identity.

Use original products.

Use original photography.

Use original copy.

Use original layout decisions.

Borrow only the underlying principles:

**simplicity + product focus + luxury + motion + smooth transitions + restraint.**

The finished homepage should feel like:

> **a luxury watch campaign that happens to be an e-commerce store**

—not an e-commerce store decorated with animations.

---

## References

Primary:
https://dribbble.com/shots/23365393-E-commerce-Watches-Web-Design

Secondary:
https://www.scrolltide.co/#t-ora

Use them differently:

**Dribbble:** visual restraint, product hierarchy, luxury presentation, typography, motion language and overall polish.

**Ora:** cinematic scroll storytelling and frame-sequence/canvas interaction where appropriate.

The final design must be unmistakably **REVERIE**.
