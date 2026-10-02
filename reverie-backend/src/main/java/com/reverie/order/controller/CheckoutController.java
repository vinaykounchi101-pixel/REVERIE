package com.reverie.order.controller;

import com.reverie.common.dto.ApiResponse;
import com.reverie.order.dto.CheckoutSessionDto;
import com.reverie.order.dto.CreateCheckoutSessionRequest;
import com.reverie.order.dto.CreateOrderRequest;
import com.reverie.order.dto.OrderDto;
import com.reverie.order.service.CheckoutService;
import com.reverie.auth.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@Tag(name = "Checkout Sessions", description = "Endpoints for initiating checkout, locking inventory, and finalizing order placement")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/session")
    @Operation(summary = "Create checkout session", description = "Initiates 15-minute checkout session and reserves inventory units")
    public ResponseEntity<ApiResponse<CheckoutSessionDto>> createSession(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateCheckoutSessionRequest request) {
        CheckoutSessionDto session = checkoutService.createCheckoutSession(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Checkout session created", session));
    }

    @PostMapping("/orders")
    @Operation(summary = "Create order from checkout session", description = "Finalizes order placement and calculates tax/invoicing breakdowns")
    public ResponseEntity<ApiResponse<OrderDto>> createOrder(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateOrderRequest request) {
        OrderDto order = checkoutService.createOrder(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Order placed successfully", order));
    }
}
