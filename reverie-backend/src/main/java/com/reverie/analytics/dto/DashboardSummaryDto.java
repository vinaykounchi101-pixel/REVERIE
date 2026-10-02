package com.reverie.analytics.dto;

public class DashboardSummaryDto {

    private SalesOverviewDto sales;
    private InventoryHealthDto inventory;
    private long registeredCustomersCount;
    private long openTicketsCount;

    public DashboardSummaryDto() {}

    public DashboardSummaryDto(SalesOverviewDto sales, InventoryHealthDto inventory, long registeredCustomersCount, long openTicketsCount) {
        this.sales = sales;
        this.inventory = inventory;
        this.registeredCustomersCount = registeredCustomersCount;
        this.openTicketsCount = openTicketsCount;
    }

    public SalesOverviewDto getSales() { return sales; }
    public void setSales(SalesOverviewDto sales) { this.sales = sales; }

    public InventoryHealthDto getInventory() { return inventory; }
    public void setInventory(InventoryHealthDto inventory) { this.inventory = inventory; }

    public long getRegisteredCustomersCount() { return registeredCustomersCount; }
    public void setRegisteredCustomersCount(long registeredCustomersCount) { this.registeredCustomersCount = registeredCustomersCount; }

    public long getOpenTicketsCount() { return openTicketsCount; }
    public void setOpenTicketsCount(long openTicketsCount) { this.openTicketsCount = openTicketsCount; }
}
