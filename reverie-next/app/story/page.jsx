import React from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';

export const metadata = {
  title: 'Brand Story & Atelier Heritage | REVERIE Horology',
  description: 'Discover the heritage, master watchmakers, and horological philosophy of REVERIE in Genève, Switzerland.',
};

export default function BrandStoryPage() {
  return (
    <div className="page-story">
      {/* Editorial Hero */}
      <section className="story-hero">
        <div className="story-hero-bg-wrap">
          <img src="/assets/brand-story.jpg" alt="Swiss Alps at Twilight" className="story-hero-bg" />
          <div className="story-hero-overlay" />
        </div>
        <div className="container story-hero-content">
          <span className="eyebrow eyebrow-dark font-ui">OUR HERITAGE & ATELIER</span>
          <h1 className="story-hero-title font-display">
            More than a watch.<br />A legacy on your wrist.
          </h1>
          <p className="story-hero-subtitle font-ui">
            Crafted in Genève with uncompromising devotion to chronometric precision and aesthetic restraint.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Philosophy */}
      <section className="container story-chapter-section">
        <div className="story-chapter-grid">
          <div className="story-chapter-text">
            <span className="eyebrow font-ui">CHAPTER I</span>
            <h2 className="story-chapter-title font-display">The Philosophy of Restraint</h2>
            <p className="story-chapter-para font-ui">
              REVERIE was born from a fundamental question: In an era of fleeting novelties and digital noise, what defines an object of permanent value?
            </p>
            <p className="story-chapter-para font-ui">
              Our answer lies in horological purism. We strip away superficial ornament to reveal the pure geometry of time: hand-beveled lugs, uncluttered dials, and mechanical calibers assembled by master watchmakers with generations of accumulated mastery.
            </p>
          </div>
          <div className="story-chapter-image-wrap">
            <img src="/assets/collection-editorial.jpg" alt="Macro dial finishing" className="story-chapter-img" />
          </div>
        </div>
      </section>

      {/* Chapter 2: The Movement & Craft */}
      <section className="story-chapter-dark">
        <div className="container story-chapter-grid story-chapter-grid--reverse">
          <div className="story-chapter-text">
            <span className="eyebrow eyebrow-dark font-ui">CHAPTER II</span>
            <h2 className="story-chapter-title font-display" style={{ color: 'var(--color-dark-text-primary)' }}>
              Swiss Precision in Every Caliber
            </h2>
            <p className="story-chapter-para font-ui" style={{ color: 'var(--color-dark-text-secondary)' }}>
              Every REVERIE timepiece houses an automatic movement adjusted in five positions to chronometer tolerances. 
              Our calibers feature bespoke tungsten oscillating weights, Glucydur balance wheels, and Nivaflex mainsprings guaranteeing up to 70 hours of uninterrupted power reserve.
            </p>
            <div className="story-metrics-row font-ui">
              <div className="story-metric">
                <span className="story-metric-val">70h</span>
                <span className="story-metric-lbl">Power Reserve</span>
              </div>
              <div className="story-metric">
                <span className="story-metric-val">28,800</span>
                <span className="story-metric-lbl">Vibrations / Hour</span>
              </div>
              <div className="story-metric">
                <span className="story-metric-val">-2/+2s</span>
                <span className="story-metric-lbl">Daily Tolerance</span>
              </div>
            </div>
          </div>
          <div className="story-chapter-image-wrap">
            <img src="/assets/craft-movement.jpg" alt="Mechanical Movement" className="story-chapter-img" />
          </div>
        </div>
      </section>

      {/* Photo Journal & Call to Action */}
      <section className="container story-gallery-section">
        <div className="story-gallery-header">
          <h2 className="font-display" style={{ fontSize: '36px' }}>The Atelier Gallery</h2>
          <p className="font-ui" style={{ color: 'var(--color-stone-500)', marginTop: '8px' }}>
            Moments captured inside our manufacture workshops in Geneva.
          </p>
        </div>

        <div className="story-gallery-grid">
          <img src="/assets/craft-crown.jpg" alt="Crown machining" className="story-gallery-img" />
          <img src="/assets/craft-crystal.jpg" alt="Sapphire crystal fitting" className="story-gallery-img" />
          <img src="/assets/hero-watch.jpg" alt="Final quality assembly" className="story-gallery-img" />
        </div>

        <div className="story-cta-box">
          <h3 className="font-display" style={{ fontSize: '32px', marginBottom: '12px' }}>Experience REVERIE on Your Wrist</h3>
          <p className="font-ui" style={{ color: 'var(--color-stone-500)', marginBottom: '24px' }}>
            Explore our curated collections of Swiss luxury timepieces.
          </p>
          <Link href="/collections">
            <Button variant="primary" arrow>
              Explore All Collections
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
