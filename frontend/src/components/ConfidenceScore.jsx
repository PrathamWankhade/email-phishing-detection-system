import React from 'react';

export default function ConfidenceScore({ confidence = 0 }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Confidence</p>
      <p className="mt-2 text-4xl font-black text-cyan-300">{confidence}%</p>
    </div>
  );
}
