import React from 'react';
import ReverieHero from '../components/hero/ReverieHero';
import TrustStrip from '../components/home/TrustStrip';
import CollectionsSection from '../components/home/CollectionsSection';
import GenderShowcase from '../components/home/GenderShowcase';
import FeaturedProduct from '../components/home/FeaturedProduct';
import CraftsmanshipSection from '../components/home/CraftsmanshipSection';
import ThreeDExperience from '../components/home/ThreeDExperience';
import BrandStory from '../components/home/BrandStory';

export default function HomePage() {
  return (
    <div className="page-home">
      <ReverieHero />
      <TrustStrip />
      <CollectionsSection />
      <GenderShowcase />
      <FeaturedProduct />
      <CraftsmanshipSection />
      <ThreeDExperience />
      <BrandStory />
    </div>
  );
}
