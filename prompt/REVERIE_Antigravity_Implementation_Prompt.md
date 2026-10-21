# Antigravity Implementation Prompt — REVERIE Email Automation + n8n

You are working in the existing REVERIE watch-brand e-commerce repository:
https://github.com/vinaykounchi101-pixel/REVERIE

Implement a production-minded email automation system that integrates the existing Spring Boot backend, Supabase PostgreSQL database, REVERIE admin panel, and n8n Cloud. Preserve all existing functionality and working UI.

## Non-negotiable constraints
- Inspect the repository and its actual active development branch before editing. Do not assume branch names.
- Read the existing auth, email-provider, admin/settings, database entity/repository, Flyway migration, and frontend admin code before making changes.
- Do not replace or delete the existing Brevo integration. Keep it available as an admin-selectable provider.
- Do not modify the existing birthday-email or JARVIS n8n workflows.
- Do not send login notification emails for admin login.
- Do not send marketing emails to customers who have not opted in, have unsubscribed, or are otherwise ineligible.
- Never expose secrets, API keys, SMTP credentials, database credentials, passwords, OTPs, access tokens, or refresh tokens to the frontend or n8n payloads.
- Do not hardcode secrets. Use environment variables and document required names in an example env file without values.
- Do not claim any feature is working until code/tests or a real test confirms it.
- Keep changes focused; do not refactor unrelated code or break the existing hero page or unrelated features.
- The user is a beginner. Provide a concise summary and exact local testing steps after implementation.

## Required behavior

### A. Successful customer password-login notification
- Trigger only after a successful customer password login.
- Do not trigger for `/api/auth/admin/login`, admin sessions, failed login attempts, or unrelated token issuance paths.
- Place the trigger in the customer password-login flow only, after authentication has succeeded.
- The n8n webhook call must be non-blocking or have a short timeout and must not make a valid login fail if n8n is temporarily unavailable.
- Send only the minimum payload required, such as event type, customer ID, customer email, first name if already available, and event timestamp. Do not send credentials or tokens.
- Avoid duplicate notifications caused by retries where practical; include a stable event/idempotency identifier if available.
- Keep the existing direct email/Brevo behavior intact unless the admin setting explicitly selects a different provider.

### B. Seasonal promotional campaigns
- Support campaigns such as Diwali, Dussehra, Christmas, new launches, and future offers without code changes for each holiday.
- Admins can create/edit/pause/schedule campaigns with title, subject, content/template, optional offer/discount details, start/end time, and status.
- Scheduled campaign execution should fetch eligible registered customers from Supabase and send only to customers with explicit marketing consent who have not unsubscribed.
- Add a per-customer/per-campaign send record or equivalent idempotency guard to prevent duplicate sends on repeated schedule runs.
- Track queued/sent/failed/skipped status, timestamps, provider, and safe error summaries. Do not store secrets in campaign rows.
- Use pagination/batching and conservative rate limits; do not load an unlimited customer list into memory or blast all recipients in one unbounded execution.
- Respect campaign start/end times, pause state, global automation setting, and marketing consent/unsubscribe state.
- Do not mix marketing campaigns with transactional login notifications or transactional account emails.

### C. Admin controls and Supabase persistence
- Add admin settings for:
  - global email automation enabled/disabled;
  - transactional login notification enabled/disabled;
  - marketing campaigns enabled/disabled;
  - provider selection: existing Brevo or n8n-managed email delivery;
  - n8n webhook URL/configuration status, without exposing the secret to the browser;
  - campaign management and execution history.
- Persist settings and campaign metadata in Supabase through the existing backend/database architecture.
- First inspect the existing schema and reuse existing user/customer, consent, settings, and audit structures wherever suitable. Do not create duplicate customer tables.
- Add only necessary Flyway migrations. Follow the project's existing naming, entity, repository, validation, authorization, audit, and API conventions.
- Do not store secrets in ordinary settings rows. Keep webhook auth secrets and provider API keys in backend environment configuration or an existing secure secret mechanism.
- Make provider switching explicit and prevent duplicate delivery through both providers.

### D. Email delivery
- For provider `BREVO`, use and preserve the current Brevo implementation.
- For provider `N8N`, the workflow should perform the delivery using a configured n8n email node/provider, or a documented n8n HTTP integration. Do not simply send the event back to the backend and claim n8n sent the email.
- Provide secure webhook authentication between backend and n8n (for example, a secret header). Do not use an unauthenticated production webhook.
- Validate webhook payloads and reject malformed or unsupported events.
- Keep transactional login notifications separate from marketing consent rules; marketing emails must always respect opt-in/unsubscribe.

## n8n workflow deliverable
There is a companion file named `REVERIE_n8n_email_automation_template.json`. Treat it as an importable starter template, not as proof of a completed connection. Inspect its nodes and adapt it to the real database schema, actual backend event payload, and the n8n version in use.
- Aim for one REVERIE workflow with two trigger paths: a Webhook trigger for login events and a Schedule Trigger for due promotional campaigns.
- n8n should read the appropriate settings/campaign/recipient data from Supabase PostgreSQL, using an n8n PostgreSQL credential configured manually in n8n. Never embed credentials in the JSON.
- For campaign selection, fetch due and active campaigns; then fetch eligible opted-in customers in bounded batches; enforce per-campaign/per-customer idempotency; send through the selected provider; persist each result.
- For login events, validate that the event is a successful customer password login, check automation/provider settings, then send only the login notification.
- If one workflow becomes unreliable or overly complex due to multiple trigger types, document the trade-off and keep the requested initial one-workflow design unless a concrete n8n limitation prevents it.
- Add clear sticky notes or node descriptions explaining where to configure credentials, SQL/table names, webhook authentication, and provider credentials.
- Keep the workflow JSON free of secrets and real customer data.

## Reliability and security
- Add tests for customer login trigger vs admin login exclusion, webhook failure not breaking login, provider selection, campaign consent filtering, duplicate prevention, scheduling boundaries, and authorization for admin campaign/settings endpoints.
- Add validation and safe error handling; avoid logging personal data or secrets.
- Ensure API responses never reveal provider secrets or webhook auth values.
- Make database migrations compatible with the project's current Flyway strategy and PostgreSQL/Supabase.
- Verify the application still builds and existing tests pass. Report any tests that cannot run and why.

## Work sequence
1. Inspect repo branch/status and existing architecture; report findings before risky changes.
2. Map actual customer/user schema, marketing consent/unsubscribe fields, current email provider service, admin settings architecture, and existing migrations.
3. Propose the minimal schema/API changes; then implement consistently.
4. Update the n8n JSON template to match the actual schema and expected payload. Do not invent table/column names.
5. Add tests and run build/tests.
6. Provide a file-by-file change summary, environment variable names (no values), migration instructions, n8n credential setup, and beginner-friendly local testing steps.

Do not deploy anything or make live Supabase changes without explicit authorization. Do not commit or push changes unless explicitly requested.
