/**
 * REVERIE Luxury Horology — Product Reviews Service
 * Communicates with Spring Boot /api/reviews endpoints
 */

import { apiRequest } from './apiClient';

export const reviewService = {
  /**
   * Submit a verified collector review for a timepiece
   */
  async submitReview(productId, { rating, title, comment, orderId = null }) {
    try {
      const res = await apiRequest(`/reviews/product/${productId}`, {
        method: 'POST',
        body: JSON.stringify({
          rating,
          title,
          comment,
          orderId,
        }),
      });
      return res.data || res;
    } catch (err) {
      console.warn('Review submission error:', err.message);
      return null;
    }
  },

  /**
   * Fetch approved reviews for a timepiece
   */
  async getProductReviews(productId) {
    try {
      const res = await apiRequest(`/reviews/product/${productId}`);
      return res.data || [];
    } catch (err) {
      return [];
    }
  },
};
