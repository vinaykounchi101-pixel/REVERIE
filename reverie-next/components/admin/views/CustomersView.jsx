import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminUserService, adminOrderService } from '../../../services/admin/adminServices';
import { Users, Mail, Phone, MapPin, ShieldCheck, Star } from 'lucide-react';

export default function CustomersView() {
  const [patrons, setPatrons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatrons = async () => {
    setLoading(true);
    try {
      const [usersData, ordersData] = await Promise.allSettled([
        adminUserService.getUsers('', 'ALL', 0, 100),
        adminOrderService.getOrders(null, 0, 100),
      ]);

      const usersRes = usersData.status === 'fulfilled' ? usersData.value : null;
      const ordersRes = ordersData.status === 'fulfilled' ? ordersData.value : null;

      const userList = usersRes?.content || (Array.isArray(usersRes) ? usersRes : []);
      const orderList = ordersRes?.content || (Array.isArray(ordersRes) ? ordersRes : []);

      const enriched = userList.map((u) => {
        const userOrders = orderList.filter(
          (o) => o.userId === u.id || o.userEmail?.toLowerCase() === u.email?.toLowerCase()
        );
        const totalSpend = userOrders.reduce(
          (sum, o) => sum + (o.totalAmountPaise || (o.amount ? o.amount * 100 : 0)),
          0
        );
        const count = userOrders.length;
        
        let tier = 'Registered Patron';
        if (totalSpend >= 50000000) {
          tier = 'Geneva VIP Circle';
        } else if (totalSpend > 0 || count > 0) {
          tier = 'Private Collector';
        }

        return {
          id: u.id,
          fullName: u.fullName || u.name || (u.email ? u.email.split('@')[0] : 'Distinguished Patron'),
          email: u.email,
          phone: u.phone || u.shippingAddress?.phone || '—',
          tier,
          totalSpendPaise: totalSpend,
          commissionsCount: count,
          status: u.active !== false ? 'CONFIRMED' : 'CANCELLED',
          joinedDate: u.createdAt || new Date().toISOString(),
        };
      });

      setPatrons(enriched);
    } catch (err) {
      console.error('Failed to load collectors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatrons();
  }, []);

  const columns = [
    {
      key: 'fullName',
      label: 'Collector Dossier',
      sortable: true,
      render: (val, row) => (
        <div>
          <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
            {val}
            {row.tier?.includes('VIP') && (
              <Star style={{ width: 13, height: 13, color: '#D4AF37', fill: '#D4AF37' }} />
            )}
          </p>
          <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0 0' }}>{row.email}</p>
        </div>
      ),
    },
    {
      key: 'tier',
      label: 'Patronage Tier',
      render: (val) => (
        <span style={{ fontSize: 11, fontWeight: 600, color: '#0F172A', backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: 6, border: '1px solid #E2E8F0' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'commissionsCount',
      label: 'Commissions',
      sortable: true,
      render: (val) => <span style={{ fontSize: 12, color: '#334155' }}>{val} timepieces</span>,
    },
    {
      key: 'totalSpendPaise',
      label: 'Lifetime Value',
      sortable: true,
      render: (val) => {
        const amt = (val || 0) / 100;
        return <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#0F172A' }}>${amt.toLocaleString()}</span>;
      },
    },
    {
      key: 'status',
      label: 'Account Health',
      render: (val) => (
        <StatusBadge
          status={val === 'CONFIRMED' ? 'IN_STOCK' : 'OUT_OF_STOCK'}
          customLabel={val === 'CONFIRMED' ? 'ACTIVE' : 'SUSPENDED'}
        />
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header Card */}
      <div style={{ padding: 20, borderRadius: 16, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#0F172A', fontWeight: 600, margin: 0 }}>
            Collector & Patron Directory
          </h2>
          <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0 0' }}>
            Live accounts, genuine order expenditures & patronage status from PostgreSQL database
          </p>
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#64748B', backgroundColor: '#F8FAFC', padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            {patrons.length} Registered Patrons
          </span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={patrons}
        loading={loading}
        searchPlaceholder="Search collectors by name, email or VIP tier..."
        emptyMessage="No collectors found."
      />
    </div>
  );
}
