"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import IconButton from '../ui/IconButton';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { authService } from '../../services/authService';

export default function Header() {
  const pathname = usePathname();
  const { totalCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  const isDarkTop = pathname === '/' && !isScrolled;

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    setMounted(true);
    setCurrentUser(authService.getCurrentUser());

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
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: "Men's", href: '/collections?gender=Men' },
    { label: "Women's", href: '/collections?gender=Women' },
    { label: 'About Atelier', href: '/about' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'Brand Story', href: '/story' },
    { label: 'Track Order', href: '/order-tracking' },
    { label: 'Support', href: '/support' },
  ];

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
            <Link
              href="/"
              className="brand-logo font-ui"
              aria-label="REVERIE Homepage"
            >
              <span className="brand-wordmark">R E V E R I E</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="site-header-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navItems.slice(0, 5).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label} className="nav-item">
                    <Link
                      href={item.href}
                      className={`nav-link font-ui ${isActive ? 'nav-link--active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions / Utility */}
          <div className="site-header-actions">
            <Link href="/collections" aria-label="Search timepieces">
              <IconButton
                icon={<Search size={18} strokeWidth={1.5} />}
                label="Search timepieces"
                variant={isDarkTop ? 'light' : 'dark'}
              />
            </Link>

            <Link href="/wishlist" aria-label="Curated Wishlist">
              <IconButton
                icon={<Heart size={18} strokeWidth={1.5} />}
                label="Curated Wishlist"
                badge={mounted ? wishlistCount : 0}
                variant={isDarkTop ? 'light' : 'dark'}
              />
            </Link>

            {mounted && currentUser ? (
              <Link href="/account" aria-label="My Account" className="desktop-only">
                <button
                  type="button"
                  className="header-user-btn font-ui"
                  title={`Logged in as ${currentUser.firstName} ${currentUser.lastName}`}
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
              </Link>
            ) : (
              <Link href="/account" aria-label="My Account" className="desktop-only">
                <IconButton
                  icon={<User size={18} strokeWidth={1.5} />}
                  label="Sign In / Register"
                  variant={isDarkTop ? 'light' : 'dark'}
                />
              </Link>
            )}

            <Link href="/cart" aria-label="Shopping Bag">
              <IconButton
                icon={<ShoppingBag size={18} strokeWidth={1.5} />}
                label="Shopping Bag"
                badge={mounted ? totalCartCount : 0}
                variant={isDarkTop ? 'light' : 'dark'}
              />
            </Link>

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
                <Link
                  href={item.href}
                  className="mobile-nav-link font-ui"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="mobile-nav-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            href="/account"
            className="mobile-drawer-account font-ui"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={16} strokeWidth={1.5} />
            <span>{currentUser ? `${currentUser.firstName} (${currentUser.role || 'Member'})` : 'Sign In / Register'}</span>
          </Link>
          <p className="mobile-drawer-meta font-ui">
            Swiss Precision • Haute Horlogerie
          </p>
        </div>
      </aside>
    </>
  );
}
