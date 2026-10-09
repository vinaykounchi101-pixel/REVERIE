package com.reverie.payment.provider;

import com.reverie.order.entity.Order;
import com.reverie.payment.entity.Payment;
import com.reverie.payment.entity.PaymentProviderType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;
import java.util.UUID;

@Component
public class RazorpayPaymentProvider implements PaymentProvider {

    @Value("${reverie.payment.razorpay.key-id:${RAZORPAY_KEY_ID:rzp_test_placeholder}}")
    private String keyId;

    @Value("${reverie.payment.razorpay.key-secret:${RAZORPAY_KEY_SECRET:rzp_secret_placeholder}}")
    private String keySecret;

    @Value("${reverie.payment.razorpay.webhook-secret:${RAZORPAY_WEBHOOK_SECRET:rzp_webhook_placeholder}}")
    private String webhookSecret;

    @Override
    public PaymentProviderType getProviderType() {
        return PaymentProviderType.RAZORPAY;
    }

    @Override
    public PaymentInitiationResult initiatePayment(Order order, Payment payment) {
        String rzpOrderId = "order_" + UUID.randomUUID().toString().replace("-", "").substring(0, 14);

        Map<String, Object> payload = new HashMap<>();
        payload.put("keyId", keyId);
        payload.put("razorpayOrderId", rzpOrderId);
        payload.put("amountPaise", order.getPayablePaise());
        payload.put("currency", order.getCurrency());
        payload.put("orderNumber", order.getOrderNumber());

        return new PaymentInitiationResult(rzpOrderId, rzpOrderId, payload);
    }

    @Override
    public PaymentVerificationResult verifyPayment(Payment payment, Map<String, String> payload) {
        if (payload == null) {
            return PaymentVerificationResult.failure("Missing payment verification payload");
        }

        String razorpayOrderId = payload.get("razorpay_order_id");
        String razorpayPaymentId = payload.get("razorpay_payment_id");
        String razorpaySignature = payload.get("razorpay_signature");

        if (razorpayOrderId == null || razorpayPaymentId == null || razorpaySignature == null) {
            return PaymentVerificationResult.failure("Invalid verification parameters from Razorpay");
        }

        String data = razorpayOrderId + "|" + razorpayPaymentId;
        boolean valid = computeHmacSha256(data, keySecret, razorpaySignature);

        if (!valid) {
            return PaymentVerificationResult.failure("Cryptographic signature verification failed");
        }

        return PaymentVerificationResult.success(razorpayPaymentId);
    }

    @Override
    public boolean verifyWebhookSignature(String payload, String signatureHeader, String customSecret) {
        if (signatureHeader == null || payload == null) {
            return false;
        }
        String secretToUse = (customSecret != null && !customSecret.isBlank()) ? customSecret : webhookSecret;
        return computeHmacSha256(payload, secretToUse, signatureHeader);
    }

    private boolean computeHmacSha256(String data, String secret, String expectedSignature) {
        try {
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256Hmac.init(secretKey);
            byte[] hash = sha256Hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            String generatedSignature = HexFormat.of().formatHex(hash);
            return MessageDigest.isEqual(
                    generatedSignature.getBytes(StandardCharsets.UTF_8),
                    expectedSignature.toLowerCase().getBytes(StandardCharsets.UTF_8)
            );
        } catch (Exception e) {
            return false;
        }
    }
}
