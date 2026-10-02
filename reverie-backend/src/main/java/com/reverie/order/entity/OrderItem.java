package com.reverie.order.entity;

import com.reverie.catalog.entity.ProductVariant;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id")
    private ProductVariant variant;

    @Column(nullable = false, length = 100)
    private String sku;

    @Column(name = "name_snapshot", nullable = false, length = 255)
    private String nameSnapshot;

    @Column(name = "attributes_snapshot_json", columnDefinition = "TEXT")
    private String attributesSnapshotJson;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "unit_price_paise", nullable = false)
    private Long unitPricePaise;

    @Column(name = "discount_paise", nullable = false)
    private Long discountPaise = 0L;

    @Column(name = "tax_paise", nullable = false)
    private Long taxPaise = 0L;

    @Column(name = "hsn_code", length = 50)
    private String hsnCode = "9102";

    @Column(name = "unit_id", length = 100)
    private String unitId;

    @Column(name = "edition_number")
    private Integer editionNumber;

    public OrderItem() {}

    public OrderItem(Order order, ProductVariant variant, String sku, String nameSnapshot,
                     String attributesSnapshotJson, Integer quantity, Long unitPricePaise,
                     Long discountPaise, Long taxPaise, String hsnCode) {
        this.order = order;
        this.variant = variant;
        this.sku = sku;
        this.nameSnapshot = nameSnapshot;
        this.attributesSnapshotJson = attributesSnapshotJson;
        this.quantity = quantity;
        this.unitPricePaise = unitPricePaise;
        this.discountPaise = discountPaise != null ? discountPaise : 0L;
        this.taxPaise = taxPaise != null ? taxPaise : 0L;
        this.hsnCode = hsnCode != null ? hsnCode : "9102";
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

    public ProductVariant getVariant() {
        return variant;
    }

    public void setVariant(ProductVariant variant) {
        this.variant = variant;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getNameSnapshot() {
        return nameSnapshot;
    }

    public void setNameSnapshot(String nameSnapshot) {
        this.nameSnapshot = nameSnapshot;
    }

    public String getAttributesSnapshotJson() {
        return attributesSnapshotJson;
    }

    public void setAttributesSnapshotJson(String attributesSnapshotJson) {
        this.attributesSnapshotJson = attributesSnapshotJson;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getUnitPricePaise() {
        return unitPricePaise;
    }

    public void setUnitPricePaise(Long unitPricePaise) {
        this.unitPricePaise = unitPricePaise;
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

    public String getHSNCode() {
        return hsnCode;
    }

    public void setHSNCode(String hsnCode) {
        this.hsnCode = hsnCode;
    }

    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    public Integer getEditionNumber() {
        return editionNumber;
    }

    public void setEditionNumber(Integer editionNumber) {
        this.editionNumber = editionNumber;
    }
}
