package com.reverie.catalog.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(name = "reference_number", nullable = false)
    private String referenceNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    private Collection collection;

    @Column(nullable = false)
    private String gender = "Unisex";

    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "base_price_paise", nullable = false)
    private Long basePricePaise;

    @Column(name = "sale_price_paise")
    private Long salePricePaise;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStatus status = ProductStatus.DRAFT;

    @Column(name = "is_preorder", nullable = false)
    private boolean isPreorder = false;

    @Column(name = "expected_ship_date")
    private Instant expectedShipDate;

    @Column(name = "edition_size")
    private Integer editionSize;

    @Column(name = "max_per_customer", nullable = false)
    private int maxPerCustomer = 1;

    @Column(name = "model_3d_url")
    private String model3dUrl;

    @Column(name = "primary_image_url")
    private String primaryImageUrl;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating = BigDecimal.valueOf(5.0);

    @Column(name = "reviews_count", nullable = false)
    private int reviewsCount = 0;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    private ProductAttribute attributes;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductVariant> variants = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductMedia> media = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public Product() {}

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Collection getCollection() { return collection; }
    public void setCollection(Collection collection) { this.collection = collection; }

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

    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }

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

    public ProductAttribute getAttributes() { return attributes; }
    public void setAttributes(ProductAttribute attributes) {
        this.attributes = attributes;
        if (attributes != null) {
            attributes.setProduct(this);
        }
    }

    public List<ProductVariant> getVariants() { return variants; }
    public void setVariants(List<ProductVariant> variants) { this.variants = variants; }

    public List<ProductMedia> getMedia() { return media; }
    public void setMedia(List<ProductMedia> media) { this.media = media; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
