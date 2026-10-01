"use client";
import React from 'react';

export default function ProductImage({
  src,
  alt,
  aspectRatio = '4/5',
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
        className={`product-image-img product-image-fit--${fit}`}
      />
      {overlay && <div className="product-image-overlay" />}
    </div>
  );
}

