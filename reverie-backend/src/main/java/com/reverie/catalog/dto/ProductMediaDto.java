package com.reverie.catalog.dto;

import com.reverie.catalog.entity.ProductMedia;
import java.util.UUID;

public class ProductMediaDto {

    private UUID id;
    private UUID variantId;
    private String mediaType;
    private String url;
    private String altText;
    private int displayOrder;
    private boolean isPrimary;

    public ProductMediaDto() {}

    public static ProductMediaDto fromEntity(ProductMedia media) {
        if (media == null) return null;
        ProductMediaDto dto = new ProductMediaDto();
        dto.setId(media.getId());
        dto.setVariantId(media.getVariantId());
        dto.setMediaType(media.getMediaType());
        dto.setUrl(media.getUrl());
        dto.setAltText(media.getAltText());
        dto.setDisplayOrder(media.getDisplayOrder());
        dto.setPrimary(media.isPrimary());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

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
