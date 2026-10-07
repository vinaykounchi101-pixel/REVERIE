/**
 * REVERIE Luxury Horology — Cart Service
 * Communicates with Spring Boot /api/cart endpoints with guest & authenticated sync
 */

import { apiRequest } from './apiClient';

export const cartService = {
  /**
   * Fetch cart for authenticated customer or guest session
   */
  async getCart(sessionId = null) {
    try {
      const headers = sessionId ? { 'X-Session-ID': sessionId } : {};
      const res = await apiRequest('/cart', { headers });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Add variant item to backend cart
   */
  async addItem(variantId, quantity = 1, sessionId = null) {
    try {
      const headers = sessionId ? { 'X-Session-ID': sessionId } : {};
      const res = await apiRequest('/cart/items', {
        method: 'POST',
        headers,
        body: JSON.stringify({ variantId, quantity }),
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Update quantity of variant in backend cart
   */
  async updateItem(variantId, quantity, sessionId = null) {
    try {
      const headers = sessionId ? { 'X-Session-ID': sessionId } : {};
      const res = await apiRequest(`/cart/items/${variantId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ quantity }),
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Remove item from backend cart
   */
  async removeItem(variantId, sessionId = null) {
    try {
      const headers = sessionId ? { 'X-Session-ID': sessionId } : {};
      const res = await apiRequest(`/cart/items/${variantId}`, {
        method: 'DELETE',
        headers,
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Clear backend cart
   */
  async clearCart(sessionId = null) {
    try {
      const headers = sessionId ? { 'X-Session-ID': sessionId } : {};
      const res = await apiRequest('/cart', {
        method: 'DELETE',
        headers,
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Merge guest session cart into authenticated customer account
   */
  async mergeGuestCart(sessionId) {
    if (!sessionId) return null;
    try {
      const res = await apiRequest('/cart/merge', {
        method: 'POST',
        body: JSON.stringify({ sessionId }),
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },
};
