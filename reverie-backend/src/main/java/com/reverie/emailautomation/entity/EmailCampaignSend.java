package com.reverie.emailautomation.entity;

import com.reverie.user.entity.User;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
    name = "email_campaign_sends",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_campaign_customer", columnNames = {"campaign_id", "customer_id"})
    }
)
public class EmailCampaignSend {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "campaign_id", nullable = false)
    private EmailCampaign campaign;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @Column(name = "customer_email", nullable = false)
    private String customerEmail;

    @Column(nullable = false, length = 32)
    private String status = "PENDING"; // PENDING, SENT, FAILED, SKIPPED

    @Column(nullable = false, length = 32)
    private String provider = "BREVO"; // BREVO or N8N

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "sent_at")
    private Instant sentAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public EmailCampaignSend() {}

    public EmailCampaignSend(EmailCampaign campaign, User customer, String customerEmail, String status, String provider) {
        this.campaign = campaign;
        this.customer = customer;
        this.customerEmail = customerEmail;
        this.status = status != null ? status.toUpperCase() : "PENDING";
        this.provider = provider != null ? provider.toUpperCase() : "BREVO";
        this.createdAt = Instant.now();
        if ("SENT".equalsIgnoreCase(status)) {
            this.sentAt = Instant.now();
        }
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public EmailCampaign getCampaign() { return campaign; }
    public void setCampaign(EmailCampaign campaign) { this.campaign = campaign; }

    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status != null ? status.toUpperCase() : "PENDING"; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider != null ? provider.toUpperCase() : "BREVO"; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

    public Instant getSentAt() { return sentAt; }
    public void setSentAt(Instant sentAt) { this.sentAt = sentAt; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
