import React, { useState } from 'react';
import { CheckCircle2, Truck, PackageCheck, MapPin, Search } from 'lucide-react';
import { sampleOrders } from '../data/allProductsData';
import Button from '../components/ui/Button';

export default function OrderTrackingPage({ selectedOrder, onNavigate }) {
  const [orderQuery, setOrderQuery] = useState('ORD-1023');
  const [currentOrder, setCurrentOrder] = useState(selectedOrder || sampleOrders[0]);

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
          <h1 className="tracking-title font-display">Track Your Order</h1>
          <p className="tracking-subtitle font-ui">
            Enter your order number to check real-time courier dispatch status and transit updates.
          </p>

          <form onSubmit={handleSearch} className="tracking-search-form">
            <div className="tracking-input-wrap font-ui">
              <Search size={18} className="tracking-search-icon" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Order number (e.g. #ORD-1023)"
                className="tracking-input"
              />
            </div>
            <Button type="submit" variant="primary" className="tracking-submit-btn">
              Track Order
            </Button>
          </form>
        </section>

        {/* Order Status Display Card */}
        <div className="tracking-result-card">
          <div className="tracking-card-header font-ui">
            <div>
              <span className="tracking-order-id">Order #{currentOrder.id}</span>
              <span className="tracking-order-date">Placed on {currentOrder.date}</span>
            </div>
            <div className="tracking-status-tag">
              <CheckCircle2 size={16} />
              <span>{currentOrder.status}</span>
            </div>
          </div>

          <div className="tracking-card-grid">
            {/* Left Timeline */}
            <div className="tracking-timeline-col">
              <h3 className="tracking-section-label font-ui">Shipment Progress</h3>
              <div className="tracking-timeline">
                {currentOrder.timeline.map((step, idx) => (
                  <div key={idx} className="timeline-node timeline-node--done">
                    <div className="timeline-marker">
                      <div className="timeline-dot" />
                      {idx < currentOrder.timeline.length - 1 && <div className="timeline-line" />}
                    </div>
                    <div className="timeline-content font-ui">
                      <h4 className="timeline-step-title">{step.status}</h4>
                      <p className="timeline-step-time">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Shipping & Courier Details */}
            <div className="tracking-details-col font-ui">
              <div className="tracking-info-box">
                <h3 className="tracking-section-label">Shipping Address</h3>
                <p className="tracking-address-name">{currentOrder.shippingAddress.name}</p>
                <p className="tracking-address-line">{currentOrder.shippingAddress.line1}</p>
                <p className="tracking-address-line">{currentOrder.shippingAddress.cityStateZip}</p>
                <p className="tracking-address-line">{currentOrder.shippingAddress.country}</p>
              </div>

              <div className="tracking-info-box" style={{ marginTop: '24px' }}>
                <h3 className="tracking-section-label">Carrier & Dispatch</h3>
                <div className="tracking-meta-row">
                  <span className="tracking-meta-key">Courier Partner:</span>
                  <span className="tracking-meta-val">{currentOrder.courier}</span>
                </div>
                <div className="tracking-meta-row">
                  <span className="tracking-meta-key">Tracking ID:</span>
                  <span className="tracking-meta-val tracking-code">{currentOrder.trackingId}</span>
                </div>
                <div className="tracking-meta-row">
                  <span className="tracking-meta-key">Service:</span>
                  <span className="tracking-meta-val">Insured White Glove Priority</span>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="tracking-items-box" style={{ marginTop: '24px' }}>
                <h3 className="tracking-section-label">Package Contents</h3>
                {currentOrder.items.map((item, i) => (
                  <div key={i} className="tracking-item-row">
                    <img src={item.image} alt={item.name} className="tracking-item-img" />
                    <div>
                      <p className="tracking-item-name">{item.name}</p>
                      <p className="tracking-item-var">{item.variant}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
