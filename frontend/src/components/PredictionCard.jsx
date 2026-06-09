import React from 'react';

export default function PredictionCard({
  result,
}) {
  if (!result) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-4xl">
          🛡️
        </div>

        <h3 className="text-2xl font-bold text-white">
          No Scan Results Yet
        </h3>

        <p className="mt-3 text-slate-400">
          Scan an email to view phishing
          analysis, confidence score, risk
          level, and explainable AI insights.
        </p>
      </div>
    );
  }

  const riskStyles = {
    high: {
      border:
        'border-red-500/30',
      bg:
        'bg-red-500/10',
      text:
        'text-red-400',
      emoji:
        '🚨',
    },

    medium: {
      border:
        'border-yellow-500/30',
      bg:
        'bg-yellow-500/10',
      text:
        'text-yellow-400',
      emoji:
        '⚠️',
    },

    low: {
      border:
        'border-green-500/30',
      bg:
        'bg-green-500/10',
      text:
        'text-green-400',
      emoji:
        '✅',
    },
  };

  const currentStyle =
    riskStyles[
      result.risk_level
    ] || riskStyles.medium;

  return (
    <div
      className={`rounded-[32px] border ${currentStyle.border} bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl`}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${currentStyle.border} ${currentStyle.bg} ${currentStyle.text}`}
          >
            {currentStyle.emoji}

            {result.risk_level?.toUpperCase()}{' '}
            RISK
          </span>

          <h2 className="mt-4 text-3xl font-black text-white">
            {result.label}
          </h2>

          <p className="mt-2 text-slate-400">
            ML-powered phishing
            detection analysis
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">
            Confidence
          </p>

          <h3 className="text-4xl font-black text-cyan-300">
            {
              result.confidence
            }
            %
          </h3>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-7">
        <div className="mb-2 flex justify-between text-sm text-slate-400">
          <span>
            Detection Confidence
          </span>

          <span>
            {
              result.confidence
            }
            %
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-700"
            style={{
              width: `${result.confidence}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-7 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-400">
            Prediction
          </p>

          <p className="mt-1 text-lg font-bold text-white">
            {
              result.prediction
            }
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-sm text-slate-400">
            Source
          </p>

          <p className="mt-1 text-lg font-bold text-cyan-300">
            {result.source ||
              'ML Model'}
          </p>
        </div>
      </div>

      {/* Reasons */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-white">
          Explainable AI
          Analysis
        </h3>

        <div className="space-y-3">
          {result.reasons
            ?.length ? (
            result.reasons.map(
              (
                reason,
                index
              ) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/50 p-4"
                >
                  <div className="mt-1 text-cyan-400">
                    ●
                  </div>

                  <p className="text-sm text-slate-300">
                    {reason}
                  </p>
                </div>
              )
            )
          ) : (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-slate-400">
              No strong phishing
              indicators found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}