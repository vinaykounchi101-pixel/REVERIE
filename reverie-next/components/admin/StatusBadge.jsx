import React from 'react';

const BADGE_MAP = {
  PENDING: { className: 'admin-badge-pending', label: 'Pending' },
  CONFIRMED: { className: 'admin-badge-confirmed', label: 'Confirmed' },
  PROCESSING: { className: 'admin-badge-confirmed', label: 'Atelier Processing' },
  SHIPPED: { className: 'admin-badge-shipped', label: 'In Transit' },
  DELIVERED: { className: 'admin-badge-delivered', label: 'Delivered' },
  CANCELLED: { className: 'admin-badge-cancelled', label: 'Cancelled' },
  
  COMPLETED: { className: 'admin-badge-completed', label: 'Paid & Settled' },
  FAILED: { className: 'admin-badge-cancelled', label: 'Failed' },
  REFUNDED: { className: 'admin-badge-pending', label: 'Refunded' },
  
  IN_STOCK: { className: 'admin-badge-in_stock', label: 'In Stock' },
  LOW_STOCK: { className: 'admin-badge-pending', label: 'Low Reserve' },
  OUT_OF_STOCK: { className: 'admin-badge-out_of_stock', label: 'Allocated Out' },
  
  REQUESTED: { className: 'admin-badge-pending', label: 'Requested' },
  APPROVED: { className: 'admin-badge-approved', label: 'Approved' },
  REJECTED: { className: 'admin-badge-rejected', label: 'Declined' },
  OPEN: { className: 'admin-badge-confirmed', label: 'Open' },
  RESOLVED: { className: 'admin-badge-delivered', label: 'Resolved' },
  
  PUBLISHED: { className: 'admin-badge-published', label: 'Published' },
  DRAFT: { className: 'admin-badge-pending', label: 'Draft Edition' },
  
  SUPER_ADMIN: { className: 'admin-badge-confirmed', label: 'Super Admin' },
  ADMIN: { className: 'admin-badge-confirmed', label: 'Admin' },
  CLIENT: { className: 'admin-badge-pending', label: 'Collector' },
};

export default function StatusBadge({ status, customLabel }) {
  const normalized = (status || '').toUpperCase().trim();
  const config = BADGE_MAP[normalized] || {
    className: 'admin-badge-pending',
    label: status || 'Unknown'
  };

  return (
    <span className={`admin-badge ${config.className}`}>
      <span className="admin-badge-dot" />
      {customLabel || config.label}
    </span>
  );
}
