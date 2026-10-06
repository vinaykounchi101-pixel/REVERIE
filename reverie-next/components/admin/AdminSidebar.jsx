import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  CreditCard,
  Truck,
  RotateCcw,
  Users,
  Calendar,
  LifeBuoy,
  Star,
  FileText,
  HelpCircle,
  ShieldAlert,
  Sliders,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

const NAVIGATION_GROUPS = [
  {
    title: 'Overview',
    items: [
      { id: 'overview', label: 'Executive Pulse', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Commerce',
    items: [
      { id: 'orders', label: 'Orders & Commissions', icon: ShoppingBag, badgeKey: 'ordersCount' },
      { id: 'inventory', label: 'Vault & Inventory', icon: Package },
      { id: 'payments', label: 'Payments & Escrow', icon: CreditCard },
      { id: 'shipments', label: 'Armored Logistics', icon: Truck },
      { id: 'returns', label: 'Returns & Inspection', icon: RotateCcw },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { id: 'products', label: 'Timepiece Catalog', icon: Layers },
    ],
  },
  {
    title: 'Client Experience',
    items: [
      { id: 'customers', label: 'Collector Directory', icon: Users },
      { id: 'concierge', label: 'Private Concierge', icon: Calendar },
      { id: 'support', label: 'Atelier Support', icon: LifeBuoy },
      { id: 'reviews', label: 'Verified Reviews', icon: Star },
    ],
  },
  {
    title: 'CMS & Editorial',
    items: [
      { id: 'cms', label: 'Horology Stories', icon: FileText },
      { id: 'faqs', label: 'Knowledge Base', icon: HelpCircle },
    ],
  },
  {
    title: 'Governance',
    items: [
      { id: 'users', label: 'Staff & RBAC', icon: Users },
      { id: 'audit', label: 'Audit Trail', icon: ShieldAlert },
      { id: 'settings', label: 'Console Settings', icon: Sliders },
    ],
  },
];

export default function AdminSidebar({ activeTab, onSelectTab, counts = {}, onLogout, currentUser }) {
  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-brand-inner">
          <div className="admin-sidebar-brand-badge">
            R
          </div>
          <div>
            <span className="admin-sidebar-brand-title">
              REVERIE
            </span>
            <span className="admin-sidebar-brand-sub">
              Atelier Console
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="admin-sidebar-nav custom-scrollbar">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.title} className="admin-nav-group">
            <h4 className="admin-nav-group-title">
              {group.title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const badge = item.badgeKey && counts[item.badgeKey];

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`admin-nav-btn ${isActive ? 'active' : ''}`}
                  >
                    <div className="admin-nav-btn-left">
                      <Icon className="admin-nav-icon" style={{ width: 16, height: 16 }} />
                      <span>{item.label}</span>
                    </div>

                    {badge ? (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: 9999,
                        fontSize: 10,
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        color: '#D4AF37',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                      }}>
                        {badge}
                      </span>
                    ) : isActive ? (
                      <ChevronRight style={{ width: 14, height: 14, color: '#D4AF37' }} />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-user-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
            <div className="admin-sidebar-user-avatar">
              {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-mono)' }}>
                {currentUser?.email || 'admin@reverie.ch'}
              </p>
              <p style={{ fontSize: 10, color: '#94A3B8', margin: 0, fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                {currentUser?.role || 'SUPER_ADMIN'}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign out of Atelier Console"
            className="admin-sidebar-logout-btn"
          >
            <LogOut style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: '1px solid rgba(30, 41, 59, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: '#64748B'
        }}>
          <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94A3B8', textDecoration: 'none' }}>
            <span>Customer Storefront</span>
            <ExternalLink style={{ width: 12, height: 12 }} />
          </Link>
          <span style={{ color: '#D4AF37' }}>v2.6.4</span>
        </div>
      </div>
    </aside>
  );
}
