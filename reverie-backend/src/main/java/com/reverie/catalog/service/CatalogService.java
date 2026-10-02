package com.reverie.catalog.service;

import com.reverie.catalog.dto.*;
import com.reverie.catalog.entity.Category;
import com.reverie.catalog.entity.Collection;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.entity.ProductStatus;
import com.reverie.catalog.repository.CategoryRepository;
import com.reverie.catalog.repository.CollectionRepository;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.common.dto.PagedResponse;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.inventory.entity.Inventory;
import com.reverie.inventory.repository.InventoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CatalogService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CollectionRepository collectionRepository;
    private final InventoryRepository inventoryRepository;

    public CatalogService(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            CollectionRepository collectionRepository,
            InventoryRepository inventoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.collectionRepository = collectionRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(CategoryDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CollectionDto> getAllCollections() {
        return collectionRepository.findAll().stream()
                .map(CollectionDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDetailDto getProductBySlug(String slug) {
        Product product = productRepository.findBySlugWithDetails(slug)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product with slug '" + slug + "' not found"));

        if (product.getStatus() != ProductStatus.PUBLISHED) {
            throw new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_PUBLISHED, "Product is currently unpublished");
        }

        List<ProductVariantDto> variantDtos = product.getVariants().stream()
                .map(variant -> {
                    int stock = inventoryRepository.findByVariantId(variant.getId())
                            .map(Inventory::getAvailable)
                            .orElse(0);
                    return ProductVariantDto.fromEntity(variant, stock);
                })
                .collect(Collectors.toList());

        List<ProductMediaDto> mediaDtos = product.getMedia().stream()
                .map(ProductMediaDto::fromEntity)
                .collect(Collectors.toList());

        return ProductDetailDto.fromEntity(product, variantDtos, mediaDtos);
    }

    @Transactional(readOnly = true)
    public PagedResponse<ProductSummaryDto> searchProducts(
            String keyword,
            String categorySlug,
            String collectionSlug,
            String gender,
            Long minPricePaise,
            Long maxPricePaise,
            Pageable pageable) {

        Page<Product> page = productRepository.searchProducts(
                keyword != null && !keyword.isBlank() ? keyword.trim() : null,
                categorySlug,
                collectionSlug,
                gender,
                minPricePaise,
                maxPricePaise,
                pageable
        );

        List<ProductSummaryDto> content = page.getContent().stream()
                .map(product -> {
                    boolean inStock = product.getVariants().stream()
                            .anyMatch(v -> inventoryRepository.findByVariantId(v.getId())
                                    .map(i -> i.getAvailable() > 0)
                                    .orElse(false));
                    return ProductSummaryDto.fromEntity(product, inStock);
                })
                .collect(Collectors.toList());

        return new PagedResponse<>(
                content,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast()
        );
    }
}
