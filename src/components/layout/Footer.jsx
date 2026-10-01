import React from 'react';

export default function Footer({ onNavigate }) {
  const handleNav = (page) => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="footer-logo font-ui"
              style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
            >
              R E V E R I E
            </button>
            <p className="footer-tagline font-ui">
              Precision horology crafted for generations.
            </p>
            <div className="footer-meta font-ui">
              <span>Genève, Switzerland</span>
              <span className="footer-meta-divider">•</span>
              <span>Haute Horlogerie</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav-grid">
            <div className="footer-nav-col">
              <h4 className="footer-col-title font-ui">Collections</h4>
              <ul className="footer-col-list">
                <li><button type="button" onClick={() => handleNav('collections')} className="footer-link font-ui">Classic</button></li>
                <li><button type="button" onClick={() => handleNav('collections')} className="footer-link font-ui">Sport</button></li>
                <li><button type="button" onClick={() => handleNav('collections')} className="footer-link font-ui">Heritage</button></li>
                <li><button type="button" onClick={() => handleNav('collections')} className="footer-link font-ui">Chronograph</button></li>
                <li><button type="button" onClick={() => handleNav('collections')} className="footer-link font-ui">Limited Editions</button></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title font-ui">About & Atelier</h4>
              <ul className="footer-col-list">
                <li><button type="button" onClick={() => handleNav('about')} className="footer-link font-ui">Our Story</button></li>
                <li><button type="button" onClick={() => handleNav('about')} className="footer-link font-ui">Craftsmanship</button></li>
                <li><button type="button" onClick={() => handleNav('about')} className="footer-link font-ui">Manufacture Atelier</button></li>
                <li><button type="button" onClick={() => handleNav('about')} className="footer-link font-ui">Sustainability</button></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title font-ui">Client Services</h4>
              <ul className="footer-col-list">
                <li><button type="button" onClick={() => handleNav('order-tracking')} className="footer-link font-ui">Track Your Order</button></li>
                <li><button type="button" onClick={() => handleNav('support')} className="footer-link font-ui">Support & FAQ</button></li>
                <li><button type="button" onClick={() => handleNav('support')} className="footer-link font-ui">Shipping & Returns</button></li>
                <li><button type="button" onClick={() => handleNav('support')} className="footer-link font-ui">2-Year Warranty</button></li>
                <li><button type="button" onClick={() => handleNav('account')} className="footer-link font-ui">Collector Account</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright font-ui">
            © {new Date().getFullYear()} REVERIE. All rights reserved. Handcrafted in Switzerland.
          </p>
          <div className="footer-legal">
            <button type="button" onClick={() => handleNav('support')} className="footer-legal-link font-ui">Privacy Policy</button>
            <button type="button" onClick={() => handleNav('support')} className="footer-legal-link font-ui">Terms of Service</button>
            <button type="button" onClick={() => handleNav('support')} className="footer-legal-link font-ui">Cookie Preferences</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
