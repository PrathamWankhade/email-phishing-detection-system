import React from 'react';

export default function ConfidenceScore({ confidence = 0 }) {
  return (
    <div className="rounded-xl border border-surface-300 bg-white p-5 text-center shadow-card">
      <p className="text-xs font-medium uppercase tracking-wider text-text-disabled">Confidence</p>
      <p className="mt-2 text-3xl font-bold text-primary-500">{confidence}%</p>
    </div>
  );
}
