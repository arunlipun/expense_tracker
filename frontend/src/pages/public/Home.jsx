// pages/public/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const TICKER_ITEMS = [
  "Groceries  ₹3,200","Rent  ₹12,000","Electricity  ₹980","Transport  ₹1,450",
  "Dining  ₹2,700","Medical  ₹560","Entertainment  ₹890","EMI  ₹8,500",
  "Insurance  ₹2,100","Petrol  ₹1,800","Salary  ₹55,000","Freelance  ₹18,000",
];
const TICKER = [...TICKER_ITEMS, ...TICKER_ITEMS];

const LEDGER_ROWS = [
  { label: "Salary",     amount: "+₹55,000", color: "#16A34A" },
  { label: "Rent",       amount: "−₹12,000", color: "#E5532D" },
  { label: "Groceries",  amount: "−₹3,200",  color: "#E5532D" },
  { label: "Freelance",  amount: "+₹18,000", color: "#16A34A" },
  { label: "Transport",  amount: "−₹1,450",  color: "#E5532D" },
];

const FEATURES = [
  { icon: "📊", bg: "#EEF2FF", title: "Smart Categorisation", desc: "Groceries, EMI, petrol — Kharcha auto-tags your entries. No manual work." },
  { icon: "📈", bg: "#ECFDF5", title: "Visual Trends",        desc: "See monthly patterns at a glance. Know exactly where your money flows." },
  { icon: "🎯", bg: "#FFF7ED", title: "Budget Goals",         desc: "Set limits per category. Get a heads-up before you overshoot." },
  { icon: "📅", bg: "#FDF2F8", title: "Recurring Entries",    desc: "Rent, SIP, subscriptions — log once, auto-repeat every month." },
  { icon: "🔒", bg: "#EFF6FF", title: "Private & Secure",     desc: "Your data stays yours. No bank linking, no third-party read access." },
  { icon: "📤", bg: "#F0FDF4", title: "Export Anytime",       desc: "Download your full ledger as CSV or PDF — for taxes or peace of mind." },
];

const STEPS = [
  { title: "Create your free account",         desc: "Just email + password. No credit card, no KYC." },
  { title: "Add your first transaction",        desc: "Type the amount, pick a category, hit save. Done in 10 seconds." },
  { title: "Watch your money story unfold",     desc: "Charts, trends and balance — updated instantly as you log." },
];

const TESTIMONIALS = [
  { initials: "PR", bg: "#2D5BE3", name: "Priya R.",  location: "Bengaluru", stars: 5, text: '"Finally an expense app that doesnot ask me to link my bank. Simple, fast, honest. I have been using it daily for 3 months."' },
  { initials: "AK", bg: "#16A34A", name: "Ankit K.",  location: "Jaipur",    stars: 5, text: '"Mujhe spreadsheets se nafrat thi. Kharcha ne sab badal diya — 2 minutes mein poora mahine ka hisaab."' },
  { initials: "SM", bg: "#E5532D", name: "Sneha M.",  location: "Pune",      stars: 4, text: '"The recurring entries feature is a game changer. My rent and SIP log themselves. I just check in once a week."' },
];

const BLOG_POSTS = [
  { emoji: "💰", bg: "#EEF2FF", tagBg: "#EEF2FF", tagColor: "#3730A3", tag: "Budgeting", title: "The 50/30/20 rule — does it work for Indian salaries?",      meta: "5 min read · June 2025" },
  { emoji: "📉", bg: "#ECFDF5", tagBg: "#ECFDF5", tagColor: "#065F46", tag: "Savings",   title: "Why tracking spending beats budgeting for most people",     meta: "4 min read · May 2025" },
  { emoji: "🎯", bg: "#FFF7ED", tagBg: "#FFF7ED", tagColor: "#92400E", tag: "Goals",     title: "How I saved ₹1 lakh in 8 months on a ₹40k salary",         meta: "7 min read · April 2025" },
];

const FAQS = [
  { q: "Is Kharcha free?",                  a: "Yes, completely. No premium plan, no credit card required. All features are free forever." },
  { q: "Do you link to my bank account?",   a: "No. Kharcha is 100% manual entry. Your bank credentials never leave your device." },
  { q: "Can I export my data?",             a: "Yes. You can download your full ledger as CSV or PDF any time from the dashboard." },
  { q: "Which currencies are supported?",   a: "Currently only INR (₹). Multi-currency support is on the roadmap for late 2025." },
  { q: "Is my data private?",               a: "Absolutely. Your data is encrypted at rest. We do not share or sell it to any third party." },
];

/* ─── Sub-components ────────────────────────────────────────────── */

const Eyebrow = ({ text, center }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16, ...(center && { justifyContent: "center" }) }}>
    <div style={{ width: 24, height: 2, background: "#2D5BE3" }} />
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#2D5BE3", fontFamily: "'Sora', sans-serif" }}>{text}</span>
    {center && <div style={{ width: 24, height: 2, background: "#2D5BE3" }} />}
  </div>
);

const Divider = () => <div style={{ width: "100%", height: 1, background: "rgba(26,26,46,.07)" }} />;

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{ borderBottom: "1px solid rgba(26,26,46,.08)", padding: "16px 0", cursor: "pointer" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>
        {q}
        <span style={{ fontSize: 20, color: "#6B7280", transition: "transform .2s", transform: open ? "rotate(45deg)" : "none", display: "inline-block" }}>+</span>
      </div>
      {open && <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, marginTop: 10 }}>{a}</p>}
    </div>
  );
};

/* ─── Main component ─────────────────────────────────────────────── */

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    const draw = () => {
      cvs.width = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      const lineSpacing = 44;
      ctx.strokeStyle = "rgba(26,26,46,0.045)";
      ctx.lineWidth = 1;
      for (let y = lineSpacing; y < cvs.height; y += lineSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cvs.width, y); ctx.stroke();
      }
      ctx.strokeStyle = "rgba(45,91,227,0.12)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(64, 0); ctx.lineTo(64, cvs.height); ctx.stroke();
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF7", fontFamily: "'Inter', sans-serif", color: "#1a1a2e", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

        .ticker-wrap { overflow: hidden; width: 100%; }
        .ticker-track { display: flex; gap: 0; animation: ticker 28s linear infinite; width: max-content; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-track:hover { animation-play-state: paused; }

        .btn-primary {
          background: #1a1a2e; color: #FAFAF7; border: none;
          padding: 12px 26px; font-family: 'Sora', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: .04em;
          border-radius: 4px; cursor: pointer; transition: background .2s, transform .15s;
          text-decoration: none; display: inline-block;
        }
        .btn-primary:hover { background: #2D5BE3; transform: translateY(-1px); }

        .btn-ghost {
          background: transparent; color: #1a1a2e;
          border: 1.5px solid #1a1a2e; padding: 11px 26px;
          font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 500;
          letter-spacing: .04em; border-radius: 4px; cursor: pointer;
          transition: all .2s; text-decoration: none; display: inline-block;
        }
        .btn-ghost:hover { border-color: #2D5BE3; color: #2D5BE3; transform: translateY(-1px); }

        .feature-card {
          background: #fff; border: 1px solid rgba(26,26,46,.09);
          border-radius: 10px; padding: 24px; transition: box-shadow .2s;
        }
        .feature-card:hover { box-shadow: 0 4px 20px rgba(45,91,227,.1); }

        .blog-card {
          background: #fff; border: 1px solid rgba(26,26,46,.08);
          border-radius: 10px; overflow: hidden; transition: transform .2s;
        }
        .blog-card:hover { transform: translateY(-2px); }

        .footer-link {
          color: #9CA3AF; font-size: 13px; text-decoration: none;
          display: block; margin-bottom: 10px; transition: color .2s;
        }
        .footer-link:hover { color: #FAFAF7; }

        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hero-h1 { font-size: 38px !important; }
          .nav-links { display: none !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Ledger canvas — only on hero area */}
      <div style={{ position: "relative" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

        {/* ── Nav ─────────────────────────────────────────────────── */}
        <nav style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: "1px solid rgba(26,26,46,.07)", background: "rgba(250,250,247,.9)", backdropFilter: "blur(8px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "#2D5BE3", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>₹</span>
            </div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#1a1a2e", letterSpacing: "-.2px" }}>Kharcha</span>
          </div>
          <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <a href="#features" style={{ fontSize: 13, color: "#6B7280", textDecoration: "none", fontWeight: 500 }}>Features</a>
            <a href="#how"      style={{ fontSize: 13, color: "#6B7280", textDecoration: "none", fontWeight: 500 }}>How it works</a>
            <a href="#blog"     style={{ fontSize: 13, color: "#6B7280", textDecoration: "none", fontWeight: 500 }}>Blog</a>
            <a href="#faq"      style={{ fontSize: 13, color: "#6B7280", textDecoration: "none", fontWeight: 500 }}>FAQ</a>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link to="/login"    className="btn-ghost"   style={{ padding: "9px 20px" }}>Sign in</Link>
            <Link to="/register" className="btn-primary" style={{ padding: "9px 20px" }}>Get started</Link>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <main style={{ position: "relative", zIndex: 10, padding: "72px 48px 60px 96px", maxWidth: 780 }}>
          <Eyebrow text="Personal finance, simplified" />
          <h1 className="hero-h1" style={{ fontFamily: "'Sora', sans-serif", fontSize: 56, fontWeight: 800, color: "#1a1a2e", lineHeight: 1.07, letterSpacing: "-1.5px", margin: "0 0 22px" }}>
            Every rupee<br />
            <span style={{ fontWeight: 300, color: "#6B7280", letterSpacing: "-.5px" }}>deserves a line</span><br />
            in the ledger.
          </h1>
          <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.75, maxWidth: 430, marginBottom: 36 }}>
            Log income, track spending, and spot where your money actually goes — without spreadsheets.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link to="/register" className="btn-primary">Open your account</Link>
            <Link to="/login"    className="btn-ghost">Sign in</Link>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 28, borderTop: "1px solid rgba(26,26,46,.08)" }}>
            {[["₹12L+", "tracked this week"], ["8 categories", "auto-classified"], ["2 min", "to your first entry"]].map(([num, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 700, color: "#1a1a2e" }}>{num}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3, fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ── Ticker ──────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(26,26,46,.08)", borderBottom: "1px solid rgba(26,26,46,.08)", padding: "13px 0", background: "#F0F0EC" }}>
        <div className="ticker-wrap">
          <div className="ticker-track">
            {TICKER.map((item, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, padding: "0 28px", fontSize: 13, fontWeight: 500, color: "#1a1a2e", fontFamily: "'Sora', sans-serif", whiteSpace: "nowrap" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: i % 3 === 0 ? "#2D5BE3" : i % 3 === 1 ? "#16A34A" : "#E5532D", display: "inline-block" }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="features" style={{ padding: "72px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow text="Features" center />
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.8px", marginBottom: 12 }}>Built for the way Indians spend</h2>
          <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>From chai to EMI — every category that matters, already set up.</p>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {FEATURES.map(({ icon, bg, title, desc }) => (
            <div key={title} className="feature-card">
              <div style={{ width: 38, height: 38, borderRadius: 8, background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 18 }}>{icon}</div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</div>
              <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── How it works ─────────────────────────────────────────── */}
      <section id="how" style={{ padding: "72px 48px" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <Eyebrow text="How it works" />
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.8px", marginBottom: 12 }}>Up and running in minutes</h2>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, marginBottom: 36 }}>No tutorials needed. If you can fill a cheque, you can use Kharcha.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {STEPS.map(({ title, desc }, i) => (
                <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1a1a2e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                    <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ledger card */}
          <div style={{ background: "#fff", border: "1px solid rgba(26,26,46,.1)", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(26,26,46,.06)" }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(26,26,46,.06)", background: "#F5F5F2" }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#9CA3AF", textTransform: "uppercase" }}>June 2025 — Ledger</span>
            </div>
            {LEDGER_ROWS.map(({ label, amount, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 18px", borderBottom: "1px solid rgba(26,26,46,.05)", fontSize: 13 }}>
                <span style={{ color: "#6B7280", fontWeight: 500 }}>{label}</span>
                <span style={{ color, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>{amount}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 18px", background: "#1a1a2e" }}>
              <span style={{ color: "rgba(255,255,255,.6)", fontWeight: 500, fontSize: 13 }}>Balance</span>
              <span style={{ color: "#fff", fontWeight: 800, fontFamily: "'Sora', sans-serif", fontSize: 14 }}>₹56,350</span>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section style={{ padding: "72px 48px", background: "#F0F0EC" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow text="Testimonials" center />
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.8px" }}>People who keep their ledger clean</h2>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {TESTIMONIALS.map(({ initials, bg, name, location, stars, text }) => (
            <div key={name} style={{ background: "#fff", border: "1px solid rgba(26,26,46,.08)", borderRadius: 10, padding: 22 }}>
              <div style={{ color: "#F59E0B", fontSize: 14, marginBottom: 12 }}>{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>{text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>{initials}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e" }}>{name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Blog ─────────────────────────────────────────────────── */}
      <section id="blog" style={{ padding: "72px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <Eyebrow text="From the blog" />
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.8px", marginBottom: 0 }}>Money clarity, one read at a time</h2>
          </div>
          <a href="/blog" className="btn-ghost" style={{ whiteSpace: "nowrap" }}>All posts →</a>
        </div>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {BLOG_POSTS.map(({ emoji, bg, tagBg, tagColor, tag, title, meta }) => (
            <div key={title} className="blog-card">
              <div style={{ height: 120, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{emoji}</div>
              <div style={{ padding: 18 }}>
                <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: tagBg, color: tagColor, marginBottom: 10 }}>{tag}</span>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, lineHeight: 1.4, marginBottom: 8, color: "#1a1a2e" }}>{title}</div>
                <p style={{ fontSize: 12, color: "#9CA3AF" }}>{meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section id="faq" style={{ padding: "72px 48px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow text="FAQ" center />
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-.8px" }}>Aapke sawaal, hamare jawaab</h2>
          </div>
          {FAQS.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
        </div>
      </section>

      <Divider />

      {/* ── CTA Banner ───────────────────────────────────────────── */}
      <section style={{ padding: "64px 48px", textAlign: "center", background: "#1a1a2e" }}>
        <Eyebrow text="Start today" center />
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 800, color: "#FAFAF7", letterSpacing: "-.8px", marginBottom: 14 }}>
          Your first entry is free.<br />And the rest too.
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 36 }}>No premium tier. No hidden limits. Just your hisaab — clear and honest.</p>
        <Link to="/register" className="btn-primary" style={{ background: "#2D5BE3", fontSize: 14, padding: "14px 36px" }}>Open your account →</Link>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{ background: "#111827", padding: "56px 48px 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 26, height: 26, background: "#2D5BE3", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>₹</span>
              </div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#FAFAF7" }}>Kharcha</span>
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7, maxWidth: 220 }}>A simple ledger for every rupee — built with ❤️ in India.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a href="#" style={{ color: "#6B7280", fontSize: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", padding: "6px 14px", borderRadius: 4 }}>Twitter</a>
              <a href="#" style={{ color: "#6B7280", fontSize: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,.12)", padding: "6px 14px", borderRadius: 4 }}>Instagram</a>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#4B5563", marginBottom: 16 }}>Product</div>
            <a href="#features" className="footer-link">Features</a>
            <a href="#how"      className="footer-link">How it works</a>
            <Link to="/register" className="footer-link">Get started</Link>
            <Link to="/login"    className="footer-link">Sign in</Link>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#4B5563", marginBottom: 16 }}>Resources</div>
            <a href="#blog" className="footer-link">Blog</a>
            <a href="#faq"  className="footer-link">FAQ</a>
            <a href="#"     className="footer-link">Changelog</a>
            <a href="#"     className="footer-link">Roadmap</a>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#4B5563", marginBottom: 16 }}>Legal</div>
            <a href="#" className="footer-link">Privacy policy</a>
            <a href="#" className="footer-link">Terms of use</a>
            <a href="#" className="footer-link">Contact us</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "#4B5563" }}>© 2025 Kharcha. Made in India.</p>
          <p style={{ fontSize: 12, color: "#4B5563" }}>Har rupaye ka hisaab</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;