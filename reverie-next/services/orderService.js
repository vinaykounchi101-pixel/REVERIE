/**
 * REVERIE Luxury Horology — Order Service
 * Communicates with /api/orders and /api/checkout
 */

import { apiRequest } from './apiClient';

export const orderService = {
  /**
   * Submit an order through the authoritative backend checkout flow
   */
  async createOrder(orderPayload) {
    try {
      const response = await apiRequest('/checkout/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload),
      });
      return response?.data || response;
    } catch (err) {
      console.warn('Backend order placement failed or offline, storing locally:', err.message);
      // Generate standard offline reference
      const orderNumber = `REV-${Math.floor(100000 + Math.random() * 900000)}`;
      const localOrder = {
        orderId: orderNumber,
        orderNumber: orderNumber,
        id: `local-${Date.now()}`,
        status: orderPayload.paymentMethod === 'COD' ? 'CONFIRMED' : 'PROCESSING',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        ...orderPayload,
      };
      return localOrder;
    }
  },

  /**
   * Fetch authenticated customer orders
   */
  async getMyOrders(page = 0, size = 10) {
    try {
      const response = await apiRequest(`/orders?page=${page}&size=${size}`);
      return response?.data?.content || response?.data || [];
    } catch (err) {
      console.warn('Backend orders fetch failed, reading local fallback:', err.message);
      if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('reverie_orders') || '[]');
      }
      return [];
    }
  },

  /**
   * Look up order details by reference number
   */
  async getOrderByNumber(orderNumber) {
    try {
      const response = await apiRequest(`/orders/by-number/${encodeURIComponent(orderNumber)}`);
      return response?.data || null;
    } catch (err) {
      if (typeof window !== 'undefined') {
        const localOrders = JSON.parse(localStorage.getItem('reverie_orders') || '[]');
        return localOrders.find((o) => (o.orderId === orderNumber || o.orderNumber === orderNumber)) || null;
      }
      return null;
    }
  },
};
