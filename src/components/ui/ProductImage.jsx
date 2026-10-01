import React from 'react';

export default function ProductImage({
  src,
  alt,
  aspectRatio = '4/5', // '4/5' | '3/4' | '1/1' | '16/9'
  className = '',
  priority = false,
  overlay = false,
  fit = 'cover',
}) {
  return (
    <div
      className={`product-image-container ${className}`.trim()}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt || 'REVERIE luxury timepiece'}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`product-image-img product-image-fit--${fit}`}
      />
      {overlay && <div className="product-image-overlay" />}
    </div>
  );
}
