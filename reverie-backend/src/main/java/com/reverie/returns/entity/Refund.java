package com.reverie.returns.entity;

import com.reverie.order.entity.Order;
import com.reverie.order.entity.OrderItem;
import com.reverie.payment.entity.Payment;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "refunds")
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id")
    private OrderItem orderItem;

    @Column(name = "amount_paise", nullable = false)
    private Long amountPaise;

    @Column(nullable = false, length = 50)
    private String destination = "ORIGINAL_PAYMENT";

    @Column(nullable = false, length = 50)
    private String status = "COMPLETED";

    @Column(name = "created_by")
    private UUID createdBy;

    @Column(name = "idempotency_key", unique = true, length = 100)
    private String idempotencyKey;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public Refund() {}

    public Refund(Payment payment, Order order, OrderItem orderItem, Long amountPaise, String destination, String status, UUID createdBy, String idempotencyKey) {
        this.payment = payment;
        this.order = order;
        this.orderItem = orderItem;
        this.amountPaise = amountPaise;
        this.destination = destination != null ? destination : "ORIGINAL_PAYMENT";
        this.status = status != null ? status : "COMPLETED";
        this.createdBy = createdBy;
        this.idempotencyKey = idempotencyKey;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Payment getPayment() { return payment; }
    public void setPayment(Payment payment) { this.payment = payment; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public OrderItem getOrderItem() { return orderItem; }
    public void setOrderItem(OrderItem orderItem) { this.orderItem = orderItem; }

    public Long getAmountPaise() { return amountPaise; }
    public void setAmountPaise(Long amountPaise) { this.amountPaise = amountPaise; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public UUID getCreatedBy() { return createdBy; }
    public void setCreatedBy(UUID createdBy) { this.createdBy = createdBy; }

    public String getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
