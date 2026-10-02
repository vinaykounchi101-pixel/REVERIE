package com.reverie.discovery.service;

import com.reverie.catalog.dto.ProductSummaryDto;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.discovery.dto.WishlistDto;
import com.reverie.discovery.dto.WishlistItemDto;
import com.reverie.discovery.entity.Wishlist;
import com.reverie.discovery.entity.WishlistItem;
import com.reverie.discovery.repository.WishlistItemRepository;
import com.reverie.discovery.repository.WishlistRepository;
import com.reverie.inventory.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    public WishlistService(
            WishlistRepository wishlistRepository,
            WishlistItemRepository wishlistItemRepository,
            ProductRepository productRepository,
            InventoryRepository inventoryRepository) {
        this.wishlistRepository = wishlistRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @Transactional
    public WishlistDto getWishlist(UUID userId) {
        Wishlist wishlist = getOrCreateWishlist(userId);
        return mapToDto(wishlist);
    }

    @Transactional
    public WishlistDto addItem(UUID userId, UUID productId, UUID variantId) {
        Wishlist wishlist = getOrCreateWishlist(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product not found"));

        if (wishlistItemRepository.findByWishlistIdAndProductId(wishlist.getId(), productId).isEmpty()) {
            WishlistItem item = new WishlistItem(wishlist, product, variantId);
            wishlistItemRepository.save(item);
        }

        // Re-fetch updated wishlist
        return getWishlist(userId);
    }

    @Transactional
    public WishlistDto removeItem(UUID userId, UUID productId) {
        Wishlist wishlist = getOrCreateWishlist(userId);
        wishlistItemRepository.deleteByWishlistIdAndProductId(wishlist.getId(), productId);
        return getWishlist(userId);
    }

    private Wishlist getOrCreateWishlist(UUID userId) {
        return wishlistRepository.findByUserId(userId)
                .orElseGet(() -> wishlistRepository.save(new Wishlist(userId)));
    }

    private WishlistDto mapToDto(Wishlist wishlist) {
        List<WishlistItem> items = wishlistItemRepository.findByWishlistId(wishlist.getId());
        List<WishlistItemDto> itemDtos = items.stream()
                .map(item -> {
                    boolean inStock = item.getProduct().getVariants().stream()
                            .anyMatch(v -> inventoryRepository.findByVariantId(v.getId())
                                    .map(i -> i.getAvailable() > 0)
                                    .orElse(false));
                    ProductSummaryDto summary = ProductSummaryDto.fromEntity(item.getProduct(), inStock);
                    return WishlistItemDto.fromEntity(item, summary);
                })
                .collect(Collectors.toList());

        return new WishlistDto(wishlist.getId(), wishlist.getUserId(), itemDtos);
    }
}
