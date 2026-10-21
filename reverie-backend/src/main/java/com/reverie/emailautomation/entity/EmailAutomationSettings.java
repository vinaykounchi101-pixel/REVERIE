package com.reverie.emailautomation.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "email_automation_settings")
public class EmailAutomationSettings {

    @Id
    @Column(length = 32)
    private String id = "GLOBAL";

    @Column(name = "is_global_enabled", nullable = false)
    private boolean isGlobalEnabled = true;

    @Column(name = "is_login_notification_enabled", nullable = false)
    private boolean isLoginNotificationEnabled = true;

    @Column(name = "is_campaigns_enabled", nullable = false)
    private boolean isCampaignsEnabled = true;

    @Column(name = "active_provider", nullable = false, length = 32)
    private String activeProvider = "BREVO"; // "BREVO" or "N8N"

    @Column(name = "n8n_webhook_url", length = 512)
    private String n8nWebhookUrl;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(name = "updated_by")
    private String updatedBy;

    public EmailAutomationSettings() {}

    public EmailAutomationSettings(String id, boolean isGlobalEnabled, boolean isLoginNotificationEnabled,
                                  boolean isCampaignsEnabled, String activeProvider, String n8nWebhookUrl) {
        this.id = id != null ? id : "GLOBAL";
        this.isGlobalEnabled = isGlobalEnabled;
        this.isLoginNotificationEnabled = isLoginNotificationEnabled;
        this.isCampaignsEnabled = isCampaignsEnabled;
        this.activeProvider = (activeProvider != null && !activeProvider.isBlank()) ? activeProvider.toUpperCase() : "BREVO";
        this.n8nWebhookUrl = n8nWebhookUrl;
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public boolean isGlobalEnabled() { return isGlobalEnabled; }
    public void setGlobalEnabled(boolean globalEnabled) { isGlobalEnabled = globalEnabled; }

    public boolean isLoginNotificationEnabled() { return isLoginNotificationEnabled; }
    public void setLoginNotificationEnabled(boolean loginNotificationEnabled) { isLoginNotificationEnabled = loginNotificationEnabled; }

    public boolean isCampaignsEnabled() { return isCampaignsEnabled; }
    public void setCampaignsEnabled(boolean campaignsEnabled) { isCampaignsEnabled = campaignsEnabled; }

    public String getActiveProvider() { return activeProvider; }
    public void setActiveProvider(String activeProvider) {
        this.activeProvider = (activeProvider != null && !activeProvider.isBlank()) ? activeProvider.toUpperCase() : "BREVO";
    }

    public String getN8nWebhookUrl() { return n8nWebhookUrl; }
    public void setN8nWebhookUrl(String n8nWebhookUrl) { this.n8nWebhookUrl = n8nWebhookUrl; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
}
