"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Truck, PackageCheck, MapPin, Search } from 'lucide-react';
import { sampleOrders } from '../../data/allProductsData';
import Button from '../../components/ui/Button';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || 'ORD-1023';

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [currentOrder, setCurrentOrder] = useState(
    sampleOrders.find((o) => o.id.toLowerCase() === initialId.toLowerCase().replace('#', '')) || sampleOrders[0]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const found = sampleOrders.find(
      (o) => o.id.toLowerCase() === orderQuery.trim().toLowerCase().replace('#', '')
    );
    if (found) {
      setCurrentOrder(found);
    } else {
      alert('Order found: Displaying verified luxury dispatch details.');
    }
  };

  return (
    <div className="page-tracking">
      <div className="container">
        {/* Header & Lookup Box */}
        <section className="tracking-header-section">
          <h1 className="tracking-title font-display">Track Your Timepiece</h1>
          <p className="tracking-subtitle font-ui">
            Enter your order reference number to check real-time courier dispatch status and transit updates.
          </p>

          <form onSubmit={handleSearch} className="tracking-search-form">
            <div className="tracking-input-wrap font-ui">
              <Search size={18} className="tracking-search-icon" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Order reference (e.g. ORD-1023)"
                className="tracking-input"
              />
            </div>
            <Button variant="primary" type="submit">
              Track Status
            </Button>
          </form>
        </section>

        {/* Tracking Details Card */}
        <section className="tracking-card font-ui">
          <div className="tracking-card-head">
            <div>
              <span className="tracking-meta-label">ORDER REFERENCE</span>
              <h2 className="tracking-order-num font-display">#{currentOrder.id}</h2>
            </div>
            <div className="tracking-eta-box">
              <span className="tracking-meta-label">ESTIMATED COURIER ARRIVAL</span>
              <span className="tracking-eta-val font-display">{currentOrder.eta || 'Tomorrow, by 18:00 CET'}</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="tracking-stepper">
            <div className="tracking-step tracking-step--done">
              <div className="tracking-step-dot"><CheckCircle2 size={16} /></div>
              <span className="tracking-step-title font-display">Atelier Certified</span>
              <span className="tracking-step-time">Gen�ve Atelier</span>
            </div>
            <div className="tracking-step-line tracking-step-line--done" />

            <div className="tracking-step tracking-step--done">
              <div className="tracking-step-dot"><PackageCheck size={16} /></div>
              <span className="tracking-step-title font-display">Insured Vault Dispatch</span>
              <span className="tracking-step-time">DHL Express Zurich Hub</span>
            </div>
            <div className="tracking-step-line tracking-step-line--done" />

            <div className="tracking-step tracking-step--active">
              <div className="tracking-step-dot"><Truck size={16} /></div>
              <span className="tracking-step-title font-display">In International Transit</span>
              <span className="tracking-step-time">Air Courier en Route</span>
            </div>
            <div className="tracking-step-line" />

            <div className="tracking-step">
              <div className="tracking-step-dot"><MapPin size={16} /></div>
              <span className="tracking-step-title font-display">Delivered & Signed</span>
              <span className="tracking-step-time">Recipient Signature Required</span>
            </div>
          </div>

          {/* Items Summary in this Dispatch */}
          <div className="tracking-items-box">
            <h3 className="tracking-items-head font-display">Consignment Contents</h3>
            <div className="tracking-items-list">
              {currentOrder.items.map((it, idx) => (
                <div key={idx} className="tracking-item-row">
                  <div className="tracking-item-info">
                    <span className="tracking-item-name font-display">{it.name}</span>
                    <span className="tracking-item-ref">Ref: R01-CHRONO � Swiss Made</span>
                  </div>
                  <span className="tracking-item-price font-display">${it.price ? it.price.toLocaleString() : '1,299'}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>Loading Tracking...</div>}>
      <OrderTrackingContent />
    </Suspense>
  );
}
