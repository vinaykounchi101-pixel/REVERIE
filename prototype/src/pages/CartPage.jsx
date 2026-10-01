import React from 'react';
import { Lock, ShieldCheck, RotateCcw, X, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';

export default function CartPage({ cartItems, onUpdateQty, onRemoveItem, onNavigate }) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const total = subtotal;

  if (cartItems.length === 0) {
    return (
      <div className="page-cart-empty container">
        <div className="cart-empty-box">
          <ShoppingBag size={48} strokeWidth={1.2} className="cart-empty-icon" />
          <h1 className="font-display">Your Shopping Bag is Empty</h1>
          <p className="font-ui">Explore our collection of Swiss mechanical timepieces and discover your perfect companion.</p>
          <Button variant="primary" onClick={() => onNavigate('collections')}>
            Explore Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-cart">
      <div className="container">
        <h1 className="cart-page-title font-display">Your Cart ({cartItems.reduce((a, b) => a + (b.quantity || 1), 0)})</h1>

        <div className="cart-layout">
          {/* Products List Table */}
          <div className="cart-items-column">
            <div className="cart-table-header font-ui">
              <span>Product</span>
              <span className="cart-th-price">Price</span>
              <span className="cart-th-qty">Quantity</span>
              <span className="cart-th-total">Total</span>
              <span className="cart-th-action"></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row font-ui">
                  <div className="cart-item-product">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-meta">{item.selectedStrap || 'Steel Bracelet'} / {item.ref || 'Ref'}</p>
                    </div>
                  </div>

                  <div className="cart-item-price">
                    ${item.price.toLocaleString()}
                  </div>

                  <div className="cart-item-qty">
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => onUpdateQty(item.id, Math.max(1, (item.quantity || 1) - 1))}
                    >
                      -
                    </button>
                    <span className="cart-qty-val">{item.quantity || 1}</span>
                    <button
                      type="button"
                      className="cart-qty-btn"
                      onClick={() => onUpdateQty(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">
                    ${(item.price * (item.quantity || 1)).toLocaleString()}
                  </div>

                  <div className="cart-item-remove">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="cart-remove-btn"
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-continue-wrap">
              <button
                type="button"
                className="cart-continue-link font-ui"
                onClick={() => onNavigate('collections')}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="cart-summary-column">
            <div className="cart-summary-card">
              <h2 className="cart-summary-title font-ui">Order Summary</h2>

              <div className="cart-summary-row font-ui">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row font-ui">
                <span>Shipping</span>
                <span className="cart-free-tag">Complimentary</span>
              </div>
              <div className="cart-summary-row font-ui">
                <span>Estimated Taxes</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total font-ui">
                <span>Total</span>
                <span className="cart-total-val">${total.toLocaleString()}</span>
              </div>

              <Button
                variant="primary"
                className="cart-checkout-btn"
                onClick={() => onNavigate('checkout')}
                arrow
              >
                Proceed to Checkout
              </Button>

              {/* Secure Checkout Trust Pillars */}
              <div className="cart-trust-badges font-ui">
                <div className="cart-trust-item">
                  <Lock size={15} />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="cart-trust-item">
                  <ShieldCheck size={15} />
                  <span>2 Year International Warranty</span>
                </div>
                <div className="cart-trust-item">
                  <RotateCcw size={15} />
                  <span>30-Day Complimentary Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
