# Prompt 29: Non-Negotiable — Preserve Existing Website & Hero Locked Stability Spec

**User Prompt:**
> ### NON-NEGOTIABLE: PRESERVE THE EXISTING WEBSITE
> 
> This is a **refinement and engineering-quality pass**, NOT a rebuild.
> 
> The existing REVERIE website already contains working visual design, interactions, assets, routes, animations, and a scrolling hero experience. **Do not destroy, replace, redesign, or unnecessarily restructure working parts of the website in pursuit of the 8+/10 quality target.**
> 
> The objective is:
> > **Make the existing REVERIE platform better without making it fall apart.**
> 
> Follow this priority order:
> 1. **Preserve working functionality**
> 2. **Preserve the existing visual identity**
> 3. **Preserve the existing scrolling hero**
> 4. **Fix broken/incomplete functionality**
> 5. **Improve integration, UX, security, performance, accessibility, and architecture**
> 6. **Polish existing components**
> 7. **Only restructure code when there is a clear engineering benefit**
> 8. **Never introduce a regression simply to increase a quality score**
> 
> ### HERO SECTION — ABSOLUTELY LOCKED
> The existing scrolling hero section is **PROTECTED**.
> **DO NOT CHANGE IT.**
> 
> Do not:
> * replace the hero
> * redesign the hero
> * change its visual composition
> * change the scroll-driven animation
> * change the image/frame sequence
> * change the canvas implementation
> * change the scroll mapping
> * change the animation timing
> * change the sticky behavior
> * change the hero height/scroll experience
> * replace the canvas with another implementation
> * add another competing hero animation
> * add moving watch hands
> * add unnecessary 3D effects to the hero
> * modify the hero simply because another design seems more impressive
> 
> The existing hero must continue to behave exactly as it currently does. Treat the hero implementation as a **protected subsystem**.
> 
> ### STABILITY-FIRST DEVELOPMENT RULE
> * Bring every important subsystem to a genuinely high level while preserving everything that already works.
> * For every proposed change, ask: **Will this improve quality without risking existing functionality?**
> 
> ### NO REBUILD RULE
> Prefer: **existing implementation → targeted correction → verification → refinement**
> 
> ### QUALITY TARGET
> Every major subsystem should achieve a minimum quality level of **8+/10** without destabilizing the platform.
> 
> ### REGRESSION SAFETY
> Understand dependencies, make smallest appropriate changes, verify desktop/mobile behavior, and revert problematic changes immediately if regressions occur.

---

### Core Principles Adopted:
1. **Hero Protection**: The scrolling hero canvas sequence is strictly locked and untouched.
2. **Minimal Targeted Corrections**: Surgical improvements to integration, security, and responsiveness without architectural disruption.
3. **Continuous Verification**: Build verification across backend and frontend before committing changes.
