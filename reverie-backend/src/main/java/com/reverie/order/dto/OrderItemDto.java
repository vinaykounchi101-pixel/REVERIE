package com.reverie.order.dto;

import com.reverie.order.entity.OrderItem;

import java.util.UUID;

public class OrderItemDto {

    private UUID id;
    private UUID variantId;
    private String sku;
    private String nameSnapshot;
    private String attributesSnapshotJson;
    private Integer quantity;
    private Long unitPricePaise;
    private Long discountPaise;
    private Long taxPaise;
    private Long lineTotalPaise;
    private String hsnCode;
    private String unitId;
    private Integer editionNumber;

    public OrderItemDto() {}

    public static OrderItemDto fromEntity(OrderItem item) {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(item.getId());
        dto.setVariantId(item.getVariant() != null ? item.getVariant().getId() : null);
        dto.setSku(item.getSku());
        dto.setNameSnapshot(item.getNameSnapshot());
        dto.setAttributesSnapshotJson(item.getAttributesSnapshotJson());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPricePaise(item.getUnitPricePaise());
        dto.setDiscountPaise(item.getDiscountPaise());
        dto.setTaxPaise(item.getTaxPaise());
        dto.setLineTotalPaise((item.getUnitPricePaise() * item.getQuantity()) - item.getDiscountPaise() + item.getTaxPaise());
        dto.setHsnCode(item.getHSNCode());
        dto.setUnitId(item.getUnitId());
        dto.setEditionNumber(item.getEditionNumber());
        return dto;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getVariantId() {
        return variantId;
    }

    public void setVariantId(UUID variantId) {
        this.variantId = variantId;
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

    public Long getLineTotalPaise() {
        return lineTotalPaise;
    }

    public void setLineTotalPaise(Long lineTotalPaise) {
        this.lineTotalPaise = lineTotalPaise;
    }

    public String getHsnCode() {
        return hsnCode;
    }

    public void setHsnCode(String hsnCode) {
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
