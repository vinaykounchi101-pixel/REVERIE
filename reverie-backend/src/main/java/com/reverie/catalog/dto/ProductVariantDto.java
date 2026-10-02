package com.reverie.catalog.dto;

import com.reverie.catalog.entity.ProductVariant;
import java.util.UUID;

public class ProductVariantDto {

    private UUID id;
    private String sku;
    private String name;
    private String dialColor;
    private String strapType;
    private Long pricePaise;
    private Long salePricePaise;
    private String status;
    private int availableStock;

    public ProductVariantDto() {}

    public static ProductVariantDto fromEntity(ProductVariant variant, int availableStock) {
        if (variant == null) return null;
        ProductVariantDto dto = new ProductVariantDto();
        dto.setId(variant.getId());
        dto.setSku(variant.getSku());
        dto.setName(variant.getName());
        dto.setDialColor(variant.getDialColor());
        dto.setStrapType(variant.getStrapType());
        dto.setPricePaise(variant.getPricePaise());
        dto.setSalePricePaise(variant.getSalePricePaise());
        dto.setStatus(variant.getStatus());
        dto.setAvailableStock(availableStock);
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDialColor() { return dialColor; }
    public void setDialColor(String dialColor) { this.dialColor = dialColor; }

    public String getStrapType() { return strapType; }
    public void setStrapType(String strapType) { this.strapType = strapType; }

    public Long getPricePaise() { return pricePaise; }
    public void setPricePaise(Long pricePaise) { this.pricePaise = pricePaise; }

    public Long getSalePricePaise() { return salePricePaise; }
    public void setSalePricePaise(Long salePricePaise) { this.salePricePaise = salePricePaise; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getAvailableStock() { return availableStock; }
    public void setAvailableStock(int availableStock) { this.availableStock = availableStock; }
}
