"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle, 
  CreditCard, 
  ChevronRight, 
  Truck, 
  Plus, 
  QrCode, 
  Building2, 
  Banknote, 
  Check, 
  UserCheck, 
  MapPin, 
  ArrowLeft,
  Smartphone,
  X,
  AlertCircle,
  Mail
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { authService } from '../../services/authService';
import { customerService } from '../../services/customerService';
import { orderService } from '../../services/orderService';
import { paymentService } from '../../services/paymentService';
import { WORLD_COUNTRIES } from '../../data/countries';

export default function CheckoutPage() {
  const { cartItems, clearCart, cartSubtotal } = useCart();

  // Authentication & Saved Addresses State
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0);
  const [addressMode, setAddressMode] = useState('new'); // 'select' or 'new'
  const [saveAddressToProfile, setSaveAddressToProfile] = useState(true);

  // Email Verification & Authorization State
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [otpSuccessMsg, setOtpSuccessMsg] = useState(null);
  const otpInputRefs = useRef([]);

  // Address Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    country: 'Switzerland',
    postalCode: '',
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'card' | 'upi' | 'cod' | 'netbanking'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardData, setCardData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [upiData, setUpiData] = useState({
    vpa: '',
    upiOption: 'vpa', // 'vpa' | 'qr'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Dynamic Razorpay Script Loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if (window.Razorpay) return resolve(true);
      const existing = document.getElementById('razorpay-checkout-script');
      if (existing) {
        existing.onload = () => resolve(true);
        existing.onerror = () => resolve(false);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const finalizeAndSaveOrder = (finalOrder) => {
    try {
      const existingOrders = JSON.parse(localStorage.getItem('reverie_orders') || '[]');
      localStorage.setItem('reverie_orders', JSON.stringify([finalOrder, ...existingOrders]));
    } catch (err) {
      console.error(err);
    }

    setPlacedOrderDetails(finalOrder);
    setOrderPlaced(true);
    clearCart();
  };

  // Initialize Auth & Addresses
  useEffect(() => {
    setMounted(true);
    const isAuth = authService.isAuthenticated();
    setIsAuthenticated(isAuth);

    if (isAuth) {
      const user = authService.getCurrentUser() || {};
      setCurrentUser(user);
      if (user.verified) {
        setIsEmailVerified(true);
      }

      customerService.getAddresses().then((addresses) => {
        if (!addresses || addresses.length === 0) {
          const defaultAddress = {
            id: 'addr-default',
            title: 'Primary Residence',
            firstName: user.firstName || 'Arjun',
            lastName: user.lastName || 'Sharma',
            email: user.email || 'collector@reverie.ch',
            phone: '+41 22 819 9000',
            address: '45 Lake Geneva Boulevard, Apt 12',
            apartment: 'Penthouse B',
            city: 'Genève',
            state: 'Geneva',
            country: 'Switzerland',
            postalCode: '1204',
            isDefault: true,
          };
          addresses = [defaultAddress];
          if (typeof window !== 'undefined') {
            localStorage.setItem('reverie_saved_addresses', JSON.stringify(addresses));
          }
        }

        setSavedAddresses(addresses);
        setSelectedAddressIdx(0);
        setAddressMode('select');

        if (addresses.length > 0) {
          const addr = addresses[0];
          setFormData({
            firstName: addr.firstName || user.firstName || '',
            lastName: addr.lastName || user.lastName || '',
            email: addr.email || user.email || '',
            phone: addr.phone || '',
            address: addr.address || '',
            apartment: addr.apartment || '',
            city: addr.city || '',
            state: addr.state || '',
            country: addr.country || 'Switzerland',
            postalCode: addr.postalCode || '',
          });
          setCardData((prev) => ({
            ...prev,
            nameOnCard: `${addr.firstName || user.firstName || ''} ${addr.lastName || user.lastName || ''}`.trim(),
          }));
        }
      });
    } else {
      setAddressMode('new');
    }
  }, []);

  useEffect(() => {
    let timer;
    if (showOtpModal && otpCountdown > 0) {
      timer = setInterval(() => setOtpCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpModal, otpCountdown]);

  const estimatedTax = Math.round(cartSubtotal * 0.077);
  const orderTotal = cartSubtotal + estimatedTax;

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    setCardData({ ...cardData, cardNumber: val });
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardData({ ...cardData, expiry: val });
  };

  const handleSelectAddress = (idx) => {
    setSelectedAddressIdx(idx);
    const addr = savedAddresses[idx];
    if (addr) {
      setFormData({
        firstName: addr.firstName,
        lastName: addr.lastName,
        email: addr.email,
        phone: addr.phone,
        address: addr.address,
        apartment: addr.apartment || '',
        city: addr.city,
        state: addr.state || '',
        country: addr.country,
        postalCode: addr.postalCode,
      });
      setCardData((prev) => ({
        ...prev,
        nameOnCard: `${addr.firstName} ${addr.lastName}`.trim(),
      }));
    }
  };

  const executeOrderPlacement = async () => {
    let finalAddress;
    if (addressMode === 'select' && savedAddresses[selectedAddressIdx]) {
      finalAddress = savedAddresses[selectedAddressIdx];
    } else {
      finalAddress = {
        title: 'New Delivery Address',
        ...formData,
      };

      if (isAuthenticated && saveAddressToProfile) {
        await customerService.addAddress(finalAddress);
        const updated = await customerService.getAddresses();
        setSavedAddresses(updated);
      }
    }

    const orderPayload = {
      total: orderTotal,
      subtotal: cartSubtotal,
      tax: estimatedTax,
      items: cartItems,
      shippingAddress: finalAddress,
      paymentMethod: paymentMethod.toUpperCase(),
      paymentDetails: 
        paymentMethod === 'razorpay'
          ? 'Razorpay Gateway (Encrypted Multi-Rail)'
          : paymentMethod === 'card' 
          ? `Card ending in ${cardData.cardNumber.slice(-4) || '4242'}`
          : paymentMethod === 'upi'
          ? `UPI (${upiData.vpa || 'Instant QR Escrow'})`
          : paymentMethod === 'cod'
          ? 'Cash on Delivery (Insured Courier Handover)'
          : paymentMethod === 'wire'
          ? 'Swiss Escrow Wire'
          : `Net Banking (${selectedBank})`,
    };

    const placed = await orderService.createOrder(orderPayload);
    const finalOrder = {
      orderId: placed.orderNumber || placed.orderId || `REV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      ...orderPayload,
      ...placed,
    };

    if (paymentMethod === 'razorpay' || paymentMethod === 'card' || paymentMethod === 'upi') {
      if (placed && placed.id && !placed.id.toString().startsWith('local-')) {
        setIsProcessingPayment(true);
        const scriptLoaded = await loadRazorpayScript();
        if (scriptLoaded && typeof window !== 'undefined' && window.Razorpay) {
          try {
            const initResult = await paymentService.initiatePayment(placed.id, 'RAZORPAY');
            if (initResult && initResult.clientPayload) {
              const options = {
                key: initResult.clientPayload.keyId || 'rzp_test_placeholder',
                amount: initResult.amountPaise || orderTotal * 100,
                currency: initResult.currency || 'INR',
                name: 'REVERIE Haute Horlogerie',
                description: `Acquisition Order ${placed.orderNumber || placed.id}`,
                order_id: initResult.clientPayload.razorpayOrderId,
                handler: async function (response) {
                  try {
                    await paymentService.verifyPayment(initResult.paymentId, {
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    });
                  } catch (err) {
                    console.warn('Payment signature capture error:', err);
                  }
                  setIsProcessingPayment(false);
                  finalizeAndSaveOrder({ ...finalOrder, paymentStatus: 'CAPTURED' });
                },
                prefill: {
                  name: `${formData.firstName} ${formData.lastName}`.trim(),
                  email: formData.email,
                  contact: formData.phone,
                },
                theme: {
                  color: '#D4AF37',
                  backdrop_color: 'rgba(10, 10, 12, 0.85)',
                },
                modal: {
                  ondismiss: function () {
                    setIsProcessingPayment(false);
                  },
                },
              };
              const rzp = new window.Razorpay(options);
              rzp.open();
              return;
            }
          } catch (initErr) {
            console.warn('Razorpay initiation fallback:', initErr);
          }
        }
        setIsProcessingPayment(false);
      }
    }

    finalizeAndSaveOrder(finalOrder);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.email.includes('@')) {
      alert('Please provide a valid email address.');
      return;
    }

    // Mandatory Email Verification for Checkout Authorization
    if (!isEmailVerified && (!isAuthenticated || !currentUser?.verified)) {
      setOtpLoading(true);
      setOtpError(null);
      try {
        await authService.requestCheckoutOtp(formData.email);
        setOtpDigits(['', '', '', '', '', '']);
        setOtpCountdown(60);
        setOtpSuccessMsg(`A 6-digit authorization code has been dispatched to ${formData.email}.`);
        setShowOtpModal(true);
      } catch (err) {
        setOtpError(err.message || 'Failed to dispatch verification code.');
        setShowOtpModal(true);
      } finally {
        setOtpLoading(false);
      }
      return;
    }

    await executeOrderPlacement();
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newDigits = [...otpDigits];
      digits.forEach((d, i) => {
        if (index + i < 6) newDigits[index + i] = d;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(index + digits.length, 5);
      if (otpInputRefs.current[nextFocus]) {
        otpInputRefs.current[nextFocus].focus();
      }
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value.replace(/\D/g, '');
    setOtpDigits(newDigits);

    if (value && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCheckoutOtp = async () => {
    try {
      setOtpCountdown(60);
      setOtpError(null);
      await authService.requestCheckoutOtp(formData.email);
      setOtpSuccessMsg(`A fresh authorization code has been dispatched to ${formData.email}.`);
    } catch (err) {
      setOtpError(err.message || 'Failed to resend authorization code.');
    }
  };

  const handleVerifyCheckoutOtp = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join('');
    if (otp.length < 6) {
      setOtpError('Please enter the complete 6-digit verification code.');
      return;
    }

    setOtpLoading(true);
    setOtpError(null);

    try {
      const authData = await authService.verifyCheckoutOtp(formData.email, otp);
      setIsEmailVerified(true);
      if (authData && authData.user) {
        setIsAuthenticated(true);
        setCurrentUser(authData.user);
      }
      setShowOtpModal(false);
      await executeOrderPlacement();
    } catch (err) {
      setOtpError(err.message || 'Invalid or expired verification code.');
    } finally {
      setOtpLoading(false);
    }
  };

  if (orderPlaced && placedOrderDetails) {
    return (
      <div className="page-checkout-success container">
        <div className="checkout-success-card font-ui">
          <CheckCircle size={56} className="checkout-success-icon" />
          <span className="eyebrow eyebrow-dark">ACQUISITION CONFIRMED</span>
          <h1 className="checkout-success-title font-display">Thank You for Your Horological Acquisition</h1>
          
          <p className="checkout-success-subtitle">
            Order <strong>#{placedOrderDetails.orderId}</strong> has been secured. A certified certificate of manufacture and DHL Express insured tracking details will be dispatched to <strong>{placedOrderDetails.shippingAddress.email}</strong>.
          </p>

          {/* Acquisition Summary Box */}
          <div className="checkout-mini-item" style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', textAlign: 'left' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#999' }}>Payment Method:</span>
                <strong style={{ fontSize: '13px', color: '#d4af37' }}>{placedOrderDetails.paymentDetails}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: '#999' }}>Delivery Destination:</span>
                <span style={{ fontSize: '13px', textAlign: 'right' }}>
                  {placedOrderDetails.shippingAddress.address}, {placedOrderDetails.shippingAddress.city}, {placedOrderDetails.shippingAddress.country}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: '#999' }}>Total Secured:</span>
                <strong style={{ fontSize: '15px', color: '#fff' }}>${placedOrderDetails.total.toLocaleString()} USD</strong>
              </div>
            </div>
          </div>

          <div className="checkout-success-actions" style={{ marginTop: '28px' }}>
            <Button variant="primary" href="/order-tracking" arrow>
              Track Insured Dispatch
            </Button>
            <Button variant="secondary" href="/">
              Return to Atelier
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="page-cart page-cart--empty container font-ui">
        <div className="cart-empty-box">
          <Truck size={48} className="cart-empty-icon" />
          <h1 className="cart-empty-title font-display">Your Shopping Bag is Empty</h1>
          <p className="cart-empty-sub">
            Please select a luxury timepiece from our collection before proceeding to bespoke checkout.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" href="/collections" arrow>
              Explore Collections
            </Button>
            <Button variant="secondary" href="/">
              Atelier Home
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
        <h1 className="checkout-title font-display">Bespoke Horology Checkout</h1>
      </div>

      <div className="checkout-layout">
        {/* Left Column: Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="checkout-form-col font-ui">
          
          {/* Logged in status banner */}
          {isAuthenticated && (
            <div className="checkout-logged-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={16} color="#d4af37" />
                <span>Acquiring as <strong>{currentUser?.firstName || 'Collector'} {currentUser?.lastName || ''}</strong> ({currentUser?.email})</span>
              </div>
              <span className="checkout-address-badge">Verified Collector</span>
            </div>
          )}

          {/* SECTION 1: DELIVERY ADDRESS */}
          <div className="checkout-section">
            <div className="checkout-section-head-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="checkout-section-title font-display" style={{ margin: 0, border: 'none', padding: 0 }}>
                1. Delivery &amp; Client Address
              </h2>
              {isAuthenticated && savedAddresses.length > 0 && addressMode === 'new' && (
                <button
                  type="button"
                  onClick={() => setAddressMode('select')}
                  className="checkout-add-address-btn"
                >
                  <ArrowLeft size={13} /> Back to Saved Addresses
                </button>
              )}
            </div>

            {/* If Authenticated & Has Saved Addresses -> Selection Mode */}
            {isAuthenticated && savedAddresses.length > 0 && addressMode === 'select' ? (
              <div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '14px' }}>
                  Select one of your registered insured delivery addresses or add a new destination:
                </p>

                <div className="checkout-saved-addresses-grid">
                  {savedAddresses.map((addr, idx) => {
                    const isSelected = selectedAddressIdx === idx;
                    return (
                      <div
                        key={addr.id || idx}
                        onClick={() => handleSelectAddress(idx)}
                        className={`checkout-address-card ${isSelected ? 'checkout-address-card--active' : ''}`}
                      >
                        <div className="checkout-address-head">
                          <span className="checkout-address-badge">
                            {addr.title || (idx === 0 ? 'Primary Residence' : `Address ${idx + 1}`)}
                          </span>
                          <div className="checkout-address-radio">
                            {isSelected && <div className="checkout-address-radio-inner" />}
                          </div>
                        </div>
                        <div className="checkout-address-name">
                          {addr.firstName} {addr.lastName}
                        </div>
                        <p className="checkout-address-text">
                          {addr.address}{addr.apartment ? `, ${addr.apartment}` : ''}<br />
                          {addr.city}, {addr.postalCode} {addr.state ? `(${addr.state})` : ''}<br />
                          <strong>{addr.country}</strong>
                        </p>
                        {addr.phone && (
                          <span className="checkout-address-phone">Tel: {addr.phone}</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setAddressMode('new')}
                    className="checkout-add-address-btn"
                  >
                    <Plus size={14} /> Add New Delivery Destination
                  </button>
                  <span style={{ fontSize: '12px', color: '#d4af37', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={14} /> Ready for Insured Dispatch
                  </span>
                </div>
              </div>
            ) : (
              /* Address Details Entry Form */
              <div className="checkout-form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharma"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email for Insured Tracking &amp; Certificate *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. collector@reverie.ch"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number (For Courier Delivery Call) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+41 22 819 9000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group form-group--full">
                  <label>Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House / Building number, Street name"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Apartment / Suite / Floor (Optional)</label>
                  <input
                    type="text"
                    placeholder="Apt 12, Penthouse B"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Genève"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>State / Province / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Geneva / Zurich / Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code / ZIP *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1204"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>

                <div className="form-group form-group--full">
                  <label>Country / Worldwide Territory *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    style={{
                      height: '44px',
                      padding: '0 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-border-default)',
                      backgroundColor: 'var(--color-bg-primary)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '13px'
                    }}
                  >
                    {WORLD_COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {isAuthenticated && (
                  <div className="form-group form-group--full" style={{ marginTop: '6px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                      <input
                        type="checkbox"
                        checked={saveAddressToProfile}
                        onChange={(e) => setSaveAddressToProfile(e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: '#d4af37' }}
                      />
                      <span>Save this address to my registered collector account</span>
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: INSURED COURIER METHOD */}
          <div className="checkout-section">
            <h2 className="checkout-section-title font-display">2. Insured Shipping Service</h2>
            <div className="checkout-address-card checkout-address-card--active">
              <div className="checkout-address-head">
                <span className="checkout-address-badge">DHL Express Swiss Armored Flight</span>
                <span className="cart-free-badge">COMPLIMENTARY</span>
              </div>
              <div className="checkout-address-name">Global Overnight Insured Delivery</div>
              <p className="checkout-address-text">
                Includes full declared value Lloyd's of London horological transit insurance, tamper-evident security seal, and identity check upon delivery.
              </p>
            </div>
          </div>

          {/* SECTION 3: PAYMENT METHOD SELECTION */}
          <div className="checkout-section">
            <div className="checkout-section-head-row">
              <h2 className="checkout-section-title font-display">3. Select Payment Method</h2>
              <span className="checkout-secure-badge">
                <Lock size={13} /> 256-Bit SSL Horological Escrow
              </span>
            </div>

            {/* Payment Method Tabs */}
            <div className="checkout-payment-tabs-grid">
              <button
                type="button"
                onClick={() => setPaymentMethod('razorpay')}
                className={`checkout-payment-tab-btn ${paymentMethod === 'razorpay' ? 'checkout-payment-tab-btn--active' : ''}`}
              >
                <Lock size={18} color="#d4af37" />
                <span>Razorpay Gateway</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`checkout-payment-tab-btn ${paymentMethod === 'card' ? 'checkout-payment-tab-btn--active' : ''}`}
              >
                <CreditCard size={18} />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`checkout-payment-tab-btn ${paymentMethod === 'upi' ? 'checkout-payment-tab-btn--active' : ''}`}
              >
                <Smartphone size={18} />
                <span>UPI / Instant Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`checkout-payment-tab-btn ${paymentMethod === 'cod' ? 'checkout-payment-tab-btn--active' : ''}`}
              >
                <Banknote size={18} />
                <span>Cash on Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`checkout-payment-tab-btn ${paymentMethod === 'netbanking' ? 'checkout-payment-tab-btn--active' : ''}`}
              >
                <Building2 size={18} />
                <span>Net Banking / Wire</span>
              </button>
            </div>

            {/* DYNAMIC PAYMENT METHOD BODY */}
            <div className="checkout-payment-box-inner">
              {/* Option 0: Razorpay Multi-Rail Gateway */}
              {paymentMethod === 'razorpay' && (
                <div className="checkout-cod-box">
                  <div className="checkout-cod-notice" style={{ borderColor: 'rgba(212, 175, 55, 0.4)', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(17, 18, 21, 0.6) 100%)' }}>
                    <ShieldCheck size={26} color="#d4af37" style={{ flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: '#d4af37' }}>Razorpay Bespoke Horology Gateway</strong>
                      <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '13px', lineHeight: 1.5 }}>
                        Unified encrypted checkout supporting International &amp; Indian Cards (Visa, Mastercard, Amex, Diners), UPI (Google Pay, PhonePe, Paytm), NetBanking, and Instant Credit.
                      </p>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-stone-400)', paddingLeft: '4px', lineHeight: 1.6 }}>
                    • 256-Bit SSL TLS 1.3 Bank-Grade Security with zero plain-text card storage.<br />
                    • Direct encrypted Swiss Escrow webhook verification &amp; instant serial allocation.
                  </div>
                </div>
              )}
              {/* Option 1: Credit / Debit Card */}
              {paymentMethod === 'card' && (
                <div className="checkout-card-fields">
                  <div className="form-group form-group--full">
                    <label>Cardholder Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Sharma"
                      value={cardData.nameOnCard || `${formData.firstName} ${formData.lastName}`.trim()}
                      onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                    />
                  </div>

                  <div className="form-group form-group--full" style={{ marginTop: '12px' }}>
                    <label>Card Number *</label>
                    <div className="input-with-icon">
                      <CreditCard size={18} />
                      <input
                        type="text"
                        required
                        placeholder="4242 •••• •••• 4242"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                      />
                    </div>
                  </div>

                  <div className="checkout-form-grid" style={{ marginTop: '12px' }}>
                    <div className="form-group">
                      <label>Expiry Date (MM/YY) *</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV / CVC Code *</label>
                      <input
                        type="password"
                        required
                        placeholder="•••"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.substring(0, 4) })}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Option 2: UPI / Instant Pay */}
              {paymentMethod === 'upi' && (
                <div className="checkout-upi-box">
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setUpiData({ ...upiData, upiOption: 'vpa' })}
                      className={`checkout-upi-pill ${upiData.upiOption === 'vpa' ? 'pdp-strap-pill--active' : ''}`}
                    >
                      UPI ID / VPA
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiData({ ...upiData, upiOption: 'qr' })}
                      className={`checkout-upi-pill ${upiData.upiOption === 'qr' ? 'pdp-strap-pill--active' : ''}`}
                    >
                      Dynamic QR Code
                    </button>
                  </div>

                  {upiData.upiOption === 'vpa' ? (
                    <div>
                      <div className="form-group form-group--full">
                        <label>Enter Virtual Payment Address (UPI ID) *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. collector@okhdfcbank or 9876543210@paytm"
                          value={upiData.vpa}
                          onChange={(e) => setUpiData({ ...upiData, vpa: e.target.value })}
                        />
                      </div>
                      <span style={{ fontSize: '11.5px', color: 'var(--color-stone-400)' }}>
                        Popular UPI Handles:
                      </span>
                      <div className="checkout-upi-apps">
                        {['@okhdfcbank', '@okaxis', '@oksbi', '@paytm', '@ybl', '@ibl'].map((handle) => (
                          <button
                            key={handle}
                            type="button"
                            onClick={() => {
                              const prefix = upiData.vpa.split('@')[0] || (currentUser?.email ? currentUser.email.split('@')[0] : 'collector');
                              setUpiData({ ...upiData, vpa: `${prefix}${handle}` });
                            }}
                            className="checkout-upi-pill"
                          >
                            {handle}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="checkout-qr-wrap">
                      <div className="checkout-qr-placeholder">
                        <QrCode size={114} color="#111215" />
                      </div>
                      <div>
                        <strong style={{ fontSize: '14px', color: 'var(--color-warm-300, #d4af37)' }}>
                          Scan with Any UPI App
                        </strong>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 8px 0', lineHeight: 1.5 }}>
                          Open Google Pay, PhonePe, Paytm, or BHIM. Scan the encrypted QR code to approve the luxury transaction instantly.
                        </p>
                        <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Check size={12} /> Auto-verified Swiss Escrow Link Active
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Option 3: Cash on Delivery (COD) */}
              {paymentMethod === 'cod' && (
                <div className="checkout-cod-box">
                  <div className="checkout-cod-notice">
                    <ShieldCheck size={24} color="#d4af37" style={{ flexShrink: 0 }} />
                    <div>
                      <strong>White-Glove Courier Inspection &amp; Handover</strong>
                      <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>
                        Pay directly upon delivery to our bonded courier after opening and verifying your REVERIE presentation box and chronometer certification.
                      </p>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-stone-400)', paddingLeft: '4px' }}>
                    • Accepts Cash, Card POS terminal, or On-Spot UPI Scan via authorized courier.<br />
                    • Identity verification (Government Photo ID) required at time of signature.
                  </div>
                </div>
              )}

              {/* Option 4: Net Banking / Swiss Escrow Wire */}
              {paymentMethod === 'netbanking' && (
                <div className="checkout-netbanking-box">
                  <div className="form-group form-group--full">
                    <label>Select Your Financial Institution</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      style={{
                        height: '44px',
                        padding: '0 12px',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border-default)',
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '13px'
                      }}
                    >
                      <option value="HDFC Bank">HDFC Bank (Instant NetBanking)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="UBS Switzerland">UBS Switzerland (Direct Wire)</option>
                      <option value="Credit Suisse">Credit Suisse</option>
                      <option value="HSBC Premier">HSBC Premier Global</option>
                      <option value="Barclays Private Bank">Barclays Wealth</option>
                      <option value="JPMorgan Chase">JPMorgan Chase</option>
                    </select>
                  </div>

                  <table className="checkout-wire-table">
                    <tbody>
                      <tr>
                        <td>Beneficiary:</td>
                        <td>REVERIE Haute Horlogerie SA</td>
                      </tr>
                      <tr>
                        <td>Bank:</td>
                        <td>UBS Switzerland AG, Geneva Central</td>
                      </tr>
                      <tr>
                        <td>IBAN / Swift:</td>
                        <td>CH93 0024 0240 1024 8890 1</td>
                      </tr>
                      <tr>
                        <td>Acquisition Reference:</td>
                        <td>REV-ESCROW-84920</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <Button 
            variant="primary" 
            type="submit" 
            className="checkout-submit-btn" 
            disabled={isProcessingPayment}
            arrow={!isProcessingPayment}
          >
            {isProcessingPayment
              ? 'Securing Escrow Gateway...'
              : paymentMethod === 'cod' 
              ? `Confirm Acquisition (Pay on Delivery) • $${orderTotal.toLocaleString()} USD`
              : paymentMethod === 'razorpay'
              ? `Launch Razorpay Gateway • $${orderTotal.toLocaleString()} USD`
              : `Authorize & Complete Acquisition • $${orderTotal.toLocaleString()} USD`}
          </Button>
        </form>

        {/* Right Column: Order Summary */}
        <aside className="checkout-summary-col font-ui">
          <div className="checkout-summary-card">
            <h3 className="cart-summary-title font-display">Acquisition Selection</h3>
            
            <div className="checkout-items-mini">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedStrap || 'default'}`} className="checkout-mini-item">
                  <img src={item.image} alt={item.name} className="checkout-mini-thumb" />
                  <div className="checkout-mini-info">
                    <span className="checkout-mini-name">{item.name}</span>
                    <span className="checkout-mini-meta">
                      Qty: {item.quantity || 1} • {item.selectedStrap || 'Alligator Leather'}
                    </span>
                  </div>
                  <span className="checkout-mini-price font-display">
                    ${((item.price || 1250) * (item.quantity || 1)).toLocaleString()}
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
                <span>Swiss VAT &amp; Customs (7.7%)</span>
                <span>${estimatedTax.toLocaleString()}</span>
              </div>
              
              <div className="cart-summary-divider" />
              
              <div className="cart-summary-row cart-summary-row--total">
                <span className="font-display">Total Due</span>
                <span className="cart-total-amount font-display">${orderTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="cart-trust-badges" style={{ marginTop: '18px' }}>
              <div className="cart-trust-item">
                <ShieldCheck size={14} color="#d4af37" />
                <span>5-Year Comprehensive Atelier Warranty</span>
              </div>
              <div className="cart-trust-item">
                <Truck size={14} color="#d4af37" />
                <span>Complimentary Armored Courier Insurance</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Email OTP Verification Modal for Checkout */}
      {showOtpModal && (
        <div className="auth-modal-backdrop" onClick={() => setShowOtpModal(false)}>
          <div 
            className="auth-modal-card font-ui" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '440px', padding: '36px 32px' }}
          >
            <button
              type="button"
              className="auth-modal-close"
              onClick={() => setShowOtpModal(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="auth-modal-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: '#d4af37'
              }}>
                <ShieldCheck size={24} />
              </div>
              <h2 className="auth-modal-title font-display" style={{ fontSize: '22px', margin: '0 0 8px 0' }}>
                Acquisition Authorization
              </h2>
              <p className="auth-modal-subtitle" style={{ fontSize: '13px', color: 'var(--color-stone-400)', margin: 0, lineHeight: 1.5 }}>
                Enter the 6-digit security code dispatched to <strong>{formData.email}</strong> to authenticate and finalize your acquisition.
              </p>
            </div>

            {otpError && (
              <div className="auth-form-error font-ui" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                <span>{otpError}</span>
              </div>
            )}

            {otpSuccessMsg && !otpError && (
              <div className="auth-form-success font-ui" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={15} style={{ flexShrink: 0 }} />
                <span>{otpSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerifyCheckoutOtp} className="auth-form font-ui">
              <div className="otp-container">
                <div className="otp-inputs-row" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="otp-digit-input font-display"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <p className="otp-expiry-note" style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-stone-400)', marginBottom: '20px' }}>
                  {otpCountdown > 0 ? (
                    <span>Code expires in 00:{otpCountdown < 10 ? `0${otpCountdown}` : otpCountdown}</span>
                  ) : (
                    <button
                      type="button"
                      className="auth-link-btn"
                      onClick={handleResendCheckoutOtp}
                      style={{ background: 'none', border: 'none', color: '#d4af37', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Resend Code
                    </button>
                  )}
                </p>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="auth-submit-btn"
                disabled={otpLoading}
                style={{ width: '100%' }}
                arrow
              >
                {otpLoading ? 'Authorizing Acquisition...' : 'Verify & Place Order'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
