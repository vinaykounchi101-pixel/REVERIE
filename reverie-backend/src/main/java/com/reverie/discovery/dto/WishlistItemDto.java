package com.reverie.discovery.dto;

import com.reverie.catalog.dto.ProductSummaryDto;
import com.reverie.discovery.entity.WishlistItem;
import java.time.Instant;
import java.util.UUID;

public class WishlistItemDto {

    private UUID id;
    private UUID productId;
    private UUID variantId;
    private ProductSummaryDto product;
    private Instant addedAt;

    public WishlistItemDto() {}

    public static WishlistItemDto fromEntity(WishlistItem item, ProductSummaryDto productSummary) {
        if (item == null) return null;
        WishlistItemDto dto = new WishlistItemDto();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setVariantId(item.getVariantId());
        dto.setProduct(productSummary);
        dto.setAddedAt(item.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getProductId() { return productId; }
    public void setProductId(UUID productId) { this.productId = productId; }

    public UUID getVariantId() { return variantId; }
    public void setVariantId(UUID variantId) { this.variantId = variantId; }

    public ProductSummaryDto getProduct() { return product; }
    public void setProduct(ProductSummaryDto product) { this.product = product; }

    public Instant getAddedAt() { return addedAt; }
    public void setAddedAt(Instant addedAt) { this.addedAt = addedAt; }
}
