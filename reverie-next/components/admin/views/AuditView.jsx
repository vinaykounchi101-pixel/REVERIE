import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import AdminModal from '../AdminModal';
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
      const list = data?.content || (Array.isArray(data) ? data : []);
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
        <span style={{ fontSize: 12, color: '#64748B' }}>
          {val ? new Date(val).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'medium' }) : 'Just now'}
        </span>
      ),
    },
    {
      key: 'action',
      label: 'Security Action',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: '#0F172A', backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: 6, border: '1px solid #E2E8F0' }}>
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
          <p style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', margin: 0 }}>{val || 'system@reverie.ch'}</p>
          <p style={{ fontSize: 10, color: '#94A3B8', margin: '2px 0 0 0' }}>IP: {row.actorIp || '127.0.0.1 (Zurich Gateway)'}</p>
        </div>
      ),
    },
    {
      key: 'entityType',
      label: 'Target Entity',
      render: (val, row) => (
        <span style={{ fontSize: 12, color: '#334155' }}>
          {val}: <span style={{ color: '#94A3B8', fontSize: 11 }}>#{row.entityId || '0'}</span>
        </span>
      ),
    },
    {
      key: 'details',
      label: 'Security Context',
      render: (val) => <span style={{ fontSize: 12, color: '#64748B', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{val || '—'}</span>,
    },
    {
      key: 'actions',
      label: 'Dossier',
      render: (_, row) => (
        <button
          onClick={() => setSelectedLog(row)}
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
          title="Inspect Payload"
        >
          <Eye style={{ width: 14, height: 14, color: '#D4AF37' }} />
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Security Header Banner */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.15)',
        }}
      >
        <div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock style={{ width: 12, height: 12 }} />
            IMMUTABLE CRYPTOGRAPHIC AUDIT TRAIL
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#FFFFFF', fontWeight: 600, margin: '6px 0 2px 0' }}>
            Atelier Governance & Mutation Records
          </h2>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>
            Every inventory adjustment, order status transition, refund authorization and staff login is permanently recorded.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#34D399', backgroundColor: 'rgba(6, 78, 59, 0.4)', padding: '6px 14px', borderRadius: 10, border: '1px solid rgba(5, 150, 105, 0.5)' }}>
          <ShieldCheck style={{ width: 16, height: 16 }} />
          <span>Tamper-Resistant Ledger</span>
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
      <AdminModal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        subtitle="AUDIT ENTRY TELEMETRY"
        title={selectedLog ? `Action: ${selectedLog.action}` : ''}
        maxWidth="max-w-lg"
      >
        {selectedLog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
              <p style={{ margin: 0 }}><span style={{ color: '#94A3B8' }}>Timestamp:</span> <strong>{selectedLog.occurredAt}</strong></p>
              <p style={{ margin: 0 }}><span style={{ color: '#94A3B8' }}>Actor Principal:</span> <strong>{selectedLog.actorEmail}</strong></p>
              <p style={{ margin: 0 }}><span style={{ color: '#94A3B8' }}>Client IP:</span> <strong>{selectedLog.actorIp}</strong></p>
              <p style={{ margin: 0 }}><span style={{ color: '#94A3B8' }}>Entity:</span> <strong>{selectedLog.entityType} (#{selectedLog.entityId})</strong></p>
              <div style={{ paddingTop: 8, borderTop: '1px solid #E2E8F0' }}>
                <span style={{ color: '#94A3B8', display: 'block', marginBottom: 4 }}>Details Payload:</span>
                <p style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, border: '1px solid #E2E8F0', color: '#1E293B', margin: 0, wordBreak: 'break-word' }}>
                  {selectedLog.details || 'Standard administrative operation'}
                </p>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="admin-btn-primary"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
