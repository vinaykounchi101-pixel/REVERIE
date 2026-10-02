package com.reverie.order.dto;

import jakarta.validation.Valid;

public class CreateCheckoutSessionRequest {

    private String source = "CART";
    private String couponCode;
    private Long walletAmountPaise = 0L;

    @Valid
    private AddressDto shippingAddress;

    public CreateCheckoutSessionRequest() {}

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public Long getWalletAmountPaise() {
        return walletAmountPaise;
    }

    public void setWalletAmountPaise(Long walletAmountPaise) {
        this.walletAmountPaise = walletAmountPaise;
    }

    public AddressDto getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(AddressDto shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
}
