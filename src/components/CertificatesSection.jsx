import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ── Design tokens ──────────────────────────────────────────────── */
const C = {
  bg:      "#FAF8F3",
  ink:     "#111111",
  blue:    "#2460F7",
  blueLt:  "#EBF0FF",
  blueMd:  "#DCE8FF",
  pink:    "#FFD9EB",
  pinkDk:  "#E8407A",
  lav:     "#DCD6FF",
  lavDk:   "#7B61FF",
  lime:    "#C8FF57",
  cream:   "#F5F0E8",
};

const CARD_HEADERS = [C.cream, C.blueLt, C.pink, C.lav, C.cream, C.blueLt, C.pink, C.lav, C.cream, C.blueLt, C.pink, C.lav, C.cream];
const TAG_COLORS   = [C.blueLt, C.pink, C.lav];

/* ── Data ─────────────────────────────────────────────────────────── */
const CERTS = [
  { id:1,  image:"/assets/Certificates/Sertifikat peserta olimpiade IT ARA 7.0.png",                                    title:"Olimpiade IT ARA 7.0 Participant",                      issuer:"ITS Sepuluh Nopember", year:"2026", tag:"Competition" },
  { id:2,  image:"/assets/Certificates/[Coding Camp 2026] Best Capstone - CFS102D6X432.pdf",                            title:"Best Capstone Project — Coding Camp 2026",              issuer:"Coding Camp",          year:"2026", tag:"Achievement" },
  { id:3,  image:"/assets/Certificates/[Coding Camp 2026] Certificate - CFS102D6X432.pdf",                              title:"Coding Camp 2026 Completion Certificate",               issuer:"Coding Camp",          year:"2026", tag:"Bootcamp" },
  { id:4,  image:"/assets/Certificates/sertifikat_course_Belajar Back-End Pemula dengan JavaScript.pdf",                title:"Belajar Membuat Aplikasi Back-End untuk Pemula",        issuer:"Dicoding Indonesia",   year:"2026", tag:"Backend" },
  { id:5,  image:"/assets/Certificates/sertifikat_course_Belajar Membuat Front-End Web untuk Pemula.pdf",               title:"Belajar Membuat Front-End Web untuk Pemula",            issuer:"Dicoding Indonesia",   year:"2026", tag:"Frontend" },
  { id:6,  image:"/assets/Certificates/sertifikat_course_Belajar Dasar Pemrograman JavaScript.pdf",                     title:"Belajar Dasar Pemrograman JavaScript",                  issuer:"Dicoding Indonesia",   year:"2026", tag:"Language" },
  { id:7,  image:"/assets/Certificates/sertifikat_course_Belajar Dasar Pemrograman Web.pdf",                            title:"Belajar Dasar Pemrograman Web",                         issuer:"Dicoding Indonesia",   year:"2026", tag:"Frontend" },
  { id:8,  image:"/assets/Certificates/sertifikat_course_Pengenalan ke Logika Pemrograman (Programming Logic 101).pdf", title:"Pengenalan ke Logika Pemrograman (Logic 101)",          issuer:"Dicoding Indonesia",   year:"2026", tag:"Basic" },
  { id:9,  image:"/assets/Certificates/sertifikat_course_Belajar Dasar Cloud dan Gen AI di AWS.pdf",                    title:"Belajar Dasar Cloud dan Gen AI di AWS",                 issuer:"Dicoding x AWS",       year:"2026", tag:"Cloud / AI" },
  { id:10, image:"/assets/Certificates/sertifikat_course_ Memulai Dasar Pemrograman untuk Menjadi Pengembang Software.pdf", title:"Memulai Dasar Pemrograman untuk Menjadi Software Developer", issuer:"Dicoding Indonesia", year:"2026", tag:"Basic" },
  { id:11, image:"/assets/Certificates/Sertifikat Peserta SIC6 Stage 1.pdf",                                            title:"Samsung Innovation Campus Stage 1",                     issuer:"Samsung",              year:"2025", tag:"Bootcamp" },
  { id:12, image:"/assets/Certificates/Sertifikat Cisco Elok Chandra Kirana.pdf",                                       title:"Cisco Networking Academy Certificate",                  issuer:"Cisco",                year:"2025", tag:"Networking" },
  { id:13, image:"/assets/Certificates/INTERNET OF THINGS Iot & Networking Competition 2025.png",                       title:"Internet of Things & Networking Essentials",            issuer:"Cisco / PENS",         year:"2025", tag:"IoT" },
];

/* ── useIsMobile hook ───────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 640 : false);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

/* ── Shared SVG decoratives ─────────────────────────────────────── */
const Star4 = ({ size = 16, color = "#111" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
    <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill={color} />
  </svg>
);

/* ── Folder ─────────────────────────────────────────────────────── */
function Folder({ open, onClick, isMobile }) {
  const folderW = isMobile ? 210 : 260;
  const folderH = isMobile ? 136 : 168;

  const papers = [
    { bg: "#FFFFFF", idleRot: "-5deg", openRot: "-8deg" },
    { bg: C.pink,    idleRot: "0deg",  openRot: "0deg"  },
    { bg: C.lav,     idleRot: "4deg",  openRot: "7deg"  },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 9, fontWeight: 800, fontFamily: "'DM Mono',monospace", letterSpacing: "0.12em", color: C.ink, opacity: 0.35 }}>
        — open archive —
      </span>
      <motion.button
        onClick={onClick}
        aria-label={open ? "Close folder" : "Open folder"}
        whileHover={{ y: open ? 0 : -4 }}
        whileTap={{ scale: 0.97 }}
        style={{
          all: "unset", cursor: "pointer", display: "block", width: folderW, userSelect: "none",
          filter: open ? `drop-shadow(5px 5px 0 ${C.ink})` : `drop-shadow(3px 3px 0 ${C.ink})`,
          transition: "filter 0.22s ease",
        }}
      >
        {/* Tab */}
        <div style={{
          width: 84, height: 22, background: C.blue, border: `2.5px solid ${C.ink}`,
          borderBottom: "none", borderRadius: "6px 6px 0 0", marginLeft: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 900, letterSpacing: "0.1em",
          fontFamily: "'DM Mono',monospace", color: "#fff",
        }}>CERTS</div>

        {/* Body */}
        <div style={{
          width: "100%", height: folderH, background: C.blueLt,
          border: `2.5px solid ${C.ink}`, borderRadius: "0 10px 10px 10px",
          position: "relative", overflow: "hidden",
          transform: open ? "scale(1.015)" : "scale(1)",
          transition: "transform 0.18s ease",
        }}>
          {papers.map((p, i) => (
            <div key={i} style={{
              position: "absolute", width: "68%", height: isMobile ? 80 : 100,
              background: p.bg, border: `1.5px solid ${C.ink}`, borderRadius: 5,
              bottom: open ? (isMobile ? 22 + i * 24 : 28 + i * 30) : 8 + i * 5,
              left: "50%",
              transform: `translateX(-50%) rotate(${open ? p.openRot : p.idleRot})`,
              transition: `bottom ${0.3 + i * 0.07}s cubic-bezier(0.34,1.56,0.64,1), transform ${0.3 + i * 0.07}s cubic-bezier(0.34,1.56,0.64,1)`,
              zIndex: i + 1,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: 10,
            }}>
              <div style={{ width: "70%", height: 3, background: C.ink, borderRadius: 2, opacity: 0.1 }} />
              <div style={{ width: "50%", height: 3, background: C.ink, borderRadius: 2, opacity: 0.07 }} />
              <div style={{ width: "60%", height: 3, background: C.ink, borderRadius: 2, opacity: 0.07 }} />
              <div style={{ marginTop: 5, display: "flex", flexDirection: "column", gap: 3, opacity: 0.25 }}>
                <div style={{ width: 22, height: 2, background: C.ink, borderRadius: 1 }} />
                <div style={{ width: 16, height: 2, background: C.ink, borderRadius: 1 }} />
                <div style={{ width: 20, height: 2, background: C.ink, borderRadius: 1 }} />
              </div>
            </div>
          ))}
          {/* Flap */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: open ? 20 : 56, background: C.blue,
            borderTop: `2px solid ${C.ink}`, borderRadius: "5px 5px 0 0",
            transition: "height 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            display: "flex", alignItems: "flex-start",
            justifyContent: "center", paddingTop: 5, zIndex: 10,
          }}>
            <span style={{
              fontSize: 9, fontWeight: 900, fontFamily: "'DM Mono',monospace",
              letterSpacing: "0.12em", color: "#fff",
              opacity: open ? 0 : 1, transition: "opacity 0.1s",
            }}>CLICK TO OPEN</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

/* ── Stat card ───────────────────────────────────────────────────── */
function StatCard({ n, label, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        background: "#fff", border: `2.5px solid ${C.ink}`, borderRadius: 12,
        padding: "12px 18px", textAlign: "center", boxShadow: `3px 3px 0 ${C.ink}`,
        minWidth: 90,
      }}
    >
      <div style={{
        fontSize: 24, fontWeight: 900, color: C.ink,
        fontFamily: "'DM Mono',monospace", lineHeight: 1,
        background: accent, borderRadius: 6, padding: "4px 10px",
        border: `1.5px solid ${C.ink}`, display: "inline-block", marginBottom: 7,
      }}>{n}</div>
      <div style={{ fontSize: 9, fontWeight: 800, color: "#777", letterSpacing: "0.12em", fontFamily: "'DM Mono',monospace", textTransform: "uppercase" }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ── Circular gallery ────────────────────────────────────────────── */
function CircularGallery({ items, onItemClick, isMobile }) {
  const trackRef = useRef(null);
  const posRef   = useRef(0);
  const velRef   = useRef(0);
  const dragRef  = useRef(false);
  const lastXRef = useRef(0);
  const rafRef   = useRef(null);
  const [hovIdx, setHovIdx] = useState(null);

  const CARD_W = isMobile ? 168 : 212;
  const GAP    = isMobile ? 12 : 16;
  const STEP   = CARD_W + GAP;
  const CARD_H = isMobile ? 236 : 276;
  const IMG_H  = isMobile ? 118 : 148;
  const N = items.length;
  const TILTS = items.map((_, i) => ((i * 83 + 17) % 11 - 5.5) * 0.44);

  const updateCards = useCallback(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll(".cg-card");
    const wrap  = STEP * N;
    const center = trackRef.current.offsetWidth / 2;
    cards.forEach((card, i) => {
      let x = i * STEP - posRef.current;
      x = ((x % wrap) + wrap) % wrap;
      if (x > wrap / 2) x -= wrap;
      const dist  = Math.abs(x) / center;
      const scale = Math.max(0.78, 1 - dist * 0.16);
      const op    = Math.max(0.36, 1 - dist * 0.48);
      card.style.transform = `translateX(${x + center - CARD_W / 2}px) scale(${scale})`;
      card.style.opacity   = op;
      card.style.zIndex    = String(Math.round(100 - Math.abs(x)));
    });
  }, [N, STEP, CARD_W]);

  useEffect(() => {
    const loop = () => {
      if (!dragRef.current) {
        velRef.current *= 0.91;
        posRef.current += velRef.current;
        const wrap = STEP * N;
        posRef.current = ((posRef.current % wrap) + wrap) % wrap;
      }
      updateCards();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [N, STEP, updateCards]);

  const startDrag = x => { dragRef.current = true; lastXRef.current = x; velRef.current = 0; };
  const moveDrag  = x => {
    if (!dragRef.current) return;
    const dx = x - lastXRef.current;
    velRef.current  = -dx * 1.4;
    posRef.current -= dx;
    lastXRef.current = x;
    updateCards();
  };
  const endDrag = () => { dragRef.current = false; };

  return (
    <div
      style={{ position: "relative", width: "100%", overflow: "hidden", height: CARD_H + 32, cursor: "grab" }}
      onMouseDown={e => startDrag(e.pageX)}
      onMouseMove={e => moveDrag(e.pageX)}
      onMouseUp={endDrag} onMouseLeave={endDrag}
      onTouchStart={e => { e.preventDefault(); startDrag(e.touches[0].pageX); }}
      onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].pageX); }}
      onTouchEnd={endDrag}
    >
      <div ref={trackRef} style={{ position: "absolute", inset: 0 }}>
        {items.map((item, i) => {
          const hdrBg = CARD_HEADERS[i % CARD_HEADERS.length];
          const tagBg = TAG_COLORS[i % 3];
          const isHov = hovIdx === i;
          return (
            <button key={item.id} className="cg-card"
              onClick={() => onItemClick(i)}
              onMouseEnter={() => setHovIdx(i)}
              onMouseLeave={() => setHovIdx(null)}
              aria-label={`View ${item.title}`}
              style={{
                all: "unset", cursor: "pointer",
                position: "absolute", top: 10, left: 0,
                width: CARD_W, height: CARD_H,
                background: "#fff", border: `2.5px solid ${C.ink}`,
                borderRadius: 12, overflow: "hidden",
                boxShadow: isHov ? `5px 5px 0 ${C.ink}` : `3px 3px 0 ${C.ink}`,
                transformOrigin: "center center",
                display: "flex", flexDirection: "column",
                transition: "box-shadow 0.14s ease",
              }}
            >
              {/* Card header */}
              <div style={{
                width: "100%", height: IMG_H, background: hdrBg,
                borderBottom: `2.5px solid ${C.ink}`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                position: "relative", gap: 8,
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0,
                  width: 0, height: 0,
                  borderTop: `13px solid ${C.ink}`,
                  borderRight: "13px solid transparent",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `linear-gradient(rgba(17,17,17,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.04) 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }} />

                {item.image.toLowerCase().endsWith(".pdf") ? (
                  <>
                    <svg width="32" height="40" viewBox="0 0 36 44" fill="none" style={{ position: "relative", zIndex: 1 }}>
                      <rect x="1" y="1" width="28" height="36" rx="3" fill="#fff" stroke={C.ink} strokeWidth="2"/>
                      <path d="M29 1 L35 7 L29 7 Z" fill={hdrBg} stroke={C.ink} strokeWidth="1.5" strokeLinejoin="round"/>
                      <rect x="29" y="7" width="6" height="30" rx="2" fill="#fff" stroke={C.ink} strokeWidth="1.5"/>
                      <line x1="7" y1="14" x2="23" y2="14" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="7" y1="20" x2="23" y2="20" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="7" y1="26" x2="17" y2="26" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: 9, fontWeight: 900, fontFamily: "'DM Mono',monospace", color: C.ink, letterSpacing: "0.1em", opacity: 0.45, position: "relative", zIndex: 1 }}>PDF</span>
                  </>
                ) : (
                  <img src={item.image} alt={item.title} draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }} />
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: isMobile ? "8px 10px 10px" : "10px 12px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{
                  display: "inline-block", background: tagBg,
                  border: `1.5px solid ${C.ink}`, borderRadius: 20,
                  fontSize: 8, fontWeight: 900, padding: "2px 8px",
                  letterSpacing: "0.07em", fontFamily: "'DM Mono',monospace", color: C.ink,
                  boxShadow: `1px 1px 0 ${C.ink}`, alignSelf: "flex-start",
                  transform: `rotate(${TILTS[i] * 0.55}deg)`,
                }}>{item.tag}</div>

                <div style={{ fontSize: isMobile ? 10 : 12, fontWeight: 800, lineHeight: 1.33, color: C.ink, flex: 1 }}>
                  {item.title}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: isMobile ? 9 : 10, color: "#666", fontFamily: "'DM Mono',monospace", fontWeight: 600, opacity: 0.65 }}>
                    {item.issuer}
                  </span>
                  <span style={{
                    background: C.blue, color: "#fff",
                    borderRadius: 4, fontSize: 9, fontWeight: 900,
                    padding: "1px 7px", fontFamily: "'DM Mono',monospace",
                  }}>{item.year}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Edge fades */}
      <div style={{ position: "absolute", inset: "0 auto 0 0", width: 48, background: `linear-gradient(to right, ${C.bg}, transparent)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "0 0 0 auto", width: 48, background: `linear-gradient(to left, ${C.bg}, transparent)`, pointerEvents: "none" }} />
    </div>
  );
}

/* ── Modal ───────────────────────────────────────────────────────── */
function Modal({ cert, current, total, onClose, onPrev, onNext, isMobile }) {
  const hdrBg = CARD_HEADERS[current % CARD_HEADERS.length];

  useEffect(() => {
    const fn = e => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  const navBtn = {
    padding: isMobile ? "7px 14px" : "8px 22px",
    background: "#fff",
    border: `2.5px solid ${C.ink}`, borderRadius: 8,
    fontWeight: 900, fontSize: isMobile ? 12 : 13, cursor: "pointer",
    boxShadow: `3px 3px 0 ${C.ink}`,
    fontFamily: "'DM Sans',sans-serif", color: C.ink,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(17,17,17,0.55)",
        display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center",
        zIndex: 9999, padding: isMobile ? 0 : 20,
      }}
    >
      <motion.div
        initial={{ scale: isMobile ? 1 : 0.82, y: isMobile ? "100%" : 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: isMobile ? 1 : 0.88, y: isMobile ? "100%" : 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", border: `2.5px solid ${C.ink}`,
          borderRadius: isMobile ? "18px 18px 0 0" : 18,
          boxShadow: `7px 7px 0 ${C.ink}`,
          width: "100%", maxWidth: isMobile ? "100%" : 640,
          overflow: "hidden",
          maxHeight: isMobile ? "92vh" : "auto",
          overflowY: "auto",
        }}
      >
        {/* Header bar */}
        <div style={{
          background: hdrBg, borderBottom: `2.5px solid ${C.ink}`,
          padding: "10px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 2,
        }}>
          <div style={{ display: "flex", gap: 6 }}>
            {[C.pinkDk, C.lime, C.blue].map((col, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: col, border: `1.5px solid ${C.ink}` }} />
            ))}
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, fontFamily: "'DM Mono',monospace", letterSpacing: "0.1em", color: C.ink, opacity: 0.55 }}>
            archive · {current + 1} / {total}
          </span>
          <button onClick={onClose} aria-label="Close" style={{
            width: 28, height: 28, background: "#fff", border: `2px solid ${C.ink}`,
            borderRadius: 6, fontWeight: 900, fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `2px 2px 0 ${C.ink}`, color: C.ink,
          }}>✕</button>
        </div>

        {/* Preview */}
        {cert.image.toLowerCase().endsWith(".pdf") ? (
          <iframe src={cert.image} title={cert.title}
            style={{ width: "100%", height: isMobile ? 260 : 380, border: "none", display: "block", borderBottom: `2.5px solid ${C.ink}`, background: "#f5f1ea" }} />
        ) : (
          <img src={cert.image} alt={cert.title}
            style={{ width: "100%", height: isMobile ? 220 : 300, objectFit: "cover", display: "block", borderBottom: `2.5px solid ${C.ink}` }} />
        )}

        {/* Info */}
        <div style={{ padding: isMobile ? "14px 16px 20px" : "18px 22px 22px" }}>
          <div style={{
            display: "inline-block", background: hdrBg,
            border: `2px solid ${C.ink}`, borderRadius: 20, fontSize: 10,
            fontWeight: 900, padding: "3px 12px", fontFamily: "'DM Mono',monospace",
            letterSpacing: "0.08em", color: C.ink, boxShadow: `2px 2px 0 ${C.ink}`, marginBottom: 10,
          }}>{cert.tag}</div>

          <div style={{ fontSize: isMobile ? 16 : 19, fontWeight: 900, color: C.ink, lineHeight: 1.2, marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>
            {cert.title}
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{
              background: C.blue, color: "#fff", border: `2px solid ${C.ink}`,
              borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 900,
              fontFamily: "'DM Mono',monospace", boxShadow: `2px 2px 0 #444`,
            }}>{cert.issuer}</span>
            <span style={{
              background: hdrBg, color: C.ink, border: `2px solid ${C.ink}`,
              borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 900,
              fontFamily: "'DM Mono',monospace", boxShadow: `2px 2px 0 ${C.ink}`,
            }}>{cert.year}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={onPrev} style={navBtn}>← Prev</button>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {Array.from({ length: Math.min(total, 7) }).map((_, i) => (
                <div key={i} style={{
                  width: i === (current % 7) ? 20 : 8, height: 8,
                  borderRadius: 4, border: `1.5px solid ${C.ink}`,
                  background: i === (current % 7) ? C.blue : "transparent",
                  transition: "width 0.2s ease, background 0.2s ease",
                }} />
              ))}
            </div>
            <button onClick={onNext} style={navBtn}>Next →</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── MAIN SECTION ────────────────────────────────────────────────── */
export default function CertificatesSection() {
  const isMobile = useIsMobile();
  const [open,     setOpen]     = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [modalIdx, setModalIdx] = useState(null);
  const galleryRef  = useRef(null);
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const inView      = useInView(sectionRef, { once: true, margin: "-80px" });
  const headerInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const decoY1 = useTransform(scrollYProgress, [0, 1], ["-18px", "18px"]);
  const decoY2 = useTransform(scrollYProgress, [0, 1], ["14px", "-14px"]);

  const toggleFolder = () => {
    if (!open) {
      setOpen(true);
      setTimeout(() => {
        setRevealed(true);
        setTimeout(() => galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
      }, 340);
    } else {
      setOpen(false);
      setRevealed(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800;900&family=DM+Mono:wght@500;700;900&family=DM+Sans:wght@400;500;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .cert-spin  { animation: spinSlow 14s linear infinite; }
        .cert-spin-r{ animation: spinSlow 20s linear infinite reverse; }
        .gallery-wrap { animation: fadeUp 0.42s cubic-bezier(0.22,1,0.36,1) both; }
        .cg-card:active { cursor: grabbing; }
        /* Prevent body scroll when modal open on mobile */
        body.modal-open { overflow: hidden; }
      `}</style>

      <section
        ref={sectionRef}
        id="certificates"
        style={{
          fontFamily: "'DM Sans',sans-serif",
          background: C.bg,
          backgroundImage: `linear-gradient(rgba(17,17,17,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.04) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          minHeight: "100vh",
          padding: isMobile ? "60px 16px 72px" : "80px 24px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Parallax deco stars ── */}
        {!isMobile && (
          <>
            <motion.div style={{ y: decoY1, position: "absolute", top: 52, left: 36, zIndex: 2, opacity: 0.7 }} className="cert-spin">
              <Star4 size={22} color={C.blue} />
            </motion.div>
            <motion.div style={{ y: decoY2, position: "absolute", top: 46, right: 52, zIndex: 2, opacity: 0.5 }} className="cert-spin-r">
              <Star4 size={16} color={C.lav} />
            </motion.div>
            <motion.div style={{ y: decoY1, position: "absolute", bottom: 76, left: 30, zIndex: 2, opacity: 0.4 }}>
              <Star4 size={12} color={C.pinkDk} />
            </motion.div>
          </>
        )}
        {isMobile && (
          <div style={{ position: "absolute", top: 20, left: 16, zIndex: 2, opacity: 0.5 }} className="cert-spin">
            <Star4 size={14} color={C.blue} />
          </div>
        )}

        {/* Corner bracket deco */}
        {!isMobile && (
          <svg style={{ position: "absolute", bottom: 60, right: 38, opacity: 0.18, zIndex: 2 }} width="36" height="36" viewBox="0 0 36 36">
            <path d="M36 0 L36 16 M36 0 L20 0" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" />
            <path d="M0 36 L0 20 M0 36 L16 36" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3 3" />
          </svg>
        )}

        {/* Certified sticker */}
        <div style={{
          position: "absolute", top: isMobile ? 16 : 80, right: isMobile ? 12 : 26, zIndex: 4,
          padding: "4px 10px", background: C.blueLt,
          border: `2px solid ${C.ink}`, borderRadius: 20,
          boxShadow: `2px 2px 0 ${C.ink}`,
          fontSize: isMobile ? 8 : 10, fontWeight: 900, letterSpacing: "0.1em",
          fontFamily: "'DM Mono',monospace", color: C.ink,
          transform: "rotate(5deg)", whiteSpace: "nowrap",
        }}>✦ CERTIFIED ✦</div>

        {/* ── HEADER ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: "center",
            marginBottom: isMobile ? 32 : 44,
            position: "relative",
            zIndex: 3,
            width: "100%",
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.05 }}
            style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.blueLt, border: `2px solid ${C.ink}`, borderRadius: 20,
              padding: "5px 14px", boxShadow: `2px 2px 0 ${C.ink}`,
              fontSize: isMobile ? 9 : 10, fontWeight: 900, letterSpacing: "0.12em",
              fontFamily: "'DM Mono',monospace", color: C.ink,
            }}>
              <Star4 size={8} color={C.blue} /> collected achievements <Star4 size={8} color={C.blue} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h2 style={{
              fontSize: isMobile ? "clamp(32px,10vw,52px)" : "clamp(42px,8vw,76px)",
              fontWeight: 900,
              color: C.ink,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              fontFamily: "'Space Grotesk', sans-serif",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}>CERTIFICATES</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            style={{
              marginTop: 14, fontSize: isMobile ? 12 : 13,
              color: "#888", fontWeight: 600, letterSpacing: "0.015em",
              fontFamily: "'DM Sans',sans-serif",
              textAlign: "center",
            }}
          >
            A curated digital archive of courses &amp; credentials
          </motion.p>
        </motion.div>

        {/* ── FOLDER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, position: "relative", zIndex: 3 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Folder open={open} onClick={toggleFolder} isMobile={isMobile} />
          </motion.div>

          {/* Stat cards */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                style={{ display: "flex", gap: isMobile ? 10 : 14, justifyContent: "center", flexWrap: "wrap" }}
              >
                {[
                  { n: "13", label: "Certificates", accent: C.blueLt },
                  { n: "3",  label: "Fields",        accent: C.lav    },
                  { n: "2",  label: "Years",          accent: C.pink   },
                ].map(({ n, label, accent }) => (
                  <StatCard key={label} n={n} label={label} accent={accent} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── GALLERY ── */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              ref={galleryRef}
              className="gallery-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ marginTop: isMobile ? 36 : 52, position: "relative", zIndex: 3 }}
            >
              {/* Drag label */}
              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, marginBottom: isMobile ? 16 : 22 }}>
                <div style={{ flex: 1, height: "1px", background: C.ink, opacity: 0.08 }} />
                <div style={{
                  background: C.ink, color: C.lime,
                  borderRadius: 8, padding: isMobile ? "4px 12px" : "5px 18px",
                  fontSize: isMobile ? 9 : 10, fontWeight: 900,
                  fontFamily: "'DM Mono',monospace", letterSpacing: "0.12em",
                }}>← drag to browse →</div>
                <div style={{ flex: 1, height: "1px", background: C.ink, opacity: 0.08 }} />
              </div>

              <CircularGallery items={CERTS} onItemClick={i => setModalIdx(i)} isMobile={isMobile} />

              <p style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: "#bbb", fontFamily: "'DM Mono',monospace", letterSpacing: "0.06em" }}>
                {isMobile ? "tap any card" : "click any card"} · {CERTS.length} items in archive
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM TAPE LABEL ── */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ textAlign: "center", marginTop: isMobile ? 40 : 56, position: "relative", zIndex: 3 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: isMobile ? 8 : 12,
                background: C.lav, border: `2.5px solid ${C.ink}`,
                borderRadius: 10, padding: isMobile ? "8px 16px" : "10px 24px",
                boxShadow: `4px 4px 0 ${C.ink}`,
                fontSize: isMobile ? 10 : 11, fontWeight: 800, fontFamily: "'DM Mono',monospace",
                letterSpacing: "0.08em", color: C.ink,
                transform: "rotate(-1.2deg)",
              }}>
                <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden>
                  <line x1="0" y1="4" x2="18" y2="4" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
                </svg>
                digital paper trail · always learning
                <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden>
                  <line x1="0" y1="4" x2="18" y2="4" stroke={C.ink} strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round"/>
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom star row */}
        <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 10 : 14 }}>
          {[C.blue, C.pinkDk, C.lavDk, C.lime, "#111"].map((col, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star4 size={isMobile ? [10, 8, 13, 8, 7][i] : [12, 9, 16, 10, 8][i]} color={col} />
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {modalIdx !== null && (
          <Modal
            cert={CERTS[modalIdx]}
            current={modalIdx}
            total={CERTS.length}
            onClose={() => setModalIdx(null)}
            onPrev={() => setModalIdx(i => (i - 1 + CERTS.length) % CERTS.length)}
            onNext={() => setModalIdx(i => (i + 1) % CERTS.length)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </>
  );
}