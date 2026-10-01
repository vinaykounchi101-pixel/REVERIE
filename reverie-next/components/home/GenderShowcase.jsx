"use client";
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Compass, Heart } from 'lucide-react';
import { allWatchCatalog } from '../../data/allProductsData';
import Button from '../ui/Button';

export default function GenderShowcase({ onNavigate, onSelectProduct, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('men');

  const mensFeatured = allWatchCatalog.filter(w => w.gender === 'Men').slice(0, 4);
  const womensFeatured = allWatchCatalog.filter(w => w.gender === 'Women').slice(0, 4);

  const displayWatches = activeTab === 'men' ? mensFeatured : womensFeatured;

  const handleExploreAll = () => {
    if (onNavigate) {
      onNavigate('collections', { gender: activeTab === 'men' ? 'Men' : 'Women' });
    }
  };

  return (
    <section className="gender-showcase-section">
      <div className="container">
        {/* Section Header */}
        <div className="gender-showcase-header">
          <span className="eyebrow eyebrow-dark font-ui">
            CURATED HOROLOGICAL EDITIONS
          </span>
          <h2 className="gender-showcase-title font-display">
            Men's &amp; Women's Collections
          </h2>
          <p className="gender-showcase-subtitle font-ui">
            48 individually engineered timepieces. Explore dedicated calibres, diamond-set bezels,
            marine-grade divers, and haute skeleton complications.
          </p>

          {/* Tab Switcher */}
          <div className="gender-toggle-wrap">
            <button
              type="button"
              className={`gender-toggle-btn font-ui ${activeTab === 'men' ? 'gender-toggle-btn--active' : ''}`}
              onClick={() => setActiveTab('men')}
            >
              <Compass size={14} />
              <span>Men's Collection (24 Models • V-Series)</span>
            </button>
            <button
              type="button"
              className={`gender-toggle-btn font-ui ${activeTab === 'women' ? 'gender-toggle-btn--active' : ''}`}
              onClick={() => setActiveTab('women')}
            >
              <Sparkles size={14} />
              <span>Women's Collection (24 Models • W-Series)</span>
            </button>
          </div>
        </div>

        {/* 4-Watch Product Grid */}
        <div className="catalog-grid gender-showcase-catalog-grid">
          {displayWatches.map((watch) => (
            <article
              key={watch.id}
              className="catalog-card"
              onClick={() => onSelectProduct && onSelectProduct(watch)}
            >
              <div className="catalog-card-media">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="catalog-card-img"
                  loading="lazy"
                />
                <div className="catalog-card-badges">
                  <span className="catalog-card-ref font-ui">{watch.ref}</span>
                  <span className="catalog-card-gender-badge font-ui">{watch.gender}</span>
                </div>
              </div>

              <div className="catalog-card-body">
                <div className="catalog-card-meta">
                  <span className="catalog-card-collection font-ui">{watch.collection}</span>
                  <span className="catalog-card-dot">•</span>
                  <span className="catalog-card-cat font-ui">{watch.category}</span>
                </div>
                <h3 className="catalog-card-name font-ui">{watch.name}</h3>
                <p className="catalog-card-desc font-ui">{watch.shortDesc}</p>
                
                <div className="catalog-card-bottom">
                  <span className="catalog-card-price font-ui">{watch.priceFormatted}</span>
                  <Button
                    variant="primary"
                    className="catalog-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddToCart) onAddToCart(watch);
                    }}
                  >
                    Add to Bag
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA to view full 24 models */}
        <div className="gender-showcase-footer">
          <Button
            variant="secondary"
            arrow
            onClick={handleExploreAll}
          >
            {activeTab === 'men' 
              ? "View All 24 Men's Models (V-001 to V-024)" 
              : "View All 24 Women's Models (W-001 to W-024)"}
          </Button>
        </div>
      </div>
    </section>
  );
}

