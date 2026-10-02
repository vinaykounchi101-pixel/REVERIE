package com.reverie.payment.dto;

import com.reverie.payment.entity.PaymentProviderType;

import java.util.Map;
import java.util.UUID;

public class InitiatePaymentResponse {

    private UUID paymentId;
    private UUID orderId;
    private PaymentProviderType provider;
    private String providerRef;
    private Long amountPaise;
    private String currency;
    private Map<String, Object> clientPayload;

    public InitiatePaymentResponse() {}

    public InitiatePaymentResponse(UUID paymentId, UUID orderId, PaymentProviderType provider, String providerRef, Long amountPaise, String currency, Map<String, Object> clientPayload) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.provider = provider;
        this.providerRef = providerRef;
        this.amountPaise = amountPaise;
        this.currency = currency;
        this.clientPayload = clientPayload;
    }

    public UUID getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(UUID paymentId) {
        this.paymentId = paymentId;
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

    public String getProviderRef() {
        return providerRef;
    }

    public void setProviderRef(String providerRef) {
        this.providerRef = providerRef;
    }

    public Long getAmountPaise() {
        return amountPaise;
    }

    public void setAmountPaise(Long amountPaise) {
        this.amountPaise = amountPaise;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Map<String, Object> getClientPayload() {
        return clientPayload;
    }

    public void setClientPayload(Map<String, Object> clientPayload) {
        this.clientPayload = clientPayload;
    }
}
