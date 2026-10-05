"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { allWatchCatalog } from '../data/allProductsData';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage (supports guest visitors seamlessly)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reverie_wishlist');
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      } else {
        setWishlistIds([]);
      }
    } catch (e) {
      console.error(e);
      setWishlistIds([]);
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('reverie_wishlist', JSON.stringify(wishlistIds));
      } catch (e) {}
    }
  }, [wishlistIds, isLoaded]);

  const toggleWishlist = (id) => {
    if (!id) return;
    setWishlistIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const addToWishlist = (id) => {
    if (!id) return;
    setWishlistIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeFromWishlist = (id) => {
    if (!id) return;
    setWishlistIds((prev) => prev.filter((item) => item !== id));
  };

  const isInWishlist = (id) => {
    if (!id) return false;
    return wishlistIds.includes(id);
  };

  const clearWishlist = () => {
    setWishlistIds([]);
  };

  // Derive full watch objects
  const wishlistItems = wishlistIds
    .map((id) => allWatchCatalog.find((w) => w.id === id))
    .filter(Boolean);

  const wishlistCount = wishlistIds.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
