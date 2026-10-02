package com.reverie.shipment.dto;

import com.reverie.shipment.entity.Shipment;
import com.reverie.shipment.entity.ShipmentStatus;

import java.time.Instant;
import java.util.UUID;

public class ShipmentDto {

    private UUID id;
    private UUID orderId;
    private String orderNumber;
    private String provider;
    private String awb;
    private ShipmentStatus status;
    private String method;
    private Instant estimatedDelivery;
    private Instant createdAt;

    public ShipmentDto() {}

    public static ShipmentDto fromEntity(Shipment shipment) {
        ShipmentDto dto = new ShipmentDto();
        dto.setId(shipment.getId());
        dto.setOrderId(shipment.getOrder().getId());
        dto.setOrderNumber(shipment.getOrder().getOrderNumber());
        dto.setProvider(shipment.getProvider());
        dto.setAwb(shipment.getAwb());
        dto.setStatus(shipment.getStatus());
        dto.setMethod(shipment.getMethod());
        dto.setEstimatedDelivery(shipment.getEstimatedDelivery());
        dto.setCreatedAt(shipment.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public String getAwb() { return awb; }
    public void setAwb(String awb) { this.awb = awb; }

    public ShipmentStatus getStatus() { return status; }
    public void setStatus(ShipmentStatus status) { this.status = status; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public Instant getEstimatedDelivery() { return estimatedDelivery; }
    public void setEstimatedDelivery(Instant estimatedDelivery) { this.estimatedDelivery = estimatedDelivery; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
