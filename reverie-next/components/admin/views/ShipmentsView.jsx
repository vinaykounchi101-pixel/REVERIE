import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminShipmentService, adminOrderService } from '../../../services/admin/adminServices';
import { Truck, ShieldCheck, MapPin, Eye, ExternalLink, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ShipmentsView() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModal, setUpdateModal] = useState(null);
  const [newStatus, setNewStatus] = useState('IN_TRANSIT');
  const [newLocation, setNewLocation] = useState('Zurich Airport Customs Bonded Facility');
  const [eventDesc, setEventDesc] = useState('Armored escort handoff verified by biometric seal');
  const [createModal, setCreateModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [newShipmentOrder, setNewShipmentOrder] = useState('');
  const [courierName, setCourierName] = useState('Ferrari Group Armored Courier');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const data = await adminShipmentService.getShipments();
      const list = data?.content || (Array.isArray(data) ? data : []);
      setShipments(list);
    } catch (err) {
      console.error('Failed to load shipments:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersForDispatch = async () => {
    try {
      const data = await adminOrderService.getOrders(null, 0, 50);
      const list = data?.content || (Array.isArray(data) ? data : []);
      setOrders(list);
      if (list.length > 0 && !newShipmentOrder) {
        setNewShipmentOrder(list[0].id);
      }
    } catch (err) {
      console.error('Failed to load orders for dispatch:', err);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchOrdersForDispatch();
  }, []);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!updateModal) return;
    setActionLoading(true);
    try {
      await adminShipmentService.updateShipmentStatus(updateModal.id, {
        status: newStatus,
        location: newLocation,
        eventDescription: eventDesc,
      });
      setNotice({ type: 'success', message: `Telemetry checkpoint updated for ${updateModal.awbNumber || updateModal.trackingNumber}` });
      setUpdateModal(null);
      await fetchShipments();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to update tracking' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    if (!newShipmentOrder) return;
    setActionLoading(true);
    try {
      const generatedAwb = trackingNumber || `AWB-REV-${Date.now().toString().slice(-6)}`;
      await adminShipmentService.createShipment({
        orderId: newShipmentOrder,
        courierName: courierName,
        trackingNumber: generatedAwb,
        estimatedDelivery: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
        trackingNotes: 'Dispatched from Geneva Atelier Central Vault',
      });
      setNotice({ type: 'success', message: `Armored shipment dispatched with AWB ${generatedAwb}` });
      setCreateModal(false);
      setTrackingNumber('');
      await fetchShipments();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to dispatch shipment' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'trackingNumber',
      label: 'Armored Waybill (AWB)',
      sortable: true,
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Truck style={{ width: 14, height: 14, color: '#D4AF37' }} />
          {val || row.awbNumber || `AWB-${row.id?.substring(0, 8)}`}
        </span>
      ),
    },
    {
      key: 'courierName',
      label: 'Secure Carrier Rail',
      render: (val, row) => <span style={{ fontSize: 12, color: '#334155' }}>{val || row.carrier || 'Ferrari Group Armored'}</span>,
    },
    {
      key: 'currentLocation',
      label: 'Last Verified Checkpoint',
      render: (val) => (
        <span style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin style={{ width: 12, height: 12, color: '#94A3B8' }} />
          {val || 'Geneva Vault Bonded Hub'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Transit Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => {
            setUpdateModal(row);
            setNewStatus(row.status === 'PENDING' ? 'IN_TRANSIT' : 'DELIVERED');
            setNewLocation('Frankfurt Customs Secure Transit Hub');
            setEventDesc('Biometric package scan verified by courier lead.');
          }}
          style={{
            padding: '5px 12px',
            borderRadius: 8,
            backgroundColor: '#F1F5F9',
            border: '1px solid #E2E8F0',
            fontSize: 11,
            fontWeight: 600,
            color: '#334155',
            cursor: 'pointer',
          }}
        >
          Log Checkpoint
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

      {/* Armored Logistics Status Header */}
      <div
        style={{
          padding: '20px 24px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.15)',
        }}
      >
        <div>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 700 }}>
            HAUTE HORLOGERIE GLOBAL ARMORED LOGISTICS
          </span>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: '4px 0 0 0' }}>
            All timepieces ship fully insured with armored escort & biometric customs clearance.
          </p>
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="admin-btn-primary"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
          }}
        >
          <Plus style={{ width: 14, height: 14, color: '#D4AF37' }} />
          <span>Dispatch New Shipment</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={shipments}
        loading={loading}
        searchPlaceholder="Search by AWB, carrier, destination, or checkpoint..."
        emptyMessage="No armored shipments recorded in active ledger."
      />

      {/* Dispatch Shipment Modal */}
      <AdminModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        subtitle="ARMORED DISPATCH GENERATION"
        title="Authorize Secure Courier"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateShipment} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Target Order Commission
            </label>
            {orders.length === 0 ? (
              <p style={{ padding: 12, backgroundColor: '#FAF9F6', border: '1px solid #E2E8F0', borderRadius: 10, fontSize: 12, color: '#64748B', margin: 0 }}>
                No active orders found. Place an order on the storefront first.
              </p>
            ) : (
              <select
                value={newShipmentOrder}
                onChange={(e) => setNewShipmentOrder(e.target.value)}
                className="admin-form-select"
                required
              >
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    #{o.orderNumber || o.id.substring(0, 8)} — {o.shippingAddress?.fullName || o.userEmail || 'Client'} (${((o.totalAmountPaise || 0) / 100).toLocaleString()})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Courier Transit Rail
            </label>
            <select
              value={courierName}
              onChange={(e) => setCourierName(e.target.value)}
              className="admin-form-select"
            >
              <option value="Ferrari Group Armored Courier">Ferrari Group Armored Courier (Geneva - Zurich)</option>
              <option value="Malca-Amit Luxury Transit">Malca-Amit High-Value Vault Escort</option>
              <option value="Brinks Global Luxury Services">Brinks Global Luxury Air Escort</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Custom AWB / Waybill Code (Optional)
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g. FG-CH-992140 (Auto-generated if blank)"
              className="admin-form-input"
            />
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={() => setCreateModal(false)}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading || orders.length === 0}
              className="admin-btn-primary"
            >
              {actionLoading ? 'Dispatching...' : 'Dispatch Shipment'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Checkpoint Modal */}
      <AdminModal
        isOpen={!!updateModal}
        onClose={() => setUpdateModal(null)}
        subtitle="ARMORED TRANSIT TELEMETRY LOG"
        title={updateModal ? `Update ${updateModal.trackingNumber || updateModal.awbNumber}` : ''}
        maxWidth="max-w-md"
      >
        {updateModal && (
          <form onSubmit={handleUpdateStatus} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Transit Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="admin-form-select"
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_TRANSIT">IN_TRANSIT</option>
                <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                <option value="DELIVERED">DELIVERED</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Current Checkpoint Location
              </label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Telemetry / Inspection Description
              </label>
              <input
                type="text"
                value={eventDesc}
                onChange={(e) => setEventDesc(e.target.value)}
                className="admin-form-input"
                required
              />
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setUpdateModal(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="admin-btn-primary"
              >
                {actionLoading ? 'Writing Checkpoint...' : 'Commit Telemetry'}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
