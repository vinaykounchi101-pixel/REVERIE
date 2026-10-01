"use client";

import React from 'react';
import Link from 'next/link';
import Button from './Button';

export default function CollectionCard({
  collection,
  className = '',
}) {
  const { name, tagline, description, image, href = '/collections' } = collection;

  return (
    <article className={`collection-card ${className}`.trim()}>
      <Link href={href} className="collection-card-link-wrapper" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="collection-card-media">
          <img
            src={image}
            alt={`REVERIE ${name} Collection`}
            className="collection-card-img"
            loading="lazy"
          />
        </div>

        <div className="collection-card-content">
          <h3 className="collection-card-title font-ui">
            {name}
          </h3>
          <p className="collection-card-description font-ui">
            {description || tagline}
          </p>
          <div className="collection-card-cta">
            <Button variant="text" href={href} arrow>
              View Collection
            </Button>
          </div>
        </div>
      </Link>
    </article>
  );
}
