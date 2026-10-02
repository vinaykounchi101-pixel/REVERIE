package com.reverie.shipment.dto;

import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.UUID;

public class CreateShipmentRequest {

    @NotNull(message = "Order ID is required")
    private UUID orderId;

    private String provider = "SEQUOIA_SECURE_LOGISTICS";
    private String method = "EXPRESS_INSURED";
    private Instant estimatedDelivery;

    public CreateShipmentRequest() {}

    public CreateShipmentRequest(UUID orderId, String provider, String method, Instant estimatedDelivery) {
        this.orderId = orderId;
        this.provider = provider != null ? provider : "SEQUOIA_SECURE_LOGISTICS";
        this.method = method != null ? method : "EXPRESS_INSURED";
        this.estimatedDelivery = estimatedDelivery;
    }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public Instant getEstimatedDelivery() { return estimatedDelivery; }
    public void setEstimatedDelivery(Instant estimatedDelivery) { this.estimatedDelivery = estimatedDelivery; }
}
