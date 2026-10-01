"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, SlidersHorizontal, Eye, Sparkles, Compass, Check } from 'lucide-react';
import { allWatchCatalog } from '../../data/allProductsData';
import Button from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const genderParam = searchParams.get('gender') || 'All';
  const { addToCart } = useCart();

  const [selectedGender, setSelectedGender] = useState(genderParam);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState({});
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    if (genderParam) {
      setSelectedGender(genderParam);
    }
  }, [genderParam]);

  const genderTabs = ['All', 'Men', 'Women'];
  
  const mensCategories = ['All', 'Classic', 'Automatic', 'Chronograph', 'Diver', 'Sport', 'Skeleton', 'Limited Edition'];
  const womensCategories = ['All', 'Classic', 'Jewelry', 'Minimal', 'Sport', 'Fashion-Luxury', 'Automatic', 'Limited Edition'];
  const allCategories = ['All', 'Classic', 'Automatic', 'Chronograph', 'Diver', 'Jewelry', 'Minimal', 'Sport', 'Fashion-Luxury', 'Skeleton', 'Limited Edition'];

  const activeCategories = selectedGender === 'Men' 
    ? mensCategories 
    : selectedGender === 'Women' 
      ? womensCategories 
      : allCategories;

  const toggleWishlist = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.straps ? product.straps[0] : 'Steel Bracelet');
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const filteredProducts = allWatchCatalog.filter((item) => {
    const matchGender = selectedGender === 'All' || (item.gender && item.gender.toLowerCase() === selectedGender.toLowerCase());
    const matchCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchGender && matchCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'ref-asc') return a.ref.localeCompare(b.ref);
    return 0;
  });

  return (
    <div className="page-collections">
      {/* Editorial Header Banner */}
      <section className="collections-banner">
        <div className="collections-banner-bg-wrap">
          <img
            src="/assets/collection-editorial.jpg"
            alt="REVERIE Master Horology Collection"
            className="collections-banner-bg"
          />
          <div className="collections-banner-overlay" />
        </div>
        <div className="container collections-banner-content">
          <span className="eyebrow eyebrow-dark font-ui">CATALOGUE RAISONN�</span>
          <h1 className="collections-banner-title font-display">
            {selectedGender === 'All'
              ? 'Complete Horological Collection'
              : `${selectedGender}'s Haute Horlogerie`}
          </h1>
          <p className="collections-banner-subtitle font-ui">
            Discover {allWatchCatalog.length} masterpieces of Swiss micro-engineering, hand-finished in Gen�ve.
          </p>
        </div>
      </section>

      {/* Filter & Sorting Controls */}
      <section className="container collections-controls-section">
        <div className="collections-controls-bar font-ui">
          {/* Gender Filter Tabs */}
          <div className="collections-gender-tabs" role="tablist">
            {genderTabs.map((g) => (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={selectedGender === g}
                className={`collections-gender-tab ${
                  selectedGender.toLowerCase() === g.toLowerCase() ? 'collections-gender-tab--active' : ''
                }`}
                onClick={() => {
                  setSelectedGender(g);
                  setSelectedCategory('All');
                }}
              >
                {g === 'All' ? 'All Timepieces' : `${g}'s Horology`}
              </button>
            ))}
          </div>

          {/* Right Side: Total Count & Sort Dropdown */}
          <div className="collections-meta-controls">
            <span className="collections-count">
              Showing <strong>{filteredProducts.length}</strong> creations
            </span>
            <div className="collections-sort-wrap">
              <SlidersHorizontal size={14} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="collections-sort-select font-ui"
                aria-label="Sort products"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="ref-asc">Reference Number</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pill Badges */}
        <div className="collections-category-pills font-ui">
          {activeCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`collections-category-pill ${
                selectedCategory.toLowerCase() === cat.toLowerCase() ? 'collections-category-pill--active' : ''
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container collections-grid-section">
        {filteredProducts.length === 0 ? (
          <div className="collections-empty font-ui">
            <Compass size={40} strokeWidth={1} />
            <h3 className="font-display">No timepieces matched your selection</h3>
            <p>Try resetting the category filter or exploring our complete catalog.</p>
            <Button variant="secondary" onClick={() => { setSelectedCategory('All'); setSelectedGender('All'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="collections-catalog-grid">
            {filteredProducts.map((watch) => {
              const isFav = wishlist[watch.id];
              const isAdded = addedItem === watch.id;

              return (
                <article
                  key={watch.id}
                  className="catalog-card font-ui"
                >
                  <Link href={`/product/${watch.id}`} className="catalog-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="catalog-card-media">
                      <img
                        src={watch.image}
                        alt={`REVERIE ${watch.name}`}
                        className="catalog-card-img"
                        loading="lazy"
                      />
                      
                      {/* Top Badges */}
                      <div className="catalog-card-badges">
                        {watch.isNew && (
                          <span className="catalog-badge catalog-badge--new">
                            <Sparkles size={10} /> NEW
                          </span>
                        )}
                        {watch.isLimitedEdition && (
                          <span className="catalog-badge catalog-badge--ltd">
                            LIMITED EDITION
                          </span>
                        )}
                      </div>

                      {/* Wishlist Icon */}
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(watch.id, e)}
                        className={`catalog-card-wishlist ${isFav ? 'catalog-card-wishlist--active' : ''}`}
                        aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={16} fill={isFav ? '#e63946' : 'none'} stroke={isFav ? '#e63946' : 'currentColor'} />
                      </button>

                      {/* Hover Quick Action Overlay */}
                      <div className="catalog-card-overlay">
                        <span className="catalog-card-quick-view">
                          <Eye size={14} /> View Details & 3D
                        </span>
                      </div>
                    </div>

                    <div className="catalog-card-body">
                      <div className="catalog-card-header">
                        <span className="catalog-card-ref">{watch.ref}</span>
                        <span className="catalog-card-case">{watch.caseSize}</span>
                      </div>
                      
                      <h3 className="catalog-card-title font-display">
                        {watch.name}
                      </h3>
                      
                      <p className="catalog-card-tagline font-ui">
                        {watch.tagline}
                      </p>

                      <div className="catalog-card-footer">
                        <span className="catalog-card-price font-display">
                          ${watch.price ? watch.price.toLocaleString() : '1,299'}
                        </span>
                        
                        <button
                          type="button"
                          className="catalog-card-bag-btn font-ui"
                          onClick={(e) => handleAdd(watch, e)}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} /> Added
                            </>
                          ) : (
                            '+ Add to Bag'
                          )}
                        </button>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '120px 0', textAlign: 'center' }}>Loading Collections...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
