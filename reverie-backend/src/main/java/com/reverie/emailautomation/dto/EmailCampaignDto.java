package com.reverie.emailautomation.dto;

import com.reverie.emailautomation.entity.EmailCampaign;
import java.time.Instant;
import java.util.UUID;

public class EmailCampaignDto {

    private UUID id;
    private String title;
    private String subject;
    private String previewText;
    private String htmlTemplate;
    private String discountCode;
    private Integer discountPercentage;
    private String status;
    private Instant scheduledStartAt;
    private Instant scheduledEndAt;
    private int totalTargeted;
    private int totalSent;
    private int totalFailed;
    private Instant createdAt;
    private Instant updatedAt;

    public EmailCampaignDto() {}

    public static EmailCampaignDto fromEntity(EmailCampaign entity) {
        EmailCampaignDto dto = new EmailCampaignDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setSubject(entity.getSubject());
        dto.setPreviewText(entity.getPreviewText());
        dto.setHtmlTemplate(entity.getHtmlTemplate());
        dto.setDiscountCode(entity.getDiscountCode());
        dto.setDiscountPercentage(entity.getDiscountPercentage());
        dto.setStatus(entity.getStatus());
        dto.setScheduledStartAt(entity.getScheduledStartAt());
        dto.setScheduledEndAt(entity.getScheduledEndAt());
        dto.setTotalTargeted(entity.getTotalTargeted());
        dto.setTotalSent(entity.getTotalSent());
        dto.setTotalFailed(entity.getTotalFailed());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getPreviewText() { return previewText; }
    public void setPreviewText(String previewText) { this.previewText = previewText; }

    public String getHtmlTemplate() { return htmlTemplate; }
    public void setHtmlTemplate(String htmlTemplate) { this.htmlTemplate = htmlTemplate; }

    public String getDiscountCode() { return discountCode; }
    public void setDiscountCode(String discountCode) { this.discountCode = discountCode; }

    public Integer getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(Integer discountPercentage) { this.discountPercentage = discountPercentage; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getScheduledStartAt() { return scheduledStartAt; }
    public void setScheduledStartAt(Instant scheduledStartAt) { this.scheduledStartAt = scheduledStartAt; }

    public Instant getScheduledEndAt() { return scheduledEndAt; }
    public void setScheduledEndAt(Instant scheduledEndAt) { this.scheduledEndAt = scheduledEndAt; }

    public int getTotalTargeted() { return totalTargeted; }
    public void setTotalTargeted(int totalTargeted) { this.totalTargeted = totalTargeted; }

    public int getTotalSent() { return totalSent; }
    public void setTotalSent(int totalSent) { this.totalSent = totalSent; }

    public int getTotalFailed() { return totalFailed; }
    public void setTotalFailed(int totalFailed) { this.totalFailed = totalFailed; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
