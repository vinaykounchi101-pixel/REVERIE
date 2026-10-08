import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
  showCloseButton = true,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    // Lock body scroll when modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="admin-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`admin-modal-card ${maxWidth}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || subtitle || showCloseButton) && (
          <div className="admin-modal-header">
            <div>
              {subtitle && (
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold block">
                  {subtitle}
                </span>
              )}
              {title && (
                <h3 className="font-serif text-2xl text-[#0F172A] font-medium mt-1">
                  {title}
                </h3>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="admin-modal-close-btn"
                aria-label="Close dialog"
              >
                <X style={{ width: 18, height: 18 }} />
              </button>
            )}
          </div>
        )}

        <div className="admin-modal-body">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
