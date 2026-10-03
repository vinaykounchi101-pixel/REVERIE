import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, LogIn } from 'lucide-react';
import { authService } from '../../services/authService';
import AuthModal from '../auth/AuthModal';
import IconButton from '../ui/IconButton';

export default function Header({ cartCount = 0, currentPage = 'home', onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // In dark-themed views or when at the top of homepage, show light text
  const isDarkTop = currentPage === 'home' && !isScrolled;

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(authService.getCurrentUser());
    };
    window.addEventListener('reverie_auth_change', handleAuthChange);
    return () => window.removeEventListener('reverie_auth_change', handleAuthChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Collections', page: 'collections', gender: 'All' },
    { label: "Men's Horology", page: 'collections', gender: 'Men' },
    { label: "Women's Horology", page: 'collections', gender: 'Women' },
    { label: 'About', page: 'about' },
    { label: 'Track Order', page: 'order-tracking' },
    { label: 'Support', page: 'support' },
  ];

  const handleNav = (item) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      if (typeof item === 'string') {
        onNavigate(item);
      } else {
        onNavigate(item.page, item.gender ? { gender: item.gender } : {});
      }
    }
  };

  const userInitials = currentUser
    ? `${(currentUser.firstName || 'C')[0]}${(currentUser.lastName || 'M')[0]}`.toUpperCase()
    : null;

  return (
    <>
      <header
        className={`site-header ${
          isDarkTop ? 'site-header--transparent' : 'site-header--scrolled'
        }`}
      >
        <div className="site-header-inner container">
          {/* Brand Wordmark */}
          <div className="site-header-brand">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="brand-logo font-ui"
              aria-label="REVERIE Homepage"
            >
              <span className="brand-wordmark">R E V E R I E</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="site-header-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.label} className="nav-item">
                  <button
                    type="button"
                    onClick={() => handleNav(item)}
                    className={`nav-link font-ui ${
                      currentPage === item.page ? 'nav-link--active' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions / Utility */}
          <div className="site-header-actions">
            <IconButton
              icon={<Search size={18} strokeWidth={1.5} />}
              label="Search timepieces"
              variant={isDarkTop ? 'light' : 'dark'}
              onClick={() => handleNav({ page: 'collections', gender: 'All' })}
            />

            {/* Account / User Button with Authenticated Indicator */}
            {currentUser ? (
              <button
                type="button"
                className="header-user-btn font-ui"
                title={`Logged in as ${currentUser.firstName} ${currentUser.lastName}`}
                onClick={() => handleNav('account')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-warm-400)',
                  color: 'var(--color-black-900)',
                  fontWeight: 600,
                  fontSize: '11px',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '4px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
              >
                {userInitials}
              </button>
            ) : (
              <IconButton
                icon={<User size={18} strokeWidth={1.5} />}
                label="Sign In / Register"
                variant={isDarkTop ? 'light' : 'dark'}
                className="desktop-only"
                onClick={() => handleNav('account')}
              />
            )}

            <IconButton
              icon={<ShoppingBag size={18} strokeWidth={1.5} />}
              label="Shopping Bag"
              badge={cartCount}
              variant={isDarkTop ? 'light' : 'dark'}
              onClick={() => handleNav('cart')}
            />

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className={`mobile-menu-btn ${
                isDarkTop ? 'mobile-menu-btn--light' : 'mobile-menu-btn--dark'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-drawer-backdrop ${
          mobileMenuOpen ? 'mobile-drawer-backdrop--open' : ''
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />

      <aside
        className={`mobile-drawer ${
          mobileMenuOpen ? 'mobile-drawer--open' : ''
        }`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <span className="brand-wordmark font-ui">R E V E R I E</span>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="mobile-nav-item">
                <button
                  type="button"
                  className="mobile-nav-link font-ui"
                  style={{ width: '100%', textAlign: 'left' }}
                  onClick={() => handleNav(item)}
                >
                  <span>{item.label}</span>
                  <span className="mobile-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <button
            type="button"
            className="mobile-drawer-account font-ui"
            style={{ width: '100%', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
            onClick={() => handleNav('account')}
          >
            <User size={16} strokeWidth={1.5} />
            <span>{currentUser ? `${currentUser.firstName} (${currentUser.role || 'Member'})` : 'Sign In / Register'}</span>
          </button>
          <p className="mobile-drawer-meta font-ui">
            Swiss Precision • Est. 2026
          </p>
        </div>
      </aside>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </>
  );
}

