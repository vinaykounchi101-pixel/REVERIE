package com.reverie.customer.service;

import com.reverie.audit.service.AuditService;
import com.reverie.catalog.entity.Product;
import com.reverie.catalog.repository.ProductRepository;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.customer.dto.CreateReviewRequest;
import com.reverie.customer.dto.ProductReviewDto;
import com.reverie.customer.entity.ProductReview;
import com.reverie.customer.entity.ReviewStatus;
import com.reverie.customer.repository.ProductReviewRepository;
import com.reverie.order.entity.Order;
import com.reverie.order.repository.OrderRepository;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductReviewService {

    private final ProductReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final AuditService auditService;

    public ProductReviewService(
            ProductReviewRepository reviewRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            OrderRepository orderRepository,
            AuditService auditService) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.auditService = auditService;
    }

    @Transactional(readOnly = true)
    public List<ProductReviewDto> getApprovedReviewsForProduct(UUID productId) {
        return reviewRepository.findByProductIdAndStatus(productId, ReviewStatus.APPROVED).stream()
                .map(ProductReviewDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductReviewDto submitReview(UUID userId, CreateReviewRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.PRODUCT_NOT_FOUND, "Product not found"));

        Order order = null;
        if (request.getOrderId() != null) {
            order = orderRepository.findByIdAndUserId(request.getOrderId(), userId).orElse(null);
        }

        ProductReview review = new ProductReview(
                product,
                user,
                order,
                request.getRating(),
                request.getTitle(),
                request.getComment(),
                ReviewStatus.PENDING
        );
        review = reviewRepository.save(review);

        auditService.logAction("CUSTOMER", userId, "REVIEW_SUBMIT", "PRODUCT", product.getId(), "SUCCESS", "127.0.0.1", "Rating: " + request.getRating());

        return ProductReviewDto.fromEntity(review);
    }

    @Transactional
    public ProductReviewDto moderateReview(UUID reviewId, ReviewStatus status, UUID adminId) {
        ProductReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "Review not found"));

        review.setStatus(status);
        review = reviewRepository.save(review);

        auditService.logAction("ADMIN", adminId, "REVIEW_MODERATE", "REVIEW", review.getId(), "SUCCESS", "127.0.0.1", "New status: " + status);

        return ProductReviewDto.fromEntity(review);
    }

    @Transactional(readOnly = true)
    public Page<ProductReviewDto> getAllReviewsAdmin(ReviewStatus status, Pageable pageable) {
        if (status != null) {
            return reviewRepository.findByStatus(status, pageable).map(ProductReviewDto::fromEntity);
        }
        return reviewRepository.findAll(pageable).map(ProductReviewDto::fromEntity);
    }
}
