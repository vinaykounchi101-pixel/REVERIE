"use client";
import React from 'react';
import { craftsmanshipData } from '../../data/watchData';
import Button from '../ui/Button';

export default function CraftsmanshipSection({ onNavigate }) {
  const { eyebrow, title, description, ctaText, heroImage, details } = craftsmanshipData;

  const handleCta = () => {
    if (onNavigate) {
      onNavigate('about');
    }
  };

  return (
    <section id="craftsmanship" className="craftsmanship-section">
      <div className="container">
        {/* Editorial Split Layout: Left Macro Image (45-55%) + Right Details (45-55%) */}
        <div className="craftsmanship-split-layout">
          {/* Left Large Macro Image */}
          <div className="craftsmanship-macro-stage">
            <div className="craftsmanship-macro-wrapper">
              <img
                src={heroImage || "/assets/collection-editorial.jpg"}
                alt="REVERIE Dial Macro Precision Craftsmanship"
                className="craftsmanship-macro-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & 3 Detail Blocks */}
          <div className="craftsmanship-content-col">
            <div className="craftsmanship-editorial-head">
              <span className="eyebrow eyebrow-dark font-ui">
                {eyebrow}
              </span>
              <h2 className="craftsmanship-title font-display">
                {title}
              </h2>
              <p className="craftsmanship-desc font-ui">
                {description}
              </p>
              <div className="craftsmanship-action">
                <Button variant="text-light" onClick={handleCta} arrow>
                  {ctaText}
                </Button>
              </div>
            </div>

            {/* 3 Quiet Detail Blocks */}
            <div className="craftsmanship-details-row">
              {details.map((item) => (
                <div key={item.id} className="craft-detail-item font-ui">
                  <div className="craft-detail-img-wrap">
                    <img src={item.image} alt={item.title} className="craft-detail-thumb" />
                  </div>
                  <div className="craft-detail-text">
                    <h3 className="craft-detail-title">{item.title}</h3>
                    <p className="craft-detail-sub">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

