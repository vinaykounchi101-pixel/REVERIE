package com.reverie.common.error;

import org.springframework.http.HttpStatus;

/**
 * Authoritative RFC 7807 machine-readable application error codes defined in SRS Section 28.
 */
public enum ErrorCode {

    // Auth & Identity
    AUTH_INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid email or password credentials"),
    AUTH_EMAIL_NOT_VERIFIED(HttpStatus.FORBIDDEN, "Customer email address is not verified"),
    AUTH_TOKEN_INVALID(HttpStatus.UNAUTHORIZED, "Security token is invalid or corrupted"),
    AUTH_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Security token has expired"),
    AUTH_OTP_EXPIRED(HttpStatus.BAD_REQUEST, "One-time password has expired or exceeded maximum attempts"),
    AUTH_RATE_LIMITED(HttpStatus.TOO_MANY_REQUESTS, "Too many authentication requests"),

    // Catalog & Discovery
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product not found"),
    PRODUCT_NOT_PUBLISHED(HttpStatus.NOT_FOUND, "Product is currently unpublished"),
    VARIANT_NOT_FOUND(HttpStatus.NOT_FOUND, "Product variant not found"),
    VARIANT_UNAVAILABLE(HttpStatus.BAD_REQUEST, "Selected watch variant is unavailable"),

    // Inventory
    INV_OUT_OF_STOCK(HttpStatus.CONFLICT, "The requested timepiece quantity is out of stock"),
    INV_RESERVATION_EXPIRED(HttpStatus.GONE, "Checkout stock reservation has expired"),
    INV_CONCURRENCY_CONFLICT(HttpStatus.CONFLICT, "Concurrent stock modification conflict detected"),

    // Cart & Checkout
    CART_ITEM_NOT_FOUND(HttpStatus.NOT_FOUND, "Cart line item not found"),
    CART_STOCK_CHANGED(HttpStatus.CONFLICT, "Stock for an item in cart has changed"),
    CART_PRICE_CHANGED(HttpStatus.CONFLICT, "Price for an item in cart has been updated"),
    CHECKOUT_EXPIRED(HttpStatus.GONE, "Checkout session has expired"),
    CHECKOUT_REVALIDATION_REQUIRED(HttpStatus.CONFLICT, "Checkout revalidation is required"),

    // Pricing & Promotions
    COUPON_INVALID(HttpStatus.BAD_REQUEST, "Invalid promotional coupon code"),
    COUPON_EXPIRED(HttpStatus.BAD_REQUEST, "Promotional coupon has expired"),
    COUPON_USAGE_LIMIT_REACHED(HttpStatus.CONFLICT, "Promotional coupon usage limit reached"),
    COUPON_NOT_APPLICABLE(HttpStatus.BAD_REQUEST, "Coupon is not applicable to current cart lines"),

    // Payments
    PAYMENT_FAILED(HttpStatus.BAD_REQUEST, "Payment transaction failed"),
    PAYMENT_NOT_VERIFIED(HttpStatus.BAD_REQUEST, "Payment could not be verified by provider"),
    PAYMENT_ALREADY_PROCESSED(HttpStatus.CONFLICT, "Payment has already been processed"),
    PAYMENT_WEBHOOK_INVALID(HttpStatus.BAD_REQUEST, "Payment webhook signature verification failed"),
    PAYMENT_WEBHOOK_DUPLICATE(HttpStatus.OK, "Duplicate webhook event already processed"),

    // Orders & Returns
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "Order record not found"),
    ORDER_INVALID_STATE(HttpStatus.CONFLICT, "Invalid order state transition"),
    ORDER_CANNOT_CANCEL(HttpStatus.CONFLICT, "Order cannot be cancelled in its current state"),
    RETURN_WINDOW_EXPIRED(HttpStatus.BAD_REQUEST, "Return eligibility window has expired"),
    RETURN_NOT_ELIGIBLE(HttpStatus.BAD_REQUEST, "Order item is not eligible for return"),
    REFUND_AMOUNT_EXCEEDED(HttpStatus.BAD_REQUEST, "Refund amount exceeds eligible paid balance"),
    REFUND_ALREADY_PROCESSED(HttpStatus.CONFLICT, "Refund has already been processed"),

    // General & Infrastructure
    FORBIDDEN(HttpStatus.FORBIDDEN, "Access to the requested resource is denied"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "Requested resource does not exist"),
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Request validation constraints violated"),
    CONFLICT(HttpStatus.CONFLICT, "Resource state conflict"),
    RATE_LIMITED(HttpStatus.TOO_MANY_REQUESTS, "Request rate limit exceeded"),
    INTERNAL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "An internal server error occurred");

    private final HttpStatus httpStatus;
    private final String defaultMessage;

    ErrorCode(HttpStatus httpStatus, String defaultMessage) {
        this.httpStatus = httpStatus;
        this.defaultMessage = defaultMessage;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
