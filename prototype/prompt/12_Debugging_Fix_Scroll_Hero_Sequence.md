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
