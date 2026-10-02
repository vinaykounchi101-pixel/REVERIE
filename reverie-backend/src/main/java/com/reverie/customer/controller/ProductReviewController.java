package com.reverie.customer.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.customer.dto.CreateReviewRequest;
import com.reverie.customer.dto.ProductReviewDto;
import com.reverie.customer.entity.ReviewStatus;
import com.reverie.customer.service.ProductReviewService;
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

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@Tag(name = "Product Reviews", description = "Endpoints for verified product reviews and moderation")
public class ProductReviewController {

    private final ProductReviewService reviewService;

    public ProductReviewController(ProductReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/product/{productId}")
    @Operation(summary = "Get product reviews", description = "Retrieves all approved reviews for a given luxury watch")
    public ResponseEntity<ApiResponse<List<ProductReviewDto>>> getProductReviews(@PathVariable UUID productId) {
        List<ProductReviewDto> reviews = reviewService.getApprovedReviewsForProduct(productId);
        return ResponseEntity.ok(ApiResponse.success(reviews));
    }

    @PostMapping
    @Operation(summary = "Submit review", description = "Submits a review and rating for a luxury product")
    public ResponseEntity<ApiResponse<ProductReviewDto>> submitReview(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateReviewRequest request) {
        ProductReviewDto review = reviewService.submitReview(principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Review submitted for moderation", review));
    }

    @PostMapping("/admin/{reviewId}/moderate")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CATALOG_MGR')")
    @Operation(summary = "Admin: Moderate review", description = "Approves or rejects a customer product review")
    public ResponseEntity<ApiResponse<ProductReviewDto>> moderateReview(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID reviewId,
            @RequestParam ReviewStatus status) {
        ProductReviewDto review = reviewService.moderateReview(reviewId, status, principal.getId());
        return ResponseEntity.ok(ApiResponse.success("Review moderated successfully", review));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN', 'CATALOG_MGR')")
    @Operation(summary = "Admin: List all reviews", description = "Retrieves reviews across all statuses with pagination")
    public ResponseEntity<ApiResponse<Page<ProductReviewDto>>> getAllReviews(
            @RequestParam(required = false) ReviewStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<ProductReviewDto> reviews = reviewService.getAllReviewsAdmin(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(reviews));
    }
}
