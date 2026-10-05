"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag, ArrowRight, Check, Compass, ShieldCheck, Sparkles, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import AuthModal from '../../components/auth/AuthModal';
import { authService } from '../../services/authService';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const currentUser = authService.getCurrentUser();

  const handleAddToCart = (watch, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(watch, 1, watch.straps ? watch.straps[0] : 'Steel Bracelet');
    setAddedItem(watch.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const handleRemove = (watchId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(watchId);
  };

  if (wishlistCount === 0) {
    return (
      <div className="page-wishlist container" style={{ paddingTop: 'calc(var(--header-height) + var(--space-12))', paddingBottom: 'var(--space-28)' }}>
        <div className="cart-empty-box font-ui" style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', color: 'var(--color-warm-300, #d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
            <Heart size={32} strokeWidth={1.25} />
          </div>
          <span className="eyebrow eyebrow-dark font-ui">COLLECTOR CURATION</span>
          <h1 className="font-display" style={{ fontSize: '32px', margin: '8px 0 12px', color: 'var(--color-text-primary)' }}>
            Your Wishlist is Empty
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px', maxWidth: '420px', margin: '0 auto 28px' }}>
            Curate your private selection of Haute Horlogerie timepieces, or identify yourself to retrieve your saved collection across devices.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '380px', margin: '0 auto' }}>
            <Button variant="primary" href="/collections" arrow style={{ flex: '1 1 170px' }}>
              Explore Collections
            </Button>
            
            {!currentUser ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                style={{ flex: '1 1 170px' }}
              >
                Sign In / Sign Up
              </Button>
            ) : (
              <Button variant="secondary" href="/account" style={{ flex: '1 1 170px' }}>
                View Collector Portal
              </Button>
            )}
          </div>
        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
          onAuthSuccess={() => setAuthModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="page-wishlist container" style={{ paddingTop: 'calc(var(--header-height) + var(--space-8))', paddingBottom: 'var(--space-28)' }}>
      {/* Header */}
      <div className="wishlist-page-header font-ui" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-8)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <span className="eyebrow eyebrow-dark font-ui">SAVED REFERENCES</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', margin: '4px 0', color: 'var(--color-text-primary)' }}>
            Curated Wishlist
          </h1>
          <p style={{ color: 'var(--color-stone-400)', fontSize: '13px' }}>
            {wishlistCount} {wishlistCount === 1 ? 'timepiece' : 'timepieces'} saved in your private atelier selection.
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-stone-400)',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            transition: 'color 0.2s',
            marginTop: '8px'
          }}
          onMouseEnter={(e) => (e.target.style.color = '#ef4444')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--color-stone-400)')}
        >
          Clear All References
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="collections-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 'var(--space-6)' }}>
        {wishlistItems.map((watch) => {
          const isAdded = addedItem === watch.id;
          const specs = watch.specs || {};

          return (
            <article
              key={watch.id}
              className="catalog-card font-ui"
              style={{
                position: 'relative',
                background: 'linear-gradient(180deg, rgba(24, 27, 35, 0.7) 0%, rgba(13, 15, 20, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
            >
              <Link
                href={`/product/${watch.id}`}
                className="catalog-card-link"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                {/* Media Container */}
                <div
                  className="catalog-card-media"
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    background: 'radial-gradient(circle at 50% 45%, #222630 0%, #11141a 70%, #0a0b0e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={watch.image}
                    alt={`REVERIE ${watch.name}`}
                    className="catalog-card-img"
                    style={{
                      maxHeight: '85%',
                      maxWidth: '85%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.8))',
                      transition: 'transform 0.4s ease'
                    }}
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '10px', letterSpacing: '0.08em', fontWeight: 600, padding: '3px 8px', background: 'rgba(10,11,14,0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '9999px', color: '#d4af37' }}>
                      {watch.ref}
                    </span>
                    <span style={{ fontSize: '10px', letterSpacing: '0.04em', fontWeight: 500, padding: '3px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', color: 'var(--color-stone-300)' }}>
                      {watch.gender}
                    </span>
                  </div>

                  {/* Remove Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(watch.id, e)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(10,11,14,0.75)',
                      backdropFilter: 'blur(6px)',
                      border: '1px solid rgba(212,175,55,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4af37',
                      cursor: 'pointer',
                      zIndex: 5
                    }}
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={16} fill="#d4af37" stroke="#d4af37" />
                  </button>
                </div>

                {/* Card Content */}
                <div style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-stone-400)' }}>
                      {watch.collection} Collection
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--color-stone-400)' }}>
                      {specs.caseDiameter || '40mm'}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: '18px', fontWeight: 500, margin: '2px 0 6px', color: 'var(--color-text-primary)' }}>
                    {watch.name}
                  </h3>

                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.45', marginBottom: '14px', flexGrow: 1 }}>
                    {watch.shortDesc || `${specs.movement || 'Automatic calibre'} with sapphire crystal and 5-Year warranty.`}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="font-display" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-warm-300, #d4af37)' }}>
                      ${watch.price ? watch.price.toLocaleString() : '1,250'}
                    </span>

                    <Button
                      variant="primary"
                      onClick={(e) => handleAddToCart(watch, e)}
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} />
                          <span>Added</span>
                        </>
                      ) : (
                        'Add to Bag'
                      )}
                    </Button>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
