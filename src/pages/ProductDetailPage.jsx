import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Check, ChevronRight } from 'lucide-react';
import { allWatchCatalog } from '../data/allProductsData';
import Button from '../components/ui/Button';

export default function ProductDetailPage({ product, onAddToCart, onNavigate, onSelectProduct }) {
  const currentProduct = product || allWatchCatalog[0];
  const [selectedImage, setSelectedImage] = useState(currentProduct.image);
  const [selectedDial, setSelectedDial] = useState(0);
  const [selectedStrap, setSelectedStrap] = useState(currentProduct.straps ? currentProduct.straps[0] : 'Steel');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedDial(0);
      setSelectedStrap(product.straps ? product.straps[0] : 'Steel');
      setQuantity(1);
    }
  }, [product]);

  const relatedProducts = allWatchCatalog
    .filter((w) => w.id !== currentProduct.id)
    .slice(0, 3);

  const handleAdd = () => {
    onAddToCart({
      ...currentProduct,
      quantity,
      selectedStrap,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-pdp">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb font-ui" aria-label="Breadcrumb">
          <button type="button" onClick={() => onNavigate('home')} className="pdp-breadcrumb-link">Home</button>
          <ChevronRight size={12} />
          <button type="button" onClick={() => onNavigate('collections')} className="pdp-breadcrumb-link">Collections</button>
          <ChevronRight size={12} />
          <span className="pdp-breadcrumb-current">{currentProduct.name}</span>
        </nav>

        {/* Main Product Layout: Gallery (Left) + Purchase Panel (Right) */}
        <div className="pdp-layout">
          {/* Left Media Gallery */}
          <div className="pdp-gallery">
            <div className="pdp-thumbnails">
              {currentProduct.gallery.map((imgSrc, index) => (
                <button
                  key={index}
                  type="button"
                  className={`pdp-thumb-btn ${selectedImage === imgSrc ? 'pdp-thumb-btn--active' : ''}`}
                  onClick={() => setSelectedImage(imgSrc)}
                >
                  <img src={imgSrc} alt={`Thumbnail ${index + 1}`} className="pdp-thumb-img" />
                </button>
              ))}
            </div>

            <div className="pdp-main-image-wrap">
              <img
                src={selectedImage}
                alt={currentProduct.name}
                className="pdp-main-image"
              />
            </div>
          </div>

          {/* Right Purchase Panel */}
          <div className="pdp-info-panel">
            <span className="eyebrow eyebrow-dark font-ui">{currentProduct.collection}</span>
            <h1 className="pdp-title font-display">{currentProduct.name}</h1>
            <div className="pdp-price font-ui">{currentProduct.priceFormatted}</div>

            {/* Rating */}
            <div className="pdp-rating font-ui">
              <div className="pdp-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#B9AA9B" color="#B9AA9B" />
                ))}
              </div>
              <span className="pdp-rating-num">{currentProduct.rating}</span>
              <span className="pdp-rating-count">({currentProduct.reviewsCount} verified reviews)</span>
            </div>

            {/* Key Specs Highlights */}
            <div className="pdp-highlights font-ui">
              <div className="pdp-highlight-item">
                <span className="pdp-highlight-dot">•</span>
                <span>{currentProduct.specs.movement}</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="pdp-highlight-dot">•</span>
                <span>{currentProduct.specs.crystal}</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="pdp-highlight-dot">•</span>
                <span>{currentProduct.specs.caseMaterial}</span>
              </div>
              <div className="pdp-highlight-item">
                <span className="pdp-highlight-dot">•</span>
                <span>Water Resistant ({currentProduct.specs.waterResistance})</span>
              </div>
            </div>

            {/* Dial Swatches */}
            <div className="pdp-option-group">
              <span className="pdp-option-label font-ui">Dial Shade</span>
              <div className="pdp-swatches-row">
                {currentProduct.dialColors.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Dial shade ${idx + 1}`}
                    className={`pdp-swatch ${selectedDial === idx ? 'pdp-swatch--active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedDial(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Strap Options */}
            <div className="pdp-option-group">
              <span className="pdp-option-label font-ui">Strap / Bracelet</span>
              <div className="pdp-straps-row">
                {currentProduct.straps.map((strap) => (
                  <button
                    key={strap}
                    type="button"
                    className={`pdp-strap-btn font-ui ${selectedStrap === strap ? 'pdp-strap-btn--active' : ''}`}
                    onClick={() => setSelectedStrap(strap)}
                  >
                    {strap}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="pdp-actions-row">
              <div className="pdp-qty-selector">
                <button
                  type="button"
                  className="pdp-qty-btn font-ui"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="pdp-qty-val font-ui">{quantity}</span>
                <button
                  type="button"
                  className="pdp-qty-btn font-ui"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                className="pdp-add-btn"
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  'Add to Cart'
                )}
              </Button>

              <button
                type="button"
                className={`pdp-wishlist-btn ${isWishlisted ? 'pdp-wishlist-btn--active' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? '#8D7C6D' : 'none'} color={isWishlisted ? '#8D7C6D' : '#211F1D'} />
              </button>
            </div>

            {/* Trust Perks */}
            <div className="pdp-trust-pills font-ui">
              <div className="pdp-trust-pill">
                <Truck size={15} />
                <span>Complimentary Insured Shipping</span>
              </div>
              <div className="pdp-trust-pill">
                <ShieldCheck size={15} />
                <span>2 Year International Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Specs Table, Shipping */}
        <section className="pdp-details-section">
          <div className="pdp-tabs-nav font-ui">
            {['overview', 'specifications', 'shipping & returns'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`pdp-tab-btn ${activeTab === tab ? 'pdp-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="pdp-tab-content">
            {activeTab === 'overview' && (
              <div className="pdp-overview-pane">
                <p className="pdp-overview-text font-ui">
                  The {currentProduct.name} blends timeless aesthetics with modern horological precision.
                  Hand-finished in our atelier, its clean dial, refined case architecture, and automatic mechanical caliber
                  make it a versatile companion for every milestone and occasion.
                </p>
                <div className="pdp-craft-banner">
                  <img src="/assets/collection-editorial.jpg" alt="Craftsmanship detail" className="pdp-craft-img" />
                  <div className="pdp-craft-banner-text">
                    <h3 className="font-display">Watch the details</h3>
                    <p className="font-ui">Explore the microscopic craftsmanship up close.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="pdp-specs-table font-ui">
                <div className="pdp-spec-row">
                  <span className="pdp-spec-key">Case Diameter</span>
                  <span className="pdp-spec-val">{currentProduct.specs.caseDiameter}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-key">Case Thickness</span>
                  <span className="pdp-spec-val">{currentProduct.specs.thickness}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-key">Case Material</span>
                  <span className="pdp-spec-val">{currentProduct.specs.caseMaterial}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-key">Mechanical Movement</span>
                  <span className="pdp-spec-val">{currentProduct.specs.movement}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-key">Power Reserve</span>
                  <span className="pdp-spec-val">{currentProduct.specs.powerReserve}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-key">Crystal</span>
                  <span className="pdp-spec-val">{currentProduct.specs.crystal}</span>
                </div>
                <div className="pdp-spec-row">
                  <span className="pdp-spec-key">Water Resistance</span>
                  <span className="pdp-spec-val">{currentProduct.specs.waterResistance}</span>
                </div>
              </div>
            )}

            {activeTab === 'shipping & returns' && (
              <div className="pdp-shipping-pane font-ui">
                <h4 className="font-ui">Worldwide White-Glove Delivery</h4>
                <p>All timepieces are shipped with signature requirement and full transit insurance via DHL Express or FedEx Priority.</p>
                <h4 className="font-ui" style={{ marginTop: '16px' }}>30-Day Returns</h4>
                <p>We provide full refunds on all unworn items returned in original packaging within 30 days of receipt.</p>
              </div>
            )}
          </div>
        </section>

        {/* You May Also Like */}
        <section className="pdp-related-section">
          <h2 className="pdp-related-title font-display">You May Also Like</h2>
          <div className="pdp-related-grid">
            {relatedProducts.map((rel) => (
              <article
                key={rel.id}
                className="pdp-related-card"
                onClick={() => {
                  onSelectProduct(rel);
                }}
              >
                <div className="pdp-related-img-wrap">
                  <img src={rel.image} alt={rel.name} className="pdp-related-img" />
                </div>
                <div className="pdp-related-info font-ui">
                  <h3 className="pdp-related-name">{rel.name}</h3>
                  <span className="pdp-related-price">{rel.priceFormatted}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
