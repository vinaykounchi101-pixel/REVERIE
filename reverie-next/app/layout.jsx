import React from 'react';
import '../styles/globals.css';
import '../styles/hero3d.css';
import '../styles/components.css';
import '../styles/pages.css';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SmoothScroll from '../components/layout/SmoothScroll';

export const metadata = {
  title: 'REVERIE | Haute Horlogerie & Precision Swiss Timepieces',
  description: 'Discover REVERIE Swiss luxury mechanical timepieces. Precision horology, handcrafted calibers, and understated architectural elegance.',
  keywords: ['luxury watch', 'swiss horology', 'automatic watch', 'reverie timepieces', 'mechanical watch'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="velara-app antialiased" suppressHydrationWarning>
        <WishlistProvider>
          <CartProvider>
            <SmoothScroll>
              <Header />
              <main id="main-content" className="app-main-content">
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
