/**
 * REVERIE Luxury Horology — Payment Service
 * Communicates with Spring Boot /api/payments endpoints
 */

import { apiRequest } from './apiClient';

export const paymentService = {
  /**
   * Initiate payment with chosen gateway provider (STRIPE / RAZORPAY / MOCK / ESCROW)
   */
  async initiatePayment(orderId, provider = 'MOCK', returnUrl = null) {
    try {
      const res = await apiRequest('/payments/initiate', {
        method: 'POST',
        body: JSON.stringify({
          orderId,
          provider: provider.toUpperCase(),
          returnUrl,
        }),
      });
      return res.data || res;
    } catch (err) {
      console.warn('Payment initiation error:', err.message);
      return null;
    }
  },

  /**
   * Verify cryptographic payment signature or capture
   */
  async verifyPayment(paymentId, signature, razorpayPaymentId = null, stripeIntentId = null) {
    try {
      const res = await apiRequest('/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          paymentId,
          signature,
          razorpayPaymentId,
          stripePaymentIntentId: stripeIntentId,
        }),
      });
      return res.data || res;
    } catch (err) {
      console.warn('Payment verification error:', err.message);
      return null;
    }
  },

  /**
   * Get payment details by ID
   */
  async getPayment(paymentId) {
    try {
      const res = await apiRequest(`/payments/${paymentId}`);
      return res.data || res;
    } catch (err) {
      return null;
    }
  },
};
