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
