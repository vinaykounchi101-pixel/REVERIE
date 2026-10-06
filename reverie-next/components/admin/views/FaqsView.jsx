import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import { adminCmsService } from '../../../services/admin/adminServices';
import { HelpCircle, Plus, Trash2, Edit3, CheckCircle } from 'lucide-react';

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
          <p className="font-medium text-stone-900 text-xs">{val}</p>
          <p className="text-xs text-stone-500 italic max-w-lg truncate mt-0.5">{row.answer}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Knowledge Domain',
      sortable: true,
      render: (val) => (
        <span className="font-mono text-xs text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
          {val || 'General'}
        </span>
      ),
    },
    {
      key: 'displayOrder',
      label: 'Sort Order',
      sortable: true,
      render: (val) => <span className="font-mono text-xs text-stone-500">#{val || 1}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => handleDeleteFaq(row.id)}
          className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition"
          title="Delete FAQ"
        >
          <Trash2 className="w-3.5 h-3.5" />
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-stone-200">
        <div>
          <h2 className="font-serif text-lg text-[#0F172A] font-medium">Atelier Knowledge Base & FAQs</h2>
          <p className="text-xs font-mono text-stone-500 mt-0.5">
            Collector documentation, escrow terms, provenance certificates & warranty guides
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#0F172A] text-white hover:bg-black text-xs font-mono font-medium flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Add Knowledge Entry</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={faqs}
        loading={loading}
        searchPlaceholder="Search knowledge base questions..."
        emptyMessage="No FAQ entries documented."
      />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveFaq} className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Knowledge Base Entry
                </span>
                <h3 className="font-serif text-xl text-[#0F172A] font-medium mt-0.5">
                  Publish Question & Protocol
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-stone-600 mb-1">Inquiry / Question Title</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. How does REVERIE verify timepiece authenticity?"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">Knowledge Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  >
                    <option value="Acquisitions & Ordering">Acquisitions & Ordering</option>
                    <option value="Armored Transit & Delivery">Armored Transit & Delivery</option>
                    <option value="Escrow & Payment Rails">Escrow & Payment Rails</option>
                    <option value="Atelier Care & Servicing">Atelier Care & Servicing</option>
                    <option value="Provenance & Blockchain">Provenance & Blockchain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Display Priority Order</label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Authoritative Answer / Protocol</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                  placeholder="Provide precise horological explanation..."
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  required
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-600 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition disabled:opacity-50"
              >
                {actionLoading ? 'Saving...' : 'Publish Entry'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
