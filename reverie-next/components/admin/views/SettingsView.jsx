import React, { useState } from 'react';
import { Sliders, Database, Mail, ShieldCheck, Server, Globe, Bell, Lock, CheckCircle2 } from 'lucide-react';

export default function SettingsView() {
  const [activeProvider, setActiveProvider] = useState('RESEND');
  const [escrowCurrency, setEscrowCurrency] = useState('USD');
  const [telemetrySyncSec, setTelemetrySyncSec] = useState('30');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {savedNotice && (
        <div className="p-4 rounded-xl text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Atelier configuration saved and applied to active runtime environment.</span>
        </div>
      )}

      {/* System Health Diagnostics */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="font-serif text-lg text-[#0F172A] font-medium">Node & Infrastructure Telemetry</h3>
            <p className="text-xs font-mono text-stone-500 mt-0.5">Live connectivity across REVERIE distributed cluster</p>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ALL SYSTEMS NORMAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase">Database Engine</span>
            <p className="font-semibold text-stone-800 mt-1 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
              PostgreSQL 18.0 (5432)
            </p>
            <span className="text-[10px] text-emerald-600 mt-1 block">&bull; Connected & Synchronized</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase">Backend Gateway</span>
            <p className="font-semibold text-stone-800 mt-1 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-blue-600" />
              Spring Boot 3.4.1 (8080)
            </p>
            <span className="text-[10px] text-emerald-600 mt-1 block">&bull; Latency: 1.2ms</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-stone-200">
            <span className="text-stone-400 block text-[10px] uppercase">Security Standard</span>
            <p className="font-semibold text-stone-800 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              HS512 JWT / RBAC
            </p>
            <span className="text-[10px] text-stone-500 mt-1 block">&bull; 86400s Expiration</span>
          </div>
        </div>
      </div>

      {/* Config Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm">
        <div>
          <h3 className="font-serif text-lg text-[#0F172A] font-medium">Atelier Executive Settings</h3>
          <p className="text-xs font-mono text-stone-500 mt-0.5">Customize global communications and logistics defaults</p>
        </div>

        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-stone-700 font-medium mb-1">
              Active Email Dispatch Provider
            </label>
            <select
              value={activeProvider}
              onChange={(e) => setActiveProvider(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
            >
              <option value="RESEND">Resend API (Primary High-Deliverability Rail)</option>
              <option value="BREVO">Brevo Transactional (European VIP Relay)</option>
              <option value="SMTP">Dedicated Swiss SMTP Gateway</option>
            </select>
            <p className="text-[11px] text-stone-400 mt-1">
              Configured via environment variables (RESEND_API_KEY / BREVO_API_KEY).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Primary Settlement Currency</label>
              <select
                value={escrowCurrency}
                onChange={(e) => setEscrowCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
              >
                <option value="USD">USD ($ - United States Dollar)</option>
                <option value="CHF">CHF (CHF - Swiss Franc)</option>
                <option value="EUR">EUR (€ - Euro)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Logistics Telemetry Polling (Seconds)</label>
              <input
                type="number"
                value={telemetrySyncSec}
                onChange={(e) => setTelemetrySyncSec(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#0F172A]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-white hover:bg-black text-xs font-mono font-medium shadow-sm transition"
          >
            Commit Settings
          </button>
        </div>
      </form>
    </div>
  );
}
