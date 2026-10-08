"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart, 
  Check, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Droplets, 
  Compass, 
  Layers, 
  Award,
  Calendar,
  Eye,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { allWatchCatalog } from '../../../data/allProductsData';
import { catalogService } from '../../../services/catalogService';
import Button from '../../../components/ui/Button';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const productId = params?.id;
  const initialLocal = allWatchCatalog.find((w) => w.id === productId || w.ref?.toLowerCase() === productId?.toLowerCase()) || allWatchCatalog[0];

  const [currentProduct, setCurrentProduct] = useState(initialLocal);
  const [selectedImage, setSelectedImage] = useState(initialLocal.image);
  const [selectedDial, setSelectedDial] = useState(0);
  const [selectedStrap, setSelectedStrap] = useState(
    initialLocal.straps && initialLocal.straps.length > 0 ? initialLocal.straps[0] : 'Alligator Leather'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [added, setAdded] = useState(false);
  const isWishlisted = isInWishlist(currentProduct?.id);

  useEffect(() => {
    async function loadLiveProduct() {
      if (!productId) return;
      try {
        const live = await catalogService.getProductById(productId);
        if (live) {
          const normalized = {
            id: live.id || live.slug || productId,
            name: live.name || live.title,
            ref: live.referenceNumber || live.sku || live.ref || 'REF-REV-01',
            price: live.basePricePaise ? live.basePricePaise / 100 : (live.price || 35000),
            image: live.primaryImageUrl || live.imageUrl || live.image || '/images/watches/classic-royale.webp',
            tagline: live.shortDescription || live.summary || live.tagline || 'Swiss Haute Horlogerie Masterpiece',
            category: live.categoryName || live.category || 'Grande Complication',
            gender: live.gender || 'Unisex',
            caseSize: live.attributes?.caseDiameter || (live.caseDiameterMm ? `${live.caseDiameterMm}mm` : '41mm'),
            description: live.description || live.shortDescription || '',
            gallery: live.media?.map(m => m.url) || [live.primaryImageUrl || live.image || '/images/watches/classic-royale.webp'],
            specs: {
              caseDiameter: live.attributes?.caseDiameter || '41mm',
              thickness: live.attributes?.thickness || '10.5mm',
              caseMaterial: live.attributes?.caseMaterial || 'Grade 5 Titanium / Sapphire',
              movement: live.attributes?.movement || 'Calibre REV-901 Automatic',
              powerReserve: live.attributes?.powerReserve || '72 Hours',
              crystal: live.attributes?.crystal || 'Sapphire Crystal with AR Coating',
              waterResistance: live.attributes?.waterResistance || '100m (10 ATM)',
              strapWidth: live.attributes?.strapWidth || '20mm',
            },
            dialColors: live.attributes?.dialColor ? [live.attributes.dialColor] : ["#1D3557", "#111215", "#D6C5A9"],
            straps: ['Grade 5 Titanium', 'Hand-Stitched Alligator Leather', 'Rubber Sport Strap'],
            isNew: live.isNew || false,
            isLimitedEdition: live.editionSize ? true : false,
            rating: live.rating || 5,
            reviewsCount: live.reviewsCount || 12,
          };
          setCurrentProduct(normalized);
          setSelectedImage(normalized.image);
        }
      } catch (err) {
        console.error('Failed to load live product:', err);
      }
    }
    loadLiveProduct();
  }, [productId]);

  useEffect(() => {
    if (currentProduct) {
      setSelectedImage(currentProduct.image);
      setSelectedDial(0);
      setSelectedStrap(
        currentProduct.straps && currentProduct.straps.length > 0 ? currentProduct.straps[0] : 'Alligator Leather'
      );
      setQuantity(1);
    }
  }, [currentProduct]);

  const handleAdd = () => {
    addToCart(currentProduct, quantity, selectedStrap);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(currentProduct, quantity, selectedStrap);
    router.push('/checkout');
  };

  const imagesGallery = currentProduct.gallery && currentProduct.gallery.length > 0
    ? currentProduct.gallery
    : [currentProduct.image, '/assets/craft-movement.jpg', '/assets/craft-crown.jpg', '/assets/collection-editorial.jpg'];

  const specs = currentProduct.specs || {
    caseDiameter: "40mm",
    thickness: "9.8mm",
    caseMaterial: "316L Surgical Stainless Steel",
    movement: "Calibre V-101 Ultra-Thin Automatic",
    powerReserve: "48 Hours",
    crystal: "Double-domed Anti-Reflective Sapphire",
    waterResistance: "50m (5 ATM)",
    strapWidth: "20mm"
  };

  const dialColors = currentProduct.dialColors && currentProduct.dialColors.length > 0
    ? currentProduct.dialColors
    : ["#1D3557", "#111215", "#D6C5A9"];

  const getDialColorHex = (item) => {
    if (typeof item === 'string') return item;
    return item?.color || '#111215';
  };

  const getDialColorName = (item, index) => {
    if (typeof item === 'string') {
      const names = {
        '#1D3557': 'Midnight Royal Blue',
        '#111215': 'Deep Obsidian Black',
        '#D6C5A9': 'Champagne Opaline',
        '#0E2A1F': 'Emerald Sunray',
        '#2C1A1D': 'Burgundy Wine',
        '#F4E8C1': 'Sunburst Ivory',
        '#5A5D64': 'Anthracite Slate'
      };
      return names[item] || `Finish 0${index + 1}`;
    }
    return item?.name || `Finish 0${index + 1}`;
  };

  const relatedProducts = allWatchCatalog.filter((p) => p.id !== currentProduct.id).slice(0, 3);

  return (
    <div className="page-pdp">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav className="pdp-breadcrumb font-ui" aria-label="Breadcrumb">
          <Link href="/" className="pdp-breadcrumb-link">Home</Link>
          <ChevronRight size={12} />
          <Link href="/collections" className="pdp-breadcrumb-link">Collections</Link>
          <ChevronRight size={12} />
          <span className="pdp-breadcrumb-link">{currentProduct.gender}'s Collection</span>
          <ChevronRight size={12} />
          <span className="pdp-breadcrumb-current">{currentProduct.name}</span>
        </nav>

        {/* Main PDP Grid */}
        <div className="pdp-main-grid">
          {/* Left Column: Gallery Showcase */}
          <div className="pdp-gallery-col">
            <div className="pdp-main-image-stage">
              <div className="pdp-stage-badges font-ui">
                <span className="pdp-stage-ref-badge">
                  REF. {currentProduct.ref}
                </span>
                <span className="pdp-stage-stock-badge">
                  <span className="pdp-stock-dot" /> In Atelier Dispatch
                </span>
              </div>

              <div className="pdp-image-viewport">
                <img
                  src={selectedImage}
                  alt={`REVERIE ${currentProduct.name}`}
                  className="pdp-main-image"
                />
              </div>

              <div className="pdp-pedestal-reflection" />
            </div>

            {/* Thumbnails Row */}
            <div className="pdp-thumbnails-row">
              {imagesGallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`pdp-thumbnail-btn ${selectedImage === img ? 'pdp-thumbnail-btn--active' : ''}`}
                  title={`View Angle ${idx + 1}`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="pdp-thumbnail-img" />
                </button>
              ))}
            </div>

            {/* Atelier Concierge Box */}
            <div className="pdp-concierge-box font-ui">
              <div className="pdp-concierge-icon">
                <Calendar size={18} />
              </div>
              <div className="pdp-concierge-text">
                <strong>Schedule a Private Atelier Viewing</strong>
                <p>Experience the weight, balance, and finishing with a Master Horologist in Geneva or via live 4K consultation.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Purchasing & Specification */}
          <div className="pdp-info-col">
            <div className="pdp-header">
              <div className="pdp-meta-row font-ui">
                <span className="pdp-gender-pill">{currentProduct.gender}'s Collection</span>
                <span className="pdp-collection-pill">{currentProduct.collection} Edition</span>
                <span className="pdp-rating-pill">
                  <Star size={12} fill="#d4af37" stroke="#d4af37" />
                  <span>{currentProduct.rating || '4.9'} / 5.0</span>
                  <span className="pdp-review-count">({currentProduct.reviewsCount || '48'} Collectors)</span>
                </span>
              </div>

              <h1 className="pdp-title font-display">{currentProduct.name}</h1>
              <p className="pdp-tagline font-ui">
                {currentProduct.shortDesc || "Individually calibrated automatic chronometer with hand-finished dial architecture and anti-reflective sapphire."}
              </p>
              
              <div className="pdp-pricing-card font-ui">
                <div className="pdp-price-row">
                  <span className="pdp-price-val font-display">
                    ${currentProduct.price ? currentProduct.price.toLocaleString() : '1,250'}
                  </span>
                  <span className="pdp-currency-code">USD</span>
                </div>
                <span className="pdp-vat-text">
                  Swiss VAT, Import Duties & Worldwide Insured Express Courier Included
                </span>
              </div>
            </div>

            {/* 6-Card Quick Horological Specs Matrix */}
            <div className="pdp-quick-specs-grid font-ui">
              <div className="pdp-spec-badge">
                <div className="pdp-spec-icon-wrap"><Compass size={14} /></div>
                <div className="pdp-spec-meta">
                  <span className="pdp-spec-lbl">Movement</span>
                  <span className="pdp-spec-txt">{specs.movement || 'Calibre V-101 Auto'}</span>
                </div>
              </div>

              <div className="pdp-spec-badge">
                <div className="pdp-spec-icon-wrap"><Clock size={14} /></div>
                <div className="pdp-spec-meta">
                  <span className="pdp-spec-lbl">Power Reserve</span>
                  <span className="pdp-spec-txt">{specs.powerReserve || '48 Hours'}</span>
                </div>
              </div>

              <div className="pdp-spec-badge">
                <div className="pdp-spec-icon-wrap"><Layers size={14} /></div>
                <div className="pdp-spec-meta">
                  <span className="pdp-spec-lbl">Dimensions</span>
                  <span className="pdp-spec-txt">{specs.caseDiameter || '40mm'} × {specs.thickness || '9.8mm'}</span>
                </div>
              </div>

              <div className="pdp-spec-badge">
                <div className="pdp-spec-icon-wrap"><Droplets size={14} /></div>
                <div className="pdp-spec-meta">
                  <span className="pdp-spec-lbl">Water Resistance</span>
                  <span className="pdp-spec-txt">{specs.waterResistance || '50m (5 ATM)'}</span>
                </div>
              </div>

              <div className="pdp-spec-badge">
                <div className="pdp-spec-icon-wrap"><Sparkles size={14} /></div>
                <div className="pdp-spec-meta">
                  <span className="pdp-spec-lbl">Crystal Glass</span>
                  <span className="pdp-spec-txt">{specs.crystal ? specs.crystal.split(' ')[0] + ' AR Sapphire' : 'Sapphire Crystal'}</span>
                </div>
              </div>

              <div className="pdp-spec-badge">
                <div className="pdp-spec-icon-wrap"><ShieldCheck size={14} /></div>
                <div className="pdp-spec-meta">
                  <span className="pdp-spec-lbl">Case Metal</span>
                  <span className="pdp-spec-txt">{specs.caseMaterial || '316L Steel'}</span>
                </div>
              </div>
            </div>

            {/* Dial Customizer Swatches */}
            {dialColors.length > 0 && (
              <div className="pdp-option-group font-ui">
                <div className="pdp-option-header">
                  <span className="pdp-option-label">Dial Finish</span>
                  <span className="pdp-option-current">{getDialColorName(dialColors[selectedDial], selectedDial)}</span>
                </div>
                <div className="pdp-swatches-row">
                  {dialColors.map((d, idx) => {
                    const colorHex = getDialColorHex(d);
                    const colorName = getDialColorName(d, idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        title={colorName}
                        onClick={() => setSelectedDial(idx)}
                        className={`pdp-swatch-btn ${selectedDial === idx ? 'pdp-swatch-btn--active' : ''}`}
                      >
                        <span className="pdp-swatch-circle" style={{ backgroundColor: colorHex }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Strap / Bracelet Selection */}
            {currentProduct.straps && currentProduct.straps.length > 0 && (
              <div className="pdp-option-group font-ui">
                <div className="pdp-option-header">
                  <span className="pdp-option-label">Strap &amp; Clasp Configuration</span>
                  <span className="pdp-option-current">{selectedStrap}</span>
                </div>
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

            {/* Quantity & CTA Actions */}
            <div className="pdp-cta-container font-ui">
              <div className="pdp-cta-primary-row">
                <div className="pdp-qty-picker">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="pdp-qty-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="pdp-qty-val">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="pdp-qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  onClick={handleBuyNow}
                  className="pdp-buy-now-btn"
                  arrow
                >
                  Buy Now • ${((currentProduct.price || 1250) * quantity).toLocaleString()}
                </Button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(currentProduct.id)}
                  className={`pdp-wishlist-toggle ${isWishlisted ? 'pdp-wishlist-toggle--active' : ''}`}
                  aria-label="Toggle Wishlist"
                  title={isWishlisted ? "Saved in Wishlist" : "Add to Wishlist"}
                >
                  <Heart size={20} fill={isWishlisted ? '#d4af37' : 'none'} stroke={isWishlisted ? '#d4af37' : 'currentColor'} />
                </button>
              </div>

              <div className="pdp-cta-secondary-row">
                <Button
                  variant="secondary"
                  onClick={handleAdd}
                  className="pdp-add-bag-btn"
                >
                  {added ? (
                    <>
                      <Check size={18} />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={17} />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Value Guarantees Strip */}
            <div className="pdp-trust-box font-ui">
              <div className="pdp-trust-item">
                <Truck size={18} className="pdp-trust-icon" />
                <div>
                  <strong>Complimentary Insured Courier</strong>
                  <p>DHL Worldwide Overnight Express Dispatch with real-time tracking</p>
                </div>
              </div>
              <div className="pdp-trust-item">
                <ShieldCheck size={18} className="pdp-trust-icon" />
                <div>
                  <strong>5-Year International Atelier Warranty</strong>
                  <p>Comprehensive chronometric regulation & movement protection</p>
                </div>
              </div>
              <div className="pdp-trust-item">
                <RotateCcw size={18} className="pdp-trust-icon" />
                <div>
                  <strong>30-Day Bespoke Returns</strong>
                  <p>Full refund or complimentary model sizing & exchange</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Deep Dive Tabs */}
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
              Full Technical Blueprint
            </button>
            <button
              type="button"
              className={`pdp-tab-btn ${activeTab === 'care' ? 'pdp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('care')}
            >
              Maintenance &amp; Chronometric Care
            </button>
          </div>

          <div className="pdp-tab-content font-ui">
            {activeTab === 'overview' && (
              <div className="pdp-tab-pane">
                <div className="pdp-overview-grid">
                  <div className="pdp-overview-text-col">
                    <h3 className="pdp-tab-heading font-display">The Architecture of Time</h3>
                    <p className="pdp-tab-copy">
                      Crafted in accordance with classical Geneva watchmaking standards, the {currentProduct.name} embodies 
                      an unyielding dedication to proportions and balance. The dial features multi-layered guilloché brushing 
                      that captures and refracts ambient light with subtle dynamism.
                    </p>
                    <p className="pdp-tab-copy">
                      Housed inside is an individually calibrated mechanical calibre, operating at 28,800 vibrations per hour (4 Hz) 
                      to guarantee exceptional chronometric precision. The exhibition caseback allows collectors to admire the 
                      chamfered bridges, blued screws, and custom skeletonized rotor.
                    </p>
                  </div>
                  <div className="pdp-overview-image-col">
                    <img src="/assets/craft-movement.jpg" alt="Horological Calibre Movement" className="pdp-tab-feature-img" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="pdp-tab-pane">
                <div className="pdp-specs-table-grid">
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Reference Number</span>
                    <span className="pdp-spec-v">{currentProduct.ref}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Calibre Movement</span>
                    <span className="pdp-spec-v">{specs.movement || 'Automatic Calibre R-202'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Power Reserve</span>
                    <span className="pdp-spec-v">{specs.powerReserve || '48 Hours'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Frequency</span>
                    <span className="pdp-spec-v">28,800 vph (4 Hz)</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Case Diameter</span>
                    <span className="pdp-spec-v">{specs.caseDiameter || '40 mm'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Case Thickness</span>
                    <span className="pdp-spec-v">{specs.thickness || '9.8 mm'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Case Material</span>
                    <span className="pdp-spec-v">{specs.caseMaterial || '316L Surgical Stainless Steel'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Crystal Glass</span>
                    <span className="pdp-spec-v">{specs.crystal || 'Double-domed Sapphire with 5x AR Coating'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Water Resistance</span>
                    <span className="pdp-spec-v">{specs.waterResistance || '50m (5 ATM)'}</span>
                  </div>
                  <div className="pdp-spec-cell">
                    <span className="pdp-spec-k">Strap Lug Width</span>
                    <span className="pdp-spec-v">{specs.strapWidth || '20 mm'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="pdp-tab-pane">
                <div className="pdp-care-grid">
                  <div className="pdp-care-card">
                    <h4>Magnetic Field Protection</h4>
                    <p>Modern electronic devices and magnetic fasteners can impact balance springs. Keep your watch at least 10cm away from strong speakers, induction hobs, or magnetic clasps.</p>
                  </div>
                  <div className="pdp-care-card">
                    <h4>Water Resistance Protocol</h4>
                    <p>Always verify the crown is fully pushed in or screwed down before water contact. Do not operate chronograph pushers or adjust the crown while submerged.</p>
                  </div>
                  <div className="pdp-care-card">
                    <h4>3 to 5 Year Atelier Service</h4>
                    <p>To ensure chronometric accuracy and lubrication longevity, REVERIE offers complimentary warranty health checks and factory servicing at our Geneva atelier.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Timepieces */}
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
