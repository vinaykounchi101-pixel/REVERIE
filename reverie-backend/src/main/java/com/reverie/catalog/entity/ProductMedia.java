package com.reverie.catalog.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "product_media")
public class ProductMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "variant_id")
    private UUID variantId;

    @Column(name = "media_type", nullable = false)
    private String mediaType = "IMAGE";

    @Column(nullable = false)
    private String url;

    @Column(name = "alt_text")
    private String altText;

    @Column(name = "display_order", nullable = false)
    private int displayOrder = 0;

    @Column(name = "is_primary", nullable = false)
    private boolean isPrimary = false;

    public ProductMedia() {}

    public ProductMedia(Product product, UUID variantId, String mediaType, String url, String altText, int displayOrder, boolean isPrimary) {
        this.product = product;
        this.variantId = variantId;
        this.mediaType = mediaType;
        this.url = url;
        this.altText = altText;
        this.displayOrder = displayOrder;
        this.isPrimary = isPrimary;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public UUID getVariantId() { return variantId; }
    public void setVariantId(UUID variantId) { this.variantId = variantId; }

    public String getMediaType() { return mediaType; }
    public void setMediaType(String mediaType) { this.mediaType = mediaType; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getAltText() { return altText; }
    public void setAltText(String altText) { this.altText = altText; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public boolean isPrimary() { return isPrimary; }
    public void setPrimary(boolean primary) { isPrimary = primary; }
}
