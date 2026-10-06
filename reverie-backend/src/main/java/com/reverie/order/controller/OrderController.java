package com.reverie.order.controller;

import com.reverie.common.dto.ApiResponse;
import com.reverie.order.dto.OrderDto;
import com.reverie.order.entity.OrderStatus;
import com.reverie.order.service.OrderService;
import com.reverie.auth.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Orders & Lifecycle", description = "Endpoints for order retrieval and order state management")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @Operation(summary = "Get user order history", description = "Retrieves paginated orders for the authenticated customer")
    public ResponseEntity<ApiResponse<Page<OrderDto>>> getMyOrders(
            @AuthenticationPrincipal UserPrincipal principal,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<OrderDto> orders = orderService.getUserOrders(principal.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Get order details by ID", description = "Retrieves order details, items snapshot, and status history")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderById(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID orderId) {
        OrderDto order = orderService.getOrderById(orderId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @GetMapping("/by-number/{orderNumber}")
    @Operation(summary = "Get order details by Order Number", description = "Retrieves order details using reference order number (e.g. REV-...)")
    public ResponseEntity<ApiResponse<OrderDto>> getOrderByNumber(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable String orderNumber) {
        OrderDto order = orderService.getOrderByNumber(orderNumber, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(order));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @Operation(summary = "Admin: Get all orders", description = "Retrieves all customer orders with optional status filter")
    public ResponseEntity<ApiResponse<Page<OrderDto>>> getAllOrdersAdmin(
            @RequestParam(required = false) OrderStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<OrderDto> orders = orderService.getAllOrdersAdmin(pageable, status);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @PatchMapping("/admin/{orderId}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    @Operation(summary = "Admin: Update order status", description = "Transitions order state machine (e.g. PROCESSING -> SHIPPED -> DELIVERED)")
    public ResponseEntity<ApiResponse<OrderDto>> updateOrderStatus(
            @PathVariable UUID orderId,
            @RequestParam OrderStatus status,
            @RequestParam(required = false) String note) {
        OrderDto order = orderService.updateOrderStatus(orderId, status, note);
        return ResponseEntity.ok(ApiResponse.success("Order status updated", order));
    }
}
