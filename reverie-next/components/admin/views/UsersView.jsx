import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminUserService } from '../../../services/admin/adminServices';
import { Users, Shield, UserCheck, UserX, Key, Plus } from 'lucide-react';

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminUserService.getUsers('', 'ALL', 0, 50);
      const list = data.content || (Array.isArray(data) ? data : []);
      setUsers(list);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setActionLoading(true);
    try {
      await adminUserService.updateRole(userId, newRole);
      setNotice({ type: 'success', message: `Staff role updated to ${newRole}` });
      await fetchUsers();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to update role' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleToggleStatus = async (userId, currentActive) => {
    setActionLoading(true);
    try {
      await adminUserService.toggleStatus(userId, !currentActive);
      setNotice({ type: 'success', message: `Account ${!currentActive ? 'activated' : 'suspended'}` });
      await fetchUsers();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to toggle status' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'email',
      label: 'Staff / Patron Principal',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-mono text-xs font-semibold text-stone-900">{val}</p>
          <p className="text-xs text-stone-500 font-serif mt-0.5">{row.fullName || row.name || 'Member of Atelier'}</p>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'RBAC Authorization Role',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'active',
      label: 'Security Status',
      render: (val) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
          val !== false ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {val !== false ? 'ACTIVE' : 'SUSPENDED'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Registered Date',
      render: (val) => (
        <span className="font-mono text-xs text-stone-500">
          {val ? new Date(val).toLocaleDateString('en-GB') : '2026-01-01'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'RBAC Governance',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <select
            value={row.role || 'CLIENT'}
            onChange={(e) => handleRoleChange(row.id, e.target.value)}
            disabled={actionLoading}
            className="px-2 py-1 text-xs font-mono bg-white border border-stone-200 rounded-lg focus:outline-none text-stone-800"
          >
            <option value="CLIENT">CLIENT</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>

          <button
            onClick={() => handleToggleStatus(row.id, row.active !== false)}
            disabled={actionLoading}
            className={`p-1.5 rounded-lg border text-xs font-mono transition ${
              row.active !== false
                ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
            title={row.active !== false ? 'Suspend Access' : 'Restore Access'}
          >
            {row.active !== false ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-stone-200">
        <div>
          <h2 className="font-serif text-lg text-[#0F172A] font-medium">Staff & Role-Based Access Control (RBAC)</h2>
          <p className="text-xs font-mono text-stone-500 mt-0.5">
            Manage administrative privileges, atelier curators & client account security
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-stone-500">{users.length} Total Principals</span>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        searchPlaceholder="Search staff by email, name or role..."
        emptyMessage="No staff or user accounts found."
      />
    </div>
  );
}
