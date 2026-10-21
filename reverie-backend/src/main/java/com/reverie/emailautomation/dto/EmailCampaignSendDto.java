package com.reverie.emailautomation.dto;

import com.reverie.emailautomation.entity.EmailCampaignSend;
import java.time.Instant;
import java.util.UUID;

public class EmailCampaignSendDto {

    private UUID id;
    private UUID campaignId;
    private UUID customerId;
    private String customerEmail;
    private String status;
    private String provider;
    private String errorMessage;
    private Instant sentAt;
    private Instant createdAt;

    public EmailCampaignSendDto() {}

    public static EmailCampaignSendDto fromEntity(EmailCampaignSend entity) {
        EmailCampaignSendDto dto = new EmailCampaignSendDto();
        dto.setId(entity.getId());
        dto.setCampaignId(entity.getCampaign() != null ? entity.getCampaign().getId() : null);
        dto.setCustomerId(entity.getCustomer() != null ? entity.getCustomer().getId() : null);
        dto.setCustomerEmail(entity.getCustomerEmail());
        dto.setStatus(entity.getStatus());
        dto.setProvider(entity.getProvider());
        dto.setErrorMessage(entity.getErrorMessage());
        dto.setSentAt(entity.getSentAt());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getCampaignId() { return campaignId; }
    public void setCampaignId(UUID campaignId) { this.campaignId = campaignId; }

    public UUID getCustomerId() { return customerId; }
    public void setCustomerId(UUID customerId) { this.customerId = customerId; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

    public Instant getSentAt() { return sentAt; }
    public void setSentAt(Instant sentAt) { this.sentAt = sentAt; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
