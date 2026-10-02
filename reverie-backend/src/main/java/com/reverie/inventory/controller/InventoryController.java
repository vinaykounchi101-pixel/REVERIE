package com.reverie.inventory.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.inventory.dto.InventoryDto;
import com.reverie.inventory.dto.StockAdjustmentRequest;
import com.reverie.inventory.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
@Tag(name = "Inventory", description = "Real-time stock queries and administrative inventory adjustments")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/inventory/{variantId}")
    @Operation(summary = "Get Variant Inventory", description = "Returns available and reserved inventory counts for a watch variant.")
    public ResponseEntity<ApiResponse<InventoryDto>> getInventory(@PathVariable UUID variantId) {
        return ResponseEntity.ok(ApiResponse.success(inventoryService.getInventoryByVariantId(variantId)));
    }

    @PostMapping("/admin/inventory/adjust")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'ADMIN', 'INVENTORY_MGR')")
    @Operation(summary = "Admin Stock Adjustment", description = "Adjusts available inventory with a mandatory reason code and audit trail.")
    public ResponseEntity<ApiResponse<InventoryDto>> adjustStock(
            @Valid @RequestBody StockAdjustmentRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        UUID actorId = userPrincipal != null ? userPrincipal.getId() : null;
        InventoryDto updated = inventoryService.adjustStock(request, actorId);
        return ResponseEntity.ok(ApiResponse.success("Stock adjustment applied successfully", updated));
    }
}
