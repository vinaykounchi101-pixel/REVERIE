package com.reverie.support.dto;

import jakarta.validation.constraints.NotBlank;

public class AddTicketMessageRequest {

    @NotBlank(message = "Message content is required")
    private String message;

    private Boolean isInternalNote = false;

    public AddTicketMessageRequest() {}

    public AddTicketMessageRequest(String message, Boolean isInternalNote) {
        this.message = message;
        this.isInternalNote = isInternalNote != null ? isInternalNote : false;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getIsInternalNote() { return isInternalNote; }
    public void setIsInternalNote(Boolean internalNote) { isInternalNote = internalNote; }
}
