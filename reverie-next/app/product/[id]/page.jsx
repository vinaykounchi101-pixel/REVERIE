"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, Check, ChevronRight, Sparkles } from 'lucide-react';
import { allWatchCatalog } from '../../../data/allProductsData';
import Button from '../../../components/ui/Button';
import { useCart } from '../../../context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const productId = params?.id;
  const currentProduct = allWatchCatalog.find((w) => w.id === productId) || allWatchCatalog[0];

  const [selectedImage, setSelectedImage] = useState(currentProduct.image);
  const [selectedDial, setSelectedDial] = useState(0);
  const [selectedStrap, setSelectedStrap] = useState(currentProduct.straps ? currentProduct.straps[0] : 'Steel Bracelet');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(currentProduct.image);
      setSelectedDial(0);
      setSelectedStrap(currentProduct.straps ? currentProduct.straps[0] : 'Steel Bracelet');
      setQuantity(1);
    }
  }, [currentProduct]);

  const relatedProducts = allWatchCatalog
    .filter((w) => w.id !== currentProduct.id && (w.gender === currentProduct.gender || w.category === currentProduct.category))
    .slice(0, 3);

  const handleAdd = () => {
    addToCart(currentProduct, quantity, selectedStrap);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const imagesGallery = currentProduct.gallery && currentProduct.gallery.length > 0
    ? currentProduct.gallery
    : [currentProduct.image, '/assets/collection-editorial.jpg', '/assets/brand-story.jpg'];

  return (
    <div className="page-pdp">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb font-ui" aria-label="Breadcrumb">
          <Link href="/" className="pdp-breadcrumb-link">Home</Link>
          <ChevronRight size={12} />
          <Link href="/collections" className="pdp-breadcrumb-link">Collections</Link>
          <ChevronRight size={12} />
          <span className="pdp-breadcrumb-current">{currentProduct.name}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="pdp-main-grid">
          {/* Left: Gallery Showcase */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-stage">
              <img
                src={selectedImage}
                alt={`REVERIE ${currentProduct.name}`}
                className="pdp-main-image"
              />
              {currentProduct.isLimitedEdition && (
                <div className="pdp-badge-ltd font-ui">
                  <Sparkles size={12} /> LIMITED EDITION PIECE
                </div>
              )}
            </div>

            {/* Thumbnails Row */}
            <div className="pdp-thumbnails-row">
              {imagesGallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`pdp-thumbnail-btn ${selectedImage === img ? 'pdp-thumbnail-btn--active' : ''}`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="pdp-thumbnail-img" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Purchasing & Specification Column */}
          <div className="pdp-info-col">
            <div className="pdp-header">
              <div className="pdp-ref-row font-ui">
                <span className="pdp-ref-code">{currentProduct.ref}</span>
                <span className="pdp-rating">
                  <Star size={13} fill="#d4af37" stroke="#d4af37" />
                  <span>{currentProduct.rating || '4.9'} / 5.0</span>
                </span>
              </div>

              <h1 className="pdp-title font-display">{currentProduct.name}</h1>
              <p className="pdp-tagline font-ui">{currentProduct.tagline}</p>
              
              <div className="pdp-price font-display">
                ${currentProduct.price ? currentProduct.price.toLocaleString() : '1,299'}
                <span className="pdp-vat-text font-ui">Including Swiss VAT & Worldwide Insured Express Delivery</span>
              </div>
            </div>

            {/* Dial Customizer Swatches */}
            {currentProduct.dialColors && currentProduct.dialColors.length > 0 && (
              <div className="pdp-option-group font-ui">
                <span className="pdp-option-label">
                  Dial Color: <strong>{currentProduct.dialColors[selectedDial]?.name || 'Signature'}</strong>
                </span>
                <div className="pdp-swatches-row">
                  {currentProduct.dialColors.map((d, idx) => (
                    <button
                      key={d.name}
                      type="button"
                      title={d.name}
                      onClick={() => setSelectedDial(idx)}
                      className={`pdp-swatch-btn ${selectedDial === idx ? 'pdp-swatch-btn--active' : ''}`}
                      style={{ backgroundColor: d.color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Strap / Bracelet Selection */}
            {currentProduct.straps && currentProduct.straps.length > 0 && (
              <div className="pdp-option-group font-ui">
                <span className="pdp-option-label">
                  Strap Selection: <strong>{selectedStrap}</strong>
                </span>
                <div className="pdp-straps-row">
                  {currentProduct.straps.map((strap) => (
                    <button
                      key={strap}
                      type="button"
                      onClick={() => setSelectedStrap(strap)}
                      className={`pdp-strap-pill ${selectedStrap === strap ? 'pdp-strap-pill--active' : ''}`}
                    >
                      {strap}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Row */}
            <div className="pdp-cta-row font-ui">
              <div className="pdp-qty-picker">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="pdp-qty-btn"
                >
                  -
                </button>
                <span className="pdp-qty-val">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="pdp-qty-btn"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                onClick={handleAdd}
                className="pdp-add-bag-btn"
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  `Add to Bag � $${((currentProduct.price || 1299) * quantity).toLocaleString()}`
                )}
              </Button>

              <button
                type="button"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`pdp-wishlist-toggle ${isWishlisted ? 'pdp-wishlist-toggle--active' : ''}`}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isWishlisted ? '#e63946' : 'none'} stroke={isWishlisted ? '#e63946' : 'currentColor'} />
              </button>
            </div>

            {/* Value Guarantees Strip */}
            <div className="pdp-trust-box font-ui">
              <div className="pdp-trust-item">
                <Truck size={18} className="pdp-trust-icon" />
                <div>
                  <strong>Complimentary Express Courier</strong>
                  <p>DHL Worldwide Insured Overnight Dispatch</p>
                </div>
              </div>
              <div className="pdp-trust-item">
                <ShieldCheck size={18} className="pdp-trust-icon" />
                <div>
                  <strong>5-Year International Atelier Warranty</strong>
                  <p>Comprehensive chronometric protection & servicing</p>
                </div>
              </div>
              <div className="pdp-trust-item">
                <RotateCcw size={18} className="pdp-trust-icon" />
                <div>
                  <strong>30-Day Bespoke Returns</strong>
                  <p>Full refund or complimentary model exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Tabs */}
        <section className="pdp-specs-section">
          <div className="pdp-tabs-nav font-ui">
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'overview' ? 'pdp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Horological Overview
            </button>
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'specs' ? 'pdp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Technical Specifications
            </button>
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'care' ? 'pdp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('care')}
            >
              Maintenance & Care
            </button>
          </div>

          <div className="pdp-tab-content font-ui">
            {activeTab === 'overview' && (
              <div className="pdp-tab-pane">
                <p className="pdp-long-desc">{currentProduct.longDescription || currentProduct.description}</p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="pdp-tab-pane">
                <div className="pdp-specs-table-grid">
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Caliber Movement</span>
                    <span className="pdp-spec-v">{currentProduct.movement || 'Automatic Calibre R-202'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Power Reserve</span>
                    <span className="pdp-spec-v">{currentProduct.powerReserve || '48 Hours'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Case Diameter</span>
                    <span className="pdp-spec-v">{currentProduct.caseSize || '40 mm'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Case Thickness</span>
                    <span className="pdp-spec-v">{currentProduct.thickness || '10.2 mm'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Water Resistance</span>
                    <span className="pdp-spec-v">{currentProduct.waterResistance || '10 ATM (100m / 330ft)'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Crystal</span>
                    <span className="pdp-spec-v">{currentProduct.crystal || 'Anti-Reflective Sapphire with 5x AR Coating'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="pdp-tab-pane">
                <p>To ensure lifelong precision of your REVERIE timepiece, we recommend an atelier inspection every 3 to 5 years. Avoid exposure to extreme magnetic fields and secure the screw-down crown prior to water immersion.</p>
              </div>
            )}
          </div>
        </section>

        {/* Related Watches */}
        {relatedProducts.length > 0 && (
          <section className="pdp-related-section">
            <h2 className="pdp-related-title font-display">Complementary Horology</h2>
            <div className="collections-catalog-grid">
              {relatedProducts.map((rel) => (
                <article key={rel.id} className="catalog-card font-ui">
                  <Link href={`/product/${rel.id}`} className="catalog-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="catalog-card-media">
                      <img src={rel.image} alt={rel.name} className="catalog-card-img" />
                    </div>
                    <div className="catalog-card-body">
                      <span className="catalog-card-ref">{rel.ref}</span>
                      <h3 className="catalog-card-title font-display">{rel.name}</h3>
                      <span className="catalog-card-price font-display">${rel.price.toLocaleString()}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
