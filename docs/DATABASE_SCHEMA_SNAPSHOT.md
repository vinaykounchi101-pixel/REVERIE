# REVERIE — Supabase PostgreSQL Database Snapshot & Verification

**Generated:** 2026-10-21  
**Target Database:** `jdbc:postgresql://aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` (PostgreSQL 17.11)  
**Schema:** `public`  
**Migration Tool:** Flyway Core 10.10.0  
**Schema Version:** 7 (100% Up to Date, Clean Rebuild)  
**Status:** HEALTHY / UP  

---

## 1. Flyway Migration Audit History

All 7 version-controlled canonical migrations were executed and validated sequentially:

| Version | Description | Type | Execution Status |
|:---:|:---|:---:|:---:|
| `V1` | `initial schema` (Core user, product, order, payment & audit tables) | SQL | **SUCCESS** |
| `V2` | `seed data` (Initial collections, sample products & default administrator `admin@reverie.app`) | SQL | **SUCCESS** |
| `V3` | `customer concierge reviews` (VIP Salon Privé appointments & collector product reviews) | SQL | **SUCCESS** |
| `V4` | `support analytics content` (Support tickets, thread messages, FAQ items & brand stories) | SQL | **SUCCESS** |
| `V5` | `master seed data` (Master timepiece catalog, calibres, specifications & stock allocations) | SQL | **SUCCESS** |
| `V6` | `alter image to text and add women watches` (Upgraded media URLs to `TEXT` & seeded 4 Women's Haute Horlogerie references) | SQL | **SUCCESS** |
| `V7` | `update watch images and catalog` (High-resolution studio photography & multi-angle craftsmanship gallery media) | SQL | **SUCCESS** |

---

## 2. Rebuilt Database Tables & Entity Inventory

The database contains **26 relational tables** across all commerce, security, and atelier operations domains:

### A. Authentication, Identity & Audit
1. `users` — Collector accounts & administrative staff (`SUPER_ADMIN`, `ADMIN`, `CONTENT_MGR`, `CUSTOMER`). Includes default administrator `admin@reverie.app`.
2. `refresh_tokens` — Rotating cryptographically secure 7-day refresh tokens.
3. `otp_tokens` — Single-use 6-digit email verification and password reset OTP tokens.
4. `customer_addresses` — Collector delivery and billing addresses.
5. `audit_logs` — Append-only immutable security ledger recording actors, IPs, timestamps, and sensitive actions.

### B. Horological Catalog & Inventory
6. `categories` (9 Seeded) — Grand Complications, Chronographs, Tourbillons, Skeleton / Haute Horlogerie, GMT / Dual Time, High Jewellery, Classic Dress, Divers / Nautical, Minimalist.
7. `collections` (7 Seeded) — Atelier Genevois, Celestial, ChronoSport, Heritage, Masterpiece, Nautical, Royal Series.
8. `products` (12 Seeded) — Full timepiece catalog references (both Men's and Women's collections):
   - *Celeste Diamond Tourbillon*
   - *Chrono Imperiale*
   - *Etoile Brillante*
   - *Heritage Chronograph*
   - *Malachite Royal*
   - *Celestial Tourbillon*
   - *Tourbillon Squelette*
   - *Aura Petit Diamond*
   - *Luna Pearl*
   - *Sovereign Rose*
   - *Elysium Sapphire*
   - *Classic Chrono Steel*
9. `product_variants` — Specific metal references (Platinum 950, 18K Rose Gold, 18K White Gold, Titanium Grade 5).
10. `product_attributes` — Engineering specifications (Calibre, frequency 28,800 vph, power reserves 72h–120h, water resistance).
11. `product_media` — High-resolution studio photography and craftsmanship detail galleries.
12. `inventories` — Live physical vault inventory quantities and reserved stock counts.
13. `inventory_movements` — Ledger tracking all allocations, stock entries, and shipments.

### C. Client Commerce & Orders
14. `carts` — User and guest persistent shopping carts.
15. `cart_items` — Cart itemized references and quantities.
16. `wishlists` — Authenticated collector saved horological references.
17. `wishlist_items` — Wishlist timepiece associations.
18. `orders` — Customer purchase orders with 64-bit integer paise precision.
19. `order_items` — Line items, unit prices, and references.
20. `order_status_history` — Order fulfillment lifecycle audit (`CREATED`, `PENDING_PAYMENT`, `CONFIRMED`, `CAPTURED`, `ATELIER_INSPECTED`, `VAULT_DISPATCHED`, `DELIVERED`, `CANCELLED`).
21. `checkout_sessions` — Ephemeral checkout sessions with multi-currency calculations.

### D. Payments, Shipments & Returns
22. `payments` — Payment intents and transaction records (Stripe, Razorpay, Escrow).
23. `payment_transactions` — Raw gateway exchange and status responses.
24. `webhook_events` — Deduplicated append-only payment provider webhook notifications.
25. `shipments` — Armored insured courier tracking (Ferrari Group / Malca-Amit).
26. `return_requests` & `refunds` — 10x loupe certified vault inspection returns and escrow refunds.

### E. VIP Concierge, Support & Editorial CMS
27. `concierge_appointments` — Geneva / Zurich boutique Salon Privé bookings & video consultations.
28. `product_reviews` — Verified collector reviews and ratings.
29. `support_tickets` — Customer service inquiries.
30. `support_ticket_messages` — Client-concierge dialogue thread history.
31. `faq_items` — Knowledgebase FAQs across authentication, delivery, warranty, and returns.
32. `brand_stories` — Editorial horology stories and Geneva manufacture heritage.
33. `wallets` & `wallet_transactions` — Atelier store credit and collector balances.

---

## 3. Verification Metrics

* **Actuator Health:** `{"status": "UP", "groups": ["liveness", "readiness"]}`
* **Active Published Products:** 12
* **Active Categories:** 9
* **Active Brand Collections:** 7
* **Default Admin Account:** `admin@reverie.app` / `admin123` (Role: `SUPER_ADMIN`, `isVerified: true`)
* **Monetary Units:** Integer Paise / Cents (Zero floating-point rounding errors)
