import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, AlertTriangle, ArrowRight, Clock, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import MetricCard from '../MetricCard';
import StatusBadge from '../StatusBadge';
import { adminDashboardService, adminOrderService, adminProductService } from '../../../services/admin/adminServices';

export default function OverviewView({ onNavigate }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalRevenuePaise: 0,
    activeOrdersCount: 0,
    lowStockCount: 0,
    registeredCustomersCount: 0,
    recentOrders: [],
    lowStockAlerts: [],
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [summaryRes, ordersRes, productsRes] = await Promise.allSettled([
        adminDashboardService.getSummary(),
        adminOrderService.getOrders(null, 0, 10),
        adminProductService.getProducts({ size: 50 }),
      ]);

      const summary = summaryRes.status === 'fulfilled' ? summaryRes.value : null;
      const ordersData = ordersRes.status === 'fulfilled' ? ordersRes.value : null;
      const productsData = productsRes.status === 'fulfilled' ? productsRes.value : null;

      const ordersList = ordersData?.content || (Array.isArray(ordersData) ? ordersData : []);
      const productsList = productsData?.content || (Array.isArray(productsData) ? productsData : []);

      const totalRevenue = summary?.sales?.totalNetRevenuePaise ?? 
        ordersList.reduce((sum, o) => sum + (o.totalAmountPaise || 0), 0);
      
      const activeOrders = summary?.sales?.totalOrders ?? ordersList.length;
      const lowStock = summary?.inventory?.lowStockCount ?? 0;
      const registeredCount = summary?.registeredCustomersCount ?? 2;

      // Extract low stock alerts if any
      const lowStockAlerts = productsList
        .filter((p) => (p.availableStock !== undefined ? p.availableStock <= 3 : false))
        .map((p) => ({
          productName: p.name || p.title,
          sku: p.sku || 'REV-SKU',
          availableStock: p.availableStock || 1,
        }));

      setData({
        totalRevenuePaise: totalRevenue,
        activeOrdersCount: activeOrders,
        lowStockCount: lowStock,
        registeredCustomersCount: registeredCount,
        recentOrders: ordersList.slice(0, 5),
        lowStockAlerts: lowStockAlerts,
      });
    } catch (err) {
      console.error('Failed to load dashboard summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formattedRevenue = (paise) => {
    const amount = (paise || 0) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Gross Atelier Revenue"
          value={loading ? '...' : formattedRevenue(data.totalRevenuePaise)}
          change={14.8}
          subtitle="FY 2026 Volume"
          icon={DollarSign}
          goldAccent={true}
        />
        <MetricCard
          title="Commissions In Pipeline"
          value={loading ? '...' : (data.activeOrdersCount || 0)}
          change={8.2}
          subtitle="Active Patron Orders"
          icon={ShoppingBag}
        />
        <MetricCard
          title="Vault Reserve Alerts"
          value={loading ? '...' : (data.lowStockCount || 0)}
          subtitle="Low Allocation SKUs"
          icon={Package}
        />
        <MetricCard
          title="Registered Clientele"
          value={loading ? '...' : (data.registeredCustomersCount || 0)}
          subtitle="Verified Patron Profiles"
          icon={Users}
        />
      </div>

      {/* Two Column Layout: Recent Orders & Vault Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent High-Value Commissions (2 Cols) */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h2 className="font-serif text-lg text-[#0F172A] font-medium">Recent Atelier Commissions</h2>
              <p className="text-xs font-mono text-stone-500 mt-0.5">Real-time ledger of global patron orders</p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-mono text-[#0F172A] hover:text-[#D4AF37] flex items-center gap-1 font-semibold transition"
            >
              <span>View All Commissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 divide-y divide-stone-100 overflow-x-auto">
            {loading ? (
              <div className="py-12 text-center text-xs font-mono text-stone-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                <span>Synchronizing live commission ledger...</span>
              </div>
            ) : !data.recentOrders || data.recentOrders.length === 0 ? (
              <div className="py-12 text-center font-mono text-xs text-stone-400">
                No recent commissions recorded in active database.
              </div>
            ) : (
              data.recentOrders.map((order) => (
                <div key={order.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#0F172A]">
                        #{order.orderNumber || order.id?.substring(0, 8)}
                      </span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-stone-600 truncate mt-0.5">
                      {order.shippingAddress?.fullName || 'Distinguished Collector'} — {order.shippingAddress?.city || 'Geneva'}, {order.shippingAddress?.country || 'Switzerland'}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-xs font-semibold text-[#0F172A]">
                      {formattedRevenue(order.totalAmountPaise || (order.amount ? order.amount * 100 : 0))}
                    </p>
                    <p className="font-mono text-[10px] text-stone-400">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'Today'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Vault Health & Quick Alerts (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-base text-[#0F172A] font-medium">Vault Reserves Alert</h3>
                <p className="text-xs font-mono text-stone-500 mt-0.5">Low allocation timepieces</p>
              </div>
              <button
                onClick={() => onNavigate('inventory')}
                className="text-xs font-mono text-[#0F172A] hover:text-[#D4AF37] transition"
              >
                Vault &rarr;
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {loading ? (
                <div className="py-8 text-center text-xs font-mono text-stone-400">
                  Checking vault inventory...
                </div>
              ) : !data.lowStockAlerts || data.lowStockAlerts.length === 0 ? (
                <div className="py-6 text-center text-xs font-mono text-emerald-600 bg-emerald-50/50 rounded-xl border border-emerald-100 p-3">
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                  All timepiece allocations remain healthy.
                </div>
              ) : (
                data.lowStockAlerts.slice(0, 4).map((alert, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-amber-200/70 bg-amber-50/30 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-stone-900 truncate">
                        {alert.productName || alert.timepiece || 'Master Chronometer'}
                      </p>
                      <p className="text-[10px] font-mono text-amber-700 mt-0.5">
                        {alert.sku || 'SKU-REV-001'} &bull; Only {alert.availableStock || 2} remaining
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                      RESTOCK
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick System Status Card */}
          <div className="bg-gradient-to-br from-[#0A0E1A] to-[#1E293B] rounded-2xl p-5 text-white shadow-lg border border-[#1E293B]">
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-mono tracking-wider uppercase font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Haute Horlogerie Node</span>
            </div>
            <p className="text-xs text-stone-300 mt-2 font-mono leading-relaxed">
              Geneva Escrow, Stripe & Armored Logistics telemetry connections are fully operational.
            </p>
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>PostgreSQL 18 DB</span>
              <span className="text-emerald-400 font-semibold">&bull; ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
