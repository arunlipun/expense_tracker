


import { downloadReport } from "../../api/adminApi";
import { useState } from "react";

// ── Report config ────────────────────────────────────────────────────
const REPORTS = [
  {
    type: "WEEKLY",
    label: "Weekly Report",
    description: "Last 7 days of transactions",
    icon: "📅",
    accent: "#6366f1",
    light: "#eef2ff",
  },
  {
    type: "MONTHLY",
    label: "Monthly Report",
    description: "Full month breakdown",
    icon: "📊",
    accent: "#10b981",
    light: "#dcfce7",
  },
  {
    type: "YEARLY",
    label: "Yearly Report",
    description: "Annual financial summary",
    icon: "📈",
    accent: "#f59e0b",
    light: "#fef9c3",
  },
];

// ════════════════════════════════════════════════════════════════════
const Reports = () => {
  const [loading, setLoading] = useState(null);
  const [downloaded, setDownloaded] = useState(null);

  const download = async (type) => {
    setLoading(type);
    try {
      const response = await downloadReport(type);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}.csv`);
      document.body.appendChild(link);
      link.click();
      setDownloaded(type);
      setTimeout(() => setDownloaded(null), 2500);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "32px 24px 48px" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "#94a3b8", letterSpacing: ".08em", textTransform: "uppercase" }}>
          Export
        </p>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-.5px" }}>
          Download Reports
        </h1>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "#64748b" }}>
          Export your financial data as a CSV file.
        </p>
      </div>

      {/* ── Report cards ────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 20,
      }}>
        {REPORTS.map(({ type, label, description, icon, accent, light }) => {
          const isLoading = loading === type;
          const isDone = downloaded === type;

          return (
            <div key={type} style={{
              background: "#fff",
              borderRadius: 18,
              padding: "28px 24px",
              boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              borderTop: `3px solid ${accent}`,
              transition: "transform .15s, box-shadow .15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)"; }}
            >
              {/* Icon & title */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: light, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 24, flexShrink: 0,
                }}>{icon}</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{label}</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>{description}</p>
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={() => download(type)}
                disabled={isLoading}
                style={{
                  padding: "11px 20px",
                  borderRadius: 10,
                  border: "none",
                  background: isDone ? "#10b981" : accent,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1,
                  transition: "background .2s, transform .1s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                onMouseEnter={e => { if (!isLoading) e.currentTarget.style.filter = "brightness(1.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter = ""; }}
              >
                {isLoading
                  ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</span> Generating…</>
                  : isDone
                    ? <><span>✅</span> Downloaded!</>
                    : <><span>⬇️</span> Download CSV</>
                }
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Reports;