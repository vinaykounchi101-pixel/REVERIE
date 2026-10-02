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
