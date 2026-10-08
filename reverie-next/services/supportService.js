/**
 * REVERIE Luxury Horology — Client Support Desk Service
 * Communicates with Spring Boot /api/support/tickets endpoints
 */

import { apiRequest } from './apiClient';

export const supportService = {
  /**
   * Submit a new customer support ticket
   */
  async createTicket({ subject, category = 'ORDER_INQUIRY', priority = 'HIGH', message, relatedOrderId = null }) {
    try {
      const res = await apiRequest('/support/tickets', {
        method: 'POST',
        body: JSON.stringify({
          subject,
          category,
          priority,
          initialMessage: message,
          relatedOrderId,
        }),
      });
      return res.data || res;
    } catch (err) {
      console.warn('Support ticket creation error:', err.message);
      return null;
    }
  },

  /**
   * Fetch authenticated customer's support tickets
   */
  async getMyTickets() {
    try {
      const res = await apiRequest('/support/tickets');
      return res.data || [];
    } catch (err) {
      return [];
    }
  },

  /**
   * Get ticket details by ID
   */
  async getTicketById(ticketId) {
    try {
      const res = await apiRequest(`/support/tickets/${ticketId}`);
      return res.data || null;
    } catch (err) {
      return null;
    }
  },

  /**
   * Add message/response to support ticket
   */
  async addMessage(ticketId, message) {
    try {
      const res = await apiRequest(`/support/tickets/${ticketId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
      return res.data || res;
    } catch (err) {
      return null;
    }
  },

  /**
   * Fetch published FAQs
   */
  async getFaqs() {
    try {
      const res = await apiRequest('/faqs');
      return res.data || [];
    } catch {
      return [];
    }
  },
};
