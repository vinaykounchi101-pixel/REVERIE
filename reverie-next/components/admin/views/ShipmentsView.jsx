import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminShipmentService, adminOrderService } from '../../../services/admin/adminServices';
import { Truck, ShieldCheck, MapPin, Eye, ExternalLink, Plus } from 'lucide-react';

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
        <span className="font-mono text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
          {val || row.awbNumber || `AWB-${row.id?.substring(0, 8)}`}
        </span>
      ),
    },
    {
      key: 'courierName',
      label: 'Secure Carrier Rail',
      render: (val, row) => <span className="font-mono text-xs text-stone-700">{val || row.carrier || 'Ferrari Group Armored'}</span>,
    },
    {
      key: 'currentLocation',
      label: 'Last Verified Checkpoint',
      render: (val) => (
        <span className="text-xs text-stone-600 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-stone-400" />
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setUpdateModal(row);
              setNewStatus(row.status === 'PENDING' ? 'IN_TRANSIT' : 'DELIVERED');
              setNewLocation('Frankfurt Customs Secure Transit Hub');
              setEventDesc('Biometric package scan verified by courier lead.');
            }}
            className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono font-semibold transition"
          >
            Log Checkpoint
          </button>
        </div>
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

      {/* Armored Logistics Status Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-900 via-[#0F172A] to-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
            Haute Horlogerie Global Armored Logistics
          </span>
          <p className="text-xs text-stone-300 font-mono mt-1">
            All timepieces ship fully insured with armored escort & biometric customs clearance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreateModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white text-[#0F172A] hover:bg-stone-100 text-xs font-mono font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Dispatch New Shipment</span>
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={shipments}
        loading={loading}
        searchPlaceholder="Search by AWB, carrier, destination, or checkpoint..."
        emptyMessage="No armored shipments recorded in active ledger."
      />

      {/* Dispatch Shipment Modal */}
      {createModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateShipment} className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Armored Dispatch Generation
                </span>
                <h3 className="font-serif text-xl text-[#0F172A] font-medium mt-0.5">
                  Authorize Secure Courier
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateModal(false)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-stone-600 mb-1">Target Order Commission</label>
                {orders.length === 0 ? (
                  <p className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-500">
                    No active orders found. Place an order on the storefront first.
                  </p>
                ) : (
                  <select
                    value={newShipmentOrder}
                    onChange={(e) => setNewShipmentOrder(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
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
                <label className="block text-stone-600 mb-1">Courier Transit Rail</label>
                <select
                  value={courierName}
                  onChange={(e) => setCourierName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                >
                  <option value="Ferrari Group Armored Courier">Ferrari Group Armored Courier (Geneva - Zurich)</option>
                  <option value="Malca-Amit Luxury Transit">Malca-Amit High-Value Vault Escort</option>
                  <option value="Brinks Global Luxury Services">Brinks Global Luxury Air Escort</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Custom AWB / Waybill Code (Optional)</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. FG-CH-992140 (Auto-generated if blank)"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setCreateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-600 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading || orders.length === 0}
                className="px-5 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition disabled:opacity-50"
              >
                {actionLoading ? 'Dispatching...' : 'Dispatch Shipment'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Checkpoint Modal */}
      {updateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleUpdateStatus} className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Armored Transit Telemetry Log
                </span>
                <h3 className="font-serif text-xl text-[#0F172A] font-medium mt-0.5">
                  Update {updateModal.trackingNumber || updateModal.awbNumber}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUpdateModal(null)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Transit Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_TRANSIT">IN_TRANSIT</option>
                  <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Current Checkpoint Location
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-stone-600 mb-1">
                  Telemetry / Inspection Description
                </label>
                <input
                  type="text"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A] font-mono"
                  required
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setUpdateModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-600 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition disabled:opacity-50"
              >
                {actionLoading ? 'Writing Checkpoint...' : 'Commit Telemetry'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
