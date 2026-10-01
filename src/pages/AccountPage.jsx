import React, { useState } from 'react';
import { User, Package, Heart, MapPin, CreditCard, Settings, HelpCircle, ExternalLink } from 'lucide-react';
import { sampleOrders } from '../data/allProductsData';
import Button from '../components/ui/Button';

export default function AccountPage({ onNavigate, onSelectOrder }) {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="page-account">
      <div className="container">
        <div className="account-layout">
          {/* Left Sidebar Navigation */}
          <aside className="account-sidebar">
            <div className="account-user-card font-ui">
              <div className="account-avatar">AS</div>
              <div className="account-user-info">
                <h3 className="account-user-name">Arjun Sharma</h3>
                <p className="account-user-email">arjun@example.com</p>
              </div>
            </div>

            <nav className="account-nav-list font-ui">
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'profile' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} /> Profile
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'orders' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={16} /> Orders
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'wishlist' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={16} /> Wishlist
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'addresses' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin size={16} /> Addresses
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'payments' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('payments')}
              >
                <CreditCard size={16} /> Payment Methods
              </button>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'settings' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={16} /> Settings
              </button>
              <button
                type="button"
                className={`account-nav-item`}
                onClick={() => onNavigate('support')}
              >
                <HelpCircle size={16} /> Support & FAQ
              </button>
            </nav>
          </aside>

          {/* Right Main Dashboard Area */}
          <main className="account-main">
            <div className="account-header">
              <h1 className="account-welcome font-display">Welcome back, Arjun</h1>
              <p className="account-sub font-ui">Manage your orders, collection portfolio, and account settings.</p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="account-metrics-grid font-ui">
              <div className="account-metric-card">
                <span className="metric-num">3</span>
                <span className="metric-label">Total Timepieces</span>
              </div>
              <div className="account-metric-card">
                <span className="metric-num">5</span>
                <span className="metric-label">Wishlist Curations</span>
              </div>
              <div className="account-metric-card">
                <span className="metric-num">250</span>
                <span className="metric-label">Collector Tier Points</span>
              </div>
            </div>

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <section className="account-section">
                <div className="account-section-header">
                  <h2 className="account-section-title font-ui">Recent Orders</h2>
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

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <section className="account-section font-ui">
                <h2 className="account-section-title">Saved Wishlist (5 Items)</h2>
                <p style={{ color: 'var(--color-stone-500)', marginTop: '8px' }}>Your curated collection of favorite timepieces is saved.</p>
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
                <h2 className="account-section-title">Saved Shipping Address</h2>
                <div className="account-address-card">
                  <h4 className="font-ui" style={{ fontWeight: 600 }}>Arjun Sharma (Primary)</h4>
                  <p>123, MG Road</p>
                  <p>Pune, Maharashtra - 411001</p>
                  <p>India</p>
                  <p style={{ marginTop: '8px', color: 'var(--color-stone-400)' }}>Phone: +91 98765 43210</p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
