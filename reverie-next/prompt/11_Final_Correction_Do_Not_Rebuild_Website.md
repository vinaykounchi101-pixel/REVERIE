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
