package com.reverie.payment.provider;

public class PaymentVerificationResult {

    private final boolean successful;
    private final String providerTransactionId;
    private final String failureMessage;

    public PaymentVerificationResult(boolean successful, String providerTransactionId, String failureMessage) {
        this.successful = successful;
        this.providerTransactionId = providerTransactionId;
        this.failureMessage = failureMessage;
    }

    public static PaymentVerificationResult success(String providerTransactionId) {
        return new PaymentVerificationResult(true, providerTransactionId, null);
    }

    public static PaymentVerificationResult failure(String failureMessage) {
        return new PaymentVerificationResult(false, null, failureMessage);
    }

    public boolean isSuccessful() {
        return successful;
    }

    public String getProviderTransactionId() {
        return providerTransactionId;
    }

    public String getFailureMessage() {
        return failureMessage;
    }
}
