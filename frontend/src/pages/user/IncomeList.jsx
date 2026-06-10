
// pages/user/IncomeList.jsx
import { useEffect, useState } from "react";
import { getIncome } from "../../api/incomeApi";
import ExpenseTable from "../../components/ExpenseTable";

/* ─── Ledger system wrapper — getIncome logic untouched ─────────── */

// ── Skeleton ─────────────────────────────────────────────────────────
const Skeleton = () => (
  <div style={{ marginTop: 20 }}>
    {[...Array(5)].map((_, i) => (
      <div key={i} style={{
        height: 44,
        background: i % 2 === 0 ? "#F5F5F2" : "#fff",
        borderBottom: "1px solid rgba(26,26,46,.04)",
        animation: "skpulse 1.4s infinite",
        animationDelay: `${i * 0.07}s`,
      }} />
    ))}
    <style>{`@keyframes skpulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
  </div>
);

const IncomeList = () => {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await getIncome();
        setIncome(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchIncome();
  }, []);

  // ── Total income figure for the strip
  const total = income.reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "#FAFAF7",
      minHeight: "100vh",
      padding: "32px 28px 56px",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* ── Page header ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          margin: "0 0 4px", fontSize: 11, fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase",
          color: "#16A34A", fontFamily: "'Sora', sans-serif",
        }}>Finance</p>
        <h1 style={{
          margin: 0, fontFamily: "'Sora', sans-serif",
          fontSize: 26, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.5px",
        }}>Income List</h1>
      </div>

      {/* ── Summary strip ───────────────────────────────────────── */}
      {!loading && (
        <div style={{
          background: "#fff",
          border: "1px solid rgba(26,26,46,.07)",
          borderTop: "3px solid #16A34A",
          borderRadius: 10,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 18,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>💰</span>
            <span style={{ fontSize: 13, color: "#6B7280" }}>
              <strong style={{ color: "#1a1a2e", fontFamily: "'Sora', sans-serif" }}>
                {income.length}
              </strong> income records
            </span>
          </div>
          <div>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: ".1em",
              textTransform: "uppercase", color: "#9CA3AF",
              fontFamily: "'Sora', sans-serif", marginRight: 8,
            }}>Total</span>
            <span style={{
              fontFamily: "'Sora', sans-serif", fontWeight: 800,
              fontSize: 18, color: "#16A34A", letterSpacing: "-.3px",
            }}>₹{total.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* ── Table (ExpenseTable component — untouched) ───────────── */}
      {loading ? <Skeleton /> : (
        <div style={{
          background: "#fff",
          border: "1px solid rgba(26,26,46,.07)",
          borderRadius: 10, overflow: "hidden",
        }}>
          <ExpenseTable expenses={income} showActions={false} />
        </div>
      )}
    </div>
  );
};

export default IncomeList;