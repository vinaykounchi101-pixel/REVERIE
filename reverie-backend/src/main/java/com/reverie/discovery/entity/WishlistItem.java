package com.reverie.discovery.entity;

import com.reverie.catalog.entity.Product;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "wishlist_items", uniqueConstraints = {
        @UniqueConstraint(name = "uq_wishlist_product", columnNames = {"wishlist_id", "product_id"})
})
public class WishlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wishlist_id", nullable = false)
    private Wishlist wishlist;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "variant_id")
    private UUID variantId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public WishlistItem() {}

    public WishlistItem(Wishlist wishlist, Product product, UUID variantId) {
        this.wishlist = wishlist;
        this.product = product;
        this.variantId = variantId;
        this.createdAt = Instant.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Wishlist getWishlist() { return wishlist; }
    public void setWishlist(Wishlist wishlist) { this.wishlist = wishlist; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public UUID getVariantId() { return variantId; }
    public void setVariantId(UUID variantId) { this.variantId = variantId; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
