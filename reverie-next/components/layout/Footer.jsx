"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link
              href="/"
              className="footer-logo font-ui"
              style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}
            >
              R E V E R I E
            </Link>
            <p className="footer-tagline font-ui">
              Precision horology crafted for generations.
            </p>
            <div className="footer-meta font-ui">
              <span>Gen�ve, Switzerland</span>
              <span className="footer-meta-divider">�</span>
              <span>Haute Horlogerie</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav-grid">
            <div className="footer-nav-col">
              <h4 className="footer-col-title font-ui">Collections</h4>
              <ul className="footer-col-list">
                <li><Link href="/collections" className="footer-link font-ui">All Watches</Link></li>
                <li><Link href="/collections?gender=Men" className="footer-link font-ui">Men's Collection</Link></li>
                <li><Link href="/collections?gender=Women" className="footer-link font-ui">Women's Collection</Link></li>
                <li><Link href="/collections" className="footer-link font-ui">Chronograph</Link></li>
                <li><Link href="/collections" className="footer-link font-ui">Limited Editions</Link></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title font-ui">About & Atelier</h4>
              <ul className="footer-col-list">
                <li><Link href="/story" className="footer-link font-ui">Our Story</Link></li>
                <li><Link href="/story#craftsmanship" className="footer-link font-ui">Craftsmanship</Link></li>
                <li><Link href="/story" className="footer-link font-ui">Manufacture Atelier</Link></li>
                <li><Link href="/story" className="footer-link font-ui">Sustainability</Link></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title font-ui">Client Services</h4>
              <ul className="footer-col-list">
                <li><Link href="/order-tracking" className="footer-link font-ui">Track Your Order</Link></li>
                <li><Link href="/support" className="footer-link font-ui">Support & FAQ</Link></li>
                <li><Link href="/support" className="footer-link font-ui">Shipping & Returns</Link></li>
                <li><Link href="/support" className="footer-link font-ui">5-Year Warranty</Link></li>
                <li><Link href="/account" className="footer-link font-ui">Collector Account</Link></li>
                <li><Link href="/admin" className="footer-link font-ui">Atelier Portal (CMS)</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright font-ui">
            � {new Date().getFullYear()} REVERIE. All rights reserved. Handcrafted in Switzerland.
          </p>
          <div className="footer-legal">
            <Link href="/support" className="footer-legal-link font-ui">Privacy Policy</Link>
            <Link href="/support" className="footer-legal-link font-ui">Terms of Service</Link>
            <Link href="/support" className="footer-legal-link font-ui">Cookie Preferences</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
