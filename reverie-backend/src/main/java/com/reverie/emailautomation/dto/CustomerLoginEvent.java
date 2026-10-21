package com.reverie.emailautomation.dto;

import java.time.Instant;
import java.util.UUID;

public class CustomerLoginEvent {

    private String eventType = "CUSTOMER_LOGIN";
    private UUID eventId;
    private UUID customerId;
    private String email;
    private String firstName;
    private String timestamp;
    private String provider;

    public CustomerLoginEvent() {}

    public CustomerLoginEvent(UUID customerId, String email, String firstName, String provider) {
        this.eventType = "CUSTOMER_LOGIN";
        this.eventId = UUID.randomUUID();
        this.customerId = customerId;
        this.email = email;
        this.firstName = firstName != null ? firstName : "Collector";
        this.timestamp = Instant.now().toString();
        this.provider = provider != null ? provider : "BREVO";
    }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public UUID getEventId() { return eventId; }
    public void setEventId(UUID eventId) { this.eventId = eventId; }

    public UUID getCustomerId() { return customerId; }
    public void setCustomerId(UUID customerId) { this.customerId = customerId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }
}
