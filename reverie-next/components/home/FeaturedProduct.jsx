"use client";
import React, { useState } from 'react';
import { Clock, Sparkles, Shield, Droplets, Maximize2, Check } from 'lucide-react';
import { featuredWatchData } from '../../data/watchData';
import Button from '../ui/Button';

const iconMap = {
  Clock: Clock,
  Sparkles: Sparkles,
  Shield: Shield,
  Droplets: Droplets,
  Maximize2: Maximize2,
};

export default function FeaturedProduct({ onAddToCart, onNavigate, onSelectProduct }) {
  const [selectedVariant, setSelectedVariant] = useState('navy');
  const [added, setAdded] = useState(false);

  const { eyebrow, name, price, description, ctaText, image, specifications, variants } =
    featuredWatchData;

  const handleAdd = () => {
    if (onAddToCart) onAddToCart({ ...featuredWatchData, id: 'r06-dive' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="featured" className="featured-section">
      <div className="container">
        <div className="featured-grid">
          {/* Left: Dominant Watch Image */}
          <div className="featured-image-stage">
            <div className="featured-image-wrapper">
              <img
                src={image}
                alt={`REVERIE ${name}`}
                className="featured-watch-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Center: Product Story & CTA */}
          <div className="featured-content">
            <span className="eyebrow eyebrow-dark font-ui">
              {eyebrow}
            </span>
            <h2 className="featured-title font-display">
              {name}
            </h2>
            <div className="featured-price font-ui">
              {price}
            </div>
            <p className="featured-desc font-ui">
              {description}
            </p>

            {/* Dial Finish Swatches */}
            <div className="featured-variants">
              <div className="featured-swatches-row">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-label={v.name}
                    title={v.name}
                    className={`featured-swatch ${
                      selectedVariant === v.id ? 'featured-swatch--active' : ''
                    }`}
                    style={{ backgroundColor: v.color }}
                    onClick={() => setSelectedVariant(v.id)}
                  />
                ))}
              </div>
            </div>

            <div className="featured-cta-wrap">
              <Button
                variant="white"
                onClick={handleAdd}
                arrow={!added}
                className="featured-purchase-btn"
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  ctaText
                )}
              </Button>
            </div>
          </div>

          {/* Right: Technical Specifications (Quiet Vertical List) */}
          <div className="featured-specs-panel">
            <ul className="featured-specs-list">
              {specifications.map((spec) => {
                const IconComp = iconMap[spec.icon] || Shield;
                return (
                  <li key={spec.label} className="featured-spec-item font-ui">
                    <IconComp size={15} strokeWidth={1.25} className="featured-spec-icon" />
                    <span className="featured-spec-value">{spec.value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

