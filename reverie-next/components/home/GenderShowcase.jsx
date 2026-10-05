"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Compass, Check, Heart } from 'lucide-react';
import { allWatchCatalog } from '../../data/allProductsData';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function GenderShowcase({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('men');
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const mensFeatured = allWatchCatalog.filter(w => w.gender === 'Men').slice(0, 4);
  const womensFeatured = allWatchCatalog.filter(w => w.gender === 'Women').slice(0, 4);

  const displayWatches = activeTab === 'men' ? mensFeatured : womensFeatured;

  const handleExploreAll = () => {
    if (onNavigate) {
      onNavigate('collections', { gender: activeTab === 'men' ? 'Men' : 'Women' });
    }
  };

  const handleToggleWishlist = (watchId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(watchId);
  };

  const handleAdd = (watch, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(watch, 1, watch.straps ? watch.straps[0] : 'Alligator Leather');
    setAddedId(watch.id);
    setTimeout(() => setAddedId(null), 2000);
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
          {displayWatches.map((watch) => {
            const isAdded = addedId === watch.id;
            return (
              <article key={watch.id} className="catalog-card">
                <Link
                  href={`/product/${watch.id}`}
                  className="catalog-card-link"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
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

                    <button
                      type="button"
                      onClick={(e) => handleToggleWishlist(watch.id, e)}
                      className={`catalog-card-wishlist ${isInWishlist(watch.id) ? 'catalog-card-wishlist--active' : ''}`}
                      aria-label={isInWishlist(watch.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart size={16} fill={isInWishlist(watch.id) ? '#d4af37' : 'none'} stroke={isInWishlist(watch.id) ? '#d4af37' : 'currentColor'} />
                    </button>
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
                        onClick={(e) => handleAdd(watch, e)}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} />
                            <span>Added</span>
                          </>
                        ) : (
                          'Add to Bag'
                        )}
                      </Button>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA to view full 24 models */}
        <div className="gender-showcase-footer">
          <Link
            href={`/collections?gender=${activeTab === 'men' ? 'Men' : 'Women'}`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="secondary"
              arrow
            >
              {activeTab === 'men' 
                ? "View All 24 Men's Models (V-001 to V-024)" 
                : "View All 24 Women's Models (W-001 to W-024)"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
