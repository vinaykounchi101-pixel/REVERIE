import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminConciergeService } from '../../../services/admin/adminServices';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function ConciergeView() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await adminConciergeService.getAppointments();
      const list = data?.content || (Array.isArray(data) ? data : []);
      setAppointments(list);
    } catch (err) {
      console.error('Failed to load concierge appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    setActionLoading(true);
    try {
      await adminConciergeService.updateStatus(id, status, 'Approved by Atelier Salon Director');
      setNotice({ type: 'success', message: `Salon consultation updated to ${status}` });
      await fetchAppointments();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Update failed' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'clientName',
      label: 'Patron Dossier',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-medium text-stone-900 text-xs">{val || row.fullName || 'Patron'}</p>
          <p className="font-mono text-[10px] text-stone-400">{row.clientEmail || row.email}</p>
        </div>
      ),
    },
    {
      key: 'salonLocation',
      label: 'Salon / Suite Location',
      render: (val, row) => (
        <span className="text-xs text-stone-700 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#D4AF37]" />
          {val || row.location || 'Geneva Private Salon'}
        </span>
      ),
    },
    {
      key: 'appointmentDate',
      label: 'Scheduled Consultation',
      sortable: true,
      render: (val, row) => {
        const d = val || row.scheduledTime;
        return (
          <span className="font-mono text-xs text-stone-800">
            {d ? new Date(d).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'Pending'}
          </span>
        );
      },
    },
    {
      key: 'timepieceInterest',
      label: 'Timepiece of Interest',
      render: (val, row) => <span className="text-xs text-stone-600 italic">{val || row.notes || 'Haute Horlogerie Consultation'}</span>,
    },
    {
      key: 'status',
      label: 'Booking Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      label: 'Salon Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.status === 'REQUESTED' || row.status === 'PENDING' ? (
            <button
              onClick={() => handleUpdateStatus(row.id, 'CONFIRMED')}
              disabled={actionLoading}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-mono font-semibold transition"
            >
              Confirm Suite
            </button>
          ) : row.status === 'CONFIRMED' ? (
            <button
              onClick={() => handleUpdateStatus(row.id, 'COMPLETED')}
              disabled={actionLoading}
              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 text-xs font-mono font-semibold transition"
            >
              Complete Session
            </button>
          ) : (
            <span className="text-xs font-mono text-stone-400">Archived</span>
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

      {/* Salon Banner */}
      <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
            Private Atelier Appointments
          </span>
          <h2 className="font-serif text-lg text-[#0F172A] font-medium mt-0.5">
            Geneva & Zurich Private Salon Bookings
          </h2>
          <p className="text-xs font-mono text-stone-500 mt-0.5">
            VIP viewings, personalized bespoke consultations & master watchmaker sessions
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={appointments}
        loading={loading}
        searchPlaceholder="Search bookings by patron name, salon, or timepiece..."
        emptyMessage="No concierge appointments recorded."
      />
    </div>
  );
}
