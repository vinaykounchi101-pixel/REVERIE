package com.reverie.cart.controller;

import com.reverie.cart.dto.*;
import com.reverie.cart.service.CartService;
import com.reverie.common.dto.ApiResponse;
import com.reverie.auth.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "Shopping Bag & Cart", description = "Endpoints for managing customer and guest shopping bags")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    @Operation(summary = "Get current shopping bag", description = "Retrieves items and pricing summary for authenticated user or guest session")
    public ResponseEntity<ApiResponse<CartDto>> getCart(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId) {
        UUID userId = principal != null ? principal.getId() : null;
        CartDto cart = cartService.getCart(userId, sessionId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @PostMapping("/items")
    @Operation(summary = "Add item to shopping bag", description = "Adds a luxury watch variant to the active cart")
    public ResponseEntity<ApiResponse<CartDto>> addItem(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId,
            @Valid @RequestBody AddToCartRequest request) {
        UUID userId = principal != null ? principal.getId() : null;
        CartDto cart = cartService.addItem(userId, sessionId, request);
        return ResponseEntity.ok(ApiResponse.success("Item added to shopping bag", cart));
    }

    @PatchMapping("/items/{variantId}")
    @Operation(summary = "Update cart line item", description = "Modifies quantity or selected options for a line item")
    public ResponseEntity<ApiResponse<CartDto>> updateItem(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId,
            @PathVariable UUID variantId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        UUID userId = principal != null ? principal.getId() : null;
        CartDto cart = cartService.updateItem(userId, sessionId, variantId, request);
        return ResponseEntity.ok(ApiResponse.success("Shopping bag updated", cart));
    }

    @DeleteMapping("/items/{variantId}")
    @Operation(summary = "Remove item from shopping bag", description = "Removes a specific watch variant from the cart")
    public ResponseEntity<ApiResponse<CartDto>> removeItem(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId,
            @PathVariable UUID variantId) {
        UUID userId = principal != null ? principal.getId() : null;
        CartDto cart = cartService.removeItem(userId, sessionId, variantId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from shopping bag", cart));
    }

    @DeleteMapping
    @Operation(summary = "Clear shopping bag", description = "Empties all items from the current cart")
    public ResponseEntity<ApiResponse<CartDto>> clearCart(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId) {
        UUID userId = principal != null ? principal.getId() : null;
        CartDto cart = cartService.clearCart(userId, sessionId);
        return ResponseEntity.ok(ApiResponse.success("Shopping bag cleared", cart));
    }

    @PostMapping("/merge")
    @Operation(summary = "Merge guest cart", description = "Merges guest session cart items into authenticated user cart upon login")
    public ResponseEntity<ApiResponse<CartDto>> mergeCart(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody MergeCartRequest request) {
        if (principal == null) {
            return ResponseEntity.badRequest().build();
        }
        CartDto cart = cartService.mergeGuestCart(principal.getId(), request.getSessionId());
        return ResponseEntity.ok(ApiResponse.success("Cart merged successfully", cart));
    }
}
