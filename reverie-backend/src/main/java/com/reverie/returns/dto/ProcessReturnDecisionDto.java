package com.reverie.returns.dto;

import com.reverie.returns.entity.ReturnStatus;
import jakarta.validation.constraints.NotNull;

public class ProcessReturnDecisionDto {

    @NotNull(message = "Decision status is required (APPROVED or REJECTED)")
    private ReturnStatus status;

    private String decisionNote;
    private String refundDestination = "WALLET"; // "WALLET" or "ORIGINAL_PAYMENT"

    public ProcessReturnDecisionDto() {}

    public ProcessReturnDecisionDto(ReturnStatus status, String decisionNote, String refundDestination) {
        this.status = status;
        this.decisionNote = decisionNote;
        this.refundDestination = refundDestination != null ? refundDestination : "WALLET";
    }

    public ReturnStatus getStatus() { return status; }
    public void setStatus(ReturnStatus status) { this.status = status; }

    public String getDecisionNote() { return decisionNote; }
    public void setDecisionNote(String decisionNote) { this.decisionNote = decisionNote; }

    public String getRefundDestination() { return refundDestination; }
    public void setRefundDestination(String refundDestination) { this.refundDestination = refundDestination; }
}
