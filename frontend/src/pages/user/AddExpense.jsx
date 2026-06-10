

// pages/user/AddExpense.jsx
import React from "react";
import ExpenseCard from "../../components/ExpenseCard";

/* ─── Ledger system wrapper only — ExpenseCard logic is untouched ── */

const AddExpense = () => {
  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "#FAFAF7",
      minHeight: "100vh",
      padding: "32px 28px 56px",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');`}</style>

      {/* ── Page header ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <p style={{
          margin: "0 0 4px", fontSize: 11, fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase",
          color: "#2D5BE3", fontFamily: "'Sora', sans-serif",
        }}>Transactions</p>
        <h1 style={{
          margin: "0 0 6px", fontFamily: "'Sora', sans-serif",
          fontSize: 26, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.5px",
        }}>Add Transaction</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#9CA3AF" }}>
          Log a new income or expense entry
        </p>
      </div>

      {/* ── ExpenseCard — untouched ──────────────────────────────── */}
      <ExpenseCard />
    </div>
  );
};

export default AddExpense;
