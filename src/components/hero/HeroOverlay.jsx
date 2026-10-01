import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function HeroOverlay({ activePhase = 0, onExplore }) {
  const phases = [
    {
      badge: "HOROLOGY EDITION",
      ref: "R01 — ORION",
      title: "REVERIE NO. 01",
      subtitle: "Automatic mechanical horology emerging from darkness",
      specLabel: "CALIBRE",
      specVal: "Calibre R-101 Ultra-Thin",
    },
    {
      badge: "FLAGSHIP MASTERPIECE",
      ref: "39.5MM STEEL",
      title: "R01 — ORION",
      subtitle: "High-lustre 316L marine grade stainless steel with brushed bevels",
      specLabel: "DIMENSIONS",
      specVal: "39.5mm • 9.8mm Profile",
    },
    {
      badge: "CRAFT & FINISHING",
      ref: "DOUBLE SAPPHIRE",
      title: "DIAL & BEVEL DETAIL",
      subtitle: "Multi-layered anti-reflective sapphire crystal with faceted hour indices",
      specLabel: "CRYSTAL",
      specVal: "Double-Curved Anti-Reflective",
    },
    {
      badge: "MECHANICAL ESSENCE",
      ref: "EXPLODED CALIBRE",
      title: "ARCHITECTURE IN TIME",
      subtitle: "Synchronized mechanical harmony with Swiss 28,800 vph escapement",
      specLabel: "POWER RESERVE",
      specVal: "52 Hours Power Reserve",
    },
    {
      badge: "THE COLLECTION",
      ref: "FLAGSHIP CALIBRE",
      title: "TIMELESS PRECISION",
      subtitle: "Individually calibrated and tested to ±2 sec/day COSC standards",
      specLabel: "PRICE",
      specVal: "$4,800",
    },
  ];

  const currentPhase = phases[activePhase] || phases[0];

  return (
    <div className="hero-overlay-layer">
      {/* Top / Main Story Information */}
      <div className="container hero-overlay-container">
        <div className="hero-overlay-content">
          <div className="hero-overlay-badge font-mono">
            <span>{currentPhase.badge}</span>
            <span className="hero-badge-dot">•</span>
            <span>{currentPhase.ref}</span>
          </div>

          <h1 className="hero-overlay-title font-display">
            {currentPhase.title}
          </h1>

          <p className="hero-overlay-subtitle font-ui">
            {currentPhase.subtitle}
          </p>

          <div className="hero-overlay-specs font-mono">
            <span className="hero-spec-tag">{currentPhase.specLabel}</span>
            <span className="hero-spec-value">{currentPhase.specVal}</span>
          </div>

          <div className="hero-overlay-actions">
            <button
              type="button"
              className="hero-overlay-btn font-ui"
              onClick={onExplore}
            >
              <span>EXPLORE R01</span>
              <ArrowRight size={14} className="hero-btn-arrow-icon" />
            </button>
            <span className="hero-overlay-price font-mono">
              $4,800
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Clean Horological Scroll Cue */}
      <div className="container hero-overlay-footer">
        <div className="hero-overlay-origin font-mono">
          <span>GENÈVE, SWITZERLAND</span>
          <span className="hero-pagination-sep">•</span>
          <span>HAUTE HORLOGERIE</span>
        </div>

        <a
          href="#collections"
          className="hero-overlay-scroll-cue font-ui"
          aria-label="Scroll to explore collection"
        >
          <span className="hero-scroll-cue-text">SCROLL TO EXPLORE</span>
          <ChevronDown size={14} className="hero-scroll-cue-arrow" />
        </a>
      </div>
    </div>
  );
}
