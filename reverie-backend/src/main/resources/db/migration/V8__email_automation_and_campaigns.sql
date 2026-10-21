-- =============================================================================
-- REVERIE Flyway Migration: V8__email_automation_and_campaigns.sql
-- Description: Additive schema for Email Automation, Marketing Consent, and Campaign Management.
-- =============================================================================

-- 1. Add Marketing Consent & Unsubscribe tracking to existing users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP WITH TIME ZONE NULL;

CREATE INDEX IF NOT EXISTS idx_users_marketing_consent 
ON users (role, marketing_consent, is_active);

-- 2. Email Automation Global Settings table (single-row configuration)
CREATE TABLE IF NOT EXISTS email_automation_settings (
    id VARCHAR(32) PRIMARY KEY DEFAULT 'GLOBAL',
    is_global_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    is_login_notification_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    is_campaigns_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    active_provider VARCHAR(32) NOT NULL DEFAULT 'BREVO', -- 'BREVO' or 'N8N'
    n8n_webhook_url VARCHAR(512) NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by VARCHAR(255) NULL
);

-- Seed default global settings row if not present
INSERT INTO email_automation_settings (id, is_global_enabled, is_login_notification_enabled, is_campaigns_enabled, active_provider, updated_at)
VALUES ('GLOBAL', TRUE, TRUE, TRUE, 'BREVO', NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Email Campaigns table (Seasonal & Holiday Promotions e.g. Diwali, Dussehra, Christmas)
CREATE TABLE IF NOT EXISTS email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    preview_text VARCHAR(255) NULL,
    html_template TEXT NOT NULL,
    discount_code VARCHAR(64) NULL,
    discount_percentage INTEGER NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'SCHEDULED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED'
    scheduled_start_at TIMESTAMP WITH TIME ZONE NULL,
    scheduled_end_at TIMESTAMP WITH TIME ZONE NULL,
    total_targeted INTEGER NOT NULL DEFAULT 0,
    total_sent INTEGER NOT NULL DEFAULT 0,
    total_failed INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status_dates 
ON email_campaigns (status, scheduled_start_at, scheduled_end_at);

-- 4. Email Campaign Sends (Per-campaign, per-customer idempotency ledger)
CREATE TABLE IF NOT EXISTS email_campaign_sends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    customer_email VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'SENT', 'FAILED', 'SKIPPED'
    provider VARCHAR(32) NOT NULL DEFAULT 'BREVO',
    error_message TEXT NULL,
    sent_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT uk_campaign_customer UNIQUE (campaign_id, customer_id)
);

CREATE INDEX IF NOT EXISTS idx_campaign_sends_campaign_status 
ON email_campaign_sends (campaign_id, status);

CREATE INDEX IF NOT EXISTS idx_campaign_sends_customer 
ON email_campaign_sends (customer_id);
