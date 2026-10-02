package com.reverie.catalog.dto;

import com.reverie.catalog.entity.Product;
import java.math.BigDecimal;
import java.util.UUID;

public class ProductSummaryDto {

    private UUID id;
    private String name;
    private String slug;
    private String referenceNumber;
    private String categoryName;
    private String collectionName;
    private String gender;
    private String shortDescription;
    private Long basePricePaise;
    private Long salePricePaise;
    private String primaryImageUrl;
    private String model3dUrl;
    private BigDecimal rating;
    private int reviewsCount;
    private boolean isPreorder;
    private boolean inStock;

    public ProductSummaryDto() {}

    public static ProductSummaryDto fromEntity(Product product, boolean inStock) {
        if (product == null) return null;
        ProductSummaryDto dto = new ProductSummaryDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSlug(product.getSlug());
        dto.setReferenceNumber(product.getReferenceNumber());
        dto.setCategoryName(product.getCategory() != null ? product.getCategory().getName() : null);
        dto.setCollectionName(product.getCollection() != null ? product.getCollection().getName() : null);
        dto.setGender(product.getGender());
        dto.setShortDescription(product.getShortDescription());
        dto.setBasePricePaise(product.getBasePricePaise());
        dto.setSalePricePaise(product.getSalePricePaise());
        dto.setPrimaryImageUrl(product.getPrimaryImageUrl());
        dto.setModel3dUrl(product.getModel3dUrl());
        dto.setRating(product.getRating());
        dto.setReviewsCount(product.getReviewsCount());
        dto.setPreorder(product.isPreorder());
        dto.setInStock(inStock);
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getCollectionName() { return collectionName; }
    public void setCollectionName(String collectionName) { this.collectionName = collectionName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public Long getBasePricePaise() { return basePricePaise; }
    public void setBasePricePaise(Long basePricePaise) { this.basePricePaise = basePricePaise; }

    public Long getSalePricePaise() { return salePricePaise; }
    public void setSalePricePaise(Long salePricePaise) { this.salePricePaise = salePricePaise; }

    public String getPrimaryImageUrl() { return primaryImageUrl; }
    public void setPrimaryImageUrl(String primaryImageUrl) { this.primaryImageUrl = primaryImageUrl; }

    public String getModel3dUrl() { return model3dUrl; }
    public void setModel3dUrl(String model3dUrl) { this.model3dUrl = model3dUrl; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public int getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(int reviewsCount) { this.reviewsCount = reviewsCount; }

    public boolean isPreorder() { return isPreorder; }
    public void setPreorder(boolean preorder) { isPreorder = preorder; }

    public boolean isInStock() { return inStock; }
    public void setInStock(boolean inStock) { this.inStock = inStock; }
}
