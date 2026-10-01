"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, Heart, MapPin, CreditCard, Settings, HelpCircle, ExternalLink } from 'lucide-react';
import { sampleOrders } from '../../data/allProductsData';
import Button from '../../components/ui/Button';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="page-account">
      <div className="container">
        <div className="account-layout">
          {/* Left Sidebar Navigation */}
          <aside className="account-sidebar">
            <div className="account-user-card font-ui">
              <div className="account-avatar">VK</div>
              <div className="account-user-info">
                <h3 className="account-user-name">Vinay Kounchi</h3>
                <p className="account-user-email">vinay@reverie.ch</p>
                <span className="account-collector-tier">Patron Horloger</span>
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
                <h2 className="account-pane-title font-display">Client Profile</h2>
                <div className="checkout-form-grid" style={{ marginTop: '24px' }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="Vinay Kounchi" />
                  </div>
                  <div className="form-group">
                    <label>Primary Email</label>
                    <input type="email" defaultValue="vinay@reverie.ch" />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input type="text" defaultValue="+41 22 555 0192" />
                  </div>
                  <div className="form-group">
                    <label>Preferred Language</label>
                    <input type="text" defaultValue="English (International)" />
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
                  <Button variant="primary" href="/collections" arrow>
                    Browse Collections
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="account-addresses-pane">
                <h2 className="account-pane-title font-display">Registered Addresses</h2>
                <div className="checkout-mini-item" style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                  <div>
                    <strong>Default Residence</strong>
                    <p style={{ margin: '4px 0', opacity: 0.8 }}>45 Lake Geneva Boulevard, Apt 12, 1204 Gen�ve, Switzerland</p>
                    <span style={{ fontSize: '12px', color: '#d4af37' }}>Primary Delivery Location</span>
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
