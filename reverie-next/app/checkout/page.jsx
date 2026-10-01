"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle, CreditCard, ChevronRight, Truck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, clearCart, cartSubtotal } = useCart();

  const [formData, setFormData] = useState({
    firstName: 'Arjun',
    lastName: 'Sharma',
    email: 'arjun@example.com',
    address: '45 Lake Geneva Boulevard, Apt 12',
    city: 'Gen�ve',
    country: 'Switzerland',
    postalCode: '1204',
    cardNumber: '���� ���� ���� 4242',
    expiry: '08/29',
    cvv: '���',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const estimatedTax = Math.round(cartSubtotal * 0.077);
  const orderTotal = cartSubtotal + estimatedTax;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-checkout-success container">
        <div className="checkout-success-card font-ui">
          <CheckCircle size={56} className="checkout-success-icon" />
          <span className="eyebrow eyebrow-dark">ORDER CONFIRMED</span>
          <h1 className="checkout-success-title font-display">Thank You for Your Acquisition</h1>
          <p className="checkout-success-subtitle">
            Order <strong>#ORD-1024</strong> has been placed successfully. A certificate of manufacture and DHL tracking details have been sent to <strong>{formData.email}</strong>.
          </p>
          <div className="checkout-success-actions">
            <Button variant="primary" href="/order-tracking" arrow>
              Track Order Status
            </Button>
            <Button variant="secondary" href="/">
              Return to Atelier Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-checkout container">
      <div className="checkout-header font-ui">
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <Link href="/cart" className="pdp-breadcrumb-link">Shopping Bag</Link>
          <ChevronRight size={12} />
          <span className="pdp-breadcrumb-current">Secure Checkout</span>
        </nav>
        <h1 className="checkout-title font-display">Bespoke Checkout</h1>
      </div>

      <div className="checkout-layout">
        {/* Left: Checkout Form */}
        <form onSubmit={handleSubmit} className="checkout-form-col font-ui">
          {/* Section 1: Contact Information */}
          <div className="checkout-section">
            <h2 className="checkout-section-title font-display">1. Client Details</h2>
            <div className="checkout-form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="form-group form-group--full">
                <label>Email for Atelier Receipt & Courier Tracking</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="checkout-section">
            <h2 className="checkout-section-title font-display">2. Delivery Address</h2>
            <div className="checkout-form-grid">
              <div className="form-group form-group--full">
                <label>Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                />
              </div>
              <div className="form-group form-group--full">
                <label>Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="Switzerland">Switzerland</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Payment */}
          <div className="checkout-section">
            <div className="checkout-section-head-row">
              <h2 className="checkout-section-title font-display">3. Payment Method</h2>
              <span className="checkout-secure-badge">
                <Lock size={13} /> 256-Bit SSL Encrypted
              </span>
            </div>
            
            <div className="checkout-payment-box">
              <div className="form-group form-group--full">
                <label>Card Number</label>
                <div className="input-with-icon">
                  <CreditCard size={18} />
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="checkout-form-grid" style={{ marginTop: '16px' }}>
                <div className="form-group">
                  <label>Expiry (MM/YY)</label>
                  <input
                    type="text"
                    required
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Security Code (CVV)</label>
                  <input
                    type="password"
                    required
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button variant="primary" type="submit" className="checkout-submit-btn" arrow>
            Authorize Payment & Complete Order � ${orderTotal.toLocaleString()}
          </Button>
        </form>

        {/* Right: Summary */}
        <aside className="checkout-summary-col font-ui">
          <div className="checkout-summary-card">
            <h3 className="cart-summary-title font-display">Your Selection</h3>
            <div className="checkout-items-mini">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedStrap}`} className="checkout-mini-item">
                  <img src={item.image} alt={item.name} className="checkout-mini-thumb" />
                  <div className="checkout-mini-info">
                    <span className="checkout-mini-name">{item.name}</span>
                    <span className="checkout-mini-meta">Qty: {item.quantity || 1} � {item.selectedStrap}</span>
                  </div>
                  <span className="checkout-mini-price font-display">
                    ${((item.price || 1299) * (item.quantity || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row">
                <span>Insured Express Courier</span>
                <span className="cart-free-badge">COMPLIMENTARY</span>
              </div>
              <div className="cart-summary-row">
                <span>Swiss VAT (7.7%)</span>
                <span>${estimatedTax.toLocaleString()}</span>
              </div>
              <div className="cart-summary-divider" />
              <div className="cart-summary-row cart-summary-row--total">
                <span className="font-display">Total Due</span>
                <span className="cart-total-amount font-display">${orderTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
