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
