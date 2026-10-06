/**
 * REVERIE Luxury Horology — Customer & Address Service
 * Communicates with /api/customers/me and /api/customers/me/addresses
 */

import { apiRequest } from './apiClient';

export const customerService = {
  /**
   * Fetch authenticated user's saved addresses
   */
  async getAddresses() {
    try {
      const response = await apiRequest('/customers/me/addresses');
      if (response?.data && Array.isArray(response.data)) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('reverie_saved_addresses', JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch (err) {
      console.warn('Backend address book fetch failed, using local storage:', err.message);
    }

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('reverie_saved_addresses');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  },

  /**
   * Save a new delivery address
   */
  async addAddress(addressData) {
    let saved = null;
    try {
      const response = await apiRequest('/customers/me/addresses', {
        method: 'POST',
        body: JSON.stringify(addressData),
      });
      saved = response?.data;
    } catch (err) {
      console.warn('Backend address save failed, storing locally:', err.message);
      saved = {
        id: `addr-${Date.now()}`,
        ...addressData,
      };
    }

    if (typeof window !== 'undefined' && saved) {
      const existing = JSON.parse(localStorage.getItem('reverie_saved_addresses') || '[]');
      const updated = [...existing, saved];
      localStorage.setItem('reverie_saved_addresses', JSON.stringify(updated));
    }

    return saved;
  },

  /**
   * Delete an address
   */
  async deleteAddress(addressId) {
    try {
      await apiRequest(`/customers/me/addresses/${addressId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('Backend address delete failed, updating locally:', err.message);
    }

    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('reverie_saved_addresses') || '[]');
      const updated = existing.filter((a) => a.id !== addressId);
      localStorage.setItem('reverie_saved_addresses', JSON.stringify(updated));
    }
  },

  /**
   * Get customer profile
   */
  async getProfile() {
    try {
      const response = await apiRequest('/customers/me');
      return response?.data || null;
    } catch (err) {
      return null;
    }
  },
};
