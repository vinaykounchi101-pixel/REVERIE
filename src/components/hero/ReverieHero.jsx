import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroFrameCanvas from './HeroFrameCanvas';
import HeroOverlay from './HeroOverlay';

gsap.registerPlugin(ScrollTrigger);

export default function ReverieHero({ onNavigate, onSelectProduct }) {
  const containerRef = useRef(null);
  const pinTrackRef = useRef(null);
  const canvasHandleRef = useRef(null);
  const currentPhaseRef = useRef(0);

  const [activePhase, setActivePhase] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [totalFrames, setTotalFrames] = useState(240);
  const [isReady, setIsReady] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // GSAP ScrollTrigger Pinned Frame Sequence Scrub
  useEffect(() => {
    if (isReducedMotion) return;

    const container = containerRef.current;
    const pinEl = pinTrackRef.current;
    if (!container || !pinEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinEl,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Direct imperative canvas update (Zero React state churn on scroll)
          if (canvasHandleRef.current) {
            canvasHandleRef.current.updateProgress(p);
          }

          // 2. Compute Phase (0..4) and only update React state when step changes
          let nextPhase = 0;
          if (p < 0.20) {
            nextPhase = 0; // Phase 1: Assembled / Emergence
          } else if (p < 0.45) {
            nextPhase = 1; // Phase 2: Form & Proportions
          } else if (p < 0.70) {
            nextPhase = 2; // Phase 3: Craftsmanship & Finishing
          } else if (p < 0.88) {
            nextPhase = 3; // Phase 4: Exploded Calibre Transformation
          } else {
            nextPhase = 4; // Phase 5: Fully Exploded Hold
          }

          if (nextPhase !== currentPhaseRef.current) {
            currentPhaseRef.current = nextPhase;
            setActivePhase(nextPhase);
          }
        },
      });

      // Recalculate pin dimensions cleanly
      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const handleExplore = () => {
    if (onSelectProduct) {
      onSelectProduct({
        id: "r01-orion",
        ref: "R01",
        name: "Reverie R01 Orion",
        price: 4800,
        image: "/hero-sequence/ezgif-frame-001.jpg",
        movement: "Calibre R-101 Ultra-Thin Automatic",
        water: "50m (5 ATM)",
        reserve: "52 Hours Power Reserve",
        case: "316L High-Lustre Marine Grade Steel",
      });
    } else if (onNavigate) {
      onNavigate('collections');
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-sequence-container"
      className={`reverie-hero-sequence-track ${isReducedMotion ? 'reverie-hero-track--static' : ''}`}
    >
      <section
        ref={pinTrackRef}
        id="hero"
        className="reverie-hero-sticky-stage"
      >
        {/* Subtle Dark Obsidian Radial Backdrop */}
        <div className="hero-radial-backdrop" />

        {/* Minimal Luxury Preloader */}
        {!isReady && (
          <div className="hero-minimal-loader font-mono">
            <span className="hero-loader-title font-display">REVERIE</span>
            <span className="hero-loader-status">
              LOADING EXPERIENCE
            </span>
            <span className="hero-loader-count">
              {String(loadedFrames).padStart(3, '0')} / {String(totalFrames).padStart(3, '0')}
            </span>
          </div>
        )}

        {/* Cinematic Canvas Frame Sequence (Ref-driven, 60-120fps direct draw) */}
        <HeroFrameCanvas
          ref={canvasHandleRef}
          isReducedMotion={isReducedMotion}
          onLoadProgress={(loaded, total) => {
            setLoadedFrames(loaded);
            setTotalFrames(total);
            if (loaded >= total) setIsReady(true);
          }}
          onReady={() => setIsReady(true)}
        />

        {/* Synchronized Restrained Typography Overlay */}
        <HeroOverlay
          activePhase={activePhase}
          onExplore={handleExplore}
        />
      </section>
    </div>
  );
}
