package com.reverie.cart.dto;

import jakarta.validation.constraints.NotBlank;

public class MergeCartRequest {

    @NotBlank(message = "Session ID is required for cart merge")
    private String sessionId;

    public MergeCartRequest() {}

    public MergeCartRequest(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
