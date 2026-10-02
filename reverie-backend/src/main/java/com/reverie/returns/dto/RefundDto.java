package com.reverie.returns.dto;

import com.reverie.returns.entity.Refund;

import java.time.Instant;
import java.util.UUID;

public class RefundDto {

    private UUID id;
    private UUID paymentId;
    private UUID orderId;
    private Long amountPaise;
    private String destination;
    private String status;
    private UUID createdBy;
    private Instant createdAt;

    public RefundDto() {}

    public static RefundDto fromEntity(Refund refund) {
        RefundDto dto = new RefundDto();
        dto.setId(refund.getId());
        dto.setPaymentId(refund.getPayment().getId());
        dto.setOrderId(refund.getOrder().getId());
        dto.setAmountPaise(refund.getAmountPaise());
        dto.setDestination(refund.getDestination());
        dto.setStatus(refund.getStatus());
        dto.setCreatedBy(refund.getCreatedBy());
        dto.setCreatedAt(refund.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getPaymentId() { return paymentId; }
    public void setPaymentId(UUID paymentId) { this.paymentId = paymentId; }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public Long getAmountPaise() { return amountPaise; }
    public void setAmountPaise(Long amountPaise) { this.amountPaise = amountPaise; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public UUID getCreatedBy() { return createdBy; }
    public void setCreatedBy(UUID createdBy) { this.createdBy = createdBy; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
