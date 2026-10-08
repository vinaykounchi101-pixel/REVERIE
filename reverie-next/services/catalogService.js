/**
 * REVERIE Luxury Horology — Catalog Service
 * Communicates with /api/products, /api/catalog, and fallback data
 */

import { apiRequest } from './apiClient';
import { allWatchCatalog } from '../data/allProductsData';

const DEFAULT_COLLECTIONS = [
  { id: 'heritage', name: 'Grande Complication', description: 'Master mechanical movements with astronomical precision' },
  { id: 'sport', name: 'Nautilus & Seafarer', description: 'Engineered grade 5 titanium luxury diving chronometers' },
  { id: 'celestial', name: 'Astronomia & Squelette', description: 'Openworked tourbillons with celestial sky charts' },
];

export const catalogService = {
  /**
   * Fetch all watches with optional category / collection / movement filtering
   */
  async getProducts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
      const response = await apiRequest(endpoint);
      if (response?.data?.content) return response.data.content;
      if (Array.isArray(response?.data)) return response.data;
    } catch (err) {
      // Fallback to local catalog
    }

    // Local filter fallback
    let items = [...allWatchCatalog];
    if (params.collection && params.collection !== 'all') {
      items = items.filter((w) => w.collection?.toLowerCase() === params.collection.toLowerCase());
    }
    if (params.gender && params.gender !== 'all') {
      items = items.filter((w) => w.gender?.toLowerCase() === params.gender.toLowerCase());
    }
    if (params.movement && params.movement !== 'all') {
      items = items.filter((w) => w.movement?.toLowerCase()?.includes(params.movement.toLowerCase()));
    }
    return items;
  },

  /**
   * Fetch single watch details by ID or Slug
   */
  async getProductById(id) {
    try {
      const response = await apiRequest(`/products/${id}`);
      if (response?.data) return response.data;
    } catch (err) {
      // Fallback to local catalog
    }
    return allWatchCatalog.find((w) => w.id === id || w.ref?.toLowerCase() === id?.toLowerCase()) || null;
  },

  /**
   * Fetch all horological collections
   */
  async getCollections() {
    try {
      const response = await apiRequest('/collections');
      if (response?.data && Array.isArray(response.data)) return response.data;
    } catch (err) {
      // Fallback
    }
    return DEFAULT_COLLECTIONS;
  },
};
