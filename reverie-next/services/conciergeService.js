/**
 * REVERIE Luxury Horology — Private Concierge Service
 * Communicates with Spring Boot /api/concierge endpoints
 */

import { apiRequest } from './apiClient';

export const conciergeService = {
  /**
   * Book a Private Concierge / Boutique Appointment
   */
  async bookAppointment({ serviceType, preferredDate, preferredTimeSlot, notes, contactEmail, contactPhone, preferredCity }) {
    try {
      const res = await apiRequest('/concierge/book', {
        method: 'POST',
        body: JSON.stringify({
          serviceType: serviceType || 'VIRTUAL_CONSULTATION',
          preferredDate,
          preferredTimeSlot: preferredTimeSlot || '14:00 - 15:00 CET',
          notes: notes || 'Private salon appointment request',
          contactEmail,
          contactPhone,
          preferredCity: preferredCity || 'Geneva',
        }),
      });
      return res.data || res;
    } catch (err) {
      console.warn('Concierge booking error:', err.message);
      return null;
    }
  },

  /**
   * Get user's booked concierge appointments
   */
  async getMyAppointments() {
    try {
      const res = await apiRequest('/concierge/my-appointments');
      return res.data || [];
    } catch (err) {
      return [];
    }
  },
};
