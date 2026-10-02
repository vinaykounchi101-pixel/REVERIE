package com.reverie.payment.dto;

import com.reverie.payment.entity.Payment;
import com.reverie.payment.entity.PaymentProviderType;
import com.reverie.payment.entity.PaymentStatus;

import java.time.Instant;
import java.util.UUID;

public class PaymentDto {

    private UUID id;
    private UUID orderId;
    private PaymentProviderType provider;
    private String providerRef;
    private PaymentStatus status;
    private Long amountPaise;
    private String method;
    private Integer attemptNo;
    private String failureReason;
    private Instant createdAt;

    public PaymentDto() {}

    public static PaymentDto fromEntity(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setOrderId(payment.getOrder().getId());
        dto.setProvider(payment.getProvider());
        dto.setProviderRef(payment.getProviderRef());
        dto.setStatus(payment.getStatus());
        dto.setAmountPaise(payment.getAmountPaise());
        dto.setMethod(payment.getMethod());
        dto.setAttemptNo(payment.getAttemptNo());
        dto.setFailureReason(payment.getFailureReason());
        dto.setCreatedAt(payment.getCreatedAt());
        return dto;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public PaymentProviderType getProvider() {
        return provider;
    }

    public void setProvider(PaymentProviderType provider) {
        this.provider = provider;
    }

    public String getProviderRef() {
        return providerRef;
    }

    public void setProviderRef(String providerRef) {
        this.providerRef = providerRef;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public Long getAmountPaise() {
        return amountPaise;
    }

    public void setAmountPaise(Long amountPaise) {
        this.amountPaise = amountPaise;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Integer getAttemptNo() {
        return attemptNo;
    }

    public void setAttemptNo(Integer attemptNo) {
        this.attemptNo = attemptNo;
    }

    public String getFailureReason() {
        return failureReason;
    }

    public void setFailureReason(String failureReason) {
        this.failureReason = failureReason;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
