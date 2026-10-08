import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminCmsService } from '../../../services/admin/adminServices';
import { FileText, Plus, Trash2, Edit3, Eye, Sparkles, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';

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
      const list = data?.content || (Array.isArray(data) ? data : []);
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
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: '#0F172A', margin: 0 }}>{val}</p>
          <p style={{ fontSize: 11, color: '#64748B', margin: '2px 0 0 0' }}>/{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'readingTimeMinutes',
      label: 'Reading Depth',
      render: (val) => <span style={{ fontSize: 12, color: '#475569' }}>{val || 4} min read</span>,
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
        <span style={{ fontSize: 12, color: '#64748B' }}>
          {val ? new Date(val).toLocaleDateString('en-GB') : 'Autumn 2026'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Editorial Controls',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={() => handleOpenModal(row)}
            style={{
              padding: 6,
              borderRadius: 8,
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Edit Chapter"
          >
            <Edit3 style={{ width: 14, height: 14, color: '#2563EB' }} />
          </button>
          <button
            onClick={() => handleDeleteStory(row.id)}
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
            title="Delete Chapter"
          >
            <Trash2 style={{ width: 14, height: 14 }} />
          </button>
        </div>
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
        data={stories}
        loading={loading}
        searchPlaceholder="Search stories by title, slug, or content..."
        emptyMessage="No editorial articles found in CMS."
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="admin-btn-primary"
            style={{
              backgroundColor: '#060B14',
              border: '1px solid #1E293B',
            }}
          >
            <Plus style={{ width: 14, height: 14, color: '#D4AF37' }} />
            <span>Publish New Chapter</span>
          </button>
        }
      />

      {/* Story Editor Modal */}
      <AdminModal
        isOpen={!!storyModal}
        onClose={() => setStoryModal(null)}
        subtitle="EDITORIAL CHAPTER COMPOSER"
        title={storyModal?.isNew ? 'Create New Story' : 'Edit Story Chapter'}
        maxWidth="max-w-2xl"
      >
        {storyModal && (
          <form onSubmit={handleSaveStory} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Story Chapter Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chapter IV: The Metallurgy of Rose Gold"
                className="admin-form-input"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. metallurgy-of-rose-gold"
                  className="admin-form-input"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Publication State
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="admin-form-select"
                >
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="DRAFT">DRAFT</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Executive Summary / Standfirst
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={2}
                placeholder="A concise philosophical introduction..."
                className="admin-form-textarea"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                Article Body (Markdown Supported) *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={7}
                placeholder="Write the complete horological story..."
                className="admin-form-textarea"
                required
              />
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                onClick={() => setStoryModal(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={actionLoading}
                className="admin-btn-primary"
              >
                {actionLoading ? 'Saving...' : 'Publish Article'}
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
