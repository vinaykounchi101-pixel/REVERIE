"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Package, Heart, MapPin, CreditCard, Settings, HelpCircle, ExternalLink, LogOut, ShieldCheck, Info, Clock, Sparkles, Compass } from 'lucide-react';
import { sampleOrders } from '../../data/allProductsData';
import { authService } from '../../services/authService';
import { customerService } from '../../services/customerService';
import { orderService } from '../../services/orderService';
import AuthModal from '../../components/auth/AuthModal';
import Button from '../../components/ui/Button';
import { useWishlist } from '../../context/WishlistContext';

export default function AccountPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { wishlistItems, wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('orders');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userOrders, setUserOrders] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [newAddrFormOpen, setNewAddrFormOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: 'New Address',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    country: 'Switzerland',
    postalCode: '',
  });

  useEffect(() => {
    setMounted(true);
    const user = authService.getCurrentUser();
    setCurrentUser(user);

    if (user) {
      orderService.getMyOrders().then((ords) => {
        if (ords && ords.length > 0) setUserOrders(ords);
        else setUserOrders(sampleOrders);
      });
      customerService.getAddresses().then((addrs) => {
        if (addrs && addrs.length > 0) setUserAddresses(addrs);
      });
    }

    const handleAuthChange = () => {
      const updatedUser = authService.getCurrentUser();
      setCurrentUser(updatedUser);
      if (updatedUser) {
        orderService.getMyOrders().then((ords) => {
          if (ords && ords.length > 0) setUserOrders(ords);
        });
        customerService.getAddresses().then((addrs) => {
          if (addrs && addrs.length > 0) setUserAddresses(addrs);
        });
      }
    };
    window.addEventListener('reverie_auth_change', handleAuthChange);
    return () => window.removeEventListener('reverie_auth_change', handleAuthChange);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const saved = await customerService.addAddress(newAddr);
    if (saved) {
      setUserAddresses((prev) => [...prev, saved]);
      setNewAddrFormOpen(false);
      setNewAddr({
        title: 'New Address',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        country: 'Switzerland',
        postalCode: '',
      });
    }
  };

  if (!mounted) {
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
            <span className="eyebrow eyebrow-light font-ui">COLLECTOR PORTAL</span>
            <h1 className="font-display" style={{ fontSize: '32px', margin: '8px 0 12px' }}>
              REVERIE Atelier
            </h1>
          </div>
        </div>
      </div>
    );
  }

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
                className={`account-nav-item ${activeTab === 'about' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <Info size={16} /> About Atelier &amp; Heritage
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
                  {userOrders.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p style={{ color: 'var(--color-stone-400)', marginBottom: '16px' }}>No past acquisitions found.</p>
                      <Link href="/collections">
                        <Button variant="primary" arrow>Explore Catalog</Button>
                      </Link>
                    </div>
                  ) : (
                    userOrders.map((ord) => (
                      <article key={ord.id || ord.orderId || ord.orderNumber} className="account-order-card">
                        <div className="account-order-header">
                          <div>
                            <span className="account-order-id">#{ord.orderId || ord.orderNumber || ord.id}</span>
                            <span className="account-order-date font-ui">{ord.date || ord.createdAt || 'Recent'}</span>
                          </div>
                          <span className={`account-order-status account-order-status--${(ord.status || 'PROCESSING').toLowerCase()}`}>
                            {ord.status || 'PROCESSING'}
                          </span>
                        </div>

                        <div className="account-order-body">
                          <div className="account-order-items">
                            {(ord.items || []).map((it, idx) => (
                              <div key={idx} className="account-order-item-row">
                                <span className="account-order-item-name font-display">{it.name || it.productName || 'REVERIE Chronometer'}</span>
                                <span className="account-order-item-qty">Qty: {it.qty || it.quantity || 1}</span>
                                <span className="account-order-item-price font-display">${((it.price || 1299) * (it.qty || it.quantity || 1)).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="account-order-footer">
                          <span className="account-order-total font-display">
                            Total: <strong>${(ord.total || ord.totalAmountPaise ? (ord.total || (ord.totalAmountPaise / 100)) : 1299).toLocaleString()}</strong>
                          </span>
                          <div className="account-order-actions">
                            <Link href={`/order-tracking?id=${ord.orderId || ord.orderNumber || ord.id}`}>
                              <Button variant="secondary" className="account-track-btn">
                                <span>Track Shipment</span>
                                <ExternalLink size={13} />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                  <div>
                    <h2 className="account-pane-title font-display">Your Curated Wishlist</h2>
                    <p className="account-pane-sub">Saved references and bespoke configurations ({wishlistCount} items).</p>
                  </div>
                  <Link href="/wishlist">
                    <Button variant="secondary" style={{ fontSize: '12px', padding: '6px 14px' }}>
                      Open Dedicated Wishlist View
                    </Button>
                  </Link>
                </div>

                {wishlistCount === 0 ? (
                  <div style={{ padding: '32px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ color: 'var(--color-stone-400)', marginBottom: '16px' }}>You have not saved any timepieces yet.</p>
                    <Link href="/collections">
                      <Button variant="primary" arrow>Browse Collections</Button>
                    </Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                    {wishlistItems.map((w) => (
                      <div key={w.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ aspectRatio: '1/1', background: 'radial-gradient(circle, #20242e 0%, #0d0f14 100%)', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                          <img src={w.image} alt={w.name} style={{ maxHeight: '80%', maxWidth: '80%', objectFit: 'contain' }} />
                        </div>
                        <span style={{ fontSize: '10px', color: '#d4af37', fontWeight: 600 }}>{w.ref}</span>
                        <h4 className="font-display" style={{ fontSize: '15px', margin: '2px 0 4px', color: 'var(--color-text-primary)' }}>{w.name}</h4>
                        <span style={{ fontSize: '14px', color: '#d4af37', fontWeight: 600, marginBottom: '10px' }}>${w.price?.toLocaleString()}</span>
                        <Link href={`/product/${w.id}`} style={{ marginTop: 'auto', textDecoration: 'none' }}>
                          <Button variant="secondary" style={{ width: '100%', fontSize: '11px', padding: '6px 0' }}>View Timepiece</Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="account-addresses-pane">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 className="account-pane-title font-display" style={{ margin: 0 }}>Registered Addresses</h2>
                  <Button variant="secondary" onClick={() => setNewAddrFormOpen(!newAddrFormOpen)} style={{ fontSize: '12px', padding: '6px 14px' }}>
                    {newAddrFormOpen ? 'Cancel' : '+ Add Address'}
                  </Button>
                </div>

                {newAddrFormOpen && (
                  <form onSubmit={handleAddAddress} style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="checkout-form-grid">
                      <div className="form-group">
                        <label>Address Title</label>
                        <input type="text" value={newAddr.title} onChange={(e) => setNewAddr({ ...newAddr, title: e.target.value })} placeholder="e.g. Primary Residence" required />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value={newAddr.phone} onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })} placeholder="+41 22 819 9000" />
                      </div>
                      <div className="form-group form-group--full">
                        <label>Street Address</label>
                        <input type="text" value={newAddr.address} onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })} placeholder="45 Lake Geneva Boulevard" required />
                      </div>
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} placeholder="Genève" required />
                      </div>
                      <div className="form-group">
                        <label>Postal Code</label>
                        <input type="text" value={newAddr.postalCode} onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })} placeholder="1204" required />
                      </div>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <Button variant="primary" type="submit">Save Address</Button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                  {userAddresses.length === 0 ? (
                    <div className="checkout-mini-item" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                      <div>
                        <strong>Default Residence</strong>
                        <p style={{ margin: '4px 0', opacity: 0.8 }}>45 Lake Geneva Boulevard, Apt 12, 1204 Genève, Switzerland</p>
                        <span style={{ fontSize: '12px', color: '#d4af37' }}>Primary Insured Delivery Location</span>
                      </div>
                    </div>
                  ) : (
                    userAddresses.map((addr, idx) => (
                      <div key={addr.id || idx} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <strong style={{ color: '#fff', fontSize: '14px' }}>{addr.title || `Address #${idx + 1}`}</strong>
                          {addr.isDefault && <span style={{ fontSize: '10px', color: '#d4af37', background: 'rgba(212,175,55,0.1)', padding: '2px 6px', borderRadius: '4px' }}>DEFAULT</span>}
                        </div>
                        <p style={{ margin: '8px 0', fontSize: '13px', color: 'var(--color-stone-400)', lineHeight: 1.5 }}>
                          {addr.address || addr.street} {addr.apartment ? `, ${addr.apartment}` : ''}<br />
                          {addr.city}, {addr.state} {addr.postalCode}<br />
                          {addr.country}
                        </p>
                        {addr.phone && <span style={{ fontSize: '12px', color: 'var(--color-stone-400)' }}>Phone: {addr.phone}</span>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="account-about-pane font-ui">
                <div className="account-pane-head" style={{ marginBottom: '24px' }}>
                  <span className="eyebrow eyebrow-light font-ui">MAISON REVERIE • GENÈVE</span>
                  <h2 className="account-pane-title font-display" style={{ fontSize: '28px', marginTop: '4px' }}>
                    About Our Haute Horlogerie Atelier
                  </h2>
                  <p className="account-pane-sub" style={{ color: 'var(--color-stone-400)', fontSize: '14px', lineHeight: 1.6 }}>
                    Founded on the shores of Lake Geneva, REVERIE represents the pinnacle of contemporary Swiss chronometric mastery and aesthetic restraint.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#d4af37' }}>
                      <Clock size={18} />
                      <strong style={{ fontSize: '14px', color: '#fff' }}>Swiss Chronometer</strong>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-stone-400)', lineHeight: 1.5, margin: 0 }}>
                      Every mechanical caliber is assembled by master watchmakers and tested in 5 positions to certified precision tolerances.
                    </p>
                  </div>

                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#d4af37' }}>
                      <ShieldCheck size={18} />
                      <strong style={{ fontSize: '14px', color: '#fff' }}>5-Year Global Warranty</strong>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-stone-400)', lineHeight: 1.5, margin: 0 }}>
                      Comprehensive atelier protection covering manufacture calibers, balance wheels, and sapphire crystal components.
                    </p>
                  </div>

                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#d4af37' }}>
                      <Compass size={18} />
                      <strong style={{ fontSize: '14px', color: '#fff' }}>Geneva Concierge</strong>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--color-stone-400)', lineHeight: 1.5, margin: 0 }}>
                      Dedicated horological advisors available for bespoke strap fittings, routine servicing, and international acquisitions.
                    </p>
                  </div>
                </div>

                <div style={{ padding: '24px', background: 'linear-gradient(180deg, rgba(212,175,55,0.06) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <h3 className="font-display" style={{ fontSize: '20px', color: '#fff', margin: '0 0 6px 0' }}>
                      Read the Complete Brand Story &amp; Manufacture Journal
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-stone-400)', margin: 0, maxWidth: '480px' }}>
                      Explore chapter archives, high-resolution movement macro photography, and the founding philosophy behind REVERIE.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link href="/about">
                      <Button variant="primary" arrow style={{ fontSize: '12px', padding: '8px 18px' }}>
                        Explore About Page
                      </Button>
                    </Link>
                    <Link href="/collections">
                      <Button variant="secondary" style={{ fontSize: '12px', padding: '8px 18px' }}>
                        View Catalog
                      </Button>
                    </Link>
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
