package com.reverie.inventory.dto;

import com.reverie.inventory.entity.Inventory;
import java.util.UUID;

public class InventoryDto {

    private UUID id;
    private UUID variantId;
    private String sku;
    private int available;
    private int reserved;
    private int sold;
    private int returned;
    private int lowStockThreshold;
    private boolean isLowStock;

    public InventoryDto() {}

    public static InventoryDto fromEntity(Inventory inventory) {
        if (inventory == null) return null;
        InventoryDto dto = new InventoryDto();
        dto.setId(inventory.getId());
        dto.setVariantId(inventory.getVariant().getId());
        dto.setSku(inventory.getVariant().getSku());
        dto.setAvailable(inventory.getAvailable());
        dto.setReserved(inventory.getReserved());
        dto.setSold(inventory.getSold());
        dto.setReturned(inventory.getReturned());
        dto.setLowStockThreshold(inventory.getLowStockThreshold());
        dto.setLowStock(inventory.isLowStock());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getVariantId() { return variantId; }
    public void setVariantId(UUID variantId) { this.variantId = variantId; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

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

    public boolean isLowStock() { return isLowStock; }
    public void setLowStock(boolean lowStock) { isLowStock = lowStock; }
}
