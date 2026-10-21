import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Plus,
  RefreshCw,
  ShieldCheck,
  Calendar,
  Tag,
  Users,
  Eye,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';
import AdminModal from '../AdminModal';
import { adminEmailAutomationService } from '../../../services/admin/adminServices';

export default function EmailAutomationView() {
  const [activeTab, setActiveTab] = useState('campaigns'); // 'campaigns' | 'settings'

  // Settings State
  const [settings, setSettings] = useState({
    globalEnabled: true,
    loginNotificationEnabled: true,
    campaignsEnabled: true,
    activeProvider: 'BREVO',
    n8nWebhookUrl: '',
    webhookSecretConfigured: false,
  });
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsNotice, setSettingsNotice] = useState(null);

  // Campaigns State
  const [campaigns, setCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [triggeringId, setTriggeringId] = useState(null);
  const [actionNotice, setActionNotice] = useState(null);

  // Send Log Modal State
  const [isSendLogOpen, setIsSendLogOpen] = useState(false);
  const [selectedCampaignForLogs, setSelectedCampaignForLogs] = useState(null);
  const [sendLogs, setSendLogs] = useState([]);
  const [loadingSendLogs, setLoadingSendLogs] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    previewText: '',
    discountCode: '',
    discountPercentage: '',
    status: 'DRAFT',
    scheduledStartAt: '',
    scheduledEndAt: '',
    htmlTemplate: '',
  });

  // Fetch Settings
  const fetchSettings = async () => {
    try {
      setLoadingSettings(true);
      const res = await adminEmailAutomationService.getSettings();
      if (res) {
        setSettings({
          globalEnabled: res.globalEnabled ?? true,
          loginNotificationEnabled: res.loginNotificationEnabled ?? true,
          campaignsEnabled: res.campaignsEnabled ?? true,
          activeProvider: res.activeProvider || 'BREVO',
          n8nWebhookUrl: res.n8nWebhookUrl || '',
          webhookSecretConfigured: !!res.webhookSecretConfigured,
        });
      }
    } catch (err) {
      console.error('Failed to load email automation settings:', err);
    } finally {
      setLoadingSettings(false);
    }
  };

  // Fetch Campaigns
  const fetchCampaigns = async () => {
    try {
      setLoadingCampaigns(true);
      const res = await adminEmailAutomationService.getCampaigns(0, 100);
      const list = res?.content || (Array.isArray(res) ? res : []);
      setCampaigns(list);
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchCampaigns();
  }, []);

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsNotice(null);
    try {
      const res = await adminEmailAutomationService.updateSettings({
        isGlobalEnabled: settings.globalEnabled,
        isLoginNotificationEnabled: settings.loginNotificationEnabled,
        isCampaignsEnabled: settings.campaignsEnabled,
        activeProvider: settings.activeProvider,
        n8nWebhookUrl: settings.n8nWebhookUrl,
      });
      setSettingsNotice({ type: 'success', message: 'Email automation settings updated successfully.' });
      if (res) {
        setSettings((prev) => ({
          ...prev,
          globalEnabled: res.globalEnabled ?? prev.globalEnabled,
          loginNotificationEnabled: res.loginNotificationEnabled ?? prev.loginNotificationEnabled,
          campaignsEnabled: res.campaignsEnabled ?? prev.campaignsEnabled,
          activeProvider: res.activeProvider || prev.activeProvider,
          n8nWebhookUrl: res.n8nWebhookUrl ?? prev.n8nWebhookUrl,
          webhookSecretConfigured: !!res.webhookSecretConfigured,
        }));
      }
    } catch (err) {
      setSettingsNotice({ type: 'error', message: err.message || 'Failed to save settings.' });
    } finally {
      setSavingSettings(false);
      setTimeout(() => setSettingsNotice(null), 4000);
    }
  };

  // Trigger Campaign Run
  const handleTriggerCampaign = async (campaignId) => {
    setTriggeringId(campaignId);
    setActionNotice(null);
    try {
      const res = await adminEmailAutomationService.triggerCampaign(campaignId);
      setActionNotice({
        type: 'success',
        message: `Campaign delivery run initiated. Total sent: ${res?.totalSent || 0}, targeted: ${res?.totalTargeted || 0}.`,
      });
      fetchCampaigns();
    } catch (err) {
      setActionNotice({ type: 'error', message: err.message || 'Failed to trigger campaign execution.' });
    } finally {
      setTriggeringId(null);
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  // View Send Logs
  const handleViewSendLogs = async (campaign) => {
    setSelectedCampaignForLogs(campaign);
    setIsSendLogOpen(true);
    setLoadingSendLogs(true);
    try {
      const res = await adminEmailAutomationService.getCampaignSends(campaign.id, 0, 50);
      setSendLogs(res?.content || (Array.isArray(res) ? res : []));
    } catch (err) {
      console.error('Failed to load send logs:', err);
    } finally {
      setLoadingSendLogs(false);
    }
  };

  // Open Create / Edit Modal
  const handleOpenModal = (campaign = null) => {
    if (campaign) {
      setEditingCampaign(campaign);
      setFormData({
        title: campaign.title || '',
        subject: campaign.subject || '',
        previewText: campaign.previewText || '',
        discountCode: campaign.discountCode || '',
        discountPercentage: campaign.discountPercentage || '',
        status: campaign.status || 'DRAFT',
        scheduledStartAt: campaign.scheduledStartAt ? campaign.scheduledStartAt.substring(0, 16) : '',
        scheduledEndAt: campaign.scheduledEndAt ? campaign.scheduledEndAt.substring(0, 16) : '',
        htmlTemplate: campaign.htmlTemplate || '',
      });
    } else {
      setEditingCampaign(null);
      setFormData({
        title: '',
        subject: '',
        previewText: '',
        discountCode: 'HOROLOGY10',
        discountPercentage: 10,
        status: 'DRAFT',
        scheduledStartAt: '',
        scheduledEndAt: '',
        htmlTemplate: `<div style="background-color:#0b0c10;color:#e2e4e9;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
  <div style="max-width:580px;margin:0 auto;background:#121318;border:1px solid #232530;border-radius:8px;padding:36px;text-align:center;">
    <div style="color:#c5a059;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">EXCLUSIVE INVITATION</div>
    <h1 style="color:#ffffff;font-size:26px;font-weight:300;letter-spacing:0.3em;margin:12px 0;">R E V E R I E</h1>
    <p style="font-size:14px;color:#a1a5b3;line-height:1.6;margin:16px 0;">We invite you to discover our seasonal collection of handcrafted haute horlogerie timepieces.</p>
    <div style="background:#181920;border:1px solid #2b2e3b;border-radius:6px;padding:16px;margin:24px 0;">
      <span style="font-size:11px;color:#888d9a;text-transform:uppercase;letter-spacing:0.15em;">Collector Privilege Code</span>
      <div style="font-size:20px;font-weight:700;color:#d4af37;letter-spacing:0.2em;margin-top:4px;">HOROLOGY10</div>
    </div>
  </div>
</div>`,
      });
    }
    setIsModalOpen(true);
  };

  // Submit Modal
  const handleSaveCampaign = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        subject: formData.subject,
        previewText: formData.previewText || null,
        discountCode: formData.discountCode || null,
        discountPercentage: formData.discountPercentage ? parseInt(formData.discountPercentage, 10) : null,
        status: formData.status,
        scheduledStartAt: formData.scheduledStartAt ? new Date(formData.scheduledStartAt).toISOString() : null,
        scheduledEndAt: formData.scheduledEndAt ? new Date(formData.scheduledEndAt).toISOString() : null,
        htmlTemplate: formData.htmlTemplate,
      };

      if (editingCampaign) {
        await adminEmailAutomationService.updateCampaign(editingCampaign.id, payload);
      } else {
        await adminEmailAutomationService.createCampaign(payload);
      }

      setIsModalOpen(false);
      fetchCampaigns();
    } catch (err) {
      alert(err.message || 'Failed to save campaign');
    }
  };

  // Table Columns for Campaigns
  const campaignColumns = [
    {
      key: 'title',
      label: 'Campaign & Subject',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-medium text-stone-900 text-xs">{val}</p>
          <p className="text-[11px] text-stone-500 mt-0.5 truncate max-w-xs">{row.subject}</p>
        </div>
      ),
    },
    {
      key: 'discountCode',
      label: 'Offer / Code',
      render: (val, row) =>
        val ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200">
            {val} ({row.discountPercentage || 0}% OFF)
          </span>
        ) : (
          <span className="text-stone-400 text-xs">—</span>
        ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'delivery',
      label: 'Recipients & Sends',
      render: (_, row) => (
        <div className="text-xs font-mono">
          <span className="text-emerald-700 font-semibold">{row.totalSent} sent</span>
          <span className="text-stone-400"> / {row.totalTargeted} targeted</span>
          {row.totalFailed > 0 && <span className="text-red-500 ml-1.5 font-bold">({row.totalFailed} failed)</span>}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => handleTriggerCampaign(row.id)}
            disabled={triggeringId === row.id || row.status === 'COMPLETED' || row.status === 'PAUSED'}
            className="px-2.5 py-1 rounded bg-[#0F172A] text-white hover:bg-black text-[11px] font-mono font-medium flex items-center gap-1 disabled:opacity-40"
          >
            {triggeringId === row.id ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <Play className="w-3 h-3 fill-current" />
            )}
            <span>Run Batch</span>
          </button>
          <button
            onClick={() => handleViewSendLogs(row)}
            className="px-2 py-1 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-[11px] font-mono"
          >
            Send Logs
          </button>
          <button
            onClick={() => handleOpenModal(row)}
            className="px-2 py-1 rounded border border-stone-200 text-stone-700 hover:bg-stone-50 text-[11px] font-mono"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Navigation Tabs */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <h2 className="font-serif text-2xl text-[#0F172A] font-medium tracking-tight">
            Email Automation & Campaigns
          </h2>
          <p className="text-xs font-mono text-stone-500 mt-1">
            Production-grade multi-provider dispatcher (Brevo / n8n), login security notifications, and seasonal promotions.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeTab === 'campaigns'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Promotional Campaigns
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeTab === 'settings'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Provider & Settings
          </button>
        </div>
      </div>

      {actionNotice && (
        <div
          className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 border ${
            actionNotice.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {actionNotice.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          <span>{actionNotice.message}</span>
        </div>
      )}

      {/* TAB 1: CAMPAIGNS */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-stone-500">Active Campaigns: <strong>{campaigns.length}</strong></span>
              <span className="text-emerald-700">
                Total Delivered: <strong>{campaigns.reduce((acc, c) => acc + (c.totalSent || 0), 0)}</strong>
              </span>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 rounded-xl bg-[#0F172A] text-white hover:bg-black text-xs font-mono font-medium flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>

          {/* Campaigns Table */}
          <DataTable
            columns={campaignColumns}
            data={campaigns}
            loading={loadingCampaigns}
            searchable={true}
            searchPlaceholder="Search campaigns by title or subject..."
            emptyMessage="No promotional campaigns found. Create your first campaign above."
          />
        </div>
      )}

      {/* TAB 2: SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          {settingsNotice && (
            <div
              className={`p-4 rounded-xl text-xs font-mono flex items-center gap-2 border ${
                settingsNotice.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{settingsNotice.message}</span>
            </div>
          )}

          {/* Provider Selection Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-lg text-[#0F172A] font-medium">Active Email Dispatch Provider</h3>
                <p className="text-xs font-mono text-stone-500 mt-0.5">
                  Choose between direct Brevo API relay or n8n Cloud intelligent orchestration.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-stone-100 text-stone-800 border border-stone-200">
                ACTIVE: {settings.activeProvider}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A: BREVO */}
              <div
                onClick={() => setSettings({ ...settings, activeProvider: 'BREVO' })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  settings.activeProvider === 'BREVO'
                    ? 'border-[#0F172A] bg-stone-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#0F172A]" />
                    <span className="font-mono text-xs font-semibold text-stone-900">BREVO (Sendinblue)</span>
                  </div>
                  {settings.activeProvider === 'BREVO' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-2">
                  Direct European transactional SMTP/REST relay with zero intermediate hops. Ideal for mission-critical notifications.
                </p>
              </div>

              {/* Option B: N8N */}
              <div
                onClick={() => setSettings({ ...settings, activeProvider: 'N8N' })}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  settings.activeProvider === 'N8N'
                    ? 'border-[#0F172A] bg-stone-50'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span className="font-mono text-xs font-semibold text-stone-900">n8n Cloud Automation Rail</span>
                  </div>
                  {settings.activeProvider === 'N8N' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <p className="text-xs text-stone-600 mt-2">
                  Multi-node orchestration workflow supporting intelligent branch conditions, Supabase queries, and automated retries.
                </p>
              </div>
            </div>

            {/* n8n Configuration inputs */}
            {settings.activeProvider === 'N8N' && (
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <label className="block text-xs font-mono font-medium text-stone-700">
                  n8n Webhook Endpoint URL
                </label>
                <input
                  type="text"
                  value={settings.n8nWebhookUrl}
                  onChange={(e) => setSettings({ ...settings, n8nWebhookUrl: e.target.value })}
                  placeholder="https://your-instance.app.n8n.cloud/webhook/reverie-login-notification"
                  className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
                />

                <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
                  <ShieldCheck
                    className={`w-4 h-4 ${
                      settings.webhookSecretConfigured ? 'text-emerald-600' : 'text-amber-500'
                    }`}
                  />
                  <span>
                    Webhook Security Header:{' '}
                    <strong>
                      {settings.webhookSecretConfigured
                        ? 'Configured in backend environment (N8N_WEBHOOK_SECRET)'
                        : 'No secret configured in environment (Falling back to unauthenticated header)'}
                    </strong>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Master Switches Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-serif text-lg text-[#0F172A] font-medium">Automation Feature Flags</h3>
            <p className="text-xs font-mono text-stone-500">
              Selectively enable or halt automated dispatches without downtime.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 hover:bg-[#FAF9F6] cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 block">Global Email Automation Master Switch</span>
                  <span className="text-stone-500 text-[11px]">When disabled, halts all background email processing.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.globalEnabled}
                  onChange={(e) => setSettings({ ...settings, globalEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#0F172A]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 hover:bg-[#FAF9F6] cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 block">Customer Login Security Notifications</span>
                  <span className="text-stone-500 text-[11px]">
                    Non-blocking alerts dispatched strictly on successful customer password logins.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.loginNotificationEnabled}
                  onChange={(e) => setSettings({ ...settings, loginNotificationEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#0F172A]"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 hover:bg-[#FAF9F6] cursor-pointer">
                <div>
                  <span className="font-semibold text-stone-900 block">Seasonal Promotional Campaigns</span>
                  <span className="text-stone-500 text-[11px]">
                    Allows scheduled and manual batch campaign deliveries to opt-in patrons.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.campaignsEnabled}
                  onChange={(e) => setSettings({ ...settings, campaignsEnabled: e.target.checked })}
                  className="w-4 h-4 accent-[#0F172A]"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={savingSettings}
              className="px-6 py-2.5 rounded-xl bg-[#0F172A] text-white hover:bg-black text-xs font-mono font-medium shadow-sm transition disabled:opacity-50"
            >
              {savingSettings ? 'Saving Settings...' : 'Save Settings'}
            </button>
          </div>
        </form>
      )}

      {/* Create / Edit Campaign Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCampaign ? 'Edit Promotional Campaign' : 'Create Seasonal Campaign'}
      >
        <form onSubmit={handleSaveCampaign} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-stone-700 font-medium mb-1">Campaign Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Diwali Grand Horology Exhibition 2026"
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
            />
          </div>

          <div>
            <label className="block text-stone-700 font-medium mb-1">Email Subject Line *</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Exclusive Festive Privileges for REVERIE Collectors"
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Discount Code (Optional)</label>
              <input
                type="text"
                value={formData.discountCode}
                onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                placeholder="e.g. DIWALI15"
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">Discount %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                placeholder="e.g. 15"
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Scheduled Start Time</label>
              <input
                type="datetime-local"
                value={formData.scheduledStartAt}
                onChange={(e) => setFormData({ ...formData, scheduledStartAt: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="SCHEDULED">SCHEDULED</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="PAUSED">PAUSED</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-medium mb-1">Luxury HTML Email Template *</label>
            <textarea
              rows={8}
              required
              value={formData.htmlTemplate}
              onChange={(e) => setFormData({ ...formData, htmlTemplate: e.target.value })}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl font-mono text-[11px] focus:outline-none focus:border-[#0F172A]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0F172A] text-white hover:bg-black font-medium"
            >
              Save Campaign
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Send Logs Modal */}
      <AdminModal
        isOpen={isSendLogOpen}
        onClose={() => setIsSendLogOpen(false)}
        title={`Delivery Ledger: ${selectedCampaignForLogs?.title || 'Campaign'}`}
      >
        <div className="space-y-4">
          <p className="text-xs font-mono text-stone-500">
            Per-customer idempotency send records for this campaign.
          </p>

          {loadingSendLogs ? (
            <div className="py-8 text-center text-xs font-mono text-stone-400">Loading ledger logs...</div>
          ) : sendLogs.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-stone-400">
              No delivery dispatches recorded yet for this campaign.
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto divide-y divide-stone-100 border border-stone-200 rounded-xl">
              {sendLogs.map((log) => (
                <div key={log.id} className="p-3 text-xs font-mono flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-stone-800">{log.customerEmail}</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      Via {log.provider} &bull; {log.sentAt ? new Date(log.sentAt).toLocaleString() : 'Pending'}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      log.status === 'SENT'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : log.status === 'FAILED'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-stone-50 text-stone-600'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminModal>
    </div>
  );
}
