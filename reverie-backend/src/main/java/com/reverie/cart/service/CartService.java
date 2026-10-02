package com.reverie.cart.service;

import com.reverie.cart.dto.*;
import com.reverie.cart.entity.Cart;
import com.reverie.cart.entity.CartItem;
import com.reverie.cart.repository.CartItemRepository;
import com.reverie.cart.repository.CartRepository;
import com.reverie.catalog.entity.ProductVariant;
import com.reverie.catalog.repository.ProductVariantRepository;
import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.inventory.repository.InventoryRepository;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository variantRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductVariantRepository variantRepository,
            InventoryRepository inventoryRepository,
            UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.variantRepository = variantRepository;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartDto getCart(UUID userId, String sessionId) {
        Cart cart = getOrCreateCart(userId, sessionId);
        return mapToDto(cart);
    }

    @Transactional
    public CartDto addItem(UUID userId, String sessionId, AddToCartRequest request) {
        Cart cart = getOrCreateCart(userId, sessionId);

        ProductVariant variant = variantRepository.findById(request.getVariantId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product variant not found"));

        if (!"ACTIVE".equalsIgnoreCase(variant.getStatus())) {
            throw new BusinessException(ErrorCode.VARIANT_UNAVAILABLE, "Selected product variant is not available for purchase");
        }

        Optional<CartItem> existingItemOpt = cartItemRepository.findByCartIdAndVariantId(cart.getId(), variant.getId());
        if (existingItemOpt.isPresent()) {
            CartItem item = existingItemOpt.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            if (request.getSelectedStrap() != null) {
                item.setSelectedStrap(request.getSelectedStrap());
            }
            cartItemRepository.save(item);
        } else {
            CartItem newItem = new CartItem(cart, variant, request.getQuantity(), request.getSelectedStrap());
            cartItemRepository.save(newItem);
        }

        return getCart(userId, sessionId);
    }

    @Transactional
    public CartDto updateItem(UUID userId, String sessionId, UUID variantId, UpdateCartItemRequest request) {
        Cart cart = getOrCreateCart(userId, sessionId);

        CartItem item = cartItemRepository.findByCartIdAndVariantId(cart.getId(), variantId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Item not found in shopping bag"));

        if (request.getQuantity() <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(request.getQuantity());
            if (request.getSelectedStrap() != null) {
                item.setSelectedStrap(request.getSelectedStrap());
            }
            cartItemRepository.save(item);
        }

        return getCart(userId, sessionId);
    }

    @Transactional
    public CartDto removeItem(UUID userId, String sessionId, UUID variantId) {
        Cart cart = getOrCreateCart(userId, sessionId);
        cartItemRepository.deleteByCartIdAndVariantId(cart.getId(), variantId);
        return getCart(userId, sessionId);
    }

    @Transactional
    public CartDto clearCart(UUID userId, String sessionId) {
        Cart cart = getOrCreateCart(userId, sessionId);
        cartItemRepository.deleteByCartId(cart.getId());
        return getCart(userId, sessionId);
    }

    @Transactional
    public CartDto mergeGuestCart(UUID userId, String guestSessionId) {
        if (guestSessionId == null || guestSessionId.isBlank()) {
            return getCart(userId, null);
        }

        Optional<Cart> guestCartOpt = cartRepository.findBySessionId(guestSessionId);
        if (guestCartOpt.isEmpty()) {
            return getCart(userId, null);
        }

        Cart guestCart = guestCartOpt.get();
        Cart userCart = getOrCreateCart(userId, null);

        List<CartItem> guestItems = cartItemRepository.findByCartId(guestCart.getId());
        for (CartItem guestItem : guestItems) {
            Optional<CartItem> userItemOpt = cartItemRepository.findByCartIdAndVariantId(userCart.getId(), guestItem.getVariant().getId());
            if (userItemOpt.isPresent()) {
                CartItem userItem = userItemOpt.get();
                userItem.setQuantity(userItem.getQuantity() + guestItem.getQuantity());
                cartItemRepository.save(userItem);
            } else {
                CartItem newItem = new CartItem(userCart, guestItem.getVariant(), guestItem.getQuantity(), guestItem.getSelectedStrap());
                cartItemRepository.save(newItem);
            }
        }

        cartItemRepository.deleteByCartId(guestCart.getId());
        cartRepository.delete(guestCart);

        return getCart(userId, null);
    }

    public Cart getOrCreateCart(UUID userId, String sessionId) {
        if (userId != null) {
                return cartRepository.findByUserId(userId)
                        .orElseGet(() -> {
                            User user = userRepository.findById(userId)
                                    .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));
                            Cart newCart = new Cart(user, null);
                            return cartRepository.save(newCart);
                        });
        }

        if (sessionId != null && !sessionId.isBlank()) {
            return cartRepository.findBySessionId(sessionId)
                    .orElseGet(() -> {
                        Cart newCart = new Cart(null, sessionId);
                        return cartRepository.save(newCart);
                    });
        }

        // Generate fallback anonymous session
        String generatedSessionId = UUID.randomUUID().toString();
        Cart newCart = new Cart(null, generatedSessionId);
        return cartRepository.save(newCart);
    }

    public CartDto mapToDto(Cart cart) {
        List<CartItem> items = cartItemRepository.findByCartId(cart.getId());
        List<CartItemDto> itemDtos = items.stream()
                .map(item -> {
                    var inventoryOpt = inventoryRepository.findByVariantId(item.getVariant().getId());
                    int available = inventoryOpt.map(inv -> inv.getAvailable()).orElse(0);
                    boolean inStock = available >= item.getQuantity();
                    return CartItemDto.fromEntity(item, inStock, available);
                })
                .collect(Collectors.toList());

        UUID userId = cart.getUser() != null ? cart.getUser().getId() : null;
        return new CartDto(cart.getId(), userId, cart.getSessionId(), itemDtos);
    }
}
