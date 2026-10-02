# Antigravity Prompt — Velara Luxury Watch E-Commerce Single-Page Prototype

## Role

You are building a **single-page frontend prototype** for a premium luxury watch e-commerce brand named **VELARA**.

This is a visual/product-design prototype, not the complete e-commerce application.

The goal is to establish the final visual language, layout system, responsive behavior, and interaction direction before building the rest of the website.

---

# 1. IMPORTANT WORKING RULES

Before starting:

**Roger That**

When all requested work is complete:

**Over n Out**

Follow these rules strictly:

1. Build only the single-page prototype described in this document.
2. Do NOT build backend functionality.
3. Do NOT build authentication.
4. Do NOT build a database.
5. Do NOT build checkout logic.
6. Do NOT create separate product, cart, account, or checkout pages yet.
7. Do NOT change the existing project folder structure unless absolutely required.
8. Reuse the existing frontend stack and conventions if a project already exists.
9. Do not hardcode secrets, API keys, credentials, or environment-specific values.
10. Do not create or modify `.env`.
11. Do not access `.env`.
12. Use reusable components rather than putting the entire page into one giant component.
13. Do not install unnecessary libraries.
14. Ask for permission before making changes that are destructive or outside the requested scope.
15. Do not replace working project infrastructure simply because another approach is easier.
16. The result must look like a real luxury watch brand website, not an AI-generated concept page.
17. Prioritize visual quality, spacing, typography, image composition, and responsive behavior over adding unnecessary functionality.

---

# 2. SOURCE OF TRUTH

Use the supplied **Watch Brand Design Tokens** document as the visual source of truth.

The design direction is:

```text
LIGHT LUXURY COMMERCE
        +
DARK CINEMATIC PRODUCT STORYTELLING
        +
SUBTLE INTERACTION
```

The prototype must combine:

- Light warm storefront surfaces
- Dark cinematic hero
- Editorial typography
- Premium product photography
- Minimal navigation
- Strong product hierarchy
- Restrained borders
- Minimal shadows
- Subtle motion
- Responsive desktop and mobile layouts

Do NOT introduce a futuristic/AI visual style.

Avoid:

- Purple AI gradients
- Neon blue/purple
- Excessive glassmorphism
- Excessive rounded cards
- Heavy shadows
- Floating futuristic HUD elements
- Random gold gradients
- SaaS-style dashboard visuals
- Excessive animations
- Generic template-like e-commerce styling

Luxury should come from:

- Typography
- Photography
- Spacing
- Composition
- Material detail
- Restraint
- Interaction quality

---

# 3. PROTOTYPE SCOPE

Build one scrollable homepage prototype containing these sections:

```text
1. Header
2. Cinematic Hero
3. Trust / Service Strip
4. Our Collections
5. Featured Watch
6. Craftsmanship / Precision
7. Interactive 3D Experience Preview
8. Brand Story
9. Footer
```

The page should feel like one coherent luxury experience rather than a collection of unrelated UI sections.

---

# 4. BRAND

Brand name:

**VELARA**

Use a restrained luxury wordmark.

Recommended treatment:

```text
V E L A R A
```

with generous letter spacing.

Do not use a large decorative logo.

---

# 5. GLOBAL VISUAL SYSTEM

## Colors

Primary light palette:

```text
#FAF9F6   primary warm background
#FFFFFF   white surface
#F5F4F0   secondary surface
#ECEAE6   subtle surface
#DFDBD5   border
#CCC7C0   stronger border
#8A827A   muted text
#6E6861   secondary text
#211F1D   primary text
#0B0B0A   dark/primary action
```

Dark cinematic palette:

```text
#080A0B   cinematic background
#101214   dark surface
#17191B   raised dark surface
#303235   dark border
#F5F4F1   primary dark text
#C7C4BE   secondary dark text
```

Use the warm palette subtly.

Do not make the site gold-colored.

---

# 6. TYPOGRAPHY

Use two type roles.

## Editorial

Use a refined editorial serif.

Preferred:

```text
Cormorant Garamond
```

Fallback:

```text
Georgia
serif
```

Use for:

- Hero headline
- Major editorial headings
- Brand storytelling headings

## UI

Use:

```text
Inter
```

Fallback:

```text
Arial
sans-serif
```

Use for:

- Navigation
- Body text
- Product information
- Prices
- Buttons
- Specifications
- Labels

Typography must feel calm and premium.

Do not use futuristic display fonts.

---

# 7. HEADER

Build a desktop header approximately:

```text
72–88px height
40–48px horizontal padding
```

Structure:

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

Keep the navigation minimal.

On dark hero:

- Header can be transparent.
- Use light text/icons.

On light sections:

- Use dark text/icons.

The header should visually blend into the hero rather than look like a separate floating SaaS navbar.

---

# 8. MOBILE HEADER

At mobile widths:

```text
VELARA                         Search
                              Cart
                              Menu
```

Use approximately:

```text
64px height
16–20px horizontal padding
```

Hide desktop navigation.

Use touch-friendly controls.

---

# 9. HERO SECTION

This is the primary visual statement.

Use a dark cinematic background.

Recommended:

```text
min-height: 80vh
desktop target: approximately 720–900px
```

## Hero content

Eyebrow:

```text
THE ORION
```

Headline:

```text
Timeless
by Design
```

Supporting text:

```text
The Orion blends modern craftsmanship with
classic elegance. A watch designed for those
who value more than just time — they value
what it represents.
```

Primary CTA:

```text
Explore Collection →
```

## Composition

Desktop:

```text
LEFT
eyebrow
headline
description
CTA

CENTER / RIGHT
large hero watch

RIGHT
small interaction controls
```

The watch must be the dominant visual object.

Do not cover the watch with excessive text.

---

# 10. HERO IMAGE

Use a premium watch image with:

- Stainless steel watch
- Dark/navy or black dial
- Realistic metal reflections
- Dark cinematic environment
- Stone/rock or refined natural surface
- High-end product photography

If suitable image assets already exist in the project, use them.

If no assets exist, use a clean placeholder/local asset strategy that allows the page to render correctly.

Do not use obviously fake or distorted watch imagery.

Do not create complicated image-generation infrastructure.

---

# 11. HERO INTERACTION PREVIEW

On desktop, add a subtle interaction panel on the right.

Example:

```text
↻   Drag to rotate

●   3D View
○   360° View
○   AR Try-On
```

This is only a prototype.

Do NOT implement a real 3D engine yet unless the project already contains one.

The interaction controls should visually communicate the future experience.

Use:

```text
small typography
thin borders
low-contrast icons
```

No futuristic HUD styling.

---

# 12. HERO SLIDE INDICATOR

Near the bottom of the hero:

```text
01   02   03   ─────
```

Make it subtle.

It can be visual-only for this prototype.

---

# 13. SCROLL INDICATOR

Near the bottom-center:

```text
↓
```

with subtle text:

```text
SCROLL
```

Do not use aggressive bouncing animation.

---

# 14. TRUST STRIP

Immediately below the hero, create a dark service/trust strip.

Four items:

```text
Free Shipping
Worldwide delivery

2 Year Warranty
Confidence in every watch

Easy Returns
Hassle-free process

Dedicated Support
We're here for you
```

Use thin vertical separators on desktop.

On mobile:

```text
2 × 2 grid
```

Use small line icons.

Keep the icons restrained.

---

# 15. OUR COLLECTIONS

Switch back to the light palette.

Section heading:

```text
OUR COLLECTIONS
```

Main heading:

```text
Find Your
Perfect Match
```

Supporting copy:

```text
Explore our curated collections, each designed
to suit different styles, moments and personalities.
```

Primary CTA:

```text
Shop All Collections →
```

## Layout

Desktop:

```text
Large editorial image
+
Three collection cards
```

Collection cards:

### Classic

```text
Timeless elegance for every occasion.
```

### Sport

```text
Built for adventure.
Made for performance.
```

### Heritage

```text
A legacy of craftsmanship.
A future of style.
```

Each card should contain:

```text
image
title
description
View Collection →
```

Do not over-design the cards.

---

# 16. COLLECTION IMAGE STYLE

Use premium photography.

Examples:

```text
Classic:
blue/black elegant watch

Sport:
black/red performance watch

Heritage:
warm steel/gold watch
```

Keep product photography consistent.

Use approximately:

```text
4:5
```

image ratios.

---

# 17. FEATURED WATCH SECTION

Create a wide dark cinematic product section.

Product:

```text
The Orion Automatic
```

Price:

```text
$1,299
```

Description:

```text
A perfect balance of sophistication and performance.
The Orion Automatic features a Swiss movement,
sapphire crystal and a timeless design.
```

CTA:

```text
Add to Cart →
```

## Layout

Desktop:

```text
LEFT:
large watch image

CENTER:
FEATURED
The Orion Automatic
$1,299
description
button

RIGHT:
specifications
```

Specifications:

```text
Swiss Automatic Movement
Sapphire Crystal
Stainless Steel Case & Bracelet
Water Resistant (100m)
Case Diameter: 41mm
```

Add subtle variant swatches:

```text
blue
black
silver
warm metallic
```

Do not turn the section into a complicated product configurator.

---

# 18. CRAFTSMANSHIP SECTION

Create a section explaining product precision.

Use a dark or very light editorial composition.

Heading:

```text
Precision in every detail
```

Eyebrow:

```text
THE DETAILS
```

Body:

```text
From the meticulously finished dial to the
hand-polished case, every element is crafted
with purpose and precision.
```

CTA:

```text
Explore Craftsmanship →
```

Include three detail cards:

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

Use close-up watch imagery.

---

# 19. INTERACTIVE 3D EXPERIENCE SECTION

Create a dark section.

Eyebrow:

```text
INTERACTIVE 3D EXPERIENCE
```

Heading:

```text
Explore in real time
```

Description:

```text
Rotate. Zoom. Discover. Interact with every
angle of the watch in stunning 3D.
```

CTA:

```text
Explore 3D Viewer →
```

Visual:

A large centered watch/product placeholder with a subtle circular interaction/orbit treatment.

Controls:

```text
Rotate
Zoom
Pan
Fullscreen
```

Again:

**This is a visual prototype only.**

Do not spend time implementing a real 3D engine.

---

# 20. BRAND STORY SECTION

Create a cinematic full-width section.

Heading:

```text
More than a watch
```

Supporting line:

```text
A legacy on your wrist.
```

CTA:

```text
Our Story →
```

Use a wide mountain / landscape / watch lifestyle image.

The section should feel editorial and calm.

---

# 21. FOOTER

Create a restrained luxury footer.

Brand:

```text
VELARA
```

Columns:

```text
Collections
Classic
Sport
Heritage

About
Our Story
Craftsmanship
Journal

Support
Contact
Shipping
Returns
Warranty
```

Bottom row:

```text
© 2026 Velara. All rights reserved.
Privacy
Terms
```

Do not overpopulate the footer.

---

# 22. RESPONSIVE BEHAVIOR

The mobile version must be intentionally designed.

Do NOT simply shrink the desktop page.

## Desktop

Use:

```text
1024px+
```

Large editorial compositions.

## Tablet

Use:

```text
768px–1023px
```

Reduce:

- typography
- spacing
- number of columns

## Mobile

Use:

```text
<768px
```

Rules:

```text
16–20px horizontal padding
single-column layouts
48px primary buttons
44px+ touch targets
horizontal product/image scrolling where appropriate
simplified 3D controls
```

---

# 23. MOBILE HERO

Mobile hero should be re-composed.

Order:

```text
THE ORION

Timeless
by Design

Description

Watch image

Explore Collection

Interaction hint
```

Do not attempt to place the watch and text side-by-side.

The watch should remain highly visible.

Hero height can be approximately:

```text
720–820px
```

depending on viewport.

---

# 24. MOBILE COLLECTIONS

Use:

```text
Large featured collection
↓
Horizontal cards OR stacked cards
```

Do not force four desktop cards into one row.

Product imagery should remain large.

---

# 25. MOBILE FEATURED PRODUCT

Use:

```text
Watch image
↓
Product name
↓
Price
↓
Description
↓
Specifications
↓
CTA
```

The CTA should remain easily reachable.

---

# 26. MOBILE 3D SECTION

Keep it visually simple.

Show:

```text
Watch
Rotate
Zoom
```

Do not show five tiny controls that users cannot comfortably tap.

---

# 27. MOTION

Use restrained motion.

Allowed:

- Fade-in
- Small image scale
- Arrow movement
- Section reveal
- Smooth hover transitions
- Very subtle parallax

Avoid:

- Bouncing
- Spinning UI
- Constant floating
- Excessive scroll hijacking
- Text flying in from every direction
- Artificial 3D UI transitions

Suggested durations:

```text
fast: 180ms
normal: 300ms
slow: 500ms
cinematic: 800–1000ms
```

---

# 28. HOVER STATES

Product card:

```text
image scale: approximately 1.02
```

CTA:

```text
subtle background transition
```

Arrow:

```text
translate approximately 4px
```

Do not add large shadows or glow effects.

---

# 29. COMPONENT STRUCTURE

Use reusable components approximately like:

```text
components/
├── layout/
│   ├── Header
│   └── Footer
│
├── home/
│   ├── Hero
│   ├── TrustStrip
│   ├── CollectionsSection
│   ├── FeaturedProduct
│   ├── CraftsmanshipSection
│   ├── ThreeDExperience
│   └── BrandStory
│
└── ui/
    ├── Button
    ├── IconButton
    ├── SectionHeading
    ├── ProductImage
    └── CollectionCard
```

Adapt this to the existing project structure instead of restructuring an existing codebase.

---

# 30. DATA STRUCTURE

Do not hardcode repeated collection/product markup.

Use local data structures for repeated content.

Example conceptual structure:

```text
collections = [
  {
    name,
    description,
    image,
    href
  }
]
```

and:

```text
featuredProduct = {
  name,
  price,
  description,
  image,
  specifications
}
```

For this prototype, local static data is sufficient.

No API is required.

---

# 31. ACCESSIBILITY

Implement:

- Semantic headings
- `alt` text for meaningful images
- Keyboard-accessible buttons
- Visible focus states
- Minimum 44px touch targets
- Sufficient text contrast
- No state communicated through color alone

Respect:

```text
prefers-reduced-motion
```

---

# 32. PERFORMANCE

Do not sacrifice performance for visual effects.

Use:

- Proper image sizing
- Lazy loading below-the-fold images
- Responsive image rendering
- Avoid unnecessary JavaScript
- Avoid huge dependencies
- Avoid autoplay video unless already available and optimized

The hero image can be prioritized.

---

# 33. WHAT THE PROTOTYPE MUST PROVE

When finished, the page should clearly demonstrate:

### Brand

VELARA feels like a credible premium watch brand.

### Visual identity

The light luxury palette and dark cinematic sections work together.

### Product hierarchy

The watch remains the primary visual object.

### Commerce

The user can immediately understand:

```text
what the product is
why it matters
what collections exist
how to explore
how to buy
```

### Responsive quality

Desktop and mobile should both feel intentionally designed.

---

# 34. DO NOT IMPLEMENT YET

Do NOT build:

```text
Authentication
Backend
Database
API calls
Real checkout
Payment gateway
Order management
Wishlist persistence
Account persistence
Real AR
Real 3D engine
CMS
Admin dashboard
```

These belong to later implementation phases.

---

# 35. FINAL QUALITY CHECK

Before declaring the work complete, inspect the prototype at minimum:

```text
Desktop:
1440px
1280px
1024px

Mobile:
390px
375px
```

Check:

- No horizontal overflow
- No broken images
- No clipped text
- No overlapping navigation
- Hero composition works
- Typography hierarchy is consistent
- Buttons are usable
- Product imagery is dominant
- Sections have intentional spacing
- Mobile does not look like compressed desktop
- Dark/light transitions feel deliberate
- Footer is reachable
- No placeholder-looking UI remains where a polished element is expected

---

# 36. FINAL VISUAL TEST

Ask:

> Does this look like a real luxury watch brand that could plausibly launch this website?

If the answer is no, fix:

1. spacing
2. typography
3. imagery
4. hierarchy
5. alignment
6. unnecessary UI
7. excessive effects

Do NOT fix it by adding more gradients, animations, cards, or decorative effects.

---

# 37. COMPLETION REPORT

After implementation, report briefly:

```text
Roger That

Implemented:
- ...
- ...
- ...

Responsive tested:
- Desktop
- Tablet
- Mobile

Not implemented intentionally:
- Backend
- Checkout
- Authentication
- Real 3D
- etc.

Over n Out
```

Do not provide a long explanation unless something requires attention.
