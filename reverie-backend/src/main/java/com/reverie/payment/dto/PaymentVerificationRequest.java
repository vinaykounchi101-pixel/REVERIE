package com.reverie.payment.dto;

import jakarta.validation.constraints.NotNull;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class PaymentVerificationRequest {

    @NotNull(message = "Payment ID is required")
    private UUID paymentId;

    private Map<String, String> payload = new HashMap<>();

    public PaymentVerificationRequest() {}

    public PaymentVerificationRequest(UUID paymentId, Map<String, String> payload) {
        this.paymentId = paymentId;
        this.payload = payload != null ? payload : new HashMap<>();
    }

    public UUID getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(UUID paymentId) {
        this.paymentId = paymentId;
    }

    public Map<String, String> getPayload() {
        return payload;
    }

    public void setPayload(Map<String, String> payload) {
        this.payload = payload;
    }
}
