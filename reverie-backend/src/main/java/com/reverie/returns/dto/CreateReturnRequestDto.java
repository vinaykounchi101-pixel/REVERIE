package com.reverie.returns.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class CreateReturnRequestDto {

    @NotNull(message = "Order ID is required")
    private UUID orderId;

    @NotBlank(message = "Reason code is required")
    private String reasonCode;

    private String notes;

    public CreateReturnRequestDto() {}

    public CreateReturnRequestDto(UUID orderId, String reasonCode, String notes) {
        this.orderId = orderId;
        this.reasonCode = reasonCode;
        this.notes = notes;
    }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public String getReasonCode() { return reasonCode; }
    public void setReasonCode(String reasonCode) { this.reasonCode = reasonCode; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
