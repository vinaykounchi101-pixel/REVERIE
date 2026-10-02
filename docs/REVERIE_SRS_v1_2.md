# REVERIE — Software Requirements Specification (SRS)

**Version:** 1.2  
**Status:** Authoritative Implementation Baseline  
**Product:** REVERIE — Luxury Mechanical Watch E-Commerce Platform  
**Audience:** Product, Design, Engineering, QA, DevOps, and implementation agents  
**Primary frontend:** Existing Next.js / React storefront  
**Backend:** Java 21, Spring Boot, Spring Security, Spring Data JPA/Hibernate, Maven  
**Database:** PostgreSQL  
**Storage:** Local filesystem in development; Supabase Storage for deployment  
**API:** REST + OpenAPI/Swagger  
**Migrations:** Flyway  
**Containers:** Docker  

---

## 0. Document Control

### 0.1 Purpose of this SRS

This document defines the functional, technical, security, data, API, UX-integration, testing, deployment, and operational requirements for REVERIE.

REVERIE is a luxury mechanical-watch e-commerce platform. The existing REVERIE frontend is the visual and interaction baseline. Backend work must support that experience rather than replace it with a generic e-commerce interface.

This SRS is standalone and authoritative for REVERIE implementation.

### 0.2 Requirement scope tiers

| Tag | Meaning | Rule |
|---|---|---|
| **[M]** | MVP / required baseline | Must be implemented and verified. |
| **[S]** | Should | Implement when the core baseline is stable. |
| **[P]** | Production Later | Design the interface/hook now; real production implementation may be deferred. |

Scope tiers are implementation priorities, not limitations on the product's long-term commercial architecture.

### 0.3 Implementation-agent rules

The implementation agent must:

1. Read this SRS before modifying the application.
2. Treat the existing REVERIE frontend as the visual baseline.
3. Preserve existing brand identity, layout intent, typography, imagery, interaction language, and approved motion.
4. Do not replace the storefront with a generic e-commerce template.
5. Do not introduce visual redesigns that are not required by an approved requirement.
6. Do not invent unresolved business, payment, legal, tax, shipping, or deployment decisions.
7. Treat every `OPEN` or unresolved decision as requiring clarification before implementing affected behavior.
8. Never represent mocked functionality as real functionality.
9. Keep provider-specific code behind replaceable interfaces.
10. Validate the running application at desktop and mobile sizes after implementation.
11. Fix functional errors, accessibility defects, console errors, broken states, and obvious visual regressions before considering a requirement complete.
12. Preserve graceful fallbacks for heavy or optional capabilities such as WebGL and 3D.

### 0.4 Change summary from v1.1

Version 1.2:

- Removes academic-project framing.
- Establishes REVERIE as a production-oriented product with staged implementation.
- Strengthens frontend-preservation requirements.
- Adds explicit backend-authority and anti-client-tampering rules.
- Strengthens audit and administrative controls.
- Expands acceptance and verification requirements.
- Clarifies reliability, observability, API, environment, and deployment requirements.
- Keeps watch-specific requirements authoritative.
- Retains provider abstraction so payment, shipping, AI, storage, and notifications can evolve without rewriting core business logic.
- Removes dependency on any external project or brand from this document.

---

# 1. Product Definition

## 1.1 Product vision

REVERIE is a premium digital commerce experience for mechanical watches.

The platform must combine:

- luxury product presentation,
- high-quality product discovery,
- technically accurate watch specifications,
- immersive but purposeful interaction,
- real 3D watch visualization where available,
- secure commerce,
- reliable inventory,
- high-value order handling,
- post-purchase service,
- warranty and authenticity information,
- customer support,
- and a refined administrative system.

The interface should feel like a luxury watch brand first and an e-commerce application second.

## 1.2 Core principles

1. **Product first:** the watch remains the primary visual subject.
2. **Commerce integrity:** the backend is authoritative for commercial state.
3. **Luxury without visual noise:** motion and 3D must support the product rather than become decoration.
4. **Real data:** product specifications must come from authoritative records.
5. **Progressive enhancement:** 3D, animation, AI, and rich media must degrade gracefully.
6. **Security by default:** authorization is enforced server-side.
7. **Provider independence:** external services must not dictate domain logic.
8. **Traceability:** requirements map to implementation and verification.
9. **Mobile-first usability:** the experience must work naturally on mobile as well as desktop.
10. **No false completion:** mocked or placeholder functionality must be clearly treated as such.

## 1.3 In scope

- Customer authentication and accounts
- Catalog and product management
- Watch-specific specifications
- Product variants and SKUs
- Product media
- Interactive 3D watch models
- Search and discovery
- Wishlist
- Compare
- Recently viewed
- Cart
- Saved-for-later
- Buy Now
- Checkout
- Pricing
- GST
- Coupons and promotions
- Inventory
- Reservations
- Mock payment infrastructure
- Replaceable payment providers
- Shipping and tracking
- Orders
- Returns
- Refunds
- Warranty
- Authenticity records
- Reviews
- Customer support
- Notifications
- Wallet/store credit
- Gift functionality
- AI assistant
- Admin
- RBAC
- Audit logs
- Analytics foundations
- Security
- Testing
- Deployment
- Production hardening hooks

## 1.4 Explicitly out of scope unless later approved

- Multi-vendor marketplace
- Multi-currency commerce
- Multi-language commerce
- Native iOS/Android applications
- Used/pre-owned watch resale marketplace
- Watch trade-in marketplace
- Cryptocurrency payments
- Real-world KYC/fraud provider integration
- Real courier booking during the baseline implementation
- Real SMS/WhatsApp transactional delivery during baseline implementation
- Automatic GST filing/e-invoice submission
- Precious-metal or regulatory certification performed by the platform itself

---

# 2. Users, Roles and Permissions

## 2.1 Customer-facing actors

| Actor | Capabilities |
|---|---|
| Guest | Browse, search, filter, compare, view product details, view 3D, use local shopping state, check serviceability. |
| Registered customer | Customer account, addresses, orders, returns, reviews, wallet, gifts, notifications, support, reorder and account features. |
| System | Background jobs, provider callbacks, scheduled processes, notifications and internal workflows. |
| Administrator | Controlled operational and content management according to assigned permissions. |

### 2.2 Customer access rules

- Customers may access only their own private resources.
- Customers cannot access admin endpoints.
- Customer-facing route hiding is not a security boundary.
- Resource ownership must be checked server-side.

## 2.3 Admin roles

The system supports:

- `SUPER_ADMIN`
- `ADMIN`
- `PRODUCT_MGR`
- `INVENTORY_MGR`
- `ORDER_MGR`
- `SUPPORT_AGENT`
- `CONTENT_MGR`
- `ANALYST`

Permissions must be stored/configurable rather than duplicated throughout business logic.

### 2.4 Permission matrix

| Permission | SUPER_ADMIN | ADMIN | PRODUCT_MGR | INVENTORY_MGR | ORDER_MGR | SUPPORT_AGENT | CONTENT_MGR | ANALYST |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Product create/update/delete | ✓ | ✓ | ✓ | | | | | |
| Inventory read/update | ✓ | ✓ | R | ✓ | R | | | |
| Order read | ✓ | ✓ | | R | ✓ | ✓ | | R |
| Order update/cancel | ✓ | ✓ | | | ✓ | | | |
| Payment read | ✓ | ✓ | | | ✓ | R | | R |
| Refund create | ✓ | ✓ | | | ✓ | | | |
| Customer read/update | ✓ | ✓ | | | R | ✓ | | R |
| Coupon create/update | ✓ | ✓ | ✓ | | | | | |
| Review moderation | ✓ | ✓ | | | | ✓ | ✓ | |
| Support management | ✓ | ✓ | | | | ✓ | | |
| CMS/media management | ✓ | ✓ | MEDIA | | | | ✓ | |
| Analytics read | ✓ | ✓ | | | | | | ✓ |
| User/role/permission management | ✓ | | | | | | | |
| Audit read | ✓ | ✓ | | | | | | |

`R` means read-only.

High-impact actions must be audited.

---

# 3. Technology and Architecture

## 3.1 Backend stack

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA / Hibernate
- PostgreSQL
- Flyway
- Maven
- REST
- OpenAPI/Swagger
- Docker

## 3.2 Frontend

The existing REVERIE storefront remains the frontend baseline.

The frontend may use:

- Next.js
- React
- TypeScript
- GSAP
- ScrollTrigger
- Lenis
- Three.js/WebGL
- responsive CSS
- optimized image and 3D assets

The backend must not force a visual rebuild.

## 3.3 Architecture

```text
Next.js / React
      |
      | REST / JSON
      v
Spring Boot API
      |
      +--> Controller / DTO / Validation
      |
      +--> Service / Business Rules / Transactions
      |
      +--> Repository / JPA
      |
      v
PostgreSQL
```

## 3.4 Business modules

```text
com.reverie
├── common
├── auth
├── user
├── catalog
├── inventory
├── discovery
├── cart
├── pricing
├── checkout
├── payment
├── shipping
├── order
├── returns
├── engagement
├── support
├── ai
├── admin
└── storage
```

A business module must communicate with another business module through service interfaces rather than directly accessing another module's repositories.

## 3.5 Provider boundaries

```text
PaymentProvider
      ↓
PaymentService
      ↓
Checkout / Order

ShippingProvider
      ↓
ShippingService
      ↓
Checkout / Order

AIProvider
      ↓
AIService
      ↓
Approved Business Services

StorageProvider
      ↓
MediaService
      ↓
Catalog / CMS / Review Media

NotificationProvider
      ↓
NotificationService
      ↓
Domain Events
```

Provider implementations must not leak provider-specific concepts into core domain logic.

---

# 4. Environments

| Environment | Backend | Database | Storage | Providers |
|---|---|---|---|---|
| Local | Spring Boot | Local PostgreSQL | Local disk | Mock |
| Test | Spring Boot | Testcontainers PostgreSQL | Temporary/in-memory | Mock |
| Deployed | Docker | Supabase PostgreSQL | Supabase Storage | Configured providers |
| Production | Docker/managed runtime | Managed PostgreSQL | Supabase/S3/CDN as selected | Real providers |

Requirements:

- **NFR-ENV-001 [M]** Secrets must come from environment configuration or an approved secret store.
- **NFR-ENV-002 [M]** No secrets may be committed to source control.
- **NFR-ENV-003 [M]** `.env.example` must document required variables without real credentials.
- **NFR-ENV-004 [M]** Profiles must separate local, test and production behavior through configuration.
- **NFR-ENV-005 [M]** Database migrations must execute through Flyway.
- **NFR-ENV-006 [P]** Staging must be isolated from production credentials and data.

---

# 5. Authentication and Authorization

## 5.1 Customer authentication

- **FR-AUTH-001 [M]** Email/password registration and login.
- **FR-AUTH-002 [M]** Email verification.
- **FR-AUTH-003 [M]** Password reset through a time-limited, single-use token.
- **FR-AUTH-004 [M]** Secure logout and refresh-token invalidation.
- **FR-AUTH-005 [S]** Google authentication.
- **FR-AUTH-006 [S]** Phone/OTP authentication.
- **FR-AUTH-007 [S]** Active-session management.

Unverified customers may browse and build shopping state but may not place an order.

## 5.2 Token strategy

- **FR-AUTH-010 [M]** Short-lived JWT access tokens.
- **FR-AUTH-011 [M]** Opaque refresh tokens stored hashed server-side.
- **FR-AUTH-012 [M]** Refresh-token rotation and reuse detection.
- **FR-AUTH-013 [M]** Refresh token delivered using `HttpOnly`, `Secure`, `SameSite` cookie controls where cookie authentication is used.
- **FR-AUTH-014 [M]** Passwords use BCrypt or Argon2 with an appropriate work factor.

## 5.3 OTP

- Six-digit OTP.
- Ten-minute expiration.
- Single-use.
- Hashed storage.
- Maximum verification attempts.
- Rate-limited sending.

## 5.4 Admin authentication

- **FR-AUTH-030 [M]** Admin authentication is logically separate from customer authentication.
- **FR-AUTH-031 [M]** Customer tokens must never authorize admin endpoints.
- **FR-AUTH-032 [M]** Public registration must never create an administrator.
- **FR-AUTH-033 [M]** Initial privileged administrator creation must occur through controlled provisioning.
- **FR-AUTH-034 [S]** TOTP-based MFA for administrators.
- **FR-AUTH-035 [P]** Mandatory MFA for privileged production administrators.

## 5.5 Authorization

Every protected request must evaluate:

1. authentication,
2. role/permission,
3. resource ownership,
4. business-state authorization.

Ownership failures should not reveal the existence of another customer's resource.

---

# 6. Catalog

## 6.1 Product

A watch product supports:

- name
- slug
- description
- short description
- brand
- category
- collection
- watch type
- base price
- optional sale price
- badges
- SEO metadata
- publication status
- warranty
- care information

## 6.2 Watch specifications

The catalog must support:

- movement type
- caliber
- movement description
- case material
- case diameter
- case thickness
- lug width
- dial
- crystal
- strap/bracelet
- water resistance
- power reserve
- complications
- weight
- country of origin
- warranty
- limited-edition information

Specifications must be structured wherever they affect filtering, search, display, or business logic.

## 6.3 Lifecycle

```text
DRAFT → PUBLISHED → ARCHIVED
```

- Only `PUBLISHED` products are customer-visible.
- Products with historical orders must not be hard-deleted.
- Deletion is soft deletion.
- Slugs are unique.
- **[S]** Previous slugs redirect to new slugs.

## 6.4 Variants and SKUs

- Each sellable configuration has a unique SKU.
- Variant-level inventory is supported.
- Variant-level pricing overrides are supported.
- Variant attributes may include dial, strap, bracelet, size and other approved watch attributes.
- Backend resolves the authoritative variant.
- Client-provided prices are never trusted.

---

# 7. Luxury Watch Features

## 7.1 Limited editions

- **FR-LUX-001 [M]** Products may define an edition size.
- **FR-LUX-002 [M]** Per-customer purchase limits are enforced server-side.
- **FR-LUX-003 [S]** Individual edition numbers are assigned to physical units.

## 7.2 Serial numbers

- **FR-LUX-010 [S]** Physical watch units may have unique serial numbers.
- Serial numbers may be linked to order items during fulfillment.
- Serial information must be protected from unauthorized disclosure.

## 7.3 Authenticity

- **FR-LUX-020 [S]** An authenticity certificate may be generated for eligible watches.
- Certificate data must derive from authoritative product/unit/order records.
- The platform must never invent authenticity claims.

## 7.4 Warranty

- **FR-LUX-030 [M]** Warranty duration is configurable per product/variant.
- **FR-LUX-031 [M]** Warranty starts according to the defined fulfillment/delivery rule.
- **FR-LUX-032 [M]** Warranty information appears in customer order details.
- **FR-LUX-033 [S]** Warranty/service requests are linked to support tickets.

## 7.5 Pre-orders

- **FR-LUX-040 [S]** Products may support `PREORDER` status.
- Expected shipment dates must be clearly displayed.
- Checkout must preserve the pre-order condition.
- Pre-order rules must not be represented as ordinary in-stock inventory.

## 7.6 Gift experience

- **FR-LUX-050 [S]** Gift packaging options.
- **FR-LUX-051 [S]** Gift message.
- **FR-LUX-052 [S]** Gift-related pricing and fulfillment information must be included in checkout totals and order snapshots.

## 7.7 High-value handling

- **FR-LUX-060 [M]** Orders above a configurable threshold are flagged as high-value.
- **FR-LUX-061 [M]** High-value orders may require prepaid payment.
- **FR-LUX-062 [M]** High-value orders may require manual operational review.
- **FR-LUX-063 [M]** Insured shipping status must be represented when applicable.
- The threshold must be configuration-driven rather than hard-coded.

---

# 8. Product Media and 3D

## 8.1 Media

- **FR-MED-001 [M]** Multiple product images.
- **FR-MED-002 [M]** Variant-specific media where required.
- **FR-MED-003 [M]** Ordered media.
- **FR-MED-004 [M]** Alt text.
- **FR-MED-005 [M]** Upload type, size and ownership validation.
- **FR-MED-006 [S]** Video media.
- **FR-MED-007 [S]** Automated image optimization.

Suggested baseline limits:

- Image: JPEG/PNG/WebP, ≤ 5 MB.
- Video: MP4, ≤ 50 MB.
- 3D: GLB/glTF binary, ≤ 15 MB.

## 8.2 3D

- **FR-3D-001 [M]** Applicable products may expose an explicit **View in 3D** action.
- **FR-3D-002 [M]** The viewer supports mouse and touch interaction.
- **FR-3D-003 [M]** The viewer supports rotation and zoom.
- **FR-3D-004 [M]** Product/variant-to-model relationship is stored.
- **FR-3D-005 [M]** Product cards must not automatically load heavy 3D assets.
- **FR-3D-006 [M]** WebGL/model failure falls back to standard product imagery.
- **FR-3D-007 [M]** 3D must not block basic product purchasing.
- **FR-3D-008 [S]** Progressive/lazy loading and compression.
- **FR-3D-009 [P]** CDN delivery for production-scale 3D assets.

## 8.3 Cinematic frontend experience

- **FR-3D-020 [M]** The existing cinematic hero remains frontend-owned.
- **FR-3D-021 [M]** GSAP/ScrollTrigger/Lenis behavior remains compatible with backend integration.
- **FR-3D-022 [M]** Backend integration must not replace the visual experience with generic commerce UI.
- **FR-3D-023 [M]** No unnecessary animation may be introduced solely to demonstrate technology.

---

# 9. Search and Discovery

- **FR-SRCH-001 [M]** Search by product name, category, watch type, collection and approved tags.
- **FR-SRCH-002 [M]** Filter by price and watch-specific structured attributes.
- **FR-SRCH-003 [M]** Sort by supported commercial/product fields.
- **FR-SRCH-004 [M]** Pagination.
- **FR-SRCH-005 [M]** Only published products appear in customer discovery.
- **FR-SRCH-006 [M]** Filters must correspond to real catalog data.
- **FR-SRCH-007 [S]** PostgreSQL full-text search with appropriate indexes.
- **FR-SRCH-008 [S]** Search suggestions/autocomplete.
- **FR-SRCH-009 [P]** Dedicated search infrastructure at larger scale.

## 9.1 Wishlist

- **FR-WISH-001 [M]** Add/remove products or variants.
- **FR-WISH-002 [M]** Prevent duplicates.
- **FR-WISH-003 [M]** Persist account wishlist.
- **FR-WISH-004 [M]** Support deterministic guest-to-account merge.
- **FR-WISH-005 [S]** Back-in-stock subscription from wishlist.

## 9.2 Compare

- **FR-COMP-001 [M]** Customers can compare supported watches.
- Comparison must use structured product specifications.
- The compare experience must not invent missing specifications.

## 9.3 Recently viewed

- **FR-RECENT-001 [M]** Recently viewed products are stored for the customer/session.
- **FR-RECENT-002 [M]** Only currently visible products are displayed.

---

# 10. Cart

- **FR-CART-001 [M]** Add a purchasable variant.
- **FR-CART-002 [M]** Update quantity.
- **FR-CART-003 [M]** Remove item.
- **FR-CART-004 [M]** Save for later.
- **FR-CART-005 [M]** Read cart.
- **FR-CART-006 [M]** Validate variant, publication state, stock and price.
- **FR-CART-007 [M]** Guest cart is supported.
- **FR-CART-008 [M]** Account cart is supported.
- **FR-CART-009 [M]** Guest-to-account merge is deterministic.
- **FR-CART-010 [M]** Buy Now never destroys the existing cart.
- **FR-CART-011 [M]** Saved-for-later items are excluded from checkout totals.
- **FR-CART-012 [M]** Server recalculates authoritative totals.

---

# 11. Pricing, Money, Tax and Promotions

## 11.1 Money

- All internal monetary values use integer INR paise.
- Floating-point arithmetic must not be used for authoritative monetary calculations.
- Currency is explicitly stored/returned.
- Rounding rules are deterministic and tested.

## 11.2 Pricing

- **FR-MON-001 [M]** Backend calculates subtotal.
- **FR-MON-002 [M]** Backend calculates discounts.
- **FR-MON-003 [M]** Backend calculates tax.
- **FR-MON-004 [M]** Backend calculates shipping.
- **FR-MON-005 [M]** Backend calculates final payable amount.
- **FR-MON-006 [M]** Client-provided totals cannot override server totals.

## 11.3 GST

Checkout supports configurable:

- CGST
- SGST
- IGST
- applicable tax class
- HSN where required

Tax rates and seller-state configuration must be configurable rather than embedded in frontend code.

## 11.4 Coupons

- **FR-CPN-001 [M]** Coupon validity is evaluated server-side.
- **FR-CPN-002 [M]** Expired/inactive coupons are rejected.
- **FR-CPN-003 [M]** Usage limits are enforced atomically.
- **FR-CPN-004 [M]** One coupon per order unless explicitly configured otherwise.
- **FR-CPN-005 [M]** Coupon applicability rules are enforced server-side.
- **FR-CPN-006 [M]** Coupon redemption is idempotent.

---

# 12. Inventory

## 12.1 Inventory model

Inventory is variant/SKU-specific.

Track:

- available
- reserved
- sold
- returned
- low-stock threshold

## 12.2 Requirements

- **FR-INV-001 [M]** Inventory is backend authoritative.
- **FR-INV-002 [M]** Inventory can never become negative.
- **FR-INV-003 [M]** Inventory adjustments are transactional.
- **FR-INV-004 [M]** Concurrent purchases cannot oversell stock.
- **FR-INV-005 [M]** Inventory movements are append-only.
- **FR-INV-006 [M]** Every manual adjustment requires a reason and actor.
- **FR-INV-007 [M]** Checkout reservations temporarily hold stock.
- **FR-INV-008 [M]** Expired reservations release stock.
- **FR-INV-009 [M]** Payment success converts reserved stock into sold stock.
- **FR-INV-010 [S]** Per-unit serial inventory.
- **FR-INV-011 [M]** Back-in-stock subscriptions are supported.

Inventory concurrency must use database-safe locking/atomic updates.

---

# 13. Checkout

## 13.1 Checkout session

Checkout is a persisted `CheckoutSession`.

It contains:

- source (`CART` / `BUY_NOW`)
- selected lines
- address snapshot
- shipping selection
- coupon
- wallet amount
- pricing snapshot
- expiration
- status

## 13.2 Checkout requirements

- **FR-CHK-001 [M]** Authenticate before order placement.
- **FR-CHK-002 [M]** Verify customer email before order placement.
- **FR-CHK-003 [M]** Validate address.
- **FR-CHK-004 [M]** Revalidate product publication.
- **FR-CHK-005 [M]** Revalidate stock.
- **FR-CHK-006 [M]** Revalidate prices.
- **FR-CHK-007 [M]** Revalidate coupons.
- **FR-CHK-008 [M]** Calculate shipping.
- **FR-CHK-009 [M]** Calculate tax.
- **FR-CHK-010 [M]** Create stock reservation.
- **FR-CHK-011 [M]** Display material price/stock changes before confirmation.
- **FR-CHK-012 [M]** Prevent payment against an expired checkout session.
- **FR-CHK-013 [M]** Create a pending order before initiating payment.
- **FR-CHK-014 [M]** Use idempotency for order creation.

---

# 14. Payments

## 14.1 Architecture

Payment logic must be accessed through:

```text
PaymentProvider
       ↓
PaymentService
       ↓
Checkout / Order
```

The core domain must not depend directly on a provider SDK.

## 14.2 Payment states

Payment state is separate from order state.

Suggested states:

```text
PENDING
PROCESSING
PAID
FAILED
REFUNDED
PARTIALLY_REFUNDED
```

## 14.3 Requirements

- **FR-PAY-001 [M]** Payment provider interface.
- **FR-PAY-002 [M]** Mock payment provider for complete end-to-end testing.
- **FR-PAY-003 [M]** Server-side payment verification.
- **FR-PAY-004 [M]** Webhook signature verification where applicable.
- **FR-PAY-005 [M]** Duplicate webhook protection.
- **FR-PAY-006 [M]** Out-of-order webhook handling.
- **FR-PAY-007 [M]** Payment attempt history.
- **FR-PAY-008 [M]** Payment failure and retry.
- **FR-PAY-009 [M]** Refunds cannot exceed captured/paid amount.
- **FR-PAY-010 [M]** Payment secrets never reach browser bundles.
- **FR-PAY-011 [S]** Razorpay adapter.
- **FR-PAY-012 [P]** Additional production payment providers.
- **FR-PAY-013 [P]** Settlement reconciliation and dispute workflows.

A browser redirect, frontend callback, or client-side success message is never proof of payment.

---

# 15. Orders

## 15.1 Order creation

An order is created only after server-side checkout validation.

Order items preserve immutable purchase-time snapshots:

- SKU
- product name
- variant attributes
- quantity
- unit price
- discount
- tax
- HSN
- serial/unit where applicable
- edition number where applicable

## 15.2 Order states

```text
PENDING_PAYMENT
      ↓
CONFIRMED
      ↓
PROCESSING
      ↓
PACKED
      ↓
SHIPPED
      ↓
OUT_FOR_DELIVERY
      ↓
DELIVERED
      ↓
COMPLETED
```

Exceptional states:

```text
EXPIRED
CANCELLED
RETURN_REQUESTED
RETURN_APPROVED
RETURN_IN_TRANSIT
RETURNED
REFUNDED
```

Invalid transitions must be rejected.

## 15.3 Requirements

- **FR-ORD-001 [M]** Unique order number.
- **FR-ORD-002 [M]** Immutable order purchase facts.
- **FR-ORD-003 [M]** State transition validation.
- **FR-ORD-004 [M]** State history.
- **FR-ORD-005 [M]** Customer sees only own orders.
- **FR-ORD-006 [M]** Invoice generation.
- **FR-ORD-007 [M]** Cancellation according to order state.
- **FR-ORD-008 [M]** Payment/order state changes are idempotent.
- **FR-ORD-009 [M]** High-value orders are operationally flagged where applicable.

---

# 16. Shipping

## 16.1 Architecture

```text
ShippingProvider
       ↓
ShippingService
       ↓
Checkout / Order
```

## 16.2 Requirements

- **FR-SHP-001 [M]** Shipping serviceability.
- **FR-SHP-002 [M]** Shipping method/rate selection.
- **FR-SHP-003 [M]** Shipment associated with order.
- **FR-SHP-004 [M]** Admin-managed shipment tracking during baseline implementation.
- **FR-SHP-005 [M]** Shipment status history.
- **FR-SHP-006 [M]** Mock shipping provider.
- **FR-SHP-007 [M]** Customer-facing tracking timeline.
- **FR-SHP-008 [S]** Real courier adapter.
- **FR-SHP-009 [P]** Courier webhooks, NDR/RTO and automated return pickups.
- **FR-SHP-010 [M]** High-value shipment handling flag where applicable.

---

# 17. Returns and Refunds

## 17.1 Returns

- **FR-RET-001 [M]** Customer can submit eligible return requests.
- **FR-RET-002 [M]** Return request is linked to an order and order item.
- **FR-RET-003 [M]** Eligibility is determined server-side.
- **FR-RET-004 [M]** Return state transitions are validated.
- **FR-RET-005 [M]** Return reasons are structured.
- **FR-RET-006 [M]** Admin/support can approve or reject requests.
- **FR-RET-007 [M]** Returned inventory is restocked only according to inspection/business rules.
- **FR-RET-008 [S]** Exchange is represented as a linked return plus new order.

## 17.2 Refunds

- **FR-RET-020 [M]** Refunds are linked to payment and order.
- **FR-RET-021 [M]** Refund amount cannot exceed eligible paid amount.
- **FR-RET-022 [M]** Refund operations are idempotent.
- **FR-RET-023 [M]** Refund destination may be original payment method or wallet/store credit where allowed.
- **FR-RET-024 [M]** Refund actions are audited.

---

# 18. Wallet and Gift Cards

## 18.1 Wallet

- **FR-WAL-001 [S]** Each customer may have a wallet.
- **FR-WAL-002 [S]** Wallet transactions are append-only.
- **FR-WAL-003 [S]** Wallet balance cannot become negative.
- **FR-WAL-004 [S]** Wallet operations are idempotent.
- **FR-WAL-005 [S]** Wallet usage is included in checkout pricing snapshots.

## 18.2 Gift cards

- **FR-GFT-001 [S]** Gift-card issuance.
- **FR-GFT-002 [S]** Gift-card redemption.
- **FR-GFT-003 [S]** Gift-card balance/transaction ledger.
- **FR-GFT-004 [S]** Gift-card redemption is rate-limited and idempotent.

---

# 19. Reviews and Customer Engagement

## 19.1 Reviews

- **FR-REV-001 [M]** Customers can review eligible purchased watches.
- **FR-REV-002 [M]** Verified-purchase status is decided server-side.
- **FR-REV-003 [M]** Review moderation.
- **FR-REV-004 [M]** Customers cannot modify another customer's review.
- **FR-REV-005 [S]** Review media.

## 19.2 Notifications

Notification events may include:

- account verification
- password reset
- order placement
- payment success/failure
- shipment
- delivery
- cancellation
- return
- refund
- warranty/service
- back in stock

Requirements:

- **FR-NOT-001 [M]** In-app notification records.
- **FR-NOT-002 [M]** Notification preferences.
- **FR-NOT-003 [M]** Notification delivery must not be the source of truth for commerce state.
- **FR-NOT-004 [M]** Retry failures where appropriate.
- **FR-NOT-005 [M]** Prevent duplicate notifications caused by repeated events.
- **FR-NOT-006 [M]** Marketing consent is separate from transactional notifications.
- **FR-NOT-007 [S]** Transactional email provider.

---

# 20. Customer Support

- **FR-SUP-001 [M]** Customer support tickets.
- **FR-SUP-002 [M]** Ticket categories.
- **FR-SUP-003 [M]** Ticket status lifecycle.
- **FR-SUP-004 [M]** Customer can see own tickets.
- **FR-SUP-005 [M]** Support staff can respond according to permission.
- **FR-SUP-006 [S]** Warranty/service tickets linked to order items.
- **FR-SUP-007 [S]** FAQ/knowledge base.

---

# 21. AI Assistant

## 21.1 Architecture

```text
Customer
   ↓
AIService
   ↓
Approved tools/services
   ↓
Authoritative REVERIE data
```

The model must not directly mutate commerce state.

## 21.2 Rules

- **FR-AI-001 [M]** AI can answer questions using real REVERIE catalog data.
- **FR-AI-002 [M]** AI must not invent watch specifications.
- **FR-AI-003 [M]** AI must not invent prices.
- **FR-AI-004 [M]** AI must not invent inventory.
- **FR-AI-005 [M]** AI must not invent warranty or authenticity claims.
- **FR-AI-006 [M]** AI must not expose another customer's information.
- **FR-AI-007 [M]** AI cannot approve refunds, cancellations, returns, discounts or privileged actions.
- **FR-AI-008 [M]** AI must communicate uncertainty/no-match honestly.
- **FR-AI-009 [M]** AI provider must be replaceable.
- **FR-AI-010 [M]** AI conversations must be rate-limited.
- **FR-AI-011 [M]** AI failure must not break core shopping functionality.
- **FR-AI-012 [S]** Evaluation set covering factual accuracy, privacy and refusal behavior.

---

# 22. Administration

Admin capabilities include:

- products
- variants
- media
- categories
- collections
- inventory
- orders
- shipments
- customers
- coupons
- reviews
- refunds
- returns
- support
- CMS
- analytics
- audit

Requirements:

- **FR-ADM-001 [M]** Server-side permission enforcement.
- **FR-ADM-002 [M]** High-impact actions require audit records.
- **FR-ADM-003 [M]** Inventory changes require reasons.
- **FR-ADM-004 [M]** Order transitions are validated.
- **FR-ADM-005 [M]** Refund/cancellation operations require appropriate permissions.
- **FR-ADM-006 [M]** Admin APIs are inaccessible to customer tokens.
- **FR-ADM-007 [M]** Admin UI must not be treated as a security boundary.
- **FR-ADM-008 [S]** Audit viewer with filtering.

---

# 23. Audit and Idempotency

## 23.1 Audit

Audit records include:

- actor type
- actor ID
- action
- resource type
- resource ID
- result
- timestamp
- safe metadata

Never log:

- passwords
- OTP values
- card data
- provider secrets
- access tokens
- refresh tokens
- webhook secrets

## 23.2 Idempotency

Idempotency is required for:

- order creation
- payment operations
- webhook events
- refunds
- wallet debits/credits
- coupon redemption
- inventory-affecting operations where retries are possible
- notification event processing

Repeated requests must not produce duplicate financial or inventory effects.

---

# 24. API

## 24.1 Resource groups

```text
/api/auth
/api/customers
/api/products
/api/categories
/api/collections
/api/search
/api/wishlist
/api/compare
/api/recently-viewed
/api/cart
/api/checkout
/api/coupons
/api/wallet
/api/payments
/api/shipping
/api/orders
/api/returns
/api/refunds
/api/reviews
/api/gifts
/api/notifications
/api/support
/api/ai
/api/webhooks/{provider}
/api/admin/*
/api/health
```

## 24.2 API conventions

- **FR-API-001 [M]** Controllers expose DTOs, never persistence entities.
- **FR-API-002 [M]** Bean Validation on input.
- **FR-API-003 [M]** Consistent error structure.
- **FR-API-004 [M]** Pagination is standardized.
- **FR-API-005 [M]** Status codes are consistent.
- **FR-API-006 [M]** Trace/correlation ID is supported.
- **FR-API-007 [M]** Dates use ISO-8601.
- **FR-API-008 [M]** Monetary values are documented as INR paise.
- **FR-API-009 [M]** Health and readiness endpoints exist.
- **FR-API-010 [S]** Frontend-to-API contract documentation is maintained.

### 24.3 Error format

RFC 7807-style errors should include:

```json
{
  "type": "https://reverie.app/errors/out-of-stock",
  "title": "Out of stock",
  "status": 409,
  "code": "INV_OUT_OF_STOCK",
  "detail": "The selected watch is unavailable.",
  "traceId": "a1b2c3",
  "errors": []
}
```

---

# 25. Database

## 25.1 Core entities

```text
Identity:
User, CustomerProfile, AdminUser, Role, Permission,
RolePermission, RefreshToken, OtpToken, Address

Catalog:
Brand, Category, Collection, Product, ProductVariant,
ProductAttribute, ProductMedia, ProductUnit, TaxClass

Inventory:
Inventory, InventoryMovement, StockAlertSubscription

Shopping:
Cart, CartItem, SavedItem, Wishlist, WishlistItem, RecentlyViewed

Pricing:
Coupon, CouponUsage, Promotion

Checkout:
CheckoutSession, CheckoutItem

Payment:
Payment, PaymentTransaction, Refund, WebhookEvent

Orders:
Order, OrderItem, OrderStatusHistory, Invoice, WarrantyRecord

Shipping:
Shipment, ShipmentEvent

Returns:
ReturnRequest, ReturnItem

Engagement:
Review, ReviewMedia, ReviewVote, Notification, NotificationPreference

Money:
Wallet, WalletTransaction, GiftCard, GiftTransaction

Support:
SupportTicket, SupportMessage, FaqEntry

AI:
AIConversation, AIMessage, KnowledgeDocument

Platform:
CMSContent, SEOMetadata, AuditLog, IdempotencyKey, OutboxEvent
```

## 25.2 Database conventions

- **NFR-DB-001 [M]** UUID primary keys.
- **NFR-DB-002 [M]** Business identifiers have unique constraints.
- **NFR-DB-003 [M]** Flyway manages schema changes.
- **NFR-DB-004 [M]** No production Hibernate schema auto-update.
- **NFR-DB-005 [M]** Money uses `BIGINT` paise.
- **NFR-DB-006 [M]** Timestamps use UTC.
- **NFR-DB-007 [M]** Foreign-key and business lookup indexes are required.
- **NFR-DB-008 [M]** Database constraints enforce non-negative monetary/quantity values.
- **NFR-DB-009 [M]** Idempotency uniqueness constraints prevent duplicate processing.
- **NFR-DB-010 [M]** Historical commerce records must remain reconstructable.
- **NFR-DB-011 [M]** Catalog deletion is soft-delete where history requires preservation.

---

# 26. Security

- **NFR-SEC-001 [M]** Authorization is enforced server-side.
- **NFR-SEC-002 [M]** Inputs are validated.
- **NFR-SEC-003 [M]** Persistence uses parameterized queries.
- **NFR-SEC-004 [M]** CORS is restricted to configured frontend origins.
- **NFR-SEC-005 [M]** Secure response headers are configured.
- **NFR-SEC-006 [M]** Cookie-authenticated endpoints receive appropriate CSRF protection.
- **NFR-SEC-007 [M]** Sensitive endpoints are rate-limited.
- **NFR-SEC-008 [M]** Webhook signatures are verified.
- **NFR-SEC-009 [M]** Uploads are validated by actual content/type and size.
- **NFR-SEC-010 [M]** Uploaded filenames are not trusted for executable behavior.
- **NFR-SEC-011 [M]** DTOs prevent mass assignment.
- **NFR-SEC-012 [M]** Secrets never appear in browser bundles.
- **NFR-SEC-013 [M]** Security-sensitive actions are audited.
- **NFR-SEC-014 [S]** Account-enumeration resistance.
- **NFR-SEC-015 [S]** Dependency vulnerability scanning.
- **NFR-SEC-016 [P]** WAF, secret rotation, penetration testing and centralized security monitoring.

Suggested rate limits:

| Area | Baseline |
|---|---|
| Login/OTP | 5 requests / 15 min / identifier + IP |
| OTP verification | 5 attempts / OTP |
| Coupon application | 20 / hour / user |
| Public catalog/search | 120 / minute / IP |
| AI chat | 20 / hour / user |
| Gift-card failures | 5 / hour / user |

---

# 27. Performance and Reliability

## 27.1 Performance

Baseline targets:

| ID | Target |
|---|---|
| NFR-PERF-001 [M] | p95 ≤ 500 ms for catalog/search/cart under approximately 50 concurrent demo users. |
| NFR-PERF-002 [M] | Product-list payload ≤ 200 KB excluding images. |
| NFR-PERF-003 [M] | Checkout order creation ≤ 2 seconds excluding external providers. |
| NFR-PERF-004 [M] | Avoid N+1 queries in list endpoints. |
| NFR-PERF-005 [S] | Product-page LCP target ≤ 3 seconds on a mid-range device, excluding deliberate 3D loading. |
| NFR-PERF-006 [M] | Heavy 3D assets load on demand rather than blocking ordinary product browsing. |

## 27.2 Reliability

- **NFR-REL-001 [M]** Gracefully handle payment failure.
- **NFR-REL-002 [M]** Gracefully handle provider timeout.
- **NFR-REL-003 [M]** Gracefully handle out-of-stock conditions.
- **NFR-REL-004 [M]** Gracefully handle price changes during checkout.
- **NFR-REL-005 [M]** Provider retries must be bounded and safe.
- **NFR-REL-006 [M]** Duplicate events must not corrupt state.
- **NFR-REL-007 [M]** AI outage must not affect catalog/cart/checkout.
- **NFR-REL-008 [S]** Circuit breakers around external providers.
- **NFR-REL-009 [P]** Formal RPO/RTO and multi-instance production architecture.

## 27.3 Observability

- Structured logs.
- Correlation IDs.
- Health endpoint.
- Readiness endpoint.
- Safe error reporting.
- No sensitive payment/security data in logs.
- **[P]** Centralized metrics, dashboards and alerting.

---

# 28. Accessibility and Frontend Compatibility

- **NFR-A11Y-001 [M]** Backend must support the existing frontend without requiring a visual rebuild.
- **NFR-A11Y-002 [M]** Mobile, tablet and desktop layouts must remain usable.
- **NFR-A11Y-003 [M]** `prefers-reduced-motion` must be respected for non-essential motion.
- **NFR-A11Y-004 [M]** Product media provides alt text.
- **NFR-A11Y-005 [M]** 3D viewer provides a usable non-3D alternative.
- **NFR-A11Y-006 [M]** Keyboard interaction is supported where applicable.
- **NFR-A11Y-007 [S]** WCAG 2.1 AA checks for checkout and account flows.
- **NFR-A11Y-008 [M]** No horizontal overflow on supported mobile widths.
- **NFR-A11Y-009 [M]** Core product information and purchasing remain understandable without WebGL.

---

# 29. SEO and Content

- **NFR-SEO-001 [M]** Product pages have stable clean URLs.
- **NFR-SEO-002 [M]** Product metadata is generated from authoritative catalog data.
- **NFR-SEO-003 [M]** Draft/unpublished products are not exposed as public catalog pages.
- **NFR-SEO-004 [M]** Product images include meaningful alt text.
- **NFR-SEO-005 [S]** Structured product metadata.
- **NFR-SEO-006 [S]** Sitemap and robots configuration.
- **NFR-SEO-007 [S]** Redirect support for changed slugs.

---

# 30. Compliance and Legal Foundations

The platform must provide configurable/legal content for:

- Terms
- Privacy Policy
- Shipping Policy
- Returns and Cancellation Policy
- Warranty Policy
- Contact information
- Grievance information where applicable

Requirements:

- **NFR-LEG-001 [M]** Terms/privacy acceptance is recorded where required.
- **NFR-LEG-002 [M]** Marketing consent is separate from transactional communication.
- **NFR-LEG-003 [M]** Product claims are sourced from controlled catalog data.
- **NFR-LEG-004 [S]** Account deletion/data request workflows.
- **NFR-LEG-005 [P]** Formal production legal/compliance review covering applicable Indian e-commerce, privacy, GST, payment and product-claim obligations.

The application must not present legal compliance as complete merely because technical fields exist.

---

# 31. Testing

## 31.1 Testing layers

### Unit

Test:

- pricing
- tax
- coupons
- rounding
- inventory
- state machines
- authorization
- payment state logic
- refund limits
- wallet ledger logic

### Integration

Use PostgreSQL-compatible integration testing for:

- repositories
- migrations
- checkout
- orders
- inventory
- webhook processing
- reservation expiry

### API

Test:

- success
- validation
- authentication
- authorization
- ownership
- pagination
- filtering
- errors
- idempotency

### Security

Test:

- authentication bypass
- privilege escalation
- IDOR
- mass assignment
- token replay
- invalid tokens
- webhook signature failure
- rate limiting
- malicious uploads

### Concurrency

A test purchasing the final unit concurrently must produce:

```text
Stock = 1
Concurrent attempts = N

Expected successful purchases = 1
Expected oversell = 0
```

### Provider contract testing

Every payment/shipping provider implementation must satisfy the same service contract.

### Failure injection

Mock providers must be able to simulate:

- success
- failure
- timeout
- duplicate event
- delayed event
- out-of-order event

## 31.2 Coverage

- **[M]** At least 70% line coverage on the service layer.
- **[M]** 100% of state-machine transitions tested.
- **[M]** All critical business invariants covered.

---

# 32. Critical Acceptance Scenarios

| ID | Scenario | Expected result |
|---|---|---|
| T-CRIT-01 | Successful checkout | Order confirmed, stock committed, invoice generated, notification created. |
| T-CRIT-02 | Payment failure then retry | Same checkout/order flow remains consistent; no duplicate reservation. |
| T-CRIT-03 | Concurrent purchase of last unit | Exactly one successful stock allocation. |
| T-CRIT-04 | Invalid coupon | Clear rejection; totals remain authoritative. |
| T-CRIT-05 | Duplicate webhook | No duplicate payment, stock, order or notification effects. |
| T-CRIT-06 | Cancel eligible order | State transition, inventory and refund behavior remain consistent. |
| T-CRIT-07 | Partial/full refund | Refund never exceeds paid amount. |
| T-CRIT-08 | Manual inventory adjustment | Movement and audit record created; inventory never negative. |
| T-CRIT-09 | Unauthorized admin access | Request denied and high-impact attempt auditable. |
| T-CRIT-10 | Customer accesses another customer's order | Resource is not disclosed. |
| T-CRIT-11 | Guest state merges after login | Deterministic merge with revalidation. |
| T-CRIT-12 | Shipping failure | No corrupted order state; retry/recovery possible. |
| T-CRIT-13 | Reservation expiry | Reserved stock is released. |
| T-CRIT-14 | Price changes during checkout | Customer receives updated authoritative total before payment. |
| T-CRIT-15 | Coupon redemption race | Usage limits remain correct. |
| T-CRIT-16 | Wallet concurrent debit | Balance never becomes negative. |
| T-CRIT-17 | Gift-card brute-force attempts | Rate limited. |
| T-CRIT-18 | Admin permission change | New authorization applies according to token/session policy. |
| T-CRIT-19 | AI requests unauthorized action | AI refuses and directs customer to the appropriate supported workflow. |
| T-CRIT-20 | Invalid webhook signature | Rejected with no state change. |
| T-CRIT-21 | WebGL unavailable | Product remains fully understandable and purchasable using image fallback. |
| T-CRIT-22 | Reduced-motion enabled | Non-essential animation is reduced/disabled. |
| T-CRIT-23 | Mobile product page | No horizontal overflow; core purchase actions remain usable. |
| T-CRIT-24 | Draft product requested publicly | Product is not exposed. |

---

# 33. Deployment

## 33.1 Topology

```text
Development

Next.js
   ↓
Spring Boot
   ↓
Local PostgreSQL


Deployment

Next.js
   ↓
Spring Boot Docker
   ↓
Supabase PostgreSQL
   ↓
Supabase Storage
```

## 33.2 Requirements

- **NFR-DEP-001 [M]** Multi-stage Docker build.
- **NFR-DEP-002 [M]** Non-root application container.
- **NFR-DEP-003 [M]** Environment-based configuration.
- **NFR-DEP-004 [M]** Flyway migrations executed before the application depends on the changed schema.
- **NFR-DEP-005 [M]** Failed migration prevents an invalid deployment from serving traffic.
- **NFR-DEP-006 [S]** CI build/test/security scan/container build.
- **NFR-DEP-007 [M]** Storage service credentials remain server-side.
- **NFR-DEP-008 [P]** Staging environment and controlled deployment strategy.

Suggested configuration:

```text
SPRING_PROFILES_ACTIVE
DB_URL
DB_USER
DB_PASSWORD

JWT_SECRET / signing key
FRONTEND_ORIGIN

PAYMENT_PROVIDER
SHIPPING_PROVIDER
STORAGE_PROVIDER
AI_PROVIDER
NOTIFICATION_PROVIDER

SUPABASE_URL
SUPABASE_SERVICE_KEY

WEBHOOK_SECRET_<PROVIDER>
```

---

# 34. Business Invariants

The following are non-negotiable:

1. Backend is authoritative for price, stock, discount, tax, shipping and totals.
2. Client-supplied totals cannot override backend calculations.
3. Authentication and verified email are required before order placement.
4. Customers can access only their own private data.
5. Admin access requires explicit server-side authorization.
6. Customer and admin authentication domains are separated.
7. Payment results are verified server-side.
8. Browser redirects are never payment proof.
9. Webhook processing is idempotent.
10. Financial operations are idempotent.
11. Inventory never becomes negative.
12. Order purchase facts remain immutable.
13. Limited-edition purchase caps are enforced server-side.
14. High-value order rules are enforced server-side.
15. AI never invents authoritative product or commercial information.
16. AI cannot perform privileged financial/order operations.
17. Provider failures cannot corrupt core business state.
18. Provider implementations remain replaceable.
19. Secrets remain outside source control and browser bundles.
20. Database schema changes are versioned through Flyway.
21. The existing REVERIE visual identity is not silently replaced.
22. Heavy 3D functionality must never prevent basic commerce.
23. Mocked functionality must never be represented as live provider functionality.

---

# 35. Implementation Phases

| Phase | Scope | Tier |
|---|---|---|
| 1 | Foundation: Spring Boot, PostgreSQL, Flyway, profiles, Docker, errors, OpenAPI, health | M |
| 2 | Security: customer auth, verification, JWT/refresh, admin auth, RBAC, rate limiting, audit | M |
| 3 | Catalog: products, variants, SKU, categories, collections, media, 3D references | M |
| 4 | Inventory: stock, movements, reservations, concurrency, expiry jobs | M |
| 5 | Discovery: search, filtering, sorting, wishlist, compare, recently viewed | M |
| 6 | Shopping: cart, saved items, Buy Now, guest-state merge | M |
| 7 | Checkout: address, pricing, GST, coupons, shipping, checkout sessions | M |
| 8 | Payments: provider interface, mock provider, verification, webhooks, retries, refunds | M |
| 9 | Orders/shipping: state machine, invoices, tracking, cancellation, returns | M |
| 10 | Customer services: reviews, notifications, support, warranty, back-in-stock | M |
| 11 | Admin: catalog, inventory, orders, refunds, customers, support, audit, analytics | M |
| 12 | AI: assistant, approved tools, safety rules, evaluation | M |
| 13 | Luxury extensions: serials, authenticity certificates, gifts, wallet, exchanges | S |
| 14 | Hardening: tests, performance, security, deployment, documentation | M |
| 15 | Production expansion: real payment/shipping, observability, fraud, CDN, advanced search | P |

If scope must be reduced, preserve the integrity of:

```text
Authentication
→ Catalog
→ Inventory
→ Cart
→ Pricing
→ Checkout
→ Payment abstraction
→ Orders
→ Shipping
→ Returns/refunds
→ Security
→ Testing
```

Optional luxury extensions must never compromise those foundations.

---

# 36. Definition of Done

REVERIE is considered implementation-complete for the approved baseline only when:

### Product

- [ ] Published watches appear correctly.
- [ ] Watch specifications are authoritative.
- [ ] Variants and SKUs work.
- [ ] Inventory is correct.
- [ ] Product media works.
- [ ] 3D works where configured.
- [ ] WebGL fallback works.

### Experience

- [ ] Existing visual identity is preserved.
- [ ] Desktop works.
- [ ] Tablet works.
- [ ] Mobile works.
- [ ] No horizontal overflow.
- [ ] Motion remains intentional.
- [ ] Reduced-motion behavior works.
- [ ] No generic AI-template artifacts have been introduced.
- [ ] No console errors remain.

### Commerce

- [ ] Cart works.
- [ ] Checkout works.
- [ ] Pricing is backend-authoritative.
- [ ] GST calculations reconcile.
- [ ] Coupons work.
- [ ] Inventory cannot oversell.
- [ ] Reservations expire correctly.
- [ ] Payment state is separate from order state.
- [ ] Orders preserve immutable purchase facts.
- [ ] Returns/refunds are consistent.

### Security

- [ ] Customer/admin separation works.
- [ ] Ownership checks work.
- [ ] Rate limits work.
- [ ] Webhook signatures are validated.
- [ ] Secrets are absent from frontend/source control.
- [ ] Mass-assignment protections work.
- [ ] High-impact actions are audited.

### AI

- [ ] AI uses approved business data.
- [ ] AI does not invent product facts.
- [ ] AI cannot perform unauthorized commerce actions.
- [ ] AI failure does not break commerce.

### Engineering

- [ ] Flyway migrations work from a clean database.
- [ ] API documentation exists.
- [ ] Health/readiness endpoints work.
- [ ] Docker build works.
- [ ] Automated tests pass.
- [ ] Critical concurrency tests pass.
- [ ] No critical dependency/security findings remain.
- [ ] `.env.example` is complete.
- [ ] README setup instructions are accurate.
- [ ] Frontend/API contract is documented.

---

# 37. Production Hardening Roadmap

After the baseline is stable:

| Area | Production capability |
|---|---|
| Payments | Live provider, settlement reconciliation, disputes, EMI/BNPL where applicable |
| Shipping | Real courier APIs, webhooks, NDR/RTO, insured delivery, return pickups |
| Tax | Formal GST/HSN review and required e-invoicing integrations |
| Security | Mandatory admin MFA, secret manager, WAF, penetration testing |
| Fraud | Risk scoring, velocity controls, manual review |
| Reliability | Backups, tested restoration, queues, circuit breakers, load testing |
| Observability | Centralized logs, metrics, alerts, error tracking, uptime monitoring |
| Search | Dedicated search infrastructure if scale requires it |
| Notifications | SMS/WhatsApp/push with consent and template governance |
| Data | Retention automation, deletion/export workflows, analytics warehouse |
| Performance | CDN, caching, image optimization, 3D optimization |
| Operations | Runbooks, release checklist, incident process and SLAs |
| AI | Provider selection, cost controls, evaluation, red-team testing and guardrail monitoring |

---

# 38. Critical Entity Field Outlines

## ProductVariant

```text
id
product_id
sku
name
attributes
price_paise
sale_price_paise
tax_class_id
weight_g
warranty_months
status
is_preorder
expected_ship_date
edition_size
max_per_customer
```

## Inventory

```text
variant_id
available
reserved
sold
returned
low_stock_threshold
version
```

Constraints:

```text
available >= 0
reserved >= 0
sold >= 0
returned >= 0
```

## CheckoutSession

```text
id
user_id
source
status
line_snapshot
address_snapshot
shipping_method
coupon_code
wallet_amount_paise
totals_snapshot
expires_at
```

## Order

```text
id
order_number
user_id
status
address_snapshot
subtotal_paise
discount_paise
tax_paise
cgst_paise
sgst_paise
igst_paise
shipping_paise
wallet_paise
total_paise
payable_paise
currency
high_value_flag
placed_at
idempotency_key
```

## OrderItem

```text
id
order_id
variant_id
sku
name_snapshot
attributes_snapshot
quantity
unit_price_paise
discount_paise
tax_paise
hsn_code
unit_id
edition_number
```

## Payment

```text
id
order_id
checkout_id
provider
provider_ref
status
amount_paise
method
attempt_no
failure_reason
```

## PaymentTransaction

```text
id
payment_id
type
status
provider_event_id
amount_paise
raw_summary
```

## WebhookEvent

```text
id
provider
event_id
type
received_at
processed_at
status
```

Unique:

```text
(provider, event_id)
```

## Refund

```text
id
payment_id
order_id
order_item_id
return_id
amount_paise
destination
status
created_by
idempotency_key
```

## Shipment

```text
id
order_id
provider
awb
status
method
estimated_delivery
created_at
```

## ReturnRequest

```text
id
order_id
status
reason_code
notes
requested_at
decided_by
decision_note
```

## WarrantyRecord

```text
id
order_item_id
unit_id
starts_on
ends_on
```

## AuditLog

```text
id
actor_type
actor_id
action
resource_type
resource_id
result
ip
metadata
occurred_at
```

---

# 39. Traceability

| Business goal | Requirements | Verification |
|---|---|---|
| Reliable purchase | FR-CHK-*, FR-INV-*, FR-PAY-*, FR-ORD-* | T-CRIT-01…05, 13, 14 |
| Never oversell | FR-INV-* | T-CRIT-03, concurrency tests |
| Money correctness | FR-MON-*, FR-TAX-*, FR-CPN-* | Pricing/unit tests, T-CRIT-04, 07, 14 |
| Security | FR-AUTH-*, FR-AUTHZ-*, NFR-SEC-* | T-CRIT-09, 10, 18, 20 |
| Replaceable providers | FR-PAY-001, FR-SHP-* | Provider contract tests |
| Safe AI | FR-AI-* | AI evaluation set, T-CRIT-19 |
| Luxury product integrity | FR-LUX-*, FR-3D-* | Catalog/3D/warranty tests |
| Returns/refunds | FR-RET-* | T-CRIT-06, 07 |
| Accessible experience | NFR-A11Y-* | Mobile, keyboard, reduced-motion verification |
| Deployment integrity | NFR-DEP-*, NFR-DB-* | Clean migration and Docker tests |

Each implemented requirement should eventually map to:

```text
Requirement
    ↓
Implementation
    ↓
API / Module
    ↓
Data Model
    ↓
Automated Test
    ↓
Verification Result
```

---

# 40. Final Architecture Principle

REVERIE must be built as a **real luxury watch commerce platform with production-oriented foundations**.

The architecture must keep business logic independent from replaceable infrastructure:

```text
PaymentProvider
      ↓
PaymentService
      ↓
Checkout / Order

ShippingProvider
      ↓
ShippingService
      ↓
Order / Fulfillment

AIProvider
      ↓
AIService
      ↓
Approved REVERIE data/tools

StorageProvider
      ↓
MediaService
      ↓
Catalog / CMS / Customer media

NotificationProvider
      ↓
NotificationService
      ↓
Domain events
```

The product experience remains:

```text
Luxury Watch
     ↓
Story / Discovery
     ↓
Specifications
     ↓
Immersive Product Experience
     ↓
3D where useful
     ↓
Trust / Warranty / Authenticity
     ↓
Cart
     ↓
Checkout
     ↓
Secure Purchase
     ↓
Fulfillment
     ↓
Ownership / Service
```

The interface must not become an effects demonstration.

The watch remains the hero.

Motion, GSAP, Lenis, WebGL, 3D, rich media, and AI are supporting capabilities. They must never compromise usability, performance, accessibility, product clarity, or commerce integrity.

**Final implementation instruction:**

Build REVERIE as a coherent luxury watch product, not as a generic e-commerce template. Preserve the existing frontend identity, use authoritative backend data, implement business rules server-side, keep external providers replaceable, test critical commerce paths, and continuously inspect the running application on desktop and mobile until the acceptance criteria are satisfied.

---

**SRS Status:** Authoritative Implementation Baseline — Version 1.2
