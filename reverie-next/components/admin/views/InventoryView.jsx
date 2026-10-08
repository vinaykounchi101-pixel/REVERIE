import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminInventoryService, adminProductService } from '../../../services/admin/adminServices';
import { Package, Plus, Minus, AlertTriangle, ShieldCheck, RefreshCw, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

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
          <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: 0 }}>{val || 'Bespoke Model'}</p>
          <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0 0' }}>SKU: {row.sku || 'REV-001'}</p>
        </div>
      ),
    },
    {
      key: 'material',
      label: 'Vault Specification',
      render: (val) => <span style={{ fontSize: 12, color: '#334155' }}>{val || 'Titanium / Sapphire'}</span>,
    },
    {
      key: 'availableStock',
      label: 'Available Reserves',
      sortable: true,
      render: (val, row) => {
        const stock = val !== undefined ? val : row.allocatedStock || 0;
        return (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: '#0F172A' }}>
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
          style={{
            padding: '5px 12px',
            borderRadius: 8,
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Plus style={{ width: 12, height: 12, color: '#D4AF37' }} />
          <span>Adjust Stock</span>
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {notice && (
        <div
          className={`admin-notice ${
            notice.type === 'success' ? 'admin-notice-success' : 'admin-notice-error'
          }`}
        >
          {notice.type === 'success' ? (
            <CheckCircle2 style={{ width: 16, height: 16 }} />
          ) : (
            <AlertCircle style={{ width: 16, height: 16 }} />
          )}
          <span>{notice.message}</span>
        </div>
      )}

      {/* Overview Cards */}
      <div className="admin-metric-grid">
        <div className="admin-metric-card gold-accent">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Total Vault Units</span>
              <h3 className="admin-metric-value">
                {inventory.reduce((acc, curr) => acc + (curr.availableStock || curr.allocatedStock || 0), 0)}
              </h3>
            </div>
            <div className="admin-metric-icon-box">
              <Package style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#047857', fontWeight: 600 }}>Physical Inventory</span>
            <span style={{ color: '#64748B' }}>Geneva Depository</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Low Stock SKUs</span>
              <h3 className="admin-metric-value" style={{ color: '#D97706' }}>
                {inventory.filter((i) => (i.availableStock ?? i.allocatedStock ?? 0) <= 3).length}
              </h3>
            </div>
            <div className="admin-metric-icon-box">
              <AlertTriangle style={{ width: 20, height: 20, color: '#D97706' }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#64748B' }}>Threshold: &le; 3 units</span>
            <span style={{ color: '#D97706', fontWeight: 600 }}>Action Needed</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <div>
              <span className="admin-metric-title">Active Reference SKUs</span>
              <h3 className="admin-metric-value">{inventory.length}</h3>
            </div>
            <div className="admin-metric-icon-box">
              <Layers style={{ width: 20, height: 20 }} />
            </div>
          </div>
          <div className="admin-metric-footer">
            <span style={{ color: '#64748B' }}>Master References</span>
            <span style={{ color: '#047857', fontWeight: 600 }}>Active</span>
          </div>
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
      <AdminModal
        isOpen={!!adjustModal}
        onClose={() => setAdjustModal(null)}
        subtitle="VAULT LEDGER ADJUSTMENT"
        title={adjustModal?.productTitle}
        maxWidth="max-w-md"
      >
        {adjustModal && (
          <form onSubmit={handleAdjustStock} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Quantity Delta (+ to add stock, - to deduct)
              </label>
              <input
                type="number"
                value={quantityDelta}
                onChange={(e) => setQuantityDelta(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Adjustment Reason & Batch Reference
              </label>
              <input
                type="text"
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="e.g. Geneva Atelier restock batch #402"
                className="admin-form-input"
                required
              />
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setAdjustModal(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="admin-btn-primary"
              >
                {actionLoading ? 'Updating Ledger...' : 'Commit to Vault'}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
