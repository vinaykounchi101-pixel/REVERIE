/**
 * REVERIE Luxury Horology — Wishlist Service
 * Communicates with Spring Boot /api/wishlist endpoints
 */

import { apiRequest } from './apiClient';

export const wishlistService = {
  /**
   * Fetch authenticated customer's wishlist
   */
  async getWishlist() {
    try {
      const res = await apiRequest('/wishlist');
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Add a product/variant to customer's wishlist
   */
  async addItem(productId, variantId = null) {
    try {
      const payload = { productId };
      if (variantId) payload.variantId = variantId;
      const res = await apiRequest('/wishlist/items', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Remove a product from customer's wishlist
   */
  async removeItem(productId) {
    try {
      const res = await apiRequest(`/wishlist/items/${productId}`, {
        method: 'DELETE',
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },
};
