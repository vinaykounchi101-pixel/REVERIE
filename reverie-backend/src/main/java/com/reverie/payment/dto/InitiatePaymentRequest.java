package com.reverie.payment.dto;

import com.reverie.payment.entity.PaymentProviderType;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class InitiatePaymentRequest {

    @NotNull(message = "Order ID is required")
    private UUID orderId;

    private PaymentProviderType provider = PaymentProviderType.MOCK;

    public InitiatePaymentRequest() {}

    public InitiatePaymentRequest(UUID orderId, PaymentProviderType provider) {
        this.orderId = orderId;
        this.provider = provider != null ? provider : PaymentProviderType.MOCK;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public PaymentProviderType getProvider() {
        return provider;
    }

    public void setProvider(PaymentProviderType provider) {
        this.provider = provider;
    }
}
