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
  ├── OrderController (/api/orders)
  ├── PaymentController (/api/payments)
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

---

## 4. Key Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Customer registration | No |
| `POST` | `/api/auth/login` | Email/password login | No |
| `POST` | `/api/auth/google` | Google OAuth token exchange | No |
| `POST` | `/api/auth/otp/request` | Request OTP code | No |
| `POST` | `/api/auth/otp/verify` | Verify OTP and authenticate | No |
| `POST` | `/api/auth/admin/login` | Atelier admin login | No (Role-enforced) |
| `GET` | `/api/catalog/products` | Paginated product search & filters | No |
| `GET` | `/api/catalog/products/{slug}` | Product details by slug | No |
| `GET` | `/api/cart` | Retrieve current cart | Optional (Guest/User) |
| `POST` | `/api/cart/items` | Add item to cart | Optional |
| `POST` | `/api/orders` | Create new purchase order | Optional |
| `POST` | `/api/payments/intent` | Create Stripe / Razorpay payment intent | Optional |
| `POST` | `/api/payments/webhook/stripe` | Stripe webhook event handler | Signature verified |
| `POST` | `/api/payments/webhook/razorpay` | Razorpay webhook event handler | Signature verified |
| `GET` | `/api/customers/me/addresses` | List customer shipping addresses | Customer |
| `POST` | `/api/customers/me/addresses` | Create shipping address | Customer |
| `GET` | `/api/admin/overview` | Admin executive analytics | Admin |

---

## 5. Security Principles

- **No Hardcoded Secrets**: All credentials, JWT keys, and API tokens are resolved via environment variables.
- **Monetary Precision**: All currency calculations are handled as 64-bit integer paise/cents to avoid floating-point inaccuracies.
- **Zero Raw OTP Logging**: OTPs are masked and never logged in plain text.
- **Strict CORS**: Origins strictly validated against configured domains in production.
- **Append-Only Audit Logs**: Every administrative and security-critical action is logged with actor, timestamp, IP, and action metadata.
