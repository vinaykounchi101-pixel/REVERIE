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
  async verifyPayment(paymentId, payload) {
    try {
      // Support passing either a payload object or legacy argument list
      let payloadMap = {};
      if (typeof payload === 'object' && payload !== null) {
        payloadMap = payload;
      } else {
        payloadMap = { signature: arguments[1], razorpay_payment_id: arguments[2] };
      }

      const res = await apiRequest('/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          paymentId,
          payload: payloadMap,
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
