package com.reverie.emailautomation.dto;

import com.reverie.emailautomation.entity.EmailAutomationSettings;
import java.time.Instant;

public class EmailAutomationSettingsDto {

    private String id;
    private boolean isGlobalEnabled;
    private boolean isLoginNotificationEnabled;
    private boolean isCampaignsEnabled;
    private String activeProvider;
    private String n8nWebhookUrl;
    private boolean isWebhookSecretConfigured;
    private Instant updatedAt;
    private String updatedBy;

    public EmailAutomationSettingsDto() {}

    public static EmailAutomationSettingsDto fromEntity(EmailAutomationSettings entity, boolean hasSecretConfigured) {
        EmailAutomationSettingsDto dto = new EmailAutomationSettingsDto();
        dto.setId(entity.getId());
        dto.setGlobalEnabled(entity.isGlobalEnabled());
        dto.setLoginNotificationEnabled(entity.isLoginNotificationEnabled());
        dto.setCampaignsEnabled(entity.isCampaignsEnabled());
        dto.setActiveProvider(entity.getActiveProvider());
        dto.setN8nWebhookUrl(entity.getN8nWebhookUrl());
        dto.setWebhookSecretConfigured(hasSecretConfigured);
        dto.setUpdatedAt(entity.getUpdatedAt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        return dto;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public boolean isGlobalEnabled() { return isGlobalEnabled; }
    public void setGlobalEnabled(boolean globalEnabled) { isGlobalEnabled = globalEnabled; }

    public boolean isLoginNotificationEnabled() { return isLoginNotificationEnabled; }
    public void setLoginNotificationEnabled(boolean loginNotificationEnabled) { isLoginNotificationEnabled = loginNotificationEnabled; }

    public boolean isCampaignsEnabled() { return isCampaignsEnabled; }
    public void setCampaignsEnabled(boolean campaignsEnabled) { isCampaignsEnabled = campaignsEnabled; }

    public String getActiveProvider() { return activeProvider; }
    public void setActiveProvider(String activeProvider) { this.activeProvider = activeProvider; }

    public String getN8nWebhookUrl() { return n8nWebhookUrl; }
    public void setN8nWebhookUrl(String n8nWebhookUrl) { this.n8nWebhookUrl = n8nWebhookUrl; }

    public boolean isWebhookSecretConfigured() { return isWebhookSecretConfigured; }
    public void setWebhookSecretConfigured(boolean webhookSecretConfigured) { isWebhookSecretConfigured = webhookSecretConfigured; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public String getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
}
