package com.reverie.customer.dto;

import jakarta.validation.constraints.*;
import java.util.UUID;

public class CreateReviewRequest {

    @NotNull(message = "Product ID is required")
    private UUID productId;

    private UUID orderId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1 star")
    @Max(value = 5, message = "Rating cannot exceed 5 stars")
    private Integer rating;

    @NotBlank(message = "Review title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @NotBlank(message = "Review comment is required")
    private String comment;

    public CreateReviewRequest() {}

    public CreateReviewRequest(UUID productId, UUID orderId, Integer rating, String title, String comment) {
        this.productId = productId;
        this.orderId = orderId;
        this.rating = rating;
        this.title = title;
        this.comment = comment;
    }

    public UUID getProductId() { return productId; }
    public void setProductId(UUID productId) { this.productId = productId; }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
