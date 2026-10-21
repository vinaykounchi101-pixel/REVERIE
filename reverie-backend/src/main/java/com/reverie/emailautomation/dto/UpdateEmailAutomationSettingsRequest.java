package com.reverie.emailautomation.dto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UpdateEmailAutomationSettingsRequest {

    private Boolean isGlobalEnabled;
    private Boolean isLoginNotificationEnabled;
    private Boolean isCampaignsEnabled;

    @Pattern(regexp = "(?i)BREVO|N8N", message = "Provider must be either BREVO or N8N")
    private String activeProvider;

    @Size(max = 512, message = "n8n Webhook URL cannot exceed 512 characters")
    private String n8nWebhookUrl;

    public UpdateEmailAutomationSettingsRequest() {}

    public Boolean getIsGlobalEnabled() { return isGlobalEnabled; }
    public void setIsGlobalEnabled(Boolean isGlobalEnabled) { this.isGlobalEnabled = isGlobalEnabled; }

    public Boolean getIsLoginNotificationEnabled() { return isLoginNotificationEnabled; }
    public void setIsLoginNotificationEnabled(Boolean isLoginNotificationEnabled) { this.isLoginNotificationEnabled = isLoginNotificationEnabled; }

    public Boolean getIsCampaignsEnabled() { return isCampaignsEnabled; }
    public void setIsCampaignsEnabled(Boolean isCampaignsEnabled) { this.isCampaignsEnabled = isCampaignsEnabled; }

    public String getActiveProvider() { return activeProvider; }
    public void setActiveProvider(String activeProvider) { this.activeProvider = activeProvider; }

    public String getN8nWebhookUrl() { return n8nWebhookUrl; }
    public void setN8nWebhookUrl(String n8nWebhookUrl) { this.n8nWebhookUrl = n8nWebhookUrl; }
}
