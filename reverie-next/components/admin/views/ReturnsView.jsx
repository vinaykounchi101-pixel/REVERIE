import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminReturnService } from '../../../services/admin/adminServices';
import { RotateCcw, CheckCircle2, XCircle, ShieldAlert, Sparkles, Eye } from 'lucide-react';

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
        <span className="font-mono text-xs font-semibold text-[#0F172A]">
          {val || `RMA-${row.id?.substring(0, 8)}`}
        </span>
      ),
    },
    {
      key: 'patron',
      label: 'Patron',
      sortable: true,
      render: (val, row) => <span className="text-xs font-medium text-stone-900">{val || row.userEmail || 'Distinguished Patron'}</span>,
    },
    {
      key: 'reason',
      label: 'Inspection Justification',
      render: (val) => <span className="text-xs text-stone-600 italic max-w-xs truncate block">{val || 'Bespoke exchange'}</span>,
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
          className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-mono font-medium text-stone-800 transition flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Inspect Case</span>
        </button>
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

      <DataTable
        columns={columns}
        data={returnsList}
        loading={loading}
        searchPlaceholder="Search returns by RMA, patron, or justification..."
        emptyMessage="No returns or vault inspections recorded."
      />

      {/* Return Inspection Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Geneva Atelier Vault Inspection
                </span>
                <h3 className="font-serif text-xl text-[#0F172A] font-medium mt-0.5">
                  {selectedReturn.rmaNumber || selectedReturn.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReturn(null)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-stone-200 text-xs space-y-1 font-mono">
              <p><span className="text-stone-400">Patron:</span> {selectedReturn.patron || selectedReturn.userEmail || 'Collector'}</p>
              <p><span className="text-stone-400">Reason:</span> {selectedReturn.reason || '—'}</p>
              <p><span className="text-stone-400">Status:</span> {selectedReturn.status}</p>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-600 mb-1">
                Horological Master Inspection Note
              </label>
              <textarea
                value={decisionNote}
                onChange={(e) => setDecisionNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono"
              />
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              {selectedReturn.status === 'REQUESTED' || selectedReturn.status === 'PENDING' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReject(selectedReturn.id)}
                    disabled={actionLoading}
                    className="px-3 py-2 rounded-xl text-xs font-mono bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition"
                  >
                    Decline Return
                  </button>
                  <button
                    onClick={() => handleApprove(selectedReturn.id)}
                    disabled={actionLoading}
                    className="px-4 py-2 rounded-xl text-xs font-mono bg-emerald-600 text-white hover:bg-emerald-700 transition"
                  >
                    Approve & Refund
                  </button>
                </div>
              ) : (
                <span className="text-xs font-mono text-stone-400">Inspection Processed ({selectedReturn.status})</span>
              )}

              <button
                onClick={() => setSelectedReturn(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-600 hover:bg-stone-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
