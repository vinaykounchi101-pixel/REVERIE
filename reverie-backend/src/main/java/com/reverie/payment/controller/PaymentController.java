package com.reverie.payment.controller;

import com.reverie.common.dto.ApiResponse;
import com.reverie.payment.dto.*;
import com.reverie.payment.service.PaymentService;
import com.reverie.auth.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@Tag(name = "Payments & Gateways", description = "Endpoints for initiating and verifying payments across multi-gateway providers")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/initiate")
    @Operation(summary = "Initiate payment", description = "Initiates a payment session with chosen provider (Mock / Razorpay / Stripe)")
    public ResponseEntity<ApiResponse<InitiatePaymentResponse>> initiatePayment(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody InitiatePaymentRequest request) {
        InitiatePaymentResponse response = paymentService.initiatePayment(request.getOrderId(), principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Payment initiated", response));
    }

    @PostMapping("/verify")
    @Operation(summary = "Verify and capture payment", description = "Verifies cryptographic gateway signature and captures order payment")
    public ResponseEntity<ApiResponse<PaymentDto>> verifyPayment(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody PaymentVerificationRequest request) {
        PaymentDto payment = paymentService.verifyAndCapturePayment(request.getPaymentId(), principal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Payment verification result", payment));
    }

    @GetMapping("/{paymentId}")
    @Operation(summary = "Get payment details", description = "Retrieves status and audit information for a payment attempt")
    public ResponseEntity<ApiResponse<PaymentDto>> getPayment(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID paymentId) {
        PaymentDto payment = paymentService.getPaymentById(paymentId, principal.getId());
        return ResponseEntity.ok(ApiResponse.success(payment));
    }
}
