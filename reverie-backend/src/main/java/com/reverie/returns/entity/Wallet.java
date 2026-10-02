package com.reverie.returns.entity;

import com.reverie.user.entity.User;
import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "wallets")
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "balance_paise", nullable = false)
    private Long balancePaise = 0L;

    @Column(nullable = false, length = 10)
    private String currency = "INR";

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WalletTransaction> transactions = new ArrayList<>();

    public Wallet() {}

    public Wallet(User user) {
        this.user = user;
        this.balancePaise = 0L;
        this.currency = "INR";
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Long getBalancePaise() { return balancePaise; }
    public void setBalancePaise(Long balancePaise) { this.balancePaise = balancePaise; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public List<WalletTransaction> getTransactions() { return transactions; }
    public void setTransactions(List<WalletTransaction> transactions) { this.transactions = transactions; }
}
