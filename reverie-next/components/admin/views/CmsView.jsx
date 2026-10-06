import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import { adminCmsService } from '../../../services/admin/adminServices';
import { FileText, Plus, Trash2, Edit3, Eye, Sparkles, BookOpen } from 'lucide-react';

export default function CmsView() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storyModal, setStoryModal] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('PUBLISHED');
  const [actionLoading, setActionLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const data = await adminCmsService.getStories(0, 50);
      const list = data.content || (Array.isArray(data) ? data : []);
      setStories(list);
    } catch (err) {
      console.error('Failed to load stories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleOpenModal = (story = null) => {
    if (story) {
      setStoryModal(story);
      setTitle(story.title || '');
      setSlug(story.slug || '');
      setSummary(story.summary || '');
      setContent(story.content || '');
      setStatus(story.status || 'PUBLISHED');
    } else {
      setStoryModal({ isNew: true });
      setTitle('');
      setSlug('');
      setSummary('');
      setContent('');
      setStatus('PUBLISHED');
    }
  };

  const handleSaveStory = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const payload = {
        id: storyModal.id,
        title,
        slug: generatedSlug,
        summary,
        content,
        status,
        author: 'Atelier Editorial Board',
        readingTimeMinutes: Math.max(2, Math.ceil(content.split(' ').length / 150)),
      };
      await adminCmsService.saveStory(payload);
      setNotice({ type: 'success', message: `Editorial article "${title}" saved successfully.` });
      setStoryModal(null);
      await fetchStories();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to save story' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const handleDeleteStory = async (id) => {
    if (!window.confirm('Delete this editorial chapter from the public knowledge archive?')) return;
    setActionLoading(true);
    try {
      await adminCmsService.deleteStory(id);
      setNotice({ type: 'success', message: 'Story deleted from archive.' });
      await fetchStories();
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to delete story' });
    } finally {
      setActionLoading(false);
      setTimeout(() => setNotice(null), 4000);
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Editorial Title & Chapter',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-serif font-medium text-stone-900 text-sm">{val}</p>
          <p className="font-mono text-[10px] text-stone-400">/{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'readingTimeMinutes',
      label: 'Reading Depth',
      render: (val) => <span className="font-mono text-xs text-stone-600">{val || 4} min read</span>,
    },
    {
      key: 'status',
      label: 'Publication State',
      sortable: true,
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'createdAt',
      label: 'Archived Date',
      render: (val) => (
        <span className="font-mono text-xs text-stone-500">
          {val ? new Date(val).toLocaleDateString('en-GB') : 'Autumn 2026'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Editorial Controls',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenModal(row)}
            className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition"
            title="Edit Chapter"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDeleteStory(row.id)}
            className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition"
            title="Delete Chapter"
          >
            <Trash2 className="w-3.5 h-3.5" />
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

      {/* Header and New Story CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-stone-200">
        <div>
          <h2 className="font-serif text-lg text-[#0F172A] font-medium">Haute Horlogerie Stories & CMS</h2>
          <p className="text-xs font-mono text-stone-500 mt-0.5">
            Curate brand philosophy, metallurgical journals & watchmaking heritage
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-3.5 py-2 rounded-xl bg-[#0F172A] text-white hover:bg-black text-xs font-mono font-medium flex items-center gap-2 shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Publish New Chapter</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={stories}
        loading={loading}
        searchPlaceholder="Search stories by title, slug, or content..."
        emptyMessage="No editorial articles found in CMS."
      />

      {/* Story Editor Modal */}
      {storyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveStory} className="bg-white rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                  Editorial Chapter Composer
                </span>
                <h3 className="font-serif text-2xl text-[#0F172A] font-medium mt-0.5">
                  {storyModal.isNew ? 'Create New Story' : 'Edit Story Chapter'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStoryModal(null)}
                className="text-stone-400 hover:text-stone-700 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-stone-600 mb-1">Story Chapter Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chapter IV: The Metallurgy of Rose Gold"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. metallurgy-of-rose-gold"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">Publication State</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  >
                    <option value="PUBLISHED">PUBLISHED</option>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Executive Summary / Standfirst</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={2}
                  placeholder="A concise philosophical introduction..."
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Article Body (Markdown Supported)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  placeholder="Write the complete horological story..."
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                  required
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setStoryModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-stone-600 hover:bg-stone-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl text-xs font-mono bg-[#0F172A] text-white hover:bg-black transition disabled:opacity-50"
              >
                {actionLoading ? 'Saving...' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
