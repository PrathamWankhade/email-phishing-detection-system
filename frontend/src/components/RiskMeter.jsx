import React from 'react';

export default function RiskMeter({ score = 0 }) {
  const color = score >= 70 ? 'bg-danger-500' : score >= 40 ? 'bg-suspicious-500' : 'bg-safe-500';
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs text-text-secondary">
        <span>Risk Meter</span>
        <span>{score}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-200">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${Math.min(100, score)}%` }} />
      </div>
    </div>
  );
}
