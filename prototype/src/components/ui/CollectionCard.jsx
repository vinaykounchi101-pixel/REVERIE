import React from 'react';
import Button from './Button';

export default function CollectionCard({
  collection,
  className = '',
  onSelectProduct,
  onNavigate,
}) {
  const { name, tagline, description, image, href = '#featured' } = collection;

  const handleClick = () => {
    if (onNavigate) {
      onNavigate('collections');
    }
  };

  return (
    <article className={`collection-card ${className}`.trim()} onClick={handleClick}>
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
    </article>
  );
}
