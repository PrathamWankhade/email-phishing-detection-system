import React from 'react';

export default function UploadEmail({ onLoad, onSenderLoad }) {
  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    let extractedSender = '';
    let extractedBody = text;

    if (file.name.endsWith('.eml')) {
      const senderMatch = text.match(/From:\s*(.+)/i);
      const bodyMatch = text.split(/\r?\n\r?\n/);
      extractedSender = senderMatch?.[1] || '';
      extractedBody = bodyMatch?.slice(1).join('\n') || text;
    } else if (file.name.endsWith('.txt')) {
      const senderMatch = text.match(/From:\s*(.+)/i);
      if (senderMatch) extractedSender = senderMatch[1];
    }

    onSenderLoad?.(extractedSender);
    onLoad(extractedBody);
  }

  return (
    <div className="hover-lift rounded-xl border border-surface-300 bg-white p-5 shadow-card">
      <label className="block text-sm font-medium text-text-primary">
        Upload Email (.txt / .eml)
      </label>
      <input
        type="file"
        accept=".txt,.eml"
        onChange={handleUpload}
        className="mt-3 block w-full cursor-pointer rounded-lg border border-surface-300 bg-surface-50 px-4 py-3 text-sm text-text-secondary file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-500 hover:file:bg-primary-100"
      />
    </div>
  );
}
