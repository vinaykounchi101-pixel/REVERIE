package com.reverie.returns.controller;

import com.reverie.auth.security.UserPrincipal;
import com.reverie.common.dto.ApiResponse;
import com.reverie.returns.dto.WalletDto;
import com.reverie.returns.dto.WalletTransactionDto;
import com.reverie.returns.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@Tag(name = "Store Credit & Wallet", description = "Endpoints for customer store credit balance and transaction history")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping
    @Operation(summary = "Get wallet balance", description = "Retrieves current available store credit in integer paise")
    public ResponseEntity<ApiResponse<WalletDto>> getWallet(@AuthenticationPrincipal UserPrincipal principal) {
        WalletDto wallet = walletService.getWallet(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(wallet));
    }

    @GetMapping("/transactions")
    @Operation(summary = "Get wallet transactions", description = "Retrieves paginated ledger entries of credits and debits")
    public ResponseEntity<ApiResponse<Page<WalletTransactionDto>>> getTransactions(
            @AuthenticationPrincipal UserPrincipal principal,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<WalletTransactionDto> txs = walletService.getTransactions(principal.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(txs));
    }
}
