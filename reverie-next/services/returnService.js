/**
 * REVERIE Luxury Horology — Returns & Vault Inspection Service
 * Communicates with Spring Boot /api/returns endpoints
 */

import { apiRequest } from './apiClient';

export const returnService = {
  /**
   * Submit a return / vault inspection request for an order item
   */
  async requestReturn({ orderId, orderItemId, reason, conditionNotes, bankAccountIban = null }) {
    try {
      const res = await apiRequest('/returns/request', {
        method: 'POST',
        body: JSON.stringify({
          orderId,
          orderItemId,
          reason,
          conditionNotes,
          bankAccountIban,
        }),
      });
      return res.data || res;
    } catch (err) {
      console.warn('Return request error:', err.message);
      return null;
    }
  },

  /**
   * Get authenticated user's return history
   */
  async getMyReturns() {
    try {
      const res = await apiRequest('/returns/my-returns');
      return res.data || [];
    } catch (err) {
      return [];
    }
  },

  /**
   * Get returns for a specific order
   */
  async getReturnsForOrder(orderId) {
    try {
      const res = await apiRequest(`/returns/order/${orderId}`);
      return res.data || [];
    } catch (err) {
      return [];
    }
  },
};
