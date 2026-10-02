package com.reverie.discovery.repository;

import com.reverie.discovery.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, UUID> {

    List<WishlistItem> findByWishlistId(UUID wishlistId);

    Optional<WishlistItem> findByWishlistIdAndProductId(UUID wishlistId, UUID productId);

    void deleteByWishlistIdAndProductId(UUID wishlistId, UUID productId);
}
