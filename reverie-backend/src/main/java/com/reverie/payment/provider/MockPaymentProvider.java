package com.reverie.payment.provider;

import com.reverie.order.entity.Order;
import com.reverie.payment.entity.Payment;
import com.reverie.payment.entity.PaymentProviderType;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class MockPaymentProvider implements PaymentProvider {

    @Override
    public PaymentProviderType getProviderType() {
        return PaymentProviderType.MOCK;
    }

    @Override
    public PaymentInitiationResult initiatePayment(Order order, Payment payment) {
        String mockOrderRef = "MOCK_ORD_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Map<String, Object> payload = new HashMap<>();
        payload.put("provider", PaymentProviderType.MOCK.name());
        payload.put("mockOrderId", mockOrderRef);
        payload.put("orderNumber", order.getOrderNumber());
        payload.put("amountPaise", order.getPayablePaise());
        payload.put("currency", order.getCurrency());
        payload.put("status", "READY_FOR_SIMULATION");

        return new PaymentInitiationResult(mockOrderRef, mockOrderRef, payload);
    }

    @Override
    public PaymentVerificationResult verifyPayment(Payment payment, Map<String, String> payload) {
        String simulateAction = payload != null ? payload.getOrDefault("action", "SUCCESS") : "SUCCESS";

        if ("FAIL".equalsIgnoreCase(simulateAction)) {
            return PaymentVerificationResult.failure("Simulated mock payment failure");
        }

        String transactionId = "MOCK_TXN_" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();
        return PaymentVerificationResult.success(transactionId);
    }

    @Override
    public boolean verifyWebhookSignature(String payload, String signatureHeader, String webhookSecret) {
        // In mock mode, any signature starting with 'mock_sig_' or non-empty signature is valid
        return signatureHeader != null && !signatureHeader.isBlank();
    }
}
