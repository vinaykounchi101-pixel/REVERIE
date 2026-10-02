package com.reverie.catalog.entity;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "product_variants")
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private String name;

    @Column(name = "dial_color")
    private String dialColor;

    @Column(name = "strap_type")
    private String strapType;

    @Column(name = "price_paise", nullable = false)
    private Long pricePaise;

    @Column(name = "sale_price_paise")
    private Long salePricePaise;

    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    public ProductVariant() {}

    public ProductVariant(Product product, String sku, String name, String dialColor, String strapType, Long pricePaise, Long salePricePaise) {
        this.product = product;
        this.sku = sku;
        this.name = name;
        this.dialColor = dialColor;
        this.strapType = strapType;
        this.pricePaise = pricePaise;
        this.salePricePaise = salePricePaise;
        this.status = "ACTIVE";
        this.createdAt = Instant.now();
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

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

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
