package com.reverie.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UpdateCartItemRequest {

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    private String selectedStrap;

    public UpdateCartItemRequest() {}

    public UpdateCartItemRequest(Integer quantity, String selectedStrap) {
        this.quantity = quantity;
        this.selectedStrap = selectedStrap;
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
