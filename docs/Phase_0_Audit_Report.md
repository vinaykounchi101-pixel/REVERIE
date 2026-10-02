# REVERIE — Phase 0: Repository & Architecture Audit Report

**Date:** 2026-10-02  
**Status:** Completed  
**Branch:** `feature/phase-0-repo-audit`  
**Authoritative Reference:** `docs/REVERIE_SRS_FINAL.md` (v2.0)

---

## 1. Executive Summary

Phase 0 establishes the baseline audit of the existing codebase, developer tooling, frontend state, and the technical contracts required to bridge the Next.js storefront (`reverie-next`) with the upcoming Spring Boot 3 (Java 21) backend (`reverie-backend`).

### Tooling Verification:
- **Java:** `Java 21.0.11 LTS` (Oracle Corporation) — Verified & active.
- **Build Tool:** `Apache Maven 3.9.16` — Verified & active.
- **Node.js / Next.js:** Next.js 14.2.23 with React 18, GSAP 3.15, Lenis 1.3, Three.js 0.186 — Verified & active.

---

## 2. Frontend Structure Audit (`reverie-next`)

The existing frontend provides a luxury visual experience with high-fidelity animations, Lenis smooth scrolling, and custom WebGL/Three.js viewers.

### 2.1 Route Inventory & Status
| Route | Frontend Path | Current State | Target API Endpoint |
|---|---|---|---|
| **Homepage** | `app/page.jsx` | Static / Client Canvas & 3D Hero | `GET /api/products`, `GET /api/collections` |
| **Collections** | `app/collections/page.jsx` | Static filter/sort against `allWatchCatalog` | `GET /api/search`, `GET /api/categories` |
| **Product Detail** | `app/product/[id]/page.jsx` | Static lookup by ID, strap selection | `GET /api/products/{slug}` |
| **Cart** | `app/cart/page.jsx` | LocalStorage via `CartContext.jsx` | `GET /api/cart`, `POST /api/cart/items` |
| **Checkout** | `app/checkout/page.jsx` | Client-side mock step wizard | `POST /api/checkout/sessions`, `POST /api/payments` |
| **Account** | `app/account/page.jsx` | Mock profiles, addresses, orders | `GET /api/customers/me`, `GET /api/customers/me/addresses` |
| **Orders** | `app/orders/page.jsx`, `app/orders/[id]/page.jsx` | Mock sample orders | `GET /api/orders`, `GET /api/orders/{orderId}` |
| **Order Tracking**| `app/order-tracking/page.jsx` | Mock tracking timeline | `GET /api/shipping/track/{trackingNumber}` |
| **Support** | `app/support/page.jsx` | Mock FAQs and contact forms | `GET /api/support/faqs`, `POST /api/support/tickets` |

---

## 3. Data Model & Contract Mapping

### 3.1 Currency & Monetary Representation
- **Frontend Current:** Uses floating-point numbers or dollar strings (e.g. `price: 1250`, `priceFormatted: "$1,250"`).
- **SRS Invariant:** Backend stores all amounts in **integer INR paise** (`BIGINT`, e.g. `12500000` paise = ₹1,25,000). The frontend currency formatter will be updated to display standard Indian Rupee notation (e.g., `₹1,25,000`) with backend-authoritative rounding.

### 3.2 Product & Specification Schema
The catalog in `data/allProductsData.js` maps directly to the SRS Section 8 specifications:
- `caseDiameter`, `thickness`, `caseMaterial`
- `movement`, `powerReserve`, `crystal`
- `waterResistance`, `strapWidth`, `dialColors`
- `editionSize`, `warrantyMonths`

### 3.3 State Management & Integration Plan
1. **Cart & Wishlist:** Transition from isolated `localStorage` to unified server-backed sessions with deterministic guest-to-account merge on login (`POST /api/cart/merge`).
2. **Checkout Invariants:** Replace client-side price totals with server-generated `CheckoutSession` snapshots (`POST /api/checkout/sessions`).
3. **API Client Layer:** Implement a centralized TypeScript/JavaScript API client module in `reverie-next/lib/api.js` with RFC 7807 error handling and token refresh interceptors.

---

## 4. Backend Scaffolding Plan (Phase 1 Target)

The backend will be structured under `reverie-backend/` following standard Spring Boot 3 domain modularization:

```text
reverie-backend/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/com/reverie/
    │   │   ├── ReverieApplication.java
    │   │   ├── common/         (DTOs, RFC 7807 Errors, Constants, BaseEntity)
    │   │   ├── config/         (Security, WebMvc, OpenAPI, CORS)
    │   │   ├── auth/           (JWT, Refresh Token, UserDetails)
    │   │   ├── user/           (CustomerProfile, Address, AdminUser, Role)
    │   │   ├── catalog/        (Product, Variant, Category, Collection, Media)
    │   │   ├── inventory/      (Inventory, Movement, Reservation)
    │   │   ├── cart/           (Cart, CartItem)
    │   │   ├── pricing/        (Coupon, Tax, CalculationEngine)
    │   │   ├── checkout/       (CheckoutSession, OrderCreation)
    │   │   ├── payment/        (PaymentProvider, MockPaymentProvider, PaymentService)
    │   │   ├── order/          (Order, OrderItem, StatusHistory, Invoice)
    │   │   ├── shipping/       (ShippingProvider, MockShippingProvider, Shipment)
    │   │   ├── returns/        (ReturnRequest, Refund)
    │   │   ├── support/        (SupportTicket, FAQ)
    │   │   └── audit/          (AuditLog, IdempotencyKey)
    │   └── resources/
    │       ├── application.yml
    │       ├── application-local.yml
    │       ├── application-test.yml
    │       └── db/migration/   (V1__initial_schema.sql, V2__seed_data.sql)
    └── test/
        └── java/com/reverie/   (Unit, Repository, and Concurrency Tests)
```

---

## 5. Phase 0 Completion Verification
- [x] All frontend routes and mock data assets audited.
- [x] Design token consistency confirmed against `docs/Watch_Brand_Design_Tokens.md`.
- [x] Developer tooling (Java 21, Maven 3.9) validated.
- [x] Backend architecture, package structure, and data dictionary aligned with `REVERIE_SRS_FINAL.md`.
