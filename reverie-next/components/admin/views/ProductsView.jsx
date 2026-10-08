import React, { useState, useEffect, useMemo } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminProductService } from '../../../services/admin/adminServices';
import { allWatchCatalog } from '../../../data/allProductsData';
import {
  Layers,
  Eye,
  EyeOff,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Save,
  Shield,
  Clock,
  Compass,
  DollarSign,
  Package,
  Layers3,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

const HOROLOGY_IMAGE_PRESETS = [
  { label: 'Classic Royale Blue', url: '/assets/watch-classic-blue-front.jpg' },
  { label: 'Heritage Rose Gold', url: '/assets/watch-heritage-gold-front.jpg' },
  { label: 'Celeste Diamond Pavé', url: '/assets/watch-celeste-diamond-front.jpg' },
  { label: 'Chronograph Sport', url: '/assets/watch-chrono-front.jpg' },
  { label: 'Squelette Openwork', url: '/assets/watch-skeleton-women-front.jpg' },
  { label: 'Malachite Horizon', url: '/assets/watch-malachite-front.jpg' },
];

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [notification, setNotification] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form state for Create / Edit
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    collection: 'Grande Complication',
    price: 35000,
    caseMaterial: 'Grade 5 Titanium / Sapphire',
    movement: 'Calibre REV-901 Automatic',
    dial: 'Midnight Sunburst Dial',
    stock: 12,
    status: 'PUBLISHED',
    imageUrl: '/images/watches/classic-royale.webp',
    description: '',
  });

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await adminProductService.getProducts({ size: 50 });
      const list = data?.content || (Array.isArray(data) ? data : []);
      if (list.length > 0) {
        setProducts(
          list.map((p) => ({
            id: p.id,
            title: p.title || p.name,
            subtitle: p.subtitle || p.shortDescription || 'Haute Horlogerie Masterpiece',
            collection: p.collectionName || p.categoryName || 'Grande Complication',
            pricePaise: p.basePricePaise || ((p.price || 35000) * 100),
            price: (p.basePricePaise ? p.basePricePaise / 100 : p.price) || 35000,
            caseMaterial: p.caseMaterial || 'Grade 5 Titanium / Sapphire',
            movement: p.movement || 'Calibre In-House Automatic',
            dial: p.dial || 'Sunburst Haute Horlogerie',
            status: p.status || (p.isPublished !== false ? 'PUBLISHED' : 'DRAFT'),
            stock: p.stockQuantity ?? (p.stock ?? 12),
            imageUrl: p.imageUrl || p.primaryImageUrl || p.image || '/images/watches/classic-royale.webp',
            description: p.description || '',
          }))
        );
      } else {
        setProducts(
          allWatchCatalog.map((w) => ({
            id: w.id,
            title: w.title,
            subtitle: w.tagline || 'Haute Horlogerie',
            collection: w.category || 'Grande Complication',
            pricePaise: (w.price || 35000) * 100,
            price: w.price || 35000,
            caseMaterial: w.caseMaterial || 'Rose Gold / Platinum',
            movement: w.movement || 'Calibre REV-901 Automatic',
            dial: w.dial || 'Sunburst Enamel Dial',
            status: 'PUBLISHED',
            stock: w.stock || 12,
            imageUrl: w.image || '/images/watches/classic-royale.webp',
            description: w.description || '',
          }))
        );
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Compute stats
  const metrics = useMemo(() => {
    const totalRef = products.length;
    const totalUnits = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
    const totalValuation = products.reduce((acc, p) => acc + (Number(p.price) || 0) * (Number(p.stock) || 0), 0);
    const publishedCount = products.filter((p) => p.status === 'PUBLISHED').length;
    return { totalRef, totalUnits, totalValuation, publishedCount };
  }, [products]);

  const handleToggleVisibility = async (product) => {
    const newStatus = product.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await adminProductService.updateProduct(product.id, {
        ...product,
        status: newStatus,
        basePricePaise: Number(product.price) * 100,
      });
      setProducts(
        products.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
      );
      showToast(
        `"${product.title}" is now ${newStatus === 'PUBLISHED' ? 'Live on Storefront' : 'Hidden from Storefront (Draft)'}.`
      );
    } catch (err) {
      showToast(err.message || 'Failed to update visibility status.', 'error');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image exceeds maximum size of 5MB.', 'error');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setFormData((prev) => ({ ...prev, imageUrl: dataUrl }));
      setUploadingImage(false);
      showToast('High-resolution watch image uploaded.');
    };
    reader.onerror = () => {
      setUploadingImage(false);
      showToast('Failed to read image file.', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      subtitle: 'Bespoke Haute Horlogerie Commission',
      collection: 'Grande Complication',
      price: 45000,
      caseMaterial: '18k Honey Gold & Sapphire',
      movement: 'Calibre REV-008 Tourbillon',
      dial: 'Grand Feu Obsidian Enamel',
      stock: 5,
      status: 'PUBLISHED',
      imageUrl: '/images/watches/classic-royale.webp',
      description: 'Manufactured by master horologists in Geneva with hand-bevelled anglage and 72-hour power reserve.',
    });
    setIsCreating(true);
    setEditingProduct(null);
  };

  const handleOpenEdit = (product) => {
    setFormData({
      title: product.title,
      subtitle: product.subtitle || '',
      collection: product.collection || 'Grande Complication',
      price: product.price || 35000,
      caseMaterial: product.caseMaterial || 'Grade 5 Titanium',
      movement: product.movement || 'Calibre In-House Automatic',
      dial: product.dial || 'Sunburst Dial',
      stock: product.stock ?? 12,
      status: product.status || 'PUBLISHED',
      imageUrl: product.imageUrl || '/images/watches/classic-royale.webp',
      description: product.description || '',
    });
    setEditingProduct(product);
    setIsCreating(false);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('Timepiece model title is required.', 'error');
      return;
    }

    try {
      if (isCreating) {
        const payload = {
          ...formData,
          basePricePaise: Number(formData.price) * 100,
          price: Number(formData.price),
          stockQuantity: Number(formData.stock),
        };
        await adminProductService.createProduct(payload);
        await fetchProducts();
        showToast(`Reference "${formData.title}" added to master catalog.`);
        setIsCreating(false);
      } else if (editingProduct) {
        const payload = {
          ...formData,
          basePricePaise: Number(formData.price) * 100,
          price: Number(formData.price),
          stockQuantity: Number(formData.stock),
        };
        await adminProductService.updateProduct(editingProduct.id, payload);
        await fetchProducts();
        showToast(`Reference "${formData.title}" updated successfully.`);
        setEditingProduct(null);
      }
    } catch (err) {
      showToast(err.message || 'Operation failed.', 'error');
    }
  };

  const handleDeleteProduct = async (id, title) => {
    try {
      await adminProductService.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      setDeletingProduct(null);
      showToast(`Reference "${title}" removed from catalog.`);
    } catch (err) {
      showToast(err.message || 'Failed to remove reference.', 'error');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Timepiece Model',
      sortable: true,
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={val}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                objectFit: 'cover',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                flexShrink: 0,
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                backgroundColor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                border: '1px solid #E2E8F0',
                flexShrink: 0,
              }}
            >
              R
            </div>
          )}
          <div>
            <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: 0 }}>
              {val || 'REVERIE Chronometer'}
            </p>
            <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0 0' }}>
              {row.collection || 'Atelier Masterpiece'}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'caseMaterial',
      label: 'Case & Metal',
      render: (val) => (
        <span style={{ fontSize: 12, color: '#334155', fontWeight: 500 }}>
          {val || 'Titanium Grade 5'}
        </span>
      ),
    },
    {
      key: 'movement',
      label: 'Calibre Movement',
      render: (val) => (
        <span style={{ fontSize: 12, color: '#475569' }}>
          {val || 'Swiss In-House Automatic'}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Retail Price',
      sortable: true,
      render: (val, row) => {
        const amt = val || (row.pricePaise ? row.pricePaise / 100 : 35000);
        return (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#0F172A' }}>
            ${Number(amt).toLocaleString()}
          </span>
        );
      },
    },
    {
      key: 'stock',
      label: 'Vault Stock',
      sortable: true,
      render: (val) => {
        const num = Number(val) || 0;
        const isLow = num <= 3;
        return (
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              backgroundColor: isLow ? '#FFFBEB' : '#F1F5F9',
              color: isLow ? '#B45309' : '#334155',
              border: `1px solid ${isLow ? '#FDE68A' : '#E2E8F0'}`,
            }}
          >
            {num} units
          </span>
        );
      },
    },
    {
      key: 'status',
      label: 'Catalog State',
      render: (val) => <StatusBadge status={val || 'PUBLISHED'} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => handleToggleVisibility(row)}
            title={row.status === 'PUBLISHED' ? 'Hide from Storefront (Draft)' : 'Publish to Storefront (Live)'}
            style={{
              padding: 6,
              borderRadius: 8,
              border: `1px solid ${row.status === 'PUBLISHED' ? '#E2E8F0' : '#FECDD3'}`,
              backgroundColor: row.status === 'PUBLISHED' ? '#FFFFFF' : '#FFF1F2',
              color: row.status === 'PUBLISHED' ? '#334155' : '#E11D48',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            {row.status === 'PUBLISHED' ? (
              <EyeOff style={{ width: 14, height: 14, color: '#64748B' }} />
            ) : (
              <Eye style={{ width: 14, height: 14, color: '#059669' }} />
            )}
          </button>
          <button
            onClick={() => setSelectedProduct(row)}
            title="Inspect Specifications"
            style={{
              padding: 6,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            <Eye style={{ width: 14, height: 14, color: '#D4AF37' }} />
          </button>
          <button
            onClick={() => handleOpenEdit(row)}
            title="Edit Timepiece"
            style={{
              padding: 6,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            <Edit2 style={{ width: 14, height: 14, color: '#2563EB' }} />
          </button>
          <button
            onClick={() => setDeletingProduct(row)}
            title="Delete Timepiece"
            style={{
              padding: 6,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
          >
            <Trash2 style={{ width: 14, height: 14, color: '#E11D48' }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Toast Notification */}
      {notification && (
        <div
          className={`admin-notice ${
            notification.type === 'error' ? 'admin-notice-error' : 'admin-notice-success'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle style={{ width: 16, height: 16 }} />
          ) : (
            <CheckCircle style={{ width: 16, height: 16 }} />
          )}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Metric Stats Cards */}
      <div className="admin-metric-grid">
        <div className="admin-metric-card gold-accent">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Master References</span>
              <h3 className="admin-metric-value">{metrics.totalRef}</h3>
            </div>
            <div className="admin-metric-icon-box">
              <Layers style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#047857', fontWeight: 600 }}>
              {metrics.publishedCount} Live in Storefront
            </span>
            <span style={{ color: '#64748B' }}>100% Curated</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Vault Inventory</span>
              <h3 className="admin-metric-value">{metrics.totalUnits} Units</h3>
            </div>
            <div className="admin-metric-icon-box">
              <Package style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#475569' }}>Physical allocations</span>
            <span style={{ color: '#64748B' }}>Geneva Vault</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Catalog Valuation</span>
              <h3 className="admin-metric-value">
                ${(metrics.totalValuation / 1_000_000).toFixed(2)}M
              </h3>
            </div>
            <div className="admin-metric-icon-box">
              <DollarSign style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#64748B' }}>Based on MSRP list</span>
            <span style={{ color: '#D4AF37', fontWeight: 600 }}>USD Insured</span>
          </div>
        </div>
      </div>

      {/* Main Table with Action Header */}
      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        searchPlaceholder="Search catalog by timepiece title, metal, or calibre..."
        emptyMessage="No timepieces found in master catalog."
        actions={
          <button
            onClick={handleOpenCreate}
            className="admin-btn-primary"
            style={{
              backgroundColor: '#060B14',
              border: '1px solid #1E293B',
            }}
          >
            <Plus style={{ width: 14, height: 14, color: '#D4AF37' }} />
            <span>New Timepiece</span>
          </button>
        }
      />

      {/* =========================================================================
          1. Inspect Specification Modal (Centered Viewport Popup)
          ========================================================================= */}
      <AdminModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        subtitle="HAUTE HORLOGERIE REFERENCE SHEET"
        title={selectedProduct?.title}
        maxWidth="max-w-2xl"
      >
        {selectedProduct && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {selectedProduct.imageUrl && (
              <div
                style={{
                  width: '100%',
                  height: 220,
                  borderRadius: 14,
                  backgroundColor: '#FAF9F6',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
                />
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 12,
              }}
            >
              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  Maison Collection
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {selectedProduct.collection || 'Grande Complication'}
                </p>
              </div>

              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  Retail Valuation (MSRP)
                </span>
                <p style={{ fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A', margin: '2px 0 0 0' }}>
                  ${Number(selectedProduct.price || (selectedProduct.pricePaise ? selectedProduct.pricePaise / 100 : 35000)).toLocaleString()} USD
                </p>
              </div>

              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  Case Metallurgy & Crystal
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {selectedProduct.caseMaterial || 'Grade 5 Titanium'}
                </p>
              </div>

              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  In-House Calibre Movement
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {selectedProduct.movement || 'Calibre REV-Master'}
                </p>
              </div>

              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  Dial Métiers d'Art
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {selectedProduct.dial || 'Sunburst Enamel'}
                </p>
              </div>

              <div style={{ padding: 14, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', fontWeight: 600 }}>
                  Vault Reserves
                </span>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: '4px 0 0 0' }}>
                  {selectedProduct.stock ?? 12} Timepieces
                </p>
              </div>
            </div>

            {selectedProduct.description && (
              <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6, fontWeight: 600 }}>
                  Horological Narrative & Heritage
                </span>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#334155', margin: 0 }}>
                  {selectedProduct.description}
                </p>
              </div>
            )}

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => {
                  const p = selectedProduct;
                  setSelectedProduct(null);
                  handleOpenEdit(p);
                }}
                className="admin-btn-secondary"
              >
                <Edit2 style={{ width: 14, height: 14, color: '#2563EB' }} />
                <span>Edit Reference</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="admin-btn-primary"
              >
                Close Specification
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      {/* =========================================================================
          2. Create / Edit Timepiece Modal (Centered Viewport Popup)
          ========================================================================= */}
      <AdminModal
        isOpen={isCreating || !!editingProduct}
        onClose={() => {
          setIsCreating(false);
          setEditingProduct(null);
        }}
        subtitle={isCreating ? 'NEW MAISON COMMISSION' : 'REFERENCE MODIFICATION'}
        title={isCreating ? 'Create Master Timepiece' : `Edit ${editingProduct?.title}`}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Timepiece Model Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Royal Oak Concept Flying Tourbillon"
                className="admin-form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Maison Collection
              </label>
              <select
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                className="admin-form-select"
              >
                <option value="Grande Complication">Grande Complication</option>
                <option value="Classic Royale">Classic Royale</option>
                <option value="Heritage Collection">Heritage Collection</option>
                <option value="Aero Chronograph">Aero Chronograph</option>
                <option value="Sovereign Tourbillon">Sovereign Tourbillon</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Retail Price ($ USD) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="admin-form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Vault Stock Units *
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="admin-form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Catalog Visibility
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="admin-form-select"
              >
                <option value="PUBLISHED">PUBLISHED (Live)</option>
                <option value="DRAFT">DRAFT (Hidden)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Case Alloy & Crystal
              </label>
              <input
                type="text"
                value={formData.caseMaterial}
                onChange={(e) => setFormData({ ...formData, caseMaterial: e.target.value })}
                placeholder="e.g., Grade 5 Titanium / Sapphire"
                className="admin-form-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                In-House Calibre Movement
              </label>
              <input
                type="text"
                value={formData.movement}
                onChange={(e) => setFormData({ ...formData, movement: e.target.value })}
                placeholder="e.g., Calibre REV-770 Tourbillon Automatic"
                className="admin-form-input"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Dial Finish & Métiers
            </label>
            <input
              type="text"
              value={formData.dial}
              onChange={(e) => setFormData({ ...formData, dial: e.target.value })}
              placeholder="e.g., Midnight Blue Sunburst Enamel"
              className="admin-form-input"
            />
          </div>

          {/* Luxury Image Upload & Asset Studio */}
          <div style={{ padding: 18, borderRadius: 14, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                <ImageIcon style={{ width: 15, height: 15, color: '#D4AF37' }} />
                <span>Timepiece Imagery & Media Studio</span>
              </label>
              <span style={{ fontSize: 11, color: '#64748B' }}>PNG, WebP, JPG up to 5MB</span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
              {/* Image Preview Box */}
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 14,
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #D4AF37',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(212,175,55,0.15)',
                }}
              >
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Watch Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <ImageIcon style={{ width: 28, height: 28, color: '#94A3B8' }} />
                )}
              </div>

              {/* Upload & Browse Buttons */}
              <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                    }}
                  >
                    <Upload style={{ width: 14, height: 14, color: '#D4AF37' }} />
                    <span>{uploadingImage ? 'Uploading Image...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      disabled={uploadingImage}
                    />
                  </label>
                  <span style={{ fontSize: 11, color: '#64748B' }}>or enter custom asset URL</span>
                </div>

                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/images/watches/classic-royale.webp or https://..."
                  className="admin-form-input"
                  style={{ fontSize: 12, padding: '7px 12px' }}
                />
              </div>
            </div>

            {/* Quick Horology Presets */}
            <div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B', display: 'block', marginBottom: 6 }}>
                Quick Haute Horlogerie Presets:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {HOROLOGY_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      backgroundColor: formData.imageUrl === preset.url ? '#0F172A' : '#FFFFFF',
                      color: formData.imageUrl === preset.url ? '#FFFFFF' : '#334155',
                      border: `1px solid ${formData.imageUrl === preset.url ? '#0F172A' : '#CBD5E1'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    {formData.imageUrl === preset.url && (
                      <Check style={{ width: 12, height: 12, color: '#D4AF37' }} />
                    )}
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Horological Description & Pedigree
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Master craftsmanship, hand-finished movement specifications, sapphire crystal caseback..."
              className="admin-form-textarea"
            />
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={() => {
                setIsCreating(false);
                setEditingProduct(null);
              }}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary"
            >
              <Save style={{ width: 14, height: 14, color: '#D4AF37' }} />
              <span>{isCreating ? 'Publish Reference' : 'Save Modifications'}</span>
            </button>
          </div>
        </form>
      </AdminModal>

      {/* =========================================================================
          3. Delete Confirmation Modal (Centered Viewport Popup)
          ========================================================================= */}
      <AdminModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        subtitle="IMMUTABLE LEDGER MUTATION"
        title="Remove Reference"
        maxWidth="max-w-md"
      >
        {deletingProduct && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 14,
                borderRadius: 12,
                backgroundColor: '#FFF1F2',
                border: '1px solid #FECDD3',
                color: '#9F1239',
              }}
            >
              <AlertCircle style={{ width: 22, height: 22, flexShrink: 0, color: '#E11D48' }} />
              <p style={{ fontSize: 12.5, margin: 0, lineHeight: 1.5 }}>
                Are you sure you want to remove reference{' '}
                <strong>"{deletingProduct.title}"</strong> from the master catalogue?
              </p>
            </div>

            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
              This will unpublish the timepiece and revoke client access from the storefront.
            </p>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProduct(deletingProduct.id, deletingProduct.title)}
                className="admin-btn-danger"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
