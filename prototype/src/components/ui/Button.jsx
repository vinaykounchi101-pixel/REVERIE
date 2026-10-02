"use client";

import React from 'react';
import Link from 'next/link';

export default function Button({
  children,
  variant = 'primary',
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

  const combinedClass = [baseClass, variantClass, className].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {arrow && (
        <span className="arrow-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '6px' }}>
          &rarr;
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={combinedClass}
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
      className={combinedClass}
      {...props}
    >
      {content}
    </button>
  );
}
