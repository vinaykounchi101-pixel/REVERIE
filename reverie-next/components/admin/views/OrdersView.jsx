import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminOrderService } from '../../../services/admin/adminServices';
import { ShoppingBag, Eye, CheckCircle2, Truck, XCircle, ArrowUpRight, RefreshCw } from 'lucide-react';

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
        <span className="font-mono font-semibold text-[#0F172A]">
          #{val || row.id?.substring(0, 8)}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Placed Date',
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs text-stone-500">
          {val ? new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today'}
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Collector & Destination',
      render: (_, row) => (
        <div>
          <p className="font-medium text-stone-900 text-xs">
            {row.shippingAddress?.fullName || row.userEmail || 'Distinguished Patron'}
          </p>
          <p className="font-mono text-[11px] text-stone-400">
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
          <span className="font-mono font-semibold text-[#0F172A]">
            ${amount.toLocaleString()}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Executive Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedOrder(row)}
            className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition"
            title="Inspect Dossier"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {row.status === 'PENDING' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'CONFIRMED')}
              disabled={actionLoading}
              className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-[10px] font-mono font-semibold transition"
            >
              Confirm
            </button>
          )}
          {row.status === 'CONFIRMED' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'PROCESSING')}
              disabled={actionLoading}
              className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-[10px] font-mono font-semibold transition"
            >
              Atelier Prep
            </button>
          )}
          {row.status === 'PROCESSING' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'SHIPPED')}
              disabled={actionLoading}
              className="px-2 py-1 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100 text-[10px] font-mono font-semibold transition"
            >
              Armored Dispatch
            </button>
          )}
          {row.status === 'SHIPPED' && (
            <button
              onClick={() => handleStatusUpdate(row.id, 'DELIVERED')}
              disabled={actionLoading}
              className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[10px] font-mono font-semibold transition"
            >
              Confirm Delivery
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {notice && (
        <div className={`p-4 rounded-xl text-xs font-mono border ${
          notice.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {notice.message}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition ${
              statusFilter === tab
                ? 'bg-[#0F172A] text-white font-semibold shadow-sm'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
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
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Haute Horlogerie Commission Dossier
                </span>
                <h3 className="font-serif text-2xl text-[#0F172A] font-medium mt-1">
                  Order #{selectedOrder.orderNumber || selectedOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 font-mono uppercase text-[10px] block">Patron Info</span>
                <p className="font-medium text-stone-900 mt-1">{selectedOrder.shippingAddress?.fullName || 'Collector'}</p>
                <p className="text-stone-500 font-mono">{selectedOrder.userEmail || '—'}</p>
                <p className="text-stone-500 font-mono">{selectedOrder.shippingAddress?.phone || '—'}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 font-mono uppercase text-[10px] block">Delivery Destination</span>
                <p className="font-medium text-stone-900 mt-1">{selectedOrder.shippingAddress?.addressLine1 || 'Geneva Vault'}</p>
                <p className="text-stone-500 font-mono">
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
                </p>
                <p className="text-stone-500 font-mono">{selectedOrder.shippingAddress?.country || 'Switzerland'}</p>
              </div>
            </div>

            {/* Line items */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold mb-3">
                Allocated Timepieces
              </h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                {(selectedOrder.items || []).length === 0 ? (
                  <div className="p-4 text-xs font-mono text-stone-400 text-center">Standard Bespoke Commission</div>
                ) : (
                  selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between bg-white">
                      <div>
                        <p className="font-medium text-stone-900 text-xs">{item.productName || 'REVERIE Timepiece'}</p>
                        <p className="text-[10px] font-mono text-stone-400">SKU: {item.sku || 'REV-001'} &bull; Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#0F172A]">
                        ${((item.unitPricePaise || 0) * item.quantity / 100).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons in Modal */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              {selectedOrder.status !== 'CANCELLED' && selectedOrder.status !== 'DELIVERED' ? (
                <button
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  disabled={actionLoading}
                  className="px-3 py-2 rounded-xl text-xs font-mono text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition"
                >
                  Cancel Commission
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
