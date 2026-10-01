import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left', // 'left' | 'center'
  theme = 'light', // 'light' | 'dark'
  className = '',
  action,
}) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`section-heading section-heading--${align} section-heading--${theme} ${className}`.trim()}
    >
      {eyebrow && (
        <span className={`eyebrow ${isDark ? 'eyebrow-dark' : ''}`}>
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="section-title font-display">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="section-subtitle font-ui">
          {subtitle}
        </p>
      )}
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  );
}
