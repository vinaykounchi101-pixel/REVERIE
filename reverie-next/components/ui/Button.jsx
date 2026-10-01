"use client";

import React from 'react';
import Link from 'next/link';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'white' | 'text' | 'text-light'
  className = '',
  onClick,
  href,
  icon,
  arrow = false,
  ...props
}) {
  const baseClass = variant.startsWith('text') ? 'btn-text' : 'btn';
  const variantClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'secondary'
      ? 'btn-secondary'
      : variant === 'white'
      ? 'btn-white'
      : variant === 'text-light'
      ? 'btn-text-light'
      : '';

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {arrow && (
        <span className="arrow-icon" aria-hidden="true">
          ?
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClass} ${variantClass} ${className}`.trim()}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      {...props}
    >
      {content}
    </button>
  );
}
