"use client";
import React, { useState, useEffect } from 'react';
import { RotateCcw, ChevronDown, ArrowRight, ShieldCheck, Eye, Compass } from 'lucide-react';
import Button from '../ui/Button';

export const flagshipHeroWatches = [
  {
    id: "v-001",
    ref: "V-001",
    name: "Classic Royale Blue",
    subtitle: "Calibre V-101 Ultra-Thin Automatic • 40mm",
    price: "$1,250",
    movement: "Calibre V-101 Automatic",
    case: "316L Marine Grade Steel",
    reserve: "48H Power Reserve",
    water: "50m (5 ATM)",
    images: {
      front: "/assets/watch-classic-blue-front.jpg",
      angle: "/assets/watch-classic-blue-side.jpg",
      wrist: "/assets/watch-classic-blue-wrist.jpg"
    }
  },
  {
    id: "v-009",
    ref: "V-009",
    name: "Vanguard Chrono Panda",
    subtitle: "Calibre V-7750 Column-Wheel • 41.5mm",
    price: "$1,720",
    movement: "Calibre V-7750 Chronograph",
    case: "DLC Black & Brushed Steel",
    reserve: "62H Power Reserve",
    water: "100m (10 ATM)",
    images: {
      front: "/assets/watch-chrono-front.jpg",
      angle: "/assets/collection-sport.jpg",
      wrist: "/assets/craft-movement.jpg"
    }
  },
  {
    id: "v-013",
    ref: "V-013",
    name: "The Orion Diver 300",
    subtitle: "Calibre V-300 High-Beat Marine • 41mm",
    price: "$1,480",
    movement: "Calibre V-300 High-Beat",
    case: "Ceramic Bezel & 316L Steel",
    reserve: "70H Power Reserve",
    water: "300m (30 ATM)",
    images: {
      front: "/assets/watch-diver-side.jpg",
      angle: "/assets/hero-watch.jpg",
      wrist: "/assets/watch-3d.jpg"
    }
  },
  {
    id: "v-002",
    ref: "V-002",
    name: "Heritage 18k Rose Gold",
    subtitle: "Calibre V-102 Automatic • 39mm",
    price: "$1,450",
    movement: "Calibre V-102 Automatic",
    case: "18k 5N Rose Gold Alloy",
    reserve: "48H Power Reserve",
    water: "50m (5 ATM)",
    images: {
      front: "/assets/watch-heritage-gold-front.jpg",
      angle: "/assets/collection-heritage.jpg",
      wrist: "/assets/watch-classic-blue-wrist.jpg"
    }
  },
  {
    id: "w-005",
    ref: "W-005",
    name: "Celeste Pavé Diamond",
    subtitle: "Calibre W-200 Haute Joaillerie • 31mm",
    price: "$2,150",
    movement: "Calibre W-200 Swiss Jewel",
    case: "18k Rose Gold & Pavé Diamonds",
    reserve: "46H Power Reserve",
    water: "30m (3 ATM)",
    images: {
      front: "/assets/watch-celeste-diamond-front.jpg",
      angle: "/assets/watch-celeste-diamond-side.jpg",
      wrist: "/assets/watch-etoile-wrist.jpg"
    }
  }
];

export default function Hero({ onNavigate, onSelectProduct }) {
  const [activeWatchIdx, setActiveWatchIdx] = useState(0);
  const [activeAngle, setActiveAngle] = useState('front'); // 'front' | 'angle' | 'wrist'
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentWatch = flagshipHeroWatches[activeWatchIdx];

  const handleSelectWatch = (idx) => {
    if (idx === activeWatchIdx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveWatchIdx(idx);
      setIsTransitioning(false);
    }, 220);
  };

  const handleAngleChange = (angle) => {
    setActiveAngle(angle);
  };

  const handleExploreProduct = () => {
    if (onSelectProduct) {
      onSelectProduct(currentWatch);
    } else if (onNavigate) {
      onNavigate('pdp');
    }
  };

  const currentImageSrc = currentWatch.images[activeAngle] || currentWatch.images.front;

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-layer" />

      <div className="container hero-container">
        {/* Left Column: Brand Story & Active Watch Details */}
        <div className="hero-content">
          <div className="hero-ref-badge font-mono">
            <span>HOROLOGY EDITION</span>
            <span className="hero-badge-sep">•</span>
            <span>{currentWatch.ref}</span>
          </div>

          <h1 className={`hero-headline font-display ${isTransitioning ? 'hero-text--fade' : ''}`}>
            {currentWatch.name}
          </h1>

          <p className="hero-description font-ui">
            {currentWatch.subtitle}. Hand-assembled in Switzerland with double-domed scratch-resistant sapphire crystal and architectural crown bevels.
          </p>

          <div className="hero-specs-strip font-mono">
            <div className="hero-spec-item">
              <span className="hero-spec-label">CALIBRE</span>
              <span className="hero-spec-val">{currentWatch.movement}</span>
            </div>
            <div className="hero-spec-item">
              <span className="hero-spec-label">POWER</span>
              <span className="hero-spec-val">{currentWatch.reserve}</span>
            </div>
          </div>

          <div className="hero-cta-wrap">
            <span className="hero-price font-mono">{currentWatch.price}</span>
            <Button
              variant="white"
              onClick={handleExploreProduct}
              arrow
              className="hero-primary-btn"
            >
              Explore Timepiece
            </Button>
          </div>
        </div>

        {/* Center: Dominant Luxury Watch Presentation (55-75% Viewport Scale) */}
        <div className="hero-watch-stage">
          <div className={`hero-watch-wrapper ${isTransitioning ? 'hero-watch--shifting' : ''}`}>
            <img
              key={`${currentWatch.id}-${activeAngle}`}
              src={currentImageSrc}
              alt={`Velara ${currentWatch.name}`}
              className="hero-watch-image"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Right Column: Multi-Angle Stage Controls & Flagship Switcher */}
        <div className="hero-controls-panel">
          <div className="hero-angle-selector">
            <span className="hero-panel-title font-mono">CAMERA PERSPECTIVE</span>
            <div className="hero-angle-buttons">
              <button
                type="button"
                className={`hero-angle-btn font-ui ${activeAngle === 'front' ? 'hero-angle-btn--active' : ''}`}
                onClick={() => handleAngleChange('front')}
              >
                Front Architectural
              </button>
              <button
                type="button"
                className={`hero-angle-btn font-ui ${activeAngle === 'angle' ? 'hero-angle-btn--active' : ''}`}
                onClick={() => handleAngleChange('angle')}
              >
                45° Profile Perspective
              </button>
              <button
                type="button"
                className={`hero-angle-btn font-ui ${activeAngle === 'wrist' ? 'hero-angle-btn--active' : ''}`}
                onClick={() => handleAngleChange('wrist')}
              >
                On-Wrist Lifestyle
              </button>
            </div>
          </div>

          {/* Signature Flagship Switcher */}
          <div className="hero-flagship-list">
            <span className="hero-panel-title font-mono">CURATED CALIBRES</span>
            {flagshipHeroWatches.map((w, idx) => (
              <button
                key={w.id}
                type="button"
                className={`hero-flagship-item font-ui ${activeWatchIdx === idx ? 'hero-flagship-item--active' : ''}`}
                onClick={() => handleSelectWatch(idx)}
              >
                <span className="hero-flagship-ref font-mono">{w.ref}</span>
                <span className="hero-flagship-name">{w.name}</span>
                <span className="hero-flagship-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Quiet Slide Pagination & Scroll Indicator */}
      <div className="hero-bottom-bar container">
        <div className="hero-pagination font-mono">
          <span>0{activeWatchIdx + 1}</span>
          <span className="hero-pagination-divider">/</span>
          <span>0{flagshipHeroWatches.length}</span>
        </div>

        <a href="#collections" className="hero-scroll-indicator font-ui" aria-label="Scroll to collections">
          <span className="hero-scroll-text">SCROLL TO DISCOVER</span>
          <ChevronDown size={14} className="hero-scroll-arrow" />
        </a>
      </div>
    </section>
  );
}

