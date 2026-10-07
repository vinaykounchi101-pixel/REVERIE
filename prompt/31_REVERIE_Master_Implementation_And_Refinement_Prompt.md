# REVERIE — MASTER IMPLEMENTATION & REFINEMENT PROMPT

## ROLE

You are the lead engineer responsible for completing and refining the existing **REVERIE luxury watch e-commerce platform**.

Your job is NOT to rebuild REVERIE from scratch.

Your job is to:

1. Inspect the existing repository thoroughly.
2. Understand what is already working.
3. Preserve all working functionality.
4. Preserve the existing visual identity.
5. Integrate the existing frontend with the existing backend.
6. Implement the missing functionality defined in the REVERIE SRS.
7. Improve weak areas without destabilizing strong areas.
8. Make the system production-structured while keeping future infrastructure flexible.
9. Test every meaningful change before considering it complete.

The most important rule is:

> **DO NOT BREAK WHAT ALREADY WORKS.**

---

# 1. SOURCE OF TRUTH

The repository itself is the primary implementation source.

Use the provided **REVERIE SRS** as the functional and architectural specification.

Before changing anything:

- inspect the repository
- inspect the existing frontend
- inspect the existing backend
- inspect existing API contracts
- inspect database migrations
- inspect existing services
- inspect existing components
- inspect existing authentication
- inspect existing admin functionality
- inspect existing hero implementation
- inspect existing product data
- inspect existing asset structure
- inspect existing animations
- inspect existing tests

Do not assume that something is missing simply because it is not obvious.

Search the repository first.

If functionality already exists:

> **Reuse and integrate it instead of recreating it.**

If functionality is partially implemented:

> **Complete it instead of replacing it.**

If functionality is working correctly:

> **Leave it alone.**

---

# 2. ABSOLUTE NON-NEGOTIABLE RULES

These rules override optimization, refactoring, visual experimentation, and convenience.

## RULE 1 — NO REBUILD

Do NOT:

- rebuild the frontend from scratch
- rebuild the backend from scratch
- replace the existing architecture
- replace working components unnecessarily
- replace the design system unnecessarily
- replace the existing routing structure unnecessarily
- replace the database schema unnecessarily
- replace the existing hero
- replace working animations
- replace working product components
- rewrite large portions of the project just to make the code look cleaner

Refactor only when there is a clear engineering reason.

---

# 3. HERO PAGE IS LOCKED

## EXTREMELY IMPORTANT

The existing scrolling hero section is already implemented and working.

### DO NOT CHANGE THE HERO DESIGN OR BEHAVIOUR.

The hero is a protected component.

Do NOT:

- redesign it
- replace it
- change the animation
- change the frame sequence
- change frame timing
- change scroll behaviour
- change sticky behaviour
- change the scroll distance
- change the camera/composition
- change typography positioning
- change the hero layout
- add new hero animations
- add moving watch hands
- add competing GSAP animations
- add another 3D hero system
- replace the canvas implementation
- convert it into a normal image
- change the existing visual storytelling

The existing hero must remain visually and behaviourally identical.

### Hero may only be touched if there is a verified technical problem involving:

- broken rendering
- mobile failure
- severe performance issue
- asset loading failure
- browser compatibility
- accessibility failure
- catastrophic runtime error

Even then:

> Make the smallest possible targeted fix.

Do not use a technical issue as an excuse to redesign the hero.

### Hero acceptance rule

Before and after implementation, verify:

- first frame is identical
- last frame is identical
- scroll-to-frame behaviour is identical
- scroll distance is identical
- sticky behaviour is identical
- frame loading behaviour is intact
- mobile behaviour is intact
- reduced-motion behaviour is intact
- no new animation interferes with it
- no layout shift is introduced

If these cannot be preserved, do not modify the hero.

---

# 4. NO MOVING WATCH HAND ANIMATION

Do NOT add:

- ticking hands
- rotating hands
- continuous watch-hand movement
- fake mechanical movement
- decorative clock animations

REVERIE should feel alive through:

- scroll interaction
- cinematic transitions
- subtle motion
- GSAP
- Lenis
- product presentation
- 3D assets where appropriate
- editorial storytelling

Not through a moving clock-hand animation.

---

# 5. DESIGN PHILOSOPHY

REVERIE is a luxury watch brand.

The existing visual direction should be preserved.

The website should feel:

- luxurious
- restrained
- cinematic
- editorial
- premium
- modern
- minimal
- sophisticated
- tactile
- intentional

Avoid:

- generic SaaS aesthetics
- excessive gradients
- excessive glassmorphism
- excessive rounded cards
- unnecessary shadows
- noisy dashboards
- excessive animations
- template-like UI
- AI-generated-looking layouts
- unnecessary visual effects
- over-decoration

Do not redesign the storefront simply because another design seems fashionable.

---

# 6. CURRENT STACK

Respect the existing technology choices unless a verified technical reason requires otherwise.

Expected architecture includes:

### Frontend

- Next.js
- React
- existing styling system
- GSAP
- Lenis
- Canvas-based hero
- Three.js where already appropriate
- responsive/mobile-first implementation

### Backend

- Java 21
- Spring Boot
- modular monolith
- Spring Security
- REST APIs
- PostgreSQL
- JPA
- Flyway
- Docker

### Architecture principle

Keep the modular monolith.

Do NOT introduce:

- microservices
- Kubernetes
- Kafka
- unnecessary message brokers
- distributed tracing infrastructure
- event-driven architecture everywhere
- unnecessary infrastructure complexity

unless there is a demonstrated requirement.

---

# 7. IMPLEMENTATION STRATEGY

Follow this sequence.

## PHASE 0 — REPOSITORY AUDIT

Before writing code, inspect:

### Frontend

- routes
- layouts
- components
- services
- hooks
- state management
- API clients
- localStorage usage
- authentication
- cart
- wishlist
- checkout
- account
- orders
- product pages
- collections
- search
- admin
- hero
- animations
- assets
- mobile layouts

### Backend

Inspect:

- modules
- controllers
- services
- repositories
- entities
- DTOs
- security
- authentication
- authorization
- database migrations
- payment providers
- shipping providers
- inventory
- orders
- customers
- addresses
- wishlist
- cart
- returns
- support
- CMS
- analytics
- audit
- configuration
- tests

### Database

Inspect:

- all Flyway migrations
- relationships
- indexes
- constraints
- enums
- unique constraints
- foreign keys

### Output

Create an internal implementation map:

| Area | Existing | Working | Partial | Missing | Action |
|---|---|---|---|---|---|

Do not begin large implementation until this audit is complete.

---

# 8. STABILITY-FIRST RULE

For every feature, classify it as:

### A — WORKING

Leave it alone unless integration is required.

### B — PARTIAL

Complete the existing implementation.

### C — BROKEN

Fix the smallest root cause.

### D — MISSING

Implement using existing architecture.

### E — DUPLICATED

Consolidate only when safe.

Never rewrite category A functionality unnecessarily.

---

# 9. BACKEND MUST BE THE SOURCE OF TRUTH

Customer-facing commerce must not rely on fake/local-only business state when a backend equivalent exists.

The backend is authoritative for:

- products
- variants
- prices
- inventory
- tax
- promotions
- cart
- wishlist for authenticated customers
- addresses
- checkout
- orders
- payments
- shipping
- returns
- customer data
- CMS content
- admin data
- permissions
- audit logs

Frontend should render backend state.

---

# 10. REMOVE LOCAL-ONLY COMMERCE WHERE BACKEND ALREADY EXISTS

Inspect and replace inappropriate localStorage-only implementations.

Examples include:

- cart
- wishlist
- saved addresses
- orders
- inventory
- admin stock
- admin order state
- tracking data
- dashboard metrics

Do NOT remove localStorage blindly.

Local storage may remain appropriate for:

- guest cart
- guest wishlist
- UI preferences
- temporary checkout state
- non-authoritative client state

When a customer authenticates:

> Merge guest state into the backend safely.

---

# 11. PRODUCT CATALOG

Backend product data should become authoritative.

Implement/verify:

- products
- variants
- collections
- categories
- product media
- pricing
- inventory
- product attributes
- search
- filtering
- sorting

The frontend should consume the API rather than maintaining a competing catalog.

---

# 12. WATCH-SPECIFIC PRODUCT DATA

REVERIE products must support appropriate watch information such as:

- reference/SKU
- movement
- movement type
- power reserve
- case diameter
- case thickness
- case material
- case finish
- crystal
- dial
- hands
- indices
- crown
- caseback
- strap
- bracelet
- clasp
- water resistance
- warranty
- authenticity information
- availability
- product media
- 3D model where available

Do not force irrelevant shoe/jewelry/product fields into REVERIE.

---

# 13. PRODUCT DETAIL PAGE

Preserve the existing visual quality.

Improve functionality where needed:

- backend product data
- variant selection
- inventory state
- pricing
- availability
- add to cart
- wishlist
- product media
- specifications
- storytelling
- 3D asset support
- related products
- collections
- reviews
- authenticity/warranty information

Do not turn the page into a generic product template.

---

# 14. COLLECTIONS AND DISCOVERY

Implement robust discovery.

Support:

- collections
- categories
- search
- filters
- sorting
- availability
- price
- movement
- case material
- strap/bracelet
- collection
- relevant watch specifications

Maintain the luxury editorial feel.

---

# 15. CART

Cart must be reliable.

Verify:

- add item
- remove item
- update quantity
- variant correctness
- stock validation
- price validation
- persistence
- authenticated cart
- guest cart
- guest → authenticated merge
- error handling
- empty state
- loading state

Backend must revalidate important commerce data.

---

# 16. WISHLIST

Connect authenticated wishlist functionality to the backend.

Support:

- add
- remove
- list
- persistence
- authentication
- guest wishlist where appropriate
- guest → account merge where appropriate

Do not maintain two conflicting wishlist sources.

---

# 17. CUSTOMER AUTHENTICATION

Authentication must use real backend authentication.

Implement/verify:

- registration
- login
- logout
- session handling
- refresh
- password recovery
- password reset
- OTP where supported
- Google OAuth
- account profile

Do not use fake credentials.

Do not create frontend authentication shortcuts.

---

# 18. GOOGLE OAUTH SECURITY

Do NOT merely decode Google JWT payloads.

Properly verify:

- token signature
- issuer
- audience
- expiration
- subject
- email
- email_verified
- state
- nonce where applicable

Do not trust browser-supplied identity claims.

Use a proper Google identity-token verification mechanism.

---

# 19. CHECKOUT — HIGH PRIORITY

Checkout must become a real commerce flow.

Do NOT use:

- fake order creation
- local-only order storage
- fake confirmation
- hardcoded tax
- browser-authoritative totals
- fake payment success
- raw card storage

Checkout should support:

1. cart validation
2. customer/guest identity
3. address
4. shipping method
5. backend price calculation
6. tax calculation
7. promotion validation
8. inventory reservation
9. order creation
10. payment initiation
11. payment verification
12. order confirmation

---

# 20. MONEY

Use backend-authoritative minor units.

For INR:

> Store monetary values in paise.

Never rely on floating-point currency calculations.

The backend determines:

- subtotal
- discount
- tax
- shipping
- final total

Frontend displays the result.

---

# 21. PAYMENT

The browser must never send raw card data to REVERIE backend.

Use a tokenized/hosted payment provider flow.

Maintain provider abstraction.

Expected structure:

```text
Frontend
   ↓
Payment Provider SDK / Hosted Checkout
   ↓
Provider
   ↓
Webhook
   ↓
REVERIE Backend
   ↓
Payment Verification
   ↓
Order State
   ↓
Inventory Commit
```

Payment webhooks must be:

- authenticated/verified
- idempotent
- replay-safe
- transactionally safe

Do not mark an order paid merely because the browser says payment succeeded.

---

# 22. INVENTORY

Existing inventory concurrency logic is important.

Do not rewrite it unnecessarily.

Preserve:

- locking
- reservation
- release
- commit
- available stock
- reserved stock
- sold stock
- inventory movements

Integrate checkout into the existing inventory system.

Do not create a second inventory implementation.

---

# 23. ORDERS

Orders must be backend-authoritative.

Support:

- creation
- status
- status history
- customer order history
- order detail
- cancellation rules
- payment status
- shipment status
- returns
- refunds
- immutable product/price snapshots

Customer order pages must use real backend data.

Remove sample order data where real backend data is available.

---

# 24. SHIPPING

Preserve the existing shipping-provider abstraction.

Do not fabricate real courier tracking.

Support the architecture for:

- shipment creation
- tracking number
- carrier
- tracking status
- shipment events
- delivery status
- webhook updates

If a real courier is not configured:

> Clearly treat it as development/manual provider behavior.

Never present fake tracking as real courier tracking.

---

# 25. ADDRESSES

Connect customer addresses to the backend.

Support:

- create
- update
- delete
- list
- default address
- checkout selection
- validation

Do not maintain a competing localStorage address database.

---

# 26. RETURNS / REFUNDS

Verify and connect:

- return request
- reason
- eligibility
- approval/rejection
- replacement
- refund
- status
- audit history

Keep business rules backend-owned.

---

# 27. CUSTOMER ACCOUNT

Account should provide:

- profile
- addresses
- orders
- order details
- wishlist
- returns
- support
- concierge where applicable
- security/session management

Preserve existing visual design.

---

# 28. ADMIN — REVERIE ATELIER

The admin panel should function as:

> **Atelier Management + Commerce Operations + CMS**

Not just a dashboard.

Recommended structure:

```text
REVERIE ATELIER

OVERVIEW
├── Dashboard
└── Analytics

COMMERCE
├── Orders
├── Payments
├── Shipping
├── Returns & Refunds
└── Customers

CATALOG
├── Products
├── Collections
├── Categories
├── Variants
└── Inventory

CONTENT
├── Homepage
├── Editorial
├── Campaigns
├── Banners
├── Navigation
├── FAQs
└── SEO

MEDIA
├── Images
├── Videos
└── 3D Assets

CLIENT EXPERIENCE
├── Concierge
├── Reviews
└── Support

SYSTEM
├── Admin Users
├── Roles & Permissions
├── Audit Logs
├── Notifications
├── Integrations
└── Settings
```

---

# 29. ADMIN CMS

CMS should control:

- content
- products
- collections
- editorial
- campaigns
- banners
- navigation
- SEO
- homepage content
- FAQs
- media
- publishing

CMS must NOT expose:

- React code
- CSS
- GSAP
- JavaScript
- Lenis configuration
- Three.js implementation
- component internals

The CMS controls:

> **WHAT REVERIE says and sells.**

The frontend controls:

> **HOW REVERIE looks and behaves.**

---

# 30. HOMEPAGE CMS

Allow administrators to manage structured content such as:

- editorial sections
- featured collections
- featured products
- campaign sections
- banners
- supporting text
- CTAs
- imagery
- videos
- product references

### IMPORTANT

The existing scrolling hero implementation is NOT a CMS page-builder.

The CMS may control hero:

- content
- assets
- copy
- metadata

ONLY if the existing implementation already supports it safely.

Do not allow administrators to alter the hero's technical animation behaviour.

---

# 31. CMS WORKFLOW

Implement where appropriate:

```text
DRAFT
 ↓
REVIEW
 ↓
APPROVED
 ↓
PUBLISHED
```

Support:

- preview
- scheduled publishing
- version history
- rollback
- audit trail

Scheduling must be backend-controlled.

Do not depend on an admin browser tab remaining open.

---

# 32. PRODUCT MEDIA / 3D

Support:

- product images
- alternate views
- video
- GLB
- GLTF
- thumbnails
- optimized assets
- metadata

Do not introduce a new 3D engine if an existing implementation already works.

---

# 33. ADMIN AUTHENTICATION

This is a critical security area.

Remove any frontend fallback such as:

- mock admin tokens
- hardcoded admin credentials
- password shortcuts
- local fake login
- "admin123"
- development password acceptance
- fake success when backend authentication fails

Admin login must use the actual backend authentication system.

No exceptions.

---

# 34. ADMIN RBAC

Respect backend roles and permissions.

At minimum support the existing role architecture where applicable:

- ADMIN
- SUPER_ADMIN
- PRODUCT_MGR
- INVENTORY_MGR
- ORDER_MGR
- SUPPORT_AGENT
- CONTENT_MGR
- ANALYST

Frontend visibility is not the security boundary.

Backend authorization must enforce access.

---

# 35. ADMIN DATA MUST BE REAL

Remove hardcoded/fake:

- metrics
- orders
- stock
- customer records
- audit records
- appointments
- tracking
- catalog records

If backend functionality exists:

> connect it.

If backend functionality is missing:

> implement it using the existing architecture.

Do not hide missing functionality behind fake data.

---

# 36. AUDIT LOGGING

Important admin actions should be auditable.

Record appropriate:

- actor
- action
- target
- timestamp
- result
- relevant metadata

Especially:

- product changes
- price changes
- inventory changes
- order status changes
- refunds
- content publishing
- permission changes
- authentication/security events

---

# 37. SECURITY

Apply strong security practices throughout.

Verify:

- authentication
- authorization
- input validation
- output safety
- CSRF strategy where applicable
- secure cookies/tokens
- rate limiting where appropriate
- password security
- OAuth verification
- webhook verification
- idempotency
- least privilege
- secret handling
- sensitive-data protection
- audit logging
- dependency security

Never commit:

- secrets
- API keys
- production credentials
- private certificates
- real payment credentials

---

# 38. PRODUCTION FLEXIBILITY

The architecture should support future production upgrades without requiring a rewrite.

Use provider abstractions where appropriate for:

- payment
- shipping
- email
- notifications
- storage
- search
- fraud/risk
- AI

However:

> Do not implement expensive production infrastructure merely for the sake of saying it exists.

Build the correct extension points now.

Production infrastructure can be activated later.

---

# 39. DATABASE

Preserve Flyway migrations.

Do not modify old migrations destructively after they are already part of the migration history.

For schema changes:

> create a new migration.

Maintain:

- foreign keys
- indexes
- constraints
- uniqueness
- transactional integrity

Do not introduce duplicate representations of the same business entity.

---

# 40. API ARCHITECTURE

Use stable REST APIs.

Maintain clear:

- request DTOs
- response DTOs
- validation
- error responses
- authentication
- authorization
- pagination
- filtering
- sorting

Do not expose internal entities directly when DTOs are appropriate.

Avoid unnecessary API-breaking changes.

---

# 41. ERROR HANDLING

Every major flow needs:

### Loading

Clear loading UI.

### Success

Clear confirmation.

### Error

Human-readable recovery path.

### Empty

Intentional empty-state design.

### Network failure

Graceful retry/recovery.

Do not leave users staring at:

- blank screens
- infinite spinners
- console errors
- broken buttons
- silent failures

---

# 42. MOBILE-FIRST

The storefront must work properly on:

- mobile
- tablet
- desktop

Pay special attention to:

- navigation
- product grids
- product detail
- cart
- checkout
- forms
- account
- order tracking
- wishlist

Do not solve mobile by simply shrinking desktop layouts.

---

# 43. ACCESSIBILITY

Target strong accessibility.

Verify:

- keyboard navigation
- focus states
- semantic HTML
- accessible buttons
- labels
- form errors
- contrast
- reduced motion
- screen-reader labels
- touch targets

Do not break existing animation accessibility.

---

# 44. PERFORMANCE

Improve performance without changing visual behaviour.

Prioritize:

- image optimization
- lazy loading
- code splitting
- API efficiency
- unnecessary re-renders
- caching
- asset loading
- mobile performance

For the hero:

> Preserve the current implementation unless a measurable technical problem exists.

---

# 45. ANIMATION RULE

Animation must communicate something.

Use existing:

- GSAP
- Lenis
- scroll interaction
- subtle transitions
- reveal animations
- hover states

Avoid animation overload.

Do not add animations simply because the page feels empty.

---

# 46. DO NOT MAKE IT LOOK AI-GENERATED

Avoid:

- random floating blobs
- excessive gradients
- generic glass cards
- unnecessary glowing borders
- overused rounded cards
- random 3D objects
- excessive parallax
- animation everywhere

REVERIE should feel art-directed.

---

# 47. FRONTEND CODE ORGANIZATION

If the current admin or storefront contains large monolithic components:

Refactor incrementally only when necessary.

Prefer feature-based organization such as:

```text
admin/
  dashboard/
  products/
  collections/
  inventory/
  orders/
  payments/
  shipping/
  customers/
  content/
  media/
  concierge/
  reviews/
  support/
  settings/
```

Do not perform a giant refactor solely for aesthetics.

---

# 48. API CLIENT

Create/reuse a consistent API layer.

Avoid scattering:

```javascript
fetch(...)
```

throughout unrelated components.

Centralize:

- base URL
- authentication
- headers
- refresh
- errors
- serialization
- API response handling

Reuse the existing `authService` and existing service architecture where appropriate.

Do not create duplicate authentication systems.

---

# 49. STATE MANAGEMENT

Use:

- server state for backend data
- local state for UI
- local persistence only where appropriate

Do not duplicate backend state unnecessarily.

---

# 50. TESTING REQUIREMENT

Every significant implementation must be tested.

At minimum verify:

### Authentication

- registration
- login
- logout
- refresh
- OAuth
- password recovery

### Commerce

- catalog
- product
- cart
- wishlist
- address
- checkout
- payment
- order
- inventory

### Customer

- account
- orders
- returns
- support

### Admin

- login
- RBAC
- products
- inventory
- orders
- payments
- CMS
- media
- audit

### Responsive

- mobile
- tablet
- desktop

---

# 51. CROSS-LAYER TESTING

Do not stop at unit tests.

Where practical verify:

```text
Frontend
   ↓
API
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
   ↓
Provider
   ↓
Backend state
   ↓
Frontend state
```

Important flows must work end-to-end.

---

# 52. NO FAKE COMPLETION

This is extremely important.

Never mark a feature complete if it is:

- mocked
- hardcoded
- local-only when backend exists
- visually simulated
- TODO
- placeholder
- fake API
- fake payment
- fake tracking
- fake admin authentication

If something intentionally remains a development provider:

> clearly isolate it behind the provider abstraction and label it as development/manual.

---

# 53. ENVIRONMENT CONFIGURATION

Development and production must be separated.

Do not use insecure production defaults such as:

```text
JWT_SECRET=default-secret
```

Production secrets must be required.

Development may use explicitly documented development configuration.

Never commit real secrets.

---

# 54. CORS

Do not use permissive production CORS such as:

```text
*
```

Use environment-specific allowed origins.

---

# 55. OBSERVABILITY

Build the foundation for:

- structured logs
- health checks
- error visibility
- metrics
- important business-event logging

Do not add an enormous observability stack unnecessarily.

---

# 56. FUTURE PRODUCTION EXTENSIONS

Architecture should allow future:

- real Razorpay/Stripe
- courier integrations
- notification providers
- object storage
- CDN
- dedicated search
- fraud scoring
- MFA
- managed secrets
- centralized monitoring
- backup/restore
- load testing

But these should not force unnecessary complexity into the current prototype.

---

# 57. IMPLEMENTATION ORDER

Follow this order.

## PHASE 1 — SAFETY

- repository audit
- hero verification
- remove mock admin authentication
- remove dangerous fallbacks
- verify environment configuration
- verify security boundaries

## PHASE 2 — CUSTOMER FOUNDATION

- authentication
- API client
- catalog
- product pages
- cart
- wishlist
- addresses

## PHASE 3 — CHECKOUT

- backend totals
- tax
- promotions
- shipping
- inventory reservation
- order creation
- payment flow

## PHASE 4 — ORDERS

- customer order history
- order detail
- tracking
- cancellation
- returns
- refunds

## PHASE 5 — ADMIN

- admin authentication
- RBAC
- dashboard
- products
- inventory
- orders
- payments
- shipping
- customers

## PHASE 6 — CMS

- homepage content
- editorial
- campaigns
- banners
- navigation
- SEO
- media
- 3D assets
- preview
- publishing
- version history

## PHASE 7 — CLIENT EXPERIENCE

- concierge
- reviews
- support
- notifications

## PHASE 8 — QUALITY

- mobile
- accessibility
- performance
- error states
- loading states
- empty states
- testing
- security verification

---

# 58. QUALITY GATE

After each major phase:

1. Build frontend.
2. Build backend.
3. Run tests.
4. Check database migrations.
5. Check API contracts.
6. Check browser console.
7. Check network errors.
8. Test critical user flows.
9. Test mobile.
10. Re-check the hero.
11. Verify no unrelated regressions.

Do not continue piling changes on top of a broken phase.

Fix the phase before proceeding.

---

# 59. REGRESSION PROTECTION

Before declaring completion, verify that these existing areas still work:

- homepage
- scrolling hero
- navigation
- collections
- product pages
- animations
- cart
- responsive layouts
- authentication
- admin
- backend health
- database migrations

Especially verify:

> **The hero looks and behaves exactly as it did before the implementation work.**

---

# 60. VISUAL REGRESSION RULE

Do not judge visual changes only by code correctness.

After implementation, visually inspect:

- homepage
- hero
- navigation
- collection pages
- product pages
- cart
- checkout
- account
- admin

If an implementation technically works but damages the luxury presentation:

> fix the implementation.

---

# 61. DO NOT OVER-ENGINEER

The goal is not maximum technology.

The goal is:

> **maximum quality with minimum unnecessary complexity.**

Prefer:

- existing architecture
- existing components
- existing services
- existing providers
- existing database structures

before introducing new systems.

---

# 62. DECISION RULE

When deciding whether to change something:

Ask:

### 1.
Is it broken?

If NO → leave it.

### 2.
Is it incomplete?

If YES → complete it.

### 3.
Does backend functionality already exist?

If YES → integrate it.

### 4.
Will this change affect an unrelated working feature?

If YES → redesign the implementation approach.

### 5.
Can the change be made smaller?

If YES → make it smaller.

### 6.
Can the existing implementation be reused?

If YES → reuse it.

---

# 63. SCORE TARGET

The goal is not superficial feature quantity.

Target:

> **Every major subsystem should be at least 8/10.**

Where reasonably achievable, continue toward:

> **9/10 or better.**

However:

> Never sacrifice stability simply to move a subjective score from 8.5 to 9.

A stable 8.5 is better than a broken 9.

---

# 64. FINAL DEFINITION OF DONE

REVERIE is complete only when:

### Storefront

- homepage works
- hero preserved
- navigation works
- collections work
- search works
- products work
- product detail works
- cart works
- wishlist works
- checkout works
- account works
- orders work
- tracking works
- returns work

### Commerce

- backend is authoritative
- inventory is consistent
- prices are authoritative
- tax is authoritative
- payment architecture is correct
- webhooks are idempotent
- orders are persisted
- snapshots are immutable

### Admin

- real authentication
- RBAC
- dashboard
- catalog
- inventory
- orders
- payments
- shipping
- customers
- returns
- CMS
- media
- editorial
- campaigns
- navigation
- SEO
- reviews
- concierge
- support
- audit
- settings

### Engineering

- no fake critical functionality
- no dangerous auth fallback
- no hardcoded production secrets
- no duplicate commerce state
- no broken migrations
- tests pass
- frontend builds
- backend builds
- critical flows work
- mobile works
- accessibility is acceptable
- performance is acceptable

### Design

- luxury REVERIE identity preserved
- existing visual language preserved
- animations remain intentional
- no unnecessary redesign
- no moving watch hands
- hero remains unchanged

---

# 65. MOST IMPORTANT FINAL INSTRUCTION

Before modifying ANY existing feature:

> **UNDERSTAND IT FIRST.**

Before replacing ANY existing implementation:

> **PROVE THAT REPLACEMENT IS NECESSARY.**

Before changing ANY visual section:

> **PROVE THAT THE CURRENT VERSION IS BROKEN OR INCOMPLETE.**

Before creating a new backend service:

> **CHECK WHETHER THE EXISTING MODULE ALREADY PROVIDES THE REQUIRED CAPABILITY.**

Before adding a new database table:

> **CHECK WHETHER THE EXISTING DOMAIN MODEL CAN SUPPORT THE REQUIREMENT.**

Before adding an external dependency:

> **CHECK WHETHER THE CURRENT STACK ALREADY SOLVES THE PROBLEM.**

---

# FINAL COMMAND TO ANTIGRAVITY

Build and refine REVERIE using this specification and the existing repository.

Do not create a second REVERIE.

Do not rebuild REVERIE.

Do not redesign REVERIE unnecessarily.

Do not replace working functionality.

Do not introduce fake functionality to make the application appear complete.

Do not add moving watch hands.

Do not modify the existing scrolling hero unless there is a verified technical defect, and if one exists, make only the smallest possible fix.

Your priority order is:

```text
1. PRESERVE
2. INSPECT
3. INTEGRATE
4. FIX
5. COMPLETE
6. TEST
7. OPTIMIZE
8. POLISH
```

Not:

```text
REDESIGN
→ REWRITE
→ REBUILD
→ BREAK
→ PATCH
```

The finished result should feel like the **same REVERIE website, evolved into a complete, reliable, production-structured luxury watch commerce platform**.

The user should never feel that the existing website was replaced.

They should feel that it was **carefully completed and perfected**.
