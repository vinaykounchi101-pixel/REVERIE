"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { allWatchCatalog, sampleOrders } from '../data/allProductsData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize with saved cart or empty
  useEffect(() => {
    try {
      const saved = localStorage.getItem('reverie_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      } else {
        setCartItems([]);
      }
    } catch (e) {
      console.error(e);
      setCartItems([]);
    }
    setIsLoaded(true);
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('reverie_cart', JSON.stringify(cartItems));
      } catch (e) {}
    }
  }, [cartItems, isLoaded]);

  const addToCart = (productToAdd, quantity = 1, selectedStrap = 'Steel Bracelet') => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === productToAdd.id && p.selectedStrap === selectedStrap);
      if (existing) {
        return prev.map((p) =>
          p.id === productToAdd.id && p.selectedStrap === selectedStrap
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [
        ...prev,
        {
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price || 1299,
          quantity: quantity,
          image: productToAdd.image || '/assets/hero-watch.jpg',
          ref: productToAdd.ref || 'R01',
          selectedStrap: selectedStrap,
        },
      ];
    });
  };

  const updateQuantity = (itemId, newQty, selectedStrap) => {
    if (newQty <= 0) {
      removeItem(itemId, selectedStrap);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId && (!selectedStrap || item.selectedStrap === selectedStrap)
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const removeItem = (itemId, selectedStrap) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === itemId && (!selectedStrap || item.selectedStrap === selectedStrap))
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalCartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
