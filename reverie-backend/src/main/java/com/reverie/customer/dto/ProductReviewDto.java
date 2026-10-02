package com.reverie.customer.dto;

import com.reverie.customer.entity.ProductReview;
import com.reverie.customer.entity.ReviewStatus;

import java.time.Instant;
import java.util.UUID;

public class ProductReviewDto {

    private UUID id;
    private UUID productId;
    private String productName;
    private UUID userId;
    private String reviewerName;
    private Integer rating;
    private String title;
    private String comment;
    private ReviewStatus status;
    private boolean verifiedBuyer;
    private Instant createdAt;

    public ProductReviewDto() {}

    public static ProductReviewDto fromEntity(ProductReview review) {
        ProductReviewDto dto = new ProductReviewDto();
        dto.setId(review.getId());
        dto.setProductId(review.getProduct().getId());
        dto.setProductName(review.getProduct().getName());
        dto.setUserId(review.getUser().getId());
        dto.setReviewerName(review.getUser().getFirstName() + " " + review.getUser().getLastName().substring(0, 1) + ".");
        dto.setRating(review.getRating());
        dto.setTitle(review.getTitle());
        dto.setComment(review.getComment());
        dto.setStatus(review.getStatus());
        dto.setVerifiedBuyer(review.getOrder() != null);
        dto.setCreatedAt(review.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getProductId() { return productId; }
    public void setProductId(UUID productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public ReviewStatus getStatus() { return status; }
    public void setStatus(ReviewStatus status) { this.status = status; }

    public boolean isVerifiedBuyer() { return verifiedBuyer; }
    public void setVerifiedBuyer(boolean verifiedBuyer) { this.verifiedBuyer = verifiedBuyer; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
