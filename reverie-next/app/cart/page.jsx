"use client";

import React from 'react';
import Link from 'next/link';
import { Trash2, ShieldCheck, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, cartSubtotal } = useCart();

  const shippingCost = 0; // Complimentary
  const estimatedTax = Math.round(cartSubtotal * 0.077); // 7.7% Swiss VAT
  const orderTotal = cartSubtotal + estimatedTax;

  if (cartItems.length === 0) {
    return (
      <div className="page-cart page-cart--empty container">
        <div className="cart-empty-box font-ui">
          <ShoppingBag size={56} strokeWidth={1} className="cart-empty-icon" />
          <h1 className="cart-empty-title font-display">Your Shopping Bag is Empty</h1>
          <p className="cart-empty-sub">Explore our Haute Horlogerie catalog and select a timepiece of exceptional precision.</p>
          <Button variant="primary" href="/collections" arrow>
            Discover Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-cart container">
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
                  <span className="cart-item-meta-dot">�</span>
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
