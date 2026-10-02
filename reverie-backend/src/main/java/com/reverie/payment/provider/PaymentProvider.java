package com.reverie.payment.provider;

import com.reverie.order.entity.Order;
import com.reverie.payment.entity.Payment;
import com.reverie.payment.entity.PaymentProviderType;

import java.util.Map;

public interface PaymentProvider {

    PaymentProviderType getProviderType();

    PaymentInitiationResult initiatePayment(Order order, Payment payment);

    PaymentVerificationResult verifyPayment(Payment payment, Map<String, String> payload);

    boolean verifyWebhookSignature(String payload, String signatureHeader, String webhookSecret);
}
