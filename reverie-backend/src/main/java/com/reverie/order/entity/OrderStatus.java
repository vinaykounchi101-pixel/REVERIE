package com.reverie.order.entity;

public enum OrderStatus {
    PENDING_PAYMENT,
    PAYMENT_AUTHORIZED,
    CONFIRMED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    REFUNDED
}
