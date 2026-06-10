


// pages/public/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

/* ─── Design tokens ────────────────────────────────────────────────
   Palette  : paper #FAFAF7  |  ink #1a1a2e  |  rule #2D5BE3
              muted #6B7280  |  line #E5E5E0
   Type     : Sora (display) / Inter (body)
   Signature: animated ticker tape of real expense categories
              running horizontally — grounds the page in the product
──────────────────────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  "Groceries  ₹3,200",
  "Rent  ₹12,000",
  "Electricity  ₹980",
  "Transport  ₹1,450",
  "Dining  ₹2,700",
  "Medical  ₹560",
  "Entertainment  ₹890",
  "EMI  ₹8,500",
  "Insurance  ₹2,100",
  "Petrol  ₹1,800",
  "Salary  ₹55,000",
  "Freelance  ₹18,000",
];

// Duplicate for seamless loop
const TICKER = [...TICKER_ITEMS, ...TICKER_ITEMS];

const Home = () => {
  const canvasRef = useRef(null);

  // Subtle ruled-paper grid lines on canvas
  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");

    const draw = () => {
      cvs.width = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
      ctx.clearRect(0, 0, cvs.width, cvs.height);

      // Horizontal ruled lines — evenly spaced like a ledger book
      const lineSpacing = 44;
      ctx.strokeStyle = "rgba(26,26,46,0.045)";
      ctx.lineWidth = 1;
      for (let y = lineSpacing; y < cvs.height; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(cvs.width, y);
        ctx.stroke();
      }

      // Single vertical margin rule on the left — ledger aesthetic
      ctx.strokeStyle = "rgba(45,91,227,0.12)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(64, 0);
      ctx.lineTo(64, cvs.height);
      ctx.stroke();
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FAFAF7",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        .ticker-wrap { overflow: hidden; width: 100%; }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker 28s linear infinite;
          width: max-content;
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover { animation-play-state: paused; }

        .home-cta-primary {
          background: #1a1a2e;
          color: #FAFAF7;
          border: none;
          padding: 14px 32px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: .04em;
          border-radius: 4px;
          cursor: pointer;
          transition: background .2s, transform .15s;
          text-decoration: none;
          display: inline-block;
        }
        .home-cta-primary:hover { background: #2D5BE3; transform: translateY(-1px); }

        .home-cta-ghost {
          background: transparent;
          color: #1a1a2e;
          border: 1.5px solid #1a1a2e;
          padding: 13px 32px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: .04em;
          border-radius: 4px;
          cursor: pointer;
          transition: border-color .2s, color .2s, transform .15s;
          text-decoration: none;
          display: inline-block;
        }
        .home-cta-ghost:hover { border-color: #2D5BE3; color: #2D5BE3; transform: translateY(-1px); }

        @media (max-width: 640px) {
          .home-float-card { display: none !important; }
          .home-stats { gap: 24px !important; }
          .home-hero-text { font-size: 40px !important; }
        }
      `}</style>

      {/* Ledger canvas background */}
      <canvas ref={canvasRef} style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
      }} />

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav style={{
        position: "relative", zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "22px 48px",
        borderBottom: "1px solid rgba(26,26,46,.07)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: "#2D5BE3",
            borderRadius: 6, display: "flex", alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>₹</span>
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a2e", letterSpacing: "-.2px" }}>
            Kharcha
          </span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/login" className="home-cta-ghost">Sign in</Link>
          <Link to="/register" className="home-cta-primary">Get started</Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <main style={{
        flex: 1,
        position: "relative", zIndex: 10,
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "flex-start",
        padding: "60px 48px 40px 96px",  // offset right of the margin rule
        maxWidth: 760,
      }}>
        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginBottom: 28,
        }}>
          <div style={{ width: 28, height: 2, background: "#2D5BE3" }} />
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: ".12em",
            textTransform: "uppercase", color: "#2D5BE3",
            fontFamily: "'Sora', sans-serif",
          }}>Personal finance, simplified</span>
        </div>

        {/* Headline — no gradient, no gold, just typographic weight */}
        <h1 className="home-hero-text" style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 60,
          fontWeight: 800,
          color: "#1a1a2e",
          lineHeight: 1.08,
          letterSpacing: "-1.5px",
          margin: "0 0 24px",
        }}>
          Every rupee<br />
          <span style={{ fontWeight: 300, letterSpacing: "-.5px", color: "#6B7280" }}>deserves a line</span><br />
          in the ledger.
        </h1>

        <p style={{
          fontSize: 16,
          color: "#6B7280",
          fontWeight: 400,
          lineHeight: 1.75,
          maxWidth: 440,
          margin: "0 0 40px",
        }}>
          Log income, track spending, and spot where your money actually goes — without spreadsheets.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/register" className="home-cta-primary">Open your account</Link>
          <Link to="/login" className="home-cta-ghost">Sign in</Link>
        </div>

        {/* Stats — real, specific numbers feel earned not inflated */}
        <div className="home-stats" style={{
          display: "flex", gap: 40, marginTop: 56,
          paddingTop: 32, borderTop: "1px solid rgba(26,26,46,.08)",
        }}>
          {[
            ["₹12L+", "tracked this week"],
            ["8 categories", "auto-classified"],
            ["2 min", "to your first entry"],
          ].map(([num, lbl]) => (
            <div key={lbl}>
              <div style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 22, fontWeight: 700, color: "#1a1a2e",
                letterSpacing: "-.3px",
              }}>{num}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3, fontWeight: 500 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Signature element: ticker tape ──────────────────────── */}
      {/* A horizontal scrolling strip of actual expense/income categories
          This directly represents the product — far more honest than floating stat cards */}
      <div style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(26,26,46,.08)",
        borderBottom: "1px solid rgba(26,26,46,.08)",
        padding: "14px 0",
        background: "#F0F0EC",
      }}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {TICKER.map((item, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 20,
                padding: "0 28px",
                fontSize: 13,
                fontWeight: 500,
                color: "#1a1a2e",
                fontFamily: "'Sora', sans-serif",
                letterSpacing: "-.1px",
                whiteSpace: "nowrap",
              }}>
                <span style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: i % 3 === 0 ? "#2D5BE3" : i % 3 === 1 ? "#16A34A" : "#E5532D",
                  display: "inline-block", flexShrink: 0,
                }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating ledger-card  (desktop only) ────────────────── */}
      <div className="home-float-card" style={{
        position: "fixed", right: 48, top: "50%", transform: "translateY(-50%)",
        width: 220,
        background: "#fff",
        border: "1px solid rgba(26,26,46,.1)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(26,26,46,.08)",
        zIndex: 20,
      }}>
        {/* Card header */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(26,26,46,.06)",
          background: "#F5F5F2",
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#9CA3AF", textTransform: "uppercase" }}>This Month</span>
        </div>

        {/* Ledger rows */}
        {[
          { label: "Salary",       amount: "+₹55,000", color: "#16A34A" },
          { label: "Rent",         amount: "−₹12,000", color: "#E5532D" },
          { label: "Groceries",    amount: "−₹3,200",  color: "#E5532D" },
          { label: "Freelance",    amount: "+₹18,000", color: "#16A34A" },
          { label: "Transport",    amount: "−₹1,450",  color: "#E5532D" },
        ].map(({ label, amount, color }) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between",
            padding: "9px 16px",
            borderBottom: "1px solid rgba(26,26,46,.04)",
            fontSize: 12,
          }}>
            <span style={{ color: "#6B7280", fontWeight: 500 }}>{label}</span>
            <span style={{ color, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>{amount}</span>
          </div>
        ))}

        {/* Balance row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          padding: "12px 16px",
          background: "#1a1a2e",
          fontSize: 13,
        }}>
          <span style={{ color: "rgba(255,255,255,.6)", fontWeight: 500 }}>Balance</span>
          <span style={{ color: "#fff", fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>₹56,350</span>
        </div>
      </div>
    </div>
  );
};

export default Home;