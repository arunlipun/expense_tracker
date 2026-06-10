

import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../api/adminApi";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Legend,
} from "recharts";

const COLORS = ["#6366f1", "#f43f5e", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4"];

// ── Reusable stat card ──────────────────────────────────────────────
const StatCard = ({ label, value, accent, icon }) => (
  <div style={{
    background: "#fff",
    borderRadius: 16,
    padding: "22px 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    borderTop: `3px solid ${accent}`,
    transition: "transform .15s, box-shadow .15s",
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.1)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)"; }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "#94a3b8" }}>{label}</span>
      <span style={{ fontSize: 22 }}>{icon}</span>
    </div>
    <span style={{ fontSize: 28, fontWeight: 700, color: accent, letterSpacing: "-.5px" }}>{value}</span>
  </div>
);

// ── Section wrapper ─────────────────────────────────────────────────
const Card = ({ title, children, style = {} }) => (
  <div style={{
    background: "#fff",
    borderRadius: 16,
    padding: "28px 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
    ...style,
  }}>
    {title && (
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <span style={{ width: 4, height: 20, background: "#6366f1", borderRadius: 4, display: "block" }} />
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#1e293b" }}>{title}</h2>
      </div>
    )}
    {children}
  </div>
);

// ── Custom tooltip for charts ────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e293b", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 13 }}>
      {label && <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#94a3b8" }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ margin: "2px 0", color: p.color || "#fff" }}>
          {p.name}: <strong>₹{p.value?.toLocaleString()}</strong>
        </p>
      ))}
    </div>
  );
};

// ── Type badge ───────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const isIncome = type?.toLowerCase() === "income";
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      background: isIncome ? "#dcfce7" : "#fee2e2",
      color: isIncome ? "#16a34a" : "#dc2626",
      letterSpacing: ".03em",
    }}>
      {isIncome ? "▲" : "▼"} {type}
    </span>
  );
};

// ── Loading skeleton ─────────────────────────────────────────────────
const Skeleton = () => (
  <div style={{ padding: "40px 32px", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
    <div style={{ height: 32, width: 220, background: "#f1f5f9", borderRadius: 8, marginBottom: 32, animation: "pulse 1.5s infinite" }} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 16 }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{ height: 100, background: "#f1f5f9", borderRadius: 16, animation: "pulse 1.5s infinite" }} />
      ))}
    </div>
    <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
  </div>
);

// ════════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      const res = await getAdminDashboard();
      setDashboard(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboard) return <Skeleton />;

  const stats = [
    { label: "Total Income",         value: `₹${dashboard.totalIncome?.toLocaleString()}`,        accent: "#10b981", icon: "💰" },
    { label: "Total Expense",         value: `₹${dashboard.totalExpense?.toLocaleString()}`,       accent: "#f43f5e", icon: "📤" },
    { label: "Balance",               value: `₹${dashboard.balance?.toLocaleString()}`,            accent: "#6366f1", icon: "🏦" },
    { label: "Total Records",         value: dashboard.totalRecords,                               accent: "#64748b", icon: "📋" },
    { label: "Income Transactions",   value: dashboard.totalIncomeRecords,                         accent: "#10b981", icon: "📈" },
    { label: "Expense Transactions",  value: dashboard.totalExpenseRecords,                        accent: "#f43f5e", icon: "📉" },
  ];

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "32px 24px 48px" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "#94a3b8", letterSpacing: ".08em", textTransform: "uppercase" }}>
          Overview
        </p>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-.5px" }}>
          Admin Dashboard
        </h1>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── Charts row ─────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, marginBottom: 28 }} className="chart-grid">
        {/* Pie */}
        <Card title="Expense by Category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboard.categoryWiseExpenses}
                dataKey="totalAmount"
                nameKey="category"
                outerRadius={110}
                innerRadius={55}
                paddingAngle={3}
              >
                {dashboard.categoryWiseExpenses.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: "#64748b" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar */}
        <Card title="Monthly Analysis">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboard.monthlyTrend} barCategoryGap="35%">
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
              <Bar dataKey="totalIncome" fill="#10b981" name="Income" radius={[5, 5, 0, 0]} />
              <Bar dataKey="totalExpense" fill="#f43f5e" name="Expense" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ── Recent Transactions ─────────────────────────────────── */}
      <Card title="Recent Transactions">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                {["Title", "Category", "Amount", "Type", "Date"].map(h => (
                  <th key={h} style={{
                    padding: "10px 14px", textAlign: "left",
                    fontSize: 11, fontWeight: 700, letterSpacing: ".07em",
                    textTransform: "uppercase", color: "#94a3b8",
                    borderBottom: "1px solid #f1f5f9",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dashboard.recentTransactions.map((item) => (
                <tr key={item.id} style={{ transition: "background .1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <td style={{ padding: "13px 14px", color: "#1e293b", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>{item.title}</td>
                  <td style={{ padding: "13px 14px", color: "#64748b", borderBottom: "1px solid #f1f5f9" }}>
                    <span style={{ background: "#f1f5f9", borderRadius: 6, padding: "3px 8px", fontSize: 12 }}>{item.category}</span>
                  </td>
                  <td style={{ padding: "13px 14px", fontWeight: 700, color: "#1e293b", borderBottom: "1px solid #f1f5f9" }}>₹{item.amount?.toLocaleString()}</td>
                  <td style={{ padding: "13px 14px", borderBottom: "1px solid #f1f5f9" }}><TypeBadge type={item.type} /></td>
                  <td style={{ padding: "13px 14px", color: "#94a3b8", fontSize: 13, borderBottom: "1px solid #f1f5f9" }}>{item.date?.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Responsive chart grid ───────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .chart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;