import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminPaymentService, adminOrderService } from '../../../services/admin/adminServices';
import { CreditCard, DollarSign, RotateCcw, ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export default function PaymentsView() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refundModal, setRefundModal] = useState(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('Client requested cancellation prior to atelier assembly');
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      // Derive transactions from orders & payments
      const orders = await adminOrderService.getOrders();
      if (Array.isArray(orders)) {
        const txs = orders.map((o) => ({
          id: `TXN-${o.id?.substring(0, 8)}`,
          paymentId: o.paymentId || o.id,
          orderId: o.id,
          orderNumber: o.orderNumber,
          patron: o.shippingAddress?.fullName || o.userEmail || 'Distinguished Collector',
          amountPaise: o.totalAmountPaise || (o.amount ? o.amount * 100 : 4500000),
          method: o.paymentMethod || 'Escrow Wire / Stripe Luxury',
          status: o.paymentStatus || (o.status === 'CANCELLED' ? 'REFUNDED' : 'COMPLETED'),
          date: o.createdAt || new Date().toISOString(),
        }));
        setPayments(txs);
      }
    } catch (err) {
      console.error('Failed to load transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleRefund = async (e) => {
    e.preventDefault();
    if (!refundModal) return;
    setActionLoading(true);
    try {
      const paise = Math.round(Number(refundAmount) * 100);
      await adminPaymentService.refundPayment(refundModal.paymentId, paise, refundReason);
      setNotice({ type: 'success', message: `Successfully issued refund of $${Number(refundAmount).toLocaleString()}` });
      setRefundModal(null);
      await fetchPayments();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Refund authorization failed' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'id',
      label: 'Transaction ID',
      sortable: true,
      render: (val) => <span className="font-mono text-xs font-semibold text-[#0F172A]">{val}</span>,
    },
    {
      key: 'orderNumber',
      label: 'Commission #',
      render: (val, row) => (
        <span className="font-mono text-xs text-stone-600">
          #{val || row.orderId?.substring(0, 8)}
        </span>
      ),
    },
    {
      key: 'patron',
      label: 'Patron Account',
      sortable: true,
      render: (val) => <span className="text-xs font-medium text-stone-900">{val}</span>,
    },
    {
      key: 'method',
      label: 'Settlement Rail',
      render: (val) => <span className="font-mono text-[11px] text-stone-500">{val}</span>,
    },
    {
      key: 'amountPaise',
      label: 'Settled Amount',
      sortable: true,
      render: (val) => {
        const amt = (val || 0) / 100;
        return <span className="font-mono font-semibold text-[#0F172A]">${amt.toLocaleString()}</span>;
      },
    },
    {
      key: 'status',
      label: 'Escrow Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        row.status !== 'REFUNDED' ? (
          <button
            onClick={() => {
              setRefundModal(row);
              setRefundAmount(((row.amountPaise || 0) / 100).toString());
            }}
            className="px-2 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-mono font-semibold transition flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3 text-stone-500" />
            <span>Issue Refund</span>
          </button>
        ) : (
          <span className="text-[10px] font-mono text-stone-400">Settled & Closed</span>
        )
      ),
    },
  ];

  const totalCaptured = payments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + (p.amountPaise || 0), 0) / 100;

  return (
    <div className="space-y-6">
      {notice && (
        <div className={`p-4 rounded-xl text-xs font-mono border ${
          notice.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {notice.message}
        </div>
      )}

      {/* Escrow summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-stone-400">Total Settled Escrow</span>
          <p className="font-serif text-2xl text-[#0F172A] mt-1 font-medium">
            ${totalCaptured.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-stone-400">Escrow Security</span>
          <p className="font-mono text-xs text-emerald-600 mt-2 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Swiss Banking Standard / 256-bit Encrypted
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-stone-400">Settlement Currency</span>
          <p className="font-serif text-2xl text-[#0F172A] mt-1 font-medium">USD / CHF</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={payments}
        loading={loading}
        searchPlaceholder="Search by transaction ID, commission #, or patron..."
        emptyMessage="No payment transactions recorded."
      />

      {/* Refund Modal */}
      {refundModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleRefund} className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Payment Refund Authorization
                </span>
                <h3 className="font-serif text-xl text-[#0F172A] font-medium mt-0.5">
                  Refund {refundModal.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRefundModal(null)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Refund Amount (USD)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Reason for Refund (Will be recorded in immutable audit log)
                </label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono"
                  required
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setRefundModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-600 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-rose-600 text-white hover:bg-rose-700 transition disabled:opacity-50"
              >
                {actionLoading ? 'Processing Refund...' : 'Authorize Refund'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
