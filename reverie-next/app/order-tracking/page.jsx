"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Truck, PackageCheck, MapPin, Search, ShieldCheck, Clock } from 'lucide-react';
import { sampleOrders } from '../../data/allProductsData';
import { orderService } from '../../services/orderService';
import Button from '../../components/ui/Button';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || 'ORD-1023';

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadOrder(initialId);
  }, [initialId]);

  const loadOrder = async (queryId) => {
    if (!queryId) return;
    setIsLoading(true);
    const cleanId = queryId.trim().replace('#', '');
    try {
      const liveOrder = await orderService.getOrderByNumber(cleanId);
      if (liveOrder) {
        setCurrentOrder({
          id: liveOrder.orderNumber || liveOrder.orderId || cleanId,
          status: liveOrder.status || 'PROCESSING',
          eta: liveOrder.status === 'DELIVERED' ? 'Delivered' : 'Within 48h via DHL Armored Express',
          items: (liveOrder.items && liveOrder.items.length > 0) ? liveOrder.items.map(item => ({
            name: item.productName || item.name || 'Haute Horlogerie Timepiece',
            price: item.unitPricePaise ? Math.round(item.unitPricePaise / 100) : (item.price || 1299),
            sku: item.sku || 'R01-CHRONO',
          })) : sampleOrders[0].items,
          shippingAddress: liveOrder.shippingAddress || null,
        });
        setIsLoading(false);
        return;
      }
    } catch (e) {
      // Fallback
    }

    // Local sample fallback
    const found = sampleOrders.find(
      (o) => o.id.toLowerCase() === cleanId.toLowerCase()
    ) || sampleOrders[0];
    setCurrentOrder(found);
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadOrder(orderQuery);
  };

  const getStepStatus = (stepIndex, status) => {
    const s = (status || '').toUpperCase();
    if (s === 'DELIVERED') return 'done';
    if (s === 'SHIPPED' || s === 'OUT_FOR_DELIVERY') {
      return stepIndex <= 2 ? 'done' : (stepIndex === 3 ? 'active' : 'pending');
    }
    if (s === 'PROCESSING' || s === 'CONFIRMED') {
      return stepIndex <= 1 ? 'done' : (stepIndex === 2 ? 'active' : 'pending');
    }
    // Default PENDING / PLACED
    return stepIndex === 0 ? 'done' : (stepIndex === 1 ? 'active' : 'pending');
  };

  const displayOrder = currentOrder || sampleOrders[0];

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
                placeholder="Order reference (e.g. REV-1023)"
                className="tracking-input"
              />
            </div>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Track Status'}
            </Button>
          </form>
        </section>

        {/* Tracking Details Card */}
        <section className="tracking-card font-ui">
          <div className="tracking-card-head">
            <div>
              <span className="tracking-meta-label">ORDER REFERENCE</span>
              <h2 className="tracking-order-num font-display">#{displayOrder.id}</h2>
            </div>
            <div className="tracking-eta-box">
              <span className="tracking-meta-label">ESTIMATED COURIER ARRIVAL</span>
              <span className="tracking-eta-val font-display">{displayOrder.eta || 'Within 48h via DHL Armored Express'}</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="tracking-stepper">
            <div className={`tracking-step tracking-step--${getStepStatus(0, displayOrder.status)}`}>
              <div className="tracking-step-dot"><CheckCircle2 size={16} /></div>
              <span className="tracking-step-title font-display">Atelier Certified</span>
              <span className="tracking-step-time">Geneva Manufacture</span>
            </div>
            <div className={`tracking-step-line ${getStepStatus(1, displayOrder.status) === 'done' ? 'tracking-step-line--done' : ''}`} />

            <div className={`tracking-step tracking-step--${getStepStatus(1, displayOrder.status)}`}>
              <div className="tracking-step-dot"><PackageCheck size={16} /></div>
              <span className="tracking-step-title font-display">Insured Vault Dispatch</span>
              <span className="tracking-step-time">DHL Express Zurich Hub</span>
            </div>
            <div className={`tracking-step-line ${getStepStatus(2, displayOrder.status) === 'done' ? 'tracking-step-line--done' : ''}`} />

            <div className={`tracking-step tracking-step--${getStepStatus(2, displayOrder.status)}`}>
              <div className="tracking-step-dot"><Truck size={16} /></div>
              <span className="tracking-step-title font-display">In Transit</span>
              <span className="tracking-step-time">Armored Courier en Route</span>
            </div>
            <div className={`tracking-step-line ${getStepStatus(3, displayOrder.status) === 'done' ? 'tracking-step-line--done' : ''}`} />

            <div className={`tracking-step tracking-step--${getStepStatus(3, displayOrder.status)}`}>
              <div className="tracking-step-dot"><MapPin size={16} /></div>
              <span className="tracking-step-title font-display">Delivered & Signed</span>
              <span className="tracking-step-time">Recipient Signature Sealed</span>
            </div>
          </div>

          {/* Items Summary in this Dispatch */}
          <div className="tracking-items-box">
            <h3 className="tracking-items-head font-display">Consignment Contents</h3>
            <div className="tracking-items-list">
              {displayOrder.items && displayOrder.items.map((it, idx) => (
                <div key={idx} className="tracking-item-row">
                  <div className="tracking-item-info">
                    <span className="tracking-item-name font-display">{it.name}</span>
                    <span className="tracking-item-ref">Ref: {it.sku || 'R01-CHRONO'} • Swiss Made</span>
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
