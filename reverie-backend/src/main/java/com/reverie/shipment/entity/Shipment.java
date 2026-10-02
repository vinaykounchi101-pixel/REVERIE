package com.reverie.shipment.entity;

import com.reverie.order.entity.Order;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(nullable = false, length = 50)
    private String provider = "SEQUOIA_SECURE_LOGISTICS";

    @Column(length = 100)
    private String awb;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ShipmentStatus status = ShipmentStatus.LABEL_CREATED;

    @Column(nullable = false, length = 50)
    private String method = "EXPRESS_INSURED";

    @Column(name = "estimated_delivery")
    private Instant estimatedDelivery;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public Shipment() {}

    public Shipment(Order order, String provider, String awb, ShipmentStatus status, String method, Instant estimatedDelivery) {
        this.order = order;
        this.provider = provider != null ? provider : "SEQUOIA_SECURE_LOGISTICS";
        this.awb = awb;
        this.status = status != null ? status : ShipmentStatus.LABEL_CREATED;
        this.method = method != null ? method : "EXPRESS_INSURED";
        this.estimatedDelivery = estimatedDelivery;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getAwb() {
        return awb;
    }

    public void setAwb(String awb) {
        this.awb = awb;
    }

    public ShipmentStatus getStatus() {
        return status;
    }

    public void setStatus(ShipmentStatus status) {
        this.status = status;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Instant getEstimatedDelivery() {
        return estimatedDelivery;
    }

    public void setEstimatedDelivery(Instant estimatedDelivery) {
        this.estimatedDelivery = estimatedDelivery;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
