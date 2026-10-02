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
