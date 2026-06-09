import React, {
  useEffect,
  useState,
} from 'react';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const DASHBOARD_API =
  'http://127.0.0.1:8000/api/v1/dashboard';

const HISTORY_API =
  'http://127.0.0.1:8000/api/v1/history';

export default function Dashboard() {
  const [dashboardData, setDashboardData] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Dashboard data
        const dashboardResponse =
          await fetch(
            DASHBOARD_API
          );

        const dashboardJson =
          await dashboardResponse.json();

        setDashboardData(
          dashboardJson
        );

        // History data
        const historyResponse =
          await fetch(
            HISTORY_API
          );

        const historyJson =
          await historyResponse.json();

        setHistory(
          historyJson
        );
      } catch (error) {
        console.error(
          'Dashboard fetch failed:',
          error
        );
      } finally {
        setLoading(false);
      }
    }

    // First fetch
    fetchData();

    // Realtime refresh
    const interval =
      setInterval(
        fetchData,
        2000
      );

    // Cleanup
    return () =>
      clearInterval(
        interval
      );
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-14 w-14 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

          <h2 className="text-2xl font-bold">
            Loading Security Dashboard...
          </h2>
        </div>
      </div>
    );
  }

  const pieData = [
    {
      name: 'Phishing',
      value:
        dashboardData?.phishing_count ||
        0,
    },
    {
      name: 'Safe',
      value:
        dashboardData?.safe_count ||
        0,
    },
  ];

  const riskData = [
    {
      level: 'High',
      count:
        dashboardData?.risk_levels
          ?.high || 0,
    },
    {
      level: 'Medium',
      count:
        dashboardData?.risk_levels
          ?.medium || 0,
    },
    {
      level: 'Low',
      count:
        dashboardData?.risk_levels
          ?.low || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
            Cyber Threat Analytics
          </span>

          <h1 className="mt-5 text-5xl font-black">
            Security Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            Monitor phishing
            detections, scan
            history, confidence
            scores, and system
            performance powered
            by machine learning.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Scanned Emails"
            value={
              dashboardData?.total_scans ||
              0
            }
          />

          <StatCard
            title="Phishing Detected"
            value={
              dashboardData?.phishing_count ||
              0
            }
          />

          <StatCard
            title="Safe Emails"
            value={
              dashboardData?.safe_count ||
              0
            }
          />

          <StatCard
            title="Average Confidence"
            value={`${dashboardData?.avg_confidence || 0}%`}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Threat Distribution */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 shadow-xl backdrop-blur-xl">

            <h2 className="mb-5 text-2xl font-bold text-white">
              Threat Distribution
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  labelLine={false}
                  label={({
                    value,
                  }) => value}
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#22c55e" />
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      '#0f172a',
                    border:
                      '1px solid #1e293b',
                    borderRadius:
                      '12px',
                    color:
                      '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 flex justify-center gap-6 text-sm">
              <LegendDot
                color="bg-red-500"
                label="Phishing"
              />

              <LegendDot
                color="bg-green-500"
                label="Safe"
              />
            </div>
          </div>

          {/* Risk Levels */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 shadow-xl backdrop-blur-xl">

            <h2 className="mb-5 text-2xl font-bold text-white">
              Risk Levels
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart data={riskData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="level"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                  allowDecimals={
                    false
                  }
                />

                <Tooltip
                  cursor={{
                    fill:
                      'rgba(34,211,238,0.08)',
                  }}
                  contentStyle={{
                    backgroundColor:
                      '#0f172a',
                    border:
                      '1px solid #1e293b',
                    borderRadius:
                      '12px',
                    color:
                      '#fff',
                  }}
                />

                <Bar
                  dataKey="count"
                  radius={[
                    12,
                    12,
                    0,
                    0,
                  ]}
                >
                  <Cell fill="#ef4444" />
                  <Cell fill="#facc15" />
                  <Cell fill="#22c55e" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scan History */}
        <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-7 shadow-xl backdrop-blur-xl">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Scan History
            </h2>

            <span className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              {history.length}{' '}
              Records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">

              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-4">
                    Sender
                  </th>

                  <th className="pb-4">
                    Prediction
                  </th>

                  <th className="pb-4">
                    Confidence
                  </th>

                  <th className="pb-4">
                    Risk
                  </th>

                  <th className="pb-4">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {history.length >
                0 ? (
                  history.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={index}
                        className="border-b border-white/5 hover:bg-white/[0.03]"
                      >
                        <td className="py-4 text-slate-300">
                          {item.sender ||
                            'Unknown'}
                        </td>

                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold ${
                              item.prediction ===
                              'phishing'
                                ? 'bg-red-500/10 text-red-400'
                                : 'bg-green-500/10 text-green-400'
                            }`}
                          >
                            {
                              item.prediction
                            }
                          </span>
                        </td>

                        <td className="py-4 text-cyan-300">
                          {
                            item.confidence
                          }
                          %
                        </td>

                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm ${
                              item.risk_level ===
                              'high'
                                ? 'bg-red-500/10 text-red-400'
                                : item.risk_level ===
                                  'medium'
                                ? 'bg-yellow-500/10 text-yellow-400'
                                : 'bg-green-500/10 text-green-400'
                            }`}
                          >
                            {
                              item.risk_level
                            }
                          </span>
                        </td>

                        <td className="py-4 text-slate-400">
                          {item.created_at ||
                            'Today'}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-slate-500"
                    >
                      No scan
                      history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div className="rounded-[32px] border border-cyan-400/10 bg-white/[0.03] p-7 shadow-lg backdrop-blur-xl transition hover:scale-[1.02]">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-black text-cyan-300">
        {value}
      </h2>
    </div>
  );
}

function LegendDot({
  color,
  label,
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${color}`}
      />

      <span className="text-slate-300">
        {label}
      </span>
    </div>
  );
}