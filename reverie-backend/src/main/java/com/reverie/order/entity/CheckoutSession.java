package com.reverie.order.entity;

import com.reverie.user.entity.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "checkout_sessions")
public class CheckoutSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 50)
    private String source = "CART";

    @Column(nullable = false, length = 50)
    private String status = "ACTIVE";

    @Column(name = "line_snapshot_json", nullable = false, columnDefinition = "TEXT")
    private String lineSnapshotJson;

    @Column(name = "address_snapshot_json", columnDefinition = "TEXT")
    private String addressSnapshotJson;

    @Column(name = "shipping_method", length = 50)
    private String shippingMethod = "COMPLIMENTARY_EXPRESS";

    @Column(name = "coupon_code", length = 50)
    private String couponCode;

    @Column(name = "wallet_amount_paise", nullable = false)
    private Long walletAmountPaise = 0L;

    @Column(name = "totals_snapshot_json", nullable = false, columnDefinition = "TEXT")
    private String totalsSnapshotJson;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    public CheckoutSession() {}

    public boolean isExpired() {
        return expiresAt != null && Instant.now().isAfter(expiresAt);
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
