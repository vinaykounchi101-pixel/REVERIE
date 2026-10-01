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
