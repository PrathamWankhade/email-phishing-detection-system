import React from 'react';

export default function UploadEmail({
  onLoad,
  onSenderLoad,
}) {
  async function handleUpload(
    event
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const text =
      await file.text();

    let extractedSender = '';
    let extractedBody = text;

    // Parse .eml format
    if (
      file.name.endsWith(
        '.eml'
      )
    ) {
      const senderMatch =
        text.match(
          /From:\s*(.+)/i
        );

      const bodyMatch =
        text.split(
          /\r?\n\r?\n/
        );

      extractedSender =
        senderMatch?.[1] ||
        '';

      extractedBody =
        bodyMatch
          ?.slice(1)
          .join('\n') ||
        text;
    }

    onSenderLoad?.(
      extractedSender
    );

    onLoad(
      extractedBody
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <label className="block text-sm font-semibold text-slate-300">
        Upload Email (.txt /
        .eml)
      </label>

      <input
        type="file"
        accept=".txt,.eml"
        onChange={
          handleUpload
        }
        className="mt-4 block w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-slate-300"
      />
    </div>
  );
}