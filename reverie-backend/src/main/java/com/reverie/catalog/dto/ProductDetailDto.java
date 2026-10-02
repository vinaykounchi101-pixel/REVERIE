package com.reverie.catalog.dto;

import com.reverie.catalog.entity.Product;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public class ProductDetailDto {

    private UUID id;
    private String name;
    private String slug;
    private String referenceNumber;
    private CategoryDto category;
    private CollectionDto collection;
    private String gender;
    private String shortDescription;
    private String description;
    private Long basePricePaise;
    private Long salePricePaise;
    private String status;
    private boolean isPreorder;
    private Instant expectedShipDate;
    private Integer editionSize;
    private int maxPerCustomer;
    private String model3dUrl;
    private String primaryImageUrl;
    private BigDecimal rating;
    private int reviewsCount;
    private ProductAttributeDto attributes;
    private List<ProductVariantDto> variants;
    private List<ProductMediaDto> media;

    public ProductDetailDto() {}

    public static ProductDetailDto fromEntity(Product product, List<ProductVariantDto> variants, List<ProductMediaDto> media) {
        if (product == null) return null;
        ProductDetailDto dto = new ProductDetailDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSlug(product.getSlug());
        dto.setReferenceNumber(product.getReferenceNumber());
        dto.setCategory(CategoryDto.fromEntity(product.getCategory()));
        dto.setCollection(CollectionDto.fromEntity(product.getCollection()));
        dto.setGender(product.getGender());
        dto.setShortDescription(product.getShortDescription());
        dto.setDescription(product.getDescription());
        dto.setBasePricePaise(product.getBasePricePaise());
        dto.setSalePricePaise(product.getSalePricePaise());
        dto.setStatus(product.getStatus().name());
        dto.setPreorder(product.isPreorder());
        dto.setExpectedShipDate(product.getExpectedShipDate());
        dto.setEditionSize(product.getEditionSize());
        dto.setMaxPerCustomer(product.getMaxPerCustomer());
        dto.setModel3dUrl(product.getModel3dUrl());
        dto.setPrimaryImageUrl(product.getPrimaryImageUrl());
        dto.setRating(product.getRating());
        dto.setReviewsCount(product.getReviewsCount());
        dto.setAttributes(ProductAttributeDto.fromEntity(product.getAttributes()));
        dto.setVariants(variants);
        dto.setMedia(media);
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

    public CategoryDto getCategory() { return category; }
    public void setCategory(CategoryDto category) { this.category = category; }

    public CollectionDto getCollection() { return collection; }
    public void setCollection(CollectionDto collection) { this.collection = collection; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getBasePricePaise() { return basePricePaise; }
    public void setBasePricePaise(Long basePricePaise) { this.basePricePaise = basePricePaise; }

    public Long getSalePricePaise() { return salePricePaise; }
    public void setSalePricePaise(Long salePricePaise) { this.salePricePaise = salePricePaise; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isPreorder() { return isPreorder; }
    public void setPreorder(boolean preorder) { isPreorder = preorder; }

    public Instant getExpectedShipDate() { return expectedShipDate; }
    public void setExpectedShipDate(Instant expectedShipDate) { this.expectedShipDate = expectedShipDate; }

    public Integer getEditionSize() { return editionSize; }
    public void setEditionSize(Integer editionSize) { this.editionSize = editionSize; }

    public int getMaxPerCustomer() { return maxPerCustomer; }
    public void setMaxPerCustomer(int maxPerCustomer) { this.maxPerCustomer = maxPerCustomer; }

    public String getModel3dUrl() { return model3dUrl; }
    public void setModel3dUrl(String model3dUrl) { this.model3dUrl = model3dUrl; }

    public String getPrimaryImageUrl() { return primaryImageUrl; }
    public void setPrimaryImageUrl(String primaryImageUrl) { this.primaryImageUrl = primaryImageUrl; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public int getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(int reviewsCount) { this.reviewsCount = reviewsCount; }

    public ProductAttributeDto getAttributes() { return attributes; }
    public void setAttributes(ProductAttributeDto attributes) { this.attributes = attributes; }

    public List<ProductVariantDto> getVariants() { return variants; }
    public void setVariants(List<ProductVariantDto> variants) { this.variants = variants; }

    public List<ProductMediaDto> getMedia() { return media; }
    public void setMedia(List<ProductMediaDto> media) { this.media = media; }
}
