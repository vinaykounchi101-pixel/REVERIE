package com.reverie.emailautomation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

public class CreateEmailCampaignRequest {

    @NotBlank(message = "Campaign title is required")
    @Size(max = 255)
    private String title;

    @NotBlank(message = "Email subject is required")
    @Size(max = 255)
    private String subject;

    @Size(max = 255)
    private String previewText;

    @NotBlank(message = "HTML content template is required")
    private String htmlTemplate;

    @Size(max = 64)
    private String discountCode;

    private Integer discountPercentage;

    private String status; // DRAFT, SCHEDULED, ACTIVE

    private Instant scheduledStartAt;
    private Instant scheduledEndAt;

    public CreateEmailCampaignRequest() {}

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
}
