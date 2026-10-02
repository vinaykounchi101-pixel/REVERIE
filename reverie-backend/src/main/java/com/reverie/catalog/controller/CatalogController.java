package com.reverie.catalog.controller;

import com.reverie.catalog.dto.CategoryDto;
import com.reverie.catalog.dto.CollectionDto;
import com.reverie.catalog.dto.ProductDetailDto;
import com.reverie.catalog.dto.ProductSummaryDto;
import com.reverie.catalog.service.CatalogService;
import com.reverie.common.dto.ApiResponse;
import com.reverie.common.dto.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Catalog & Discovery", description = "Public endpoints for watch catalog, categories, collections, and search")
public class CatalogController {

    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/categories")
    @Operation(summary = "Get Categories", description = "Retrieves all watch categories ordered by display order.")
    public ResponseEntity<ApiResponse<List<CategoryDto>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.success(catalogService.getAllCategories()));
    }

    @GetMapping("/collections")
    @Operation(summary = "Get Collections", description = "Retrieves all curated brand collections.")
    public ResponseEntity<ApiResponse<List<CollectionDto>>> getCollections() {
        return ResponseEntity.ok(ApiResponse.success(catalogService.getAllCollections()));
    }

    @GetMapping("/products/{slug}")
    @Operation(summary = "Get Watch Product Details", description = "Retrieves full watch specifications, variants with real-time stock, and 3D media.")
    public ResponseEntity<ApiResponse<ProductDetailDto>> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success(catalogService.getProductBySlug(slug)));
    }

    @GetMapping({"/products", "/search"})
    @Operation(summary = "Search & Filter Catalog", description = "Search and filter published mechanical watches with pagination and sorting.")
    public ResponseEntity<ApiResponse<PagedResponse<ProductSummaryDto>>> searchProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Long minPrice,
            @RequestParam(required = false) Long maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort) {

        // Enforce safe maximum page size (NFR-PERF-001)
        int validatedSize = Math.min(Math.max(size, 1), 50);

        String[] sortParams = sort.split(",");
        String sortField = sortParams[0];
        Sort.Direction direction = sortParams.length > 1 && "asc".equalsIgnoreCase(sortParams[1])
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        // Allow-list safe sorting properties
        String safeSortProperty = switch (sortField) {
            case "price" -> "basePricePaise";
            case "rating" -> "rating";
            case "name" -> "name";
            default -> "createdAt";
        };

        Pageable pageable = PageRequest.of(page, validatedSize, Sort.by(direction, safeSortProperty));
        PagedResponse<ProductSummaryDto> response = catalogService.searchProducts(
                keyword, category, collection, gender, minPrice, maxPrice, pageable
        );

        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
