# REVERIE — Atelier Admin Panel & CMS Full Implementation Specification

## Antigravity Master Implementation Prompt

**Project:** REVERIE Luxury Watch E-Commerce  
**Scope:** Existing REVERIE admin panel + CMS + commerce operations  
**Goal:** Transform the current admin prototype into a fully functional, production-structured Atelier Management & CMS Console.

---

# 1. MASTER DIRECTIVE

Upgrade the existing REVERIE admin panel so that **every capability in this specification is implemented, connected to the existing backend where the backend already provides the necessary domain/service/API foundation, and verified end-to-end**.

This is an **implementation and integration task, not a visual mockup task**.

Do NOT create fake functionality.  
Do NOT use hardcoded demo data where a backend source exists.  
Do NOT make buttons appear functional when they only modify React/local state.  
Do NOT silently replace working REVERIE functionality.  
Do NOT rebuild the customer storefront.  
Do NOT change the existing scrolling hero.  
Do NOT add the moving watch-hand animation.  
Do NOT introduce unnecessary microservices, Kafka, Kubernetes, or a new architecture.

Preserve the existing REVERIE visual identity while making the admin complete, structured, accessible, responsive, secure, and operationally useful.

The minimum quality target for every major subsystem is **8/10**. 8/10 is a floor, not a ceiling.

---

# 2. PRESERVATION FIRST

Before changing anything:

1. Inspect the entire existing admin implementation.
2. Inspect the existing frontend service/API layer.
3. Inspect the Spring Boot backend modules/controllers/services/entities/repositories.
4. Inspect database migrations.
5. Inspect authentication and RBAC.
6. Inspect existing CMS/content, catalog, inventory, order, payment, shipping, returns, customer, support, concierge, analytics and audit capabilities.
7. Map existing APIs before creating new APIs.
8. Reuse existing backend domain logic whenever appropriate.
9. Extend existing modules rather than duplicating them.
10. Keep API contracts consistent.
11. Do not create duplicate domain models simply because the admin needs a screen.

The existing customer website is already a designed product. The admin must enhance the project without damaging the storefront.

---

# 3. TARGET ADMIN INFORMATION ARCHITECTURE

Preserve useful existing concepts but expand them into a coherent Atelier console:

```text
REVERIE ATELIER

OVERVIEW
  Dashboard
  Analytics

COMMERCE
  Orders
  Payments
  Shipping
  Returns & Refunds
  Customers

CATALOG
  Products
  Collections
  Categories
  Variants
  Inventory
  Media

CONTENT / CMS
  Homepage
  Editorial
  Campaigns
  Banners / Promotions
  Navigation
  FAQs / Pages
  SEO

CLIENT EXPERIENCE
  Concierge
  Reviews
  Support

SYSTEM
  Admin Users
  Roles & Permissions
  Audit Logs
  Notifications
  Integrations
  Settings
```

Do not force this exact navigation if existing routing conventions require a better equivalent, but all capabilities must exist.

---

# 4. SOURCE-OF-TRUTH RULE

The backend is authoritative for all business data.

The admin frontend must NOT use local state/localStorage as the permanent source of truth for:

- products
- variants
- inventory
- prices
- collections
- categories
- orders
- payments
- shipments
- returns
- customers
- reviews
- support records
- concierge records
- CMS content
- promotions
- admin users
- audit logs
- analytics

Local React state may be used for temporary UI state such as modal visibility, form drafts before save, filters, sorting, selected rows and loading state.

If a backend equivalent exists, use it.

---

# 5. REQUIRED CAPABILITIES

## 5.1 Executive Dashboard

Implement a real backend-backed dashboard.

Support useful metrics such as:

- gross/net sales where supported
- orders
- pending/processing/shipped/delivered orders
- cancellations
- refunds
- customers/new customers
- average order value
- low-stock products
- inventory value where supported
- top products
- top collections
- recent activity

Never hardcode business metrics.

If a metric does not exist, implement the smallest correct backend query/service needed rather than inventing a number.

Include loading, empty, error and sensible date-range states.

---

## 5.2 Product / Catalog Management

Create a real product management system.

Admin must be able to:

- list/search/filter/sort products
- create/edit products
- save drafts
- publish/unpublish
- archive
- view details
- manage pricing
- SKU/reference
- descriptions
- specifications
- categories
- collections
- tags/attributes
- variants
- media
- SEO

Product editor:

```text
Basic Information
Classification
Pricing
Variants
Specifications
Media
Editorial / Story
SEO
Publishing
```

Do not create an arbitrary page builder.

---

## 5.3 Variant Management

Variants must be first-class entities.

Support applicable fields such as:

- material
- case
- dial
- strap
- size
- movement
- color
- SKU
- price
- inventory
- availability

Variant selection and stock remain backend-authoritative.

---

## 5.4 Inventory

Replace current local/demo stock editing with real inventory operations.

Support:

- available stock
- reserved stock
- sold stock where supported
- low-stock alerts
- stock adjustment
- adjustment reason
- inventory movement history
- reservations
- filtering/search
- audit trail

Do not bypass existing transaction/locking/reservation logic.

A successful UI save must mean the backend actually persisted the change.

---

## 5.5 Collections

Support:

- create/edit/archive
- publish/unpublish
- title
- description
- slug
- cover image
- SEO
- manual product selection
- product ordering

Keep rule-based collections optional unless the existing architecture already supports them cleanly.

---

## 5.6 Categories

Support:

- create/edit/archive
- reorder
- hierarchy where supported
- slug
- description
- image
- SEO
- product assignment

Prevent destructive operations that would orphan products without safe validation.

---

## 5.7 Product Media

Create a real media system for:

- product images
- galleries
- editorial images
- campaign images
- banners
- videos
- thumbnails
- OG images
- 3D assets

Useful metadata:

- filename
- URL/storage key
- type
- size
- dimensions where available
- alt text
- title
- usage/reference
- upload date
- uploader

Use existing storage architecture where available.

---

## 5.8 3D / GLB / GLTF

Support management of 3D assets where storage/runtime architecture allows:

- upload/register
- preview or metadata
- associate with product
- associate with content slot where supported
- mark active/default
- replace/remove association
- validate supported types

The existing scrolling hero remains locked. CMS controls assets/content association only.

---

# 6. CMS

## 6.1 Homepage CMS

Create structured homepage content slots:

```text
Hero
Featured Collection
Featured Products
Editorial Story
Brand Statement
Campaign Section
Newsletter / CTA
```

Allow controlled editing of:

- copy
- CTA
- product selection
- collection selection
- media
- section ordering where supported
- section enabled/disabled state

Do NOT expose GSAP, Three.js, CSS, arbitrary JavaScript or application logic to CMS users.

---

## 6.2 Protected Hero

The existing REVERIE scrolling hero is LOCKED.

Do not:

- redesign it
- replace it
- change frame timing
- change scroll behavior
- change sticky behavior
- add moving watch hands
- add competing animation
- replace the canvas architecture

Only allow safe CMS-controlled content/assets if already supported.

---

## 6.3 Editorial CMS

Expand the existing Editorial CMS.

Support:

- create/edit story
- draft
- preview
- review
- approve
- publish
- unpublish
- archive
- schedule
- author
- category
- tags
- cover image
- excerpt
- body
- SEO

Workflow:

```text
DRAFT
  ↓
IN_REVIEW
  ↓
APPROVED
  ↓
PUBLISHED
```

Optional states:

```text
SCHEDULED
ARCHIVED
```

---

## 6.4 Campaign CMS

Support:

- campaign name
- start/end date
- media
- headline
- description
- CTA
- featured collection
- featured products
- editorial story
- promotional messaging
- SEO
- publication state
- scheduling

---

## 6.5 Banners / Promotions

Manage:

- announcement bar
- promotional banners
- campaign banners
- homepage promotional blocks

Keep visual promotion content separate from actual coupon/discount business logic.

Never allow CMS copy to claim a discount that backend pricing does not apply.

---

## 6.6 Navigation CMS

Manage:

- header navigation
- collection links
- category links
- footer navigation
- customer-care links
- editorial links

Support ordering, enable/disable, labels and safe destinations.

Do not allow arbitrary JavaScript or unsafe URLs.

---

## 6.7 SEO CMS

For products, collections, categories, editorial content, campaigns and pages, support:

- SEO title
- meta description
- slug
- canonical URL
- OG title
- OG description
- OG image
- indexing directive where supported

Generate safe defaults but allow overrides.

---

# 7. PUBLISHING

## 7.1 Preview

Every publishable CMS entity should support preview where practical.

Preview must use the actual storefront components/styles rather than a fake renderer.

Support:

- desktop preview
- mobile preview
- draft preview

Clearly label:

```text
DRAFT PREVIEW
NOT LIVE
```

---

## 7.2 Scheduled Publishing

Support backend-owned scheduled publishing.

Do not depend on a browser tab remaining open.

Use an existing scheduler/queue if available. Otherwise implement the simplest reliable backend mechanism compatible with the current modular monolith.

---

## 7.3 Version History

Important CMS entities should have:

- version number
- created by
- timestamp
- change summary where possible
- current/previous versions
- restore

Restoration must be auditable.

---

# 8. COMMERCE OPERATIONS

## 8.1 Customers

Support:

- search
- filtering
- customer details
- account status
- orders
- saved addresses where authorized
- relevant activity
- support history
- concierge history
- reviews

Never expose authentication secrets or raw payment credentials.

---

## 8.2 Orders

Replace hardcoded/local orders with backend-backed orders.

Support:

- list
- search
- filtering
- details
- status
- line items
- totals
- customer
- address where authorized
- payment state
- fulfillment state
- order history
- cancellation where permitted
- audit trail

Status transitions must be validated by the backend.

---

## 8.3 Payments

Support:

- transactions
- order association
- payment status
- provider
- amount
- currency
- failed payments
- refunds
- webhook/event visibility
- transaction details

Never display raw card/CVV data.

---

## 8.4 Shipping / Fulfillment

Support:

- pending fulfillment
- shipment state
- carrier
- tracking
- dispatch
- delivery state
- shipment events
- order association

If provider is mocked, label it clearly.

Never present fabricated tracking as real courier tracking.

Keep provider abstraction intact.

---

## 8.5 Returns / Refunds

Support:

- return requests
- details
- reasons
- item/order association
- status
- approve/reject
- receive return where supported
- refund state
- replacement/exchange where supported
- audit trail

Refund operations must use backend/payment abstractions.

---

## 8.6 Reviews Moderation

Support:

- list
- search
- filters
- product/customer context
- approve
- reject
- flag
- publish/unpublish
- feature where supported

Moderation changes must be auditable.

---

## 8.7 Support

Support:

- ticket list
- ticket detail
- customer
- order association
- priority
- status
- assignment
- conversation/history
- internal notes
- resolution

Statuses:

```text
OPEN
IN_PROGRESS
WAITING_FOR_CUSTOMER
RESOLVED
CLOSED
```

---

## 8.8 Concierge

Preserve the current VIP Concierge capability and expand it to:

- requests
- appointments
- virtual consultations
- private atelier visits
- customer association
- scheduling
- status
- notes
- staff assignment
- history

---

# 9. ADMIN USERS / RBAC

Use backend-authoritative roles, including existing roles where available:

- ADMIN
- SUPER_ADMIN
- PRODUCT_MGR
- INVENTORY_MGR
- ORDER_MGR
- SUPPORT_AGENT
- CONTENT_MGR
- ANALYST

Support appropriate admin-user management:

- list
- create/invite where supported
- activate/deactivate
- assign roles
- inspect activity

Never allow a lower-privileged user to grant themselves higher privileges.

Frontend permission visibility is UX only; backend authorization is mandatory.

---

# 10. ADMIN AUTHENTICATION SECURITY

Remove all mock/fallback admin authentication.

There must be no success based on credentials such as:

```text
admin123
reverie2026
password.length >= 6
```

Remove mock tokens such as:

```text
mock-admin-token
```

Admin login must succeed only when the backend authorizes it.

Use the authoritative admin login API.

Prepare for mandatory MFA/2FA without breaking the current authentication architecture.

---

# 11. AUDIT LOGS

Use backend audit records.

Capture important events:

- login/logout/failure
- product create/update/publish
- inventory adjustment
- order status change
- refund
- return decision
- CMS publish
- rollback
- role change
- settings change

Support:

- search
- filters
- date range
- actor
- action
- entity
- result

Do not call logs immutable unless backend guarantees it.

---

# 12. SETTINGS / INTEGRATIONS

Provide safe operational settings for:

```text
Store
Payments
Shipping
Notifications
CMS
SEO
Admin
Security
Integrations
```

Never expose raw secrets in the frontend.

Use environment/secret-manager-controlled credentials.

Show integration connection state and safe metadata.

---

# 13. FRONTEND ARCHITECTURE

Do not keep the entire admin in one giant `page.jsx`.

Refactor incrementally into feature modules.

Suggested shape:

```text
app/admin/
  page.jsx
  dashboard/
  products/
  collections/
  categories/
  inventory/
  orders/
  payments/
  shipping/
  returns/
  customers/
  cms/
    homepage/
    editorial/
    campaigns/
    navigation/
    promotions/
    seo/
  media/
  reviews/
  concierge/
  support/
  users/
  audit/
  settings/
```

Create/reuse shared components:

```text
AdminShell
AdminSidebar
AdminHeader
DataTable
FilterBar
StatusBadge
MetricCard
ConfirmDialog
Drawer
Modal
Pagination
EmptyState
ErrorState
LoadingState
FormSection
MediaPicker
PublishControls
VersionHistory
AuditTimeline
```

Do not duplicate UI patterns.

---

# 14. API LAYER

Do not scatter raw fetch calls across large components.

Reuse or create a coherent admin API layer:

```text
services/admin/
  dashboardService
  productService
  collectionService
  categoryService
  inventoryService
  orderService
  paymentService
  shippingService
  returnService
  customerService
  reviewService
  supportService
  conciergeService
  cmsService
  mediaService
  auditService
  adminUserService
```

Follow existing project conventions where better.

Centralize:

- authentication
- authorization failures
- JSON parsing
- API errors
- session handling
- loading behavior

---

# 15. DESIGN SYSTEM

The admin should look unmistakably REVERIE without becoming a copy of the storefront.

Use:

- warm luxury neutrals
- cream/ivory foundation where appropriate
- white surfaces
- deep warm charcoal text
- muted taupe secondary text
- restrained REVERIE gold
- existing serif/display typography where appropriate
- clean sans-serif UI typography
- subtle borders
- restrained shadows
- refined spacing
- operational information density

Storefront:

```text
cinematic
editorial
immersive
spacious
```

Admin:

```text
precise
structured
information-dense
operational
```

Same brand DNA. Different purpose.

---

# 16. RESPONSIVE / ACCESSIBILITY

Admin must work on desktop, laptop, tablet and smaller screens.

Do not simply shrink desktop tables.

Use responsive navigation, tables/drawers where appropriate and usable touch targets.

Target WCAG 2.1 AA principles:

- keyboard navigation
- visible focus
- semantic controls
- sufficient contrast
- accessible dialogs/tables
- accessible errors
- status not communicated by color alone

---

# 17. UX STATES

Every data-driven page must handle:

```text
Loading
Success
Empty
Error
Unauthorized
Forbidden
Not Found
Saving
Saved
Validation Error
Network Failure
```

Never leave pages silently blank.

Use confirmation for destructive actions such as archive, refund, reject and role changes where appropriate.

---

# 18. DATA INTEGRITY

Every mutation follows:

```text
UI
 ↓
API
 ↓
Backend validation
 ↓
Business rules
 ↓
Transaction
 ↓
Database/provider
 ↓
Response
 ↓
UI update
```

Do not show success before backend confirmation.

Do not bypass backend business rules.

---

# 19. MONEY / SEARCH / PERFORMANCE

Follow backend-authoritative money/currency representation.

Do not recreate tax or checkout calculations in the admin frontend.

For large datasets use backend pagination/filtering.

Use appropriate:

- search
- filters
- sort
- pagination
- date ranges

Use route-level loading/lazy loading and optimized assets where justified.

---

# 20. SECURITY

Mandatory:

- server-side authorization
- RBAC enforcement
- no mock auth
- no hardcoded credentials
- no secrets in frontend
- no raw payment card/CVV handling
- input validation
- safe file uploads
- safe URL handling
- audit important mutations
- appropriate CSRF/session protections
- rate limiting where appropriate
- secure error responses

---

# 21. NO-FAKE-DATA AUDIT

Before completion, search the admin code for:

- hardcoded orders
- hardcoded customers
- hardcoded metrics
- hardcoded inventory
- hardcoded tracking
- hardcoded audit logs
- mock admin tokens
- demo credentials
- fake success messages
- permanent localStorage business data
- placeholder APIs
- TODO implementations
- buttons with no action

Remove or replace them.

If a backend provider is intentionally mocked behind an abstraction, the UI must clearly reflect that provider/environment state.

---

# 22. TESTING

Test critical paths:

### Authentication
- valid login
- invalid login
- unauthorized user
- forbidden role
- logout
- expired session

### Catalog
- list/search
- create/edit
- validation
- publish/archive

### Inventory
- view
- adjustment
- invalid adjustment
- audit
- concurrency

### Orders
- list/filter
- detail
- valid/invalid transitions
- audit

### CMS
- create/edit
- draft
- preview
- review
- approve
- publish
- schedule
- version restore

### Customers
- search/detail
- order history
- privacy boundaries

### Payments
- transaction list/detail
- failed payment
- refund state
- webhook visibility

### Shipping
- shipment/tracking/provider state

### Returns
- request
- approve/reject
- refund state

### Reviews
- moderation

### RBAC
Test each major role against permitted and forbidden operations.

### Responsive/accessibility
Test desktop/tablet/mobile and keyboard navigation.

---

# 23. END-TO-END ACCEPTANCE

The implementation must prove:

```text
Admin changes product
→ backend persists
→ storefront reflects product

Admin changes collection
→ backend persists
→ storefront reflects collection

Admin publishes editorial content
→ backend persists
→ storefront displays it

Admin changes homepage content
→ backend persists
→ storefront reflects it

Admin adjusts inventory
→ backend persists
→ customer availability reflects it

Customer creates order
→ admin sees order

Payment changes state
→ admin sees correct payment state

Shipment changes
→ admin sees shipment
→ customer sees shipment

Customer submits review
→ admin moderates
→ storefront reflects approved review

Customer support request
→ admin sees ticket
→ status changes persist

Admin role changes
→ server-side authorization changes

Admin action
→ audit log records it
```

---

# 24. IMPLEMENTATION PHASES

## Phase 1 — Audit
Inspect current frontend, backend, APIs, migrations, auth/RBAC and existing modules. Produce an internal capability/API map before changing code.

## Phase 2 — Foundation
Build/refactor AdminShell, routing, API layer, permissions, shared data components, forms, loading/error/empty states and design tokens.

## Phase 3 — Commerce
Implement dashboard, products, variants, collections, categories, inventory, orders, payments, shipping, returns and customers.

## Phase 4 — CMS
Implement homepage, editorial, campaigns, banners/promotions, navigation, SEO, media, preview, workflow, scheduling and versioning.

## Phase 5 — Client Experience
Implement concierge, reviews and support.

## Phase 6 — System
Implement admin users, RBAC UI, audit, settings, integrations and notification visibility.

## Phase 7 — Hardening
Run security, responsive, accessibility, performance, API-error, integration and build verification.

---

# 25. DEFINITION OF DONE

The admin is complete only when:

1. Existing REVERIE visual identity is preserved.
2. Existing storefront is not unnecessarily changed.
3. Existing scrolling hero remains untouched.
4. No moving watch-hand animation is added.
5. Mock admin authentication is removed.
6. Hardcoded business data is removed.
7. Permanent commerce/CMS state is not localStorage-only.
8. Backend is the source of truth.
9. All required capabilities are reachable through coherent navigation.
10. CMS content can affect the storefront.
11. Catalog changes persist.
12. Inventory changes persist.
13. Orders and fulfillment persist.
14. Payments are backend-authoritative.
15. Shipping is backend/provider-authoritative.
16. Returns/refunds persist.
17. Customers are accessible with correct privacy controls.
18. Reviews can be moderated.
19. Support is operational.
20. Concierge remains functional.
21. RBAC is enforced server-side.
22. Audit logs are backend-backed.
23. Preview uses real storefront components.
24. Publishing workflow persists.
25. Scheduling is backend-owned.
26. Version history persists.
27. Media management is real.
28. GLB/GLTF association is supported safely.
29. SEO metadata persists.
30. Settings/integrations do not expose secrets.
31. Loading/error/empty/permission states are complete.
32. Desktop/tablet/mobile admin UX is usable.
33. Accessibility meets the intended WCAG 2.1 AA direction.
34. Critical flows are tested.
35. Production build passes.
36. No unnecessary architecture rewrite was introduced.

---

# 26. FINAL ANTIGRAVITY DIRECTIVE

Build this as a **real REVERIE Atelier Management & CMS Console**, not a demo dashboard.

Use the existing project as the source of truth.

**Inspect before modifying.  
Reuse before replacing.  
Integrate before duplicating.  
Preserve before redesigning.  
Do not fake functionality.**

Do not declare success until the full request path works:

```text
Admin UI
→ API
→ Backend
→ Database/provider
→ Response
→ Admin UI
→ Storefront/customer impact where applicable
```

The final result should feel like a serious internal platform for a luxury watch company:

**refined visually, operationally dense, secure, maintainable, backend-authoritative, CMS-capable, and genuinely usable by the REVERIE team.**

The objective is not to make the admin look complete.

The objective is to make the admin **actually complete**.
