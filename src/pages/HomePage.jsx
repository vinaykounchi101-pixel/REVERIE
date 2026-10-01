import React from 'react';
import ReverieHero from '../components/hero/ReverieHero';
import TrustStrip from '../components/home/TrustStrip';
import CollectionsSection from '../components/home/CollectionsSection';
import GenderShowcase from '../components/home/GenderShowcase';
import FeaturedProduct from '../components/home/FeaturedProduct';
import CraftsmanshipSection from '../components/home/CraftsmanshipSection';
import ThreeDExperience from '../components/home/ThreeDExperience';
import BrandStory from '../components/home/BrandStory';

export default function HomePage({ onAddToCart, onNavigate, onSelectProduct }) {
  return (
    <div className="page-home">
      <ReverieHero onNavigate={onNavigate} onSelectProduct={onSelectProduct} />
      <TrustStrip />
      <CollectionsSection onNavigate={onNavigate} onSelectProduct={onSelectProduct} />
      <GenderShowcase onNavigate={onNavigate} onAddToCart={onAddToCart} onSelectProduct={onSelectProduct} />
      <FeaturedProduct onAddToCart={onAddToCart} onNavigate={onNavigate} onSelectProduct={onSelectProduct} />
      <CraftsmanshipSection onNavigate={onNavigate} />
      <ThreeDExperience onNavigate={onNavigate} />
      <BrandStory onNavigate={onNavigate} />
    </div>
  );
}
