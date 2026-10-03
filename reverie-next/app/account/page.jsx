"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Package, Heart, MapPin, CreditCard, Settings, HelpCircle, ExternalLink, LogOut, ShieldCheck } from 'lucide-react';
import { sampleOrders } from '../../data/allProductsData';
import { authService } from '../../services/authService';
import AuthModal from '../../components/auth/AuthModal';
import Button from '../../components/ui/Button';

export default function AccountPage() {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [activeTab, setActiveTab] = useState('orders');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(authService.getCurrentUser());
    };
    window.addEventListener('reverie_auth_change', handleAuthChange);
    return () => window.removeEventListener('reverie_auth_change', handleAuthChange);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return (
      <div className="page-account">
        <div className="container" style={{ maxWidth: '640px', padding: 'var(--space-20) var(--space-4)' }}>
          <div className="account-guest-gate font-ui" style={{
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-12) var(--space-8)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
              color: 'var(--color-warm-400)'
            }}>
              <User size={28} />
            </div>
            <span className="eyebrow eyebrow-light font-ui">COLLECTOR PORTAL</span>
            <h1 className="font-display" style={{ fontSize: '32px', margin: '8px 0 12px' }}>
              Identify Yourself
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px' }}>
              Sign in to manage your timepieces, track acquisitions, download warranty certificates, and access bespoke concierge services.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '280px', margin: '0 auto' }}>
              <Button
                variant="primary"
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
              >
                Sign In to Account
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
              >
                Create Collector Account
              </Button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
          onAuthSuccess={(user) => setCurrentUser(user)}
        />
      </div>
    );
  }

  const userInitials = `${(currentUser.firstName || 'C')[0]}${(currentUser.lastName || 'M')[0]}`.toUpperCase();

  return (
    <div className="page-account">
      <div className="container">
        <div className="account-layout">
          {/* Left Sidebar Navigation */}
          <aside className="account-sidebar">
            <div className="account-user-card font-ui">
              <div className="account-avatar">{userInitials}</div>
              <div className="account-user-info">
                <h3 className="account-user-name">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="account-user-email">{currentUser.email}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <ShieldCheck size={13} color="var(--color-warm-400)" />
                  <span style={{ fontSize: '11px', color: 'var(--color-warm-400)', fontWeight: 600 }}>
                    {currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'ADMIN' ? 'Atelier Administrator' : 'Verified Collector'}
                  </span>
                </div>
              </div>
            </div>

            <nav className="account-nav-list font-ui">
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'profile' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} /> Personal Profile
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'orders' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={16} /> Timepiece Acquisitions
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'wishlist' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={16} /> Curated Wishlist
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'addresses' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin size={16} /> Delivery Addresses
              </button>
              <button
                type="button"
                className={`account-nav-item`}
                style={{ color: '#ef4444', marginTop: 'var(--space-4)' }}
                onClick={handleLogout}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </nav>
          </aside>

          {/* Right Main Content Area */}
          <main className="account-content font-ui">
            {activeTab === 'orders' && (
              <div className="account-orders-pane">
                <div className="account-pane-head">
                  <h2 className="account-pane-title font-display">Acquisition History</h2>
                  <p className="account-pane-sub">Review your past orders and download official warranty certificates.</p>
                </div>

                <div className="account-orders-list">
                  {sampleOrders.map((ord) => (
                    <article key={ord.id} className="account-order-card">
                      <div className="account-order-header">
                        <div>
                          <span className="account-order-id">#{ord.id}</span>
                          <span className="account-order-date font-ui">{ord.date}</span>
                        </div>
                        <span className={`account-order-status account-order-status--${ord.status.toLowerCase()}`}>
                          {ord.status}
                        </span>
                      </div>

                      <div className="account-order-body">
                        <div className="account-order-items">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="account-order-item-row">
                              <span className="account-order-item-name font-display">{it.name}</span>
                              <span className="account-order-item-qty">Qty: {it.qty}</span>
                              <span className="account-order-item-price font-display">${it.price ? it.price.toLocaleString() : '1,299'}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="account-order-footer">
                        <span className="account-order-total font-display">
                          Total: <strong>${ord.total ? ord.total.toLocaleString() : '1,299'}</strong>
                        </span>
                        <div className="account-order-actions">
                          <Link href={`/order-tracking?id=${ord.id}`}>
                            <Button variant="secondary" className="account-track-btn">
                              <span>Track Shipment</span>
                              <ExternalLink size={13} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="account-profile-pane">
                <h2 className="account-pane-title font-display">Client Profile Details</h2>
                <div className="checkout-form-grid" style={{ marginTop: '24px' }}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue={currentUser.firstName} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue={currentUser.lastName} />
                  </div>
                  <div className="form-group">
                    <label>Primary Email</label>
                    <input type="email" defaultValue={currentUser.email} disabled />
                  </div>
                  <div className="form-group">
                    <label>Account Role</label>
                    <input type="text" defaultValue={currentUser.role || 'CUSTOMER'} disabled />
                  </div>
                </div>
                <div style={{ marginTop: '24px' }}>
                  <Button variant="primary">Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="account-wishlist-pane">
                <h2 className="account-pane-title font-display">Your Curated Wishlist</h2>
                <p className="account-pane-sub">Saved references and bespoke configurations.</p>
                <div style={{ marginTop: '24px' }}>
                  <Link href="/collections">
                    <Button variant="primary" arrow>
                      Browse Collections
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="account-addresses-pane">
                <h2 className="account-pane-title font-display">Registered Addresses</h2>
                <div className="checkout-mini-item" style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                  <div>
                    <strong>Default Residence</strong>
                    <p style={{ margin: '4px 0', opacity: 0.8 }}>45 Lake Geneva Boulevard, Apt 12, 1204 Genève, Switzerland</p>
                    <span style={{ fontSize: '12px', color: '#d4af37' }}>Primary Insured Delivery Location</span>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
