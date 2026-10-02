package com.reverie.inventory.entity;

import com.reverie.catalog.entity.ProductVariant;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "inventories")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false, unique = true)
    private ProductVariant variant;

    @Column(nullable = false)
    private int available = 0;

    @Column(nullable = false)
    private int reserved = 0;

    @Column(nullable = false)
    private int sold = 0;

    @Column(nullable = false)
    private int returned = 0;

    @Column(name = "low_stock_threshold", nullable = false)
    private int lowStockThreshold = 5;

    @Version
    private Long version;

    public Inventory() {}

    public Inventory(ProductVariant variant, int available, int lowStockThreshold) {
        this.variant = variant;
        this.available = available;
        this.reserved = 0;
        this.sold = 0;
        this.returned = 0;
        this.lowStockThreshold = lowStockThreshold;
    }

    public boolean isLowStock() {
        return this.available <= this.lowStockThreshold;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public ProductVariant getVariant() { return variant; }
    public void setVariant(ProductVariant variant) { this.variant = variant; }

    public int getAvailable() { return available; }
    public void setAvailable(int available) { this.available = available; }

    public int getReserved() { return reserved; }
    public void setReserved(int reserved) { this.reserved = reserved; }

    public int getSold() { return sold; }
    public void setSold(int sold) { this.sold = sold; }

    public int getReturned() { return returned; }
    public void setReturned(int returned) { this.returned = returned; }

    public int getLowStockThreshold() { return lowStockThreshold; }
    public void setLowStockThreshold(int lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
