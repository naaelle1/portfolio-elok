import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ── Design tokens (matches About/Skills) ─────────────────────── */
const C = {
  cream:   "#FAF8F3",
  ink:     "#111111",
  blue:    "#2460F7",
  blueLt:  "#EBF0FF",
  blueMd:  "#DCE8FF",
  pink:    "#FFD9EB",
  pinkDk:  "#E8407A",
  lav:     "#DCD6FF",
  lavDk:   "#7B61FF",
  lime:    "#C8FF57",
  muted:   "#6B6860",
};

/* ── Shared animation variants ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay } },
});
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Star SVGs ────────────────────────────────────────────────── */
const Star4 = ({ size = 16, color = "#111" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
    <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill={color} />
  </svg>
);

/* ── Tag chip ─────────────────────────────────────────────────── */
function Tag({ label, dark }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 11px",
      borderRadius: 99,
      border: "2px solid #111",
      fontSize: 10.5,
      fontWeight: 700,
      letterSpacing: "0.05em",
      background: dark ? C.ink : "#fff",
      color: dark ? C.lime : C.ink,
      fontFamily: "'DM Mono', monospace",
      boxShadow: "1.5px 1.5px 0 #111",
    }}>{label}</span>
  );
}

/* ── Mock browser preview ─────────────────────────────────────── */
function BrowserMock({ bg = C.blueLt, hovered }) {
  return (
    <motion.div
      animate={{ scale: hovered ? 1.04 : 1, rotate: hovered ? -1 : 0 }}
      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        width: 250, background: "#fff",
        border: "2.5px solid #111", borderRadius: 12,
        overflow: "hidden", boxShadow: "5px 5px 0 rgba(17,17,17,0.2)",
        position: "relative", zIndex: 1,
      }}
    >
      {/* Browser bar */}
      <div style={{ background: C.blueLt, borderBottom: "2px solid #111", padding: "7px 10px", display: "flex", gap: 5, alignItems: "center" }}>
        {[C.pinkDk, C.lime, C.blue].map((c, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, border: "1.5px solid rgba(17,17,17,0.15)" }} />
        ))}
        <div style={{ flex: 1, background: "#fff", borderRadius: 4, height: 8, marginLeft: 6, border: "1px solid rgba(17,17,17,0.1)" }} />
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 12, background: C.blue, borderRadius: 4, width: "70%" }} />
        <div style={{ height: 7, background: "#eee", borderRadius: 4, width: "90%" }} />
        <div style={{ height: 7, background: "#eee", borderRadius: 4, width: "75%" }} />
        <div style={{ display: "flex", gap: 5, marginTop: 4 }}>
          <div style={{ height: 22, width: 60, background: C.pink, borderRadius: 6, border: "1.5px solid #111" }} />
          <div style={{ height: 22, width: 50, background: C.lime, borderRadius: 6, border: "1.5px solid #111" }} />
        </div>
        <div style={{ height: 48, background: "#F8F8F8", borderRadius: 6, border: "1.5px solid #eee", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.blueLt, border: "2px solid #111" }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Project card ─────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger(index * 0.07)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: "2.5px solid #111",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: hovered ? "6px 6px 0 #111" : "3px 3px 0 #111",
        transform: hovered ? "translate(-2px,-2px)" : "translate(0,0)",
        transition: "box-shadow 0.18s cubic-bezier(0.34,1.56,0.64,1), transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {/* Card header */}
      <div style={{
        background: project.headerBg,
        height: 160,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "2.5px solid #111",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.05) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          zIndex: 0,
        }} />

        {project.image ? (
          <motion.img
            src={project.image}
            alt={`${project.title} Preview`}
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: "80%",
              height: "75%",
              objectFit: "cover",
              borderRadius: 10,
              border: "2px solid #111",
              boxShadow: "3px 3px 0 #111",
              zIndex: 1,
            }}
          />
        ) : (
          <motion.div
            animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: 1 }}
          >
            <Star4 size={36} color={C.ink} />
          </motion.div>
        )}

        {/* FIX PERTAMA: Menghapus teks typo kata 'Mention' yang menempel di tag div ini */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: "#fff", border: "2px solid #111", borderRadius: 99,
          padding: "3px 10px", fontSize: 9.5, fontWeight: 800,
          letterSpacing: "0.08em", fontFamily: "'DM Mono', monospace",
          color: "#111", boxShadow: "1.5px 1.5px 0 #111",
          zIndex: 2,
        }}>{project.category}</div>
        
        <div style={{
          position: "absolute", bottom: 10, right: 12,
          fontSize: 28, fontWeight: 900, color: "#111",
          opacity: 0.07, fontFamily: "'DM Mono', monospace",
          zIndex: 2,
        }}>{String(index + 1).padStart(2, "0")}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#111", letterSpacing: "-0.02em", lineHeight: 1.2, fontFamily: "'Space Grotesk', sans-serif" }}>
            {project.title}
          </div>
          <div style={{ fontSize: 12.5, color: "#666", marginTop: 6, lineHeight: 1.55, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {project.desc}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto" }}>
          {project.tags.map(t => <Tag key={t} label={t} />)}
        </div>
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 8,
            width: "100%",
            padding: "10px 0",
            border: "2px solid #111",
            borderRadius: 12,
            background: hovered ? C.ink : "#F8F8F8",
            color: hovered ? "#fff" : "#111",
            fontWeight: 800,
            fontSize: 11.5,
            letterSpacing: "0.08em",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            boxShadow: "2px 2px 0 #111",
            transition: "background 0.15s ease, color 0.15s ease",
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          VIEW PROJECT →
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ── MAIN COMPONENT ───────────────────────────────────────────── */
export default function PortfolioSection() {
  const [featHovered, setFeatHovered] = useState(false);
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const headerView = useInView(headerRef, { once: true });

  /* Parallax for deco elements */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const decoY1 = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"]);
  const decoY2 = useTransform(scrollYProgress, [0, 1], ["15px", "-15px"]);

  /* ── More projects data ── */
  const PROJECTS = [
    {
      id: 1,
      title: "Mindpace",
      category: "Web App",
      desc: "A study and productivity web platform developed during Coding Camp 2026, selected as Top 15 Best Capstone Projects for its responsive design and collaborative development.",
      tags: ["React", "JavaScript", "CSS", "Figma"],
      headerBg: C.pink,
      link: "https://mindpace-ruddy.vercel.app",
      image: "public\\assets\\assets\\Screenshot 2026-05-17 190534.png",
    },
    {
      id: 2,
      title: "RFID Attendance Dashboard",
      category: "UI/UX Design",
      desc: "Dashboard interface for RFID-based attendance system, designed to monitor attendance records, manage student data, and track check-in history.",
      tags: ["Figma", "Dashboard", "RFID"],
      headerBg: C.blueMd,
      link: "https://www.figma.com/design/4iybXLacSUuQvCd2WqXCwQ/Dashboard-IoT?node-id=121-54&t=xdpk2V0phxnpWS5S-1",
      image: "/assets/assets/Desktop - 4.png",
    },
     {
      id: 3,
      title: "Abyss Marine Website",
      category: "Web Design",
      desc: "Collaborative website project exploring the beauty of Banda Sea. Contributed to UI design, visual layout, and frontend asset integration.",
      tags: ["Figma", "HTML", "CSS"],
      headerBg: C.blueLt,
      link: "https://abyss-banda.vercel.app/",
      image: "/assets/assets/Screenshot 2026-05-18 215120.png",
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&family=DM+Mono:wght@500;700&display=swap');
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes spinSlow { to { transform: rotate(360deg) } }
        .port-float { animation: floatY 3.5s ease-in-out infinite; }
        .port-spin  { animation: spinSlow 12s linear infinite; }
        @media (max-width: 700px) {
          .feat-inner { flex-direction: column !important; }
          .feat-preview { min-width: unset !important; height: 200px !important; border-right: none !important; border-bottom: 2.5px solid #111 !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* FIX KEDUA: Memastikan properti position: "relative" berada di baris pertama inline style agar useScroll Framer Motion dapat menghitung offset tinggi secara akurat */}
      <section
        ref={sectionRef}
        id="portfolio"
        style={{
          position: "relative",
          background: C.cream,
          backgroundImage: `linear-gradient(rgba(17,17,17,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.04) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          padding: "80px 24px 96px",
          overflow: "hidden",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {/* Parallax deco */}
        <motion.div style={{ y: decoY1, position: "absolute", top: 48, left: 32, zIndex: 2, opacity: 0.6 }} className="port-spin">
          <Star4 size={22} color={C.blue} />
        </motion.div>
        <motion.div style={{ y: decoY2, position: "absolute", top: 64, right: 44, zIndex: 2, opacity: 0.5 }}>
          <Star4 size={15} color={C.pinkDk} />
        </motion.div>

        {/* Corner label */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "#000000", border: "2px solid #111", borderRadius: "0 0 0 14px",
          padding: "6px 16px", fontSize: 9.5, fontWeight: 800,
          letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace",
          boxShadow: "-2px 2px 0 #111",
        }}>2026 SELECTED WORKS</div>

        {/* ── HEADER ── */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          style={{ textAlign: "center", marginBottom: 56, position: "relative", zIndex: 3 }}
        >
          {/* Eyebrow */}
          <motion.div variants={stagger(0)} style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.blueLt, border: "2px solid #111", borderRadius: 20,
              padding: "5px 16px", fontSize: 10, fontWeight: 800,
              letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace",
              boxShadow: "2px 2px 0 #111", color: "#111"
            }}>
              <Star4 size={8} color={C.blue} /> CREATIVE WORKS <Star4 size={8} color={C.blue} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div variants={stagger(0.05)} style={{ position: "relative", display: "inline-block" }}>
            <div aria-hidden style={{
              position: "absolute", top: 5, left: 5,
              fontSize: "clamp(54px,9vw,88px)", fontWeight: 900,
              color: C.blueLt, WebkitTextStroke: `2.5px #111`,
              letterSpacing: "-0.04em", lineHeight: 1,
              pointerEvents: "none", userSelect: "none",
            }}>PORTFOLIO</div>
            <h2 style={{
              fontSize: "clamp(54px,9vw,88px)", fontWeight: 900, color: "#111",
              letterSpacing: "-0.04em", lineHeight: 1, position: "relative",
            }}>PORTFOLIO</h2>
          </motion.div>

          <motion.p variants={stagger(0.1)} style={{
            marginTop: 16, fontSize: 14, color: C.muted,
            maxWidth: 360, marginInline: "auto", lineHeight: 1.65,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            A collection of selected projects and creative works.
          </motion.p>
        </motion.div>

        {/* ── FEATURED (Portfolio ini sendiri) ── */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          style={{ maxWidth: 960, marginInline: "auto", marginBottom: 52 }}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ height: 2.5, width: 28, background: "#111" }} />
            <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>
              FEATURED PROJECT
            </span>
          </motion.div>

          <motion.a
            href="https://portfolio-elok-7n7i3z9jc-naaelle1s-projects.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            variants={scaleIn}
            onMouseEnter={() => setFeatHovered(true)}
            onMouseLeave={() => setFeatHovered(false)}
            style={{
              display: "block",
              background: "#fff",
              border: "3px solid #111",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: featHovered ? "8px 8px 0 #111" : "4px 4px 0 #111",
              transform: featHovered ? "translate(-2px,-2px)" : "translate(0,0)",
              transition: "box-shadow 0.2s cubic-bezier(0.34,1.56,0.64,1), transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <div className="feat-inner" style={{ display: "flex" }}>
              <div className="feat-preview" style={{
                background: C.blueLt,
                minWidth: 340,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                borderRight: "3px solid #111",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `linear-gradient(rgba(36,96,247,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(36,96,247,0.08) 1px, transparent 1px)`,
                  backgroundSize: "28px 28px",
                }} />
                <BrowserMock hovered={featHovered} />
                <div style={{
                  position: "absolute", top: 14, right: 14,
                  background: C.pink, border: "2px solid #111", borderRadius: 10,
                  padding: "4px 10px", fontSize: 10, fontWeight: 800,
                  fontFamily: "'DM Mono', monospace", color: "#111",
                  boxShadow: "2px 2px 0 #111", transform: "rotate(3deg)",
                }}>CURRENT ✦</div>
              </div>

              <div style={{ padding: "36px 36px 36px 32px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                <div>
                  <div style={{
                    fontSize: 10.5, fontWeight: 800, letterSpacing: "0.1em",
                    fontFamily: "'DM Mono', monospace", color: C.blue, marginBottom: 8,
                  }}>PERSONAL PROJECT</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#111", letterSpacing: "-0.03em", lineHeight: 1.15, fontFamily: "'Space Grotesk', sans-serif" }}>
                    Personal Portfolio Website
                  </div>
                </div>
                <p style={{ fontSize: 13.5, color: "#666", lineHeight: 1.65, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  A clean and interactive personal space designed to present professional projects, creative works, and technical skills with high performance and optimized user experience.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["React", "Framer Motion", "JavaScript", "Figma"].map(t => <Tag key={t} label={t} dark />)}
                </div>
              </div>
            </div>
          </motion.a>
        </motion.div>

        {/* ── GRID LABEL ── */}
        <div style={{ maxWidth: 960, marginInline: "auto", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ height: 2.5, width: 28, background: "#111" }} />
          <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.1em", fontFamily: "'DM Mono', monospace" }}>
            MORE PROJECTS
          </span>
          <div style={{ flex: 1, height: 1.5, background: "#111", opacity: 0.1 }} />
          <span style={{ fontSize: 10.5, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "#888" }}>02 works</span>
        </div>

        {/* ── PROJECTS GRID (2 Kolom Pas) ── */}
        <div className="proj-grid" style={{
          maxWidth: 960, marginInline: "auto",
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18,
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </section>
    </>
  );
}