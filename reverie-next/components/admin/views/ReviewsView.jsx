import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminReviewService } from '../../../services/admin/adminServices';
import { Star, CheckCircle, XCircle, ShieldCheck } from 'lucide-react';

export default function ReviewsView() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await adminReviewService.getReviews();
      const list = data?.content || (Array.isArray(data) ? data : []);
      setReviews(list);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleModerate = async (id, status) => {
    setActionLoading(true);
    try {
      await adminReviewService.moderateReview(id, status);
      setNotice({ type: 'success', message: `Review marked as ${status}` });
      await fetchReviews();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to moderate review' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'collectorName',
      label: 'Verified Collector',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-medium text-stone-900 text-xs flex items-center gap-1">
            {val || row.userName || row.userEmail || 'Distinguished Collector'}
            {(row.verifiedPurchase || row.isVerified) && <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />}
          </p>
          <p className="font-mono text-[10px] text-stone-400">{row.timepiece || row.productName || 'REVERIE Chronometer'}</p>
        </div>
      ),
    },
    {
      key: 'rating',
      label: 'Horological Rating',
      sortable: true,
      render: (val) => (
        <div className="flex items-center gap-0.5 text-[#D4AF37]">
          {[...Array(Math.max(1, Math.min(5, val || 5)))].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
          ))}
        </div>
      ),
    },
    {
      key: 'comment',
      label: 'Editorial Feedback',
      render: (val, row) => (
        <div>
          <p className="text-xs font-semibold text-stone-800">{row.title || 'Collector Review'}</p>
          <p className="text-xs text-stone-600 italic max-w-md truncate">{val || row.reviewText || row.body}</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Moderation Status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.status !== 'APPROVED' && (
            <button
              onClick={() => handleModerate(row.id, 'APPROVED')}
              disabled={actionLoading}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-mono font-semibold transition"
            >
              Approve
            </button>
          )}
          {row.status !== 'REJECTED' && (
            <button
              onClick={() => handleModerate(row.id, 'REJECTED')}
              disabled={actionLoading}
              className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-mono font-semibold transition"
            >
              Reject
            </button>
          )}
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

      <DataTable
        columns={columns}
        data={reviews}
        loading={loading}
        searchPlaceholder="Search reviews by patron, timepiece, or sentiment..."
        emptyMessage="No reviews recorded in database."
      />
    </div>
  );
}
