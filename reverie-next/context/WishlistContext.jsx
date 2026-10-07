"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { allWatchCatalog } from '../data/allProductsData';
import { wishlistService } from '../services/wishlistService';
import { authService } from '../services/authService';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from backend (if authenticated) or localStorage
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (authService.isAuthenticated()) {
          const backendData = await wishlistService.getWishlist();
          if (backendData && backendData.items && Array.isArray(backendData.items)) {
            const ids = backendData.items.map((i) => i.productId || i.product?.id).filter(Boolean);
            if (ids.length > 0) {
              setWishlistIds(ids);
              setIsLoaded(true);
              return;
            }
          }
        }
        const saved = localStorage.getItem('reverie_wishlist');
        if (saved) {
          setWishlistIds(JSON.parse(saved));
        } else {
          setWishlistIds([]);
        }
      } catch (e) {
        setWishlistIds([]);
      }
      setIsLoaded(true);
    };

    loadWishlist();

    const handleAuthChange = () => {
      loadWishlist();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('reverie_auth_change', handleAuthChange);
      return () => window.removeEventListener('reverie_auth_change', handleAuthChange);
    }
  }, []);

  // Sync to localStorage and backend
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('reverie_wishlist', JSON.stringify(wishlistIds));
      } catch (e) {}
    }
  }, [wishlistIds, isLoaded]);

  const toggleWishlist = async (id) => {
    if (!id) return;
    const isAdding = !wishlistIds.includes(id);
    setWishlistIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });

    if (authService.isAuthenticated()) {
      if (isAdding) {
        await wishlistService.addItem(id).catch(() => null);
      } else {
        await wishlistService.removeItem(id).catch(() => null);
      }
    }
  };

  const addToWishlist = async (id) => {
    if (!id) return;
    setWishlistIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });

    if (authService.isAuthenticated()) {
      await wishlistService.addItem(id).catch(() => null);
    }
  };

  const removeFromWishlist = async (id) => {
    if (!id) return;
    setWishlistIds((prev) => prev.filter((item) => item !== id));

    if (authService.isAuthenticated()) {
      await wishlistService.removeItem(id).catch(() => null);
    }
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
