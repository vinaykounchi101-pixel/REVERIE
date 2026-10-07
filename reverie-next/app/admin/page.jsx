"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, User, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { authService } from '../../services/authService';

// Modular Admin Components
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

// Views
import OverviewView from '../../components/admin/views/OverviewView';
import OrdersView from '../../components/admin/views/OrdersView';
import InventoryView from '../../components/admin/views/InventoryView';
import PaymentsView from '../../components/admin/views/PaymentsView';
import ShipmentsView from '../../components/admin/views/ShipmentsView';
import ReturnsView from '../../components/admin/views/ReturnsView';
import ProductsView from '../../components/admin/views/ProductsView';
import CustomersView from '../../components/admin/views/CustomersView';
import ConciergeView from '../../components/admin/views/ConciergeView';
import SupportView from '../../components/admin/views/SupportView';
import ReviewsView from '../../components/admin/views/ReviewsView';
import CmsView from '../../components/admin/views/CmsView';
import FaqsView from '../../components/admin/views/FaqsView';
import UsersView from '../../components/admin/views/UsersView';
import AuditView from '../../components/admin/views/AuditView';
import SettingsView from '../../components/admin/views/SettingsView';

const TAB_METADATA = {
  overview: {
    title: 'Executive Atelier Pulse',
    subtitle: 'Real-time overview of commissions, vault reserves, and patron engagements',
  },
  orders: {
    title: 'Commissions & Fulfillment',
    subtitle: 'Master ledger of bespoke orders, vault allocation & production statuses',
  },
  inventory: {
    title: 'Vault Reserves & Allocation',
    subtitle: 'Track physical timepieces, movements, precious alloys & batch inventory',
  },
  payments: {
    title: 'Payments & Escrow Settlements',
    subtitle: 'Manage Swiss escrow transactions, refunds, and luxury payment gateways',
  },
  shipments: {
    title: 'Armored Global Logistics',
    subtitle: 'Monitor insured courier waybills, customs manifests, and biometric delivery seals',
  },
  returns: {
    title: 'Returns & Horological Inspection',
    subtitle: 'Manage RMA authorizations and certified 10x loupe inspection evaluations',
  },
  products: {
    title: 'Master Timepiece Catalog',
    subtitle: 'Curate calibres, complications, dials, gold alloys and references',
  },
  customers: {
    title: 'Collector & Patron Directory',
    subtitle: 'High-net-worth patron histories, VIP tiers and bespoke commission records',
  },
  concierge: {
    title: 'Private Concierge Bookings',
    subtitle: 'Salon Privé appointments in Geneva & Zurich and video consultations',
  },
  support: {
    title: 'Atelier Support Desk',
    subtitle: 'Dedicated high-touch collector inquiries and service requests',
  },
  reviews: {
    title: 'Verified Collector Reviews',
    subtitle: 'Moderate verified feedback, wrist impressions, and horological testimonials',
  },
  cms: {
    title: 'Haute Horlogerie Stories',
    subtitle: 'Editorial publishing platform for maison philosophy and technical chapters',
  },
  faqs: {
    title: 'Knowledge Base & FAQ',
    subtitle: 'Documented protocols for escrow, shipping, warranties, and horology',
  },
  users: {
    title: 'Staff & RBAC Governance',
    subtitle: 'Manage administrator accounts, permissions, and curator privileges',
  },
  audit: {
    title: 'Immutable Security Audit',
    subtitle: 'Cryptographic log of all ledger mutations, logins, and financial events',
  },
  settings: {
    title: 'Console & Node Settings',
    subtitle: 'Infrastructure connectivity, email relays, and executive configurations',
  },
};

export default function AdminPortalPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshKey, setRefreshKey] = useState(0);

  // Authentication State
  const [email, setEmail] = useState('admin@reverie.app');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setMounted(true);
    const user = authService.getCurrentUser();
    if (user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const authData = await authService.adminLogin(email, password);
      if (authData.user && (authData.user.role === 'ADMIN' || authData.user.role === 'SUPER_ADMIN' || authData.user.role === 'CONTENT_MGR' || authData.user.role === 'PRODUCT_MGR' || authData.user.role === 'INVENTORY_MGR' || authData.user.role === 'ORDER_MGR' || authData.user.role === 'SUPPORT_AGENT' || authData.user.role === 'ANALYST')) {
        setCurrentUser(authData.user);
      } else {
        setErrorMsg('Access restricted. Only certified Atelier Administrators may enter.');
        authService.logout();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials. Please verify your staff access.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (!mounted) return null;

  // Unauthenticated: Atelier Security Authentication Gate
  if (!currentUser) {
    return (
      <div className="admin-auth-wrapper">
        <div className="admin-auth-bg-radial" />
        <div className="admin-auth-bg-grid" />

        <div className="admin-auth-box">
          <div className="admin-auth-header">
            <div className="admin-auth-logo-badge">
              R
            </div>
            <h1 className="admin-auth-title">
              REVERIE
            </h1>
            <p className="admin-auth-subtitle">
              Atelier Executive Terminal
            </p>
          </div>

          <div className="admin-auth-card">
            <div className="admin-auth-card-top">
              <span>
                <Lock style={{ width: 14, height: 14, color: '#D4AF37' }} />
                Authorized Staff Authentication
              </span>
              <span className="ssl-badge">
                SSL 256-BIT
              </span>
            </div>

            {errorMsg && (
              <div className="admin-auth-error">
                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="admin-form-group">
                <label>
                  Staff Principal Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@reverie.app"
                  className="admin-auth-input"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label>
                  Master Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="admin-auth-input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="admin-auth-submit-btn"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Enter Atelier Console</span>
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </>
                )}
              </button>
            </form>

            <div className="admin-auth-footer">
              <Link href="/">
                &larr; Customer Storefront
              </Link>
              <span>Geneva Node v2.6</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated: Executive Atelier Admin Console
  const currentMeta = TAB_METADATA[activeTab] || {
    title: 'Atelier Console',
    subtitle: 'REVERIE Haute Horlogerie Administration',
  };

  return (
    <div className="admin-shell">
      {/* Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="admin-main">
        <AdminHeader
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
          onRefresh={() => setRefreshKey((k) => k + 1)}
        />

        <div className="admin-content-container" key={refreshKey}>
          {activeTab === 'overview' && <OverviewView onNavigate={setActiveTab} />}
          {activeTab === 'orders' && <OrdersView />}
          {activeTab === 'inventory' && <InventoryView />}
          {activeTab === 'payments' && <PaymentsView />}
          {activeTab === 'shipments' && <ShipmentsView />}
          {activeTab === 'returns' && <ReturnsView />}
          {activeTab === 'products' && <ProductsView />}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'concierge' && <ConciergeView />}
          {activeTab === 'support' && <SupportView />}
          {activeTab === 'reviews' && <ReviewsView />}
          {activeTab === 'cms' && <CmsView />}
          {activeTab === 'faqs' && <FaqsView />}
          {activeTab === 'users' && <UsersView />}
          {activeTab === 'audit' && <AuditView />}
          {activeTab === 'settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
}
