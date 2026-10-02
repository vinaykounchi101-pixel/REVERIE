package com.reverie.customer.repository;

import com.reverie.customer.entity.ProductReview;
import com.reverie.customer.entity.ReviewStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, UUID> {

    List<ProductReview> findByProductIdAndStatus(UUID productId, ReviewStatus status);

    Page<ProductReview> findByStatus(ReviewStatus status, Pageable pageable);

    Page<ProductReview> findByUserId(UUID userId, Pageable pageable);
}
