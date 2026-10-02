package com.reverie.cart.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CartDto {

    private UUID id;
    private UUID userId;
    private String sessionId;
    private List<CartItemDto> items = new ArrayList<>();
    private Integer totalItems = 0;
    private Long subtotalPaise = 0L;
    private Long taxPaise = 0L;
    private Long shippingPaise = 0L;
    private Long totalPaise = 0L;
    private Boolean allItemsInStock = true;

    public CartDto() {}

    public CartDto(UUID id, UUID userId, String sessionId, List<CartItemDto> items) {
        this.id = id;
        this.userId = userId;
        this.sessionId = sessionId;
        this.items = items != null ? items : new ArrayList<>();
        calculateTotals();
    }

    public void calculateTotals() {
        this.totalItems = 0;
        this.subtotalPaise = 0L;
        boolean inStockFlag = true;

        for (CartItemDto item : this.items) {
            this.totalItems += item.getQuantity();
            this.subtotalPaise += item.getLineTotalPaise();
            if (Boolean.FALSE.equals(item.getInStock()) || (item.getAvailableQuantity() != null && item.getAvailableQuantity() < item.getQuantity())) {
                inStockFlag = false;
            }
        }

        // GST (18% inclusive or standard calculation for luxury horology: 18% on subtotal)
        // Subtotal + 18% GST (in paise)
        this.taxPaise = Math.round(this.subtotalPaise * 0.18);
        this.shippingPaise = 0L; // Complimentary insured luxury courier
        this.totalPaise = this.subtotalPaise + this.taxPaise + this.shippingPaise;
        this.allItemsInStock = inStockFlag;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
        calculateTotals();
    }

    public Integer getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(Integer totalItems) {
        this.totalItems = totalItems;
    }

    public Long getSubtotalPaise() {
        return subtotalPaise;
    }

    public void setSubtotalPaise(Long subtotalPaise) {
        this.subtotalPaise = subtotalPaise;
    }

    public Long getTaxPaise() {
        return taxPaise;
    }

    public void setTaxPaise(Long taxPaise) {
        this.taxPaise = taxPaise;
    }

    public Long getShippingPaise() {
        return shippingPaise;
    }

    public void setShippingPaise(Long shippingPaise) {
        this.shippingPaise = shippingPaise;
    }

    public Long getTotalPaise() {
        return totalPaise;
    }

    public void setTotalPaise(Long totalPaise) {
        this.totalPaise = totalPaise;
    }

    public Boolean getAllItemsInStock() {
        return allItemsInStock;
    }

    public void setAllItemsInStock(Boolean allItemsInStock) {
        this.allItemsInStock = allItemsInStock;
    }
}
