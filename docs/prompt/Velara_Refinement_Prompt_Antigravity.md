# VELARA — Antigravity Refinement Prompt
## Refine the Existing Single-Page Prototype Against the Approved Visual Direction

### Working mode

**Roger That**

You are not starting the Velara website from scratch.

You are refining the **existing implementation** in this project.

The uploaded project already contains:

- React + Vite frontend
- Existing component structure
- Existing design tokens
- Existing local image assets
- Existing homepage sections
- Additional commerce pages/components
- Existing responsive CSS
- Existing interactions

Your job is to **visually and structurally refine the existing homepage prototype** so it matches the supplied Velara reference direction more closely.

Do not replace the project with a new template.

Do not rebuild the application unnecessarily.

---

# 1. SOURCE OF TRUTH

Use these sources in this order:

1. The supplied design-reference images in:

```text
design_reference/
```

2. The existing:

```text
Watch_Brand_Design_Tokens.md
```

3. The existing:

```text
Velara_Single_Page_Prototype_Antigravity_Prompt.md
```

4. The current implementation itself.

The reference images are the strongest visual source.

The goal is NOT to reproduce every pixel.

The goal is to reproduce the **visual hierarchy, restraint, composition, spacing, typography, product presentation, and luxury-commerce feel**.

---

# 2. CURRENT IMPLEMENTATION ANALYSIS

The current implementation is already structurally strong, but it has several visual problems that make it feel more like a polished UI prototype than a genuinely premium watch brand.

### Main issue

The current design is trying too hard to communicate "luxury" through:

- cards
- borders
- rounded containers
- dark panels
- floating controls
- blur
- shadows
- interactive UI
- orbital rings
- multiple framed elements

The result is more "designed interface" than "luxury watch website."

The refinement must move toward:

```text
LESS UI
MORE EDITORIAL DESIGN

LESS EFFECT
MORE MATERIALITY

LESS CARD CHROME
MORE PHOTOGRAPHY

LESS FUTURISTIC
MORE HOROLOGICAL

LESS GENERATED-LOOKING
MORE ART-DIRECTED
```

---

# 3. MOST IMPORTANT RULE

## Do not add more design.

The current implementation does NOT need more visual effects.

It needs better:

- proportions
- whitespace
- typography
- image treatment
- section composition
- alignment
- hierarchy
- restraint

If something looks weak, do not automatically add:

- gradient
- glow
- shadow
- animation
- border
- glass effect
- decorative shape

First ask whether the element should simply be removed.

---

# 4. GLOBAL REFINEMENT

The final website should feel closer to:

```text
AURELIS / high-end independent watchmaker
+
editorial luxury magazine
+
modern Swiss e-commerce
```

and less like:

```text
SaaS landing page
+
AI-generated luxury concept
+
futuristic 3D product site
```

The interface should feel as if a real art director designed it.

---

# 5. COLOR REFINEMENT

The existing color tokens are generally correct.

Keep the base palette.

However, reduce the visual presence of warm accent colors.

Current warm colors are being used too often.

### Keep

```text
#FAF9F6
#FFFFFF
#F5F4F0
#ECEAE6
#DFDBD5
#211F1D
#0B0B0A
#080A0B
#F5F4F1
```

### Reduce

```text
warm brown
warm gold
champagne accents
```

Warm metallic colors should mostly come from:

- watch photography
- product materials
- lifestyle photography

They should NOT become a major UI color.

### Rule

The website should look:

```text
warm neutral
```

not:

```text
gold luxury
```

---

# 6. TYPOGRAPHY REFINEMENT

The typography system is correct conceptually, but the hierarchy needs to become more editorial.

## Display serif

Use the serif for:

- Hero headline
- Major section titles
- Editorial brand statements

Do not use the serif for:

- buttons
- prices
- specifications
- navigation
- small labels

## Hero headline

Make it feel more like a fashion/watch editorial headline.

Use:

```text
large
light
high contrast
tight line-height
```

Avoid making it excessively bold.

---

# 7. HEADER REFINEMENT

The current header uses:

```text
backdrop-filter
blur
semi-transparent backgrounds
shadow on scroll
```

This makes it feel like a modern app header.

Refine it.

## At top of hero

Use:

```text
transparent
minimal
no obvious glass panel
no visible container boundary
```

The header should sit naturally over the photography.

## On scroll

Use:

```text
solid warm-white
very subtle 1px border
no obvious shadow
```

Reduce the feeling of a floating navigation bar.

## Desktop navigation

Keep:

```text
VELARA

Home
Collections
Men
Women
About

Search
Account
Cart
```

But make the typography quieter.

Avoid excessive letter spacing on normal navigation.

Only the brand wordmark should have pronounced tracking.

---

# 8. HERO — MAJOR REFINEMENT

This is the most important change.

The current hero is too much of a three-column UI layout:

```text
text | watch card | controls
```

The reference direction is more cinematic.

The watch should feel like it exists naturally inside the scene.

## Change the composition to:

```text
--------------------------------------------------
| HEADER                                         |
|                                                |
|  THE ORION                                     |
|                                                |
|  Timeless                 LARGE WATCH          |
|  by Design                                     |
|                                                |
|  Description                                   |
|                                                |
|  [ Explore Collection ]                        |
|                                                |
|                               3D controls       |
|                                                |
|                         01 02 03               |
--------------------------------------------------
```

The text should overlay the hero environment.

The watch should NOT look like a rectangular product card.

---

# 9. HERO IMAGE TREATMENT

Current CSS uses:

```text
border-radius
overflow:hidden
box-shadow
aspect-ratio: 16/9
```

This makes the watch image feel like a card.

Remove the card feeling.

Instead:

- use the image as a full hero composition
- allow the image to occupy the scene
- use `object-fit: cover` only when the source image actually supports it
- avoid visibly rounded image boundaries
- remove heavy box shadow
- use subtle cinematic gradients only for text readability

The image should feel like:

```text
photography
```

not:

```text
image component
```

---

# 10. HERO WATCH SCALE

The watch is the visual hero.

At desktop:

```text
watch should occupy approximately 45–55% of the hero composition
```

Do not make it too small.

Do not crop the watch's important details.

The dial, bezel, bracelet, and case should remain visually readable.

---

# 11. HERO CONTROLS

The current controls feel too much like a futuristic product configurator.

Reduce them significantly.

Current:

```text
Rotate
3D View
360° View
AR Try-On
```

Make the visual treatment much quieter.

Use something closer to:

```text
↻  Drag to rotate

○  3D View
○  360° View
○  AR Try-On
```

Rules:

- no filled cards
- no dark rectangular panels
- no glassmorphism
- no heavy borders
- no HUD aesthetic

The controls should feel like a luxury interaction hint.

---

# 12. HERO SLIDE INDICATOR

Keep:

```text
01   02   03
```

But make it extremely subtle.

Avoid making it look like a carousel component from a generic template.

---

# 13. TRUST STRIP

The trust strip is useful, but the current icon containers are too UI-heavy.

Current approach:

```text
circular icon container
+
text
+
separator
```

Refine toward:

```text
small line icon
small heading
small supporting text
```

No prominent circular backgrounds.

The strip should feel like an understated service guarantee.

---

# 14. COLLECTION SECTION — MAJOR REFINEMENT

The current collection section uses:

```text
large editorial card
+
three bordered cards
```

This creates too much card language.

The reference direction is flatter.

## Change to:

```text
large editorial image
+
three clean product/collection images
```

The images should carry most of the visual weight.

Remove or reduce:

- card borders
- card shadows
- excessive rounded corners
- floating reference-code badges

The collection names and descriptions should sit directly below the images.

---

# 15. COLLECTION IMAGE PROPORTIONS

Use:

```text
4:5
```

or

```text
3:4
```

for collection images.

They should feel editorial.

Avoid overly small product cards.

The watch should be large enough to immediately identify the collection.

---

# 16. COLLECTION CARD HOVER

Keep hover interaction extremely subtle.

Allowed:

```text
image scale 1.01–1.02
arrow moves 3–4px
```

Do NOT use:

```text
card lift
large shadow
glow
border animation
```

---

# 17. FEATURED PRODUCT — MAJOR REFINEMENT

The current featured section has too much panel structure:

```text
image
+
content
+
separate specification card
```

This makes it look like a product dashboard.

The reference direction is more editorial.

Use:

```text
large watch image
|
FEATURED
The Orion Automatic
$1,299

description

[ Add to Cart → ]

specifications listed quietly
```

The specifications should feel integrated into the composition.

Do not put them inside a heavy bordered card.

---

# 18. FEATURED PRODUCT IMAGE

The watch image should be much larger.

The image should visually dominate the section.

Avoid:

```text
small framed product image
```

Prefer:

```text
large product photography
```

The product should almost feel like a campaign image.

---

# 19. FEATURED SPECIFICATIONS

Use a simple vertical list:

```text
Swiss Automatic Movement
Sapphire Crystal
Stainless Steel Case & Bracelet
Water Resistant (100m)
Case Diameter: 41mm
```

Use small line icons only if they genuinely improve scanning.

Do not create individual cards.

---

# 20. CRAFTSMANSHIP SECTION — REWORK

The current implementation uses three equal cards.

That is too generic.

The supplied references suggest a more editorial split layout.

Use:

```text
--------------------------------------------------
|                                                |
| LARGE MACRO WATCH IMAGE | Precision in every   |
|                         | detail               |
|                         |                      |
|                         | description          |
|                         |                      |
|                         | Crown   Movement     |
|                         | Crystal              |
--------------------------------------------------
```

The large image should occupy roughly:

```text
45–55%
```

of the section.

The text/details occupy:

```text
45–55%
```

---

# 21. CRAFTSMANSHIP DETAIL ITEMS

Instead of three cards, create three quiet detail blocks:

```text
Crown
Screw-down crown
for enhanced water resistance

Movement
Swiss automatic movement
with 70h power reserve

Crystal
Sapphire crystal
with anti-reflective coating
```

Use small separators.

No large card backgrounds.

---

# 22. 3D EXPERIENCE — IMPORTANT REFINEMENT

The current implementation is the section most likely to create the "AI-generated / futuristic" feeling.

Current visual elements include:

```text
large orbital rings
rotating dashed ring
dark tool cards
angle selector UI
multiple control panels
```

This is too much.

Remove the decorative orbital system.

## Replace it with:

```text
large watch image
+
very subtle interaction indicator
+
small controls
```

The interaction should feel like a premium product viewer, not a sci-fi interface.

---

# 23. 3D SECTION LAYOUT

Use:

```text
LEFT:
INTERACTIVE 3D EXPERIENCE
Explore in real time
description
Explore 3D Viewer →

CENTER/RIGHT:
large watch visual

small controls near the visual
```

Controls can remain:

```text
Rotate
Zoom
Pan
Fullscreen
```

But remove heavy button boxes.

Use minimal text/icon controls.

---

# 24. 3D INTERACTION

The existing drag interaction can remain.

Do NOT add a real 3D engine.

The prototype can continue using the existing image-based interaction.

However:

- dragging should feel smooth
- zoom should be subtle
- reset should work
- controls should be visually quiet

Do not fake complex 3D behavior with excessive animation.

---

# 25. BRAND STORY

The current brand-story section is directionally correct.

Keep:

```text
large landscape photography
dark overlay
editorial text
```

But simplify the copy.

The reference direction is concise.

Prefer:

```text
More than a watch

A legacy on your wrist.

[ Our Story → ]
```

The long paragraph can be reduced or hidden in the homepage prototype.

Do not make the homepage read like a corporate "About Us" page.

---

# 26. FOOTER

The current footer is functional but slightly too dense.

Make it more editorial.

Keep:

```text
VELARA
Precision horology crafted for generations.

Collections
About
Support
```

Reduce excessive links.

The footer should have generous whitespace.

---

# 27. RADIUS REFINEMENT

The current system uses many:

```text
4px
8px
12px
```

The reference design is closer to sharp editorial layouts.

Use:

```text
images: 0–4px
buttons: 2–4px
commerce controls: 4px
pills: only where semantically required
```

Do not make large editorial elements look like rounded cards.

---

# 28. SHADOW REFINEMENT

Reduce shadows significantly.

Especially remove/reduce:

```text
hero watch shadow
collection card shadow
craft card shadow
header shadow
```

Luxury should not depend on elevation.

Use natural image contrast instead.

---

# 29. BORDER REFINEMENT

Borders should almost disappear.

Use them primarily for:

- navigation state
- trust-strip separators
- form controls
- subtle commerce boundaries

Do not outline every visual block.

---

# 30. REMOVE "AI LOOK" SYSTEMATICALLY

Search the existing implementation for visual patterns that create an AI-generated appearance.

Reduce or remove:

```text
radial gradients
glows
excessive blur
floating panels
decorative orbit rings
excessive rounded cards
large shadow halos
generic glass effects
unnecessary micro-interactions
```

Keep only effects that support:

```text
readability
product focus
navigation
interaction
```

---

# 31. IMAGE QUALITY

The project already contains many useful assets.

Prefer the most appropriate existing assets from:

```text
public/assets/
```

Pay attention to:

```text
hero_watch_cinematic_1790681538020.jpg
hero-watch.jpg
collection-classic.jpg
collection-sport.jpg
collection-heritage.jpg
collection-editorial.jpg
craft-crown.jpg
craft-movement.jpg
craft-crystal.jpg
watch-3d.jpg
brand-story.jpg
```

Do not randomly substitute images.

Choose images based on:

- composition
- lighting
- product scale
- crop
- section purpose

---

# 32. IMPORTANT IMAGE RULE

Do not use a generic watch image repeatedly just because it is available.

For example:

```text
hero
featured
collection
3D
```

should not all look visually identical.

The page needs visual rhythm.

---

# 33. SECTION RHYTHM

The current page can feel like:

```text
section
section
section
section
```

Make it feel like an editorial story.

Recommended rhythm:

```text
DARK
Hero
↓
DARK
Trust
↓
LIGHT
Collections
↓
DARK
Featured Watch
↓
LIGHT
Craftsmanship
↓
DARK
3D Experience
↓
DARK IMAGE
Brand Story
↓
LIGHT
Footer
```

However, avoid making every dark section identical.

Each section needs a different composition.

---

# 34. SECTION HEIGHTS

Do not make every section extremely tall.

Recommended:

```text
Hero:
80–100vh

Trust:
120–150px desktop

Collections:
600–800px

Featured:
600–760px

Craftsmanship:
650–800px

3D:
600–750px

Brand Story:
500–650px

Footer:
450–600px
```

Mobile should use content-driven heights.

---

# 35. DESKTOP CONTAINER

Keep:

```text
max-width: 1440px
```

But avoid filling the entire viewport with UI.

At 1440px viewport:

```text
40–56px
```

horizontal margins are appropriate.

The website should breathe.

---

# 36. MOBILE REFINEMENT

The current mobile CSS primarily collapses desktop grids.

That is not enough.

Mobile needs intentional composition.

---

# 37. MOBILE HEADER

Use:

```text
VELARA          Search  Cart  Menu
```

Keep it compact.

Do not show a large drawer immediately.

The drawer can remain.

Refine it to feel like a luxury mobile menu:

```text
Collections
Men
Women
About
Journal
Support
```

with generous vertical spacing.

---

# 38. MOBILE HERO

Do NOT simply stack:

```text
text
watch
controls
```

with desktop proportions.

Use:

```text
hero photography
        ↓
THE ORION
        ↓
Timeless
by Design
        ↓
short description
        ↓
CTA
```

The watch should remain the dominant image.

Keep the copy concise.

---

# 39. MOBILE COLLECTIONS

Use:

```text
section heading

featured editorial collection

horizontal or stacked collection cards
```

Do not squeeze three cards into tiny columns.

---

# 40. MOBILE FEATURED PRODUCT

Use:

```text
large watch image

FEATURED
The Orion Automatic
$1,299

description

specifications

[ Add to Cart ]
```

No side-by-side desktop structure.

---

# 41. MOBILE CRAFTSMANSHIP

Use:

```text
large macro image

Precision in every detail

description

Crown
Movement
Crystal
```

Do not show three tiny card grids.

---

# 42. MOBILE 3D

Use a large watch visual.

Keep only:

```text
Rotate
Zoom
```

or a single:

```text
Drag to explore
```

Avoid four tiny controls on mobile.

---

# 43. MOBILE CTA

Primary CTAs should be:

```text
48px high
full-width when appropriate
```

Use:

```text
Add to Cart
Explore Collection
```

Do not create oversized pill buttons.

---

# 44. DO NOT TOUCH UNRELATED FUNCTIONALITY

The project contains:

```text
CollectionsPage
ProductDetailPage
CartPage
CheckoutPage
AccountPage
OrderTrackingPage
SupportPage
BrandStoryPage
```

Do not delete these.

Do not rewrite their business/data structure.

For this refinement task, focus on:

```text
HomePage
```

and only modify shared components/styles if necessary to support the homepage.

If a shared component change affects another page, verify that page still works.

---

# 45. DO NOT CHANGE DATA UNNECESSARILY

The existing product data is extensive.

Do not rewrite the catalog.

Only change content if it is necessary to match the approved homepage visual direction.

Do not invent a new data model.

---

# 46. DO NOT CHANGE STACK

Keep the existing:

```text
React
Vite
Lucide React
existing CSS architecture
```

Do not migrate to:

```text
Next.js
Tailwind
another UI framework
another bundler
```

unless the project already requires it.

---

# 47. DO NOT ADD DEPENDENCIES UNNECESSARILY

The current prototype already has the required tooling.

Before installing anything, determine whether it is actually necessary.

For this refinement, it should not be necessary.

---

# 48. CODE QUALITY

Keep the existing component structure.

Use:

```text
Hero
TrustStrip
CollectionsSection
FeaturedProduct
CraftsmanshipSection
ThreeDExperience
BrandStory
```

Do not combine the entire homepage into one component.

Do not duplicate CSS unnecessarily.

Use the existing design tokens.

---

# 49. CSS CLEANUP

While refining, remove obsolete styles created by the previous visual direction.

Especially look for styles related to:

```text
excessive cards
orbit rings
unnecessary blur
heavy shadows
decorative gradients
```

Do not leave dead CSS everywhere.

---

# 50. DESIGN TOKEN RULE

Continue using semantic variables.

Prefer:

```css
var(--color-bg-primary)
var(--color-text-primary)
var(--color-border-subtle)
var(--motion-normal)
```

Do not scatter raw colors throughout the components.

If a new token is genuinely needed, add it to the central token system.

---

# 51. INTERACTION RULE

Every interaction should have a reason.

Keep:

```text
navigation
hover
collection selection
featured variant selection
3D drag
3D zoom
mobile menu
CTA actions
```

Remove interactions that exist only to make the page look "advanced."

---

# 52. VISUAL QA PROCESS

Do not assume the CSS looks correct after editing.

Actually inspect the rendered page.

Test at:

```text
1440 × 900
1280 × 800
1024 × 768

390 × 844
375 × 812
```

Check every section.

---

# 53. DESKTOP QA CHECKLIST

### Header

- [ ] Brand alignment is correct
- [ ] Navigation is quiet
- [ ] Header does not look like glassmorphism
- [ ] Icons are aligned
- [ ] Scrolled header is subtle

### Hero

- [ ] Watch is dominant
- [ ] Text does not compete with watch
- [ ] Image does not look like a card
- [ ] Controls are minimal
- [ ] Headline feels editorial
- [ ] Hero feels premium rather than futuristic

### Collections

- [ ] Cards do not look overly boxed
- [ ] Images are large
- [ ] Typography is restrained
- [ ] Spacing is generous

### Featured

- [ ] Watch dominates
- [ ] Specs do not look like dashboard cards
- [ ] CTA is clear

### Craftsmanship

- [ ] Editorial split layout
- [ ] Large macro image
- [ ] Details are quiet

### 3D

- [ ] No sci-fi orbit aesthetic
- [ ] Interaction feels premium
- [ ] Controls are subtle

### Brand Story

- [ ] Image is cinematic
- [ ] Copy is concise
- [ ] No excessive overlay UI

### Footer

- [ ] Not too dense
- [ ] Good whitespace
- [ ] Clear hierarchy

---

# 54. MOBILE QA CHECKLIST

- [ ] No horizontal overflow
- [ ] Hero image remains dominant
- [ ] Headline does not wrap awkwardly
- [ ] CTA is reachable
- [ ] Collection cards remain visually large
- [ ] Featured product is easy to scan
- [ ] Craftsmanship is readable
- [ ] 3D section is simplified
- [ ] Footer is not excessively long
- [ ] Touch targets are at least 44px
- [ ] No tiny desktop controls remain

---

# 55. MOST IMPORTANT BEFORE/AFTER TARGET

## Current direction

```text
Luxury
+
UI
+
Cards
+
Effects
+
3D controls
+
Borders
```

## Target direction

```text
Photography
+
Typography
+
Whitespace
+
Product
+
Editorial composition
+
Subtle interaction
```

The second direction is the target.

---

# 56. FINAL VISUAL TEST

After refinement, compare the rendered page against the supplied reference images.

Ask:

### 1. Does the watch look like a real photographed luxury product?

### 2. Does the page feel art-directed rather than assembled from components?

### 3. Are there any unnecessary boxes?

### 4. Are there any unnecessary gradients?

### 5. Are there any unnecessary shadows?

### 6. Does the dark/light balance feel intentional?

### 7. Does the mobile version look designed rather than merely responsive?

### 8. Does the site still feel premium when all animations are disabled?

If the answer to #8 is no, the design is relying too much on effects.

Fix the composition instead.

---

# 57. SUCCESS CRITERIA

The refinement is successful when the page communicates:

```text
VELARA

A quiet, modern, premium watchmaker.

Not a technology company.
Not an AI product.
Not a generic e-commerce template.
Not a futuristic concept website.
```

The strongest elements should be:

```text
WATCH
PHOTOGRAPHY
TYPOGRAPHY
SPACE
CRAFTSMANSHIP
PRODUCT DETAIL
```

not:

```text
CARDS
GRADIENTS
GLOW
UI EFFECTS
```

---

# 58. IMPLEMENTATION ORDER

Do the refinement in this order:

## Phase 1 — Hero

Fix:

- image composition
- watch scale
- text placement
- header
- controls

## Phase 2 — Collections

Fix:

- card treatment
- image size
- spacing
- editorial hierarchy

## Phase 3 — Featured Product

Fix:

- product scale
- specification presentation
- composition

## Phase 4 — Craftsmanship

Convert:

```text
3 generic cards
```

into:

```text
editorial split composition
```

## Phase 5 — 3D Experience

Remove futuristic decoration.

Keep only meaningful interaction.

## Phase 6 — Brand Story

Simplify copy and composition.

## Phase 7 — Footer

Reduce density.

## Phase 8 — Mobile

Re-compose every major section intentionally.

## Phase 9 — QA

Check all requested viewport sizes.

---

# 59. DO NOT STOP AFTER CSS CHANGES

After implementation:

1. Run the project.
2. Open the homepage.
3. Inspect the rendered result.
4. Check desktop.
5. Check mobile.
6. Fix visual problems you can actually see.
7. Verify there are no console errors caused by your changes.
8. Verify existing navigation/interactions still work.

Do not report success based only on code inspection.

---

# 60. FINAL RESPONSE FORMAT

When finished, respond:

```text
Over n Out

Refined:
- Hero
- Header
- Collections
- Featured product
- Craftsmanship
- 3D experience
- Brand story
- Footer
- Mobile layouts

Verified:
- Desktop
- Tablet
- Mobile

Existing functionality preserved:
- Yes
```

If something could not be verified or requires manual review, state it clearly instead of pretending it is complete.
