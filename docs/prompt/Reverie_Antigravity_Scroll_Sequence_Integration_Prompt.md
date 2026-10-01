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
