import { useState, useEffect, useRef } from "react";

/* ── Fonts & Global Styles ─────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream:   #FAF8F3;
      --ink:     #111111;
      --blue:    #2460F7;
      --blue-lt: #EBF0FF;
      --pink:    #F5C6D8;
      --pink-dk: #E8407A;
      --lav:     #E4DEFF;
      --lav-dk:  #7B61FF;
      --lime:    #C8FF57;
      --white:   #FFFFFF;
      --muted:   #6B6860;
      --border:  2.5px solid #111;
      --shadow:  4px 4px 0 #111;
      --shadow-sm: 3px 3px 0 #111;
    }

    body { background: var(--cream); }

    .sg  { font-family: 'Space Grotesk',   system-ui, sans-serif; }
    .pj  { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }

    .card {
      background: #fff;
      border: var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow);
    }
    .card-sm {
      background: #fff;
      border: var(--border);
      border-radius: 14px;
      box-shadow: var(--shadow-sm);
    }

    .lift {
      transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s;
    }
    .lift:hover {
      transform: translate(-2px,-3px);
      box-shadow: 6px 7px 0 #111;
    }

    .pol-a { transform: rotate(-1.8deg); }
    .pol-b { transform: rotate(0.8deg);  }
    .pol-c { transform: rotate(-0.5deg); }
    .pol-a:hover, .pol-b:hover, .pol-c:hover { transform: rotate(0deg) translate(-2px,-3px); box-shadow: 7px 8px 0 #111; }

    .bar-track { height:8px; background:#EAE8E2; border-radius:99px; border:1.5px solid #111; overflow:hidden; }
    .bar-fill  { height:100%; border-radius:99px; transform:scaleX(0); transform-origin:left; transition:transform 1.1s cubic-bezier(.16,1,.3,1); }
    .bar-fill.run { transform:scaleX(1); }

    .tool-box {
      display:flex; flex-direction:column; align-items:center; gap:7px;
      padding:14px 10px;
      background:#fff; border:2px solid #111; border-radius:14px;
      box-shadow:3px 3px 0 #111;
      cursor:default;
      transition:transform .15s cubic-bezier(.34,1.56,.64,1), box-shadow .15s;
    }
    .tool-box:hover { transform:translate(-2px,-2px); box-shadow:5px 5px 0 #111; }

    .badge {
      display:inline-flex; align-items:center; gap:5px;
      border:2px solid #111; border-radius:999px;
      padding:5px 14px; font-size:12px; font-weight:700;
      box-shadow:2px 2px 0 #111;
      white-space:nowrap;
    }

    .sticker {
      display:inline-flex; align-items:center; gap:6px;
      border:2px solid #111; border-radius:8px;
      padding:4px 12px; font-size:11px; font-weight:700;
      letter-spacing:.05em; text-transform:uppercase;
      transform:rotate(-2deg);
      box-shadow:2px 2px 0 #111;
    }

    .divider { width:100%; height:2.5px; background:#111; }

    @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes spin   { to{transform:rotate(360deg)} }
    @keyframes wiggle { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }

    .float  { animation: floatY 3s ease-in-out infinite; }
    .wiggle { animation: wiggle 2.5s ease-in-out infinite; }
    .spin   { animation: spin 8s linear infinite; }

    ::-webkit-scrollbar { width:6px; }
    ::-webkit-scrollbar-track { background:var(--cream); }
    ::-webkit-scrollbar-thumb { background:#ccc; border-radius:3px; }

    /* ── RESPONSIVE ─────────────────────────────────────────────── */

    /* About grid: 3col → 1col on mobile */
    .about-grid {
      display: grid;
      grid-template-columns: 1.05fr 1.1fr .95fr;
      gap: 22px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 600px) {
      .about-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Skills tools grid: 2col → 1col on small */
    .skills-tools-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 36px;
    }
    @media (max-width: 640px) {
      .skills-tools-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Tool icon grid: 4col → responsive */
    .tool-icons-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    @media (max-width: 480px) {
      .tool-icons-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
      }
    }

    /* Section padding: shrink on mobile */
    .section-about {
      padding: 64px 48px 72px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-skills {
      padding: 72px 48px 80px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-sep {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 48px;
    }

    @media (max-width: 768px) {
      .section-about { padding: 40px 24px 48px; }
      .section-skills { padding: 48px 24px 56px; }
      .section-sep { padding: 0 24px; }
    }
    @media (max-width: 480px) {
      .section-about { padding: 28px 16px 36px; }
      .section-skills { padding: 36px 16px 44px; }
      .section-sep { padding: 0 16px; }
    }

    /* About heading */
    .about-heading {
      font-size: clamp(52px, 8vw, 96px);
      font-weight: 800;
      line-height: .92;
      letter-spacing: -3px;
      color: #111;
    }
    @media (max-width: 480px) {
      .about-heading { letter-spacing: -1.5px; }
    }

    /* Skills heading */
    .skills-heading {
      font-size: clamp(44px, 7vw, 84px);
      font-weight: 800;
      letter-spacing: -2.5px;
      line-height: .9;
      color: #111;
    }
    @media (max-width: 480px) {
      .skills-heading { letter-spacing: -1.5px; }
    }

    /* Skills header row: row → col on mobile */
    .skills-header-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 48px;
      position: relative;
    }
    @media (max-width: 640px) {
      .skills-header-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 32px;
      }
    }

    /* Soft skills badges: wrap nicely */
    .softskill-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    /* Bottom deco stars: hide some on mobile */
    .deco-stars { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 56px; }
    @media (max-width: 480px) { .deco-stars { margin-top: 32px; gap: 8px; } }

    /* Education middle col: hide on 900-col-2 layout, show again on 1col */
    @media (max-width: 900px) and (min-width: 601px) {
      .edu-col { grid-column: 1 / -1; }
    }

    /* Open to work badge */
    .open-badge {
      margin-top: 24px;
      padding: 14px 18px;
      background: #C8FF57;
      border: 2.5px solid #111;
      border-radius: 14px;
      box-shadow: 4px 4px 0 #111;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Proficiency card padding */
    .proficiency-card {
      padding: 34px 36px;
      margin-bottom: 28px;
    }
    @media (max-width: 480px) {
      .proficiency-card { padding: 22px 18px; }
    }

    /* Tool box text slightly smaller on very small screens */
    @media (max-width: 360px) {
      .tool-box { padding: 10px 6px; }
      .tool-box span { font-size: 9px !important; }
    }

    /* About header row */
    .about-header-row {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 48px;
      position: relative;
    }
    @media (max-width: 480px) {
      .about-header-row { margin-bottom: 28px; gap: 16px; }
    }

    /* Floating stars: hide some on mobile to avoid overflow */
    .float-star-right {
      position: absolute;
      right: 40px;
      top: 10px;
      opacity: 0.8;
    }
    .float-star-right2 {
      position: absolute;
      right: 90px;
      top: 40px;
      opacity: 0.5;
    }
    .float-star-right3 {
      position: absolute;
      right: 160px;
      top: 0;
      opacity: 0.45;
    }
    @media (max-width: 480px) {
      .float-star-right  { right: 8px; }
      .float-star-right2 { right: 36px; }
      .float-star-right3 { display: none; }
    }
  `}</style>
);

/* ── Decorative SVGs ───────────────────────────────────────────── */
const Star4 = ({ size = 16, color = "#111" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true">
    <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill={color} />
  </svg>
);
const Star6 = ({ size = 14, color = "#111" }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true">
    <polygon points="7,0 8.5,5.5 14,7 8.5,8.5 7,14 5.5,8.5 0,7 5.5,5.5" fill={color} />
  </svg>
);
const ArrowCurved = ({ style }) => (
  <svg width="44" height="36" viewBox="0 0 44 36" fill="none" style={style} aria-hidden="true">
    <path d="M2 4 C10 2 28 2 38 18" stroke="#111" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    <path d="M34 12 L38 18 L30 19" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const ArrowDown = ({ style }) => (
  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" style={style} aria-hidden="true">
    <path d="M12 2 L12 26" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4 20 L12 28 L20 20" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Tool Icons ─────────────────────────────────────────────────── */
const FigmaIcon = () => (
  <svg width="26" height="26" viewBox="0 0 38 57" aria-label="Figma">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z" fill="#FF7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
  </svg>
);
const PSIcon = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" aria-label="Photoshop">
    <rect width="100" height="100" rx="18" fill="#001E36" />
    <text x="50" y="68" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="44" fill="#31A8FF">Ps</text>
  </svg>
);
const AIIcon = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" aria-label="Illustrator">
    <rect width="100" height="100" rx="18" fill="#300F00" />
    <text x="50" y="68" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="44" fill="#FF9A00">Ai</text>
  </svg>
);
const CanvaIcon = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" aria-label="Canva">
    <rect width="100" height="100" rx="18" fill="#7D2AE8" />
    <text x="50" y="68" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="44" fill="#fff">Cv</text>
  </svg>
);
const HTMLIcon = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" aria-label="HTML">
    <rect width="100" height="100" rx="18" fill="#E34F26" />
    <text x="50" y="62" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="30" fill="#fff">HTML</text>
  </svg>
);
const CSSIcon = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" aria-label="CSS">
    <rect width="100" height="100" rx="18" fill="#264DE4" />
    <text x="50" y="62" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="32" fill="#fff">CSS</text>
  </svg>
);
const JSIcon = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" aria-label="JavaScript">
    <rect width="100" height="100" rx="18" fill="#F7DF1E" />
    <text x="50" y="66" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="36" fill="#222">JS</text>
  </svg>
);
const ReactIcon = () => (
  <svg width="26" height="26" viewBox="0 0 100 100" aria-label="React">
    <rect width="100" height="100" rx="18" fill="#20232A" />
    <ellipse cx="50" cy="50" rx="10" ry="10" fill="#61DAFB" />
    <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="4.5" fill="none" />
    <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="4.5" fill="none" transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="38" ry="14" stroke="#61DAFB" strokeWidth="4.5" fill="none" transform="rotate(120 50 50)" />
  </svg>
);

/* ── Skill Bar ──────────────────────────────────────────────────── */
function Bar({ label, pct, color, delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setOn(true), delay); }, { threshold: .3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="sg" style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{label}</span>
        <span className="sg" style={{ fontSize: 13, fontWeight: 600, color: "#666" }}>{pct}%</span>
      </div>
      <div className="bar-track">
        <div className={`bar-fill${on ? " run" : ""}`}
          style={{ background: color, transform: on ? `scaleX(${pct / 100})` : "scaleX(0)", transitionDelay: `${delay}ms` }} />
      </div>
    </div>
  );
}

/* ── Education Thumb ─────────────────────────────────────────────── */
function EduThumb({ initials, bg }) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: 12, border: "2.5px solid #111",
      background: bg, display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <span className="sg" style={{ fontSize: 16, fontWeight: 800, color: "#111", opacity: .35 }}>{initials}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function AboutSection() {

  const designTools = [
    { name: "Figma",       icon: <FigmaIcon /> },
    { name: "Photoshop",   icon: <PSIcon /> },
    { name: "Illustrator", icon: <AIIcon /> },
    { name: "Canva",       icon: <CanvaIcon /> },
  ];
  const devTools = [
    { name: "HTML",        icon: <HTMLIcon /> },
    { name: "CSS",         icon: <CSSIcon /> },
    { name: "JavaScript",  icon: <JSIcon /> },
    { name: "React",       icon: <ReactIcon /> },
  ];

  const education = [
    { level: "Elementary School",  name: "SD Negeri Petompon 01", period: "2015–2021", initials: "SD",  bg: "#EBF0FF", tilt: "pol-a", dot: "#2460F7" },
    { level: "Junior High School", name: "SMP Negeri 5 Semarang",  period: "2021–2024", initials: "SMP", bg: "#F5C6D8", tilt: "pol-b", dot: "#E8407A" },
    { level: "Vocational HS",      name: "SMK Negeri 7 Semarang",  period: "2024–2028", initials: "SMK", bg: "#E4DEFF", tilt: "pol-c", dot: "#7B61FF" },
  ];

  return (
    <div className="pj" style={{ background: "#FAF8F3", minHeight: "100vh" }}>
      <G />

      {/* ══════════ ABOUT ME ══════════════════════════════════════ */}
      <section id="about" className="section-about">

        {/* Header row */}
        <div className="about-header-row">
          <div style={{ position: "relative" }}>
            <h1 className="sg about-heading">
              ABOUT<br />ME
            </h1>
            <div style={{
              width: "100%", height: 5, background: "#2460F7",
              borderRadius: 3, marginTop: 8, border: "1.5px solid #111",
            }} />
          </div>

          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <div className="sticker wiggle" style={{ background: "#F5C6D8", color: "#111" }}>
              <Star4 size={10} /> WHO AM I?
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <ArrowCurved style={{ opacity: .7 }} />
              <span className="sg" style={{ fontSize: 12, fontWeight: 600, color: "#666", letterSpacing: ".02em" }}>
                scroll down
              </span>
            </div>
          </div>

          <div className="float float-star-right"><Star4 size={22} color="#2460F7" /></div>
          <div className="float float-star-right2" style={{ animationDelay: "1s" }}><Star6 size={14} color="#E8407A" /></div>
          <div className="float float-star-right3" style={{ animationDelay: "1.8s" }}><Star4 size={12} color="#7B61FF" /></div>
        </div>

        {/* 3-col (→ 2-col → 1-col) grid */}
        <div className="about-grid">

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Intro */}
            <div className="card lift" style={{ padding: "26px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2460F7", border: "2px solid #111" }} />
                <span className="sg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#666" }}>Intro</span>
              </div>
              <p className="pj" style={{ fontSize: 14.5, lineHeight: 1.8, color: "#333" }}>
                I'm a student passionate about <strong style={{ color: "#2460F7" }}>UI/UX design</strong>,
                web development, and building meaningful digital experiences.
              </p>
              <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Designer", "Developer", "Student"].map((t, i) => (
                  <span key={i} className="badge pj" style={{ background: ["#EBF0FF","#F5C6D8","#E4DEFF"][i], fontSize: 11 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Family Background */}
            <div className="card lift" style={{ padding: "26px 24px", background: "#EBF0FF" }}>
              <div style={{ position: "relative", marginBottom: 16 }}>
                <div style={{
                  position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)",
                  width: 44, height: 14, background: "rgba(255,255,255,.7)",
                  border: "1.5px solid rgba(0,0,0,.12)", borderRadius: 3,
                }} />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8407A", border: "2px solid #111" }} />
                  <span className="sg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#555" }}>Family Background</span>
                </div>
              </div>
              <p className="pj" style={{ fontSize: 14.5, lineHeight: 1.8, color: "#333" }}>
                I come from a supportive family environment that motivates me to keep learning and growing.
              </p>
              <div style={{ marginTop: 16, padding: "10px 14px", background: "#fff", borderRadius: 10, border: "1.5px solid #111" }}>
                <span className="sg" style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>Based in</span>
                <p className="sg" style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 1 }}>Semarang, Indonesia</p>
              </div>
            </div>

            {/* Currently Learning */}
            <div className="card-sm lift" style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8FF57", border: "2px solid #111" }} />
                <span className="sg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#666" }}>Currently Learning</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {["React.js & Component Design", "Motion Design Principles", "Design Systems"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2460F7", flexShrink: 0 }} />
                    <span className="pj" style={{ fontSize: 13, color: "#444" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE: Education */}
          <div className="edu-col">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ padding: "6px 14px", background: "#111", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <Star4 size={10} color="#C8FF57" />
                <span className="sg" style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: ".06em", textTransform: "uppercase" }}>Education</span>
              </div>
              <ArrowDown style={{ opacity: .4, marginLeft: 6 }} />
            </div>

            <div style={{ position: "relative", paddingLeft: 28 }}>
              <div style={{
                position: "absolute", left: 8, top: 16, bottom: 16,
                width: 2.5,
                background: "repeating-linear-gradient(to bottom, #111 0, #111 6px, transparent 6px, transparent 12px)",
              }} />
              {education.map((edu, i) => (
                <div key={i} style={{ position: "relative", marginBottom: i < 2 ? 20 : 0 }}>
                  <div style={{
                    position: "absolute", left: -23, top: 22,
                    width: 16, height: 16, borderRadius: "50%",
                    background: edu.dot, border: "2.5px solid #111",
                    boxShadow: "0 0 0 3px #FAF8F3", zIndex: 2,
                  }} />
                  <div className={`card lift ${edu.tilt}`} style={{ padding: "12px 14px 18px", background: "#fff", cursor: "pointer" }}>
                    <div style={{
                      position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)",
                      width: 46, height: 15, background: "rgba(255,255,255,.75)",
                      border: "1.5px solid rgba(0,0,0,.13)", borderRadius: 3, zIndex: 3,
                    }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <EduThumb initials={edu.initials} bg={edu.bg} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#999", letterSpacing: ".07em", textTransform: "uppercase", display: "block", marginBottom: 3 }}>
                          {edu.level}
                        </span>
                        <p className="sg" style={{ fontSize: 13.5, fontWeight: 700, color: "#111", lineHeight: 1.25, marginBottom: 8 }}>
                          {edu.name}
                        </p>
                        <span className="sg" style={{
                          display: "inline-block",
                          background: edu.bg, border: "1.5px solid #111",
                          borderRadius: 6, padding: "2px 10px",
                          fontSize: 11, fontWeight: 700, color: "#111",
                        }}>
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="open-badge">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#111" }} />
                <span className="sg" style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Open to Internships</span>
              </div>
              <Star4 size={13} />
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Interests */}
            <div className="card lift" style={{ padding: "26px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7B61FF", border: "2px solid #111" }} />
                <span className="sg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#666" }}>Interests</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[["UI/UX Design","#EBF0FF"],["Typography","#E4DEFF"],["Web Dev","#F5C6D8"],["Motion Design","#EBF0FF"],["Branding","#E4DEFF"],["Open Source","#FAF8F3"]].map(([t, bg], i) => (
                  <span key={i} className="badge sg" style={{ background: bg, fontSize: 11 }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Career Goal */}
            <div className="card lift" style={{ padding: "28px 24px", background: "#111", border: "2.5px solid #111" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#C8FF57", border: "1.5px solid #fff" }} />
                <span className="sg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#aaa" }}>Career Goal</span>
              </div>
              <p className="sg" style={{ fontSize: 19, fontWeight: 800, color: "#fff", lineHeight: 1.25, letterSpacing: "-.5px", marginBottom: 12 }}>
                Become a UI/UX Designer at a product-driven company.
              </p>
              <p className="pj" style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>
                Building intuitive, accessible products that solve real human problems.
              </p>
              <div style={{ marginTop: 18, borderTop: "1px solid #2A2A2A", paddingTop: 14 }}>
                <span className="sg" style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: ".06em" }}>
                  Target — 2025 & beyond
                </span>
              </div>
            </div>

            {/* Hobbies */}
            <div className="card-sm lift" style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8407A", border: "2px solid #111" }} />
                <span className="sg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#666" }}>Hobbies</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {["Sketching & Illustration","Listening to Music","Browsing Design Refs","Photography"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#E8407A", flexShrink: 0 }} />
                    <span className="pj" style={{ fontSize: 13, color: "#444" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-sep">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div className="divider" style={{ flex: 1 }} />
          <Star4 size={16} color="#2460F7" />
          <Star6 size={12} color="#E8407A" />
          <Star4 size={12} color="#7B61FF" />
          <div className="divider" style={{ flex: 1 }} />
        </div>
      </div>

      {/* ══════════ MY SKILLS ═════════════════════════════════════ */}
      <section id="skills" className="section-skills">

        {/* Header */}
        <div className="skills-header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span className="sticker pj" style={{ background: "#2460F7", color: "#fff", transform: "rotate(1deg)", borderColor: "#2460F7" }}>
                MY TOOLBOX
              </span>
              <div className="float" style={{ animationDelay: ".5s" }}><Star4 size={14} color="#E8407A" /></div>
            </div>
            <h2 className="sg skills-heading">MY<br />SKILLS</h2>
          </div>
          <div style={{ maxWidth: 320 }}>
            <p className="pj" style={{ fontSize: 15, lineHeight: 1.75, color: "#666" }}>
              Tools and technologies I work with to design and build digital products.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["#EBF0FF","#F5C6D8","#E4DEFF"].map((c, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "2px solid #111", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Star6 size={12} color="#111" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools 2-col */}
        <div className="skills-tools-grid">

          {/* Design Tools */}
          <div className="card" style={{ padding: "28px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2460F7", border: "2px solid #111" }} />
              <span className="sg" style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#111" }}>Design Tools</span>
              <div style={{ flex: 1, height: 1.5, background: "#E5E3DD" }} />
            </div>
            <div className="tool-icons-grid">
              {designTools.map((t, i) => (
                <div key={i} className="tool-box">
                  <div style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</div>
                  <span className="sg" style={{ fontSize: 10.5, fontWeight: 700, color: "#111", textAlign: "center" }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Development */}
          <div className="card" style={{ padding: "28px 26px", background: "#EBF0FF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111", border: "2px solid #111" }} />
              <span className="sg" style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#111" }}>Development</span>
              <div style={{ flex: 1, height: 1.5, background: "#C5D0F0" }} />
            </div>
            <div className="tool-icons-grid">
              {devTools.map((t, i) => (
                <div key={i} className="tool-box" style={{ background: "#fff" }}>
                  <div style={{ width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</div>
                  <span className="sg" style={{ fontSize: 10.5, fontWeight: 700, color: "#111", textAlign: "center" }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proficiency bars */}
        <div className="card proficiency-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <span className="sg" style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#111" }}>Proficiency</span>
            <div className="sticker pj" style={{ background: "#E4DEFF", transform: "rotate(1deg)", fontSize: 10, color: "#111" }}>
              <Star4 size={8} color="#7B61FF" /> Self-assessed
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <Bar label="UI/UX Design"         pct={85} color="#2460F7" delay={0}   />
            <Bar label="Frontend Development" pct={75} color="#7B61FF" delay={120} />
            <Bar label="Graphic Design"       pct={80} color="#E8407A" delay={240} />
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span className="sg" style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#999" }}>Soft Skills</span>
            <div style={{ flex: 1, height: 1.5, background: "#E5E3DD" }} />
          </div>
          <div className="softskill-badges">
            {[
              ["Problem Solver",   "#EBF0FF", "#2460F7"],
              ["Creative Thinker", "#F5C6D8", "#E8407A"],
              ["Team Player",      "#E4DEFF", "#7B61FF"],
              ["Fast Learner",     "#C8FF57", "#111"],
              ["Detail-oriented",  "#FAF8F3", "#111"],
            ].map(([label, bg, color], i) => (
              <span key={i} className="badge sg" style={{
                background: bg, color, fontSize: 12,
                padding: "7px 18px",
                transform: `rotate(${[-1.5,1,-0.5,1.5,-1][i]}deg)`,
              }}>
                <Star4 size={9} color={color} /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom deco */}
        <div className="deco-stars">
          {["#2460F7","#E8407A","#7B61FF","#C8FF57","#111"].map((c, i) => (
            <div key={i} className={i === 2 ? "spin" : "float"} style={{ animationDelay: `${i * .4}s` }}>
              <Star4 size={[14,10,18,11,9][i]} color={c} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}