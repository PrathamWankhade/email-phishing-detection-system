import React from 'react';

export default function ThreatReasons({ reasons = [] }) {
  if (!reasons.length) return null;
  return (
    <div className="rounded-xl border border-surface-300 bg-white p-5 shadow-card">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-secondary">Explanation Engine</h3>
      <ul className="space-y-3">
        {reasons.map((reason) => (
          <li key={reason} className="flex items-start gap-3 text-sm text-text-primary">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
