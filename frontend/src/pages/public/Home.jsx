// // pages/public/Home.jsx

// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center">

//       <h1 className="text-4xl font-bold mb-4">
//         Expense Tracker
//       </h1>

//       <p className="mb-6">
//         Manage your income and expenses
//       </p>

//       <div className="flex gap-4">

//         <Link
//           to="/login"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Login
//         </Link>

//         <Link
//           to="/register"
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Register
//         </Link>

//       </div>

//     </div>
//   );
// };

// export default Home;

// pages/public/Home.jsx
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Home = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    let animId;
    let pts = [];

    const resize = () => {
      cvs.width = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
      init();
    };

    const init = () => {
      pts = Array.from({ length: 55 }, () => ({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      for (let p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cvs.width) p.vx *= -1;
        if (p.y < 0 || p.y > cvs.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,169,110,0.35)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(200,169,110,${0.06 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{ background: "#0a0a0f", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)" }} />

      {/* Floating cards */}
      <div className="absolute top-16 left-10 rounded-xl p-4 "
        style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", animation: "floatA 6s ease-in-out infinite" }}>
        <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Monthly Savings</p>
        <p className="text-lg font-medium text-white">$2,840</p>
        <p className="text-xs mt-1" style={{ color: "#6ecba0" }}>↑ 12.4% this month</p>
      </div>

      <div className="absolute bottom-20 right-12 rounded-xl p-4 h"
        style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", animation: "floatB 7s ease-in-out infinite" }}>
        <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Top Expense</p>
        <p className="text-lg font-medium text-white">Housing</p>
        <p className="text-xs mt-1" style={{ color: "#e07070" }}>$1,200 · 34% of budget</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="mb-8 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
          style={{ background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)" }}>
          Personal Finance
        </span>

        <h1 className="mb-5 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px,8vw,64px)", fontWeight: 900, color: "#fff" }}>
          Track Every{" "}
          <span style={{ background: "linear-gradient(135deg, #c8a96e, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Rupee.
          </span>
        </h1>

        <p className="mb-10 max-w-sm" style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", fontWeight: 300, lineHeight: 1.7 }}>
          Gain clarity on your finances. Log income, track spending, and watch your savings grow.
        </p>

        <div className="flex gap-3">
          <Link to="/register"
            className="font-medium rounded-lg px-7 py-3 text-sm transition-opacity hover:opacity-80"
            style={{ background: "linear-gradient(135deg, #c8a96e, #e8c86a)", color: "#0a0a0f" }}>
            Get Started
          </Link>
          <Link to="/login"
            className="rounded-lg px-7 py-3 text-sm transition-all hover:border-white/50 hover:text-white"
            style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "0.5px solid rgba(255,255,255,0.2)" }}>
            Login
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-12">
          {[["50K+", "Users"], ["$2M+", "Tracked"], ["99%", "Uptime"]].map(([num, lbl], i) => (
            <div key={lbl} className="flex items-center gap-8">
              {i > 0 && <div className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.1)" }} />}
              <div className="text-center">
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#c8a96e", fontWeight: 700 }}>{num}</p>
                <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{lbl}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
      `}</style>
    </div>
  );
};

export default Home;