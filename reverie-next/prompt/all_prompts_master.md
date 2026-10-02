# REVERIE — Complete Consolidated Prompts Master Archive


## 01_Velara_Single_Page_Prototype_Prompt.md

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


---

## 02_Watch_Brand_Design_Tokens.md

# Luxury Watch E-Commerce — Design Token System

## 1. Purpose

This document defines the visual design tokens for the complete luxury watch e-commerce website shown in the supplied reference images.

The system combines:

- A **light, warm luxury interface** for the majority of the storefront.
- **Dark cinematic sections** for hero, featured-product, and immersive 3D storytelling.
- Editorial serif typography for luxury/brand statements.
- Clean sans-serif typography for navigation, commerce, specifications, and utility UI.
- Spacious layouts, restrained borders, subtle shadows, premium product photography, and minimal controls.
- Responsive behavior for desktop and mobile.

The design should feel like a **real premium watch brand**, not a generic e-commerce template and not an AI-generated visual concept.

> Important: tokens define the visual system. They do not define business logic, API behavior, database structure, or implementation architecture.

---

# 2. Design Principles

## 2.1 Luxury Through Restraint

Use fewer visual elements, larger whitespace, controlled typography, and subtle contrast.

Avoid:

- Excessive gradients
- Neon colors
- Heavy glassmorphism
- Excessive rounded cards
- Large drop shadows
- Decorative UI without purpose
- Too many accent colors
- Excessive animation

## 2.2 Product Is the Hero

The watch should remain the strongest visual object.

UI should support the product rather than compete with it.

Priority:

1. Product
2. Brand/message
3. Primary action
4. Supporting information
5. Utility/navigation

## 2.3 Editorial + Commerce

The website has two visual modes:

### Editorial Mode

Used for:

- Homepage hero
- Brand storytelling
- Craftsmanship
- Featured watch
- 3D storytelling
- Collection introductions

Characteristics:

- Large imagery
- Large serif typography
- Cinematic photography
- Dark backgrounds where appropriate
- Minimal UI

### Commerce Mode

Used for:

- Collections
- Product listing
- Product detail information
- Cart
- Checkout
- Account
- Order tracking
- Support

Characteristics:

- Light warm background
- High readability
- Clear hierarchy
- Structured grids
- Compact controls
- Strong purchase actions

---

# 3. Color System

The primary storefront palette is light and warm.

Dark surfaces are used intentionally for cinematic sections.

## 3.1 Base Palette

| Token | Hex | Usage |
|---|---|---|
| `color.white` | `#FFFFFF` | Pure white surfaces, selected UI |
| `color.ivory.50` | `#FAF9F6` | Primary page background |
| `color.ivory.100` | `#F5F4F0` | Secondary page background |
| `color.ivory.200` | `#ECEAE6` | Muted surfaces |
| `color.stone.100` | `#DFDBD5` | Soft separators |
| `color.stone.200` | `#CCC7C0` | Borders |
| `color.stone.300` | `#B3ADA5` | Disabled/muted controls |
| `color.stone.400` | `#8A827A` | Secondary text |
| `color.stone.500` | `#6E6861` | Metadata |
| `color.charcoal.700` | `#3A3836` | Strong secondary text |
| `color.charcoal.800` | `#211F1D` | Primary text |
| `color.black.900` | `#0B0B0A` | Primary dark surface |
| `color.black.950` | `#050607` | Cinematic/3D surface |

## 3.2 Warm Neutral Accent

The reference imagery contains subtle warm metallic/earth tones.

| Token | Hex | Usage |
|---|---|---|
| `color.warm.100` | `#E8E1D8` | Warm background |
| `color.warm.200` | `#D6CCC0` | Soft warm surface |
| `color.warm.300` | `#B9AA9B` | Secondary accent |
| `color.warm.400` | `#8D7C6D` | Selected/heritage accent |
| `color.warm.500` | `#6F5D4D` | Strong warm accent |

Use warm accents sparingly.

They should never turn the interface into a gold-themed luxury template.

## 3.3 Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `color.success` | `#4F6B58` | Successful order/payment |
| `color.success.bg` | `#EEF4EF` | Success background |
| `color.warning` | `#8A6B3F` | Low stock / warning |
| `color.warning.bg` | `#F7F1E7` | Warning background |
| `color.error` | `#9A4F4F` | Validation/error |
| `color.error.bg` | `#F8EEEE` | Error background |
| `color.info` | `#536A7A` | Informational state |
| `color.info.bg` | `#EEF3F6` | Information background |

---

# 4. Dark Cinematic Tokens

Dark sections should visually connect to the dark reference image without making the entire website dark.

## 4.1 Dark Surfaces

| Token | Hex | Usage |
|---|---|---|
| `dark.bg` | `#080A0B` | Primary cinematic background |
| `dark.surface` | `#101214` | Dark cards |
| `dark.surface.raised` | `#17191B` | Raised dark UI |
| `dark.surface.hover` | `#1E2022` | Hover state |
| `dark.border` | `#303235` | Dark borders |
| `dark.border.subtle` | `#242629` | Low-contrast separators |

## 4.2 Dark Text

| Token | Hex | Usage |
|---|---|---|
| `dark.text.primary` | `#F5F4F1` | Main text |
| `dark.text.secondary` | `#C7C4BE` | Secondary text |
| `dark.text.muted` | `#97948E` | Metadata |
| `dark.text.disabled` | `#64625E` | Disabled text |

## 4.3 Dark Section Rule

Dark backgrounds should be used for:

- Hero
- Featured product storytelling
- 3D viewer
- Cinematic craftsmanship sections

Do not automatically make:

- Cart
- Checkout
- Account
- Forms
- Order tracking

dark.

These should remain primarily light for usability.

---

# 5. Color Roles

Do not reference raw hex values throughout the UI.

Use semantic roles.

```text
background.primary
background.secondary
background.tertiary
background.inverse

surface.default
surface.raised
surface.subtle
surface.inverse

text.primary
text.secondary
text.muted
text.inverse

border.default
border.subtle
border.strong

action.primary
action.primary.hover
action.secondary
action.secondary.hover
action.inverse
```

Recommended mapping:

```text
background.primary      = color.ivory.50
background.secondary    = color.white
background.tertiary     = color.ivory.100
background.inverse      = color.black.900

text.primary            = color.charcoal.800
text.secondary          = color.stone.500
text.muted              = color.stone.400
text.inverse            = color.white

border.default          = color.stone.200
border.subtle           = color.ivory.200
border.strong           = color.charcoal.700

action.primary          = color.black.900
action.primary.hover    = color.charcoal.800
action.secondary        = color.white
action.secondary.hover  = color.ivory.100
action.inverse          = color.white
```

---

# 6. Typography

The visual direction uses two complementary type families:

1. **Editorial serif**
2. **Modern neutral sans-serif**

## 6.1 Recommended Font Roles

### Display / Editorial

Recommended style:

- High-contrast editorial serif
- Elegant
- Thin-to-regular weight
- Large sizes
- Generous line-height

Possible font families:

```text
"Cormorant Garamond"
"DM Serif Display"
"Playfair Display"
```

Use only one.

### UI / Commerce

Recommended style:

- Clean sans-serif
- Neutral
- Excellent small-size readability

Possible font families:

```text
"Inter"
"Manrope"
"DM Sans"
```

Use only one.

### Recommended default

```text
Display: Cormorant Garamond
UI: Inter
```

The final brand font should be selected once branding is finalized.

---

# 7. Typography Tokens

## 7.1 Display

| Token | Size | Line Height | Weight |
|---|---:|---:|---:|
| `type.display.xl` | 88px | 0.95 | 400 |
| `type.display.lg` | 72px | 0.98 | 400 |
| `type.display.md` | 56px | 1.00 | 400 |
| `type.display.sm` | 44px | 1.05 | 400 |

Desktop hero headline should normally use:

```text
56–88px
```

depending on viewport width.

## 7.2 Heading

| Token | Size | Line Height | Weight |
|---|---:|---:|---:|
| `type.heading.xl` | 48px | 1.05 | 400 |
| `type.heading.lg` | 40px | 1.10 | 400 |
| `type.heading.md` | 32px | 1.15 | 400 |
| `type.heading.sm` | 26px | 1.20 | 400 |
| `type.heading.xs` | 22px | 1.25 | 500 |

## 7.3 Body

| Token | Size | Line Height | Weight |
|---|---:|---:|---:|
| `type.body.lg` | 18px | 1.60 | 400 |
| `type.body.md` | 16px | 1.60 | 400 |
| `type.body.sm` | 14px | 1.50 | 400 |
| `type.body.xs` | 12px | 1.45 | 400 |

## 7.4 UI

| Token | Size | Line Height | Weight |
|---|---:|---:|---:|
| `type.ui.lg` | 16px | 1.25 | 500 |
| `type.ui.md` | 14px | 1.25 | 500 |
| `type.ui.sm` | 12px | 1.20 | 500 |
| `type.ui.xs` | 10px | 1.20 | 500 |

## 7.5 Eyebrow / Label

Use uppercase sparingly.

```text
font-size: 10–12px
font-weight: 500
letter-spacing: 0.14em
text-transform: uppercase
```

Examples:

```text
THE ORION
OUR COLLECTIONS
FEATURED
CRAFTSMANSHIP
```

---

# 8. Typography Rules

### Headlines

Use editorial serif.

### Product names

Use sans-serif or restrained serif depending on context.

### Prices

Use sans-serif.

Prices must be easy to scan.

### Specifications

Always use sans-serif.

### Navigation

Always use sans-serif.

### Buttons

Always use sans-serif.

### Body copy

Use sans-serif.

Do not use serif for long paragraphs.

---

# 9. Spacing System

Use a 4px base unit.

```text
space.1  = 4px
space.2  = 8px
space.3  = 12px
space.4  = 16px
space.5  = 20px
space.6  = 24px
space.8  = 32px
space.10 = 40px
space.12 = 48px
space.16 = 64px
space.20 = 80px
space.24 = 96px
space.32 = 128px
space.40 = 160px
space.48 = 192px
```

## Section Spacing

Desktop:

```text
small section: 64–96px
standard section: 96–128px
cinematic section: 128–192px
```

Mobile:

```text
small section: 40–56px
standard section: 56–80px
cinematic section: 80–120px
```

---

# 10. Layout

## 10.1 Desktop Container

```text
max-width: 1440px
```

Recommended horizontal padding:

```text
1440+ viewport: 48px
1200–1439px: 40px
1024–1199px: 32px
```

## 10.2 Mobile Container

```text
horizontal padding: 20px
```

For very small screens:

```text
minimum horizontal padding: 16px
```

## 10.3 Grid

Desktop product grids:

```text
4 columns: preferred
3 columns: secondary
2 columns: tablet
1 column: mobile
```

Typical desktop gap:

```text
24px
```

Large editorial layouts:

```text
32–48px
```

---

# 11. Responsive Breakpoints

Use these as design breakpoints:

```text
mobile-sm: 360px
mobile:    480px
tablet:    768px
desktop:   1024px
wide:      1280px
ultra:     1440px
```

Do not design around device-specific phone models.

Design around layout behavior.

---

# 12. Border Tokens

The interface uses extremely subtle borders.

```text
border.width.none = 0
border.width.thin = 1px
border.width.medium = 2px
```

Recommended:

```text
border.default = 1px solid #DFDBD5
border.subtle  = 1px solid #ECEAE6
border.dark    = 1px solid #303235
```

Avoid thick decorative borders.

---

# 13. Radius

The references are predominantly sharp/minimal rather than heavily rounded.

Use:

```text
radius.none = 0
radius.sm   = 2px
radius.md   = 4px
radius.lg   = 8px
radius.xl   = 12px
radius.full = 9999px
```

Recommended:

- Buttons: `4px`
- Inputs: `4px`
- Product cards: `4–8px`
- Image cards: `4–8px`
- Pills/filter controls: `9999px`
- Large containers: `8px`

Do not turn every component into a pill.

---

# 14. Shadows

The visual language is mostly flat with very restrained depth.

```text
shadow.none = none

shadow.sm =
0 2px 8px rgba(20, 18, 15, 0.06)

shadow.md =
0 8px 24px rgba(20, 18, 15, 0.08)

shadow.lg =
0 16px 48px rgba(20, 18, 15, 0.10)

shadow.dark =
0 12px 40px rgba(0, 0, 0, 0.25)
```

Use shadows primarily for:

- Dropdowns
- Floating panels
- Mobile menus
- Modals
- Sticky commerce controls

Do not use shadows to make every card appear elevated.

---

# 15. Buttons

## 15.1 Primary Button

Visual:

```text
background: #0B0B0A
text: #FFFFFF
border: none
radius: 4px
```

Height:

```text
desktop: 48px
mobile: 48px
compact: 40px
```

Horizontal padding:

```text
20–24px
```

Typography:

```text
14px
weight: 500
letter-spacing: 0.01em
```

Example:

```text
Explore Collection →
Add to Cart →
Proceed to Checkout →
```

## 15.2 Secondary Button

```text
background: transparent / white
text: #211F1D
border: 1px solid #B3ADA5
radius: 4px
```

## 15.3 Dark Hero Button

For light text on dark hero:

```text
background: #FFFFFF
text: #0B0B0A
```

This matches the visual direction of the reference.

## 15.4 Text Button

No container.

```text
text: #211F1D
underline or arrow
```

Use for:

```text
View Collection →
Learn More →
Explore Craftsmanship →
```

---

# 16. Icon System

Use a thin, premium line-icon style.

Preferred characteristics:

- 1.5px stroke
- Rounded joins
- Minimal geometry
- Consistent 24px bounding box

Core icons:

```text
Search
User
Account
Shopping Bag
Heart
Menu
Arrow Right
Arrow Left
Chevron Down
Chevron Up
Plus
Minus
Close
Rotate
Zoom
Fullscreen
Truck
Shield
Refresh
Headset
Eye
```

Recommended sizes:

```text
16px — inline utility
20px — navigation
24px — standard action
28px — prominent action
32px — hero interaction
```

Avoid mixing icon families.

---

# 17. Header — Desktop

The desktop header should be minimal.

Structure:

```text
[BRAND]

              Home
              Collections
              Men
              Women
              About

                                      Search
                                      Account
                                      Cart
```

Height:

```text
72–88px
```

Horizontal padding:

```text
40–48px
```

Background:

- Light pages: `background.primary`
- Dark hero: transparent / dark overlay

Header should not visually compete with the watch.

---

# 18. Header — Mobile

Mobile header:

```text
[BRAND]                 [Search] [Cart] [Menu]
```

Height:

```text
64px
```

Horizontal padding:

```text
16–20px
```

Do not display the entire desktop navigation.

---

# 19. Mobile Bottom Navigation

For commerce-heavy mobile screens, use:

```text
Home
Collections
Wishlist
Account
Cart
```

Height:

```text
64–72px
```

Background:

```text
#FFFFFF
```

Border:

```text
1px solid #ECEAE6
```

Icons:

```text
20–22px
```

Labels:

```text
10–11px
```

The active item uses the primary text color.

Inactive items use muted text.

---

# 20. Hero Section

The hero is intentionally cinematic.

## Desktop

Recommended:

```text
height: 80–100vh
min-height: 720px
```

Layout:

```text
left:
  eyebrow
  large editorial headline
  description
  CTA

center/right:
  dominant watch

right:
  3D interaction controls
```

The watch should occupy approximately:

```text
45–60% of hero visual area
```

depending on composition.

## Mobile

Recommended:

```text
min-height: 720px
```

Structure:

```text
Brand
↓
Eyebrow
↓
Headline
↓
Short description
↓
Watch
↓
Interaction hint
↓
CTA
```

Do not attempt to preserve the exact desktop composition.

---

# 21. Hero Overlay

For dark cinematic imagery:

```text
overlay.top:
rgba(0,0,0,0.20)

overlay.bottom:
rgba(0,0,0,0.50)
```

Use only when needed for text readability.

The watch must remain visually dominant.

---

# 22. 3D Viewer

The 3D viewer is a first-class component.

## Viewer surface

```text
background: #080A0B
```

## Controls

Desktop:

```text
Rotate
3D View
360° View
AR Try-On
Zoom
Fullscreen
```

Controls should be small and visually quiet.

## Interaction indicator

Use a circular icon with:

```text
width: 32px
height: 32px
border: 1px solid rgba(255,255,255,0.30)
```

## Viewer instruction

Example:

```text
Drag to rotate
```

Use muted white:

```text
rgba(255,255,255,0.70)
```

---

# 23. Product Collection Cards

Collection cards should use strong photography.

Structure:

```text
Image
Collection name
Short description
View Collection →
```

Recommended ratio:

```text
4:5
```

or

```text
3:4
```

Card background:

```text
#F5F4F0
```

Avoid excessive card chrome.

---

# 24. Product Cards

Product card structure:

```text
Image
Wishlist
Product name
Short descriptor
Price
```

Optional:

```text
Rating
Color/variant indicators
```

Product image background should usually be:

```text
#F5F4F0
```

or

```text
#FFFFFF
```

Hover:

- Slight image scale
- Subtle secondary image reveal
- Wishlist transition
- No dramatic animation

---

# 25. Product Detail Page

Recommended structure:

```text
Breadcrumb
↓
Product visual / gallery
↓
Product information
↓
Price
↓
Rating
↓
Key specifications
↓
Variants
↓
Add to Cart
↓
Wishlist
↓
Shipping / warranty information
↓
Overview
↓
Specifications
↓
Craftsmanship imagery
↓
Related products
```

Desktop layout:

```text
LEFT 60%:
product media / 3D

RIGHT 40%:
sticky purchase panel
```

Mobile:

```text
media
↓
name
↓
price
↓
rating
↓
variants
↓
purchase CTA
↓
information
```

---

# 26. Product Gallery

Desktop:

```text
vertical thumbnails + large media
```

Mobile:

```text
horizontal swipe gallery
```

Thumbnail:

```text
64–80px desktop
56–72px mobile
```

Selected thumbnail:

```text
border: 1px solid #211F1D
```

---

# 27. Variant Controls

## Color

Use circular swatches.

```text
size: 28–32px
```

Selected state:

```text
outer ring
```

Do not rely on color alone.

## Strap

Use rectangular selector buttons:

```text
Steel
Leather
Rubber
```

Selected:

```text
dark background
white text
```

Unselected:

```text
white background
dark text
1px border
```

---

# 28. Specification Grid

Use a clean editorial table.

Example:

```text
CASE
Diameter             41mm
Thickness            11.2mm
Material             Stainless Steel

MOVEMENT
Type                 Automatic
Power Reserve        70 Hours

CRYSTAL
Type                 Sapphire

WATER RESISTANCE
Rating               100m
```

Do not use excessive cards for every specification.

---

# 29. Commerce Trust Strip

The reference uses a horizontal reassurance strip.

Use:

```text
Free Shipping
2 Year Warranty
Easy Returns
Dedicated Support
```

Desktop:

```text
4 columns
```

Mobile:

```text
2 columns
```

Use thin separators.

Icons should remain subtle.

---

# 30. Cart

Cart should prioritize clarity.

Desktop:

```text
Product list                 Order Summary
```

Order summary contains:

```text
Subtotal
Shipping
Tax
Discount
Total
Proceed to Checkout
```

Mobile:

```text
Products
↓
Subtotal
↓
Shipping
↓
Total
↓
Sticky checkout CTA
```

Avoid cinematic interactions inside checkout.

---

# 31. Checkout

Checkout should be the simplest page in the system.

Sections:

```text
Contact
Shipping Address
Delivery
Payment
Order Review
```

Order summary should remain visible on desktop.

Mobile should use collapsible order summary.

Primary action:

```text
Continue to Payment
```

or

```text
Place Order
```

---

# 32. Account Dashboard

Desktop:

```text
Sidebar
    Profile
    Orders
    Wishlist
    Addresses
    Payment Methods
    Support
    Settings

Main Content
    Profile overview
    Recent orders
    Wishlist
```

Mobile:

```text
Account header
↓
Menu list
↓
Recent orders
```

Keep account pages significantly more functional and less cinematic.

---

# 33. Order Tracking

Use a clean timeline:

```text
Order Placed
     ↓
Processing
     ↓
Shipped
     ↓
Out for Delivery
     ↓
Delivered
```

Use restrained status indicators.

Do not use large decorative graphics.

---

# 34. Support / FAQ

Structure:

```text
Support hero
Search
FAQ categories
FAQ accordion
Contact options
```

Contact methods:

```text
Live Chat
Email
Phone
```

Support should feel trustworthy rather than flashy.

---

# 35. Footer

Desktop:

```text
Brand statement

Collections
About
Journal
Support

Shipping
Returns
Warranty
Contact

Social
Legal
Privacy
Terms
```

Mobile:

Accordion sections can be used.

Footer should remain clean and spacious.

---

# 36. Image Treatment

Photography is a major part of the visual identity.

## Product Photography

Preferred:

- Neutral warm backgrounds
- Soft directional light
- High detail
- Realistic metal reflections
- Natural shadows
- Accurate watch proportions

Avoid:

- Excessive HDR
- Oversaturated colors
- Artificial neon lighting
- Unrealistic reflections

## Lifestyle Photography

Use:

- Mountains
- Architecture
- Natural environments
- Wrist photography
- Craftsmanship
- Workshop imagery

The imagery should feel photographic rather than synthetic.

---

# 37. Image Aspect Ratios

Recommended:

```text
Hero:
16:9 or full viewport

Product:
4:5

Collection:
3:4

Editorial:
16:9

Thumbnail:
1:1
```

---

# 38. Motion Tokens

Motion should feel expensive and controlled.

## Duration

```text
motion.instant = 100ms
motion.fast    = 180ms
motion.normal  = 300ms
motion.slow    = 500ms
motion.cinema  = 800–1200ms
```

## Easing

UI:

```text
ease-out
```

Premium transitions:

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

3D / cinematic:

```text
slow ease-out
```

Avoid bouncing animations.

---

# 39. Hover Behavior

Desktop hover should be subtle.

Examples:

```text
Product image:
scale 1.02

Button:
background transition

Link:
arrow moves 4px

Card:
image transition only
```

Never make the interface feel like a gaming UI.

---

# 40. Scroll Behavior

Use smooth scrolling for editorial sections.

However:

- Do not hijack scrolling indefinitely.
- Users must be able to reach commerce content quickly.
- Scroll-driven 3D should have clear boundaries.
- Mobile should use simpler scroll choreography.

---

# 41. Reduced Motion

When:

```text
prefers-reduced-motion: reduce
```

Disable or reduce:

- Camera choreography
- Parallax
- Scroll-scrub animation
- Large page transitions
- Auto-rotation

Keep:

- Basic 3D interaction
- Essential state transitions
- Button feedback

---

# 42. Mobile Design Rules

Mobile is a separate composition.

## Use

- 16–20px side padding
- 48px minimum primary CTA height
- 44px+ touch targets
- One-column product layout
- Swipe galleries
- Sticky purchase CTA
- Bottom navigation where appropriate

## Avoid

- Desktop grids squeezed into mobile
- Tiny text
- Tiny icons
- Horizontal overflow
- Excessive 3D controls
- Long cinematic sequences before shopping

---

# 43. Mobile Sticky Purchase Bar

On product pages:

```text
[Price]             [Add to Cart]
```

Height:

```text
64–72px
```

Position:

```text
bottom: 0
```

Background:

```text
#FFFFFF
```

Top border:

```text
1px solid #ECEAE6
```

This keeps purchasing accessible while exploring the product.

---

# 44. Accessibility Tokens

Minimum target size:

```text
44 × 44px
```

Recommended:

```text
48 × 48px
```

Body text:

```text
minimum 14px
```

Important text:

```text
16px+
```

Do not communicate state through color alone.

Examples:

```text
Selected swatch:
color + ring

Error:
color + icon + message

Order status:
color + label
```

---

# 45. Focus State

Keyboard focus must be visible.

Recommended:

```text
outline: 2px solid #536A7A
outline-offset: 3px
```

Never remove focus indicators without replacement.

---

# 46. Z-Index Scale

```text
z.base        = 0
z.content     = 10
z.header      = 100
z.dropdown    = 200
z.sticky      = 300
z.modal       = 500
z.toast       = 700
z.loader      = 900
```

Keep the hierarchy predictable.

---

# 47. Component Token Summary

## Buttons

```text
button.height.sm = 40px
button.height.md = 48px
button.height.lg = 52px

button.radius = 4px

button.padding.x = 24px
button.padding.mobile.x = 20px
```

## Inputs

```text
input.height = 48px
input.radius = 4px
input.padding.x = 16px
input.border = #CCC7C0
```

## Cards

```text
card.radius = 4–8px
card.border = #ECEAE6
card.background = #FFFFFF
```

## Product Images

```text
product.image.background = #F5F4F0
product.image.radius = 4px
```

---

# 48. Design Token Naming Convention

Use semantic token names instead of visual names inside components.

Good:

```text
var(--color-text-primary)
var(--color-background-primary)
var(--color-border-default)
var(--color-action-primary)
```

Avoid:

```text
var(--black)
var(--cream)
var(--beige)
var(--dark-gray)
```

Primitive colors may exist underneath, but components should consume semantic tokens.

---

# 49. Recommended CSS Variable Structure

```css
:root {
  --color-bg-primary: #FAF9F6;
  --color-bg-secondary: #FFFFFF;
  --color-bg-tertiary: #F5F4F0;
  --color-bg-inverse: #0B0B0A;

  --color-text-primary: #211F1D;
  --color-text-secondary: #6E6861;
  --color-text-muted: #8A827A;
  --color-text-inverse: #FFFFFF;

  --color-border-default: #DFDBD5;
  --color-border-subtle: #ECEAE6;
  --color-border-strong: #6E6861;

  --color-action-primary: #0B0B0A;
  --color-action-primary-hover: #211F1D;
  --color-action-secondary: #FFFFFF;

  --color-dark-bg: #080A0B;
  --color-dark-surface: #101214;
  --color-dark-border: #303235;
  --color-dark-text-primary: #F5F4F1;
  --color-dark-text-secondary: #C7C4BE;

  --font-display: "Cormorant Garamond", serif;
  --font-ui: "Inter", sans-serif;

  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  --motion-fast: 180ms;
  --motion-normal: 300ms;
  --motion-slow: 500ms;
  --motion-cinematic: 1000ms;
}
```

---

# 50. Page-Level Visual Rules

## Homepage

Primary visual mode:

```text
Dark cinematic hero
+
Light commerce sections
+
Dark featured-product sections
+
Light collections
```

## Collections

Primary mode:

```text
Light
```

Use dark photography banners sparingly.

## Product

Primary mode:

```text
Light
```

3D viewer can use:

```text
Dark cinematic surface
```

## Cart

```text
Light
```

## Checkout

```text
Light
```

## Account

```text
Light
```

## Support

```text
Light
```

## Brand / Story

Can use:

```text
Dark + cinematic
```

---

# 51. Visual Hierarchy

Every screen should have one dominant focal point.

### Homepage

```text
Watch
↓
Headline
↓
CTA
```

### Collections

```text
Collection imagery
↓
Product grid
↓
Product information
```

### Product page

```text
Watch
↓
Product name
↓
Price
↓
Purchase CTA
↓
Specifications
```

### Cart

```text
Products
↓
Total
↓
Checkout CTA
```

### Checkout

```text
Order
↓
Payment
↓
Confirmation
```

---

# 52. What Not To Do

Do not introduce:

- Purple AI gradients
- Neon blue/purple glows
- Glassmorphism everywhere
- Floating 3D cards everywhere
- Excessive rounded containers
- Excessive shadows
- Oversized icons
- Animated text on every section
- Artificial futuristic HUD elements
- Random gold gradients
- Generic SaaS dashboard styling
- Generic Shopify-like storefront styling
- AI-chat bubbles on every page

The visual target is **luxury watch editorial commerce**, not a futuristic technology website.

---

# 53. Final Design Direction

The final visual system should combine the three supplied reference directions:

```text
LIGHT LUXURY COMMERCE
        +
DARK CINEMATIC PRODUCT STORYTELLING
        +
REAL-TIME 3D WATCH EXPERIENCE
```

The resulting website should feel:

```text
Elegant
Quiet
Premium
Editorial
Precise
Photographic
Product-focused
Modern
Interactive
Trustworthy
```

It should NOT feel:

```text
Futuristic
Neon
Over-animated
AI-generated
Generic
SaaS-like
Template-driven
```

---

# 54. Final Experience Model

```text
                    WATCH BRAND
                         │
          ┌──────────────┴──────────────┐
          │                             │
   BRAND EXPERIENCE              COMMERCE EXPERIENCE
          │                             │
     Cinematic Hero                 Collections
          │                             │
     3D Storytelling                 Products
          │                             │
     Craftsmanship                   Product Detail
          │                             │
     Brand Story                     Cart
          │                             │
          └──────────────┬──────────────┘
                         │
                     CHECKOUT
                         │
                       ORDER
                         │
                    ACCOUNT
```

The visual language should remain consistent across all of these surfaces.

---

# 55. Final Token Priority

If there is ever a conflict between visual effects and usability, follow this order:

```text
1. Product clarity
2. Readability
3. Navigation
4. Purchase usability
5. Brand consistency
6. Animation
7. Decorative effects
```

Luxury should come from **craft, spacing, typography, photography, interaction quality, and restraint** — not from adding more visual effects.


---

## 03_Velara_Refinement_Prompt.md

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


---

## 04_Reverie_Dribbble_Interaction_Spec.md

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


---

## 05_Reverie_3D_Hero_Master_Spec.md

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


---

## 06_Reverie_R01_Orion_3D_Asset_Spec.md

# REVERIE --- R01 Orion Hero 3D Asset Specification

## Required asset

Filename: `reverie-r01-orion.glb`

Recommended path: `public/models/reverie-r01-orion.glb`

## Model

Original luxury mechanical wristwatch design for Reverie.

Include where appropriate: - case - bezel - lugs - crown - dial -
hour/minute/seconds hands - indices - sapphire-like crystal - bracelet
or premium leather strap - clasp - caseback - visible mechanical
components if the design includes them

Do not copy an existing commercial watch model.

## Materials

Use separate logical materials where practical: - polished metal -
brushed metal - titanium/ceramic if applicable - dial - hands -
indices - crystal - strap/bracelet - movement

Metal must look physically believable, not like chrome plastic.

Crystal should be restrained and readable, not an exaggerated glass
effect.

## Geometry

Use clean topology and sufficient bevels for realistic highlights.

Avoid unnecessary subdivision and invisible internal geometry.

## Optimization

Preferred: - ideally below 10 MB - acceptable prototype range around
10--15 MB - compressed textures - Draco or Meshopt where useful -
KTX2/Basis textures where useful - no unnecessary 8K textures

## Orientation

Export with a consistent orientation, but let the web implementation
normalize scale, rotation, and framing.

## Product views

The model should support: 1. front three-quarter 2. crown/side 3. dial
detail 4. rear/caseback 5. movement/craftsmanship if present

## Pre-delivery check

Before giving the GLB to Antigravity: - inspect in Blender or a glTF
viewer - verify normals - verify materials - verify textures - verify
scale - verify origin - verify no missing dependencies - verify it loads
without warnings

## Important

The final GLB is the most important external dependency for matching the
quality of the supplied 3D reference. Do not ask Antigravity to invent
the production-quality watch model if a final GLB is required.


---

## 07_Reverie_Scroll_Sequence_Integration_Prompt.md

# Reverie — Existing Website Scroll-Linked Hero Integration Prompt

## Objective

Integrate the existing scroll-linked image-sequence technique into the **current Reverie website** without rebuilding, redesigning, or replacing the existing website.

The existing Reverie website is already built.

The goal is to **add the supplied scroll-controlled frame-sequence behavior to the existing hero section only**, while preserving everything else.

The Google Flow video has already been divided into individual frames, and those frames are already available in the project root.

---

## Critical Rule: Integrate, Do Not Rebuild

Before making any changes:

1. Audit the existing Reverie project.
2. Identify the current homepage/hero implementation.
3. Identify the existing routing, components, styling, animation system, asset structure, and responsive behavior.
4. Identify whether GSAP, ScrollTrigger, Lenis, Three.js, or any other animation infrastructure already exists.
5. Reuse existing infrastructure wherever possible.
6. Do not create duplicate animation libraries, duplicate scroll systems, duplicate navigation, or duplicate hero components.

### Do NOT

- rebuild the entire website
- redesign the website
- replace the existing navigation
- replace the existing typography
- replace the existing ecommerce UI
- change the product/catalog structure
- change existing pages
- remove existing functionality
- replace the existing design system
- introduce unrelated animations
- create a second homepage
- create a separate demo page

**Only integrate the scroll-linked image sequence into the existing Reverie hero.**

---

# 1. Locate the Existing Frame Assets

The Google Flow animation has already been divided into individual frames.

First inspect the project and determine:

- exact frame folder
- filename pattern
- total frame count
- image dimensions
- image format
- numbering convention
- total asset size
- whether frames are continuous

Do not assume the folder name or filename pattern.

Do not rename or delete the original source frames unless absolutely necessary.

If optimized derivative assets are required for browser performance, preserve the originals and create optimized copies.

---

# 2. Use the Frame Sequence for the Existing Hero

The supplied frame sequence should become the **scroll-controlled visual animation of the existing Reverie hero**.

Render the frames onto an **HTML canvas**, not as a long list of `<img>` elements.

The canvas must be integrated into the current hero rather than creating a completely new hero design.

The existing hero's:

- layout
- typography
- navigation
- product information
- buttons
- spacing
- responsive behavior
- visual identity

should remain intact unless a very small adjustment is technically necessary to accommodate the canvas.

---

# 3. Scroll-to-Frame Behavior

Map the user's scroll position to the frame index.

Scrolling down:

```text
first frame
→ next frame
→ next frame
→ ...
→ final frame
```

Scrolling up:

```text
final frame
→ previous frame
→ previous frame
→ ...
→ first frame
```

The animation must be reversible.

If the user stops scrolling, the animation should stop at the corresponding frame.

Do not create an independent autoplay animation.

Do not continuously rotate or animate the watch independently of the supplied sequence.

---

# 4. Canvas Rendering

Use one canvas for the hero sequence.

The canvas should:

- fill the existing hero visual area
- preserve the source image aspect ratio
- never stretch the watch
- never distort the frames
- remain sharp on high-DPI displays
- resize correctly with the viewport
- work on desktop and mobile

Use `requestAnimationFrame` for rendering.

**Never redraw directly inside a scroll event.**

The scroll handler/ScrollTrigger should update the desired frame state.

The canvas rendering loop should determine whether the frame actually changed and repaint only when necessary.

Conceptually:

```text
Scroll
  ↓
scroll progress
  ↓
desired frame index
  ↓
if frame index changed
  ↓
requestAnimationFrame
  ↓
draw frame to canvas
```

---

# 5. Scroll Container

Use a tall scroll container around the existing hero.

Target approximately:

```text
400vh
```

but do not blindly force 400vh if the existing Reverie layout requires a different value.

The important behavior is:

```text
Tall scroll section
        ↓
Sticky/full-screen hero visual
        ↓
Scroll controls frame sequence
        ↓
Hero releases
        ↓
Existing next section continues normally
```

The hero visual should remain sticky while the user scrolls through the sequence.

Do not make the entire website sticky.

Only the relevant hero/sequence region should use the pinned/sticky behavior.

---

# 6. Keep the Existing Reverie Hero

This is an **integration task**.

Do not replace the existing hero with a generic image-sequence demo.

Place the canvas into the appropriate existing hero visual layer.

If the current structure is conceptually:

```text
ReverieHero
├── HeroVisual
├── HeroContent
├── HeroNavigation
└── HeroCTA
```

integrate the canvas inside the existing `HeroVisual` area.

Do not create an unrelated replacement component unless the existing architecture genuinely requires it.

---

# 7. Preload Behavior

Preload every desktop frame before starting the sequence.

Show a simple loading state while frames are loading.

The loading state must be consistent with the existing Reverie visual language.

Do not create a large generic loading animation.

Prefer something minimal such as:

```text
REVERIE

Loading...
```

or an understated progress indicator.

If displaying progress, calculate it from the actual number of loaded frames.

Do not fake loading percentages.

The hero should not begin the full sequence until the required frames are ready.

---

# 8. Mobile Behavior

For viewports below:

```text
768px
```

load every second frame instead of every frame.

Example:

```text
Desktop:
frame-0001
frame-0002
frame-0003
frame-0004
frame-0005
...

Mobile:
frame-0001
frame-0003
frame-0005
frame-0007
...
```

The implementation must correctly map the reduced frame set to the full scroll progress.

Do not stretch or distort the frames to compensate.

Do not create a completely different animation for mobile.

Use the same sequence concept with reduced frame density.

---

# 9. Reduced Motion

Respect:

```text
prefers-reduced-motion: reduce
```

When reduced motion is enabled:

- do not run the scroll-linked animation
- show one appropriate static frame
- keep the existing hero layout
- preserve the existing product information and CTA
- avoid unnecessary motion

Prefer a strong assembled Reverie watch frame rather than an exploded frame.

---

# 10. Frame Mapping Comments

Keep the scroll-to-frame mapping easy to adjust.

Add short comments around the relevant logic.

For example:

```js
// Scroll progress 0 → 1 maps directly to frame 0 → last frame.
// Increase the hero scroll distance to make the sequence feel slower.
// Decrease it to make the sequence feel faster.
```

The important thing is that a developer can quickly identify:

- where scroll progress is calculated
- where frame index is calculated
- where scroll speed can be adjusted
- where mobile frame skipping is configured

---

# 11. Animation Speed

Do not hard-code unnecessary complexity.

Make the hero scroll duration easy to adjust.

Conceptually:

```text
hero scroll distance ↑
→ animation feels slower

hero scroll distance ↓
→ animation feels faster
```

If the existing implementation uses GSAP ScrollTrigger, use its existing architecture rather than introducing a second scroll engine.

If Lenis already exists in the project, make sure the scroll-linked animation works correctly with it.

Do not install another smooth scrolling library if one already exists.

---

# 12. GSAP / ScrollTrigger

If GSAP and ScrollTrigger are already installed:

**reuse them.**

Do not create a second GSAP setup.

If the current Reverie website already has a scroll animation system, integrate with it.

The desired behavior is equivalent to:

```text
ScrollTrigger
    ↓
scrubbed scroll progress
    ↓
frame index
    ↓
canvas render
```

Use pinning/sticky behavior only for the hero sequence.

Do not convert unrelated sections of the website to ScrollTrigger.

---

# 13. Existing GLB

The existing Reverie GLB must remain in the project.

Do not delete it.

Do not break its current integration.

However, the Google Flow frame sequence is the visual source for this particular hero animation.

Do not render the GLB simultaneously behind the frame sequence unless the existing architecture specifically requires it.

The GLB remains available for:

- future interactive 3D
- product detail pages
- 3D product inspection
- future hero iterations

The objective here is simply to integrate the supplied cinematic frame sequence into the current hero.

---

# 14. Existing Website Assets

Do not replace existing product images, logos, icons, fonts, or UI assets unless required.

The Google Flow frames are specifically for the hero sequence.

Do not automatically use them in:

- product cards
- collection pages
- product detail pages
- cart
- checkout
- footer
- recommendations
- unrelated editorial sections

Keep their usage isolated to the hero.

---

# 15. Performance

Optimize the implementation without changing the visual quality.

Avoid:

- hundreds of DOM `<img>` elements
- React state updates on every scroll tick
- direct canvas drawing inside scroll callbacks
- repeated image decoding
- repeatedly creating Image objects
- unnecessary layout recalculation
- unnecessary component re-renders
- duplicate animation loops

Use:

- one canvas
- preloaded image assets
- `requestAnimationFrame`
- frame-index comparison
- efficient canvas drawing
- appropriate device pixel ratio
- cleanup on unmount

Do not sacrifice the luxury-watch visual quality just to reduce asset size.

---

# 16. Canvas Resize

Handle:

```text
window resize
orientation change
desktop → mobile
mobile → desktop
```

correctly.

Recalculate:

- canvas dimensions
- device pixel ratio
- image scaling
- image positioning
- crop/contain behavior

The watch must never appear stretched.

The source aspect ratio must remain intact.

---

# 17. Cleanup

When the hero component is unmounted:

- remove ScrollTrigger instances created by this hero
- cancel animation frames
- remove resize listeners
- release references that are no longer needed
- avoid memory leaks
- avoid duplicate initialization if the user navigates back to the homepage

Do not destroy global animation systems that belong to the rest of the application.

Only clean up resources owned by this hero integration.

---

# 18. Browser Verification

After implementation, actually run the existing website and inspect the result.

Verify:

### Desktop

- first frame loads
- loading state works
- scrolling advances frames
- scrolling backward reverses frames
- hero remains pinned/sticky
- final frame displays correctly
- hero releases naturally
- existing next section remains intact

### Mobile

- every-second-frame behavior works
- frame mapping remains correct
- no stretched images
- no horizontal overflow
- no severe frame skipping
- hero remains usable

### Accessibility

- reduced-motion fallback works
- existing keyboard interaction remains intact
- existing navigation remains intact

### Technical

- no console errors
- no broken imports
- no broken routes
- no duplicate animation systems
- no memory leak
- no unnecessary re-renders

---

# 19. Do Not Change the Existing Website

This is the most important instruction.

The current Reverie website has already been built.

**Do not start over.**

Do not reinterpret the design.

Do not rebuild the homepage.

Do not replace the current components.

Do not change the existing visual language.

Do not change the ecommerce experience.

Do not remove existing functionality.

Only add the scroll-linked frame-sequence capability to the existing hero.

If something already exists that performs part of this functionality, **modify and extend it instead of creating a duplicate.**

---

# 20. Implementation Process

Follow this order:

### Step 1 — Audit

Inspect the current repository.

Report:

- current framework
- hero component
- animation libraries
- scroll system
- frame assets
- existing asset paths
- relevant files that will need modification

### Step 2 — Plan

Before making broad changes, identify the smallest set of files required.

Prefer modifying existing hero files.

### Step 3 — Integrate

Add the canvas frame-sequence system to the existing hero.

### Step 4 — Connect Scroll

Connect scroll progress to frame index.

### Step 5 — Add Loading

Add frame preloading and the existing Reverie-style loading state.

### Step 6 — Add Mobile

Implement every-second-frame loading below 768px.

### Step 7 — Add Reduced Motion

Implement the static-frame fallback.

### Step 8 — Verify

Run the website and test the complete experience.

### Step 9 — Fix

Resolve visual or technical issues without expanding the scope.

---

# 21. Final Acceptance Criteria

The task is complete only when:

- [ ] Existing Reverie website remains intact
- [ ] Existing navigation remains intact
- [ ] Existing ecommerce functionality remains intact
- [ ] Existing typography remains intact
- [ ] Existing design system remains intact
- [ ] Google Flow frames are found and used
- [ ] Frames render through a canvas
- [ ] Frames are preloaded appropriately
- [ ] Scroll position controls frame position
- [ ] Scrolling backward reverses the animation
- [ ] Hero uses sticky/pinned behavior
- [ ] Canvas maintains aspect ratio
- [ ] Desktop works
- [ ] Mobile loads every second frame
- [ ] Reduced-motion fallback works
- [ ] Existing GLB remains intact
- [ ] No duplicate animation systems are introduced
- [ ] No console errors
- [ ] No horizontal overflow
- [ ] No unrelated website sections are changed
- [ ] Hero releases naturally into the existing next section

---

# Final Instruction to Antigravity

**Do not rebuild the Reverie website.**

This is an enhancement to the existing website.

Inspect the current implementation first.

Then integrate the supplied Google Flow frame sequence into the existing hero using a canvas and scroll-linked frame progression.

Preserve everything else.

The final result should feel as though the scroll-controlled cinematic watch sequence was part of the Reverie website from the beginning.


---

## 08_Asset_Implementation_Instructions_R01_Orion.md

# Asset Implementation Instructions — R01 Orion GLB

> **Source**: User Instruction Prompt (Step 597)

ASSET IMPLEMENTATION INSTRUCTIONS — REVERIE

The provided GLB is the primary hero product asset. Treat it as the source of truth for the R01 Orion watch.

3D HERO

Use the supplied .glb directly with Three.js/GLTFLoader.
Do not replace the GLB with a fake 2D image, CSS mockup, video, or simulated 3D.
Do not add artificial spinning that runs continuously.
The user's scroll should control the cinematic sequence.
Use GSAP + ScrollTrigger to scrub the 3D scene according to scroll progress. ScrollTrigger supports scrubbed and pinned scroll experiences.
Use the actual model's geometry/materials and preserve its proportions.
Add premium lighting/reflections that make the metal, crystal, dial and leather physically believable.
Keep the watch as the visual focal point.

SCROLL STORY

Build the hero as a controlled product film:

Arrival — watch enters subtly from darkness.
Hero reveal — front/three-quarter view becomes dominant.
Craftsmanship — camera moves closer to dial/case details.
Rotation — controlled rotation reveals case thickness and side profile.
Caseback — reveal the rear/exhibition caseback if the supplied GLB contains it.
Final product composition — settle into a clean ecommerce product position.
Transition — move naturally into the next homepage section.

The animation must be scroll-controlled, not an autoplay animation.

OTHER PRODUCT ASSETS

Do not generate random replacement watches.

For now:

R01 Orion = supplied GLB + matching product photography.
Other watch products can use high-quality product images as placeholders.
Structure the asset system so additional .glb models can be added later without rewriting the hero architecture.

Suggested structure:

/public/
/models/
reverie-r01-orion.glb
/images/
/products/
/r01-orion/
front.webp
three-quarter.webp
side.webp
back.webp
detail-dial.webp
detail-movement.webp
/textures/
/icons/

IMAGE ASSETS

Product images must look like real luxury watch photography:

dark neutral studio
realistic metal reflections
realistic sapphire/crystal
realistic leather/bracelet materials
controlled shadows
no AI-looking artifacts
no excessive glow
no floating particles
no unnecessary decorative effects
no text baked into product images

Use WebP/AVIF where appropriate for web delivery.

IMPORTANT

The website should not look like an AI-generated concept page.

It should feel like a real luxury watch ecommerce website where the product itself is the spectacle.

Motion must support the product rather than decorate the page.

Keep navigation, typography, pricing, buttons and supporting UI extremely restrained.

Do not add animations merely because an animation is technically possible.

PERFORMANCE

Treat the GLB as a production web asset. Three.js recommends glTF/GLB for runtime delivery, and GLTFLoader supports compressed glTF workflows such as Draco and Meshopt.

Optimize the model/textures where necessary, but do not visibly reduce the luxury quality of the watch.

Cap device pixel ratio appropriately, especially on mobile.

Do not update React state every animation frame.

Dispose Three.js resources correctly when the scene/component is destroyed.

MOBILE

Mobile is not simply the desktop layout scaled down.

Create a dedicated mobile composition:

watch remains large and prominent
camera framing adjusted for portrait screen
UI remains minimal
scroll interaction remains smooth
reduce unnecessary 3D complexity if required for performance
respect prefers-reduced-motion

ASSET RULE

Never invent missing assets and silently substitute them.

If an asset is missing, clearly identify it as a placeholder and continue building the architecture around the correct asset path.

One more thing I'd tell it

Because your goal is the Dribbble 3D luxury hero, add this at the end:

REFERENCE BEHAVIOR

Use the supplied Dribbble 3D Luxury Watch Hero reference as the visual/interaction direction: minimal interface, oversized luxury watch, cinematic composition, controlled transitions, strong depth, sophisticated typography and scroll-triggered movement.

Do not copy branding, artwork, text, or proprietary assets from the reference. Recreate the interaction principles and level of polish using Reverie's own R01 Orion product.

The final result should feel like:

“A luxury product film wrapped inside an extremely simple ecommerce interface.”


---

## 09_Hero_Frame_Sequence_Implementation.md

# Reverie Hero Frame Sequence Implementation Spec

> **Source**: User Instruction Prompt (Step 675)

REVERIE — HERO FRAME SEQUENCE IMPLEMENTATION

IMPORTANT: USE THE EXISTING FRAME ASSETS ONLY FOR THE HERO



I have already created the cinematic Reverie watch animation in Google Flow and divided the resulting video into individual image frames.



The frames have already been placed in the ROOT PROJECT FOLDER.



Your job is to inspect the project, find the frame assets, and use them to build the REVERIE HOMEPAGE HERO ONLY.



DO NOT replace these frames with another animation.

DO NOT regenerate the animation.

DO NOT create a new video.

DO NOT use the GLB for the hero animation if the frame sequence provides the visual sequence.

DO NOT add random 3D effects or decorative animations.



The supplied frame sequence is the source of truth for the hero animation.



==================================================

1. FIRST — AUDIT THE FRAME ASSETS

==================================================



Before changing anything:



1. Inspect the root project folder.

2. Identify all image frames belonging to the Google Flow sequence.

3. Determine:

   - total frame count

   - filename pattern

   - image dimensions

   - image format

   - file size

   - ordering

   - whether numbering starts at 0 or 1

4. Verify that the frames form a continuous sequence.

5. Do not rename or delete the original frames unless absolutely necessary.

6. If the frames are in a format unsuitable for efficient browser delivery, create an optimized derivative set while preserving the originals.



Example:



frame_0001.png

frame_0002.png

frame_0003.png

...

frame_0120.png



The exact naming may be different. Detect the actual naming automatically.



==================================================

2. HERO MUST USE THE FRAME SEQUENCE

==================================================



Implement the frames as a scroll-controlled cinematic image sequence.



Preferred implementation:



Canvas-based rendering.



Load the frame sequence into memory progressively and draw the appropriate frame to a canvas according to scroll progress.



Use:



GSAP

GSAP ScrollTrigger

Canvas



GSAP ScrollTrigger should control the sequence using scrubbed scroll progress.



Reference behavior:



scroll position

      ↓

ScrollTrigger progress

      ↓

frame index

      ↓

canvas renders corresponding frame



Do NOT play the sequence as a normal autoplay video.



The user must be able to control the cinematic sequence by scrolling.



GSAP ScrollTrigger supports `scrub` to link animation progress to scrollbar position and `pin` to hold the hero in place while the sequence progresses. Use this behavior for the hero. 



==================================================

3. HERO STRUCTURE

==================================================



Create a dedicated hero section such as:



<ReverieHero>

    <HeroFrameCanvas />

    <HeroOverlay />

    <HeroNavigation />

    <HeroProductInfo />

</ReverieHero>



Do not spread the frame-sequence logic throughout the application.



Keep it isolated inside the hero system so it can be maintained or replaced later.



==================================================

4. SCROLL EXPERIENCE

==================================================



The hero should behave like a cinematic product film.



Recommended structure:



HERO START

↓

Frame 1



The watch begins in the opening composition from the supplied sequence.



↓ SCROLL



Frames progress smoothly.



↓

Watch movement / reveal



↓

Detail / craftsmanship section



↓

Mechanical / exploded sequence



↓

Fully exploded final frame



↓

Final hero state



↓

Hero releases



↓

Next homepage section appears.



The final frame of the supplied sequence must remain visible until the hero section releases.



Do not abruptly jump from the final frame to the next section.



==================================================

5. PIN THE HERO

==================================================



Create a tall scroll container and pin the visual hero while the frame sequence progresses.



For example:



<section class="hero-sequence">

    <div class="hero-sticky">

        <canvas />

        <hero-content />

    </div>

</section>



The exact scroll duration must be determined from the number of frames and the desired cinematic pacing.



Do not blindly use a fixed value if it produces an unnatural experience.



The hero should feel substantial and cinematic without making the user scroll an unnecessarily huge distance.



==================================================

6. FRAME MAPPING

==================================================



Map scroll progress continuously across the entire frame sequence.



Conceptually:



progress = 0

→ first frame



progress = 0.25

→ approximately 25% through frames



progress = 0.50

→ approximately 50% through frames



progress = 0.75

→ approximately 75% through frames



progress = 1

→ final frame



Use:



frameIndex = Math.round(progress * (frameCount - 1))



Do not skip frames unnecessarily.



Do not interpolate the actual image content.



The sequence itself provides the animation.



==================================================

7. CANVAS

==================================================



Use a single canvas for the cinematic sequence.



Canvas should:



- fill the hero viewport

- preserve the original frame aspect ratio

- use `object-fit: cover`-equivalent behavior

- keep the watch correctly positioned

- avoid stretching

- avoid distortion

- remain crisp on high-DPI displays

- adapt to desktop and mobile



Calculate the correct scale and crop dynamically based on:



canvas width

canvas height

frame width

frame height



Never stretch the watch.



==================================================

8. IMAGE LOADING

==================================================



Do NOT load hundreds of huge images simultaneously if doing so causes memory problems.



Implement intelligent loading.



Recommended approach:



1. Load the first frame immediately.

2. Begin loading nearby frames.

3. Progressively preload the rest.

4. Prioritize frames close to the current scroll position.

5. Display a proper loading state until enough frames are available for the hero to begin.

6. Avoid blocking the entire website while every frame loads.



If the sequence is small enough to safely preload entirely, you may preload the complete sequence.



Choose based on the actual frame count, dimensions and total asset size you find during the audit.



==================================================

9. LOADING EXPERIENCE

==================================================



Create a minimal Reverie loading state.



Example:



REVERIE



Loading experience...



or a minimal percentage indicator.



Do not create an oversized animated loader.



The loader should disappear once the hero has enough frames to begin smoothly.



If useful, display actual loading progress based on frames loaded.



Do not fake loading percentages.



==================================================

10. FRAME QUALITY

==================================================



Preserve the quality of the supplied frames.



Do not:



- heavily compress them

- blur them

- add filters

- add fake grain

- add glow

- add particles

- add artificial lens flare

- alter the watch

- recolor the watch

- add CGI effects



The Google Flow sequence is the visual source of truth.



==================================================

11. HERO UI

==================================================



Keep the interface extremely minimal.



The watch is the hero.



Navigation should not compete with it.



Use the existing Reverie design system.



Suggested:



REVERIE



Collections

Watches

Maison



[Menu]



Hero product information should be minimal.



Example:



R01 — ORION



AUTOMATIC

40MM



EXPLORE R01



Do not cover important portions of the watch with text.



==================================================

12. TYPOGRAPHY

==================================================



Use the existing Reverie typography system.



Display:



Cormorant Garamond



UI/body:



Inter



Technical information:



IBM Plex Mono



Do not introduce another typography system.



==================================================

13. HERO TEXT ANIMATION

==================================================



Text animation should be subtle.



The frame sequence is the primary animation.



Text may:



- fade in

- move a few pixels

- fade out

- change opacity

- transition between stages



Do NOT animate every UI element dramatically.



Do not make the page feel like an AI-generated motion graphics template.



The desired feeling is:



A luxury product film wrapped inside an extremely simple ecommerce interface.



==================================================

14. IMPORTANT — NO CONSTANT SPIN

==================================================



Do not continuously rotate the watch independently of the supplied sequence.



The frames already contain the intended motion.



The user's scroll controls the cinematic experience.



If the user stops scrolling:



the visual should stop at that frame.



If the user scrolls backward:



the sequence should reverse naturally.



==================================================

15. MOBILE

==================================================



This is a mobile-first website.



Do not simply shrink the desktop hero.



Check the actual frame composition on mobile.



The watch must remain:



- large

- visible

- centered appropriately

- undistorted

- visually dominant



If the source frames are landscape and crop badly on mobile, intelligently position/crop the canvas rather than stretching it.



Do not create a separate unrelated animation for mobile.



If absolutely necessary, use responsive framing/cropping.



==================================================

16. REDUCED MOTION

==================================================



Respect:



prefers-reduced-motion



For reduced-motion users:



do not force the full cinematic scroll animation.



Show an appropriate static frame, preferably the strongest assembled hero frame, with minimal UI transitions.



==================================================

17. PERFORMANCE

==================================================



This is extremely important.



Do not:



- create hundreds of DOM <img> elements

- update React state on every animation frame

- repeatedly create/destroy images during scrolling

- decode the same image repeatedly

- create unnecessary canvas contexts

- trigger layout recalculation on every scroll event



Use a single canvas and update only the current frame.



GSAP ScrollTrigger should control the animation progress.



The browser should render the selected frame efficiently.



==================================================

18. LENIS

==================================================



If Lenis already exists in the project, integrate it correctly with ScrollTrigger.



Do not install another smooth-scroll library if one already exists.



Do not add Lenis merely for the sake of adding another animation technology.



The actual frame sequence and scroll relationship are more important than smooth-scroll effects.



==================================================

19. GLB

==================================================



The existing Reverie GLB may remain in the project.



Do NOT delete it.



However, for this particular homepage hero:



THE FRAME SEQUENCE IS THE HERO VISUAL SOURCE.



Keep the GLB architecture available for future:



- product page

- interactive 3D viewer

- alternate hero mode

- product configurator

- detailed 3D inspection



Do not unnecessarily render the GLB behind the frame sequence.



Avoid rendering both simultaneously unless there is a specific visual reason.



==================================================

20. OTHER HOMEPAGE SECTIONS

==================================================



Do not use the supplied frame sequence anywhere else.



IMPORTANT:



THESE FRAMES ARE FOR THE HERO ONLY.



Do not use them in:



- product cards

- collection pages

- product pages

- footer

- testimonials

- editorial sections

- banners

- recommendations

- related products

- checkout

- cart



The rest of the website should use normal optimized product images/assets.



==================================================

21. ASSET PATH

==================================================



After auditing the current root folder, establish a clean internal asset reference.



If appropriate, move/copy the frame derivatives into something like:



/public/hero-sequence/



while preserving the original source files.



Example:



/public/hero-sequence/

    frame-0001.webp

    frame-0002.webp

    frame-0003.webp

    ...

    frame-XXXX.webp



But do NOT blindly move files.



First inspect the project and determine the existing asset architecture.



Follow the project's existing conventions where possible.



==================================================

22. DO NOT BREAK EXISTING WORK

==================================================



Before modifying anything:



AUDIT THE EXISTING APPLICATION.



Identify:



- framework

- routing

- existing hero implementation

- existing GSAP setup

- existing Three.js setup

- existing Lenis setup

- asset paths

- CSS architecture

- components

- current homepage



Reuse existing infrastructure wherever possible.



Do not create duplicate GSAP/Three.js/Lenis instances.



Do not create duplicate navigation.



Do not replace working components unnecessarily.



==================================================

23. VISUAL QUALITY CHECK

==================================================



After implementation, run the site and inspect the hero visually.



Verify:



✓ first frame loads correctly

✓ frame sequence progresses with scroll

✓ scrolling backward reverses the sequence

✓ final frame is reached correctly

✓ final frame remains stable

✓ hero releases cleanly

✓ next section appears naturally

✓ no frame stretching

✓ no frame flickering

✓ no visible loading gaps

✓ no accidental black flashes

✓ no console errors

✓ no horizontal overflow

✓ mobile layout works

✓ desktop layout works

✓ reduced-motion fallback works



==================================================

24. CRITICAL RULE

==================================================



DO NOT OVERDESIGN THIS.



The supplied Google Flow frame sequence is already the cinematic content.



Your job is to build the best possible web experience around it.



Do not add:



particles

floating shapes

random gradients

neon effects

fake 3D

random parallax

excessive text animation

decorative blobs

AI-style visual effects

constant rotation



The result should look like a real premium luxury watch website.



==================================================

25. FINAL TARGET

==================================================



The homepage hero should feel like:



A luxury watch commercial controlled by the user's scroll.



The user's scroll position is effectively the playback head of the film.



The hero should be:



cinematic

minimal

luxurious

precise

smooth

product-focused

fast

responsive

mobile-first



Use the supplied frame sequence as the source of truth.



Do not replace it with a different animation.



IMPLEMENT THIS IN THE HERO ONLY.


---

## 10_Integrate_Existing_Cinematic_Watch_Frame_Sequence.md

# Integrate Existing Cinematic Watch Frame Sequence Spec

> **Source**: User Instruction Prompt (Step 768)

REVERIE — INTEGRATE THE EXISTING CINEMATIC WATCH FRAME SEQUENCE



IMPORTANT:



This is an EXISTING Reverie website.



Do NOT rebuild it.

Do NOT redesign it.

Do NOT replace the homepage.

Do NOT replace the existing hero UI.

Do NOT change the navigation, typography, colors, ecommerce functionality, or other sections.



I only want you to add/fix the cinematic scroll-controlled watch animation inside the EXISTING HERO.



The animation frames have already been generated and are already present in the project.



==================================================

1. AUDIT FIRST — DO NOT MODIFY YET

==================================================



Before changing any code:



1. Inspect the entire existing project.

2. Find the current homepage.

3. Find the current hero component.

4. Find the existing animation/scroll implementation.

5. Find GSAP and ScrollTrigger if already installed.

6. Find Lenis if already installed.

7. Find the existing Reverie GLB implementation.

8. Locate the watch animation frame assets already present in the project.

9. Determine:

   - frame folder

   - filename pattern

   - frame count

   - image dimensions

   - image format

   - frame ordering

10. Identify the smallest number of existing files that need to be modified.



DO NOT start rebuilding anything.



Reuse the existing architecture.



==================================================

2. THE FRAME SEQUENCE IS THE HERO ANIMATION

==================================================



The existing frame images are the source of truth for the hero animation.



Use those exact frames.



Do NOT:



- generate new frames

- create a different watch animation

- use random 3D effects

- create fake CSS 3D

- recreate the animation with the GLB

- create a video player

- replace the frames with another asset



The frame sequence must be rendered onto an HTML canvas.



Do NOT render hundreds of `<img>` elements.



==================================================

3. DESIRED HERO EXPERIENCE

==================================================



The existing hero should become a cinematic scroll-controlled watch experience.



The sequence should progress naturally through the supplied frames:



ASSEMBLED WATCH

        ↓

watch begins transforming

        ↓

components begin separating

        ↓

case/crystal/dial components separate

        ↓

mechanical movement becomes visible

        ↓

internal components separate

        ↓

caseback/crown/strap components separate where present

        ↓

FULLY EXPLODED WATCH

        ↓

hold on final exploded frame

        ↓

hero releases into the existing next section



The exact visual content must come from the supplied frames.



Do not invent additional animation stages.



==================================================

4. SCROLL CONTROLS THE FRAME

==================================================



The user's scroll position must control the frame sequence.



Scrolling down:



frame 1

→ frame 2

→ frame 3

→ ...

→ final frame



Scrolling up:



final frame

→ previous frame

→ previous frame

→ ...

→ first frame



If the user stops scrolling, the sequence stops at that frame.



There must be NO autoplay.



There must be NO continuous automatic watch rotation.



The scroll position is effectively the playback head of the cinematic sequence.



==================================================

5. CANVAS IMPLEMENTATION

==================================================



Use:



HTML Canvas

+

requestAnimationFrame

+

scroll progress

+

frame index



Do NOT draw directly inside the scroll event.



The scroll system should calculate the desired frame.



Only repaint when the frame index actually changes.



Conceptually:



scroll position

      ↓

scroll progress

      ↓

frame index

      ↓

requestAnimationFrame

      ↓

canvas.drawImage()



Keep the implementation efficient.



Do not update React state on every frame.



==================================================

6. STICKY / PINNED HERO

==================================================



Use a tall scroll section around the existing hero.



Approximately:



400vh



is a good starting point, but inspect the existing layout and adjust if necessary.



The hero visual should remain sticky/pinned while the frame sequence plays.



Conceptually:



hero starts

↓

hero becomes sticky

↓

user scrolls

↓

frame sequence progresses

↓

final exploded frame

↓

final frame holds

↓

hero releases

↓

existing next section continues



Do NOT make the entire website sticky.



Only the hero sequence should be pinned/sticky.



==================================================

7. EXISTING HERO MUST REMAIN

==================================================



Do not replace the existing Reverie hero.



Keep the existing:



- REVERIE branding

- navigation

- typography

- product information

- CTA

- layout

- spacing

- visual style

- responsive behavior



Integrate the canvas into the existing hero's visual layer.



The canvas should become the cinematic product visual, not a replacement for the entire hero.



The website should still look like the current Reverie website.



==================================================

8. PRELOADING

==================================================



Desktop:



Preload the complete frame sequence before the cinematic interaction starts.



Show a minimal existing-Reverie-style loading state.



Do not create a large generic loader.



If showing loading percentage, use the actual number of loaded frames.



Do not fake progress.



==================================================

9. MOBILE

==================================================



For screens below 768px:



Load every second frame.



For example:



Desktop:



001

002

003

004

005

006

...



Mobile:



001

003

005

007

...



Map the reduced frame sequence correctly across the complete scroll range.



Do not stretch the frames.



Do not create a completely different animation.



The same cinematic transformation should remain recognizable on mobile.



==================================================

10. REDUCED MOTION

==================================================



Respect:



prefers-reduced-motion: reduce



When enabled:



- disable the scroll animation

- show a strong static assembled-watch frame

- preserve the existing hero UI

- preserve accessibility



==================================================

11. GSAP / SCROLLTRIGGER

==================================================



If GSAP and ScrollTrigger already exist:



USE THEM.



Do not install another animation system.



Use ScrollTrigger to map scroll progress to the frame sequence.



Conceptually:



ScrollTrigger

      ↓

progress 0 → 1

      ↓

frame 0 → last frame

      ↓

canvas



Use scrubbed scroll behavior.



If Lenis already exists, keep it and ensure it works correctly with ScrollTrigger.



Do not install another smooth-scroll library.



==================================================

12. FRAME SPEED

==================================================



Make the animation speed easy to adjust.



The main control should be the hero's scroll distance.



More scroll distance:



→ slower cinematic sequence



Less scroll distance:



→ faster cinematic sequence



Add a short comment near the relevant configuration explaining this.



==================================================

13. FINAL EXPLODED STATE

==================================================



This is critical.



The final frame of the supplied sequence is the fully exploded watch.



When the user reaches the end of the sequence:



DO NOT:



- reassemble the watch

- fade to black

- switch to another image

- restart the animation

- automatically release immediately



Hold the final exploded frame briefly before releasing the hero into the existing next section.



==================================================

14. GLB



Keep the existing Reverie GLB.



Do not delete it.



Do not break its existing functionality.



However, do not use the GLB to recreate the frame-sequence animation.



The frame sequence is for the cinematic homepage hero.



The GLB remains available for the future interactive 3D product experience.



==================================================

15. PERFORMANCE



Use:



- one canvas

- efficient image preloading

- requestAnimationFrame

- frame-index comparison

- appropriate device pixel ratio

- proper cleanup



Avoid:



- hundreds of DOM images

- React state updates on every frame

- drawing directly inside scroll callbacks

- repeated image decoding

- duplicate animation loops

- unnecessary component renders



Clean up hero-owned:



- ScrollTrigger instances

- animation frames

- resize listeners

- image references



when the hero is unmounted.



==================================================

16. RESPONSIVE CANVAS



Handle:



- window resize

- orientation changes

- desktop → mobile

- mobile → desktop



The canvas must preserve the original frame aspect ratio.



Never stretch or distort the watch.



Keep the watch visually large and prominent.



==================================================

17. DO NOT TOUCH OTHER SECTIONS



The frame sequence is ONLY for the hero.



Do not use these frames in:



- collection pages

- product cards

- product pages

- cart

- checkout

- footer

- recommendations

- unrelated sections



Do not modify those sections.



==================================================

18. MINIMAL CODE CHANGES



This is an integration task.



Modify the smallest possible number of files.



If an existing hero component already exists:



EXTEND IT.



Do not create a duplicate hero.



If an existing scroll system already exists:



EXTEND IT.



Do not create another scroll system.



If GSAP already exists:



REUSE IT.



If Lenis already exists:



REUSE IT.



If Three.js already exists:



DO NOT remove it.



==================================================

19. VISUAL QUALITY



The result must feel like a premium luxury watch website.



Do NOT add unnecessary:



- particles

- neon

- glowing effects

- random floating objects

- lens flares

- excessive blur

- fake 3D

- decorative shapes

- constant rotation

- random parallax



The watch itself is the visual spectacle.



The UI should remain restrained.



The desired feeling is:



"A luxury watch product film controlled by the user's scroll, wrapped inside an extremely simple ecommerce interface."



==================================================

20. TEST THE IMPLEMENTATION



After implementation, run the existing website.



Test:



### Desktop



- first frame

- loading

- scroll forward

- scroll backward

- intermediate frames

- mechanical reveal

- exploded state

- final-frame hold

- hero release

- next section



### Mobile



- reduced frame set

- correct frame mapping

- no stretching

- no horizontal overflow

- smooth scrolling

- usable UI



### Technical



- no console errors

- no broken routes

- no duplicate animation systems

- no memory leaks

- no unnecessary React renders



==================================================

21. IMPORTANT — DO NOT REBUILD



The current Reverie website is already built.



I am NOT asking you to create a new website.



I am NOT asking you to redesign the hero.



I am NOT asking you to replace the current UI.



I am asking you to ADD ONE THING:



THE EXISTING CINEMATIC WATCH FRAME SEQUENCE SHOULD BECOME THE SCROLL-CONTROLLED VISUAL ANIMATION OF THE CURRENT HERO.



Everything else stays.



==================================================

22. IMPLEMENTATION ORDER



Follow this exact order:



STEP 1

Audit the existing project.



STEP 2

Locate and inspect the frame sequence.



STEP 3

Identify the current hero and existing animation infrastructure.



STEP 4

Tell me which existing files need to change and why.



STEP 5

Integrate the canvas frame sequence into the existing hero.



STEP 6

Connect scroll progress to frame index.



STEP 7

Add preloading.



STEP 8

Add mobile every-second-frame behavior.



STEP 9

Add reduced-motion fallback.



STEP 10

Run and visually verify the website.



STEP 11

Fix only issues related to this integration.



Do not expand the scope.



==================================================

FINAL REQUIREMENT



KEEP THE CURRENT REVERIE WEBSITE.



KEEP THE CURRENT DESIGN.



KEEP THE CURRENT HERO UI.



KEEP THE CURRENT GLB.



KEEP ALL EXISTING FUNCTIONALITY.



ONLY ADD THE SUPPLIED FRAME-SEQUENCE CINEMATIC SCROLL EFFECT TO THE EXISTING HERO.



The result should look as though this cinematic watch sequence was always part of the original Reverie website.


---

## 11_Final_Correction_Do_Not_Rebuild_Website.md

# Final Correction — Do Not Rebuild The Website Spec

> **Source**: User Instruction Prompt (Step 858)

FINAL CORRECTION — DO NOT REBUILD THE WEBSITE



Stop and inspect the current Reverie homepage before making any further changes.



The current implementation is NOT doing the intended hero behavior correctly.



The problem is:



1. The hero is behaving primarily like a static product hero.

2. The supplied cinematic watch frame sequence is not driving the hero correctly.

3. The watch animation needs to be the MAIN visual experience of the hero.

4. The current brand must be REVERIE — never VELARA.

5. I do NOT want another redesign.



FIX THE EXISTING IMPLEMENTATION.



==================================================

WHAT I WANT

==================================================



Keep the current website structure and UI.



Keep:



- navigation

- typography

- buttons

- product information

- page structure

- ecommerce functionality

- existing GLB

- existing design system



ONLY FIX THE HERO VISUAL ANIMATION.



The supplied watch frames already exist in the project.



Find them.



They represent a cinematic watch transformation.



The sequence must be displayed through a single HTML canvas and controlled entirely by the user's scroll.



==================================================

THE HERO BEHAVIOR

==================================================



At the beginning:



SHOW THE FIRST FRAME.



The watch should appear assembled.



As the user scrolls down:



FRAME 1

→

FRAME 2

→

FRAME 3

→

FRAME 4

→

...

→

FINAL FRAME



The watch must progressively transform exactly according to the supplied frame sequence.



This includes the mechanical/exploded transformation contained in the frames.



At the end:



SHOW THE FINAL EXPLODED WATCH FRAME.



HOLD THAT FRAME.



Then allow the hero to release into the existing next section.



Scrolling upward must reverse the sequence.



There must be NO autoplay.



There must be NO independent watch rotation.



The user's scroll is the animation timeline.



==================================================

MOST IMPORTANT TECHNICAL REQUIREMENT

==================================================



DO NOT implement this as:



<img> frame swapping

video autoplay

CSS animation

fake 3D

random Three.js animation

GLB animation

React state updates on every frame



Use:



ONE CANVAS

+

PRELOADED FRAME IMAGES

+

SCROLL PROGRESS

+

REQUESTANIMATIONFRAME



The architecture should be:



Scroll position

      ↓

ScrollTrigger progress

      ↓

frame index

      ↓

requestAnimationFrame

      ↓

canvas.drawImage()



Only redraw when the frame index changes.



==================================================

HERO PINNING

==================================================



The hero needs a long scroll duration.



Start around:



400vh



Adjust it after testing.



The visual hero should remain pinned/sticky while the sequence progresses.



Behavior:



ENTER HERO

↓

FIRST WATCH FRAME

↓

SCROLL

↓

CINEMATIC WATCH TRANSFORMATION

↓

FULLY EXPLODED WATCH

↓

HOLD FINAL FRAME

↓

RELEASE HERO

↓

EXISTING NEXT SECTION



Do NOT make the entire website sticky.



Only the hero sequence is pinned.



==================================================

THE WATCH MUST BE THE HERO

==================================================



The watch should occupy most of the visual attention.



Do not let the UI dominate the watch.



Do not add unnecessary:



- particles

- floating shapes

- gradients

- glow

- lens flare

- fake 3D

- excessive parallax

- random animations

- decorative effects



The supplied frames already contain the cinematic visual.



Use them exactly.



==================================================

IMPORTANT: USE THE ACTUAL FRAME FILES

==================================================



Before coding, find the existing frame sequence.



Determine:



- folder

- filename pattern

- number of frames

- dimensions

- ordering



Do NOT create replacement images.



Do NOT generate new images.



Do NOT substitute the sequence with the GLB.



Do NOT use a single product image and pretend it is the sequence.



I want the actual frame sequence visible during scrolling.



==================================================

KEEP THE CURRENT HERO UI

==================================================



The existing hero content can remain.



However, integrate the canvas into the hero so that the frame sequence becomes the actual cinematic visual.



The canvas should sit in the correct visual layer and not cover:



- navigation

- CTA

- important product information



unless the intended composition requires it.



Do not redesign the UI.



==================================================

BRAND CORRECTION

==================================================



The website must use:



REVERIE



NOT:



VELARA



Check the entire hero implementation for accidental VELARA references.



Do not change the brand to another name.



The product is:



REVERIE R01 — ORION



==================================================

MOBILE

==================================================



Below 768px:



Use every second frame if necessary for performance.



Example:



Desktop:

001, 002, 003, 004, 005...



Mobile:

001, 003, 005, 007...



Still preserve the complete transformation.



Do not create a separate unrelated mobile animation.



==================================================

LOADING

==================================================



Preload the frames.



Show a minimal loading state.



Do not start the cinematic sequence before the necessary frames are available.



Do not fake loading progress.



==================================================

REDUCED MOTION

==================================================



Respect:



prefers-reduced-motion: reduce



Show one strong static assembled-watch frame instead of the scroll animation.



==================================================

DO NOT CREATE A SECOND SYSTEM

==================================================



Before implementing:



inspect the current code.



If GSAP already exists:



USE IT.



If ScrollTrigger exists:



USE IT.



If Lenis exists:



USE IT.



If a hero component already exists:



MODIFY IT.



Do not create duplicate systems.



Do not create a second homepage.



Do not create a second hero and hide the first one.



==================================================

MINIMAL CHANGE REQUIREMENT

==================================================



This is NOT a rebuild.



Modify only the files necessary to make the existing hero use the frame sequence.



Do not touch unrelated:



- collection pages

- product pages

- cart

- checkout

- footer

- account pages

- backend

- catalog

- navigation



unless absolutely required for the hero integration.



==================================================

FINAL TEST

==================================================



After implementation, run the website and manually test the hero.



Verify:



1. First frame = assembled watch.

2. Scrolling down advances through the actual supplied frames.

3. Watch progressively explodes according to the supplied sequence.

4. Scrolling up reverses the sequence.

5. Stopping the scroll stops the visual.

6. Final frame = fully exploded watch.

7. Final frame holds.

8. Hero then releases into the existing next section.

9. No autoplay.

10. No fake 3D.

11. No static-image substitution.

12. No console errors.

13. Mobile works.

14. Reduced motion works.

15. Brand says REVERIE everywhere.



==================================================

CRITICAL FINAL INSTRUCTION

==================================================



DO NOT MAKE THE WEBSITE AGAIN.



THE WEBSITE ALREADY EXISTS.



FIX THE HERO.



The exact task is:



CURRENT REVERIE WEBSITE

+

ACTUAL SUPPLIED WATCH FRAME SEQUENCE

+

SCROLL-CONTROLLED CANVAS

+

STICKY HERO

=

FINAL REVERIE HERO



The cinematic frame sequence must be the primary hero animation.



Do not stop after making the page look good.



The success condition is that when I scroll through the hero, I can watch the actual supplied watch sequence progress frame-by-frame from assembled → mechanical transformation → fully exploded.



Audit first.

Then fix only the hero.

Then test it.


---

## 12_Debugging_Fix_Scroll_Hero_Sequence.md

# Hero Scroll Sequence Debugging & Root Cause Fix Spec

> **Source**: User Instruction Prompt (Step 965)

STOP. DO NOT REDESIGN ANYTHING.



This is a debugging/fix task, not a design task.



I inspected the current implementation and there is a specific failure:



THE SCROLL ANIMATION IS FAKE.



The UI counter changes from:

01 / 05

02 / 05

03 / 05

04 / 05

05 / 05



but the actual watch visual does NOT change through the supplied cinematic frame sequence.



The current implementation is therefore NOT acceptable.



I need you to FIX THE EXISTING HOMEPAGE so the supplied watch image sequence itself is the visual being scrubbed by scroll.



==================================================

1. FIRST: AUDIT THE EXISTING PROJECT

==================================================



Before editing anything:



1. Inspect the complete existing project.

2. Find the existing homepage/hero component.

3. Find every image/frame asset currently available in the project.

4. Search recursively for:

   .png

   .jpg

   .jpeg

   .webp

5. Identify the actual cinematic watch frame sequence I previously placed in the project.

6. Determine:

   - exact folder

   - exact filenames

   - number of frames

   - image dimensions

   - filename ordering



DO NOT ASSUME THERE ARE ONLY 5 FRAMES.



DO NOT CREATE FAKE FRAMES.



DO NOT GENERATE NEW WATCH IMAGES.



DO NOT SUBSTITUTE THE STATIC R01 product image for the animation.



If the sequence contains 100, 200, 300, 500, etc. frames, use the actual sequence.



If you cannot find the frame sequence, STOP and report:



"FRAME SEQUENCE NOT FOUND"



Do NOT silently build another fake animation.



==================================================

2. THE ACTUAL HERO MUST BE A CANVAS FRAME SEQUENCE

==================================================



The cinematic watch sequence must be rendered through ONE HTML CANVAS.



Do NOT use:



- a static <img> as the animation

- five static images

- five hero states

- CSS background swapping

- fake opacity transitions

- fake 3D rotation

- a video player

- a carousel

- an autoplay animation



Use:



HTMLCanvasElement

+

requestAnimationFrame

+

actual supplied image frames

+

GSAP ScrollTrigger



The canvas is the visual source of truth.



Conceptually:



scroll progress

        ↓

0.000 → 1.000

        ↓

frame index

        ↓

actual supplied frame

        ↓

canvas.drawImage()



==================================================

3. REMOVE THE FAKE 01 / 05 SYSTEM

==================================================



The current:



01 / 05

02 / 05

03 / 05

04 / 05

05 / 05



system is misleading because it is not connected to the actual frames.



REMOVE IT.



If a frame indicator is retained, it must represent the REAL frame number.



For example:



001 / 240

002 / 240

003 / 240

...

240 / 240



Only show this if it is actually connected to the canvas frame index.



Do not fake stage numbers.



==================================================

4. SCROLL MUST CONTROL THE ACTUAL IMAGE FRAME

==================================================



Create a pinned/sticky hero section.



Use approximately:



hero scroll distance = 400vh–600vh



The canvas remains visually fixed while the page scrolls through the sequence.



GSAP ScrollTrigger should control a normalized progress value.



Conceptually:



ScrollTrigger.create({

    trigger: hero,

    start: "top top",

    end: "+=500%",

    pin: true,

    scrub: true,



    onUpdate: self => {

        const progress = self.progress;



        const frameIndex = Math.round(

            progress * (frames.length - 1)

        );



        renderFrame(frameIndex);

    }

});



Do not update React state for every frame.



Do not cause React re-renders for frame changes.



Use a mutable frame index and requestAnimationFrame.



==================================================

5. THE FRAME SEQUENCE MUST TELL THE ACTUAL STORY

==================================================



The supplied frames already contain the cinematic watch transformation.



The sequence should visually progress naturally through the actual supplied images:



START:



assembled R01 Orion watch



↓



subtle cinematic movement



↓



bezel / crystal begins separating



↓



case components separate



↓



dial becomes visible



↓



mechanical movement is revealed



↓



components continue separating



↓



movement / case / dial / crystal / crown components become clearly visible



↓



FULL EXPLODED WATCH



The exact visual progression MUST come from the supplied frames.



Do not recreate this progression with CSS.



Do not approximate it with transforms.



Do not invent a Three.js animation.



The images themselves are the animation.



==================================================

6. VERY IMPORTANT — SCROLL REVERSAL

==================================================



Scrolling DOWN:



frame 0

→ frame 1

→ frame 2

→ frame 3

→ ...

→ final exploded frame



Scrolling UP:



final exploded frame

→ previous frame

→ previous frame

→ ...

→ frame 0



The animation must be completely reversible.



There must be no autoplay.



There must be no looping.



There must be no automatic reset.



==================================================

7. HOLD THE FINAL EXPLODED FRAME

==================================================



When the user reaches the final frame:



HOLD THE FINAL EXPLODED FRAME.



Do not immediately switch to another image.



The final exploded composition should remain visible while the user completes the hero section.



Then release the pinned hero and continue to the next ecommerce section.



==================================================

8. IMAGE PRELOADING

==================================================



Implement proper image preloading.



Do not attempt to render an image before it has loaded.



Create an array similar to:



const frames = [];



for (...) {

    const image = new Image();

    image.src = framePath;

    frames.push(image);

}



Track loading progress.



Display a minimal luxury loading state while frames load.



Example:



REVERIE



LOADING EXPERIENCE

036 / 240



The exact count must reflect the real number of frames.



Once enough frames are available, render frame 0.



==================================================

9. DO NOT USE THE STATIC PRODUCT IMAGE AS THE HERO

==================================================



The existing static watch image can remain elsewhere in the website.



But it MUST NOT replace the cinematic frame sequence.



The hero's primary visual must be:



THE ACTUAL SUPPLIED FRAME SEQUENCE.



If frame 0 is the assembled watch, canvas frame 0 should display it.



If frame 120 is the partially exploded watch, canvas frame 120 should display it.



If frame 239 is the fully exploded watch, canvas frame 239 should display it.



There must be a one-to-one relationship between scroll position and actual image frame.



==================================================

10. PRESERVE THE CURRENT DESIGN

==================================================



DO NOT redesign the website.



Keep:



- existing navigation

- existing typography

- existing product information

- existing CTA

- existing pricing

- existing ecommerce structure

- existing sections

- existing product cards

- existing spacing where possible

- existing visual language



Only fix the hero animation architecture.



Do not create a new homepage.



Do not replace the entire application.



Modify the minimum number of files necessary.



==================================================

11. BRAND MUST BE REVERIE

==================================================



There is currently an incorrect brand name appearing as:



VELARA



REMOVE IT.



The brand is:



REVERIE



Use:



REVERIE



Do not use VELARA anywhere in:



- navigation

- logo

- metadata

- hero

- page title

- buttons

- accessibility labels

- source strings



Search the entire project for:



VELARA



and replace/remove every accidental occurrence where it refers to this brand.



==================================================

12. HERO CONTENT

==================================================



Keep the existing product messaging approximately like:



HOROLOGY EDITION · R01 — ORION



REVERIE NO. 01



Automatic mechanical horology emerging from darkness



CALIBRE



Calibre R-101 Ultra-Thin



EXPLORE R01 →



$4,800



But the text should NOT obscure the watch transformation.



As the cinematic sequence becomes more dramatic, keep the typography restrained.



The watch is the spectacle.



The UI is secondary.



==================================================

13. CANVAS BEHAVIOR

==================================================



Canvas must:



- fill the hero visual area

- preserve the original frame aspect ratio

- use object-contain style composition

- remain sharp

- resize correctly

- handle retina displays

- cap devicePixelRatio for performance

- avoid stretching the watch

- avoid cropping important mechanical components



Use something equivalent to:



const dpr = Math.min(window.devicePixelRatio || 1, 2);



Do not render enormous unnecessary canvas resolutions.



==================================================

14. RENDER LOOP

==================================================



Do NOT draw directly inside the scroll event.



ScrollTrigger should only update the target frame index.



Use requestAnimationFrame to render.



Conceptually:



let currentFrame = 0;

let targetFrame = 0;

let renderQueued = false;



function requestRender() {

    if (renderQueued) return;



    renderQueued = true;



    requestAnimationFrame(() => {

        renderQueued = false;



        if (currentFrame !== targetFrame) {

            currentFrame = targetFrame;

            drawFrame(currentFrame);

        }

    });

}



The important requirement:



SCROLL POSITION → TARGET FRAME → CANVAS FRAME



==================================================

15. MOBILE

==================================================



This website is mobile-first.



Do not simply shrink the desktop hero.



On mobile:



- canvas remains full-width

- watch remains the dominant visual

- text remains readable

- no horizontal overflow

- no distorted watch

- touch scrolling controls the sequence

- use fewer frames ONLY if necessary for performance



If the full sequence is too heavy on mobile, use a deterministic reduced frame set such as:



every 2nd frame



But do NOT replace the sequence with a static image.



==================================================

16. REDUCED MOTION

==================================================



For:



prefers-reduced-motion: reduce



do not run the cinematic scrub animation.



Instead:



- render the first frame

- keep the hero static

- maintain normal page navigation



==================================================

17. LENIS

==================================================



If Lenis already exists in the project:



KEEP IT.



Make sure Lenis and ScrollTrigger are synchronized correctly.



Use:



ScrollTrigger.update()



through the existing Lenis integration where appropriate.



Do not install another scrolling library.



Do not create a second smooth-scroll system.



==================================================

18. GSAP

==================================================



If GSAP already exists:



USE THE EXISTING GSAP INSTALLATION.



Use:



GSAP

ScrollTrigger



Do not introduce another animation library.



Do not create a second ScrollTrigger system for the same hero.



==================================================

19. CRITICAL DEBUGGING REQUIREMENT

==================================================



Before saying the task is complete, temporarily add a development-only debug indicator:



FRAME: XXX / TOTAL



This number MUST change when scrolling.



More importantly:



THE CANVAS IMAGE MUST VISIBLY CHANGE.



Do not accept a solution where:



FRAME: 001 / 240



changes to:



FRAME: 240 / 240



while the displayed watch remains the same.



That is the exact bug I currently have.



Test at:



0% scroll

25%

50%

75%

100%



At each point, verify the actual watch image is different.



==================================================

20. IF THE FRAME SEQUENCE IS NOT FOUND

==================================================



This is extremely important.



If you search the project and cannot find the supplied frame sequence:



DO NOT:



- invent frames

- generate replacement images

- use the static R01 image

- create five fake stages

- create a CSS animation

- tell me the implementation is complete



Instead, report exactly:



FRAME SEQUENCE NOT FOUND



Then provide:



1. folder paths searched

2. image extensions searched

3. number of candidate frames found

4. likely reason the sequence cannot be accessed



STOP THERE.



==================================================

21. DO NOT USE THE GLB FOR THIS HERO

==================================================



For this particular hero correction:



DO NOT replace the supplied cinematic frame sequence with Three.js.



The hero is currently intended to use the cinematic image sequence.



The real GLB can be used later for the R01 product page / interactive product viewer.



Do not mix the two systems.



HOMEPAGE HERO:

Canvas frame sequence



PDP:

Three.js GLB interactive viewer



==================================================

22. PERFORMANCE

==================================================



Optimize without changing the visual result.



Use:



- lazy loading where appropriate

- image preloading

- appropriate image dimensions

- WebP/AVIF if already available

- limited DPR

- requestAnimationFrame

- no React state per frame

- no unnecessary DOM updates

- cleanup on unmount

- ScrollTrigger cleanup

- event listener cleanup



Do not sacrifice the cinematic sequence just to make implementation easier.



==================================================

23. FINAL ACCEPTANCE TEST

==================================================



Do NOT tell me "done" until all of these are true:



[ ] Brand says REVERIE everywhere.



[ ] Existing website design is preserved.



[ ] Hero is pinned during scroll.



[ ] Hero uses ONE canvas.



[ ] Canvas uses the ACTUAL supplied frame sequence.



[ ] Actual frame 0 renders at the beginning.



[ ] Scrolling changes the actual canvas image.



[ ] The watch visibly transforms through the supplied sequence.



[ ] The exploded mechanical watch appears at the end.



[ ] Scrolling upward reverses the animation.



[ ] Final exploded frame holds before hero release.



[ ] No autoplay.



[ ] No fake 5-stage animation.



[ ] No static image masquerading as an animation.



[ ] No CSS-only fake watch transformation.



[ ] No video player.



[ ] No console errors.



[ ] No duplicate animation systems.



[ ] Mobile works.



[ ] Reduced-motion fallback works.



[ ] Existing ecommerce sections remain intact.



==================================================

MOST IMPORTANT REQUIREMENT

==================================================



I do NOT want another visually similar static hero.



I want this exact behavior:



USER SCROLLS

        ↓

SCROLL PROGRESS

        ↓

ACTUAL FRAME INDEX

        ↓

ACTUAL IMAGE FROM MY FRAME SEQUENCE

        ↓

CANVAS

        ↓

WATCH VISIBLY TRANSFORMS



The visual sequence itself must be the animation.



If I scroll halfway through the hero, I must see a halfway-transformed watch.



If I scroll to the bottom of the hero, I must see the fully exploded watch.



If I scroll back up, the watch must mechanically reassemble.



That is the definition of DONE.



Now audit the existing implementation and fix ONLY this problem.


---

## 13_Live_Watch_Hands_Feature_Spec.md

# Live Clock Hands Feature Specification

> **Source**: User Instruction Prompt (Step 1192)

DO NOT MODIFY OR REBUILD THE EXISTING HERO.



The current hero and scroll-driven frame sequence are working correctly.

Do not change the existing frame sequence, ScrollTrigger, canvas implementation, layout, typography, navigation, or any existing behavior.



I only want ONE additional feature:



When the hero is at the very beginning (assembled R01 watch) and the user is NOT scrolling, make the WATCH HANDS move like a real clock.



Requirements:

- Only the clock hands move.

- Do not rotate the entire watch.

- Do not modify the cinematic frame sequence.

- Do not add animation to the exploded frames.

- When scrolling starts, the live hand movement stops and the existing frame sequence takes over.

- When the user scrolls back to the very beginning, the live hand movement resumes.

- Use the existing R01 watch/dial alignment.

- Keep the movement subtle and realistic.

- Second hand moves continuously.

- Minute/hour hands move appropriately with elapsed time.

- No new visual effects.

- No redesign.

- No new 3D system.

- No replacement of the existing hero.



MOST IMPORTANT:



This is an ADDITIVE MICRO-INTERACTION only.



Before changing anything, inspect the current implementation and identify the smallest possible change needed.



Do not touch working code unnecessarily.



After implementation, verify that the existing scroll animation still works exactly as it does now.


---

## 14_Cart_Wishlist_And_Prototype_Refinements.md

# Prompt 14: Cart, Wishlist & Prototype Refinements

**User Prompt:**
> do it and the cart is also having the problem of large cards and when i wishlist anything the wishlist should show it like a card in wishlist page

---

### Objectives & Deliverables:
1. **Cart Proportions & Card Refinement**:
   - Fix large cart items/cards. Make cart item rows compact, elegant luxury horology proportions (64x64px contained thumbnail, refined typography, quantity selector, remove action, clean order summary).
2. **Wishlist Card Grid & Global State**:
   - Implement global wishlist functionality stored in localStorage via CartContext.
   - Add Wishlist icon with live count badge in Header.
   - Toggleable heart buttons on all watch cards across Collections, PDP, and Wishlist.
   - Create dedicated /wishlist page rendering wishlisted watches as compact cards with instant 'Add to Bag' and 'Remove' actions.
3. **Prototype Alignment**:
   - Wire homepage components (CollectionsSection, GenderShowcase, FeaturedProduct, ThreeDExperience, BrandStory, CraftsmanshipSection) with Next.js navigation, useCart(), and real Three.js 3D GLB model inspection.


---

## 15_Final_Completion_And_Self_Preview.md

# Prompt 15: Final Completion & Self-Preview Handoff

**User Prompt:**
> just complete the work i will preview my self

---

### Status:
All cart size refinements, wishlist card grid system, context state management, header counter badges, and prototype component integrations have been fully implemented, verified via production build, and synced across both Next.js and Prototype apps.


---

## 16_Revert_The_Changes.md

# Prompt 16: Revert The Changes

**User Prompt:**
> revert the changes

---

### Action:
Reverted working directory changes back to previous state while preserving prompt folder history.


---

## 17_Standardize_Watch_Card_And_Cart_Sizes.md

# Prompt 17: Standardize Watch Card and Cart Sizes

**User Prompt:**
> the watches in the collection and gender horologys and the cart are little bigger make them standard

---

### Objectives:
1. **Standardize Watch Catalog Cards (Collections & Gender Horologys)**:
   - Adjust .catalog-card, .catalog-card-media, .catalog-card-img so watches fit with standard horological containment (object-fit: contain, balanced padding, no blown-up/oversized watch images).
   - Refine typography, badges, and button sizes to standard luxury proportions (14px titles, 12px descriptions, 15px prices, 32px CTAs, 10px reference badges).
2. **Standardize Cart Item Cards & Summary**:
   - Refine .cart-item-card, .cart-item-thumb-wrap, .cart-item-thumb to standard luxury e-commerce proportions (80x80px contained thumbnail, standard typography, clean quantity stepper, aligned delete action).
   - Ensure complete CSS styling for .cart-items-list, .cart-item-card, and responsive mobile layout.


---

## 18_Restart_Servers.md

# Prompt 18: Restart Servers

**User Prompt:**
> restart servers

---

### Action:
Restarted the local development server(s) for the project.


---

## 19_Server_Status_And_Start.md

# Prompt 19: Server Check & Start

**User Prompt:**
> server

---

### Action:
Checked server status and started the Next.js development server on port 3001 following the session restart.


---

## 20_Make_Collection_Section_Cards_Small.md

# Prompt 20: Improve Collection Section and Make Cards Small

**User Prompt:**
> just improve the collection section make those cards small

---

### Objectives:
1. **Improve Homepage Collections Section (CollectionsSection.jsx)**:
   - Reduce oversized card proportions in .collections-cards-grid and .collection-card.
   - Update .collection-card-media from tall 4/5 aspect ratio to a compact, refined 1/1 (square) media frame.
   - Add subtle card framing (ar(--color-bg-secondary), subtle borders, rounded corners, neat padding) to elevate the editorial luxury look.
   - Refine .collections-editorial-hero to balanced proportions (min-height: 380px, refined title, compact copy).
2. **Standardize All Collection Cards Across Pages**:
   - Ensure .catalog-card and .collection-card across collections and categories maintain restrained, elegant luxury dimensions.


---

## 21_Fix_CSS_And_Chunk_Serving.md

# Prompt 21: Fix HTML Skeleton & CSS Asset Delivery

**User Prompt:**
> its lookin like a html skeleton

---

### Diagnosis & Fix:
- **Root Cause**: Next.js development server encountered a build conflict with static chunk routing, returning 404 for layout.css and client JS bundles.
- **Resolution**: Rebuilt the Next.js production bundle and started the Next.js server via 
ext start -p 3001 with compiled, verified CSS stylesheets and static asset bundling.


---

## 22_Match_Collections_Page_Card_Size_To_Home_Section.md

# Prompt 22: Match Collections Page Card Size to Homepage Collection Section

**User Prompt:**
> see the watch cards in this section in collections page this should be the size

---

### Objectives:
1. **Match Catalog Card Sizing on Collections Page**:
   - Update .catalog-card (on /collections page and in Gender showcases) to match the exact size, proportions, clean card framing, square media container (spect-ratio: 1 / 1), padding, and typography of the homepage collection cards (Classic, Sport, Heritage).
2. **Fix Arrow & Character Encoding**:
   - Ensure all arrows (→, ArrowRight, &rarr;) render crisply without ? encoding glyphs.
3. **Elevate Contrast & Polish**:
   - Ensure the editorial hero CTA and button text have clean contrast and crisp typography.


---

## 23_Fix_Collections_Catalog_Grid_And_Card_Size.md

# Prompt 23: Fix Collections Catalog Grid and Card Size

**User Prompt:**
> these are too big

---

### Diagnosis & Deliverables:
1. **Root Cause**: app/collections/page.jsx used class collections-catalog-grid which lacked multi-column CSS grid rules, resulting in 100% full-width stretched watch cards.
2. **Responsive Multi-Column Grid**: Set .collections-catalog-grid and .catalog-grid to 4 columns on desktop, 3 columns on medium screens, 2 on tablet/mobile.
3. **Card Dimension Parity**: Refined .catalog-card, .catalog-card-media (1:1 square ratio), .catalog-card-body, and all child elements to match the homepage collection cards.

---

## 24_Merge_Feature_Branch_Into_Dev_And_Delete_Branch.md

# Prompt 24: Merge Feature Branch into Dev and Delete Feature Branch

**User Prompt:**
> # 11. Delete local branch
> git branch -d your-branch-name
> 
> # 12. Delete remote branch
> git push origin --delete your-branch-name
> 
> use this step and merge the current feature branch in dev branch

---

### Action Steps:
1. Stage and commit all pending changes on current feature branch.
2. Switch to dev branch (or create dev from remote/main if needed).
3. Merge feature branch into dev.
4. Push dev branch to remote origin.
5. Delete local feature branch (git branch -d <branch>).
6. Delete remote feature branch (git push origin --delete <branch>).

---

