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
    public ProductDetailDto getProductBySlug(String slugOrId) {
        Product product = null;
        try {
            UUID uuid = UUID.fromString(slugOrId);
            product = productRepository.findByIdWithDetails(uuid).orElse(null);
        } catch (IllegalArgumentException ignored) {}

        if (product == null) {
            product = productRepository.findBySlugWithDetails(slugOrId)
                    .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product '" + slugOrId + "' not found in Haute Horlogerie registry"));
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

    @Transactional
    public ProductDetailDto createProduct(AdminProductRequest req) {
        Product product = new Product();
        product.setName(req.getName());
        
        String baseSlug = (req.getSlug() != null && !req.getSlug().isBlank())
                ? req.getSlug()
                : req.getName().toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
        if (baseSlug.isBlank()) baseSlug = "timepiece-" + System.currentTimeMillis();
        
        String slug = baseSlug;
        int count = 1;
        while (productRepository.findBySlug(slug).isPresent()) {
            slug = baseSlug + "-" + count++;
        }
        product.setSlug(slug);

        String ref = req.getReferenceNumber();
        if (ref == null || ref.isBlank()) {
            ref = "REV-" + String.format("%04d", (int)(Math.random() * 9000) + 1000);
        }
        product.setReferenceNumber(ref);
        product.setGender(req.getGender() != null ? req.getGender() : "Unisex");
        product.setShortDescription(req.getShortDescription() != null ? req.getShortDescription() : "Haute Horlogerie Masterpiece");
        product.setDescription(req.getDescription() != null ? req.getDescription() : "");
        product.setBasePricePaise(req.getBasePricePaise());
        product.setPrimaryImageUrl(req.getPrimaryImageUrl() != null ? req.getPrimaryImageUrl() : "/images/watches/classic-royale.webp");
        product.setModel3dUrl(req.getModel3dUrl());
        product.setStatus("PUBLISHED".equalsIgnoreCase(req.getStatus()) ? ProductStatus.PUBLISHED : ProductStatus.DRAFT);

        // Find or associate Category / Collection
        if (req.getCategoryName() != null) {
            categoryRepository.findAll().stream()
                    .filter(c -> c.getName().equalsIgnoreCase(req.getCategoryName()))
                    .findFirst()
                    .ifPresent(product::setCategory);
        }
        if (product.getCategory() == null) {
            categoryRepository.findAll().stream().findFirst().ifPresent(product::setCategory);
        }

        if (req.getCollectionName() != null) {
            collectionRepository.findAll().stream()
                    .filter(c -> c.getName().equalsIgnoreCase(req.getCollectionName()))
                    .findFirst()
                    .ifPresent(product::setCollection);
        }
        if (product.getCollection() == null) {
            collectionRepository.findAll().stream().findFirst().ifPresent(product::setCollection);
        }

        // Setup Attributes
        com.reverie.catalog.entity.ProductAttribute attr = new com.reverie.catalog.entity.ProductAttribute();
        attr.setCaseMaterial(req.getCaseMaterial() != null ? req.getCaseMaterial() : "Grade 5 Titanium / Sapphire");
        attr.setMovement(req.getMovement() != null ? req.getMovement() : "Calibre REV-901 Automatic");
        attr.setDialColor(req.getDialColor() != null ? req.getDialColor() : "Midnight Sunburst Dial");
        attr.setWaterResistance(req.getWaterResistance() != null ? req.getWaterResistance() : "100m");
        attr.setPowerReserve(req.getPowerReserve() != null ? req.getPowerReserve() : "72 Hours");
        attr.setCrystal(req.getCrystal() != null ? req.getCrystal() : "Sapphire Crystal with Anti-Reflective Coating");
        attr.setCaseDiameter(req.getCaseDiameter() != null ? req.getCaseDiameter() : "41mm");
        attr.setProduct(product);
        product.setAttributes(attr);

        // Setup Default Variant
        com.reverie.catalog.entity.ProductVariant variant = new com.reverie.catalog.entity.ProductVariant();
        variant.setProduct(product);
        variant.setName(product.getName() + " - Standard");
        variant.setSku(product.getReferenceNumber() + "-01");
        variant.setDialColor(attr.getDialColor());
        variant.setStrapType("Titanium Bracelet");
        variant.setPricePaise(product.getBasePricePaise());
        variant.setStatus("ACTIVE");
        product.getVariants().add(variant);

        Product saved = productRepository.save(product);

        // Setup Inventory
        int stockQty = req.getStock() != null ? req.getStock() : 10;
        Inventory inv = new Inventory(variant, stockQty, 2);
        inventoryRepository.save(inv);

        return getProductBySlug(saved.getSlug());
    }

    @Transactional
    public ProductDetailDto updateProduct(UUID id, AdminProductRequest req) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product with ID " + id + " not found"));

        if (req.getName() != null && !req.getName().isBlank()) {
            product.setName(req.getName());
        }
        if (req.getShortDescription() != null) {
            product.setShortDescription(req.getShortDescription());
        }
        if (req.getDescription() != null) {
            product.setDescription(req.getDescription());
        }
        if (req.getBasePricePaise() != null && req.getBasePricePaise() > 0) {
            product.setBasePricePaise(req.getBasePricePaise());
        }
        if (req.getPrimaryImageUrl() != null && !req.getPrimaryImageUrl().isBlank()) {
            product.setPrimaryImageUrl(req.getPrimaryImageUrl());
        }
        if (req.getStatus() != null) {
            product.setStatus("PUBLISHED".equalsIgnoreCase(req.getStatus()) ? ProductStatus.PUBLISHED : ProductStatus.DRAFT);
        }

        if (product.getAttributes() != null) {
            if (req.getCaseMaterial() != null) product.getAttributes().setCaseMaterial(req.getCaseMaterial());
            if (req.getMovement() != null) product.getAttributes().setMovement(req.getMovement());
            if (req.getDialColor() != null) product.getAttributes().setDialColor(req.getDialColor());
        }

        // Update variant pricing and stock
        if (!product.getVariants().isEmpty()) {
            com.reverie.catalog.entity.ProductVariant firstVar = product.getVariants().get(0);
            firstVar.setPricePaise(product.getBasePricePaise());
            if (req.getStock() != null) {
                inventoryRepository.findByVariantId(firstVar.getId()).ifPresent(inv -> {
                    inv.setAvailable(req.getStock());
                    inventoryRepository.save(inv);
                });
            }
        }

        Product updated = productRepository.save(product);
        return getProductBySlug(updated.getSlug());
    }

    @Transactional
    public void deleteProduct(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product with ID " + id + " not found"));
        product.setStatus(ProductStatus.ARCHIVED);
        productRepository.save(product);
    }
}
