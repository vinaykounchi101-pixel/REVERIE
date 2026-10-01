import React, { useState, useEffect } from 'react';
import { Heart, SlidersHorizontal, Eye, Sparkles, Compass } from 'lucide-react';
import { allWatchCatalog } from '../data/allProductsData';
import Button from '../components/ui/Button';

export default function CollectionsPage({ onSelectProduct, onAddToCart, onNavigate, initialGender = 'All' }) {
  const [selectedGender, setSelectedGender] = useState(initialGender);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    if (initialGender) {
      setSelectedGender(initialGender);
    }
  }, [initialGender]);

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
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
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
        <div className="collections-banner-bg" />
        <div className="container collections-banner-content">
          <span className="eyebrow eyebrow-dark font-ui">
            {selectedGender === 'Men' 
              ? "MEN'S HOROLOGY ARCHIVE • V-SERIES (24 TIMEPIECES)" 
              : selectedGender === 'Women' 
                ? "WOMEN'S HOROLOGY ARCHIVE • W-SERIES (24 TIMEPIECES)" 
                : "REVERIE MASTER CATALOG • 48 TIMEPIECES"}
          </span>
          <h1 className="collections-banner-title font-display">
            {selectedGender === 'Men' 
              ? "Men's Collection" 
              : selectedGender === 'Women' 
                ? "Women's Collection" 
                : "All Timepieces"}
          </h1>
          <p className="collections-banner-subtitle font-ui">
            {selectedGender === 'Men'
              ? "Explore all 24 individual Men's models spanning Classic, Automatic, Column-Wheel Chronograph, Diver 300m, GMT, and Skeleton architectures."
              : selectedGender === 'Women'
                ? "Explore all 24 individual Women's models spanning Petite Classic, Pavé Jewelry, Minimalist Nordic, Active Sport, Malachite, and Lumina Skeleton Automatique."
                : "Explore our complete 48-piece archive of handcrafted Swiss automatic and mechanical timepieces."}
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="container collections-container">
        {/* Controls Bar */}
        <div className="collections-controls-bar">
          {/* Gender Filter Pills */}
          <div className="collections-pills">
            {genderTabs.map((g) => {
              const count = g === 'All' 
                ? allWatchCatalog.length 
                : allWatchCatalog.filter(w => w.gender === g).length;
              return (
                <button
                  key={g}
                  type="button"
                  className={`collection-pill font-ui ${selectedGender === g ? 'collection-pill--active' : ''}`}
                  onClick={() => {
                    setSelectedGender(g);
                    setSelectedCategory('All');
                  }}
                >
                  {g === 'All' ? 'All Watches' : `${g}'s Section`} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="collections-sort-wrap">
            <span className="sort-label font-ui">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select font-ui"
            >
              <option value="featured">Featured Curations</option>
              <option value="ref-asc">Reference ID (V-001 / W-001)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Archetypes Sub-bar */}
        <div className="category-archetypes-bar">
          {activeCategories.map((cat) => {
            const catCount = allWatchCatalog.filter(w => 
              (selectedGender === 'All' || w.gender === selectedGender) &&
              (cat === 'All' || w.category === cat)
            ).length;

            return (
              <button
                key={cat}
                type="button"
                className={`category-archetype-btn font-ui ${selectedCategory === cat ? 'category-archetype-btn--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} {cat !== 'All' ? `(${catCount})` : ''}
              </button>
            );
          })}
        </div>

        {/* Status bar */}
        <div className="catalog-status-bar font-ui">
          <span>Showing <strong>{filteredProducts.length}</strong> individual handcrafted timepieces</span>
          {(selectedGender !== 'All' || selectedCategory !== 'All') && (
            <button
              type="button"
              className="reset-filters-btn font-ui"
              onClick={() => {
                setSelectedGender('All');
                setSelectedCategory('All');
              }}
            >
              Show all 48 watches
            </button>
          )}
        </div>

        {/* Standard E-Commerce Product Grid */}
        <div className="catalog-grid">
          {filteredProducts.map((watch) => {
            const isFav = wishlist[watch.id];
            return (
              <article
                key={watch.id}
                className="catalog-card"
                onClick={() => onSelectProduct(watch)}
              >
                <div className="catalog-card-media">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="catalog-card-img"
                    loading="lazy"
                  />
                  <div className="catalog-card-badges">
                    <span className="catalog-card-ref font-ui">{watch.ref}</span>
                    {watch.gender && (
                      <span className="catalog-card-gender-badge font-ui">{watch.gender}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className={`catalog-wishlist-btn ${isFav ? 'catalog-wishlist-btn--active' : ''}`}
                    onClick={(e) => toggleWishlist(watch.id, e)}
                    aria-label="Add to Wishlist"
                  >
                    <Heart size={16} fill={isFav ? '#8D7C6D' : 'none'} color={isFav ? '#8D7C6D' : '#6E6861'} />
                  </button>
                </div>

                <div className="catalog-card-body">
                  <div className="catalog-card-meta">
                    <span className="catalog-card-collection font-ui">{watch.collection}</span>
                    <span className="catalog-card-dot">•</span>
                    <span className="catalog-card-cat font-ui">{watch.category}</span>
                  </div>
                  <h3 className="catalog-card-name font-ui">{watch.name}</h3>
                  <p className="catalog-card-desc font-ui">{watch.shortDesc}</p>
                  
                  <div className="catalog-card-bottom">
                    <span className="catalog-card-price font-ui">{watch.priceFormatted}</span>
                    <Button
                      variant="primary"
                      className="catalog-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(watch);
                      }}
                    >
                      Add to Bag
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
