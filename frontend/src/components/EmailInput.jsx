import React from 'react';

export default function EmailInput({ value, sender, onEmailChange, onSenderChange, onScan, loading }) {
  return (
    <form
      onSubmit={onScan}
      className="rounded-2xl border border-surface-300 bg-white p-6 shadow-card"
    >
      {/* Header */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-500">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
          Email Threat Scanner
        </span>
        <h2 className="mt-4 text-xl font-bold text-text-primary">Analyze Suspicious Email</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Paste suspicious email content and sender details to detect phishing threats using machine learning.
        </p>
      </div>

      {/* Sender Email */}
      <label className="mb-1.5 block text-sm font-medium text-text-primary" htmlFor="sender">
        Sender Email
      </label>
      <input
        id="sender"
        value={sender}
        onChange={(e) => onSenderChange(e.target.value)}
        placeholder="support@secure-bank.example"
        className="mb-5 w-full rounded-lg border border-surface-300 bg-surface-50 px-4 py-3 text-sm text-text-primary outline-none anim-standard focus:border-primary-500 focus:ring-2 focus:ring-primary-50"
      />

      {/* Email Content */}
      <label className="mb-1.5 block text-sm font-medium text-text-primary" htmlFor="emailText">
        Email Content
      </label>
      <textarea
        id="emailText"
        value={value}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="Paste suspicious email subject and body here..."
        rows={10}
        required
        className="w-full resize-none rounded-lg border border-surface-300 bg-surface-50 px-4 py-3 text-sm text-text-primary outline-none anim-standard focus:border-primary-500 focus:ring-2 focus:ring-primary-50"
      />

      {/* Scan Button */}
      <button
        type="submit"
        disabled={loading}
        className="ripple-container hover-scale mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Scanning Email...
          </>
        ) : (
          <>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Scan Email
          </>
        )}
      </button>
    </form>
  );
}
