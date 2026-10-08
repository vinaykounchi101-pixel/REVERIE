# REVERIE — Technical Architecture & System Specification

## 1. System Overview

REVERIE is a luxury Haute Horlogerie e-commerce platform built with a high-performance decoupled architecture:
- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, GSAP ScrollTrigger.
- **Backend**: Java 21, Spring Boot 3.3.4, Spring Security 6, Spring Data JPA, Hibernate ORM 6.5.
- **Database**: PostgreSQL 18 with Flyway database migration versioning.
- **Security**: Stateless JWT access tokens + refresh token rotation, Google OAuth ID Token cryptographic verification, BCrypt password hashing, role-based access control (`SUPER_ADMIN`, `ADMIN`, `CONTENT_MGR`, `CUSTOMER`).

---

## 2. Architecture & Data Flow

```text
[ Next.js 14 Client App (Port 3000) ]
   ├── Services Layer (apiClient, authService, catalogService, cartService, wishlistService, orderService, paymentService, customerService, conciergeService, supportService, returnService, reviewService)
   └── React Contexts (CartContext, WishlistContext)
              │
       (HTTP / REST + Bearer JWT)
              ▼
[ Spring Boot 3.3 Security & Filters ]
  ├── JwtAuthenticationFilter
  ├── RateLimitingFilter
  └── CorsFilter
              ▼
[ Controllers / Resource Layer ]
  ├── AuthController (/api/auth)
  ├── CatalogController (/api/catalog, /api/watches)
  ├── CartController (/api/cart)
  ├── WishlistController (/api/wishlist)
  ├── OrderController (/api/orders)
  ├── PaymentController (/api/payments)
  ├── ShipmentController (/api/shipments)
  ├── ReturnController (/api/returns)
  ├── ConciergeController (/api/concierge)
  ├── SupportController (/api/support)
  ├── ReviewController (/api/reviews)
  ├── CustomerAddressController (/api/customers/me/addresses)
  └── AdminController (/api/admin)
              ▼
[ Services / Business Logic Layer ]
  ├── AuthService (JWT issuance, OTP, Google Token verification)
  ├── CatalogService (Dynamic filtering, stock checks)
  ├── OrderService (Paise calculations, order state machine)
  └── PaymentService (Stripe / Razorpay webhooks & signature verification)
              ▼
[ Repositories / Data Access Layer (Spring Data JPA) ]
              ▼
[ PostgreSQL Database (Port 5432) ]
```

---

## 3. Database Schema & Flyway Migrations

1. `V1__initial_schema.sql`: Core schema tables (`users`, `products`, `product_variants`, `product_images`, `categories`, `collections`, `orders`, `order_items`, `addresses`, `audit_logs`).
2. `V2__seed_data.sql`: Seed data for watch collections (Classic, Sport, Heritage), sample products, and default administrator (`admin@reverie.app`).
3. `V3__cart_and_inventory.sql`: Persistent carts (`carts`, `cart_items`) and inventory reservations.
4. `V4__payments_and_shipments.sql`: Payment transactions (`payments`), webhook events (`webhook_events`), and insured shipment tracking (`shipments`).
5. `V5__reviews_and_concierge.sql`: Product reviews (`reviews`) and VIP concierge atelier appointment bookings (`concierge_appointments`).
6. `V6__alter_image_to_text_and_add_women_watches.sql`: Upgraded media URLs to `TEXT` and seeded 4 Women's Haute Horlogerie models (*Aura Petit Diamond*, *Luna Pearl*, *Sovereign Rose*, *Elysium Sapphire*).
7. `V7__update_watch_images_and_catalog.sql`: Updated timepiece records to high-resolution studio assets and seeded multi-angle gallery media.

---

## 4. Key Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Customer registration (dispatches 6-digit OTP) | No |
| `POST` | `/api/auth/verify-email` | Verify registration email OTP and return JWT session | No |
| `POST` | `/api/auth/login` | Email/password login (requires verified email) | No |
| `POST` | `/api/auth/otp/request` | Request single-use 6-digit sign-in OTP code | No |
| `POST` | `/api/auth/otp/verify` | Verify sign-in OTP and authenticate | No |
| `POST` | `/api/auth/resend-otp` | Resend verification or reset OTP | No |
| `POST` | `/api/auth/google` | Google OAuth token exchange | No |
| `POST` | `/api/auth/admin/login` | Atelier admin login | No (Role-enforced) |
| `GET` | `/api/catalog/products` | Paginated product search & filters | No |
| `GET` | `/api/catalog/products/{slug}` | Product details by slug | No |
| `GET` | `/api/cart` | Retrieve current cart | Optional (Guest/User) |
| `POST` | `/api/cart/items` | Add item to cart | Optional |
| `POST` | `/api/orders` | Create new purchase order | Optional |
| `POST` | `/api/payments/intent` | Create Stripe / Razorpay payment intent | Optional |
| `POST` | `/api/webhooks/payments/{provider}` | Dual-mapped webhook event receiver | Signature verified |
| `POST` | `/api/v1/payments/webhook` | Standard webhook receiver alias | Signature verified |
| `GET` | `/api/customers/me/addresses` | List customer shipping addresses | Customer |
| `POST` | `/api/customers/me/addresses` | Create shipping address | Customer |
| `GET` | `/api/admin/overview` | Admin executive analytics | Admin |
| `GET` | `/api/orders/admin/all` | Paginated admin order management | Admin |
| `GET` | `/api/shipments/admin/all` | Insured courier shipment tracking | Admin |
| `GET` | `/api/returns/admin/all` | Horological return/vault inspection requests | Admin |
| `GET` | `/api/concierge/admin/all` | VIP atelier boutique bookings | Admin |
| `GET` | `/api/support/tickets/admin/all` | Customer concierge support tickets | Admin |
| `GET` | `/api/reviews/admin/all` | Moderated timepiece reviews | Admin |
| `POST` | `/api/admin/inventory/adjust` | Manual inventory ledger correction | Admin |
| `GET` | `/api/admin/users` | Collector and staff account management | Admin |
| `GET` | `/api/admin/faqs` | Knowledgebase FAQ management | Admin |
| `GET` | `/api/admin/stories` | Atelier brand editorial & heritage stories | Admin |
| `GET` | `/api/admin/audit` | Append-only security audit log stream | Admin |

---

## 5. Security, Email & Invoice Architecture

- **Mandatory Email Verification**: Public registrations create unverified accounts requiring single-use 6-digit cryptographic OTP token verification before granting standard access.
- **Duplicate Account Safeguard & 1-Click Transition**: If an existing email attempts re-registration, a 409 Conflict triggers an Atelier notification card with a 1-click transition to the login flow.
- **Login Verification Enforcement**: Unverified users attempting credential-based login are rejected with RFC 7807 `FORBIDDEN (EMAIL_UNVERIFIED)` and guided through the verification challenge.
- **Passwordless / 2FA Email Sign-In**: Dedicated `/api/auth/otp/request` and `/api/auth/otp/verify` endpoints provide passwordless one-time verification authentication.
- **Brevo & SMTP Transactional Notification Engine**: `EmailService` transmits luxury HTML formatted transactional emails via Brevo API v3 (`https://api.brevo.com/v3/smtp/email` with header `api-key`) and SMTP fallback:
  - Account Verification OTP
  - Member Sign-In OTP
  - Password Reset OTP
  - Welcome to REVERIE Atelier Onboarding Email
  - Itemized Order Invoice & Consignment Receipt Email
- **Atelier PDF Invoice Generation (`invoiceService.js`)**: Client-side high-resolution printable PDF invoice generator featuring Swiss horological typography, official watermark, itemized SKUs, VAT breakdown, and a 5-Year Global Warranty certificate.
- **Webhook Idempotency & Multi-Route Compatibility**: `PaymentWebhookController` handles both `/api/webhooks/payments/{provider}` and `/api/v1/payments/webhook` with HMAC signature validation and append-only database deduplication in `webhook_events`.
- **Dynamic Runtime Environment Ingestion**: `ReverieApplication.java` ingests `.env` parameters into JVM system properties on startup.
- **Session Sanitization**: `authService.js` automatically discards and clears unverified accounts, invalid tokens, or stale mock sessions.
- **No Hardcoded Secrets**: All credentials, JWT keys, and API tokens are resolved via environment variables.
- **Monetary Precision**: All currency calculations are handled as 64-bit integer paise/cents to avoid floating-point inaccuracies.
- **Strict CORS**: Origins strictly validated against configured domains in production.
- **Append-Only Audit Logs**: Every administrative and security-critical action is logged with actor, timestamp, IP, and action metadata.
