import React from 'react';

export default function RiskMeter({ score = 0 }) {
  const color = score >= 70 ? 'bg-red-400' : score >= 40 ? 'bg-amber-300' : 'bg-emerald-300';
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-slate-300">
        <span>Risk Meter</span>
        <span>{score}%</span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${Math.min(100, score)}%` }} />
      </div>
    </div>
  );
}
