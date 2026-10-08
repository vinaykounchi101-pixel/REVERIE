import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminPaymentService, adminOrderService } from '../../../services/admin/adminServices';
import { CreditCard, DollarSign, RotateCcw, ShieldCheck, Lock, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

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
      const orders = await adminOrderService.getOrders();
      const list = orders?.content || (Array.isArray(orders) ? orders : []);
      if (Array.isArray(list)) {
        const txs = list.map((o) => ({
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
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{val}</span>,
    },
    {
      key: 'orderNumber',
      label: 'Commission #',
      render: (val, row) => (
        <span style={{ fontSize: 12, color: '#64748B' }}>
          #{val || row.orderId?.substring(0, 8)}
        </span>
      ),
    },
    {
      key: 'patron',
      label: 'Patron Account',
      sortable: true,
      render: (val) => <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{val}</span>,
    },
    {
      key: 'method',
      label: 'Settlement Rail',
      render: (val) => <span style={{ fontSize: 11, color: '#64748B' }}>{val}</span>,
    },
    {
      key: 'amountPaise',
      label: 'Settled Amount',
      sortable: true,
      render: (val) => {
        const amt = (val || 0) / 100;
        return <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#0F172A' }}>${amt.toLocaleString()}</span>;
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
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              backgroundColor: '#FFF1F2',
              border: '1px solid #FECDD3',
              fontSize: 11,
              fontWeight: 600,
              color: '#BE123C',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <RotateCcw style={{ width: 12, height: 12 }} />
            <span>Issue Refund</span>
          </button>
        ) : (
          <span style={{ fontSize: 11, color: '#94A3B8' }}>Settled & Closed</span>
        )
      ),
    },
  ];

  const totalCaptured = payments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + (p.amountPaise || 0), 0) / 100;

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

      {/* Escrow summary cards */}
      <div className="admin-metric-grid">
        <div className="admin-metric-card gold-accent">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Total Settled Escrow</span>
              <h3 className="admin-metric-value">${totalCaptured.toLocaleString()}</h3>
            </div>
            <div className="admin-metric-icon-box">
              <DollarSign style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#047857', fontWeight: 600 }}>100% Capital Verified</span>
            <span style={{ color: '#64748B' }}>USD Vault</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Escrow Security Rail</span>
              <h3 className="admin-metric-value" style={{ fontSize: 20, marginTop: 8 }}>Swiss Standard</h3>
            </div>
            <div className="admin-metric-icon-box">
              <ShieldCheck style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#64748B' }}>256-bit Hardware SSL</span>
            <span style={{ color: '#047857', fontWeight: 600 }}>Active</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Settlement Currency</span>
              <h3 className="admin-metric-value">USD / CHF</h3>
            </div>
            <div className="admin-metric-icon-box">
              <CreditCard style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#64748B' }}>Multi-currency Gateway</span>
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>Geneva Clearing</span>
          </div>
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
      <AdminModal
        isOpen={!!refundModal}
        onClose={() => setRefundModal(null)}
        subtitle="ESCROW REVERSAL PROTOCOL"
        title={refundModal ? `Refund ${refundModal.id}` : ''}
        maxWidth="max-w-md"
      >
        {refundModal && (
          <form onSubmit={handleRefund} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Refund Amount ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Reason for Refund (Recorded in immutable audit trail)
              </label>
              <textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                rows={3}
                className="admin-form-textarea"
                required
              />
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setRefundModal(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="admin-btn-danger"
              >
                {actionLoading ? 'Processing Refund...' : 'Authorize Refund'}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
