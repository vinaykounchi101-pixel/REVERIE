package com.reverie.shipment.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.shipment.dto.CreateShipmentRequest;
import com.reverie.shipment.dto.ShipmentDto;
import com.reverie.shipment.dto.UpdateShipmentStatusRequest;
import com.reverie.shipment.entity.ShipmentStatus;
import com.reverie.shipment.service.ShipmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/shipments")
@Tag(name = "Shipments & Logistics", description = "Endpoints for luxury courier dispatch, AWB tracking, and delivery updates")
public class ShipmentController {

    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get shipment tracking for order", description = "Retrieves live AWB and courier status for customer order")
    public ResponseEntity<ApiResponse<ShipmentDto>> getShipmentByOrder(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orderId) {
        ShipmentDto shipment = shipmentService.getShipmentByOrder(orderId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(shipment));
    }

    @GetMapping("/track/{awb}")
    @Operation(summary = "Track shipment by AWB", description = "Public endpoint to track luxury courier by AWB code")
    public ResponseEntity<ApiResponse<ShipmentDto>> trackByAwb(@PathVariable String awb) {
        ShipmentDto shipment = shipmentService.getShipmentByAwb(awb);
        return ResponseEntity.ok(ApiResponse.success(shipment));
    }

    @PostMapping("/admin")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'ORDER_MGR')")
    @Operation(summary = "Admin: Dispatch order and generate shipment", description = "Creates insured courier shipment with AWB and transitions order to SHIPPED")
    public ResponseEntity<ApiResponse<ShipmentDto>> createShipment(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateShipmentRequest request) {
        ShipmentDto shipment = shipmentService.createShipment(request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Shipment created and dispatched", shipment));
    }

    @PatchMapping("/admin/{shipmentId}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'ORDER_MGR')")
    @Operation(summary = "Admin: Update shipment status", description = "Updates live courier status (e.g. IN_TRANSIT -> OUT_FOR_DELIVERY -> DELIVERED)")
    public ResponseEntity<ApiResponse<ShipmentDto>> updateStatus(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID shipmentId,
            @Valid @RequestBody UpdateShipmentStatusRequest request) {
        ShipmentDto shipment = shipmentService.updateShipmentStatus(shipmentId, request, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Shipment status updated", shipment));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'ORDER_MGR')")
    @Operation(summary = "Admin: List all shipments", description = "Retrieves all shipments with optional status filter")
    public ResponseEntity<ApiResponse<Page<ShipmentDto>>> getAllShipments(
            @RequestParam(required = false) ShipmentStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ShipmentDto> shipments = shipmentService.getAllShipmentsAdmin(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(shipments));
    }
}
