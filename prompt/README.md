# REVERIE (Velara) — Master Prompts Archive

This directory stores all official instruction and specification prompts provided throughout the project lifecycle. All informal conversational messages (e.g. "continue", "good job", "proceed") have been filtered out so each real architectural and feature specification is preserved in its own dedicated Markdown file.

---

## Index of Prompts

| # | File Name | Specification Title & Description |
|---|-----------|-----------------------------------|
| **01** | [`01_Velara_Single_Page_Prototype_Prompt.md`](./01_Velara_Single_Page_Prototype_Prompt.md) | **Original Single-Page Prototype Specification**<br>Master prompt defining the 9 core sections, luxury brand tone, typography, and single-page structure. |
| **02** | [`02_Watch_Brand_Design_Tokens.md`](./02_Watch_Brand_Design_Tokens.md) | **Watch Brand Design Tokens**<br>Design token architecture: dual light/dark palette, typography hierarchy, spacing scale, component states, and motion parameters. |
| **03** | [`03_Velara_Refinement_Prompt.md`](./03_Velara_Refinement_Prompt.md) | **Luxury Refinement & Architecture Prompt**<br>Comprehensive multi-page routing, product detail layouts, interactive cart/checkout flows, and luxury micro-interactions. |
| **04** | [`04_Reverie_Dribbble_Interaction_Spec.md`](./04_Reverie_Dribbble_Interaction_Spec.md) | **Dribbble Interaction & Motion Architecture Spec**<br>Advanced motion guidelines, scroll scrubbing, smooth transitions, and dynamic dial interactions. |
| **05** | [`05_Reverie_3D_Hero_Master_Spec.md`](./05_Reverie_3D_Hero_Master_Spec.md) | **3D Hero Master Specification V1.0**<br>Detailed specification for Three.js/WebGL hero watch rendering and exploded state transitions. |
| **06** | [`06_Reverie_R01_Orion_3D_Asset_Spec.md`](./06_Reverie_R01_Orion_3D_Asset_Spec.md) | **R01 Orion 3D GLB Asset Specification**<br>Material mapping, mesh hierarchies, lighting setups, and camera positions for the R01 Orion watch model. |
| **07** | [`07_Reverie_Scroll_Sequence_Integration_Prompt.md`](./07_Reverie_Scroll_Sequence_Integration_Prompt.md) | **Scroll Sequence Integration Specification**<br>Detailed prompt for integrating high-resolution image sequences with GSAP ScrollTrigger. |
| **08** | [`08_Asset_Implementation_Instructions_R01_Orion.md`](./08_Asset_Implementation_Instructions_R01_Orion.md) | **Asset Implementation Instructions — R01 Orion GLB**<br>Treating GLB as the source of truth, sizing, lighting, and stage positioning rules. |
| **09** | [`09_Hero_Frame_Sequence_Implementation.md`](./09_Hero_Frame_Sequence_Implementation.md) | **Hero Frame Sequence Implementation Spec**<br>Google Flow cinematic frame sequence rendering rules, canvas scaling, and 5-phase story sync. |
| **10** | [`10_Integrate_Existing_Cinematic_Watch_Frame_Sequence.md`](./10_Integrate_Existing_Cinematic_Watch_Frame_Sequence.md) | **Integrate Existing Cinematic Watch Frame Sequence**<br>Strict no-rebuild instructions, direct canvas integration, and fluid scrubbing. |
| **11** | [`11_Final_Correction_Do_Not_Rebuild_Website.md`](./11_Final_Correction_Do_Not_Rebuild_Website.md) | **Final Correction — Do Not Rebuild The Website**<br>Fixing the frame canvas layering, scroll height calculation, and layout stability. |
| **12** | [`12_Debugging_Fix_Scroll_Hero_Sequence.md`](./12_Debugging_Fix_Scroll_Hero_Sequence.md) | **Debugging & Fix Specification for Hero Scroll**<br>Root cause analysis on frame preloading, canvas sizing, aspect ratio cover/contain, and scroll scrub smoothness. |
| **13** | [`13_Live_Watch_Hands_Feature_Spec.md`](./13_Live_Watch_Hands_Feature_Spec.md) | **Live Clock Hands Feature Specification**<br>Real-time analog clock hands motion at resting scroll position with seamless handoff to scrubbed sequence. |
| **14** | [`14_Cart_Wishlist_And_Prototype_Refinements.md`](./14_Cart_Wishlist_And_Prototype_Refinements.md) | **Cart, Wishlist & Prototype Refinements**<br>Cart side-drawer interactions, wishlist state toggling, and interactive product actions. |
| **15** | [`15_Final_Completion_And_Self_Preview.md`](./15_Final_Completion_And_Self_Preview.md) | **Final Completion & Self Preview**<br>Self-preview validation across desktop and mobile form factors. |
| **16** | [`16_Revert_The_Changes.md`](./16_Revert_The_Changes.md) | **Revert Accidental Overwrites**<br>Git branch restoration to ensure clean codebase integrity. |
| **17** | [`17_Standardize_Watch_Card_And_Cart_Sizes.md`](./17_Standardize_Watch_Card_And_Cart_Sizes.md) | **Standardize Watch Card & Cart Sizing**<br>Uniform card proportions, 1:1 image ratios, and aligned button states. |
| **18** | [`18_Restart_Servers.md`](./18_Restart_Servers.md) | **Restart Servers Daemon Spec**<br>Background task management and server process restarts. |
| **19** | [`19_Server_Status_And_Start.md`](./19_Server_Status_And_Start.md) | **Server Status & Verification**<br>Health checks and port binding verifications for Next.js and Spring Boot. |
| **20** | [`20_Make_Collection_Section_Cards_Small.md`](./20_Make_Collection_Section_Cards_Small.md) | **Collection Section Sizing Refinement**<br>Fine-tuning card aspect ratios and container constraints. |
| **21** | [`21_Fix_CSS_And_Chunk_Serving.md`](./21_Fix_CSS_And_Chunk_Serving.md) | **Fix CSS & Static Bundle Serving**<br>Fixing CSS asset delivery and hydration styling anomalies. |
| **22** | [`22_Match_Collections_Page_Card_Size_To_Home_Section.md`](./22_Match_Collections_Page_Card_Size_To_Home_Section.md) | **Match Collections Page Card Size**<br>Parity between homepage collection previews and `/collections` catalog. |
| **23** | [`23_Fix_Collections_Catalog_Grid_And_Card_Size.md`](./23_Fix_Collections_Catalog_Grid_And_Card_Size.md) | **Fix Collections Catalog Grid**<br>Multi-column CSS grid structure on desktop, tablet, and mobile. |
| **24** | [`24_Merge_Feature_Branch_Into_Dev_And_Delete_Branch.md`](./24_Merge_Feature_Branch_Into_Dev_And_Delete_Branch.md) | **Merge Feature Branch into Dev**<br>Git workflow commands for branch merging and cleanup. |
| **25** | [`25_About_Page_And_Navigation_Option.md`](./25_About_Page_And_Navigation_Option.md) | **About Page and Dashboard Navigation Option**<br>Dedicated `/about` page creation, header/footer/dashboard navigation integration, and Vercel build parity. |
| **26** | [`26_Fix_Nextjs_Hydration_Mismatch.md`](./26_Fix_Nextjs_Hydration_Mismatch.md) | **Fix Next.js React Hydration Mismatch**<br>Resolution of SSR vs Client localStorage hydration differences and client mount guards. |
| **27** | [`27_Backend_Commerce_Integration_Security_Hardening_SRS_Spec.md`](./27_Backend_Commerce_Integration_Security_Hardening_SRS_Spec.md) | **Backend, Commerce Integration, Security Hardening & SRS Spec**<br>P0 security hardening (OAuth token verification, CORS, OTP masking), end-to-end commerce, and SRS Section 47 Traceability Matrix. |
| **28** | [`28_Admin_CMS_Portal_And_Authentication.md`](./28_Admin_CMS_Portal_And_Authentication.md) | **Admin & Atelier CMS Portal and Authentication**<br>Role-gated `/admin` portal with catalog editor, order fulfillment, CMS stories, concierge bookings, and live audit logs. |
| **29** | [`29_Preserve_Existing_Website_Hero_Locked_Stability_Spec.md`](./29_Preserve_Existing_Website_Hero_Locked_Stability_Spec.md) | **Preserve Existing Website & Hero Locked Stability Spec**<br>Strict non-rebuild directive: locked scrolling hero subsystem, stability-first targeted refinements, and regression safety. |
