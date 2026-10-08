import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import AdminModal from '../AdminModal';
import { adminCmsService } from '../../../services/admin/adminServices';
import { HelpCircle, Plus, Trash2, Edit3, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FaqsView() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('Acquisitions & Ordering');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const data = await adminCmsService.getFaqs();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSaveFaq = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await adminCmsService.createFaq({
        question,
        answer,
        category,
        displayOrder: Number(displayOrder),
      });
      setNotice({ type: 'success', message: 'Knowledge base entry published successfully.' });
      setModalOpen(false);
      setQuestion('');
      setAnswer('');
      await fetchFaqs();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to save FAQ' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Delete this FAQ entry from public documentation?')) return;
    setActionLoading(true);
    try {
      await adminCmsService.deleteFaq(id);
      setNotice({ type: 'success', message: 'FAQ entry removed.' });
      await fetchFaqs();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to delete FAQ' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'question',
      label: 'Inquiry / Question',
      sortable: true,
      render: (val, row) => (
        <div>
          <p style={{ fontWeight: 600, color: '#0F172A', fontSize: 13, margin: 0 }}>{val}</p>
          <p style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic', margin: '4px 0 0 0', maxWidth: 480, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {row.answer}
          </p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Knowledge Domain',
      sortable: true,
      render: (val) => (
        <span style={{ fontSize: 11, fontWeight: 500, color: '#334155', backgroundColor: '#F1F5F9', padding: '3px 8px', borderRadius: 6, border: '1px solid #E2E8F0' }}>
          {val || 'General'}
        </span>
      ),
    },
    {
      key: 'displayOrder',
      label: 'Sort Order',
      sortable: true,
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#64748B' }}>#{val || 1}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => handleDeleteFaq(row.id)}
          style={{
            padding: 6,
            borderRadius: 8,
            border: '1px solid #FECDD3',
            backgroundColor: '#FFF1F2',
            color: '#BE123C',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Delete FAQ"
        >
          <Trash2 style={{ width: 14, height: 14 }} />
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

      <DataTable
        columns={columns}
        data={faqs}
        loading={loading}
        searchPlaceholder="Search knowledge base questions..."
        emptyMessage="No FAQ entries documented."
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="admin-btn-primary"
            style={{
              backgroundColor: '#060B14',
              border: '1px solid #1E293B',
            }}
          >
            <Plus style={{ width: 14, height: 14, color: '#D4AF37' }} />
            <span>Add Knowledge Entry</span>
          </button>
        }
      />

      {/* Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        subtitle="KNOWLEDGE BASE ENTRY"
        title="Publish Question & Protocol"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveFaq} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Inquiry / Question Title *
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How does REVERIE verify timepiece authenticity?"
              className="admin-form-input"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Knowledge Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="admin-form-select"
              >
                <option value="Acquisitions & Ordering">Acquisitions & Ordering</option>
                <option value="Armored Transit & Delivery">Armored Transit & Delivery</option>
                <option value="Escrow & Payment Rails">Escrow & Payment Rails</option>
                <option value="Atelier Care & Servicing">Atelier Care & Servicing</option>
                <option value="Provenance & Blockchain">Provenance & Blockchain</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Priority Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                className="admin-form-input"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
              Authoritative Answer / Protocol *
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={4}
              placeholder="Provide precise horological explanation..."
              className="admin-form-textarea"
              required
            />
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="admin-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="admin-btn-primary"
            >
              {actionLoading ? 'Saving...' : 'Publish Entry'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
