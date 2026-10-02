package com.reverie.cart.dto;

import com.reverie.cart.entity.CartItem;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductVariant;

import java.util.UUID;

public class CartItemDto {

    private UUID id;
    private UUID variantId;
    private UUID productId;
    private String productName;
    private String productSlug;
    private String variantName;
    private String sku;
    private String dialColor;
    private String strapType;
    private String selectedStrap;
    private Long unitPricePaise;
    private Long lineTotalPaise;
    private Integer quantity;
    private Boolean inStock;
    private Integer availableQuantity;
    private String primaryImageUrl;

    public CartItemDto() {}

    public static CartItemDto fromEntity(CartItem item, boolean inStock, int availableQuantity) {
        CartItemDto dto = new CartItemDto();
        dto.setId(item.getId());
        ProductVariant variant = item.getVariant();
        dto.setVariantId(variant.getId());
        dto.setVariantName(variant.getName());
        dto.setSku(variant.getSku());
        dto.setDialColor(variant.getDialColor());
        dto.setStrapType(variant.getStrapType());
        dto.setSelectedStrap(item.getSelectedStrap());

        long price = variant.getSalePricePaise() != null ? variant.getSalePricePaise() : variant.getPricePaise();
        dto.setUnitPricePaise(price);
        dto.setQuantity(item.getQuantity());
        dto.setLineTotalPaise(price * item.getQuantity());

        Product product = variant.getProduct();
        if (product != null) {
            dto.setProductId(product.getId());
            dto.setProductName(product.getName());
            dto.setProductSlug(product.getSlug());
            if (product.getMedia() != null && !product.getMedia().isEmpty()) {
                dto.setPrimaryImageUrl(product.getMedia().get(0).getUrl());
            }
        }

        dto.setInStock(inStock);
        dto.setAvailableQuantity(availableQuantity);
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

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductSlug() {
        return productSlug;
    }

    public void setProductSlug(String productSlug) {
        this.productSlug = productSlug;
    }

    public String getVariantName() {
        return variantName;
    }

    public void setVariantName(String variantName) {
        this.variantName = variantName;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getDialColor() {
        return dialColor;
    }

    public void setDialColor(String dialColor) {
        this.dialColor = dialColor;
    }

    public String getStrapType() {
        return strapType;
    }

    public void setStrapType(String strapType) {
        this.strapType = strapType;
    }

    public String getSelectedStrap() {
        return selectedStrap;
    }

    public void setSelectedStrap(String selectedStrap) {
        this.selectedStrap = selectedStrap;
    }

    public Long getUnitPricePaise() {
        return unitPricePaise;
    }

    public void setUnitPricePaise(Long unitPricePaise) {
        this.unitPricePaise = unitPricePaise;
    }

    public Long getLineTotalPaise() {
        return lineTotalPaise;
    }

    public void setLineTotalPaise(Long lineTotalPaise) {
        this.lineTotalPaise = lineTotalPaise;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }

    public Integer getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(Integer availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public String getPrimaryImageUrl() {
        return primaryImageUrl;
    }

    public void setPrimaryImageUrl(String primaryImageUrl) {
        this.primaryImageUrl = primaryImageUrl;
    }
}
