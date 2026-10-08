import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminReturnService } from '../../../services/admin/adminServices';
import { RotateCcw, CheckCircle2, XCircle, ShieldAlert, Sparkles, Eye, AlertCircle } from 'lucide-react';

export default function ReturnsView() {
  const [returnsList, setReturnsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [decisionNote, setDecisionNote] = useState('Inspected under 10x loupe in Geneva atelier. Unmarked condition verified.');

  const fetchReturns = async () => {
    setLoading(true);
    try {
      const data = await adminReturnService.getReturns();
      const list = data?.content || (Array.isArray(data) ? data : []);
      setReturnsList(list);
    } catch (err) {
      console.error('Failed to load returns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(true);
    try {
      await adminReturnService.approveReturn(id, true, decisionNote);
      setNotice({ type: 'success', message: 'Return approved and wallet refund processed.' });
      setSelectedReturn(null);
      await fetchReturns();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Approval failed' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(true);
    try {
      await adminReturnService.rejectReturn(id, decisionNote);
      setNotice({ type: 'success', message: 'Return declined with horological inspection report.' });
      setSelectedReturn(null);
      await fetchReturns();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Rejection failed' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'rmaNumber',
      label: 'RMA Tracking',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: '#0F172A' }}>
          {val || `RMA-${row.id?.substring(0, 8)}`}
        </span>
      ),
    },
    {
      key: 'patron',
      label: 'Patron',
      sortable: true,
      render: (val, row) => <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{val || row.userEmail || 'Distinguished Patron'}</span>,
    },
    {
      key: 'reason',
      label: 'Inspection Justification',
      render: (val) => <span style={{ fontSize: 12, color: '#475569', fontStyle: 'italic' }}>{val || 'Bespoke exchange'}</span>,
    },
    {
      key: 'status',
      label: 'Vault Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      label: 'Horology Inspection',
      render: (_, row) => (
        <button
          onClick={() => {
            setSelectedReturn(row);
            setDecisionNote('Inspected in Swiss atelier under 10x microscope. Certified pristine.');
          }}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            fontSize: 11,
            fontWeight: 600,
            color: '#0F172A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Eye style={{ width: 14, height: 14, color: '#D4AF37' }} />
          <span>Inspect Case</span>
        </button>
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

      <DataTable
        columns={columns}
        data={returnsList}
        loading={loading}
        searchPlaceholder="Search returns by RMA, patron, or justification..."
        emptyMessage="No returns or vault inspections recorded."
      />

      {/* Return Inspection Modal */}
      <AdminModal
        isOpen={!!selectedReturn}
        onClose={() => setSelectedReturn(null)}
        subtitle="GENEVA ATELIER VAULT INSPECTION"
        title={selectedReturn?.rmaNumber || selectedReturn?.id}
        maxWidth="max-w-lg"
      >
        {selectedReturn && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              <p style={{ margin: 0 }}><span style={{ color: '#94A3B8' }}>Patron:</span> <strong>{selectedReturn.patron || selectedReturn.userEmail || 'Collector'}</strong></p>
              <p style={{ margin: 0 }}><span style={{ color: '#94A3B8' }}>Reason:</span> {selectedReturn.reason || '—'}</p>
              <p style={{ margin: 0 }}><span style={{ color: '#94A3B8' }}>Status:</span> <StatusBadge status={selectedReturn.status} /></p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Horological Master Inspection Note
              </label>
              <textarea
                value={decisionNote}
                onChange={(e) => setDecisionNote(e.target.value)}
                rows={3}
                className="admin-form-textarea"
              />
            </div>

            <div className="admin-modal-footer">
              {selectedReturn.status === 'REQUESTED' || selectedReturn.status === 'PENDING' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => handleReject(selectedReturn.id)}
                    disabled={actionLoading}
                    className="admin-btn-danger"
                  >
                    Decline Return
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(selectedReturn.id)}
                    disabled={actionLoading}
                    className="admin-btn-primary"
                    style={{ backgroundColor: '#047857' }}
                  >
                    Approve & Refund
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: 12, color: '#94A3B8', marginRight: 'auto' }}>
                  Inspection Processed ({selectedReturn.status})
                </span>
              )}

              <button
                type="button"
                onClick={() => setSelectedReturn(null)}
                className="admin-btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
