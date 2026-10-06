import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({ title, value, change, subtitle, icon: Icon, goldAccent = false }) {
  return (
    <div className={`admin-metric-card ${goldAccent ? 'gold-accent' : ''}`}>
      <div className="admin-metric-top">
        <div>
          <p className="admin-metric-title">
            {title}
          </p>
          <h3 className="admin-metric-value">
            {value}
          </h3>
        </div>
        {Icon && (
          <div className="admin-metric-icon-box">
            <Icon style={{ width: 20, height: 20 }} />
          </div>
        )}
      </div>

      <div className="admin-metric-footer">
        {change !== undefined && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 600,
            color: change > 0 ? '#059669' : change < 0 ? '#E11D48' : '#64748B'
          }}>
            {change > 0 ? (
              <TrendingUp style={{ width: 14, height: 14 }} />
            ) : change < 0 ? (
              <TrendingDown style={{ width: 14, height: 14 }} />
            ) : (
              <Minus style={{ width: 14, height: 14 }} />
            )}
            <span>{change > 0 ? `+${change}%` : `${change}%`} vs last month</span>
          </div>
        )}
        {subtitle && (
          <span style={{ color: '#94A3B8', fontSize: 11 }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
