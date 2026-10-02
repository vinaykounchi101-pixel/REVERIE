package com.reverie.discovery.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.discovery.dto.WishlistDto;
import com.reverie.discovery.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/wishlist")
@Tag(name = "Wishlist", description = "Customer wishlist management")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get Customer Wishlist", description = "Returns customer wishlist items with current product summaries and stock availability.")
    public ResponseEntity<ApiResponse<WishlistDto>> getWishlist(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        WishlistDto wishlist = wishlistService.getWishlist(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(wishlist));
    }

    @PostMapping("/items")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Add Item to Wishlist", description = "Idempotently adds a watch product to customer wishlist.")
    public ResponseEntity<ApiResponse<WishlistDto>> addItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody Map<String, String> request) {
        UUID productId = UUID.fromString(request.get("productId"));
        UUID variantId = request.containsKey("variantId") && request.get("variantId") != null
                ? UUID.fromString(request.get("variantId"))
                : null;

        WishlistDto updated = wishlistService.addItem(userPrincipal.getId(), productId, variantId);
        return ResponseEntity.ok(ApiResponse.success("Item added to wishlist", updated));
    }

    @DeleteMapping("/items/{productId}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Remove Item from Wishlist", description = "Removes a watch product from customer wishlist.")
    public ResponseEntity<ApiResponse<WishlistDto>> removeItem(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable UUID productId) {
        WishlistDto updated = wishlistService.removeItem(userPrincipal.getId(), productId);
        return ResponseEntity.ok(ApiResponse.success("Item removed from wishlist", updated));
    }
}
