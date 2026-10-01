"use client";

import React from 'react';

export default function IconButton({
  icon,
  label,
  onClick,
  badge,
  className = '',
  variant = 'dark', // 'dark' | 'light'
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`icon-button icon-button--${variant} ${className}`.trim()}
      {...props}
    >
      <span className="icon-wrapper">{icon}</span>
      {badge !== undefined && badge > 0 && (
        <span className="icon-badge" aria-hidden="true">
          {badge}
        </span>
      )}
    </button>
  );
}
