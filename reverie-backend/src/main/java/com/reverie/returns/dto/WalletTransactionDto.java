package com.reverie.returns.dto;

import com.reverie.returns.entity.WalletTransaction;

import java.time.Instant;
import java.util.UUID;

public class WalletTransactionDto {

    private UUID id;
    private Long amountPaise;
    private String transactionType;
    private String referenceType;
    private UUID referenceId;
    private String description;
    private Instant createdAt;

    public WalletTransactionDto() {}

    public static WalletTransactionDto fromEntity(WalletTransaction tx) {
        WalletTransactionDto dto = new WalletTransactionDto();
        dto.setId(tx.getId());
        dto.setAmountPaise(tx.getAmountPaise());
        dto.setTransactionType(tx.getTransactionType());
        dto.setReferenceType(tx.getReferenceType());
        dto.setReferenceId(tx.getReferenceId());
        dto.setDescription(tx.getDescription());
        dto.setCreatedAt(tx.getCreatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Long getAmountPaise() { return amountPaise; }
    public void setAmountPaise(Long amountPaise) { this.amountPaise = amountPaise; }

    public String getTransactionType() { return transactionType; }
    public void setTransactionType(String transactionType) { this.transactionType = transactionType; }

    public String getReferenceType() { return referenceType; }
    public void setReferenceType(String referenceType) { this.referenceType = referenceType; }

    public UUID getReferenceId() { return referenceId; }
    public void setReferenceId(UUID referenceId) { this.referenceId = referenceId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
