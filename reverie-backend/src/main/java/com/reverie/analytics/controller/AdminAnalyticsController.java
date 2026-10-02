package com.reverie.analytics.controller;

import com.reverie.analytics.dto.DashboardSummaryDto;
import com.reverie.analytics.dto.InventoryHealthDto;
import com.reverie.analytics.dto.SalesOverviewDto;
import com.reverie.analytics.service.AdminAnalyticsService;
import com.reverie.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/analytics")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'ANALYST')")
@Tag(name = "Executive Admin Analytics", description = "Endpoints for luxury commerce metrics, revenue reports, and inventory health")
public class AdminAnalyticsController {

    private final AdminAnalyticsService analyticsService;

    public AdminAnalyticsController(AdminAnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/overview")
    @Operation(summary = "Get sales overview", description = "Retrieves high-level GMV, net revenue, tax, and order velocity metrics")
    public ResponseEntity<ApiResponse<SalesOverviewDto>> getSalesOverview() {
        SalesOverviewDto overview = analyticsService.getSalesOverview();
        return ResponseEntity.ok(ApiResponse.success(overview));
    }

    @GetMapping("/inventory")
    @Operation(summary = "Get inventory health", description = "Retrieves stock level health, low stock alerts, and out-of-stock count")
    public ResponseEntity<ApiResponse<InventoryHealthDto>> getInventoryHealth() {
        InventoryHealthDto health = analyticsService.getInventoryHealth();
        return ResponseEntity.ok(ApiResponse.success(health));
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get executive dashboard summary", description = "Consolidates sales, inventory, registered clientele, and pending support tickets")
    public ResponseEntity<ApiResponse<DashboardSummaryDto>> getDashboardSummary() {
        DashboardSummaryDto summary = analyticsService.getDashboardSummary();
        return ResponseEntity.ok(ApiResponse.success(summary));
    }
}
