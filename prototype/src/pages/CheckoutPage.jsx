import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function CheckoutPage({ cartItems, onNavigate, onClearCart }) {
  const [formData, setFormData] = useState({
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    firstName: 'Arjun',
    lastName: 'Sharma',
    address: '123, MG Road',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411001',
    country: 'India',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '08/29',
    cardCvc: '•••'
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    if (onClearCart) onClearCart();
  };

  if (orderPlaced) {
    return (
      <div className="page-checkout-success container">
        <div className="checkout-success-card font-ui">
          <CheckCircle size={56} className="checkout-success-icon" />
          <span className="eyebrow eyebrow-dark">ORDER CONFIRMED</span>
          <h1 className="checkout-success-title font-display">Thank You for Your Order</h1>
          <p className="checkout-success-subtitle">
            Order <strong>#ORD-1024</strong> has been placed successfully. A confirmation email and tracking details have been sent to <strong>{formData.email}</strong>.
          </p>
          <div className="checkout-success-actions">
            <Button variant="primary" onClick={() => onNavigate('order-tracking')}>
              Track Your Order
            </Button>
            <Button variant="secondary" onClick={() => onNavigate('home')}>
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-checkout">
      <div className="container">
        <div className="checkout-header">
          <button type="button" onClick={() => onNavigate('cart')} className="checkout-back-link font-ui">
            <ArrowLeft size={16} /> Back to Bag
          </button>
          <span className="brand-wordmark font-ui" style={{ letterSpacing: '0.3em' }}>V E L A R A</span>
        </div>

        <div className="checkout-layout">
          {/* Left Checkout Forms */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Step 1: Contact */}
            <section className="checkout-section">
              <h2 className="checkout-section-title font-ui">1. Contact Information</h2>
              <div className="checkout-row-2">
                <div className="form-group font-ui">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group font-ui">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
            </section>

            {/* Step 2: Shipping */}
            <section className="checkout-section">
              <h2 className="checkout-section-title font-ui">2. Shipping Address</h2>
              <div className="checkout-row-2">
                <div className="form-group font-ui">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group font-ui">
                  <label>Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group font-ui">
                <label>Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="checkout-row-3">
                <div className="form-group font-ui">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group font-ui">
                  <label>State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group font-ui">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section className="checkout-section">
              <h2 className="checkout-section-title font-ui">3. Secure Payment</h2>
              <div className="payment-options-grid font-ui">
                <label className={`payment-option-card ${formData.paymentMethod === 'card' ? 'payment-option-card--active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  />
                  <span>Credit / Debit Card</span>
                </label>
                <label className={`payment-option-card ${formData.paymentMethod === 'wire' ? 'payment-option-card--active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="wire"
                    checked={formData.paymentMethod === 'wire'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'wire' })}
                  />
                  <span>Bank Wire Transfer</span>
                </label>
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="payment-card-inputs font-ui">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" value={formData.cardNumber} className="form-input" readOnly />
                  </div>
                  <div className="checkout-row-2">
                    <div className="form-group">
                      <label>Expiration</label>
                      <input type="text" value={formData.cardExp} className="form-input" readOnly />
                    </div>
                    <div className="form-group">
                      <label>Security Code (CVC)</label>
                      <input type="text" value={formData.cardCvc} className="form-input" readOnly />
                    </div>
                  </div>
                </div>
              )}
            </section>

            <Button type="submit" variant="primary" className="checkout-submit-btn" arrow>
              Place Order (${subtotal.toLocaleString()})
            </Button>
          </form>

          {/* Right Order Review Panel */}
          <aside className="checkout-sidebar">
            <div className="checkout-summary-card">
              <h3 className="checkout-summary-title font-ui">Order Review</h3>

              <div className="checkout-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-item-row font-ui">
                    <img src={item.image} alt={item.name} className="checkout-item-img" />
                    <div className="checkout-item-info">
                      <h4 className="checkout-item-name">{item.name}</h4>
                      <p className="checkout-item-meta">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="checkout-item-price">${(item.price * (item.quantity || 1)).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="checkout-price-breakdown font-ui">
                <div className="breakdown-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="breakdown-row">
                  <span>Insured Express Delivery</span>
                  <span className="cart-free-tag">Free</span>
                </div>
                <div className="breakdown-row breakdown-total">
                  <span>Total Amount</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="checkout-trust-box font-ui">
                <Lock size={14} />
                <span>256-Bit SSL Bank Grade Security</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
