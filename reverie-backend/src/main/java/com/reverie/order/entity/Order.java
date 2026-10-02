package com.reverie.order.entity;

import com.reverie.user.entity.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "order_number", nullable = false, unique = true, length = 60)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private OrderStatus status = OrderStatus.PENDING_PAYMENT;

    @Column(name = "address_snapshot_json", nullable = false, columnDefinition = "TEXT")
    private String addressSnapshotJson;

    @Column(name = "subtotal_paise", nullable = false)
    private Long subtotalPaise;

    @Column(name = "discount_paise", nullable = false)
    private Long discountPaise = 0L;

    @Column(name = "tax_paise", nullable = false)
    private Long taxPaise = 0L;

    @Column(name = "cgst_paise", nullable = false)
    private Long cgstPaise = 0L;

    @Column(name = "sgst_paise", nullable = false)
    private Long sgstPaise = 0L;

    @Column(name = "igst_paise", nullable = false)
    private Long igstPaise = 0L;

    @Column(name = "shipping_paise", nullable = false)
    private Long shippingPaise = 0L;

    @Column(name = "wallet_paise", nullable = false)
    private Long walletPaise = 0L;

    @Column(name = "total_paise", nullable = false)
    private Long totalPaise;

    @Column(name = "payable_paise", nullable = false)
    private Long payablePaise;

    @Column(nullable = false, length = 10)
    private String currency = "INR";

    @Column(name = "high_value_flag", nullable = false)
    private Boolean highValueFlag = false;

    @Column(name = "idempotency_key", unique = true, length = 100)
    private String idempotencyKey;

    @CreationTimestamp
    @Column(name = "placed_at", nullable = false, updatable = false)
    private Instant placedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getAddressSnapshotJson() {
        return addressSnapshotJson;
    }

    public void setAddressSnapshotJson(String addressSnapshotJson) {
        this.addressSnapshotJson = addressSnapshotJson;
    }

    public Long getSubtotalPaise() {
        return subtotalPaise;
    }

    public void setSubtotalPaise(Long subtotalPaise) {
        this.subtotalPaise = subtotalPaise;
    }

    public Long getDiscountPaise() {
        return discountPaise;
    }

    public void setDiscountPaise(Long discountPaise) {
        this.discountPaise = discountPaise;
    }

    public Long getTaxPaise() {
        return taxPaise;
    }

    public void setTaxPaise(Long taxPaise) {
        this.taxPaise = taxPaise;
    }

    public Long getCgstPaise() {
        return cgstPaise;
    }

    public void setCgstPaise(Long cgstPaise) {
        this.cgstPaise = cgstPaise;
    }

    public Long getSgstPaise() {
        return sgstPaise;
    }

    public void setSgstPaise(Long sgstPaise) {
        this.sgstPaise = sgstPaise;
    }

    public Long getIgstPaise() {
        return igstPaise;
    }

    public void setIgstPaise(Long igstPaise) {
        this.igstPaise = igstPaise;
    }

    public Long getShippingPaise() {
        return shippingPaise;
    }

    public void setShippingPaise(Long shippingPaise) {
        this.shippingPaise = shippingPaise;
    }

    public Long getWalletPaise() {
        return walletPaise;
    }

    public void setWalletPaise(Long walletPaise) {
        this.walletPaise = walletPaise;
    }

    public Long getTotalPaise() {
        return totalPaise;
    }

    public void setTotalPaise(Long totalPaise) {
        this.totalPaise = totalPaise;
    }

    public Long getPayablePaise() {
        return payablePaise;
    }

    public void setPayablePaise(Long payablePaise) {
        this.payablePaise = payablePaise;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Boolean getHighValueFlag() {
        return highValueFlag;
    }

    public void setHighValueFlag(Boolean highValueFlag) {
        this.highValueFlag = highValueFlag;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }

    public Instant getPlacedAt() {
        return placedAt;
    }

    public void setPlacedAt(Instant placedAt) {
        this.placedAt = placedAt;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
