package com.reverie.returns.dto;

import com.reverie.returns.entity.ReturnRequest;
import com.reverie.returns.entity.ReturnStatus;

import java.time.Instant;
import java.util.UUID;

public class ReturnRequestDto {

    private UUID id;
    private UUID orderId;
    private String orderNumber;
    private ReturnStatus status;
    private String reasonCode;
    private String notes;
    private UUID decidedBy;
    private String decisionNote;
    private Instant requestedAt;

    public ReturnRequestDto() {}

    public static ReturnRequestDto fromEntity(ReturnRequest request) {
        ReturnRequestDto dto = new ReturnRequestDto();
        dto.setId(request.getId());
        dto.setOrderId(request.getOrder().getId());
        dto.setOrderNumber(request.getOrder().getOrderNumber());
        dto.setStatus(request.getStatus());
        dto.setReasonCode(request.getReasonCode());
        dto.setNotes(request.getNotes());
        dto.setDecidedBy(request.getDecidedBy());
        dto.setDecisionNote(request.getDecisionNote());
        dto.setRequestedAt(request.getRequestedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getOrderId() { return orderId; }
    public void setOrderId(UUID orderId) { this.orderId = orderId; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public ReturnStatus getStatus() { return status; }
    public void setStatus(ReturnStatus status) { this.status = status; }

    public String getReasonCode() { return reasonCode; }
    public void setReasonCode(String reasonCode) { this.reasonCode = reasonCode; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public UUID getDecidedBy() { return decidedBy; }
    public void setDecidedBy(UUID decidedBy) { this.decidedBy = decidedBy; }

    public String getDecisionNote() { return decisionNote; }
    public void setDecisionNote(String decisionNote) { this.decisionNote = decisionNote; }

    public Instant getRequestedAt() { return requestedAt; }
    public void setRequestedAt(Instant requestedAt) { this.requestedAt = requestedAt; }
}
