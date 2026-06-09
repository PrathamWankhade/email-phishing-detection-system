import React from 'react';

export default function ThreatReasons({ reasons = [] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <h3 className="mb-4 font-bold text-slate-100">Explanation Engine</h3>
      <ul className="space-y-3 text-sm text-slate-300">
        {reasons.map((reason) => (
          <li key={reason} className="flex gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
            <span>{reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
