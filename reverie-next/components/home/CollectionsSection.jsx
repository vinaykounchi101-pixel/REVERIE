"use client";
import React from 'react';
import { collectionsData } from '../../data/watchData';
import CollectionCard from '../ui/CollectionCard';
import Button from '../ui/Button';

export default function CollectionsSection({ onNavigate, onSelectProduct }) {
  const handleShopAll = () => {
    if (onNavigate) {
      onNavigate('collections');
    }
  };

  return (
    <section id="collections" className="collections-section">
      <div className="container">
        <div className="collections-layout">
          {/* Left Large Editorial Feature Banner */}
          <div className="collections-editorial-hero" onClick={handleShopAll}>
            <div className="collections-editorial-image-wrap">
              <img
                src="/assets/collection-editorial.jpg"
                alt="REVERIE Precision Horology Dial"
                className="collections-editorial-img"
                loading="lazy"
              />
              <div className="collections-editorial-overlay" />
            </div>

            <div className="collections-editorial-content">
              <span className="eyebrow eyebrow-dark font-ui">
                OUR COLLECTIONS
              </span>
              <h2 className="collections-editorial-title font-display">
                Find Your<br />Perfect Match
              </h2>
              <p className="collections-editorial-copy font-ui">
                Explore our curated collections, each designed to suit different styles,
                moments and personalities.
              </p>
              <div className="collections-editorial-cta">
                <Button variant="white" onClick={handleShopAll} arrow>
                  Shop All Collections
                </Button>
              </div>
            </div>
          </div>

          {/* Right 3 Editorial Collection Cards */}
          <div className="collections-cards-grid">
            {collectionsData.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                className="collection-card-item"
                onNavigate={onNavigate}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

