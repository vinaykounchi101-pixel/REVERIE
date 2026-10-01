import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import HeroScene3D from './HeroScene3D';
import { REVERIE_ORION_DATA, SCROLL_PHASES } from './heroConfig';

gsap.registerPlugin(ScrollTrigger);

export default function Reverie3DHero({ onNavigate, onSelectProduct }) {
  const heroWrapperRef = useRef(null);
  const pinSectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  // Check user prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // GSAP ScrollTrigger Pinned Scroll Film
  useEffect(() => {
    if (isReducedMotion) return;

    const wrapper = heroWrapperRef.current;
    const pinEl = pinSectionRef.current;
    if (!wrapper || !pinEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Update chapter index based on scroll milestones (6-stage product film)
          if (p < 0.18) {
            setActiveStoryIdx(0); // Arrival
          } else if (p < 0.38) {
            setActiveStoryIdx(1); // Hero Reveal
          } else if (p < 0.58) {
            setActiveStoryIdx(2); // Craftsmanship & Dial Detail
          } else if (p < 0.76) {
            setActiveStoryIdx(3); // Rotation & Profile
          } else if (p < 0.90) {
            setActiveStoryIdx(4); // Exhibition Caseback
          } else {
            setActiveStoryIdx(5); // Final Product Composition & Transition
          }
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const handleExplore = () => {
    if (onSelectProduct) {
      onSelectProduct({
        id: REVERIE_ORION_DATA.id,
        ref: 'R01',
        name: 'Reverie R01 Orion',
        price: 4800,
        image: '/assets/hero-watch.jpg',
        movement: REVERIE_ORION_DATA.calibre,
        water: REVERIE_ORION_DATA.waterResistance,
        reserve: REVERIE_ORION_DATA.reserve,
        case: REVERIE_ORION_DATA.caseMaterial,
      });
    } else if (onNavigate) {
      onNavigate('collections');
    }
  };

  const stories = [
    {
      badge: "HOROLOGY EDITION",
      ref: REVERIE_ORION_DATA.ref,
      title: "REVERIE NO. 01",
      subtitle: "Automatic mechanical horology emerging from darkness",
      specLabel: "CALIBRE",
      specVal: REVERIE_ORION_DATA.calibre,
    },
    {
      badge: "FLAGSHIP MASTERPIECE",
      ref: "39.5MM STEEL",
      title: "R01 — ORION",
      subtitle: "High-lustre 316L marine stainless steel with brushed architecture",
      specLabel: "DIMENSIONS",
      specVal: REVERIE_ORION_DATA.dimensions,
    },
    {
      badge: "CRAFT & FINISHING",
      ref: "DOUBLE SAPPHIRE",
      title: "DIAL & BEVEL DETAIL",
      subtitle: "Multi-layered anti-reflective sapphire crystal with faceted indices",
      specLabel: "CRYSTAL",
      specVal: REVERIE_ORION_DATA.crystal,
    },
    {
      badge: "CASE PROFILE",
      ref: "FLUTED CROWN",
      title: "9.8MM ULTRA-THIN",
      subtitle: "Sculpted side profile with architectural crown bevels and link curvature",
      specLabel: "WATER RESISTANCE",
      specVal: REVERIE_ORION_DATA.waterResistance,
    },
    {
      badge: "SWISS HOROLOGY",
      ref: "CALIBRE R-101",
      title: "EXHIBITION CASEBACK",
      subtitle: "Visible 28,800 vph escapement with Côtes de Genève oscillating rotor",
      specLabel: "POWER RESERVE",
      specVal: REVERIE_ORION_DATA.reserve,
    },
    {
      badge: "THE COLLECTION",
      ref: "LIMITED PRODUCTION",
      title: "TIMELESS PRECISION",
      subtitle: "Individually calibrated and tested to ±2 sec/day COSC standards",
      specLabel: "PRICE",
      specVal: REVERIE_ORION_DATA.price,
    },
  ];

  const currentStory = stories[activeStoryIdx] || stories[0];

  return (
    <div
      ref={heroWrapperRef}
      id="hero-scroll-container"
      className={`reverie-hero-scroll-track ${isReducedMotion ? 'reverie-hero-track--static' : ''}`}
    >
      <section
        ref={pinSectionRef}
        id="hero"
        className="reverie-3d-hero-stage"
      >
        {/* Subtle Obsidian / Surface Radial Background */}
        <div className="reverie-hero-backdrop" />

        {/* Center: Dominant Three.js 3D Luxury Watch (55-75% Viewport Scale) */}
        <div className="reverie-hero-canvas-wrap">
          <HeroScene3D
            scrollProgress={scrollProgress}
            isReducedMotion={isReducedMotion}
          />
        </div>

        {/* Left / Overlay: Minimal Restrained Horology Copy */}
        <div className="container reverie-hero-ui-container">
          <div className="reverie-hero-content">
            <div className="reverie-hero-ref-badge font-mono">
              <span>{currentStory.badge}</span>
              <span className="reverie-badge-sep">•</span>
              <span>{currentStory.ref}</span>
            </div>

            <h1 className="reverie-hero-headline font-display">
              {currentStory.title}
            </h1>

            <p className="reverie-hero-subtitle font-ui">
              {currentStory.subtitle}
            </p>

            <div className="reverie-hero-specs font-mono">
              <span className="reverie-spec-tag">{currentStory.specLabel}</span>
              <span className="reverie-spec-value">{currentStory.specVal}</span>
            </div>

            <div className="reverie-hero-actions">
              <button
                type="button"
                className="reverie-hero-btn-primary font-ui"
                onClick={handleExplore}
              >
                <span>EXPLORE TIMEPIECE</span>
                <ArrowRight size={15} className="reverie-btn-arrow" />
              </button>
              <span className="reverie-hero-price font-mono">
                {REVERIE_ORION_DATA.price}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Progress Indicator & Scroll Cue */}
        <div className="container reverie-hero-footer">
          <div className="reverie-hero-step font-mono">
            <span>0{activeStoryIdx + 1}</span>
            <span className="reverie-step-div">/</span>
            <span>06</span>
          </div>

          <a
            href="#collections"
            className="reverie-hero-scroll-cue font-ui"
            aria-label="Scroll to discover collection"
          >
            <span className="reverie-scroll-label">SCROLL TO EXPLORE</span>
            <ChevronDown size={14} className="reverie-scroll-arrow-icon" />
          </a>
        </div>
      </section>
    </div>
  );
}
