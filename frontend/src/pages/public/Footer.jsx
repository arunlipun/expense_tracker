

// components/Footer.jsx
import { Link } from "react-router-dom";

/* ─── Footer — same design system as auth pages ────────────────────
   Deliberately minimal: dark ground, ruled-line dividers,
   typographic hierarchy only. No gradient, no icons grid, no social row.
──────────────────────────────────────────────────────────────────── */

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "#1a1a2e",
      fontFamily: "'Inter', sans-serif",
      marginTop: "auto",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Inter:wght@300;400;500&display=swap');
        .footer-link {
          color: rgba(255,255,255,.35);
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          transition: color .15s;
          display: block;
          padding: 3px 0;
        }
        .footer-link:hover { color: rgba(255,255,255,.85); }
      `}</style>

      {/* Subtle ruled lines — consistent with the rest of the system */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: `${(i + 1) * 14}%`, height: 1,
          background: "rgba(255,255,255,.025)",
          pointerEvents: "none",
        }} />
      ))}

      {/* Main footer content */}
      <div style={{
        position: "relative",
        maxWidth: 1120, margin: "0 auto",
        padding: "52px 48px 40px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: 48,
      }}>
        {/* ── Brand ─────────────────────────────────────────────── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <div style={{
              width: 30, height: 30, background: "#2D5BE3",
              borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: 15, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>₹</span>
            </div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: "-.2px" }}>
              Kharcha
            </span>
          </div>
          <p style={{
            fontSize: 13, color: "rgba(255,255,255,.3)",
            lineHeight: 1.75, maxWidth: 280, margin: "0 0 24px",
            fontWeight: 400,
          }}>
            A straightforward way to stay on top of what comes in and what goes out — built for everyday Indian finances.
          </p>
          {/* Contact details inline, not a separate column */}
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.2)", lineHeight: 2 }}>
            <div>support@kharcha.in</div>
            <div>Bhubaneswar, Odisha</div>
          </div>
        </div>

        {/* ── Product ───────────────────────────────────────────── */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: ".12em", textTransform: "uppercase",
            color: "rgba(255,255,255,.25)", marginBottom: 18,
            fontFamily: "'Sora', sans-serif",
          }}>Product</div>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/dashboard" className="footer-link">Dashboard</Link>
            <Link to="/register" className="footer-link">Create account</Link>
            <Link to="/login" className="footer-link">Sign in</Link>
          </nav>
        </div>

        {/* ── Legal ─────────────────────────────────────────────── */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700,
            letterSpacing: ".12em", textTransform: "uppercase",
            color: "rgba(255,255,255,.25)", marginBottom: 18,
            fontFamily: "'Sora', sans-serif",
          }}>Legal</div>
          <nav style={{ display: "flex", flexDirection: "column" }}>
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/terms" className="footer-link">Terms of use</Link>
          </nav>
        </div>
      </div>

      {/* ── Bottom rule + copyright ──────────────────────────────── */}
      <div style={{
        position: "relative",
        maxWidth: 1120, margin: "0 auto",
        padding: "20px 48px",
        borderTop: "1px solid rgba(255,255,255,.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>
          © {year} Kharcha. All rights reserved.
        </span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.12)", fontFamily: "'Sora', sans-serif" }}>
          Track. Save. Repeat.
        </span>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          footer > div:first-of-type { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 24px 28px !important; }
          footer > div:last-of-type { padding: 16px 24px !important; flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;