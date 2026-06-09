import React from 'react';

const rows = [
  ['Urgent language', 'High', 'Account suspension, immediate action, limited time'],
  ['Credential request', 'Critical', 'Password, OTP, banking details'],
  ['URL anomaly', 'High', 'Shortened URL, fake domain, unusual TLD'],
  ['Sender mismatch', 'Medium', 'Display name does not match sender domain'],
];

export default function Analytics() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-3xl font-black">Threat Analytics</h2>
      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.06] text-slate-300">
            <tr><th className="p-4">Signal</th><th className="p-4">Severity</th><th className="p-4">Examples</th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-white/10">
                {row.map((cell) => <td key={cell} className="p-4 text-slate-300">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
