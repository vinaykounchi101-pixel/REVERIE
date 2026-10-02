package com.reverie.analytics.dto;

public class SalesOverviewDto {

    private long totalGmvPaise;
    private long totalNetRevenuePaise;
    private long totalTaxPaise;
    private long totalOrders;
    private long completedOrders;
    private long cancelledOrders;
    private long averageOrderValuePaise;

    public SalesOverviewDto() {}

    public SalesOverviewDto(long totalGmvPaise, long totalNetRevenuePaise, long totalTaxPaise, long totalOrders, long completedOrders, long cancelledOrders, long averageOrderValuePaise) {
        this.totalGmvPaise = totalGmvPaise;
        this.totalNetRevenuePaise = totalNetRevenuePaise;
        this.totalTaxPaise = totalTaxPaise;
        this.totalOrders = totalOrders;
        this.completedOrders = completedOrders;
        this.cancelledOrders = cancelledOrders;
        this.averageOrderValuePaise = averageOrderValuePaise;
    }

    public long getTotalGmvPaise() { return totalGmvPaise; }
    public void setTotalGmvPaise(long totalGmvPaise) { this.totalGmvPaise = totalGmvPaise; }

    public long getTotalNetRevenuePaise() { return totalNetRevenuePaise; }
    public void setTotalNetRevenuePaise(long totalNetRevenuePaise) { this.totalNetRevenuePaise = totalNetRevenuePaise; }

    public long getTotalTaxPaise() { return totalTaxPaise; }
    public void setTotalTaxPaise(long totalTaxPaise) { this.totalTaxPaise = totalTaxPaise; }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public long getCompletedOrders() { return completedOrders; }
    public void setCompletedOrders(long completedOrders) { this.completedOrders = completedOrders; }

    public long getCancelledOrders() { return cancelledOrders; }
    public void setCancelledOrders(long cancelledOrders) { this.cancelledOrders = cancelledOrders; }

    public long getAverageOrderValuePaise() { return averageOrderValuePaise; }
    public void setAverageOrderValuePaise(long averageOrderValuePaise) { this.averageOrderValuePaise = averageOrderValuePaise; }
}
