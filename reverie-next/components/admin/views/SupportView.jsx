import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminSupportService } from '../../../services/admin/adminServices';
import { LifeBuoy, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

export default function SupportView() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await adminSupportService.getTickets();
      const list = data?.content || (Array.isArray(data) ? data : []);
      setTickets(list);
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    setActionLoading(true);
    try {
      await adminSupportService.updateStatus(id, {
        status: status,
        internalNotes: 'Resolved by Senior Atelier Client Advisor',
      });
      setNotice({ type: 'success', message: `Ticket status marked as ${status}` });
      await fetchTickets();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Update failed' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'ticketNumber',
      label: 'Ticket #',
      sortable: true,
      render: (val, row) => (
        <span className="font-mono text-xs font-semibold text-[#0F172A]">
          {val || `TCK-${row.id?.substring(0, 8)}`}
        </span>
      ),
    },
    {
      key: 'subject',
      label: 'Enquiry Subject',
      render: (val, row) => <span className="text-xs font-medium text-stone-900">{val || row.title || 'Client Service Enquiry'}</span>,
    },
    {
      key: 'patronEmail',
      label: 'Patron Email',
      render: (val, row) => <span className="font-mono text-xs text-stone-600">{val || row.userEmail || 'patron@reverie.app'}</span>,
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (val) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
          val === 'HIGH' || val === 'URGENT' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-stone-100 text-stone-700'
        }`}>
          {val || 'NORMAL'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      label: 'Resolution',
      render: (_, row) => (
        row.status === 'OPEN' || row.status === 'PENDING' ? (
          <button
            onClick={() => handleUpdateStatus(row.id, 'RESOLVED')}
            disabled={actionLoading}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-mono font-semibold transition"
          >
            Mark Resolved
          </button>
        ) : (
          <span className="text-xs font-mono text-stone-400">Archived</span>
        )
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
        data={tickets}
        loading={loading}
        searchPlaceholder="Search support tickets by ticket #, patron, or subject..."
        emptyMessage="No support tickets recorded."
      />
    </div>
  );
}
