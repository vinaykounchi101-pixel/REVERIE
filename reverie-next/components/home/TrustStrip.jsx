"use client";
import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import { trustItems } from '../../data/watchData';

const iconMap = {
  Truck: Truck,
  ShieldCheck: ShieldCheck,
  RotateCcw: RotateCcw,
  Headphones: Headphones,
};

export default function TrustStrip() {
  return (
    <section id="trust-strip" className="trust-strip">
      <div className="container">
        <div className="trust-strip-grid">
          {trustItems.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || ShieldCheck;
            return (
              <div key={item.id} className="trust-item">
                <IconComponent size={22} strokeWidth={1.25} className="trust-icon" />
                <div className="trust-item-text">
                  <h3 className="trust-item-title font-ui">
                    {item.title}
                  </h3>
                  <p className="trust-item-desc font-ui">
                    {item.description}
                  </p>
                </div>
                {index < trustItems.length - 1 && (
                  <div className="trust-separator desktop-only" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

