package com.reverie.payment.controller;

import com.reverie.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Tag(name = "Payment Webhooks", description = "Public webhook receivers for automated asynchronous payment events")
public class PaymentWebhookController {

    private final PaymentService paymentService;

    public PaymentWebhookController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping({"/api/webhooks/payments/{provider}", "/api/webhooks/payments", "/api/v1/payments/webhook", "/api/v1/payments/webhook/{provider}"})
    @Operation(summary = "Receive gateway webhook", description = "Handles asynchronous gateway notifications with HMAC verification and idempotency")
    public ResponseEntity<Map<String, Object>> handleWebhook(
            @PathVariable(required = false) String provider,
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String razorpaySignature,
            @RequestHeader(value = "X-Mock-Signature", required = false) String mockSignature,
            @RequestHeader(value = "X-Webhook-Event-ID", required = false) String eventIdHeader,
            @RequestBody String payload) {

        String providerName = (provider != null && !provider.isBlank()) ? provider : "RAZORPAY";
        String signature = razorpaySignature != null ? razorpaySignature : mockSignature;
        String eventId = eventIdHeader != null ? eventIdHeader : "evt_" + System.currentTimeMillis();

        boolean processed = paymentService.processWebhook(providerName, eventId, "payment.captured", payload, signature);
        if (processed) {
            return ResponseEntity.ok(Map.of("status", "ok", "received", true));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Webhook verification failed"));
        }
    }
}
