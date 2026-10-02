package com.reverie.payment.provider;

import java.util.Map;

public class PaymentInitiationResult {

    private final String providerRef;
    private final String providerOrderId;
    private final Map<String, Object> clientPayload;

    public PaymentInitiationResult(String providerRef, String providerOrderId, Map<String, Object> clientPayload) {
        this.providerRef = providerRef;
        this.providerOrderId = providerOrderId;
        this.clientPayload = clientPayload;
    }

    public String getProviderRef() {
        return providerRef;
    }

    public String getProviderOrderId() {
        return providerOrderId;
    }

    public Map<String, Object> getClientPayload() {
        return clientPayload;
    }
}
