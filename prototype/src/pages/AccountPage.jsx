import React, { useState, useEffect } from 'react';
import { User, Package, Heart, MapPin, CreditCard, Settings, HelpCircle, ExternalLink, LogOut, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sampleOrders } from '../data/allProductsData';
import { authService } from '../services/authService';
import AuthModal from '../components/auth/AuthModal';
import Button from '../components/ui/Button';

export default function AccountPage({ onNavigate, onSelectOrder }) {
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

  // If user is not authenticated, show luxury identification portal
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
                onClick={() => onNavigate('support')}
              >
                <HelpCircle size={16} /> Concierge & Support
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

          {/* Right Main Dashboard Area */}
          <main className="account-main">
            <div className="account-header">
              <h1 className="account-welcome font-display">
                Welcome back, {currentUser.firstName}
              </h1>
              <p className="account-sub font-ui">Manage your timepiece portfolio, official certifications, and delivery details.</p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="account-metrics-grid font-ui">
              <div className="account-metric-card">
                <span className="metric-num">3</span>
                <span className="metric-label">Total Timepieces</span>
              </div>
              <div className="account-metric-card">
                <span className="metric-num">5</span>
                <span className="metric-label">Wishlist References</span>
              </div>
              <div className="account-metric-card">
                <span className="metric-num">Patron</span>
                <span className="metric-label">Collector Tier</span>
              </div>
            </div>

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <section className="account-section">
                <div className="account-section-header">
                  <h2 className="account-section-title font-ui">Acquisition History</h2>
                  <Button variant="text" onClick={() => onNavigate('collections')} arrow>
                    Explore New Arrivals
                  </Button>
                </div>

                <div className="account-orders-list">
                  {sampleOrders.map((ord) => (
                    <div key={ord.id} className="account-order-card font-ui">
                      <div className="order-card-header">
                        <div>
                          <span className="order-id">#{ord.id}</span>
                          <span className="order-date">{ord.date}</span>
                        </div>
                        <div className="order-status-badge order-status-badge--delivered">
                          {ord.status}
                        </div>
                      </div>

                      <div className="order-items-preview">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="order-preview-item">
                            <img src={item.image} alt={item.name} className="order-preview-img" />
                            <div>
                              <h4 className="order-preview-name">{item.name}</h4>
                              <p className="order-preview-variant">{item.variant}</p>
                            </div>
                            <span className="order-preview-price">${item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="order-card-footer">
                        <span className="order-total-label">Total: <strong>${ord.total.toLocaleString()}</strong></span>
                        <Button
                          variant="secondary"
                          className="order-track-btn"
                          onClick={() => {
                            if (onSelectOrder) onSelectOrder(ord);
                            onNavigate('order-tracking');
                          }}
                        >
                          <ExternalLink size={14} />
                          <span>Track Delivery</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <section className="account-section font-ui">
                <h2 className="account-section-title">Client Profile Details</h2>
                <div className="form-grid-2" style={{ marginTop: '20px' }}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue={currentUser.firstName} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue={currentUser.lastName} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label>Primary Email</label>
                  <input type="email" defaultValue={currentUser.email} disabled />
                </div>
                <div style={{ marginTop: '20px' }}>
                  <Button variant="primary">Update Profile</Button>
                </div>
              </section>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <section className="account-section font-ui">
                <h2 className="account-section-title">Curated Wishlist (5 Items)</h2>
                <p style={{ color: 'var(--color-stone-500)', marginTop: '8px' }}>Your curated collection of favorite mechanical references.</p>
                <div style={{ marginTop: '20px' }}>
                  <Button variant="primary" onClick={() => onNavigate('collections')}>
                    Browse All Collections
                  </Button>
                </div>
              </section>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <section className="account-section font-ui">
                <h2 className="account-section-title">Registered Residence & Delivery</h2>
                <div className="account-address-card" style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '16px'
                }}>
                  <h4 className="font-ui" style={{ fontWeight: 600 }}>{currentUser.firstName} {currentUser.lastName} (Primary)</h4>
                  <p>45 Lake Geneva Boulevard, Suite 12</p>
                  <p>1204 Genève, Switzerland</p>
                  <p style={{ marginTop: '8px', color: 'var(--color-warm-400)', fontSize: '12px' }}>Primary Insured Delivery Location</p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
