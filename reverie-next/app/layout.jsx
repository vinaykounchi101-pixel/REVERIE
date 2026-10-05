import React from 'react';
import { Inter, Cormorant_Garamond, Cinzel } from 'next/font/google';
import '../styles/globals.css';
import '../styles/hero3d.css';
import '../styles/components.css';
import '../styles/pages.css';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SmoothScroll from '../components/layout/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata = {
  title: 'REVERIE | Haute Horlogerie & Precision Swiss Timepieces',
  description: 'Discover REVERIE Swiss luxury mechanical timepieces. Precision horology, handcrafted calibers, and understated architectural elegance.',
  keywords: ['luxury watch', 'swiss horology', 'automatic watch', 'reverie timepieces', 'mechanical watch'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${cinzel.variable}`}>
      <body className="velara-app antialiased">
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
