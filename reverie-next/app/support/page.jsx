"use client";

import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { faqCategories } from '../../data/allProductsData';
import { supportService } from '../../services/supportService';
import Button from '../../components/ui/Button';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});
  const [faqList, setFaqList] = useState(faqCategories);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const liveFaqs = await supportService.getFaqs();
        if (Array.isArray(liveFaqs) && liveFaqs.length > 0) {
          // Group by category
          const grouped = {};
          liveFaqs.forEach((item) => {
            const cat = item.category || 'General Inquiries';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({ q: item.question, a: item.answer });
          });
          const catArray = Object.keys(grouped).map((category) => ({
            category,
            faqs: grouped[category],
          }));
          setFaqList(catArray);
        }
      } catch (err) {
        console.warn('Failed to load live FAQs:', err);
      }
    }
    loadFaqs();
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="page-support">
      {/* Support Hero Banner with Search */}
      <section className="support-banner">
        <div className="support-banner-bg-wrap">
          <img
            src="/assets/collection-editorial.jpg"
            alt="REVERIE Support"
            className="support-banner-bg"
          />
          <div className="support-banner-overlay" />
        </div>

        <div className="container support-banner-content">
          <span className="eyebrow eyebrow-dark font-ui">CLIENT CONCIERGE</span>
          <h1 className="support-banner-title font-display">We're here to assist you</h1>
          <p className="support-banner-subtitle font-ui">
            Find answers to common questions or connect directly with our master watchmaker concierge.
          </p>

          <div className="support-search-wrap font-ui">
            <Search size={18} className="support-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers (e.g. warranty coverage, servicing, international shipping)..."
              className="support-search-input"
            />
          </div>
        </div>
      </section>

      {/* Concierge Channels */}
      <section className="container support-channels-section">
        <div className="support-channels-grid font-ui">
          <div className="support-channel-card">
            <MessageSquare size={24} className="support-channel-icon" />
            <h3 className="support-channel-title font-display">Live Atelier Chat</h3>
            <p className="support-channel-desc">Consult with a horology advisor in real time (9am - 6pm CET).</p>
            <Button variant="secondary" onClick={() => alert('Atelier live chat will open shortly.')}>
              Initiate Chat
            </Button>
          </div>

          <div className="support-channel-card">
            <Mail size={24} className="support-channel-icon" />
            <h3 className="support-channel-title font-display">Bespoke Concierge</h3>
            <p className="support-channel-desc">Send us a direct inquiry. We reply within 4 business hours.</p>
            <Button variant="secondary" href="mailto:concierge@reverie.ch">
              concierge@reverie.ch
            </Button>
          </div>

          <div className="support-channel-card">
            <Phone size={24} className="support-channel-icon" />
            <h3 className="support-channel-title font-display">Geneva Atelier Phone</h3>
            <p className="support-channel-desc">Direct private consultation with our client services directors.</p>
            <Button variant="secondary" href="tel:+41225550192">
              +41 22 555 0192
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="container support-faq-section">
        <div className="section-heading section-heading--center">
          <span className="eyebrow font-ui">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="section-title font-display">Atelier Inquiries & Guidance</h2>
        </div>

        <div className="support-faq-categories font-ui">
          {faqList.map((cat, catIdx) => (
            <div key={cat.category} className="support-faq-group">
              <h3 className="support-faq-group-title font-display">{cat.category}</h3>

              <div className="support-faq-list">
                {(cat.faqs || cat.questions || []).map((q, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = openFaqs[key];

                  return (
                    <div key={q.q} className={`support-faq-item ${isOpen ? 'support-faq-item--open' : ''}`}>
                      <button
                        type="button"
                        onClick={() => toggleFaq(key)}
                        className="support-faq-question-btn"
                        aria-expanded={isOpen}
                      >
                        <span className="support-faq-q-text font-display">{q.q}</span>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {isOpen && (
                        <div className="support-faq-answer">
                          <p>{q.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
