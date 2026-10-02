package com.reverie.payment.controller;

import com.reverie.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhooks/payments")
@Tag(name = "Payment Webhooks", description = "Public webhook receivers for automated asynchronous payment events")
public class PaymentWebhookController {

    private final PaymentService paymentService;

    public PaymentWebhookController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{provider}")
    @Operation(summary = "Receive gateway webhook", description = "Handles asynchronous gateway notifications with HMAC verification and idempotency")
    public ResponseEntity<Map<String, Object>> handleWebhook(
            @PathVariable String provider,
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String razorpaySignature,
            @RequestHeader(value = "X-Mock-Signature", required = false) String mockSignature,
            @RequestHeader(value = "X-Webhook-Event-ID", required = false) String eventIdHeader,
            @RequestBody String payload) {

        String signature = razorpaySignature != null ? razorpaySignature : mockSignature;
        String eventId = eventIdHeader != null ? eventIdHeader : "evt_" + System.currentTimeMillis();

        boolean processed = paymentService.processWebhook(provider, eventId, "payment.captured", payload, signature);
        if (processed) {
            return ResponseEntity.ok(Map.of("status", "ok", "received", true));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "error", "message", "Webhook verification failed"));
        }
    }
}
