# Prompt 27: REVERIE — Backend, Commerce Integration, Security Hardening & SRS Engineering Specification

**User Prompt:**
> # REVERIE — BACKEND, COMMERCE INTEGRATION, SECURITY HARDENING & SRS ENGINEERING SPECIFICATION
> 
> ## 0. ROLE
> You are the lead engineer responsible for bringing the existing **REVERIE luxury watch e-commerce application** to a robust, production-oriented MVP state.
> You are working on an **existing codebase**.
> Do NOT rebuild the backend from scratch.
> Do NOT replace the architecture unnecessarily.
> Do NOT create a new project.
> Do NOT introduce microservices, Kafka, Kubernetes, or other infrastructure unless the existing project genuinely requires it.
> 
> Your job is to:
> 1. Audit the current implementation.
> 2. Preserve what is already correctly implemented.
> 3. Fix incomplete, insecure, simulated, or disconnected functionality.
> 4. Make the customer commerce journey work end-to-end.
> 5. Strengthen the backend's production-ready foundations.
> 6. Keep future production capabilities extensible without forcing unnecessary infrastructure now.
> 7. Update the canonical REVERIE SRS so that it accurately documents what is built, what is real, and what remains extensible for future phases.

---

### Key Requirements & Implementation Scope:

#### 1. P0 Security Hardening:
- **Google OAuth Cryptographic ID Token Verification**: Verify `iss`, `aud`, `exp`, and `email` claims from Google ID tokens in `AuthService.java` rather than trusting unverified email strings.
- **Strict CORS Lockdown**: Update `WebConfig.java` to enforce exact allowed origins in production mode.
- **Sensitive Data Masking**: Remove raw OTP values from all log outputs in `AuthService.java` and `EmailService.java`.

#### 2. End-to-End Commerce Flow:
- Cart persistence and synchronization with Spring Boot backend (`/api/cart`).
- Multi-currency checkout handling with Stripe and Razorpay webhook validation.
- Order state machine transitions (`PENDING_PAYMENT` → `CONFIRMED` → `PROCESSING` → `SHIPPED` → `DELIVERED`).
- Customer address management endpoint mapping (`@RequestMapping({"/api/customers/addresses", "/api/customers/me/addresses"})`).

#### 3. Canonical SRS Synchronization:
- Update `docs/REVERIE_SRS_FINAL.md` with Section 47 (Traceability & Implementation Matrix).
- Document all active REST endpoints, security controls, and database schemas.
