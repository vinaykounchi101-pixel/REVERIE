package com.reverie.returns.service;

import com.reverie.common.error.BusinessException;
import com.reverie.common.error.ErrorCode;
import com.reverie.common.error.ResourceNotFoundException;
import com.reverie.returns.dto.WalletDto;
import com.reverie.returns.dto.WalletTransactionDto;
import com.reverie.returns.entity.Wallet;
import com.reverie.returns.entity.WalletTransaction;
import com.reverie.returns.repository.WalletRepository;
import com.reverie.returns.repository.WalletTransactionRepository;
import com.reverie.user.entity.User;
import com.reverie.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionRepository walletTransactionRepository;
    private final UserRepository userRepository;

    public WalletService(
            WalletRepository walletRepository,
            WalletTransactionRepository walletTransactionRepository,
            UserRepository userRepository) {
        this.walletRepository = walletRepository;
        this.walletTransactionRepository = walletTransactionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Wallet getOrCreateWalletEntity(UUID userId) {
        return walletRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException(ErrorCode.RESOURCE_NOT_FOUND, "User not found"));
                    Wallet wallet = new Wallet(user);
                    return walletRepository.save(wallet);
                });
    }

    @Transactional(readOnly = true)
    public WalletDto getWallet(UUID userId) {
        Wallet wallet = getOrCreateWalletEntity(userId);
        return WalletDto.fromEntity(wallet);
    }

    @Transactional
    public WalletDto creditWallet(UUID userId, long amountPaise, String referenceType, UUID referenceId, String description) {
        if (amountPaise <= 0) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Credit amount must be positive");
        }

        Wallet wallet = getOrCreateWalletEntity(userId);
        wallet.setBalancePaise(wallet.getBalancePaise() + amountPaise);
        wallet = walletRepository.save(wallet);

        WalletTransaction tx = new WalletTransaction(wallet, amountPaise, "CREDIT", referenceType, referenceId, description);
        walletTransactionRepository.save(tx);

        return WalletDto.fromEntity(wallet);
    }

    @Transactional
    public WalletDto debitWallet(UUID userId, long amountPaise, String referenceType, UUID referenceId, String description) {
        if (amountPaise <= 0) {
            throw new BusinessException(ErrorCode.VALIDATION_ERROR, "Debit amount must be positive");
        }

        Wallet wallet = getOrCreateWalletEntity(userId);
        if (wallet.getBalancePaise() < amountPaise) {
            throw new BusinessException(ErrorCode.CONFLICT, "Insufficient wallet balance");
        }

        wallet.setBalancePaise(wallet.getBalancePaise() - amountPaise);
        wallet = walletRepository.save(wallet);

        WalletTransaction tx = new WalletTransaction(wallet, -amountPaise, "DEBIT", referenceType, referenceId, description);
        walletTransactionRepository.save(tx);

        return WalletDto.fromEntity(wallet);
    }

    @Transactional(readOnly = true)
    public Page<WalletTransactionDto> getTransactions(UUID userId, Pageable pageable) {
        Wallet wallet = getOrCreateWalletEntity(userId);
        return walletTransactionRepository.findByWalletIdOrderByCreatedAtDesc(wallet.getId(), pageable)
                .map(WalletTransactionDto::fromEntity);
    }
}
