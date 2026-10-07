# REVERIE — Software Requirements Specification (SRS)

**Version:** 2.1  
**Status:** Authoritative Implementation Baseline  
**Product:** REVERIE — Luxury Watch E-Commerce Platform  
**Audience:** Product, Design, Engineering, QA, DevOps, Security, Operations, and implementation agents  
**Primary frontend:** Existing Next.js / React storefront  
**Backend:** Java 21 + Spring Boot + Spring Security + Spring Data JPA/Hibernate + Maven  
**Database:** PostgreSQL  
**Storage:** Local development storage with replaceable production object storage  
**API:** REST + OpenAPI/Swagger  
**Migrations:** Flyway  
**Containers:** Docker  
**Primary implementation target:** Google Antigravity

---

# 0. DOCUMENT CONTROL

## 0.1 Purpose

This SRS is the standalone and authoritative specification for REVERIE.

REVERIE is a premium digital commerce platform for watches. It must combine luxury product presentation, accurate horological information, immersive product discovery, secure commerce, reliable inventory, customer ownership services, and an operational Atelier administration system.

This document defines:

- product scope;
- functional requirements;
- technical requirements;
- security requirements;
- data and business rules;
- customer experience requirements;
- Atelier CMS requirements;
- API requirements;
- provider abstractions;
- production-flexibility provisions;
- testing and verification;
- deployment and operations;
- traceability;
- open decisions.

This document is intentionally self-contained. It must not depend on another project's documentation to be understandable or implementable.

## 0.2 Scope tiers

| Tag | Meaning | Implementation rule |
|---|---|---|
| **[M]** | MVP / required baseline | Must be implemented and verified for the current baseline. |
| **[S]** | Structural / Should | Build when the core baseline is stable; may be required for a complete product area. |
| **[P]** | Production / Future | Architecture, interfaces, data model, or extension points should be prepared now; full infrastructure/integration may be deferred. |
| **[OPEN]** | Unresolved decision | Do not invent or silently finalize. Affected behavior requires an explicit decision. |

These tags describe implementation timing, not product importance.

## 0.3 Implementation-agent rules

The implementation agent MUST:

1. Read this SRS before modifying REVERIE.
2. Inspect the existing repository before making architectural changes.
3. Preserve working REVERIE functionality unless a requirement explicitly requires a change.
4. Treat the existing storefront as the visual and interaction baseline.
5. Do not rebuild the storefront from scratch.
6. Do not replace REVERIE with a generic e-commerce template.
7. Do not invent unresolved business, legal, tax, shipping, payment, warranty, or deployment rules.
8. Treat `[OPEN]` decisions as unresolved; do not silently choose a value.
9. Never represent a mock, stub, TODO, local-only simulation, or hardcoded response as a completed production capability.
10. Keep provider-specific infrastructure behind replaceable interfaces.
11. Keep business-critical calculations and validations on the backend.
12. Use transactions for multi-record business operations.
13. Use idempotency for order/payment/webhook-sensitive operations.
14. Inspect existing modules and APIs before creating duplicates.
15. Work in vertical slices: inspect → plan → implement → test → validate → document.
16. Run relevant tests and build checks after every major implementation phase.
17. Preserve API contracts once customer/admin integration begins; breaking changes require coordinated migration or explicit versioning.
18. Do not add microservices, Kafka, Kubernetes, distributed event architecture, or other infrastructure merely for perceived production quality.
19. Prefer a modular monolith with clean provider boundaries.
20. Validate desktop, tablet, and mobile behavior.
21. Validate keyboard navigation, focus behavior, reduced motion, loading states, empty states, errors, and success states.
22. Remove fake data from a feature when an authoritative backend source exists.
23. Do not expose application internals such as React, GSAP, Three.js, arbitrary CSS, or JavaScript through CMS controls.
24. Preserve graceful fallbacks for optional WebGL, 3D, rich media, and animation.
25. Never add a moving watch-hand animation to the hero.
26. The existing scrolling hero/frame-sequence implementation is protected. Modify it only for a concrete defect such as rendering failure, accessibility failure, severe performance regression, asset-loading failure, or browser incompatibility, and make the smallest targeted change.

## 0.4 Quality rule

Every major subsystem must reach at least **8/10 functional quality** before being considered complete.

8/10 is a floor, not a ceiling.

However, subjective polishing must never destabilize a working subsystem. A stable 8.5 implementation is preferable to an unstable redesign intended to reach a subjective 9.

---

# 1. PRODUCT DEFINITION

## 1.1 Product vision

REVERIE should feel like a luxury watch house first and an e-commerce application second.

The product experience should communicate:

- precision;
- craftsmanship;
- material quality;
- mechanical character;
- trust;
- ownership;
- scarcity where applicable;
- refined digital presentation.

Commerce must remain clear and usable beneath the luxury presentation.

## 1.2 Core principles

1. **The watch remains the hero.**
2. **Backend data is authoritative.**
3. **Luxury presentation must not compromise usability.**
4. **Motion must support product storytelling rather than become decoration.**
5. **3D is an inspection and presentation tool, not a game-like scene.**
6. **Specific horological information is preferred over generic luxury marketing language.**
7. **Product specifications must come from authoritative catalog records.**
8. **Customer-visible commercial facts must be consistent across storefront, cart, checkout, account, and order history.**
9. **External providers must remain replaceable.**
10. **Security must be designed into requirements and verification, not added only after implementation.**
11. **The system must be mobile-first.**
12. **Production-grade provisions may exist before production infrastructure is enabled.**
13. **No feature is complete merely because its UI exists.**
14. **Every important requirement must have a verification path.**

## 1.3 In scope

- storefront;
- catalog;
- collections;
- categories;
- search and discovery;
- watch variants;
- product specifications;
- product media;
- 3D/GLB/GLTF assets;
- product storytelling;
- craftsmanship content;
- cart;
- wishlist;
- checkout;
- customer authentication;
- customer account;
- saved addresses;
- orders;
- payment;
- shipping;
- tracking;
- returns/refunds;
- warranty information;
- authenticity information;
- reviews;
- concierge;
- support;
- notifications;
- Atelier administration;
- CMS;
- media management;
- promotions;
- analytics;
- audit;
- RBAC;
- provider abstractions;
- testing;
- observability foundations;
- deployment foundations;
- future AI capability with safety controls.

---

# 2. USER CLASSES AND SECURITY BOUNDARIES

| User | Capabilities | Security boundary |
|---|---|---|
| Guest | Browse, search, view products, use local cart/wishlist where enabled, optionally checkout as guest if approved | Anonymous/public |
| Customer | Account, addresses, wishlist, orders, checkout, reviews, support, concierge | Authenticated customer; own data only |
| Support Agent | Customer support, order lookup, approved service operations | Server-side support permissions |
| Order Manager | Order and fulfillment operations | Server-side role |
| Inventory Manager | Inventory adjustments and inventory history | Server-side role |
| Product Manager | Catalog, variants, media, collections | Server-side role |
| Content Manager | CMS/editorial/navigation/SEO content | Server-side role |
| Analyst | Read-only analytics/reporting | Server-side role |
| Admin | Broad operational management | Server-side role |
| Super Admin | Administrative/security configuration | Strongest server-side role |
| Integration/System | Provider callbacks and internal jobs | Authenticated machine boundary |

Customer authentication MUST never grant administrative access.

Frontend route hiding is never a sufficient authorization mechanism.

---

# 3. TECHNOLOGY AND ARCHITECTURE BASELINE

## 3.1 Frontend

The existing Next.js/React storefront is the baseline.

Existing visual/interaction technologies may include:

- Next.js;
- React;
- GSAP;
- Lenis;
- Canvas-based scroll sequence;
- Three.js/WebGL where appropriate;
- responsive CSS/design tokens.

The exact existing implementation should be preserved unless a requirement requires change.

## 3.2 Backend

Use a modular monolith:

```text
auth
user
customer
catalog
discovery
inventory
cart
order
payment
shipment
returns
support
content
media
review
concierge
analytics
audit
admin
notification
common
config
```

Modules should be separated by domain responsibility while remaining in one deployable application unless scale or organizational constraints later justify a different topology.

## 3.3 Database

PostgreSQL is the authoritative transactional database.

Database schema changes MUST use Flyway.

Production must not rely on Hibernate automatic schema mutation.

## 3.4 API

REST APIs should be documented through OpenAPI/Swagger.

Prefer a stable versioned convention such as:

```text
/api/v1/...
```

Exact endpoint naming must remain consistent with the existing implementation where already established.

## 3.5 Provider architecture

The domain/application layer must depend on interfaces rather than concrete external services.

Required conceptual ports include:

```text
PaymentProvider
ShippingProvider
NotificationProvider
StorageProvider
SearchProvider
FraudProvider
SecretProvider
AIProvider
```

Possible implementations:

```text
PaymentProvider
  ├── MockPaymentProvider [M]
  ├── RazorpayPaymentProvider [P]
  └── StripePaymentProvider [P]

ShippingProvider
  ├── ManualShippingProvider [M]
  ├── MockShippingProvider [M]
  └── CourierProvider(s) [P]

NotificationProvider
  ├── DevelopmentProvider [M]
  ├── EmailProvider [M/S]
  ├── SMSProvider [P]
  ├── WhatsAppProvider [P]
  └── PushProvider [P]

StorageProvider
  ├── LocalStorageProvider [M]
  └── ObjectStorageProvider [P]

SearchProvider
  ├── DatabaseSearchProvider [M]
  └── DedicatedSearchProvider [P]

FraudProvider
  ├── RuleBasedProvider [S]
  └── ExternalRiskProvider [P]

SecretProvider
  ├── EnvironmentProvider [M]
  └── ManagedSecretProvider [P]

AIProvider
  ├── Disabled/Mock [M]
  └── ApprovedProductionAIProvider [P]
```

Provider changes must not require rewriting core checkout, order, inventory, or customer flows.

---

# 4. CATALOG AND PRODUCT REQUIREMENTS

## 4.1 Product model

Every published watch must have an authoritative catalog record.

Minimum conceptual fields:

- product ID;
- product name;
- model/reference number;
- slug;
- description;
- short description;
- collection;
- category;
- status;
- price;
- currency;
- tax treatment;
- availability;
- SKU/reference;
- movement;
- movement type;
- power reserve;
- case diameter;
- case thickness;
- case material;
- case finish;
- crystal;
- water resistance;
- dial;
- hands;
- indices;
- crown;
- caseback;
- strap/bracelet;
- clasp/buckle;
- dimensions;
- weight where applicable;
- warranty information;
- authenticity information;
- country/region information where applicable;
- media;
- 3D assets;
- SEO metadata.

## 4.2 Requirements

**FR-CAT-001 [M]** The storefront must retrieve published product data from the backend.

**FR-CAT-002 [M]** Backend product status controls whether a product is customer-visible.

**FR-CAT-003 [M]** Product slugs must be unique.

**FR-CAT-004 [M]** Product prices must be authoritative on the backend.

**FR-CAT-005 [M]** Product specifications shown to customers must come from authoritative catalog records.

**FR-CAT-006 [M]** Products may contain multiple variants where commercially relevant.

**FR-CAT-007 [M]** Each purchasable variant must have a unique SKU/reference.

**FR-CAT-008 [M]** Product media must support ordered galleries.

**FR-CAT-009 [S]** Product media should support images, video, and approved 3D assets.

**FR-CAT-010 [S]** Product records should support structured craftsmanship/specification sections rather than requiring all information to be embedded in free-form descriptions.

**FR-CAT-011 [P]** Product records may support region-specific price/availability rules if international commerce is introduced.

---

# 5. WATCH-SPECIFIC PRODUCT EXPERIENCE

## 5.1 Product detail page

The PDP must communicate:

1. what the watch is;
2. why it is distinctive;
3. its core specifications;
4. movement/mechanical information;
5. dimensions/materials;
6. availability;
7. price;
8. warranty/authenticity information;
9. shipping/returns information;
10. purchase action.

## 5.2 3D requirements

**FR-3D-001 [S]** A product may expose a Three.js/WebGL viewer when an approved 3D asset exists.

**FR-3D-002 [S]** GLB/GLTF assets must support controlled rotation.

**FR-3D-003 [S]** Touch rotation must be supported on compatible mobile devices.

**FR-3D-004 [S]** Zoom must be controlled and bounded.

**FR-3D-005 [S]** Lighting and materials must preserve accurate product appearance.

**FR-3D-006 [S]** 3D must have a static-image fallback.

**FR-3D-007 [S]** 3D must not block core product information or purchasing.

**FR-3D-008 [P]** 3D assets should be optimized, compressed, cached, and delivered through appropriate media infrastructure at production scale.

## 5.3 Hero protection

**FR-HERO-001 [M]** The existing scroll-driven hero is an approved core experience.

**FR-HERO-002 [M]** The hero frame sequence must remain canvas-based where currently implemented.

**FR-HERO-003 [M]** The hero must not be replaced by an unrelated animation or generic carousel.

**FR-HERO-004 [M]** No moving watch-hand animation may be introduced.

**FR-HERO-005 [M]** CMS may control approved content/assets around the hero but must not expose hero implementation logic.

**FR-HERO-006 [M]** Reduced-motion behavior must remain available.

**FR-HERO-007 [M]** Mobile asset loading may use a reduced frame strategy where already designed, provided the visual behavior remains coherent.

---

# 6. COLLECTIONS, CATEGORIES, SEARCH AND DISCOVERY

**FR-DISC-001 [M]** Products must be organized into categories and collections.

**FR-DISC-002 [M]** Collections may be curated independently of categories.

**FR-DISC-003 [M]** Customers must be able to browse a collection.

**FR-DISC-004 [M]** Search must use authoritative product/catalog data.

**FR-DISC-005 [M]** Filters must never expose unavailable or unpublished products unless explicitly configured.

**FR-DISC-006 [M]** Filtering should support watch-relevant attributes such as collection, price, movement, case material, size, strap/bracelet, and availability where data exists.

**FR-DISC-007 [S]** Sorting should support relevance, newest, price, and other approved merchandising rules.

**FR-DISC-008 [P]** A dedicated search engine may replace database search without changing storefront contracts.

---

# 7. CART

**FR-CART-001 [M]** Customers can add an available variant to cart.

**FR-CART-002 [M]** Cart quantity must respect backend availability.

**FR-CART-003 [M]** Cart pricing must refresh from backend-authoritative product/variant pricing.

**FR-CART-004 [M]** Cart must handle unavailable, discontinued, or price-changed items explicitly.

**FR-CART-005 [M]** Cart totals must be calculated from authoritative backend values before checkout.

**FR-CART-006 [M]** Local cart persistence may be used for guest UX but cannot override backend commerce state.

**FR-CART-007 [S]** Authenticated carts should persist server-side.

**FR-CART-008 [S]** Guest cart contents may be merged into an authenticated cart after login.

---

# 8. WISHLIST

**FR-WISH-001 [M]** Guests may use local wishlist persistence if enabled.

**FR-WISH-002 [S]** Authenticated customers should have a backend-backed wishlist.

**FR-WISH-003 [S]** Wishlist must use product/variant identifiers rather than duplicated commercial data.

**FR-WISH-004 [S]** Guest wishlist may be merged into the authenticated wishlist on login.

**FR-WISH-005 [M]** Wishlist must gracefully handle discontinued or unavailable products.

---

# 9. CUSTOMER AUTHENTICATION AND ACCOUNT

**FR-AUTH-001 [M]** Support customer email/password authentication.

**FR-AUTH-002 [M]** Support registration with appropriate validation.

**FR-AUTH-003 [M]** Support secure sign-out/session invalidation.

**FR-AUTH-004 [M]** Support password recovery with single-use reset tokens.

**FR-AUTH-005 [M]** Password reset tokens must expire.

**FR-AUTH-006 [S]** Support Google sign-in through a proper OIDC-compatible flow.

**FR-AUTH-007 [M]** Google identity tokens must be cryptographically verified; decoding a JWT payload without signature verification is insufficient.

**FR-AUTH-008 [M]** Google issuer, audience, expiry, subject, and required verification claims must be validated.

**FR-AUTH-009 [M]** OAuth state/nonce protections must be implemented as appropriate to the selected flow.

**FR-AUTH-010 [M]** Customer authentication must never grant administrative permissions.

**FR-AUTH-011 [M]** Customers may access only their own private account data.

**FR-AUTH-012 [M]** Account must support profile, addresses, wishlist where enabled, and order history.

**FR-AUTH-013 [P]** Refresh-token rotation or an equivalent secure session lifecycle should be implemented when production topology requires it.

---

# 10. ADDRESSES

**FR-ADDR-001 [M]** Authenticated customers can create addresses.

**FR-ADDR-002 [M]** Customers can edit and delete their own addresses.

**FR-ADDR-003 [M]** Customers can designate a default address.

**FR-ADDR-004 [M]** Address data must be validated server-side.

**FR-ADDR-005 [M]** Customer A cannot access Customer B's addresses.

**FR-ADDR-006 [M]** Checkout must resolve the selected address through a trusted server-side record or an explicitly validated guest address.

**FR-ADDR-007 [S]** Address snapshots used for an order must remain immutable after purchase.

---

# 11. CHECKOUT

Checkout is a critical business boundary.

**FR-CHK-001 [M]** Checkout must obtain authoritative product, variant, price, stock, tax, shipping, discount, and total information from the backend.

**FR-CHK-002 [M]** Client-submitted final totals must never override server calculations.

**FR-CHK-003 [M]** Backend must validate product publication status and variant availability before order creation.

**FR-CHK-004 [M]** Backend must calculate subtotal.

**FR-CHK-005 [M]** Backend must calculate approved discounts/promotions.

**FR-CHK-006 [M]** Backend must calculate applicable taxes.

**FR-CHK-007 [M]** Backend must calculate or resolve shipping charges according to approved rules.

**FR-CHK-008 [M]** Backend must calculate final payable amount.

**FR-CHK-009 [M]** Inventory must be checked and reserved according to the inventory policy before payment is treated as valid.

**FR-CHK-010 [M]** A pending order must exist before online payment initiation when the selected provider requires an order reference.

**FR-CHK-011 [M]** Checkout-sensitive operations must support idempotency.

**FR-CHK-012 [M]** Checkout must display loading, unavailable, validation-error, payment-failure, and success states.

**FR-CHK-013 [M]** Checkout must not collect raw card/CVV data into REVERIE backend APIs.

**FR-CHK-014 [M]** If guest checkout is enabled, guest order access must use a secure verification mechanism.

**FR-CHK-015 [OPEN]** Final guest checkout policy must be explicitly approved if not already fixed.

---

# 12. MONEY, TAX AND PROMOTIONS

## 12.1 Money

**FR-MON-001 [M]** Monetary values must use integer minor units internally.

**FR-MON-002 [M]** For INR transactions, paise must be used as the minor unit.

**FR-MON-003 [M]** Currency must be explicit in persisted commercial records.

**FR-MON-004 [M]** Floating-point arithmetic must not be used for authoritative monetary calculations.

**FR-MON-005 [M]** Order records must preserve the currency and purchase-time amounts.

## 12.2 Tax

**FR-TAX-001 [M]** Tax calculation must be backend-authoritative.

**FR-TAX-002 [M]** Tax rules must be configurable without hardcoding tax rates into storefront components.

**FR-TAX-003 [S]** Product tax classification should be represented as catalog/configuration data.

**FR-TAX-004 [P]** Formal GST/HSN/e-invoicing capabilities may be added when required for the production business model.

**FR-TAX-005 [OPEN]** Final tax/legal configuration must be approved before production launch.

## 12.3 Promotions

**FR-PROMO-001 [S]** Promotions/coupons must be validated server-side.

**FR-PROMO-002 [S]** Promotion eligibility must not rely on client-provided totals.

**FR-PROMO-003 [S]** Promotion effects must be stored in order snapshots.

**FR-PROMO-004 [S]** Admins must have controlled promotion management.

**FR-PROMO-005 [P]** Promotion rules may later support scheduled campaigns and audience targeting.

---

# 13. INVENTORY

The existing inventory architecture is a protected strength.

**FR-INV-001 [M]** Each purchasable variant must have an inventory record.

**FR-INV-002 [M]** Inventory must distinguish available, reserved, and sold quantities where the current domain model supports those states.

**FR-INV-003 [M]** Concurrent purchases must not oversell stock.

**FR-INV-004 [M]** Inventory mutations must use transaction-safe locking/constraints.

**FR-INV-005 [M]** Reservations must have a defined lifecycle.

**FR-INV-006 [M]** Reservation release must occur when an applicable checkout/payment path expires or fails.

**FR-INV-007 [M]** Successful purchase must commit the reserved inventory.

**FR-INV-008 [M]** Inventory movements must be auditable.

**FR-INV-009 [M]** Admin inventory adjustments require a reason.

**FR-INV-010 [S]** Reservation expiry may be handled by a scheduled job.

**FR-INV-011 [P]** High-scale inventory may later introduce more advanced reservation/queue infrastructure without changing the public commerce contract.

---

# 14. ORDERS

**FR-ORD-001 [M]** The backend creates and prices the pending order.

**FR-ORD-002 [M]** Order item records must preserve immutable purchase-time snapshots.

Minimum snapshot information should include:

- product name;
- SKU/reference;
- variant;
- quantity;
- unit price;
- discounts;
- tax;
- currency;
- applicable product information required for historical display.

**FR-ORD-003 [M]** Orders must have explicit lifecycle states.

Recommended baseline:

```text
PENDING_PAYMENT
PLACED
CONFIRMED
PROCESSING
SHIPPED
OUT_FOR_DELIVERY
DELIVERED
CANCELLED
```

Additional states may be introduced for returns/refunds without corrupting fulfillment semantics.

**FR-ORD-004 [M]** Payment state must remain separate from fulfillment state.

**FR-ORD-005 [M]** Order status transitions must be validated server-side.

**FR-ORD-006 [M]** Repeated requests must not create duplicate orders unintentionally.

**FR-ORD-007 [M]** Customers can view only their own orders.

**FR-ORD-008 [M]** Admin users may access operational order views according to role.

**FR-ORD-009 [S]** Cancellation rules must be explicit and state-dependent.

**FR-ORD-010 [S]** Order status history must record timestamp and actor/source.

**FR-ORD-011 [S]** Orders should preserve immutable shipping-address snapshots.

**FR-ORD-012 [P]** High-value orders may support manual review/risk states.

---

# 15. PAYMENTS

## 15.1 Payment architecture

**FR-PAY-001 [M]** Payment processing must use a provider abstraction.

**FR-PAY-002 [M]** The current development provider may be mocked, but the abstraction must match the production contract.

**FR-PAY-003 [P]** Razorpay may be integrated through the provider abstraction.

**FR-PAY-004 [P]** Stripe may be integrated through the same abstraction if approved.

## 15.2 Security and lifecycle

**FR-PAY-005 [M]** Browser redirects or client messages are never proof of payment.

**FR-PAY-006 [M]** Provider authenticity must be verified before marking payment successful.

**FR-PAY-007 [M]** Webhook authenticity must be verified using the provider's documented secure verification mechanism.

**FR-PAY-008 [M]** Webhook processing must be idempotent.

**FR-PAY-009 [M]** Duplicate and out-of-order events must not corrupt payment or order state.

**FR-PAY-010 [M]** Payment secrets must never be exposed to the browser.

**FR-PAY-011 [M]** Raw card number/CVV must not be persisted or submitted to REVERIE backend services.

**FR-PAY-012 [M]** Payment states must be explicit.

Recommended states:

```text
PENDING
PROCESSING
PAID
FAILED
CANCELLED
REFUNDED
PARTIALLY_REFUNDED
```

**FR-PAY-013 [S]** Refund operations must be auditable.

**FR-PAY-014 [P]** Payment reconciliation must compare internal transactions with provider records.

**FR-PAY-015 [P]** Provider outage handling and retry/reconciliation procedures must be defined before production launch.

---

# 16. SHIPPING AND FULFILLMENT

**FR-SHIP-001 [M]** Each shippable order must have fulfillment/shipment information.

**FR-SHIP-002 [M]** Initial shipping may be admin-managed.

**FR-SHIP-003 [M]** Shipment status history must record state, timestamp, and actor/source.

**FR-SHIP-004 [M]** Customer tracking must use backend order/shipment data rather than hardcoded sample data.

**FR-SHIP-005 [M]** Mock tracking must never be presented as real courier tracking.

**FR-SHIP-006 [S]** Admin must be able to assign/update shipment tracking information where manual shipping is enabled.

**FR-SHIP-007 [P]** Courier APIs/webhooks may be introduced behind ShippingProvider.

**FR-SHIP-008 [P]** Shipment tracking should support provider event idempotency.

**FR-SHIP-009 [OPEN]** Final courier/provider and shipping SLA policy.

---

# 17. RETURNS, REFUNDS, REPLACEMENT AND WARRANTY

Watch commerce requires clear post-purchase trust.

**FR-RET-001 [M]** The system must expose the approved returns/refund policy.

**FR-RET-002 [S]** Customers may initiate a return request through the approved support/self-service flow.

**FR-RET-003 [S]** Return eligibility must be evaluated server-side.

**FR-RET-004 [S]** Return state transitions must be auditable.

**FR-RET-005 [S]** Approved refunds must be associated with the originating order/payment.

**FR-RET-006 [S]** Refunds must be idempotent.

**FR-RET-007 [S]** Replacement/exchange must be modeled separately if offered.

**FR-WARR-001 [M]** Warranty information must be displayed for applicable products.

**FR-WARR-002 [S]** Warranty eligibility may be associated with the purchased product/order.

**FR-WARR-003 [P]** A dedicated ownership/warranty service may be introduced later.

**FR-WARR-004 [OPEN]** Final warranty duration, exclusions, and service process.

---

# 18. AUTHENTICITY AND OWNERSHIP

These requirements are specific to the watch product category.

**FR-LUX-001 [M]** Product pages must provide approved authenticity information.

**FR-LUX-002 [M]** Product specifications must be accurate and traceable to catalog data.

**FR-LUX-003 [S]** Orders may preserve a product reference/model number for ownership history.

**FR-LUX-004 [S]** Warranty/ownership records should be capable of referencing an order and product.

**FR-LUX-005 [P]** A future ownership registration/service portal may be introduced without changing the core order model.

---

# 19. REVIEWS

**FR-REV-001 [S]** Customers may submit reviews where enabled.

**FR-REV-002 [S]** Review submission must require an authenticated customer.

**FR-REV-003 [S]** Review eligibility may be restricted to verified purchasers.

**FR-REV-004 [S]** Reviews require moderation before publication if configured.

**FR-REV-005 [S]** Admin moderation actions must be audited.

**FR-REV-006 [M]** Review content must never be fabricated as customer content.

---

# 20. CONCIERGE

Concierge is a first-class REVERIE customer experience.

**FR-CON-001 [S]** Customers/guests may submit concierge inquiries.

**FR-CON-002 [S]** Concierge requests must have explicit states.

Example:

```text
NEW
ASSIGNED
IN_PROGRESS
WAITING_FOR_CUSTOMER
RESOLVED
CLOSED
```

**FR-CON-003 [S]** Staff can assign and manage concierge requests.

**FR-CON-004 [S]** Customer contact data must be protected.

**FR-CON-005 [P]** Concierge may later integrate with appointment scheduling or messaging providers.

---

# 21. SUPPORT

**FR-SUP-001 [S]** Customers can submit support requests.

**FR-SUP-002 [S]** Support tickets must have lifecycle states.

**FR-SUP-003 [S]** Support staff can assign and update tickets according to permissions.

**FR-SUP-004 [S]** Tickets may reference an order, product, shipment, payment, return, or warranty record.

**FR-SUP-005 [S]** Support activity must be auditable.

---

# 22. NOTIFICATIONS

**FR-NOT-001 [M]** Authentication, order, payment, and important service flows must expose notification hooks.

**FR-NOT-002 [M]** Development notification delivery may use a safe development provider.

**FR-NOT-003 [S]** Transactional email should be supported.

**FR-NOT-004 [P]** SMS/WhatsApp/push may be added behind NotificationProvider.

**FR-NOT-005 [S]** Notification templates should be versionable/configurable.

**FR-NOT-006 [P]** Notification delivery may move to an asynchronous queue when scale requires it.

**FR-NOT-007 [M]** Notification failures must not silently corrupt order/payment state.

---

# 23. ATELIER ADMIN — OPERATIONS AND CMS

REVERIE Atelier is both:

1. a commerce operations console; and
2. a structured content management system.

It is not merely a dashboard and not a page builder.

## 23.1 Information architecture

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

CONTENT
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

## 23.2 Source-of-truth rule

Admin frontend local state may be used for:

- modal state;
- form drafts;
- filters;
- sorting;
- temporary selection;
- loading state.

It must not be the permanent source of truth for:

- products;
- variants;
- inventory;
- orders;
- payments;
- shipments;
- returns;
- customers;
- reviews;
- CMS content;
- promotions;
- audit records;
- admin users;
- analytics.

## 23.3 Product management

**FR-ADM-CAT-001 [M]** Authorized staff can create/edit/archive products.

**FR-ADM-CAT-002 [M]** Authorized staff can manage variants.

**FR-ADM-CAT-003 [M]** Authorized staff can manage prices and availability.

**FR-ADM-CAT-004 [S]** Authorized staff can manage collections and categories.

**FR-ADM-CAT-005 [S]** Authorized staff can manage product media.

**FR-ADM-CAT-006 [S]** Media management supports approved 3D assets such as GLB/GLTF.

## 23.4 Inventory administration

**FR-ADM-INV-001 [M]** Inventory managers can view stock.

**FR-ADM-INV-002 [M]** Inventory managers can perform controlled adjustments.

**FR-ADM-INV-003 [M]** Inventory adjustments require a reason.

**FR-ADM-INV-004 [M]** Inventory changes create audit/movement records.

**FR-ADM-INV-005 [S]** Low-stock views and filters are available.

## 23.5 Orders

**FR-ADM-ORD-001 [M]** Authorized staff can view orders.

**FR-ADM-ORD-002 [M]** Staff can inspect order items, payment state, fulfillment state, customer, totals, and history according to permission.

**FR-ADM-ORD-003 [M]** Staff can perform only permitted order state transitions.

**FR-ADM-ORD-004 [S]** High-impact actions require confirmation and audit logging.

## 23.6 Payments

**FR-ADM-PAY-001 [S]** Authorized staff can view payment transactions.

**FR-ADM-PAY-002 [S]** Staff can inspect failed/pending/refunded transactions.

**FR-ADM-PAY-003 [S]** Refund actions require appropriate role and audit trail.

## 23.7 Shipping

**FR-ADM-SHIP-001 [M]** Staff can manage manual shipment data when manual shipping is enabled.

**FR-ADM-SHIP-002 [S]** Staff can record tracking number and carrier.

**FR-ADM-SHIP-003 [S]** Carrier integration status must be distinguishable from manually entered tracking.

## 23.8 Customers

**FR-ADM-CUST-001 [S]** Authorized staff can search customers.

**FR-ADM-CUST-002 [S]** Staff can inspect permitted customer profile/order/support information.

**FR-ADM-CUST-003 [M]** Sensitive customer information must be protected by role.

## 23.9 CMS

CMS must be content-aware, not implementation-aware.

**FR-CMS-001 [S]** Admin can manage homepage content through structured content slots.

**FR-CMS-002 [S]** Admin can manage editorial stories/articles.

**FR-CMS-003 [S]** Admin can manage campaign content.

**FR-CMS-004 [S]** Admin can manage banners/promotional content.

**FR-CMS-005 [S]** Admin can manage navigation labels/links where approved.

**FR-CMS-006 [S]** Admin can manage FAQs/pages.

**FR-CMS-007 [S]** Admin can manage SEO title, description, canonical information, and social metadata where applicable.

**FR-CMS-008 [S]** Content must support draft/review/publish states.

**FR-CMS-009 [S]** Scheduled publishing must be backend-controlled.

**FR-CMS-010 [S]** Version history should support restoration.

**FR-CMS-011 [S]** Publish actions must be auditable.

**FR-CMS-012 [S]** Preview should render through real storefront components where practical.

**FR-CMS-013 [M]** CMS must not expose arbitrary React, JavaScript, GSAP, Three.js, CSS, or executable HTML.

**FR-CMS-014 [M]** CMS must not be able to modify the protected hero implementation.

## 23.10 Analytics

**FR-ADM-AN-001 [S]** Dashboard metrics must come from backend analytics sources.

**FR-ADM-AN-002 [S]** Metrics must not be hardcoded.

**FR-ADM-AN-003 [S]** Analytics must distinguish actual transactional data from projections or estimates.

## 23.11 Admin users and RBAC

Roles may include:

```text
SUPER_ADMIN
ADMIN
PRODUCT_MGR
INVENTORY_MGR
ORDER_MGR
SUPPORT_AGENT
CONTENT_MGR
ANALYST
```

**FR-ADM-RBAC-001 [M]** Authorization is enforced server-side.

**FR-ADM-RBAC-002 [S]** Admin UI reflects effective permissions.

**FR-ADM-RBAC-003 [S]** High-impact operations require the appropriate role.

**FR-ADM-RBAC-004 [P]** Mandatory MFA should be enabled for privileged production administration.

---

# 24. AUDIT LOGGING

**FR-AUD-001 [M]** High-impact actions must be auditable.

At minimum:

- admin login/security events;
- inventory adjustments;
- refunds;
- order cancellation;
- order status changes;
- product changes;
- publication changes;
- permission changes;
- CMS publish/restore;
- integration/configuration changes.

**FR-AUD-002 [M]** Audit records must include timestamp, actor, action, target, and relevant metadata.

**FR-AUD-003 [M]** Audit records must not expose secrets.

**FR-AUD-004 [S]** Audit records should be immutable from normal admin workflows.

---

# 25. SECURITY REQUIREMENTS

Security requirements are part of the product requirements, not a post-release checklist.

**NFR-SEC-001 [M]** Enforce server-side authorization on every protected operation.

**NFR-SEC-002 [M]** Validate all external input.

**NFR-SEC-003 [M]** Use safe parameterized persistence mechanisms.

**NFR-SEC-004 [M]** Secrets must not be committed to source control.

**NFR-SEC-005 [M]** Secrets must not appear in browser bundles.

**NFR-SEC-006 [M]** Production JWT configuration must fail closed if the required secret/configuration is missing; no insecure development fallback may be used in production.

**NFR-SEC-007 [M]** Customer records must be access-controlled by ownership.

**NFR-SEC-008 [M]** Admin records must be access-controlled by role.

**NFR-SEC-009 [M]** Rate limiting should protect authentication, password recovery, public sensitive endpoints, and abuse-prone operations.

**NFR-SEC-010 [S]** Security-sensitive actions should use appropriate CSRF/session protections for the selected authentication model.

**NFR-SEC-011 [M]** Payment webhook authenticity must be verified.

**NFR-SEC-012 [M]** Duplicate webhooks must be idempotent.

**NFR-SEC-013 [S]** Security events should be logged without credentials or sensitive payment data.

**NFR-SEC-014 [P]** Production WAF and penetration testing may be introduced.

**NFR-SEC-015 [P]** Security verification may use a tailored OWASP ASVS-based checklist.

**NFR-SEC-016 [P]** Threat modeling should be performed for authentication, checkout, payment, admin, media upload, and external integrations before public production launch.

---

# 26. DATA PROTECTION AND PRIVACY

**NFR-PRIV-001 [M]** Collect only data necessary for defined functionality.

**NFR-PRIV-002 [M]** Protect customer PII.

**NFR-PRIV-003 [M]** Do not log passwords, card data, CVV, provider secrets, or authentication tokens.

**NFR-PRIV-004 [S]** Define retention requirements for customer/support/audit data.

**NFR-PRIV-005 [P]** Implement production deletion/export/privacy workflows where legally required.

**NFR-PRIV-006 [OPEN]** Final legal/privacy policy and retention periods.

---

# 27. API REQUIREMENTS

**NFR-API-001 [M]** APIs must validate request data.

**NFR-API-002 [M]** APIs must return consistent error structures.

**NFR-API-003 [M]** APIs must not expose internal stack traces in production.

**NFR-API-004 [M]** Protected APIs require appropriate authentication/authorization.

**NFR-API-005 [M]** API DTOs must not expose persistence internals unnecessarily.

**NFR-API-006 [M]** APIs must distinguish validation, authentication, authorization, not-found, conflict, and server errors.

**NFR-API-007 [S]** OpenAPI documentation should remain synchronized with implemented contracts.

**NFR-API-008 [P]** Contract tests should protect critical frontend/backend integrations.

---

# 28. MEDIA

**FR-MEDIA-001 [M]** Product images must be stored through the configured media abstraction.

**FR-MEDIA-002 [S]** Media metadata must identify asset type, purpose, ordering, and associated product/content.

**FR-MEDIA-003 [S]** 3D assets must be associated with the appropriate product.

**FR-MEDIA-004 [M]** Media uploads must validate file type and size.

**FR-MEDIA-005 [M]** Uploaded files must not be executable application code.

**FR-MEDIA-006 [P]** Production object storage/CDN should be used for scale.

**FR-MEDIA-007 [S]** Responsive image delivery and optimization should be supported.

---

# 29. UX, ACCESSIBILITY AND RESPONSIVENESS

**NFR-UX-001 [M]** Storefront remains mobile-first.

**NFR-UX-002 [M]** Core commerce flows must work without relying on hover.

**NFR-UX-003 [M]** Interactive controls must have visible focus states.

**NFR-UX-004 [M]** Keyboard navigation must be supported for applicable interactions.

**NFR-UX-005 [M]** Images require appropriate alt text unless genuinely decorative.

**NFR-UX-006 [M]** Heading hierarchy must remain semantic.

**NFR-UX-007 [M]** Color contrast must be checked.

**NFR-UX-008 [M]** Reduced-motion behavior must remain functional.

**NFR-UX-009 [M]** Loading, empty, disabled, success, warning, and error states must be intentionally designed.

**NFR-UX-010 [S]** Target WCAG 2.1 AA for core customer and admin flows.

---

# 30. PERFORMANCE

**NFR-PERF-001 [M]** Avoid unnecessary React rerenders.

**NFR-PERF-002 [M]** Avoid duplicate animation loops.

**NFR-PERF-003 [M]** Clean up GSAP/Lenis/event listeners on unmount.

**NFR-PERF-004 [M]** Heavy media must be loaded progressively.

**NFR-PERF-005 [M]** 3D must not block essential commerce functionality.

**NFR-PERF-006 [M]** The hero must preserve its existing controlled canvas/requestAnimationFrame behavior.

**NFR-PERF-007 [S]** Product/media assets should use responsive sizing and appropriate compression.

**NFR-PERF-008 [P]** CDN/cache strategy should be added at production scale.

**NFR-PERF-009 [P]** Load testing should validate checkout, catalog, authentication, and admin APIs before significant traffic.

---

# 31. RELIABILITY AND OBSERVABILITY

**NFR-REL-001 [M]** Critical multi-record operations use database transactions.

**NFR-REL-002 [M]** Payment webhook handling is idempotent.

**NFR-REL-003 [M]** Inventory operations are concurrency-safe.

**NFR-REL-004 [M]** Provider failures must produce explicit recoverable states.

**NFR-REL-005 [S]** Health checks must expose application health without sensitive data.

**NFR-OBS-001 [S]** Structured application logs should be available.

**NFR-OBS-002 [S]** Errors should be observable through an appropriate monitoring mechanism.

**NFR-OBS-003 [P]** Centralized logs, metrics, alerts, and uptime monitoring may be introduced.

**NFR-OBS-004 [M]** Sensitive credentials and payment data must never appear in logs.

**NFR-REL-006 [P]** Queues, circuit breakers, retries, and asynchronous processing may be introduced where real scale or provider behavior justifies them.

**NFR-REL-007 [P]** Tested backup and restoration procedures are required before production launch.

---

# 32. DATABASE AND MIGRATIONS

**NFR-DB-001 [M]** All schema changes use Flyway migrations.

**NFR-DB-002 [M]** Migrations must be deterministic and reviewable.

**NFR-DB-003 [M]** Production must not use Hibernate automatic schema creation/update.

**NFR-DB-004 [M]** Critical uniqueness and integrity rules should be enforced at database level where appropriate.

**NFR-DB-005 [M]** Money, SKU, product reference, and external transaction identifiers must have appropriate constraints.

**NFR-DB-006 [S]** Migration tests should run in CI.

---

# 33. DEPLOYMENT AND ENVIRONMENTS

Environments:

```text
development
staging
production
```

**NFR-DEP-001 [M]** Environment-specific configuration must be separated.

**NFR-DEP-002 [M]** Production secrets must not be committed.

**NFR-DEP-003 [M]** Production builds must run tests/verification appropriate to the release gate.

**NFR-DEP-004 [M]** Production configuration must not contain insecure development defaults.

**NFR-DEP-005 [S]** CI should perform compile/build/test checks before deployment.

**NFR-DEP-006 [P]** Managed secret storage and rotation.

**NFR-DEP-007 [P]** CDN/object storage.

**NFR-DEP-008 [P]** Automated backup verification and restoration drills.

---

# 34. AI AND INTELLIGENT FEATURES

AI is optional and must not be allowed to destabilize core commerce.

**FR-AI-001 [M]** Core commerce must work without AI.

**FR-AI-002 [S]** Any recommendation feature must use real catalog data.

**FR-AI-003 [S]** AI must not invent price, stock, specifications, warranty, availability, or product claims.

**FR-AI-004 [S]** AI output must be grounded in approved REVERIE data/tools.

**FR-AI-005 [P]** AI provider must be replaceable through AIProvider.

**FR-AI-006 [P]** Production AI must have cost controls.

**FR-AI-007 [P]** Production AI should have evaluation, abuse, safety, and monitoring controls.

**FR-AI-008 [P]** AI must never directly mutate orders, payments, inventory, refunds, or permissions without explicit server-side business rules and authorization.

---

# 35. BUSINESS INVARIANTS

The following rules are mandatory.

1. Backend is authoritative for price, stock, discounts, tax, shipping, totals, payment state, and permissions.
2. Client-supplied totals cannot override backend calculations.
3. A browser redirect is never proof of payment.
4. Provider webhooks must be authenticated and idempotent.
5. Orders preserve immutable purchase-time facts.
6. Inventory cannot be oversold through concurrent purchases.
7. Customers cannot access another customer's private data.
8. Customer authentication cannot grant admin privileges.
9. Admin authorization is enforced server-side.
10. Production schema changes use Flyway.
11. Raw card/CVV data must never enter REVERIE backend persistence.
12. Mock tracking must never be represented as real courier tracking.
13. CMS content must not modify application logic.
14. The protected hero implementation cannot be changed through CMS.
15. AI cannot invent commercial/product facts.
16. External providers cannot dictate core domain state.
17. Open decisions must not be silently finalized.
18. A UI-only implementation is not a completed feature.
19. Historical orders remain readable even if current product data changes.
20. Customer-facing commercial facts must be consistent across catalog, cart, checkout, payment, and order history.

---

# 36. ACCEPTANCE CRITERIA

A release is not complete unless applicable criteria pass.

## Commerce

- [ ] Product prices originate from backend data.
- [ ] Client cannot override final totals.
- [ ] Invalid variants cannot be purchased.
- [ ] Concurrent checkout cannot oversell stock.
- [ ] Pending orders are created correctly before applicable payment initiation.
- [ ] Duplicate order submissions do not create unintended duplicate orders.
- [ ] Payment state is separate from order fulfillment state.
- [ ] Duplicate/out-of-order payment webhooks do not corrupt state.
- [ ] Refunds are linked to the correct payment/order.
- [ ] Tracking comes from backend data.

## Authentication

- [ ] Customers cannot access other customers' data.
- [ ] Customer credentials cannot access admin APIs.
- [ ] Google identity tokens are cryptographically verified if Google login is enabled.
- [ ] Password recovery uses single-use expiring tokens.
- [ ] No privileged credentials appear in browser bundles.

## Admin

- [ ] No mock admin password bypass remains.
- [ ] Admin login uses the real authentication service.
- [ ] Catalog changes persist.
- [ ] Inventory changes persist and create audit records.
- [ ] Order actions persist.
- [ ] Dashboard metrics are backend-derived.
- [ ] CMS publication persists.
- [ ] Audit logs are backend-backed.
- [ ] Role restrictions are enforced server-side.

## CMS

- [ ] Draft content can be saved.
- [ ] Publishing changes storefront content only through approved structured slots.
- [ ] Preview uses real storefront components where implemented.
- [ ] Scheduled publishing is backend-controlled.
- [ ] Version history is auditable where enabled.
- [ ] CMS cannot execute arbitrary application code.

## UX

- [ ] Desktop works.
- [ ] Mobile works.
- [ ] Keyboard navigation works for core flows.
- [ ] Focus states are visible.
- [ ] Reduced-motion behavior works.
- [ ] Loading/error/empty/success states are coherent.
- [ ] No major console errors remain.

## Hero

- [ ] Existing scrolling hero still behaves correctly.
- [ ] Canvas frame sequence remains functional.
- [ ] No moving watch-hand animation has been added.
- [ ] Mobile hero remains usable.
- [ ] Reduced-motion fallback works.

---

# 37. TESTING STRATEGY

## 37.1 Unit tests

Required for:

- pricing;
- tax;
- promotions;
- inventory reservation;
- inventory release;
- order state transitions;
- payment state transitions;
- refund rules;
- authorization;
- provider contracts;
- validation.

## 37.2 Integration tests

Required for:

- authentication;
- catalog;
- cart;
- checkout;
- inventory;
- orders;
- payment webhook;
- shipping;
- returns/refunds;
- addresses;
- wishlist;
- admin authorization;
- CMS publication;
- audit.

## 37.3 Concurrency tests

At minimum:

- two customers purchasing the last available watch;
- reservation and release race;
- duplicate checkout request;
- duplicate webhook delivery.

## 37.4 End-to-end critical paths

```text
Browse
→ Product
→ Variant
→ Cart
→ Checkout
→ Payment
→ Order
→ Tracking
```

```text
Login
→ Account
→ Address
→ Wishlist
→ Order history
```

```text
Admin login
→ Catalog
→ Inventory
→ Order
→ Shipment
→ CMS
→ Audit
```

## 37.5 Frontend verification

Verify:

- desktop;
- tablet;
- mobile;
- reduced motion;
- keyboard;
- loading;
- errors;
- empty states;
- slow network;
- unavailable products;
- payment failure;
- session expiry.

---

# 38. TRACEABILITY

Every major requirement should map to:

```text
Requirement
    ↓
Frontend / API
    ↓
Service / Module
    ↓
Data Model
    ↓
Automated Test
    ↓
Verification Result
```

Example:

| Requirement | Primary module | Data | Verification |
|---|---|---|---|
| FR-CAT-* | catalog | products, variants, media | catalog/API tests |
| FR-DISC-* | discovery/catalog | products, collections | search/filter tests |
| FR-CART-* | cart | carts, cart_items | cart integration tests |
| FR-INV-* | inventory | balances, reservations, movements | concurrency tests |
| FR-CHK-* | order/payment | orders, totals | checkout E2E |
| FR-PAY-* | payment | transactions, webhook events | provider/webhook tests |
| FR-SHIP-* | shipment | shipments, history | fulfillment tests |
| FR-AUTH-* | auth/customer | users, identities | auth/security tests |
| FR-ADDR-* | customer | addresses | ownership tests |
| FR-RET-* | returns | returns, refunds | returns tests |
| FR-CMS-* | content/admin | content/version/publish records | CMS tests |
| FR-ADM-* | admin | audit/admin records | RBAC tests |
| FR-3D-* | media/catalog | media/assets | media/UX verification |
| FR-AI-* | AI | approved catalog/tool data | grounding/safety tests |

---

# 39. PRODUCTION-FLEXIBILITY MATRIX

The system must support staged evolution.

| Capability | Current baseline | Structural provision | Future production |
|---|---|---|---|
| Payment | Mock/provider abstraction | Provider contract | Razorpay/Stripe + reconciliation |
| Shipping | Manual/mock provider | ShippingProvider | Courier APIs + webhooks |
| Admin security | RBAC | Permission model | Mandatory MFA |
| Secrets | Environment config | SecretProvider | Managed secret store + rotation |
| Security | Automated tests | Security requirements | WAF + pentest + broader verification |
| Fraud | Basic rules | FraudProvider | Risk scoring/manual review |
| Reliability | Transactions | Provider failure states | Queues/circuit breakers/load testing |
| Observability | Health/logging foundation | Structured interfaces | Centralized metrics/logs/alerts |
| Notifications | Development/email abstraction | NotificationProvider | SMS/WhatsApp/push |
| Performance | Efficient architecture | Cache/provider boundaries | CDN/cache/asset optimization |
| Tax | Backend calculation | Tax configuration | Formal GST/HSN/e-invoicing |
| AI | Disabled/optional | AIProvider | Cost controls/evaluation/red team |
| Storage | Local/dev | StorageProvider | Managed object storage/CDN |
| Search | Database | SearchProvider | Dedicated search engine |
| Backups | Basic deployment | Operational hooks | Tested backup/restore |
| Customer service | Concierge/support | Domain modules | Integrated service/messaging tooling |

The existence of a production provision does **not** mean the production infrastructure must be deployed immediately.

---

# 40. DECISION LEDGER

The following decisions must be explicitly tracked.

| Decision | Status |
|---|---|
| REVERIE is a luxury watch platform | RESOLVED |
| Modular monolith | RESOLVED |
| PostgreSQL | RESOLVED |
| Flyway | RESOLVED |
| Backend-authoritative commerce | RESOLVED |
| Provider abstractions | RESOLVED |
| Existing storefront preserved | RESOLVED |
| Existing hero protected | RESOLVED |
| Moving watch-hand animation | PROHIBITED |
| Mobile-first | RESOLVED |
| Inventory concurrency protection | RESOLVED |
| Production payment provider | [OPEN]/[P] |
| Production shipping provider | [OPEN]/[P] |
| Guest checkout | [OPEN] unless explicitly approved |
| Final tax/legal model | [OPEN] until approved |
| Warranty terms | [OPEN] until approved |
| Return policy | [OPEN] until approved |
| Production hosting topology | [OPEN] |
| Notification provider | [OPEN]/[P] |
| Managed secret provider | [P] |
| Admin MFA | [P] |
| CDN/object storage | [P] |
| Fraud provider | [P] |
| AI provider | [P] |

No implementation agent may silently close an `[OPEN]` decision.

---

# 41. IMPLEMENTATION PHASES

## Phase 0 — Audit and preservation [M]

- inspect repository;
- map frontend/backend;
- identify current working features;
- identify local/mock functionality;
- lock hero;
- establish API/source-of-truth map;
- establish test baseline.

## Phase 1 — Commerce foundation [M]

- catalog API integration;
- variant resolution;
- backend pricing;
- cart integration;
- inventory integration;
- account/auth integration.

## Phase 2 — Checkout and orders [M]

- authoritative totals;
- address integration;
- inventory reservation;
- pending order;
- order lifecycle;
- order history.

## Phase 3 — Payment [M/S]

- remove raw card/CVV backend path;
- provider abstraction;
- safe development payment;
- webhook model;
- idempotency;
- production provider hook.

## Phase 4 — Customer ownership [S]

- wishlist;
- addresses;
- tracking;
- returns;
- warranty information;
- reviews;
- concierge;
- support.

## Phase 5 — Atelier [S]

- real admin authentication;
- catalog;
- inventory;
- orders;
- shipping;
- payments;
- customers;
- CMS;
- media;
- audit;
- RBAC.

## Phase 6 — Production hardening [P]

- MFA;
- managed secrets;
- observability;
- backups;
- CDN;
- production provider integrations;
- load testing;
- security review.

## Phase 7 — Advanced experience [P]

- advanced 3D;
- richer media;
- AI;
- ownership/service features;
- advanced search.

---

# 42. DEFINITION OF DONE

A feature is complete only when:

1. Requirement is implemented.
2. Backend/domain rules exist where applicable.
3. Frontend is connected to the authoritative source.
4. No fake/hardcoded production behavior remains where a real source exists.
5. Error and loading states exist.
6. Mobile behavior is verified.
7. Accessibility is checked.
8. Relevant automated tests pass.
9. Build passes.
10. Database migrations exist where required.
11. Security controls are verified.
12. Audit behavior exists for high-impact admin actions.
13. Documentation/traceability is updated.
14. The feature does not regress the protected hero or existing storefront.
15. The feature is demonstrably functional end-to-end.

A button that changes local React state is not sufficient evidence of completion when the requirement requires persistent backend behavior.

---

# 43. FINAL ARCHITECTURE PRINCIPLE

REVERIE must remain a coherent luxury watch platform.

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
Trust / Authenticity / Warranty
      ↓
Cart
      ↓
Authoritative Checkout
      ↓
Secure Payment
      ↓
Order
      ↓
Fulfillment
      ↓
Ownership / Service
```

Supporting architecture:

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

StorageProvider
      ↓
MediaService
      ↓
Catalog / CMS / 3D Assets

NotificationProvider
      ↓
NotificationService
      ↓
Commerce / Customer Events

AIProvider
      ↓
AIService
      ↓
Approved REVERIE data/tools
```

The interface must not become an effects demonstration.

The watch remains the hero.

GSAP, Lenis, Canvas, WebGL, Three.js, rich media, and AI are supporting capabilities. They must never compromise:

- usability;
- performance;
- accessibility;
- product clarity;
- security;
- commerce integrity;
- mobile usability;
- maintainability.

**Final implementation directive:**

Build REVERIE as a real luxury watch commerce platform with production-oriented foundations and staged implementation. Preserve the existing frontend identity and protected hero, connect the storefront to authoritative backend data, implement critical business rules server-side, eliminate fake commerce behavior, maintain replaceable provider boundaries, make Atelier a real operational/CMS system, verify critical flows end-to-end, and improve quality incrementally without destabilizing working functionality.

**SRS Status:** Authoritative REVERIE Implementation Baseline — Version 2.1
