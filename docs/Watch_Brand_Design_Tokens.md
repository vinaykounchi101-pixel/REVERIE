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
