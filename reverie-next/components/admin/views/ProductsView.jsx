import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminProductService } from '../../../services/admin/adminServices';
import { allWatchCatalog } from '../../../data/allProductsData';
import { Layers, Eye, Plus, Edit2, Trash2, CheckCircle, AlertCircle, X, Sparkles, Image as ImageIcon, Save } from 'lucide-react';

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notification, setNotification] = useState(null);

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
        setProducts(list.map((p) => ({
          id: p.id,
          title: p.title || p.name,
          subtitle: p.subtitle || p.shortDescription || 'Haute Horlogerie Masterpiece',
          collection: p.collectionName || p.categoryName || 'Grande Complication',
          pricePaise: p.basePricePaise || ((p.price || 35000) * 100),
          price: (p.basePricePaise ? p.basePricePaise / 100 : p.price) || 35000,
          caseMaterial: p.caseMaterial || 'Grade 5 Titanium / Sapphire',
          movement: p.movement || 'Calibre In-House Automatic',
          dial: p.dial || 'Sunburst Haute Horlogerie',
          status: p.isPublished !== false ? 'PUBLISHED' : 'DRAFT',
          stock: p.stockQuantity ?? 12,
          imageUrl: p.imageUrl || p.primaryImageUrl || p.image || '/images/watches/classic-royale.webp',
          description: p.description || '',
        })));
      } else {
        setProducts(allWatchCatalog.map((w) => ({
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
        })));
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
      description: 'Manufactured by master horologists in Geneva with hand-bevelled anglage.',
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
        const created = await adminProductService.createProduct(payload);
        const newEntry = {
          id: created.id || 'prod-' + Date.now(),
          ...payload,
          pricePaise: Number(formData.price) * 100,
        };
        setProducts([newEntry, ...products]);
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
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id
              ? { ...p, ...payload, pricePaise: Number(formData.price) * 100 }
              : p
          )
        );
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
      setDeletingId(null);
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
        <div className="flex items-center gap-3">
          {row.imageUrl ? (
            <img
              src={row.imageUrl}
              alt={val}
              className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-stone-200"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400 font-serif text-sm border border-stone-200">
              R
            </div>
          )}
          <div>
            <p className="font-medium text-stone-900 text-xs">{val || 'REVERIE Chronometer'}</p>
            <p className="font-mono text-[10px] text-stone-400">{row.collection || 'Atelier Masterpiece'}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'caseMaterial',
      label: 'Case & Metal',
      render: (val) => <span className="font-mono text-xs text-stone-700">{val || 'Titanium Grade 5'}</span>,
    },
    {
      key: 'movement',
      label: 'Calibre Movement',
      render: (val) => <span className="font-mono text-[11px] text-stone-600">{val || 'Swiss In-House Automatic'}</span>,
    },
    {
      key: 'price',
      label: 'Retail Price',
      sortable: true,
      render: (val, row) => {
        const amt = val || (row.pricePaise ? row.pricePaise / 100 : 35000);
        return <span className="font-mono font-semibold text-[#0F172A]">${Number(amt).toLocaleString()}</span>;
      },
    },
    {
      key: 'stock',
      label: 'Vault Stock',
      sortable: true,
      render: (val) => (
        <span className={`font-mono text-xs font-medium px-2 py-0.5 rounded-full ${Number(val) <= 3 ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-stone-50 text-stone-700 border border-stone-200'}`}>
          {val ?? 0} units
        </span>
      ),
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
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedProduct(row)}
            title="Inspect Specifications"
            className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition"
          >
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
          <button
            onClick={() => handleOpenEdit(row)}
            title="Edit Timepiece"
            className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 transition"
          >
            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
          </button>
          <button
            onClick={() => setDeletingId(row)}
            title="Delete Timepiece"
            className="p-1.5 rounded-lg border border-stone-200 bg-white hover:bg-rose-50 text-rose-500 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-mono border shadow-lg transition ${notification.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
          {notification.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-600" /> : <CheckCircle className="w-4 h-4 text-emerald-600" />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-sm">
        <div>
          <h2 className="font-serif text-lg text-[#0F172A] font-medium">Master Timepiece Catalog</h2>
          <p className="text-xs font-mono text-stone-500 mt-0.5">
            Curate references, calibre complications, dials, gold alloys & vault allocations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-stone-500">
            {products.length} References
          </span>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>New Timepiece</span>
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        searchPlaceholder="Search catalog by timepiece title, metal, or calibre..."
        emptyMessage="No timepieces found in master catalog."
      />

      {/* Inspect Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Haute Horlogerie Reference Sheet
                </span>
                <h3 className="font-serif text-2xl text-[#0F172A] font-medium mt-1">
                  {selectedProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            {selectedProduct.imageUrl && (
              <div className="w-full h-48 rounded-xl bg-stone-50 overflow-hidden border border-stone-200 flex items-center justify-center">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="h-full object-contain p-4"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 uppercase text-[10px] block">Collection</span>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedProduct.collection || 'Grand Complication'}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 uppercase text-[10px] block">Retail Valuation</span>
                <p className="font-semibold text-[#0F172A] mt-0.5">
                  ${Number(selectedProduct.price || (selectedProduct.pricePaise ? selectedProduct.pricePaise / 100 : 35000)).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 uppercase text-[10px] block">Case Material</span>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedProduct.caseMaterial || 'Grade 5 Titanium'}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 uppercase text-[10px] block">In-House Movement</span>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedProduct.movement || 'Calibre REV-Master'}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 uppercase text-[10px] block">Dial Finish</span>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedProduct.dial || 'Sunburst Enamel'}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200">
                <span className="text-stone-400 uppercase text-[10px] block">Vault Inventory</span>
                <p className="font-semibold text-stone-800 mt-0.5">{selectedProduct.stock ?? 12} Timepieces</p>
              </div>
            </div>

            {selectedProduct.description && (
              <div className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200 text-xs font-mono text-stone-600">
                <span className="text-stone-400 uppercase text-[10px] block mb-1">Description</span>
                {selectedProduct.description}
              </div>
            )}

            <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
              <button
                onClick={() => {
                  const p = selectedProduct;
                  setSelectedProduct(null);
                  handleOpenEdit(p);
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono border border-stone-200 hover:bg-stone-50 text-stone-700 transition flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Edit Reference</span>
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  {isCreating ? 'Maison Commission' : 'Reference Modification'}
                </span>
                <h3 className="font-serif text-2xl text-[#0F172A] font-medium mt-1">
                  {isCreating ? 'Create New Master Timepiece' : `Edit ${editingProduct.title}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Timepiece Model Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Chronographe Royal Gold"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Collection</label>
                  <select
                    value={formData.collection}
                    onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  >
                    <option value="Grande Complication">Grande Complication</option>
                    <option value="Classic Royale">Classic Royale</option>
                    <option value="Heritage Collection">Heritage Collection</option>
                    <option value="Aero Chronograph">Aero Chronograph</option>
                    <option value="Sovereign Tourbillon">Sovereign Tourbillon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Retail Price ($ USD) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Vault Inventory Units *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Catalog Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  >
                    <option value="PUBLISHED">PUBLISHED (Live)</option>
                    <option value="DRAFT">DRAFT (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Case Alloy & Material</label>
                  <input
                    type="text"
                    value={formData.caseMaterial}
                    onChange={(e) => setFormData({ ...formData, caseMaterial: e.target.value })}
                    placeholder="e.g., 18k Sedna Gold / Platinum 950"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Calibre Movement</label>
                  <input
                    type="text"
                    value={formData.movement}
                    onChange={(e) => setFormData({ ...formData, movement: e.target.value })}
                    placeholder="e.g., In-House REV-770 Tourbillon"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Dial Finish & Colour</label>
                  <input
                    type="text"
                    value={formData.dial}
                    onChange={(e) => setFormData({ ...formData, dial: e.target.value })}
                    placeholder="e.g., Sunburst Midnight Blue Enamel"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-600 mb-1">Image Asset Path / URL</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/watches/classic-royale.webp"
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">Horological Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Master craftsmanship, hand-finished movement specifications, sapphire crystal caseback..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 focus:outline-none focus:border-[#D4AF37] bg-[#FAF9F6]"
                />
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono border border-stone-200 text-stone-600 hover:bg-stone-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isCreating ? 'Publish Reference' : 'Save Modifications'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-serif text-lg text-stone-900 font-medium">Remove Master Reference</h3>
            </div>
            <p className="text-xs font-mono text-stone-600">
              Are you sure you want to remove <span className="font-semibold text-stone-900 font-serif">"{deletingId.title}"</span> from the master catalogue? This will unpublish the reference.
            </p>
            <div className="pt-3 border-t border-stone-100 flex justify-end gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono border border-stone-200 text-stone-600 hover:bg-stone-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deletingId.id, deletingId.title)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
