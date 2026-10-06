import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminProductService } from '../../../services/admin/adminServices';
import { allWatchCatalog } from '../../../data/allProductsData';
import { Layers, Eye, Plus, CheckCircle, Sparkles, Sliders } from 'lucide-react';

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          caseMaterial: p.caseMaterial || 'Grade 5 Titanium / Sapphire',
          movement: p.movement || 'Calibre In-House Automatic',
          status: p.isPublished !== false ? 'PUBLISHED' : 'DRAFT',
          stock: p.stockQuantity ?? 12,
          imageUrl: p.imageUrl || p.primaryImageUrl || p.image,
        })));
      } else {
        setProducts(allWatchCatalog.map((w) => ({
          id: w.id,
          title: w.title,
          subtitle: w.tagline || 'Haute Horlogerie',
          collection: w.category || 'Grande Complication',
          pricePaise: (w.price || 35000) * 100,
          caseMaterial: w.caseMaterial || 'Rose Gold / Platinum',
          movement: w.movement || 'Calibre REV-901 Automatic',
          status: 'PUBLISHED',
          stock: w.stock || 12,
          imageUrl: w.image,
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
      key: 'pricePaise',
      label: 'Retail Price',
      sortable: true,
      render: (val, row) => {
        const amt = val ? val / 100 : (row.price || 35000);
        return <span className="font-mono font-semibold text-[#0F172A]">${amt.toLocaleString()}</span>;
      },
    },
    {
      key: 'status',
      label: 'Catalog State',
      render: (val) => <StatusBadge status={val || 'PUBLISHED'} />,
    },
    {
      key: 'actions',
      label: 'Specification',
      render: (_, row) => (
        <button
          onClick={() => setSelectedProduct(row)}
          className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-xs font-mono text-stone-700 flex items-center gap-1.5 transition"
        >
          <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Inspect</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-stone-200">
        <div>
          <h2 className="font-serif text-lg text-[#0F172A] font-medium">Master Timepiece Catalog</h2>
          <p className="text-xs font-mono text-stone-500 mt-0.5">
            Active references, complications, dials & Swiss calibres
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-stone-500">
            {products.length} References Registered
          </span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        searchPlaceholder="Search catalog by timepiece title, metal, or calibre..."
        emptyMessage="No timepieces found in master catalog."
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
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
                  ${((selectedProduct.pricePaise ? selectedProduct.pricePaise / 100 : selectedProduct.price) || 35000).toLocaleString()}
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
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition"
              >
                Close Specification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
