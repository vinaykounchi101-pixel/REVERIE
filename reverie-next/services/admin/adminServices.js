import { apiRequest } from '../apiClient';

/**
 * REVERIE Executive Admin & Atelier CMS API Services
 * Production-backed integration connecting frontend console to Spring Boot REST endpoints
 */

export const adminDashboardService = {
  getSummary: async () => {
    const res = await apiRequest('/admin/analytics/dashboard');
    return res.data || res;
  },
  getSalesOverview: async () => {
    const res = await apiRequest('/admin/analytics/overview');
    return res.data || res;
  },
  getInventoryHealth: async () => {
    const res = await apiRequest('/admin/analytics/inventory');
    return res.data || res;
  },
};

export const adminProductService = {
  getProducts: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page !== undefined) query.set('page', params.page);
    if (params.size !== undefined) query.set('size', params.size || 50);
    if (params.keyword) query.set('keyword', params.keyword);
    if (params.category) query.set('category', params.category);
    if (params.collection) query.set('collection', params.collection);
    
    const qs = query.toString();
    const res = await apiRequest(`/products${qs ? `?${qs}` : '?size=50'}`);
    return res.data || res;
  },
  getProductBySlug: async (slug) => {
    const res = await apiRequest(`/products/${slug}`);
    return res.data || res;
  },
  getCollections: async () => {
    const res = await apiRequest('/collections');
    return res.data || res;
  },
  getCategories: async () => {
    const res = await apiRequest('/categories');
    return res.data || res;
  },
};

export const adminInventoryService = {
  getVariantInventory: async (variantId) => {
    const res = await apiRequest(`/inventory/${variantId}`);
    return res.data || res;
  },
  adjustStock: async (variantId, quantityChange, reason) => {
    const res = await apiRequest('/admin/inventory/adjust', {
      method: 'POST',
      body: JSON.stringify({ variantId, quantityChange, reason }),
    });
    return res.data || res;
  },
};

export const adminOrderService = {
  getOrders: async (status = null, page = 0, size = 50) => {
    let url = `/orders/admin/all?page=${page}&size=${size}`;
    if (status && status !== 'ALL') {
      url += `&status=${encodeURIComponent(status)}`;
    }
    const res = await apiRequest(url);
    return res.data || res;
  },
  getOrderById: async (id) => {
    const res = await apiRequest(`/orders/${id}`);
    return res.data || res;
  },
  getOrderByNumber: async (orderNumber) => {
    const res = await apiRequest(`/orders/by-number/${encodeURIComponent(orderNumber)}`);
    return res.data || res;
  },
  updateOrderStatus: async (orderId, status, note = '') => {
    let url = `/orders/admin/${orderId}/status?status=${encodeURIComponent(status)}`;
    if (note) {
      url += `&note=${encodeURIComponent(note)}`;
    }
    const res = await apiRequest(url, {
      method: 'PATCH',
    });
    return res.data || res;
  },
};

export const adminPaymentService = {
  refundPayment: async (paymentId, amountPaise, reason) => {
    const res = await apiRequest('/payments/refund', {
      method: 'POST',
      body: JSON.stringify({ paymentId, amountPaise, reason }),
    });
    return res.data || res;
  },
};

export const adminShipmentService = {
  getShipments: async (status = null, page = 0, size = 50) => {
    let url = `/shipments/admin/all?page=${page}&size=${size}`;
    if (status && status !== 'ALL') {
      url += `&status=${encodeURIComponent(status)}`;
    }
    const res = await apiRequest(url);
    return res.data || res;
  },
  getShipmentByOrder: async (orderId) => {
    const res = await apiRequest(`/shipments/order/${orderId}`);
    return res.data || res;
  },
  trackByAwb: async (awb) => {
    const res = await apiRequest(`/shipments/track/${encodeURIComponent(awb)}`);
    return res.data || res;
  },
  createShipment: async (payload) => {
    const res = await apiRequest('/shipments/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data || res;
  },
  updateShipmentStatus: async (shipmentId, payload) => {
    const res = await apiRequest(`/shipments/admin/${shipmentId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
    return res.data || res;
  },
};

export const adminReturnService = {
  getReturns: async (status = null, page = 0, size = 50) => {
    let url = `/returns/admin/all?page=${page}&size=${size}`;
    if (status && status !== 'ALL') {
      url += `&status=${encodeURIComponent(status)}`;
    }
    const res = await apiRequest(url);
    return res.data || res;
  },
  getReturnsForOrder: async (orderId) => {
    const res = await apiRequest(`/returns/order/${orderId}`);
    return res.data || res;
  },
  processDecision: async (returnId, decision) => {
    const res = await apiRequest(`/returns/admin/${returnId}/decision`, {
      method: 'POST',
      body: JSON.stringify(decision),
    });
    return res.data || res;
  },
  approveReturn: async (id, refundToWallet = true, note = 'Inspected and certified in Swiss horology atelier') => {
    return adminReturnService.processDecision(id, {
      status: 'APPROVED',
      decisionNote: note,
      refundDestination: refundToWallet ? 'WALLET' : 'ORIGINAL_SOURCE',
    });
  },
  rejectReturn: async (id, note = 'Timepiece fails micro-inspection standard') => {
    return adminReturnService.processDecision(id, {
      status: 'REJECTED',
      decisionNote: note,
      refundDestination: 'WALLET',
    });
  },
};

export const adminConciergeService = {
  getAppointments: async (status = null, page = 0, size = 50) => {
    let url = `/concierge/admin/all?page=${page}&size=${size}`;
    if (status && status !== 'ALL') {
      url += `&status=${encodeURIComponent(status)}`;
    }
    const res = await apiRequest(url);
    return res.data || res;
  },
  getAppointmentById: async (id) => {
    const res = await apiRequest(`/concierge/${id}`);
    return res.data || res;
  },
  updateStatus: async (id, status, notes = '') => {
    let url = `/concierge/admin/${id}/status?status=${encodeURIComponent(status)}`;
    if (notes) {
      url += `&notes=${encodeURIComponent(notes)}`;
    }
    const res = await apiRequest(url, {
      method: 'POST',
    });
    return res.data || res;
  },
};

export const adminSupportService = {
  getTickets: async (status = null, page = 0, size = 50) => {
    let url = `/support/tickets/admin/all?page=${page}&size=${size}`;
    if (status && status !== 'ALL') {
      url += `&status=${encodeURIComponent(status)}`;
    }
    const res = await apiRequest(url);
    return res.data || res;
  },
  getTicketById: async (id) => {
    const res = await apiRequest(`/support/tickets/${id}`);
    return res.data || res;
  },
  addMessage: async (ticketId, message) => {
    const res = await apiRequest(`/support/tickets/${ticketId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    return res.data || res;
  },
  updateStatus: async (ticketId, payload) => {
    const res = await apiRequest(`/support/tickets/admin/${ticketId}/status`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    return res.data || res;
  },
};

export const adminReviewService = {
  getReviews: async (status = null, page = 0, size = 50) => {
    let url = `/reviews/admin/all?page=${page}&size=${size}`;
    if (status && status !== 'ALL') {
      url += `&status=${encodeURIComponent(status)}`;
    }
    const res = await apiRequest(url);
    return res.data || res;
  },
  getProductReviews: async (productId) => {
    const res = await apiRequest(`/reviews/product/${productId}`);
    return res.data || res;
  },
  moderateReview: async (reviewId, status) => {
    const res = await apiRequest(`/reviews/admin/${reviewId}/moderate?status=${encodeURIComponent(status)}`, {
      method: 'POST',
    });
    return res.data || res;
  },
};

export const adminCmsService = {
  getFaqs: async () => {
    const res = await apiRequest('/faqs/admin');
    return res.data || res;
  },
  createFaq: async (payload) => {
    const res = await apiRequest('/faqs/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data || res;
  },
  deleteFaq: async (id) => {
    const res = await apiRequest(`/faqs/admin/${id}`, {
      method: 'DELETE',
    });
    return res.data || res;
  },
  getStories: async (page = 0, size = 20) => {
    const res = await apiRequest(`/stories/admin?page=${page}&size=${size}`);
    return res.data || res;
  },
  saveStory: async (payload) => {
    const res = await apiRequest('/stories/admin', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return res.data || res;
  },
  deleteStory: async (id) => {
    const res = await apiRequest(`/stories/admin/${id}`, {
      method: 'DELETE',
    });
    return res.data || res;
  },
};

export const adminAuditService = {
  getAuditLogs: async (query = '', page = 0, size = 50) => {
    const qParam = query ? `&query=${encodeURIComponent(query)}` : '';
    const res = await apiRequest(`/admin/audit-logs?page=${page}&size=${size}${qParam}`);
    return res.data || res;
  },
};

export const adminUserService = {
  getUsers: async (query = '', role = 'ALL', page = 0, size = 50) => {
    let url = `/admin/users?page=${page}&size=${size}`;
    if (query) url += `&query=${encodeURIComponent(query)}`;
    if (role && role !== 'ALL') url += `&role=${encodeURIComponent(role)}`;
    const res = await apiRequest(url);
    return res.data || res;
  },
  updateRole: async (userId, role) => {
    const res = await apiRequest(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
    return res.data || res;
  },
  toggleStatus: async (userId, active) => {
    const res = await apiRequest(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    });
    return res.data || res;
  },
};
