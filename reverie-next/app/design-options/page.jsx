"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Palette, 
  Compass, 
  ChevronRight,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import Button from '../../components/ui/Button';

export default function DesignOptionsPage() {
  const [selectedOption, setSelectedOption] = useState('option-1');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'option-1' | 'option-2' | 'option-3'
  const [lightboxImage, setLightboxImage] = useState(null);

  const designOptions = [
    {
      id: 'option-1',
      title: 'Option 1: Obsidian Horology & Swiss Geneva Gold',
      subtitle: 'Heritage Dark Luxury Atelier & Swiss Vault Command',
      badge: 'Heritage Luxury',
      image: '/designs/option1-obsidian-gold.jpg',
      inspiration: 'Audemars Piguet, Patek Philippe, Vacheron Constantin',
      palette: [
        { name: 'Obsidian Black', hex: '#0B0C10', bg: '#0B0C10', text: '#fff' },
        { name: 'Atelier Charcoal', hex: '#121318', bg: '#121318', text: '#fff' },
        { name: 'Geneva Gold', hex: '#D4AF37', bg: '#D4AF37', text: '#000' },
        { name: 'Champagne Muted', hex: '#C5A059', bg: '#C5A059', text: '#000' },
        { name: 'Swiss Silver', hex: '#E2E4E9', bg: '#E2E4E9', text: '#000' },
      ],
      typography: {
        primary: 'Playfair Display / Cormorant Garamond',
        body: 'Plus Jakarta Sans / Inter',
        mono: 'Courier New / JetBrains Mono'
      },
      boutiqueHighlights: [
        'Cinematic dark glassmorphic watch presentation with 3D gyro perspective',
        'Deep obsidian background with brushed champagne gold micro-accents',
        'Translucent floating spec sheets with blur elevation',
        'Velvet dark checkout receipt with glowing OTP authorization'
      ],
      adminHighlights: [
        'Swiss Private Vault Terminal with dark glass data cards',
        'Live financial telemetry charts with gold area gradients',
        'Real-time inventory reservation ticker and VIP client dossiers'
      ]
    },
    {
      id: 'option-2',
      title: 'Option 2: Atelier Blanc & Royal Navy',
      subtitle: 'Editorial Daylight Luxury & Private Wealth Executive Suite',
      badge: 'Editorial Daylight',
      image: '/designs/option2-atelier-blanc.jpg',
      inspiration: 'Breguet, Glashütte Original, Mediterranean Yacht Salons',
      palette: [
        { name: 'Porcelain Cream', hex: '#FAF9F6', bg: '#FAF9F6', text: '#000' },
        { name: 'Pure Alabaster', hex: '#FFFFFF', bg: '#FFFFFF', text: '#000' },
        { name: 'Royal Navy', hex: '#0A192F', bg: '#0A192F', text: '#fff' },
        { name: 'Sunburst Gold', hex: '#B89758', bg: '#B89758', text: '#000' },
        { name: 'Charcoal Onyx', hex: '#1A1A1A', bg: '#1A1A1A', text: '#fff' },
      ],
      typography: {
        primary: 'Bodoni Moda / Ogg Editorial Serif',
        body: 'Montserrat / Sauterelle Sans',
        mono: 'Space Mono'
      },
      boutiqueHighlights: [
        'Bright porcelain editorial lookbook with expansive negative space',
        'Timepieces displayed on sculptured circular off-white pedestals',
        'Deep royal navy typography with warm sunburst gold foil highlights',
        'Minimalist floating header with slide-out silk navigation drawer'
      ],
      adminHighlights: [
        'Dual-mode Swiss Private Wealth banking interface',
        'Clean white modular cards with deep navy navigation sidebar',
        'Exportable certified PDF/CSV audit ledgers & currency exchange matrix'
      ]
    },
    {
      id: 'option-3',
      title: 'Option 3: Titanium Cyber-Chronometer',
      subtitle: 'Avant-Garde Open-Worked Calibers & Mission Control Hub',
      badge: 'Avant-Garde High-Tech',
      image: '/designs/option3-titanium-cyber.jpg',
      inspiration: 'Richard Mille, MB&F, Urwerk, Roger Dubuis',
      palette: [
        { name: 'Matte Titanium', hex: '#1E2024', bg: '#1E2024', text: '#fff' },
        { name: 'Carbon Fiber', hex: '#111215', bg: '#111215', text: '#fff' },
        { name: 'LumiNova Cyan', hex: '#38BDF8', bg: '#38BDF8', text: '#000' },
        { name: 'Electric Amber', hex: '#F59E0B', bg: '#F59E0B', text: '#000' },
        { name: 'Crisp White', hex: '#FFFFFF', bg: '#FFFFFF', text: '#000' },
      ],
      typography: {
        primary: 'Space Grotesk / Syne (Futuristic Geometry)',
        body: 'Plus Jakarta Sans',
        mono: 'IBM Plex Mono (Chronometer Grade)'
      },
      boutiqueHighlights: [
        'Open-worked skeleton tourbillon movements with scroll parallax depth',
        'Luminescent Super-LumiNova neon cyan & electric amber telemetry HUDs',
        'High-tech carbon weave card textures with wireframe mechanical overlays',
        'Chronometer frequency meters (28,800 vph) and power reserve gauges'
      ],
      adminHighlights: [
        'Mission Control Telemetry Operations Center',
        'Real-time radar feeds, active server load meters, and live event streams',
        'Dynamic interactive inventory heatmap with vault security status'
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#07080a', color: '#f3f4f6', fontFamily: 'var(--font-ui, sans-serif)', padding: '60px 24px 100px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)', borderRadius: '999px', color: '#d4af37', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Sparkles size={14} /> Haute Horlogerie Visual Design Systems
          </div>
          <h1 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '42px', fontWeight: 300, letterSpacing: '0.05em', color: '#ffffff', margin: '0 0 16px 0' }}>
            Choose the Aesthetic for REVERIE
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '15px', color: '#9ca3af', lineHeight: 1.6 }}>
            Review the 3 bespoke design directions created for the customer-facing boutique and executive operations admin. Click any design to view in high resolution.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 20px',
                borderRadius: '6px',
                border: activeTab === 'all' ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                background: activeTab === 'all' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                color: activeTab === 'all' ? '#d4af37' : '#9ca3af',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              All 3 Directions
            </button>
            {designOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveTab(opt.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  border: activeTab === opt.id ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === opt.id ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255,255,255,0.03)',
                  color: activeTab === opt.id ? '#d4af37' : '#9ca3af',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {opt.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Design Cards Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {designOptions
            .filter((opt) => activeTab === 'all' || activeTab === opt.id)
            .map((opt, index) => {
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  style={{
                    background: '#0d0f14',
                    border: isSelected ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: isSelected ? '0 0 30px rgba(212, 175, 55, 0.15)' : '0 20px 40px rgba(0,0,0,0.5)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Top Bar */}
                  <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#111319' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#d4af37', background: 'rgba(212, 175, 55, 0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                          {opt.badge}
                        </span>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}>Inspiration: {opt.inspiration}</span>
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '24px', fontWeight: 400, color: '#ffffff', margin: 0 }}>
                        {opt.title}
                      </h2>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={() => setLightboxImage(opt.image)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 18px',
                          borderRadius: '6px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#e5e7eb',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        <Maximize2 size={14} /> Full View
                      </button>
                      <button
                        onClick={() => setSelectedOption(opt.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '10px 22px',
                          borderRadius: '6px',
                          background: isSelected ? '#d4af37' : 'transparent',
                          border: '1px solid #d4af37',
                          color: isSelected ? '#000000' : '#d4af37',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isSelected ? <CheckCircle2 size={16} /> : null}
                        {isSelected ? 'Selected Direction' : 'Select This Option'}
                      </button>
                    </div>
                  </div>

                  {/* High-Resolution Mockup Visual Preview */}
                  <div 
                    style={{ position: 'relative', width: '100%', background: '#000', cursor: 'pointer' }}
                    onClick={() => setLightboxImage(opt.image)}
                  >
                    <img 
                      src={opt.image} 
                      alt={opt.title} 
                      style={{ width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}>
                      <Eye size={14} /> Click to expand high-res mockup
                    </div>
                  </div>

                  {/* Detailed Specs Breakdown */}
                  <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    
                    {/* Color Swatches */}
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Palette size={15} /> Color Architecture
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {opt.palette.map((color, cIdx) => (
                          <div key={cIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: color.bg, border: '1px solid rgba(255,255,255,0.2)' }} />
                              <span style={{ fontSize: '13px', color: '#d1d5db' }}>{color.name}</span>
                            </div>
                            <code style={{ fontSize: '12px', color: '#9ca3af' }}>{color.hex}</code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typography */}
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Compass size={15} /> Typography
                      </h4>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Headings &amp; Horology Titles</div>
                          <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>{opt.typography.primary}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Interface &amp; Catalog</div>
                          <div style={{ fontSize: '14px', color: '#ffffff' }}>{opt.typography.body}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Chronometer &amp; Vault Specs</div>
                          <div style={{ fontSize: '13px', color: '#d4af37', fontFamily: 'monospace' }}>{opt.typography.mono}</div>
                        </div>
                      </div>
                    </div>

                    {/* Boutique & Admin Highlights */}
                    <div>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d4af37', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Layers size={15} /> Experience Matrix
                      </h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {opt.boutiqueHighlights.map((item, hIdx) => (
                          <li key={hIdx} style={{ fontSize: '13px', color: '#9ca3af', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.4 }}>
                            <span style={{ color: '#d4af37', marginTop: '2px' }}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}
        </div>

        {/* Selected Option Bar */}
        <div style={{ position: 'sticky', bottom: '24px', marginTop: '60px', padding: '20px 32px', background: 'rgba(17, 19, 25, 0.95)', backdropFilter: 'blur(16px)', border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Current Selected Design Direction</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#d4af37' }}>
              {designOptions.find(o => o.id === selectedOption)?.title}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/" style={{ padding: '10px 20px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', fontSize: '13px', textDecoration: 'none' }}>
              Return to Atelier
            </Link>
            <Link href="/admin" style={{ padding: '10px 20px', borderRadius: '6px', background: '#d4af37', color: '#000000', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              Inspect Admin Dashboard
            </Link>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            cursor: 'zoom-out'
          }}
        >
          <img 
            src={lightboxImage} 
            alt="Full Resolution Design Mockup" 
            style={{ maxWidth: '95vw', maxHeight: '92vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 30px 60px rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.1)' }} 
          />
        </div>
      )}
    </div>
  );
}
