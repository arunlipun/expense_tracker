



import { useEffect, useState } from "react";
import { getAllExpenses, deleteExpense } from "../../api/adminApi";

// ── Empty state ──────────────────────────────────────────────────────
const EmptyState = () => (
  <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
    <div style={{ fontSize: 48, marginBottom: 12 }}>🧾</div>
    <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#64748b" }}>No expenses found</p>
    <p style={{ margin: "4px 0 0", fontSize: 13 }}>Expenses you add will appear here.</p>
  </div>
);

// ── Category pill ────────────────────────────────────────────────────
const CategoryPill = ({ label }) => (
  <span style={{
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    background: "#f1f5f9",
    color: "#475569",
    fontSize: 12,
    fontWeight: 600,
  }}>{label}</span>
);

// ════════════════════════════════════════════════════════════════════
const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { loadExpenses(); }, []);

  const loadExpenses = async () => {
    const res = await getAllExpenses();
    setExpenses(res.data.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense? This cannot be undone.")) return;
    setDeletingId(id);
    await deleteExpense(id);
    setDeletingId(null);
    loadExpenses();
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: "#f8fafc", minHeight: "100vh", padding: "32px 24px 48px" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 600, color: "#94a3b8", letterSpacing: ".08em", textTransform: "uppercase" }}>
          Finance
        </p>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a", letterSpacing: "-.5px" }}>
          All Expenses
        </h1>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        borderRadius: 14,
        padding: "16px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 18 }}>📤</span>
        <span style={{ fontSize: 14, color: "#64748b" }}>
          Showing <strong style={{ color: "#0f172a" }}>{expenses.length}</strong> expense records
        </span>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <div style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
        overflow: "hidden",
      }}>
        {expenses.length === 0 ? <EmptyState /> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Title", "Amount", "Category", "Action"].map(h => (
                    <th key={h} style={{
                      padding: "12px 16px",
                      textAlign: h === "Action" ? "center" : "left",
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: ".07em",
                      textTransform: "uppercase",
                      color: "#94a3b8",
                      borderBottom: "1px solid #f1f5f9",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id}
                    style={{ transition: "background .1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={e => e.currentTarget.style.background = ""}
                  >
                    <td style={{ padding: "14px 16px", color: "#1e293b", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>
                      {expense.title}
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#f43f5e", borderBottom: "1px solid #f1f5f9" }}>
                      ₹ {expense.amount?.toLocaleString()}
                    </td>
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <CategoryPill label={expense.category} />
                    </td>
                    <td style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", textAlign: "center" }}>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        disabled={deletingId === expense.id}
                        style={{
                          padding: "6px 16px",
                          borderRadius: 8,
                          border: "none",
                          background: deletingId === expense.id ? "#fca5a5" : "#fee2e2",
                          color: "#dc2626",
                          fontWeight: 700,
                          fontSize: 12,
                          cursor: deletingId === expense.id ? "not-allowed" : "pointer",
                          transition: "background .15s, transform .1s",
                          letterSpacing: ".03em",
                        }}
                        onMouseEnter={e => { if (deletingId !== expense.id) e.currentTarget.style.background = "#fca5a5"; }}
                        onMouseLeave={e => { if (deletingId !== expense.id) e.currentTarget.style.background = "#fee2e2"; }}
                      >
                        {deletingId === expense.id ? "Deleting…" : "🗑 Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllExpenses;