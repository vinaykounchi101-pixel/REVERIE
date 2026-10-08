import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminOrderService } from '../../../services/admin/adminServices';
import { ShoppingBag, Eye, CheckCircle2, Truck, XCircle, ArrowUpRight, RefreshCw, AlertCircle } from 'lucide-react';

export default function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await adminOrderService.getOrders(statusFilter === 'ALL' ? null : statusFilter, 0, 50);
      const list = data?.content || (Array.isArray(data) ? data : []);
      setOrders(list);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setActionLoading(true);
    try {
      await adminOrderService.updateOrderStatus(orderId, newStatus, `Transitioned to ${newStatus} by Executive Admin`);
      setNotice({ type: 'success', message: `Order status advanced to ${newStatus}` });
      await fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to update order status' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you certain you wish to cancel this commission and release vault allocations?')) return;
    setActionLoading(true);
    try {
      await adminOrderService.updateOrderStatus(orderId, 'CANCELLED', 'Executive Admin cancellation');
      setNotice({ type: 'success', message: 'Commission cancelled and inventory returned to vault.' });
      await fetchOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: 'CANCELLED' }));
      }
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to cancel order' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'orderNumber',
      label: 'Commission #',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0F172A' }}>
          #{val || row.id?.substring(0, 8)}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Placed Date',
      sortable: true,
      render: (val) => (
        <span style={{ fontSize: 12, color: '#64748B' }}>
          {val ? new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today'}
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Collector & Destination',
      render: (_, row) => (
        <div>
          <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: 0 }}>
            {row.shippingAddress?.fullName || row.userEmail || 'Distinguished Patron'}
          </p>
          <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0 0' }}>
            {row.shippingAddress?.city || 'Zurich'}, {row.shippingAddress?.country || 'Switzerland'}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Fulfillment Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'totalAmountPaise',
      label: 'Commission Value',
      sortable: true,
      render: (val, row) => {
        const amount = (val || (row.amount ? row.amount * 100 : 0)) / 100;
        return (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#0F172A' }}>
            ${amount.toLocaleString()}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Executive Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => setSelectedOrder(row)}
            style={{
              padding: 6,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Inspect Dossier"
          >
            <Eye style={{ width: 14, height: 14, color: '#D4AF37' }} />
          </button>
          {row.status === 'PENDING' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'CONFIRMED')}
              disabled={actionLoading}
              style={{
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: '#EFF6FF',
                color: '#1D4ED8',
                border: '1px solid #BFDBFE',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Confirm
            </button>
          )}
          {row.status === 'CONFIRMED' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'PROCESSING')}
              disabled={actionLoading}
              style={{
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: '#EEF2FF',
                color: '#4338CA',
                border: '1px solid #C7D2FE',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Atelier Prep
            </button>
          )}
          {row.status === 'PROCESSING' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'SHIPPED')}
              disabled={actionLoading}
              style={{
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: '#ECFEFF',
                color: '#0E7490',
                border: '1px solid #A5F3FC',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Armored Dispatch
            </button>
          )}
          {row.status === 'SHIPPED' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'DELIVERED')}
              disabled={actionLoading}
              style={{
                padding: '4px 10px',
                borderRadius: 8,
                backgroundColor: '#ECFDF5',
                color: '#047857',
                border: '1px solid #A7F3D0',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Confirm Delivery
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {notice && (
        <div
          className={`admin-notice ${
            notice.type === 'success' ? 'admin-notice-success' : 'admin-notice-error'
          }`}
        >
          {notice.type === 'success' ? (
            <CheckCircle2 style={{ width: 16, height: 16 }} />
          ) : (
            <AlertCircle style={{ width: 16, height: 16 }} />
          )}
          <span>{notice.message}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              backgroundColor: statusFilter === tab ? '#0F172A' : '#FFFFFF',
              color: statusFilter === tab ? '#FFFFFF' : '#475569',
              border: `1px solid ${statusFilter === tab ? '#0F172A' : '#E2E8F0'}`,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <DataTable
        columns={columns}
        data={orders}
        loading={loading}
        searchPlaceholder="Filter commissions by order #, patron or location..."
        emptyMessage="No commissions found under this filter."
      />

      {/* Order Detail Modal */}
      <AdminModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        subtitle="HAUTE HORLOGERIE COMMISSION DOSSIER"
        title={selectedOrder ? `Order #${selectedOrder.orderNumber || selectedOrder.id}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  Patron Information
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {selectedOrder.shippingAddress?.fullName || 'Distinguished Collector'}
                </p>
                <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>{selectedOrder.userEmail || '—'}</p>
                <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>{selectedOrder.shippingAddress?.phone || '—'}</p>
              </div>

              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  Delivery Destination
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {selectedOrder.shippingAddress?.addressLine1 || 'Geneva Vault'}
                </p>
                <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
                </p>
                <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0 0' }}>{selectedOrder.shippingAddress?.country || 'Switzerland'}</p>
              </div>
            </div>

            {/* Line items */}
            <div>
              <h4 style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', fontWeight: 600, marginBottom: 10 }}>
                Allocated Timepieces
              </h4>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
                {(selectedOrder.items || []).length === 0 ? (
                  <div style={{ padding: 16, fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>
                    Standard Bespoke Commission
                  </div>
                ) : (
                  selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#FFFFFF',
                        borderBottom: idx < selectedOrder.items.length - 1 ? '1px solid #F1F5F9' : 'none',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 }}>
                          {item.productName || 'REVERIE Timepiece'}
                        </p>
                        <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0 0' }}>
                          SKU: {item.sku || 'REV-001'} &bull; Qty: {item.quantity}
                        </p>
                      </div>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                        ${(((item.unitPricePaise || 0) * item.quantity) / 100).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons in Modal */}
            <div className="admin-modal-footer">
              {selectedOrder.status !== 'CANCELLED' && selectedOrder.status !== 'DELIVERED' ? (
                <button
                  type="button"
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  disabled={actionLoading}
                  className="admin-btn-danger"
                >
                  Cancel Commission
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="admin-btn-primary"
              >
                Close Dossier
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
