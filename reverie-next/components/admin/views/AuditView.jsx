import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import { adminAuditService } from '../../../services/admin/adminServices';
import { ShieldAlert, ShieldCheck, Lock, Activity, Eye } from 'lucide-react';

export default function AuditView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);

  const fetchLogs = async (query = '') => {
    setLoading(true);
    try {
      const data = await adminAuditService.getAuditLogs(query, 0, 50);
      const list = data.content || (Array.isArray(data) ? data : []);
      setLogs(list);
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const columns = [
    {
      key: 'occurredAt',
      label: 'Timestamp (CET)',
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs text-stone-500">
          {val ? new Date(val).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'medium' }) : 'Just now'}
        </span>
      ),
    },
    {
      key: 'action',
      label: 'Security Action',
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-[#0F172A] bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
          {val || 'SYSTEM_MUTATION'}
        </span>
      ),
    },
    {
      key: 'actorEmail',
      label: 'Actor / Staff Principal',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-mono text-xs font-medium text-stone-900">{val || 'system@reverie.ch'}</p>
          <p className="font-mono text-[10px] text-stone-400">IP: {row.actorIp || '127.0.0.1 (Zurich Gateway)'}</p>
        </div>
      ),
    },
    {
      key: 'entityType',
      label: 'Target Entity',
      render: (val, row) => (
        <span className="font-mono text-xs text-stone-600">
          {val}: <span className="text-stone-400 text-[11px]">#{row.entityId || '0'}</span>
        </span>
      ),
    },
    {
      key: 'details',
      label: 'Security Context',
      render: (val) => <span className="font-mono text-xs text-stone-500 truncate max-w-xs block">{val || '—'}</span>,
    },
    {
      key: 'actions',
      label: 'Dossier',
      render: (_, row) => (
        <button
          onClick={() => setSelectedLog(row)}
          className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition"
          title="Inspect Payload"
        >
          <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Security Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-stone-800 shadow-sm">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Immutable Cryptographic Audit Trail
          </span>
          <h2 className="font-serif text-lg text-white font-medium mt-1">
            Atelier Governance & Mutation Records
          </h2>
          <p className="text-xs font-mono text-stone-400 mt-0.5">
            Every inventory adjustment, order status transition, refund authorization and staff login is permanently recorded.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-800/60">
          <ShieldCheck className="w-4 h-4" />
          <span>Tamper-Resistant</span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={logs}
        loading={loading}
        searchPlaceholder="Filter audit events by actor, action, or entity..."
        emptyMessage="No security audit events recorded."
      />

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Audit Entry Telemetry
                </span>
                <h3 className="font-serif text-xl text-[#0F172A] font-medium mt-0.5">
                  Action: {selectedLog.action}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-stone-200 text-xs font-mono space-y-2">
              <p><span className="text-stone-400">Timestamp:</span> {selectedLog.occurredAt}</p>
              <p><span className="text-stone-400">Actor Principal:</span> {selectedLog.actorEmail}</p>
              <p><span className="text-stone-400">Client IP:</span> {selectedLog.actorIp}</p>
              <p><span className="text-stone-400">Entity:</span> {selectedLog.entityType} (#{selectedLog.entityId})</p>
              <div className="pt-2 border-t border-stone-200">
                <span className="text-stone-400 block mb-1">Details Payload:</span>
                <p className="bg-white p-2.5 rounded-lg border border-stone-200 text-stone-800 break-words">
                  {selectedLog.details || 'Standard administrative operation'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
