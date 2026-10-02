package com.reverie.support.dto;

import com.reverie.support.entity.TicketPriority;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class CreateTicketRequest {

    private UUID orderId;
    private String clientName;
    private String clientEmail;

    @NotBlank(message = "Subject is required")
    private String subject;

    private String category = "GENERAL_INQUIRY";
    private TicketPriority priority = TicketPriority.MEDIUM;

    @NotBlank(message = "Initial message is required")
    private String message;

    public CreateTicketRequest() {}

    public CreateTicketRequest(UUID orderId, String clientName, String clientEmail, String subject, String category, TicketPriority priority, String message) {
        this.orderId = orderId;
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.subject = subject;
        this.category = category != null ? category : "GENERAL_INQUIRY";
        this.priority = priority != null ? priority : TicketPriority.MEDIUM;
        this.message = message;
    }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public TicketPriority getPriority() { return priority; }
    public void setPriority(TicketPriority priority) { this.priority = priority; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
