package com.reverie.catalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class AdminProductRequest {

    private String name;
    private String title; // alias for name
    private String subtitle;
    private String slug;
    private String referenceNumber;
    private String sku;
    private String collectionName;
    private String categoryName;
    private String gender = "Unisex";
    private String description;
    private String shortDescription;

    private Long basePricePaise;
    private Long price; // in standard currency units

    private String primaryImageUrl;
    private String imageUrl;
    private String model3dUrl;

    private String caseMaterial;
    private String caseDiameter;
    private String movement;
    private String dialColor;
    private String dial;
    private String waterResistance;
    private String powerReserve;
    private String crystal;
    private String complications;

    private Integer stock = 10;
    private String status = "PUBLISHED";

    public AdminProductRequest() {}

    public String getName() { return name != null ? name : title; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title != null ? title : name; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle != null ? subtitle : shortDescription; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getReferenceNumber() { return referenceNumber != null ? referenceNumber : sku; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getSku() { return sku != null ? sku : referenceNumber; }
    public void setSku(String sku) { this.sku = sku; }

    public String getCollectionName() { return collectionName; }
    public void setCollectionName(String collectionName) { this.collectionName = collectionName; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getShortDescription() { return shortDescription != null ? shortDescription : subtitle; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public Long getBasePricePaise() {
        if (basePricePaise != null && basePricePaise > 0) return basePricePaise;
        if (price != null && price > 0) return price * 100;
        return 3500000L;
    }
    public void setBasePricePaise(Long basePricePaise) { this.basePricePaise = basePricePaise; }

    public Long getPrice() { return price; }
    public void setPrice(Long price) { this.price = price; }

    public String getPrimaryImageUrl() { return primaryImageUrl != null ? primaryImageUrl : imageUrl; }
    public void setPrimaryImageUrl(String primaryImageUrl) { this.primaryImageUrl = primaryImageUrl; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getModel3dUrl() { return model3dUrl; }
    public void setModel3dUrl(String model3dUrl) { this.model3dUrl = model3dUrl; }

    public String getCaseMaterial() { return caseMaterial; }
    public void setCaseMaterial(String caseMaterial) { this.caseMaterial = caseMaterial; }

    public String getCaseDiameter() { return caseDiameter; }
    public void setCaseDiameter(String caseDiameter) { this.caseDiameter = caseDiameter; }

    public String getMovement() { return movement; }
    public void setMovement(String movement) { this.movement = movement; }

    public String getDialColor() { return dialColor != null ? dialColor : dial; }
    public void setDialColor(String dialColor) { this.dialColor = dialColor; }

    public String getDial() { return dial; }
    public void setDial(String dial) { this.dial = dial; }

    public String getWaterResistance() { return waterResistance; }
    public void setWaterResistance(String waterResistance) { this.waterResistance = waterResistance; }

    public String getPowerReserve() { return powerReserve; }
    public void setPowerReserve(String powerReserve) { this.powerReserve = powerReserve; }

    public String getCrystal() { return crystal; }
    public void setCrystal(String crystal) { this.crystal = crystal; }

    public String getComplications() { return complications; }
    public void setComplications(String complications) { this.complications = complications; }

    public Integer getStock() { return stock != null ? stock : 10; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
