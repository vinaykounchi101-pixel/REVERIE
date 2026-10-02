package com.reverie.order.entity;

public enum OrderStatus {
    PENDING_PAYMENT,
    PAYMENT_AUTHORIZED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    REFUNDED
}
