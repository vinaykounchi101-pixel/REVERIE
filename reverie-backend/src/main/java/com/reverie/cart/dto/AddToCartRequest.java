package com.reverie.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class AddToCartRequest {

    @NotNull(message = "Variant ID is required")
    private UUID variantId;

    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity = 1;

    private String selectedStrap;

    public AddToCartRequest() {}

    public AddToCartRequest(UUID variantId, Integer quantity, String selectedStrap) {
        this.variantId = variantId;
        this.quantity = quantity != null ? quantity : 1;
        this.selectedStrap = selectedStrap;
    }

    public UUID getVariantId() {
        return variantId;
    }

    public void setVariantId(UUID variantId) {
        this.variantId = variantId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getSelectedStrap() {
        return selectedStrap;
    }

    public void setSelectedStrap(String selectedStrap) {
        this.selectedStrap = selectedStrap;
    }
}
