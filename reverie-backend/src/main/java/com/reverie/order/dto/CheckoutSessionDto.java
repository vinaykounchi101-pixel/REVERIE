package com.reverie.order.dto;

import com.reverie.order.entity.CheckoutSession;

import java.time.Instant;
import java.util.UUID;

public class CheckoutSessionDto {

    private UUID id;
    private UUID userId;
    private String source;
    private String status;
    private String lineSnapshotJson;
    private String addressSnapshotJson;
    private String shippingMethod;
    private String couponCode;
    private Long walletAmountPaise;
    private String totalsSnapshotJson;
    private Instant expiresAt;
    private Instant createdAt;

    public CheckoutSessionDto() {}

    public static CheckoutSessionDto fromEntity(CheckoutSession session) {
        CheckoutSessionDto dto = new CheckoutSessionDto();
        dto.setId(session.getId());
        dto.setUserId(session.getUser() != null ? session.getUser().getId() : null);
        dto.setSource(session.getSource());
        dto.setStatus(session.getStatus());
        dto.setLineSnapshotJson(session.getLineSnapshotJson());
        dto.setAddressSnapshotJson(session.getAddressSnapshotJson());
        dto.setShippingMethod(session.getShippingMethod());
        dto.setCouponCode(session.getCouponCode());
        dto.setWalletAmountPaise(session.getWalletAmountPaise());
        dto.setTotalsSnapshotJson(session.getTotalsSnapshotJson());
        dto.setExpiresAt(session.getExpiresAt());
        dto.setCreatedAt(session.getCreatedAt());
        return dto;
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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLineSnapshotJson() {
        return lineSnapshotJson;
    }

    public void setLineSnapshotJson(String lineSnapshotJson) {
        this.lineSnapshotJson = lineSnapshotJson;
    }

    public String getAddressSnapshotJson() {
        return addressSnapshotJson;
    }

    public void setAddressSnapshotJson(String addressSnapshotJson) {
        this.addressSnapshotJson = addressSnapshotJson;
    }

    public String getShippingMethod() {
        return shippingMethod;
    }

    public void setShippingMethod(String shippingMethod) {
        this.shippingMethod = shippingMethod;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public Long getWalletAmountPaise() {
        return walletAmountPaise;
    }

    public void setWalletAmountPaise(Long walletAmountPaise) {
        this.walletAmountPaise = walletAmountPaise;
    }

    public String getTotalsSnapshotJson() {
        return totalsSnapshotJson;
    }

    public void setTotalsSnapshotJson(String totalsSnapshotJson) {
        this.totalsSnapshotJson = totalsSnapshotJson;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
