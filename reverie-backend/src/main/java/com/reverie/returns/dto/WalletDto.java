package com.reverie.returns.dto;

import com.reverie.returns.entity.Wallet;

import java.time.Instant;
import java.util.UUID;

public class WalletDto {

    private UUID id;
    private UUID userId;
    private Long balancePaise;
    private String currency;
    private Instant updatedAt;

    public WalletDto() {}

    public static WalletDto fromEntity(Wallet wallet) {
        WalletDto dto = new WalletDto();
        dto.setId(wallet.getId());
        dto.setUserId(wallet.getUser().getId());
        dto.setBalancePaise(wallet.getBalancePaise());
        dto.setCurrency(wallet.getCurrency());
        dto.setUpdatedAt(wallet.getUpdatedAt());
        return dto;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public Long getBalancePaise() { return balancePaise; }
    public void setBalancePaise(Long balancePaise) { this.balancePaise = balancePaise; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
