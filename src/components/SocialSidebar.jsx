import { useState } from "react";

/* ── Brand SVG Icons (Warna default hitam sesuai gambar asli) ──────────────── */
const IconEmail = ({ color = "#111" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2.5" fill="none"/>
    <path d="M2 7 L12 13 L22 7" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);
const IconLinkedIn = ({ color = "#111" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconInstagram = ({ color = "#111" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none"/>
  </svg>
);
const IconGitHub = ({ color = "#111" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

/* ── Data ────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { id: "email",     label: "Email",     Icon: IconEmail,     href: "mailto:elokchandra13@gmail.com",                                target: "_self" },
  { id: "linkedin",  label: "LinkedIn",  Icon: IconLinkedIn,  href: "https://www.linkedin.com/in/elok-chandra-kirana-604319354/", target: "_blank" },
  { id: "instagram", label: "Instagram", Icon: IconInstagram, href: "https://instagram.com/elokcc",                                   target: "_blank" },
  { id: "github",    label: "GitHub",    Icon: IconGitHub,    href: "https://github.com/naaelle1",                                target: "_blank" },
];

/* ── Styles ──────────────────────────────────────── */
const SidebarStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&display=swap');

    /* ── Desktop pill (Gaya Neo-Brutalism Khas Kamu) ── */
    .fab-icon-link {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      width: 52px;
      height: 52px;
      padding-left: 14px;
      border-radius: 14px;
      border: 2.5px solid #111;
      background: #fcfbfa;
      color: #111;
      text-decoration: none;
      cursor: pointer;
      transition: width 0.32s cubic-bezier(0.34,1.56,0.64,1), background 0.22s ease, transform 0.18s cubic-bezier(0.34,1.56,0.64,1);
      overflow: hidden;
      white-space: nowrap;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      box-shadow: -3px 3px 0px #111;
    }
    .fab-icon-link:hover {
      width: 158px;
      padding-right: 14px;
      background: #f4f2ee;
      transform: translate(2px, -2px);
      box-shadow: -5px 5px 0px #111;
    }
    .fab-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0;
      transform: translateX(-8px);
      transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
      color: #111;
    }
    .fab-icon-link:hover .fab-label {
      opacity: 1;
      transform: translateX(0);
    }

    /* ── Tablet ── */
    @media (max-width: 900px) {
      .fab-sidebar-wrapper { left: 12px !important; }
      .fab-icon-link { width: 46px; height: 46px; padding-left: 11px; }
      .fab-icon-link:hover { width: 140px; }
    }

    /* ── Hide Desktop Sidebar on Mobile ── */
    @media (max-width: 480px) {
      .fab-sidebar-wrapper { display: none !important; }
    }

    /* ── Mobile Base Slider (Tetap memakai style aslimu) ── */
    .mobile-slider { display: none; }

    @media (max-width: 480px) {
      .mobile-slider {
        display: block;
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9999;
      }

      .mobile-panel {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
      }

      /* Tombol Tab kecil di pinggir layar */
      .mobile-tab {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 50px;
        background: #fcfbfa;
        border: 2.5px solid #111;
        border-right: none;
        border-radius: 10px 0 0 10px;
        cursor: pointer;
        padding: 0;
        z-index: 10;
        box-shadow: -2px 2px 0px rgba(0,0,0,0.15);
      }

      .tab-chevron {
        width: 6px;
        height: 6px;
        border-right: 2.5px solid #111;
        border-bottom: 2.5px solid #111;
        transition: transform 0.3s ease;
      }
      .tab-chevron.closed { transform: rotate(135deg) translate(1px, 1px); }
      .tab-chevron.open   { transform: rotate(-45deg) translate(-1px, -1px); }

      /* CONTAINER GROUP ICONS: Murni transparan agar tidak menutupi space tengah */
      .mobile-icons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: transparent; 
        border: none;            
        padding: 0px 12px;
        backdrop-filter: none;    
        
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s ease;
      }
      
      .mobile-icons.closed {
        transform: translateY(-50%) translateX(100%);
        opacity: 0;
        pointer-events: none;
      }
      
      /* FIX: Geser posisi translateX agar pas nempel tanpa merusak grid tengah foto */
      .mobile-icons.open {
        transform: translateY(-50%) translateX(-12px);
        opacity: 1;
        pointer-events: auto;
      }

      /* INDIVIDUAL BUTTON ICON: Desain Putih Krem + Border Hitam Tebal (Style Gambar Kamu) */
      .mobile-icon-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        border: 2.5px solid #111;      
        background: #fcfbfa;           
        text-decoration: none;
        box-shadow: -3px 3px 0px #111; 
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      
      .mobile-icon-btn:active {
        transform: translate(-2px, 2px);
        box-shadow: -1px 1px 0px #111;
      }
    }
  `}</style>
);

/* ── Desktop Icon Component ──────────────────────── */
function SocialIcon({ label, Icon, href, target }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      title={label}
      className="fab-icon-link"
    >
      <span style={{ display:"flex", alignItems:"center", justifyContent:"center", width:24, height:24, flexShrink:0 }}>
        <Icon color="#111" />
      </span>
      <span className="fab-label">{label}</span>
    </a>
  );
}

/* ── Mobile Icon Component ───────────────────────── */
function MobileIcon({ label, Icon, href, target }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      title={label}
      className="mobile-icon-btn"
    >
      <Icon color="#111" />
    </a>
  );
}

/* ── Main Export ─────────────────────────────────── */
export default function SocialSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SidebarStyles />

      {/* Desktop sidebar */}
      <div
        className="fab-sidebar-wrapper"
        style={{
          position: "fixed",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 9999,
        }}
      >
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {SOCIAL_LINKS.map((s) => <SocialIcon key={s.id} {...s} />)}
        </div>
      </div>

      {/* Mobile slider */}
      <div className="mobile-slider">
        <div className="mobile-panel">
          <button
            className="mobile-tab"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Tutup social links" : "Buka social links"}
          >
            <div className={`tab-chevron ${open ? "open" : "closed"}`} />
          </button>

          <div className={`mobile-icons ${open ? "open" : "closed"}`}>
            {SOCIAL_LINKS.map((s) => (
              <MobileIcon key={s.id} {...s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}