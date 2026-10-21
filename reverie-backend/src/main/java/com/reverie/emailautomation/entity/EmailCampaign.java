package com.reverie.emailautomation.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "email_campaigns")
public class EmailCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subject;

    @Column(name = "preview_text")
    private String previewText;

    @Column(name = "html_template", nullable = false, columnDefinition = "TEXT")
    private String htmlTemplate;

    @Column(name = "discount_code", length = 64)
    private String discountCode;

    @Column(name = "discount_percentage")
    private Integer discountPercentage;

    @Column(nullable = false, length = 32)
    private String status = "DRAFT"; // DRAFT, SCHEDULED, ACTIVE, PAUSED, COMPLETED, CANCELLED

    @Column(name = "scheduled_start_at")
    private Instant scheduledStartAt;

    @Column(name = "scheduled_end_at")
    private Instant scheduledEndAt;

    @Column(name = "total_targeted", nullable = false)
    private int totalTargeted = 0;

    @Column(name = "total_sent", nullable = false)
    private int totalSent = 0;

    @Column(name = "total_failed", nullable = false)
    private int totalFailed = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public EmailCampaign() {}

    public EmailCampaign(String title, String subject, String previewText, String htmlTemplate,
                         String discountCode, Integer discountPercentage, Instant scheduledStartAt, Instant scheduledEndAt) {
        this.title = title;
        this.subject = subject;
        this.previewText = previewText;
        this.htmlTemplate = htmlTemplate;
        this.discountCode = discountCode;
        this.discountPercentage = discountPercentage;
        this.scheduledStartAt = scheduledStartAt;
        this.scheduledEndAt = scheduledEndAt;
        this.status = "DRAFT";
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    // Getters and Setters
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
    public void setStatus(String status) { this.status = (status != null) ? status.toUpperCase() : "DRAFT"; }

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
