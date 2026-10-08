package com.reverie.catalog.controller;

import com.reverie.catalog.dto.AdminProductRequest;
import com.reverie.catalog.dto.ProductDetailDto;
import com.reverie.catalog.service.CatalogService;
import com.reverie.common.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/products")
@Tag(name = "Admin Catalog Management", description = "Endpoints for Haute Horlogerie timepiece creation, edition, and archiving")
public class AdminProductController {

    private final CatalogService catalogService;

    public AdminProductController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @PostMapping
    @Operation(summary = "Admin: Create Timepiece", description = "Creates a new master timepiece with variants, attributes, and stock in database")
    public ResponseEntity<ApiResponse<ProductDetailDto>> createProduct(@Valid @RequestBody AdminProductRequest request) {
        ProductDetailDto created = catalogService.createProduct(request);
        return ResponseEntity.ok(ApiResponse.success("Timepiece created successfully in Haute Horlogerie registry", created));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Admin: Update Timepiece", description = "Updates specifications, pricing, and status of an existing timepiece")
    public ResponseEntity<ApiResponse<ProductDetailDto>> updateProduct(
            @PathVariable UUID id,
            @Valid @RequestBody AdminProductRequest request) {
        ProductDetailDto updated = catalogService.updateProduct(id, request);
        return ResponseEntity.ok(ApiResponse.success("Timepiece updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Admin: Archive Timepiece", description = "Archives a timepiece reference from public display")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable UUID id) {
        catalogService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Timepiece archived successfully", null));
    }
}
