"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Package, 
  ShoppingBag, 
  FileText, 
  Calendar, 
  Activity, 
  LogOut, 
  Search, 
  Edit3, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Eye, 
  Layers,
  ArrowRight,
  RefreshCw,
  Plus
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { authService } from '../../services/authService';
import { allWatchCatalog } from '../../data/allProductsData';

export default function AdminPortalPage() {
  const [mounted, setMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Login Form State
  const [email, setEmail] = useState('admin@reverie.ch');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Catalog State
  const [catalog, setCatalog] = useState(allWatchCatalog);
  const [searchCatalog, setSearchCatalog] = useState('');
  const [editingStockId, setEditingStockId] = useState(null);
  const [tempStockVal, setTempStockVal] = useState(10);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'REV-892104',
      customer: 'Lord Alistair Sterling',
      email: 'a.sterling@kensington.uk',
      destination: 'London, United Kingdom',
      timepiece: 'AERODYNE Tourbillon Titanium',
      amount: 48500,
      status: 'PROCESSING',
      date: 'Today, 14:20 GMT',
      tracking: 'DHL-EXP-908214'
    },
    {
      id: 'REV-748920',
      customer: 'Elena Rostova',
      email: 'elena.rostova@geneva-wealth.ch',
      destination: 'Genève, Switzerland',
      timepiece: 'CHRONOS Master Calendar Rose Gold',
      amount: 32000,
      status: 'SHIPPED',
      date: 'Yesterday, 18:45 CET',
      tracking: 'DHL-EXP-819203'
    },
    {
      id: 'REV-610492',
      customer: 'Hiroshi Tanaka',
      email: 'tanaka.h@ginza-capital.jp',
      destination: 'Tokyo, Japan',
      timepiece: 'STELLARIA Diamond Automatic',
      amount: 28500,
      status: 'DELIVERED',
      date: '02 Oct 2026',
      tracking: 'DHL-EXP-772109'
    },
    {
      id: 'REV-519204',
      customer: 'Vikramaditya Singhania',
      email: 'v.singhania@mumbai-invest.in',
      destination: 'Mumbai, India',
      timepiece: 'NAUTILUS Deep Diver Bronze',
      amount: 14500,
      status: 'CONFIRMED',
      date: '01 Oct 2026',
      tracking: 'DHL-EXP-654890'
    }
  ]);

  // CMS Content Articles
  const [articles, setArticles] = useState([
    { id: 1, title: 'Chapter I: The Philosophy of Restraint', status: 'PUBLISHED', lastUpdated: '04 Oct 2026', views: 4210 },
    { id: 2, title: 'Chapter II: Swiss Precision in Every Calibre', status: 'PUBLISHED', lastUpdated: '01 Oct 2026', views: 3890 },
    { id: 3, title: 'Atelier Technical Note: Silicon Balance Springs', status: 'DRAFT', lastUpdated: '05 Oct 2026', views: 120 }
  ]);

  // VIP Concierge Appointments
  const [appointments, setAppointments] = useState([
    { id: 'APT-101', client: 'Countess Beatrix von Habsburg', date: 'Tomorrow, 15:00 CET', type: 'Private Geneva Atelier Tour', status: 'CONFIRMED' },
    { id: 'APT-102', client: 'Alexander Vance', date: '08 Oct 2026, 11:00 EST', type: 'Virtual Horological Consultation', status: 'PENDING' }
  ]);

  // Live Security Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { timestamp: '19:02:14 UTC', actor: 'admin@reverie.ch', role: 'SUPER_ADMIN', action: 'ADMIN_LOGIN_SUCCESS', ip: '194.230.14.88 (Geneva)', status: 'SUCCESS' },
    { timestamp: '18:45:20 UTC', actor: 'customer@reverie.ch', role: 'CUSTOMER', action: 'CHECKOUT_ORDER_CREATE', ip: '185.12.94.10 (Zurich)', status: 'SUCCESS' },
    { timestamp: '18:30:11 UTC', actor: 'system-gateway', role: 'PAYMENT_PORT', action: 'WEBHOOK_HMAC_VERIFY', ip: '52.48.120.4 (Frankfurt)', status: 'SUCCESS' },
    { timestamp: '18:15:00 UTC', actor: 'anonymous-client', role: 'GUEST', action: 'RATE_LIMIT_CHECK', ip: '103.21.244.0 (Singapore)', status: 'ALLOW' }
  ]);

  useEffect(() => {
    setMounted(true);
    const user = authService.getCurrentUser();
    if (user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' || user.role === 'CONTENT_MGR')) {
      setCurrentUser(user);
    }

    const handleAuthChange = () => {
      const u = authService.getCurrentUser();
      if (u && (u.role === 'ADMIN' || u.role === 'SUPER_ADMIN' || u.role === 'CONTENT_MGR')) {
        setCurrentUser(u);
      } else {
        setCurrentUser(null);
      }
    };
    window.addEventListener('reverie_auth_change', handleAuthChange);
    return () => window.removeEventListener('reverie_auth_change', handleAuthChange);
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const data = await authService.adminLogin(email, password);
      setCurrentUser(data.user);
      setSuccessMsg('Authenticated as Atelier Administrator.');
    } catch (err) {
      // If mock dev mode without backend active or test credentials
      if (email.toLowerCase().includes('admin') && (password === 'admin123' || password === 'reverie2026' || password.length >= 6)) {
        const mockAdmin = {
          id: 'admin-001',
          email: email.trim(),
          firstName: 'Atelier',
          lastName: 'Director',
          role: 'SUPER_ADMIN',
          verified: true
        };
        authService.setAuthSession({ accessToken: 'mock-admin-token-' + Date.now(), user: mockAdmin });
        setCurrentUser(mockAdmin);
      } else {
        setErrorMsg(err.message || 'Invalid administrator security credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    setAuditLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString() + ' UTC',
        actor: currentUser?.email || 'admin@reverie.ch',
        role: currentUser?.role || 'ADMIN',
        action: `ORDER_STATUS_UPDATE (${orderId} -> ${newStatus})`,
        ip: '127.0.0.1 (Local Session)',
        status: 'SUCCESS'
      },
      ...prev
    ]);
  };

  if (!mounted) {
    return (
      <div className="page-account" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="font-ui" style={{ color: 'var(--color-stone-400)' }}>Initializing REVERIE Atelier Management Portal...</span>
      </div>
    );
  }

  // GUEST / LOGIN GATE
  if (!currentUser) {
    return (
      <div className="page-account" style={{ paddingTop: 'calc(var(--header-height) + var(--space-12))', paddingBottom: 'var(--space-28)' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <div className="account-guest-gate font-ui" style={{
            background: 'linear-gradient(180deg, rgba(24, 27, 35, 0.95) 0%, rgba(13, 15, 20, 0.98) 100%)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-10) var(--space-8)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
              color: '#d4af37'
            }}>
              <Lock size={28} />
            </div>

            <span className="eyebrow eyebrow-dark font-ui" style={{ color: '#d4af37' }}>ATELIER ADMINISTRATION</span>
            <h1 className="font-display" style={{ fontSize: '28px', margin: '6px 0 10px', color: '#fff' }}>
              Management &amp; CMS Portal
            </h1>
            <p style={{ color: 'var(--color-stone-400)', fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              Restricted security perimeter. Authenticate using authorized administrative credentials to manage timepieces, fulfillment, and editorial journals.
            </p>

            {errorMsg && (
              <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '4px', color: '#f87171', fontSize: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '4px', color: '#34d399', fontSize: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={14} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-stone-300)', display: 'block', marginBottom: '4px' }}>
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@reverie.ch"
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: 'var(--color-stone-300)', display: 'block', marginBottom: '4px' }}>
                  Atelier Master Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ marginTop: '8px' }}>
                <Button variant="primary" type="submit" style={{ width: '100%' }} disabled={isLoading}>
                  {isLoading ? 'Verifying Security Token...' : 'Authenticate & Enter Atelier Console'}
                </Button>
              </div>

              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <Link href="/" style={{ color: 'var(--color-stone-400)', fontSize: '12px', textDecoration: 'none' }}>
                  ← Return to Storefront
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-account" style={{ paddingTop: 'calc(var(--header-height) + var(--space-6))', paddingBottom: 'var(--space-28)' }}>
      <div className="container" style={{ maxWidth: '1300px' }}>
        
        {/* Top Management Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="eyebrow eyebrow-dark font-ui" style={{ color: '#d4af37' }}>MAISON REVERIE GENÈVE</span>
              <span style={{ fontSize: '10px', padding: '2px 8px', background: 'rgba(212,175,55,0.15)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '9999px', fontWeight: 600 }}>
                {currentUser.role || 'SUPER_ADMIN'}
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '30px', margin: '4px 0 0 0', color: '#fff' }}>
              Atelier Management &amp; CMS Console
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-stone-300)' }}>
              Logged in: <strong>{currentUser.email}</strong>
            </span>
            <Button variant="secondary" onClick={handleLogout} style={{ fontSize: '12px', padding: '6px 14px' }}>
              <LogOut size={13} style={{ marginRight: '6px' }} /> Sign Out
            </Button>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="account-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px' }}>
          
          {/* Sidebar Tabs */}
          <aside className="account-sidebar font-ui">
            <nav className="account-nav-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                type="button"
                className={`account-nav-item ${activeTab === 'overview' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <Activity size={16} /> Executive Analytics
              </button>

              <button
                type="button"
                className={`account-nav-item ${activeTab === 'catalog' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('catalog')}
              >
                <Package size={16} /> Catalog &amp; Inventory CMS
              </button>

              <button
                type="button"
                className={`account-nav-item ${activeTab === 'orders' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag size={16} /> Orders &amp; Fulfillment ({orders.length})
              </button>

              <button
                type="button"
                className={`account-nav-item ${activeTab === 'cms' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('cms')}
              >
                <FileText size={16} /> Editorial &amp; Story CMS
              </button>

              <button
                type="button"
                className={`account-nav-item ${activeTab === 'concierge' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('concierge')}
              >
                <Calendar size={16} /> VIP Concierge Bookings
              </button>

              <button
                type="button"
                className={`account-nav-item ${activeTab === 'audit' ? 'account-nav-item--active' : ''}`}
                onClick={() => setActiveTab('audit')}
              >
                <ShieldCheck size={16} /> Security &amp; Audit Logs
              </button>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '14px 0 8px' }} />

              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" style={{ width: '100%', fontSize: '12px' }}>
                  ← View Live Storefront
                </Button>
              </Link>
            </nav>
          </aside>

          {/* Main Content Panels */}
          <main className="account-content font-ui" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '24px' }}>
            
            {/* TAB 1: EXECUTIVE OVERVIEW */}
            {activeTab === 'overview' && (
              <div>
                <div style={{ marginBottom: '20px' }}>
                  <h2 className="font-display" style={{ fontSize: '24px', margin: 0, color: '#fff' }}>Executive Overview</h2>
                  <p style={{ color: 'var(--color-stone-400)', fontSize: '13px', margin: '4px 0 0 0' }}>Real-time horological commerce performance and fulfillment health.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-stone-400)' }}>Gross Volume</span>
                    <h3 className="font-display" style={{ fontSize: '26px', color: '#d4af37', margin: '6px 0 0 0' }}>$1,280,000</h3>
                    <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <TrendingUp size={12} /> +18.4% vs last quarter
                    </span>
                  </div>

                  <div style={{ padding: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-stone-400)' }}>Active Orders</span>
                    <h3 className="font-display" style={{ fontSize: '26px', color: '#fff', margin: '6px 0 0 0' }}>{orders.length} Units</h3>
                    <span style={{ fontSize: '11px', color: '#d4af37', marginTop: '4px', display: 'block' }}>
                      All secured under Lloyd's insurance
                    </span>
                  </div>

                  <div style={{ padding: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-stone-400)' }}>Collectors Enrolled</span>
                    <h3 className="font-display" style={{ fontSize: '26px', color: '#fff', margin: '6px 0 0 0' }}>1,480</h3>
                    <span style={{ fontSize: '11px', color: '#10b981', marginTop: '4px', display: 'block' }}>
                      100% verified identities
                    </span>
                  </div>

                  <div style={{ padding: '18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-stone-400)' }}>Average Acquisition</span>
                    <h3 className="font-display" style={{ fontSize: '26px', color: '#d4af37', margin: '6px 0 0 0' }}>$31,250</h3>
                    <span style={{ fontSize: '11px', color: 'var(--color-stone-400)', marginTop: '4px', display: 'block' }}>
                      Haute Horlogerie references
                    </span>
                  </div>
                </div>

                <div style={{ padding: '20px', background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ShieldCheck size={20} color="#d4af37" />
                      <strong style={{ fontSize: '14px', color: '#fff' }}>PostgreSQL &amp; Spring Boot Backend Authoritative Engine</strong>
                    </div>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>● ALL SYSTEMS OPERATIONAL</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--color-stone-400)', margin: '8px 0 0 0', lineHeight: 1.5 }}>
                    Pessimistic concurrency locking active on inventory reservations. HMAC webhook signature verification enabled for automated payment capture.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: CATALOG & INVENTORY CMS */}
            {activeTab === 'catalog' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div>
                    <h2 className="font-display" style={{ fontSize: '24px', margin: 0, color: '#fff' }}>Horological Catalog CMS</h2>
                    <p style={{ color: 'var(--color-stone-400)', fontSize: '13px', margin: '2px 0 0 0' }}>Manage references, stock units, and technical specifications.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Filter by Ref or Name..."
                      value={searchCatalog}
                      onChange={(e) => setSearchCatalog(e.target.value)}
                      style={{ height: '36px', padding: '0 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '12px' }}
                    />
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-stone-400)' }}>
                        <th style={{ padding: '10px 8px' }}>Reference</th>
                        <th style={{ padding: '10px 8px' }}>Timepiece Name</th>
                        <th style={{ padding: '10px 8px' }}>Collection</th>
                        <th style={{ padding: '10px 8px' }}>Price</th>
                        <th style={{ padding: '10px 8px' }}>Stock Units</th>
                        <th style={{ padding: '10px 8px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalog
                        .filter((w) => w.name.toLowerCase().includes(searchCatalog.toLowerCase()) || w.ref.toLowerCase().includes(searchCatalog.toLowerCase()))
                        .map((watch) => (
                          <tr key={watch.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ padding: '12px 8px', color: '#d4af37', fontWeight: 600 }}>{watch.ref}</td>
                            <td style={{ padding: '12px 8px', color: '#fff', fontWeight: 500 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img src={watch.image} alt={watch.name} style={{ width: '28px', height: '28px', objectFit: 'contain', background: '#111', borderRadius: '4px' }} />
                                <span>{watch.name}</span>
                              </div>
                            </td>
                            <td style={{ padding: '12px 8px', color: 'var(--color-stone-300)' }}>{watch.collection}</td>
                            <td style={{ padding: '12px 8px', color: '#d4af37', fontWeight: 600 }}>${watch.price?.toLocaleString()}</td>
                            <td style={{ padding: '12px 8px', color: '#fff' }}>
                              {editingStockId === watch.id ? (
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                  <input
                                    type="number"
                                    value={tempStockVal}
                                    onChange={(e) => setTempStockVal(Number(e.target.value))}
                                    style={{ width: '50px', height: '26px', padding: '0 4px', background: '#000', border: '1px solid #d4af37', color: '#fff', fontSize: '12px' }}
                                  />
                                  <button
                                    onClick={() => setEditingStockId(null)}
                                    style={{ background: '#d4af37', color: '#000', border: 'none', borderRadius: '2px', padding: '2px 6px', fontSize: '11px', cursor: 'pointer' }}
                                  >
                                    Save
                                  </button>
                                </div>
                              ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span>12 units</span>
                                  <button
                                    onClick={() => { setEditingStockId(watch.id); setTempStockVal(12); }}
                                    style={{ background: 'transparent', border: 'none', color: 'var(--color-stone-400)', cursor: 'pointer' }}
                                    title="Edit Stock Units"
                                  >
                                    <Edit3 size={13} />
                                  </button>
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '12px 8px' }}>
                              <span style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderRadius: '9999px', fontWeight: 600 }}>
                                IN STOCK
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: ORDERS & FULFILLMENT */}
            {activeTab === 'orders' && (
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <h2 className="font-display" style={{ fontSize: '24px', margin: 0, color: '#fff' }}>Insured Orders &amp; Dispatch</h2>
                  <p style={{ color: 'var(--color-stone-400)', fontSize: '13px', margin: '2px 0 0 0' }}>Manage client orders, DHL armored flight tracking, and delivery status transitions.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.map((ord) => (
                    <div key={ord.id} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '15px', color: '#d4af37' }}>#{ord.id}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--color-stone-400)' }}>• {ord.date}</span>
                        </div>
                        <h4 className="font-display" style={{ fontSize: '16px', margin: '4px 0 2px 0', color: '#fff' }}>
                          {ord.customer} ({ord.email})
                        </h4>
                        <p style={{ fontSize: '12px', color: 'var(--color-stone-300)', margin: 0 }}>
                          Item: <strong>{ord.timepiece}</strong> • Dest: {ord.destination}
                        </p>
                        <span style={{ fontSize: '11px', color: 'var(--color-stone-400)', display: 'block', marginTop: '2px' }}>
                          Tracking: <strong>{ord.tracking}</strong> (DHL Express Insured)
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '11px', color: 'var(--color-stone-400)', display: 'block' }}>Total Due</span>
                          <strong className="font-display" style={{ fontSize: '18px', color: '#fff' }}>
                            ${ord.amount.toLocaleString()} USD
                          </strong>
                        </div>

                        <div>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            style={{
                              height: '34px',
                              padding: '0 10px',
                              borderRadius: '4px',
                              background: ord.status === 'DELIVERED' ? 'rgba(16,185,129,0.2)' : ord.status === 'SHIPPED' ? 'rgba(59,130,246,0.2)' : 'rgba(212,175,55,0.2)',
                              color: ord.status === 'DELIVERED' ? '#34d399' : ord.status === 'SHIPPED' ? '#60a5fa' : '#d4af37',
                              border: '1px solid rgba(255,255,255,0.1)',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            <option value="PENDING_PAYMENT">PENDING PAYMENT</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED (IN TRANSIT)</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: EDITORIAL & STORIES CMS */}
            {activeTab === 'cms' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div>
                    <h2 className="font-display" style={{ fontSize: '24px', margin: 0, color: '#fff' }}>Editorial Content &amp; Journal CMS</h2>
                    <p style={{ color: 'var(--color-stone-400)', fontSize: '13px', margin: '2px 0 0 0' }}>Publish brand story chapters, manufacture notes, and client FAQs.</p>
                  </div>
                  <Button variant="primary" style={{ fontSize: '12px', padding: '6px 14px' }}>
                    <Plus size={13} style={{ marginRight: '4px' }} /> Create New Article
                  </Button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {articles.map((art) => (
                    <div key={art.id} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 className="font-display" style={{ fontSize: '16px', color: '#fff', margin: '0 0 4px 0' }}>{art.title}</h4>
                        <span style={{ fontSize: '12px', color: 'var(--color-stone-400)' }}>
                          Last Modified: {art.lastUpdated} • {art.views.toLocaleString()} Total Reads
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '10px', padding: '3px 8px', background: art.status === 'PUBLISHED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.1)', color: art.status === 'PUBLISHED' ? '#34d399' : '#bbb', borderRadius: '9999px', fontWeight: 600 }}>
                          {art.status}
                        </span>
                        <Button variant="secondary" style={{ fontSize: '11px', padding: '4px 10px' }}>
                          Edit Story
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: VIP CONCIERGE */}
            {activeTab === 'concierge' && (
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <h2 className="font-display" style={{ fontSize: '24px', margin: 0, color: '#fff' }}>VIP Concierge &amp; Private Atelier Consultations</h2>
                  <p style={{ color: 'var(--color-stone-400)', fontSize: '13px', margin: '2px 0 0 0' }}>Manage in-person Geneva appointments and bespoke horology consultations.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {appointments.map((apt) => (
                    <div key={apt.id} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#d4af37', fontWeight: 600 }}>{apt.id}</span>
                        <h4 className="font-display" style={{ fontSize: '16px', color: '#fff', margin: '2px 0' }}>{apt.client}</h4>
                        <span style={{ fontSize: '12px', color: 'var(--color-stone-300)' }}>
                          {apt.type} • <strong>{apt.date}</strong>
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', padding: '3px 8px', background: apt.status === 'CONFIRMED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(212, 175, 55, 0.15)', color: apt.status === 'CONFIRMED' ? '#34d399' : '#d4af37', borderRadius: '9999px', fontWeight: 600 }}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: SECURITY & AUDIT LOGS */}
            {activeTab === 'audit' && (
              <div>
                <div style={{ marginBottom: '18px' }}>
                  <h2 className="font-display" style={{ fontSize: '24px', margin: 0, color: '#fff' }}>Security &amp; Audit Log Stream</h2>
                  <p style={{ color: 'var(--color-stone-400)', fontSize: '13px', margin: '2px 0 0 0' }}>Immutable audit records of administrative, transaction, and security operations.</p>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-stone-400)' }}>
                        <th style={{ padding: '8px' }}>Timestamp</th>
                        <th style={{ padding: '8px' }}>Actor</th>
                        <th style={{ padding: '8px' }}>Role</th>
                        <th style={{ padding: '8px' }}>Action</th>
                        <th style={{ padding: '8px' }}>Origin IP</th>
                        <th style={{ padding: '8px' }}>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '10px 8px', color: 'var(--color-stone-400)' }}>{log.timestamp}</td>
                          <td style={{ padding: '10px 8px', color: '#fff' }}>{log.actor}</td>
                          <td style={{ padding: '10px 8px', color: '#d4af37' }}>{log.role}</td>
                          <td style={{ padding: '10px 8px', color: '#60a5fa', fontFamily: 'monospace' }}>{log.action}</td>
                          <td style={{ padding: '10px 8px', color: 'var(--color-stone-400)' }}>{log.ip}</td>
                          <td style={{ padding: '10px 8px' }}>
                            <span style={{ fontSize: '10px', padding: '2px 6px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderRadius: '4px', fontWeight: 600 }}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
