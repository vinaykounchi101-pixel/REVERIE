import React from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';

export const metadata = {
  title: 'Brand Story & Atelier Heritage | REVERIE Horology',
  description: 'Discover the heritage, master watchmakers, and horological philosophy of REVERIE in Gen�ve, Switzerland.',
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
            Crafted in Gen�ve with uncompromising devotion to chronometric precision and aesthetic restraint.
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

      {/* Chapter 2: The Atelier */}
      <section className="story-atelier-section">
        <div className="container story-chapter-grid story-chapter-grid--reverse">
          <div className="story-chapter-text">
            <span className="eyebrow font-ui">CHAPTER II</span>
            <h2 className="story-chapter-title font-display">Handcrafted in Gen�ve</h2>
            <p className="story-chapter-para font-ui">
              Every REVERIE caliber undergoes hundreds of hours of manual finishing: C�tes de Gen�ve stripes, circular graining (perlage), and diamond-polished sinks.
            </p>
            <p className="story-chapter-para font-ui">
              Regulated in 5 distinct positions and across 3 temperatures, each timepiece is certified to exceed stringent chronometer standards before leaving our atelier.
            </p>
            <div className="story-stats-grid font-ui">
              <div className="story-stat-card">
                <span className="story-stat-val font-display">300+</span>
                <span className="story-stat-lbl">Individual Caliber Parts</span>
              </div>
              <div className="story-stat-card">
                <span className="story-stat-val font-display">120h</span>
                <span className="story-stat-lbl">Hand Polishing & Assembly</span>
              </div>
              <div className="story-stat-card">
                <span className="story-stat-val font-display">5-Year</span>
                <span className="story-stat-lbl">Atelier Warranty</span>
              </div>
            </div>
          </div>
          <div className="story-chapter-image-wrap">
            <img src="/assets/hero-watch.jpg" alt="Atelier movement assembly" className="story-chapter-img" />
          </div>
        </div>
      </section>

      {/* Heritage Quote */}
      <section className="container story-quote-section">
        <blockquote className="story-blockquote font-display">
          �True luxury is not about excess � it is the quiet confidence of absolute perfection.�
        </blockquote>
        <cite className="story-cite font-ui">� Master Horologist, REVERIE Manufacture</cite>
        <div className="story-cta-wrap">
          <Button variant="primary" href="/collections" arrow>
            Explore The Timepieces
          </Button>
        </div>
      </section>
    </div>
  );
}
