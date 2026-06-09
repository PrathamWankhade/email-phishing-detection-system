import React from 'react';

export default function EmailInput({
  value,
  sender,
  onEmailChange,
  onSenderChange,
  onScan,
  loading,
}) {
  return (
    <form
      className="rounded-[32px] border border-cyan-400/10 bg-white/[0.03] p-7 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl transition"
      onSubmit={onScan}
    >
      {/* Header */}
      <div className="mb-6">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          Email Threat Scanner
        </span>

        <h2 className="mt-4 text-2xl font-bold text-white">
          Analyze Suspicious Email
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Paste suspicious email content and sender
          details to detect phishing threats using
          machine learning.
        </p>
      </div>

      {/* Sender Email */}
      <label
        className="mb-2 block text-sm font-semibold text-slate-300"
        htmlFor="sender"
      >
        Sender Email
      </label>

      <input
        id="sender"
        value={sender}
        onChange={(event) =>
          onSenderChange(event.target.value)
        }
        placeholder="support@secure-bank.example"
        className="mb-5 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
      />

      {/* Email Content */}
      <label
        className="mb-2 block text-sm font-semibold text-slate-300"
        htmlFor="emailText"
      >
        Email Content
      </label>

      <textarea
        id="emailText"
        value={value}
        onChange={(event) =>
          onEmailChange(event.target.value)
        }
        placeholder="Paste suspicious email subject and body here..."
        rows={12}
        required
        className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20"
      />

      {/* Scan Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-lg font-bold text-slate-950 transition duration-300 hover:scale-[1.01] hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
            Scanning Email...
          </span>
        ) : (
          'Scan Email'
        )}
      </button>
    </form>
  );
}