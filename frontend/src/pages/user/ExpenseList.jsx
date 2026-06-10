
// pages/user/ExpenseList.jsx
import { useEffect, useState } from "react";
import { getExpenses, deleteExpense, updateExpense } from "../../api/expenseApi";
import SearchBar from "../../components/SearchBar";
import ExpenseTable from "../../components/ExpenseTable";
import { toast } from "react-toastify";

/* ─── Ledger system tokens ─────────────────────────────────────────
   Ground #FAFAF7  ·  Ink #1a1a2e  ·  Rule #2D5BE3
   Red #E5532D  ·  Muted #6B7280
──────────────────────────────────────────────────────────────────── */

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');`;

// ── Modal field ───────────────────────────────────────────────────────
const ModalField = ({ label, type = "text", value, onChange, placeholder, isTextarea }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{
      display: "block", fontSize: 10, fontWeight: 700,
      letterSpacing: ".1em", textTransform: "uppercase",
      color: "#9CA3AF", marginBottom: 7,
      fontFamily: "'Sora', sans-serif",
    }}>{label}</label>
    {isTextarea ? (
      <textarea
        rows={3}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "#FAFAF7",
          border: "1px solid rgba(26,26,46,.12)",
          borderRadius: 6,
          padding: "10px 12px",
          fontSize: 14, color: "#1a1a2e",
          fontFamily: "'Inter', sans-serif",
          outline: "none", resize: "vertical",
          transition: "border-color .2s",
        }}
        onFocus={e => e.target.style.borderColor = "#2D5BE3"}
        onBlur={e => e.target.style.borderColor = "rgba(26,26,46,.12)"}
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "#FAFAF7",
          border: "1px solid rgba(26,26,46,.12)",
          borderRadius: 6,
          padding: "10px 12px",
          fontSize: 14, color: "#1a1a2e",
          fontFamily: "'Inter', sans-serif",
          outline: "none",
          transition: "border-color .2s",
        }}
        onFocus={e => e.target.style.borderColor = "#2D5BE3"}
        onBlur={e => e.target.style.borderColor = "rgba(26,26,46,.12)"}
      />
    )}
  </div>
);

// ════════════════════════════════════════════════════════════════════
const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    id: "", title: "", amount: "", category: "", description: "", date: "",
  });

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      const onlyExpenses = response.data.data.filter(item => item.type === "EXPENSE");
      setExpenses(onlyExpenses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      toast.success("Deleted Successfully");
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (expense) => {
    setEditData({
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      description: expense.description || "",
      date: expense.date,
    });
    setShowModal(true);
  };

  const handleUpdateExpense = async () => {
    setSaving(true);
    try {
      await updateExpense(editData.id, {
        title: editData.title,
        amount: Number(editData.amount),
        category: editData.category,
        description: editData.description,
        date: editData.date,
        type: "EXPENSE",
      });
      toast.success("Update Successfully");
      setShowModal(false);
      fetchExpenses();
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (e) => setEditData({ ...editData, [field]: e.target.value });

  const filteredExpenses = expenses.filter(expense =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "#FAFAF7",
      minHeight: "100vh",
      padding: "32px 28px 56px",
    }}>
      <style>{`${FONTS}
        .modal-overlay{animation:fadein .15s ease;}
        .modal-card{animation:slidein .18s cubic-bezier(.4,0,.2,1);}
        @keyframes fadein{from{opacity:0}to{opacity:1}}
        @keyframes slidein{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ── Page header ─────────────────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{
          margin: "0 0 4px", fontSize: 11, fontWeight: 700,
          letterSpacing: ".1em", textTransform: "uppercase",
          color: "#E5532D", fontFamily: "'Sora', sans-serif",
        }}>Finance</p>
        <h1 style={{
          margin: 0, fontFamily: "'Sora', sans-serif",
          fontSize: 26, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.5px",
        }}>Expense List</h1>
      </div>

      {/* ── Count strip ─────────────────────────────────────────── */}
      <div style={{
        background: "#fff", border: "1px solid rgba(26,26,46,.07)",
        borderRadius: 8, padding: "12px 18px",
        display: "flex", alignItems: "center", gap: 8, marginBottom: 18,
        fontSize: 13, color: "#6B7280",
      }}>
        <span style={{ fontSize: 16 }}>📤</span>
        <span>
          <strong style={{ color: "#1a1a2e", fontFamily: "'Sora', sans-serif" }}>
            {filteredExpenses.length}
          </strong>{" "}
          {filteredExpenses.length !== expenses.length
            ? `of ${expenses.length} expenses match`
            : "expense records"}
        </span>
      </div>

      {/* ── Search + table (existing components, untouched) ─────── */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExpenseTable
        expenses={filteredExpenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showActions={true}
      />

      {/* ── Edit modal ──────────────────────────────────────────── */}
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed", inset: 0,
            background: "rgba(10,10,20,.55)",
            backdropFilter: "blur(3px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 50, padding: 20,
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            className="modal-card"
            style={{
              background: "#fff",
              borderRadius: 14,
              width: "100%", maxWidth: 440,
              padding: "32px 28px 24px",
              boxShadow: "0 20px 60px rgba(10,10,20,.18)",
              position: "relative",
            }}
          >
            {/* Modal header */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", marginBottom: 28,
            }}>
              <div>
                <div style={{
                  width: 28, height: 2, background: "#E5532D",
                  borderRadius: 2, marginBottom: 10,
                }} />
                <h2 style={{
                  margin: 0, fontFamily: "'Sora', sans-serif",
                  fontSize: 20, fontWeight: 800,
                  color: "#1a1a2e", letterSpacing: "-.3px",
                }}>Edit Expense</h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "none", border: "none",
                  fontSize: 20, cursor: "pointer",
                  color: "#9CA3AF", lineHeight: 1, padding: 4,
                  borderRadius: 4, transition: "color .15s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#1a1a2e"}
                onMouseLeave={e => e.currentTarget.style.color = "#9CA3AF"}
              >✕</button>
            </div>

            {/* Fields */}
            <ModalField label="Title"       value={editData.title}       onChange={set("title")}       placeholder="e.g. Grocery shopping" />
            <ModalField label="Amount"      type="number" value={editData.amount} onChange={set("amount")}  placeholder="0" />
            <ModalField label="Category"    value={editData.category}    onChange={set("category")}    placeholder="e.g. Food" />
            <ModalField label="Description" value={editData.description} onChange={set("description")} placeholder="Optional note…" isTextarea />

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "10px 20px", borderRadius: 6,
                  border: "1px solid rgba(26,26,46,.15)",
                  background: "transparent", color: "#6B7280",
                  fontFamily: "'Sora', sans-serif", fontWeight: 600,
                  fontSize: 13, cursor: "pointer",
                  transition: "border-color .15s, color .15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a1a2e"; e.currentTarget.style.color = "#1a1a2e"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(26,26,46,.15)"; e.currentTarget.style.color = "#6B7280"; }}
              >Cancel</button>
              <button
                onClick={handleUpdateExpense}
                disabled={saving}
                style={{
                  padding: "10px 22px", borderRadius: 6,
                  border: "none",
                  background: saving ? "#93C5FD" : "#2D5BE3",
                  color: "#fff",
                  fontFamily: "'Sora', sans-serif", fontWeight: 700,
                  fontSize: 13, cursor: saving ? "not-allowed" : "pointer",
                  transition: "background .2s",
                  letterSpacing: ".02em",
                }}
                onMouseEnter={e => { if (!saving) e.currentTarget.style.background = "#1a1a2e"; }}
                onMouseLeave={e => { if (!saving) e.currentTarget.style.background = "#2D5BE3"; }}
              >{saving ? "Saving…" : "Save changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;