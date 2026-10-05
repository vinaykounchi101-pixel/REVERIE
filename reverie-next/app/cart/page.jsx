"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Trash2, ShieldCheck, Truck, ArrowRight, ShoppingBag, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import AuthModal from '../../components/auth/AuthModal';
import { authService } from '../../services/authService';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, cartSubtotal } = useCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const currentUser = authService.getCurrentUser();

  const shippingCost = 0; // Complimentary
  const estimatedTax = Math.round(cartSubtotal * 0.077); // 7.7% Swiss VAT
  const orderTotal = cartSubtotal + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="page-cart page-cart--empty container" style={{ paddingTop: 'calc(var(--header-height) + var(--space-12))', paddingBottom: 'var(--space-28)' }}>
        <div className="cart-empty-box font-ui" style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', color: 'var(--color-warm-300, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
            <ShoppingBag size={32} strokeWidth={1.25} />
          </div>
          <span className="eyebrow eyebrow-dark font-ui">SHOPPING BAG</span>
          <h1 className="cart-empty-title font-display" style={{ fontSize: '32px', margin: '8px 0 12px', color: 'var(--color-text-primary)' }}>
            Your Shopping Bag is Empty
          </h1>
          <p className="cart-empty-sub" style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px', maxWidth: '420px', margin: '0 auto 28px' }}>
            Explore our Haute Horlogerie catalog and select an exceptional timepiece, or identify yourself to retrieve a previously saved acquisition.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '380px', margin: '0 auto' }}>
            <Button variant="primary" href="/collections" arrow style={{ flex: '1 1 170px' }}>
              Explore Collections
            </Button>
            
            {!currentUser ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                style={{ flex: '1 1 170px' }}
              >
                Sign In / Sign Up
              </Button>
            ) : (
              <Button variant="secondary" href="/account" style={{ flex: '1 1 170px' }}>
                View Collector Portal
              </Button>
            )}
          </div>
        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
          onAuthSuccess={() => setAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="page-cart container" style={{ paddingTop: 'calc(var(--header-height) + var(--space-8))', paddingBottom: 'var(--space-28)' }}>
      <div className="cart-header font-ui">
        <h1 className="cart-title font-display">Shopping Bag</h1>
        <span className="cart-count-badge">
          {cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items selected
        </span>
      </div>

      <div className="cart-layout">
        {/* Items List */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <article key={`${item.id}-${item.selectedStrap}`} className="cart-item-card font-ui">
              <div className="cart-item-thumb-wrap">
                <img src={item.image} alt={item.name} className="cart-item-thumb" />
              </div>

              <div className="cart-item-details">
                <div className="cart-item-head">
                  <div>
                    <span className="cart-item-ref">{item.ref}</span>
                    <h2 className="cart-item-name font-display">
                      <Link href={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.name}
                      </Link>
                    </h2>
                  </div>
                  <span className="cart-item-price font-display">
                    ${((item.price || 1299) * (item.quantity || 1)).toLocaleString()}
                  </span>
                </div>

                <div className="cart-item-meta">
                  <span>Strap: <strong>{item.selectedStrap || 'Steel Bracelet'}</strong></span>
                  <span className="cart-item-meta-dot">•</span>
                  <span>Includes Atelier Certificate</span>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-qty-picker">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1, item.selectedStrap)}
                      className="cart-qty-btn"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="cart-qty-val">{item.quantity || 1}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1, item.selectedStrap)}
                      className="cart-qty-btn"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id, item.selectedStrap)}
                    className="cart-remove-btn"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="cart-summary-sidebar font-ui">
          <div className="cart-summary-card">
            <h3 className="cart-summary-title font-display">Order Summary</h3>

            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row">
                <span>Insured Worldwide Courier</span>
                <span className="cart-free-badge">COMPLIMENTARY</span>
              </div>
              <div className="cart-summary-row">
                <span>Estimated Swiss VAT (7.7%)</span>
                <span>${estimatedTax.toLocaleString()}</span>
              </div>
              <div className="cart-summary-divider" />
              <div className="cart-summary-row cart-summary-row--total">
                <span className="font-display">Total</span>
                <span className="cart-total-amount font-display">${orderTotal.toLocaleString()}</span>
              </div>
            </div>

            <Button
              variant="primary"
              href="/checkout"
              className="cart-checkout-btn"
              arrow
            >
              Proceed to Secure Checkout
            </Button>

            <div className="cart-security-badge font-ui">
              <ShieldCheck size={16} />
              <span>256-Bit Encrypted Atelier Transaction</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
