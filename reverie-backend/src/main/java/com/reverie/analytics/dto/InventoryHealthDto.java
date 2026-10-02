package com.reverie.analytics.dto;

public class InventoryHealthDto {

    private long totalVariants;
    private long inStockUnits;
    private long reservedUnits;
    private long soldUnits;
    private long lowStockCount;
    private long outOfStockCount;

    public InventoryHealthDto() {}

    public InventoryHealthDto(long totalVariants, long inStockUnits, long reservedUnits, long soldUnits, long lowStockCount, long outOfStockCount) {
        this.totalVariants = totalVariants;
        this.inStockUnits = inStockUnits;
        this.reservedUnits = reservedUnits;
        this.soldUnits = soldUnits;
        this.lowStockCount = lowStockCount;
        this.outOfStockCount = outOfStockCount;
    }

    public long getTotalVariants() { return totalVariants; }
    public void setTotalVariants(long totalVariants) { this.totalVariants = totalVariants; }

    public long getInStockUnits() { return inStockUnits; }
    public void setInStockUnits(long inStockUnits) { this.inStockUnits = inStockUnits; }

    public long getReservedUnits() { return reservedUnits; }
    public void setReservedUnits(long reservedUnits) { this.reservedUnits = reservedUnits; }

    public long getSoldUnits() { return soldUnits; }
    public void setSoldUnits(long soldUnits) { this.soldUnits = soldUnits; }

    public long getLowStockCount() { return lowStockCount; }
    public void setLowStockCount(long lowStockCount) { this.lowStockCount = lowStockCount; }

    public long getOutOfStockCount() { return outOfStockCount; }
    public void setOutOfStockCount(long outOfStockCount) { this.outOfStockCount = outOfStockCount; }
}
