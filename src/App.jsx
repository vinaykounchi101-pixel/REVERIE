import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import SupportPage from './pages/SupportPage';
import BrandStoryPage from './pages/BrandStoryPage';

// Catalog
import { allWatchCatalog, sampleOrders } from './data/allProductsData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(allWatchCatalog[0]);
  const [selectedOrder, setSelectedOrder] = useState(sampleOrders[0]);
  const [cartItems, setCartItems] = useState([
    {
      id: allWatchCatalog[0].id,
      name: allWatchCatalog[0].name,
      price: allWatchCatalog[0].price,
      quantity: 1,
      image: allWatchCatalog[0].image,
      ref: allWatchCatalog[0].ref,
      selectedStrap: 'Steel Bracelet',
    }
  ]);

  // Transition Orchestration State
  const [transitionStage, setTransitionStage] = useState('idle'); // 'idle' | 'exit' | 'enter'
  const [progressWidth, setProgressWidth] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const transitionTimerRef = useRef(null);

  // Cart Handlers
  const handleAddToCart = (productToAdd) => {
    const item = productToAdd || selectedProduct;
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: (p.quantity || 1) + (item.quantity || 1) }
            : p
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price || 1299,
          quantity: item.quantity || 1,
          image: item.image || '/assets/hero-watch.jpg',
          ref: item.ref || 'R06',
          selectedStrap: item.selectedStrap || 'Steel Bracelet',
        },
      ];
    });
  };

  const handleUpdateQty = (itemId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Perform smooth animated transition
  const executeTransition = useCallback((stateUpdateFn) => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // Step 1: Start exit phase & progress bar
    setTransitionStage('exit');
    setProgressVisible(true);
    setProgressWidth(70);

    // Step 2: Switch page state and reset scroll at apex of transition
    transitionTimerRef.current = setTimeout(() => {
      stateUpdateFn();
      window.scrollTo(0, 0);
      setProgressWidth(100);
      setTransitionStage('enter');

      // Refresh ScrollTrigger cleanly
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 50);

      // Step 3: Complete enter phase and settle to idle
      transitionTimerRef.current = setTimeout(() => {
        setTransitionStage('idle');
        setProgressVisible(false);
        setProgressWidth(0);
        ScrollTrigger.refresh();
      }, 300);
    }, 180);
  }, []);

  const handleSelectProduct = (product) => {
    executeTransition(() => {
      setSelectedProduct(product);
      setCurrentPage('pdp');
    });
  };

  const handleSelectOrder = (order) => {
    executeTransition(() => {
      setSelectedOrder(order);
      setCurrentPage('order-tracking');
    });
  };

  const handleNavigate = (page, options = {}) => {
    if (page === currentPage && !options.gender && !options.product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    executeTransition(() => {
      if (options && options.gender) {
        setSelectedGender(options.gender);
      }
      setCurrentPage(page);
    });
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="velara-app">
      {/* Top Luxury Gold Ambient Loading Indicator */}
      <div
        className="luxury-nav-progress-bar"
        style={{
          width: `${progressWidth}%`,
          opacity: progressVisible ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Cinematic Transition Veil */}
      <div
        className={`luxury-transition-veil ${
          transitionStage === 'exit' ? 'luxury-transition-veil--active' : ''
        }`}
        aria-hidden="true"
      />

      {/* Universal Header */}
      <Header
        cartCount={totalCartCount}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main id="main-content" className="app-main-content">
        <div className={`page-transition-wrapper page-transition--${transitionStage}`}>
          {currentPage === 'home' && (
            <HomePage
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentPage === 'collections' && (
            <CollectionsPage
              initialGender={selectedGender}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'pdp' && (
            <ProductDetailPage
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentPage === 'cart' && (
            <CartPage
              cartItems={cartItems}
              onUpdateQty={handleUpdateQty}
              onRemoveItem={handleRemoveItem}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'checkout' && (
            <CheckoutPage
              cartItems={cartItems}
              onNavigate={handleNavigate}
              onClearCart={handleClearCart}
            />
          )}

          {currentPage === 'account' && (
            <AccountPage
              onNavigate={handleNavigate}
              onSelectOrder={handleSelectOrder}
            />
          )}

          {currentPage === 'order-tracking' && (
            <OrderTrackingPage
              selectedOrder={selectedOrder}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'support' && (
            <SupportPage
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'about' && (
            <BrandStoryPage
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
