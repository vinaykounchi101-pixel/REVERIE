# REVERIE — Development Progress & Sprint Tracking

**Project:** REVERIE (Luxury Haute Horlogerie E-Commerce Platform)  
**Current Active Branch:** `dev`  
**Production Release Branch:** `main`  
**Status:** MVP Ready & Production Hardened  

---

## Sprint & Engineering Progress Log

### Sprint 1: Brand System & Single-Page Horological Prototype
- Implemented core luxury brand tokens: Cormorant Garamond typography, warm ivory palette (`#FAF9F6`), charcoal text, and dark cinematic accents (`#080A0B`).
- Created 9 core storefront sections (Hero, Trust Strip, Collections Preview, Featured Horology, Craftsmanship, 3D Experience, Brand Story, Client Concierge, and Footer).
- Integrated GSAP ScrollTrigger sequence for cinematic watch movement.

### Sprint 2: Multi-Page Route Architecture & Commerce Engine
- Created 14 Next.js routes:
  - `/` (Home storefront & scrolling hero)
  - `/collections` (Complete catalog with collection/gender/movement filters, search, and pagination)
  - `/product/[id]` (Product detail, specifications table, image gallery, review system, concierge booking modal)
  - `/cart` (Cart drawer and dedicated cart page with promo code validation)
  - `/checkout` (Multi-currency checkout supporting INR paise, USD, EUR, CHF with Stripe and Razorpay flows)
  - `/order-tracking` (Live order dispatch tracking)
  - `/orders/[id]` (Itemized receipt and fulfillment status timeline)
  - `/account` (Collector profile, address book, order history, wishlist)
  - `/about` (Geneva manufacture atelier, master watchmakers, heritage timeline)
  - `/story` (Philosophy of restraint, calibre craftsmanship)
  - `/support` (FAQ, warranty, shipping & returns, concierge contact)
  - `/wishlist` (Saved horological references with 1-click cart add)
  - `/admin` (Restricted Atelier CMS & administrative operations portal)
  - `/_not-found` (Custom luxury 404 handler)

### Sprint 3: Spring Boot 3.3 Backend & PostgreSQL Architecture
- Layered Spring Boot 3.3 / Java 21 architecture with 33 JPA repositories and Flyway migrations V1 through V5.
- Implemented key business domains:
  - `AuthService` / `AuthController`: Email/password, OTP login, Google OAuth, Refresh token rotation.
  - `CatalogService` / `CatalogController`: Multi-faceted watch search and filtering.
  - `CartService` / `CartController`: User and guest cart synchronization.
  - `OrderService` / `OrderController`: Order creation, paise monetary calculations, order status state machine.
  - `PaymentService` / `PaymentController`: Stripe & Razorpay intent creation and webhook HMAC verification.
  - `CustomerAddressController`: Address management mapped to `/api/customers/me/addresses`.
  - `AuditService`: Append-only security audit log recording sensitive actions.

### Sprint 4: P0 Security Hardening & Master SRS Traceability
- **Google OAuth ID Token Verification**: Verified cryptographic signatures (`iss`, `aud`, `exp`, `email`) in `AuthService.java` rather than trusting raw email parameters.
- **Strict CORS Lockdown**: Configured exact allowed origins in `WebConfig.java` for production safety.
- **Sensitive Data Masking**: Removed raw OTP logging from `AuthService.java` and `EmailService.java`.
- **Next.js Hydration Fixes**: Added `mounted` guards and `suppressHydrationWarning` across dynamic client components.
- **Canonical SRS Synchronization**: Added Section 47 (Traceability & Implementation Matrix) to `docs/REVERIE_SRS_FINAL.md`.
- **Atelier CMS Portal**: Built role-gated `/admin` portal with catalog editor, order fulfillment, CMS stories, and live audit stream.

### Sprint 6: Mandatory Email Verification on Registration & Login
- **Email Verification on Registration**:
  - `AuthService.java`: New user registration creates unverified `Role.CUSTOMER` account and dispatches a single-use 6-digit verification code.
  - `AuthService.verifyEmail`: Returns `AuthResponse` with JWT access and refresh tokens, seamlessly logging the user in upon successful OTP verification.
- **Email Verification on Login**:
  - `AuthService.login`: Rejects unverified accounts with `FORBIDDEN: EMAIL_UNVERIFIED` and challenges the client to complete email verification.
  - `AuthModal.jsx`: Catches `EMAIL_UNVERIFIED` on password authentication and automatically opens the 6-digit OTP verification view with countdown timer and resend triggers.
  - **Passwordless / 2FA Email Sign-In**: Added `/api/auth/otp/request` and `/api/auth/otp/verify` endpoints enabling direct 1-time email code sign-in.
- **Luxury Branded Email Dispatch**:
  - `EmailService.java`: Added `sendLoginOtp(...)` and `sendEmailVerificationOtp(...)` dispatching luxury HTML emails via configured Gmail SMTP.

### Sprint 7: Atelier Admin CMS Operations & Full Domain Integration
- **14-View Atelier Operations Suite**:
  - Fully implemented interactive management panels: `OverviewView`, `OrdersView`, `ShipmentsView`, `ReturnsView`, `ConciergeView`, `SupportView`, `ReviewsView`, `InventoryView`, `ProductsView`, `UsersView`, `FaqsView`, `CmsView`, `AuditView`, and `PaymentsView`.
  - Seamless Spring Data `Page<T>` (`content[]`) pagination unpacking across all operations views.
  - Added [adminServices.js](file:///e:/Projects/REVERIE/reverie-next/services/admin/adminServices.js) connecting to live Spring Boot endpoints (`/api/orders/admin/all`, `/api/shipments/admin/all`, `/api/returns/admin/all`, `/api/concierge/admin/all`, `/api/support/tickets/admin/all`, `/api/reviews/admin/all`, `/api/admin/inventory/adjust`, etc.).

### Sprint 8: Brevo Transactional Email Dispatch & Runtime Environment Loader
- **Automatic Runtime Environment Ingestion**:
  - Added [ReverieApplication.java](file:///e:/Projects/REVERIE/reverie-backend/src/main/java/com/reverie/ReverieApplication.java) runtime `.env` loader dynamically parsing active environment properties into JVM system properties on startup.
- **Brevo REST API Dispatcher**:
  - Configured [EmailService.java](file:///e:/Projects/REVERIE/reverie-backend/src/main/java/com/reverie/auth/service/EmailService.java) with live Brevo API v3 (`https://api.brevo.com/v3/smtp/email` with header `api-key`), flexible aliases (`BREVO_API_KEY`, `BREVO_KEY`, `SENDINBLUE_API_KEY`, `MAIL_FROM_ADDRESS`, `BREVO_SENDER_EMAIL`), and luxury HTML templating for OTP verification.
- **Session Sanitization & Verified User Enforcement**:
  - Updated [authService.js](file:///e:/Projects/REVERIE/reverie-next/services/authService.js) to enforce guest mode by default and auto-purge unverified or legacy test account sessions from browser storage.
  - Added `CONFIRMED` state to [OrderStatus.java](file:///e:/Projects/REVERIE/reverie-backend/src/main/java/com/reverie/order/entity/OrderStatus.java) enum.

---

## Test & Build Verification Summary
- **Backend Tests**: 39/39 passing test suites (`mvn test`), including dedicated OTP login and unverified challenge tests.
- **Frontend Build**: 15/15 static & dynamic routes compiled cleanly (`npm run build`).
- **Daemons**: Spring Boot (port 8080), Next.js (port 3000), and PostgreSQL (port 5432) active and operational.
