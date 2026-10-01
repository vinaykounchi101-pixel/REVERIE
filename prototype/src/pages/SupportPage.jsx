import React, { useState } from 'react';
import { Search, MessageSquare, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { faqCategories } from '../data/allProductsData';
import Button from '../components/ui/Button';

export default function SupportPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});

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
          <h1 className="support-banner-title font-display">We're here to help</h1>
          <p className="support-banner-subtitle font-ui">
            Find answers to common questions or get in touch with our client support team.
          </p>

          <div className="support-search-wrap font-ui">
            <Search size={18} className="support-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers (e.g. shipping time, warranty coverage)..."
              className="support-search-input"
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="container support-faqs-section">
        <h2 className="support-section-title font-display">Frequently Asked Questions</h2>

        <div className="support-faq-groups">
          {faqCategories.map((group, groupIdx) => (
            <div key={groupIdx} className="faq-group">
              <h3 className="faq-group-title font-ui">{group.category}</h3>
              <div className="faq-accordion-list">
                {group.faqs.map((faq, faqIdx) => {
                  const uniqueKey = `${groupIdx}-${faqIdx}`;
                  const isOpen = openFaqs[uniqueKey] !== false; // Default open first
                  return (
                    <div key={faqIdx} className="faq-item">
                      <button
                        type="button"
                        className="faq-question-btn font-ui"
                        onClick={() => toggleFaq(uniqueKey)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {isOpen && (
                        <div className="faq-answer font-ui">
                          <p>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Concierge Cards */}
        <div className="support-contact-block">
          <h3 className="support-contact-heading font-display">Still need help?</h3>
          <div className="support-contact-grid font-ui">
            <div className="support-contact-card">
              <div className="contact-icon-wrap">
                <MessageSquare size={20} />
              </div>
              <h4 className="contact-card-title">Live Chat</h4>
              <p className="contact-card-desc">Chat with our watch specialists in real time.</p>
              <button type="button" className="contact-card-action font-ui">
                Start Conversation →
              </button>
            </div>

            <div className="support-contact-card">
              <div className="contact-icon-wrap">
                <Mail size={20} />
              </div>
              <h4 className="contact-card-title">Email Concierge</h4>
              <p className="contact-card-desc">concierge@reveriewatches.com</p>
              <a href="mailto:concierge@reveriewatches.com" className="contact-card-action font-ui">
                Send an Email →
              </a>
            </div>

            <div className="support-contact-card">
              <div className="contact-icon-wrap">
                <Phone size={20} />
              </div>
              <h4 className="contact-card-title">Direct Telephone</h4>
              <p className="contact-card-desc">+41 22 555 0199 (Mon–Fri 9am–6pm CET)</p>
              <a href="tel:+41225550199" className="contact-card-action font-ui">
                Call Concierge →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
