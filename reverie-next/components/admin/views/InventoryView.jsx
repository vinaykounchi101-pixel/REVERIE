import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminInventoryService, adminProductService } from '../../../services/admin/adminServices';
import { Package, Plus, Minus, AlertTriangle, ShieldCheck, RefreshCw, Layers } from 'lucide-react';

export default function InventoryView() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adjustModal, setAdjustModal] = useState(null);
  const [quantityDelta, setQuantityDelta] = useState(5);
  const [adjustReason, setAdjustReason] = useState('Swiss Atelier Production Batch');
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const data = await adminProductService.getProducts({ size: 50 });
      const productList = data?.content || (Array.isArray(data) ? data : []);
      
      const flatVariants = productList.flatMap((p) => {
        if (p.variants && p.variants.length > 0) {
          return p.variants.map((v) => ({
            id: v.id,
            variantId: v.id,
            productId: p.id,
            productTitle: p.title || p.name,
            sku: v.sku || `SKU-${p.id?.substring(0, 4)}`,
            allocatedStock: v.stockQuantity ?? 12,
            reservedStock: 0,
            availableStock: v.stockQuantity ?? 12,
            material: v.material || p.caseMaterial || '316L Stainless Steel',
          }));
        }
        return [{
          id: p.id,
          variantId: p.id,
          productId: p.id,
          productTitle: p.title || p.name,
          sku: p.sku || `SKU-${p.id?.substring(0, 4)}`,
          allocatedStock: p.stockQuantity ?? 12,
          reservedStock: 0,
          availableStock: p.stockQuantity ?? 12,
          material: p.caseMaterial || 'Rose Gold / Platinum',
        }];
      });

      setInventory(flatVariants);
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdjustStock = async (e) => {
    e.preventDefault();
    if (!adjustModal) return;
    setActionLoading(true);
    try {
      await adminInventoryService.adjustStock(
        adjustModal.variantId || adjustModal.id,
        Number(quantityDelta),
        adjustReason
      );
      setNotice({ type: 'success', message: `Stock adjusted successfully for ${adjustModal.productTitle}` });
      setAdjustModal(null);
      await fetchInventory();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to adjust stock' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'productTitle',
      label: 'Timepiece Model',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-medium text-stone-900 text-xs">{val || 'Bespoke Model'}</p>
          <p className="font-mono text-[10px] text-stone-400">SKU: {row.sku || 'REV-001'}</p>
        </div>
      ),
    },
    {
      key: 'material',
      label: 'Vault Specification',
      render: (val) => <span className="font-mono text-xs text-stone-600">{val || 'Titanium / Sapphire'}</span>,
    },
    {
      key: 'availableStock',
      label: 'Available Reserves',
      sortable: true,
      render: (val, row) => {
        const stock = val !== undefined ? val : row.allocatedStock || 0;
        return (
          <span className="font-mono text-xs font-semibold text-[#0F172A]">
            {stock} units
          </span>
        );
      },
    },
    {
      key: 'status',
      label: 'Vault Health',
      render: (_, row) => {
        const available = row.availableStock ?? row.allocatedStock ?? 0;
        const status = available <= 0 ? 'OUT_OF_STOCK' : available <= 3 ? 'LOW_STOCK' : 'IN_STOCK';
        return <StatusBadge status={status} />;
      },
    },
    {
      key: 'actions',
      label: 'Vault Operations',
      render: (_, row) => (
        <button
          onClick={() => {
            setAdjustModal(row);
            setQuantityDelta(5);
            setAdjustReason('Geneva Atelier Restock Batch');
          }}
          className="px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-800 hover:bg-stone-50 text-xs font-mono font-medium flex items-center gap-1 transition"
        >
          <Plus className="w-3 h-3 text-[#D4AF37]" />
          <span>Adjust Stock</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {notice && (
        <div className={`p-4 rounded-xl text-xs font-mono border ${
          notice.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          {notice.message}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-stone-400">Total Vault Units</span>
          <p className="font-serif text-2xl text-[#0F172A] mt-1 font-medium">
            {inventory.reduce((acc, curr) => acc + (curr.availableStock || curr.allocatedStock || 0), 0)}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-stone-400">Low Stock SKUs</span>
          <p className="font-serif text-2xl text-amber-600 mt-1 font-medium">
            {inventory.filter((i) => (i.availableStock ?? i.allocatedStock ?? 0) <= 3).length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
          <span className="text-[10px] font-mono uppercase text-stone-400">Active Timepiece SKUs</span>
          <p className="font-serif text-2xl text-[#0F172A] mt-1 font-medium">{inventory.length}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={inventory}
        loading={loading}
        searchPlaceholder="Search vault by model title or SKU..."
        emptyMessage="No timepiece inventory found in vault."
      />

      {/* Stock Adjustment Modal */}
      {adjustModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAdjustStock} className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Vault Ledger Adjustment
                </span>
                <h3 className="font-serif text-xl text-[#0F172A] font-medium mt-0.5">
                  {adjustModal.productTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setAdjustModal(null)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Quantity Delta (+ to add stock, - to deduct)
                </label>
                <input
                  type="number"
                  value={quantityDelta}
                  onChange={(e) => setQuantityDelta(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Adjustment Reason & Batch Reference
                </label>
                <input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Geneva Atelier restock batch #402"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono"
                  required
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setAdjustModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-600 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition disabled:opacity-50"
              >
                {actionLoading ? 'Updating Ledger...' : 'Commit to Vault'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
