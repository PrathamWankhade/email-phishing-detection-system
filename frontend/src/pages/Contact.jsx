import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';

const faq = [
  { q: 'How does the phishing detection work?', a: 'The system uses an ensemble ML model (Logistic Regression + Random Forest) with TF-IDF vectorization and n-gram analysis to classify emails. It also analyzes URLs, sender domains, and urgency signals for comprehensive detection.' },
  { q: 'What file formats are supported?', a: 'You can paste email text directly, upload .txt files, or .eml files. The system automatically extracts the sender from email headers when using .eml format.' },
  { q: 'Is my data stored securely?', a: 'Scan history is stored locally in SQLite with hashed deduplication. Email content is used only for analysis and is not shared with third parties. API keys are stored in environment variables.' },
  { q: 'Can I use this in production?', a: 'This is an open-source educational and research project. For production use, consider adding authentication, rate limiting, a production database, and deploying behind a reverse proxy.' },
  { q: 'How accurate is the detection?', a: 'The ensemble model achieves over 94% accuracy on test data. Combined with URL analysis, sender analysis, and Gemini AI explanations, false positives are minimized.' },
];

function ContactIcon({ name, className = '' }) {
  const cls = `inline-block ${className}`;
  const props = { className: cls, style: { width: 18, height: 18 }, viewBox: '0 0 24 24', fill: 'none' };
  switch (name) {
    case 'mail':
      return (
        <svg {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} style={{ width: 18, height: 18 }}>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} style={{ width: 18, height: 18 }}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'notification':
      return (
        <svg {...props}>
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useScrollReveal();
  const infoRef = useScrollReveal();
  const faqRef = useScrollReveal();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <div className="mx-auto max-w-7xl animate-fade-in-up px-4 py-16 md:px-6">
      {/* Header */}
      <div className="mb-12 animate-slide-up">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-500">
          <span className="h-2 w-2 rounded-full bg-primary-500" />
          Get in Touch
        </span>
        <h1 className="mt-4 text-3xl font-bold text-text-primary">Contact & Support</h1>
        <p className="mt-2 text-text-secondary">Have questions or feedback? We&apos;d love to hear from you.</p>
      </div>

      <div ref={formRef} className="reveal grid gap-10 lg:grid-cols-5">
        {/* Left: Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-surface-300 bg-white p-6 shadow-card md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-safe-50">
                  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-safe-500">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary">Message sent!</h3>
                <p className="mt-1 text-sm text-text-secondary">We&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} action="mailto:prathamwankhade124@gmail.com" encType="text/plain" method="POST" className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-lg border border-surface-300 bg-surface-50 px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-text-primary">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-surface-300 bg-surface-50 px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-primary">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-surface-300 bg-surface-50 px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text-primary">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your issue or question..."
                    className="w-full resize-none rounded-lg border border-surface-300 bg-surface-50 px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-50"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600 active:scale-[0.97]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div ref={infoRef} className="reveal space-y-6 lg:col-span-2">
          {[
            { icon: 'mail', label: 'Email', value: 'prathamwankhade124@gmail.com', href: 'mailto:prathamwankhade124@gmail.com' },
            { icon: 'github', label: 'GitHub', value: 'github.com/PrathamWankhade', href: 'https://github.com/PrathamWankhade' },
            { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/pratham-wankhade', href: 'https://www.linkedin.com/in/pratham-wankhade' },
            { icon: 'notification', label: 'Phone', value: '+91 7757848083', href: 'tel:+917757848083' },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl border border-surface-300 bg-white p-5 shadow-card no-underline hover-lift">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                <ContactIcon name={icon} />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <p className="text-sm text-text-secondary">{value}</p>
              </div>
            </a>
          ))}

          {/* Social */}
          <div className="rounded-xl border border-surface-300 bg-white p-5 shadow-card">
            <p className="mb-3 text-sm font-medium text-text-primary">Follow me</p>
            <div className="flex flex-wrap gap-2">
              <a href="https://github.com/PrathamWankhade" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-surface-300 px-4 py-2 text-xs font-medium text-text-secondary anim-standard hover:border-primary-500 hover:text-primary-500">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/pratham-wankhade" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-surface-300 px-4 py-2 text-xs font-medium text-text-secondary anim-standard hover:border-primary-500 hover:text-primary-500">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/hey.its.me.ichi" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-surface-300 px-4 py-2 text-xs font-medium text-text-secondary anim-standard hover:border-primary-500 hover:text-primary-500">
                Instagram
              </a>
              <a href="mailto:prathamwankhade124@gmail.com" className="rounded-lg border border-surface-300 px-4 py-2 text-xs font-medium text-text-secondary anim-standard hover:border-primary-500 hover:text-primary-500">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div ref={faqRef} className="reveal mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-text-primary">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-3">
          {faq.map(({ q, a }, i) => (
            <div key={i} className="hover-lift rounded-xl border border-surface-300 bg-white shadow-card">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-text-primary anim-fast hover:bg-surface-50"
              >
                {q}
                <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 shrink-0 text-text-disabled anim-standard ${openFaq === i ? 'rotate-90' : ''}`}>
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="animate-slide-up border-t border-surface-200 px-5 py-4 text-sm leading-6 text-text-secondary">{a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
