import React from 'react';
import { brandStoryData } from '../../data/watchData';
import Button from '../ui/Button';

export default function BrandStory({ onNavigate }) {
  const { eyebrow, title, tagline, ctaText, backgroundImage } =
    brandStoryData;

  const handleCta = () => {
    if (onNavigate) {
      onNavigate('about');
    }
  };

  return (
    <section id="brand-story" className="brand-story-section">
      <div className="brand-story-bg-wrap">
        <img
          src={backgroundImage}
          alt="REVERIE Swiss Alpine Heritage"
          className="brand-story-bg-img"
          loading="lazy"
        />
        <div className="brand-story-overlay" />
      </div>

      <div className="container brand-story-container">
        <div className="brand-story-content">
          <span className="eyebrow eyebrow-dark font-ui">
            {eyebrow}
          </span>
          <h2 className="brand-story-title font-display">
            {title}
          </h2>
          <p className="brand-story-tagline font-display">
            {tagline}
          </p>
          <div className="brand-story-cta">
            <Button variant="white" onClick={handleCta} arrow>
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
