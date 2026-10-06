import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, ShieldCheck } from 'lucide-react';

export default function AdminHeader({
  title,
  subtitle,
  onRefresh,
  loading = false,
  extraActions = null,
}) {
  const [genevaTime, setGenevaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setGenevaTime(formatted + ' CET');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="admin-header">
      {/* Title & Subtitle */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 className="admin-header-title">
            {title}
          </h1>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '2px 8px',
            borderRadius: 9999,
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.1em',
            backgroundColor: '#ECFDF5',
            color: '#047857',
            border: '1px solid #A7F3D0'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
            LIVE ATELIER
          </span>
        </div>
        {subtitle && (
          <p className="admin-header-subtitle">
            {subtitle}
          </p>
        )}
      </div>

      {/* Quick stats, Geneva Time & Actions */}
      <div className="admin-header-right">
        {/* Geneva Clock */}
        <div className="admin-clock-badge">
          <Clock style={{ width: 14, height: 14, color: '#D4AF37' }} />
          <span>Genève: {genevaTime || '12:00:00 CET'}</span>
        </div>

        {/* Refresh Button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            title="Refresh active ledger"
            className="admin-refresh-btn"
          >
            <RefreshCw style={{ width: 14, height: 14, color: '#64748B' }} />
            <span>Sync Data</span>
          </button>
        )}

        {extraActions}
      </div>
    </header>
  );
}
