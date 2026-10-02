package com.reverie.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class CreateOrderRequest {

    @NotNull(message = "Checkout Session ID is required")
    private UUID checkoutSessionId;

    @Valid
    private AddressDto shippingAddress;

    private String idempotencyKey;

    public CreateOrderRequest() {}

    public CreateOrderRequest(UUID checkoutSessionId, AddressDto shippingAddress, String idempotencyKey) {
        this.checkoutSessionId = checkoutSessionId;
        this.shippingAddress = shippingAddress;
        this.idempotencyKey = idempotencyKey;
    }

    public UUID getCheckoutSessionId() {
        return checkoutSessionId;
    }

    public void setCheckoutSessionId(UUID checkoutSessionId) {
        this.checkoutSessionId = checkoutSessionId;
    }

    public AddressDto getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(AddressDto shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }
}
