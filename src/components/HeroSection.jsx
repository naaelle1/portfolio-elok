import React from 'react';

const HeroSection = () => {
  return (
    <>
      {/* ── STYLING KHUSUS RESPONSIVE MOBILE & DESKTOP ── */}
      <style>{`
        /* --- Style Desktop (Default) --- */
        .hero-section {
          width: 100%;
          box-sizing: border-box;
        }
        .tagline {
          font-size: 2.5rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #ffffff;
        }
        .tagline span {
          color: #C1FF00; /* Warna lime */
        }

        /* --- BREAKPOINT MOBILE (Maksimal Layar HP) --- */
        @media (max-width: 480px) {
          .hero-section {
            /* 1. SOLUSI KETUTUP NAVBAR: Kasih space atas agar konten turun di bawah navbar fixed */
            padding-top: 90px !important; 
          }
          
          /* 2. SOLUSI FONT KEBESARAN: Ukuran font tagline dikecilkan biar proporsional */
          .tagline {
            font-size: 1.25rem !important; /* Ukuran pas, tidak kekecilan & tidak kebesaran */
            line-height: 1.3 !important;
            letter-spacing: 0.5px;
            padding: 0 10px; /* Biar ada jarak kanan kiri ke tepi layar */
          }

          /* Ukuran teks deskripsi bawah juga disesuaikan sedikit */
          .floating-desc p {
            font-size: 0.85rem !important;
            line-height: 1.4;
          }

          /* Merapikan jarak antar komponen di mobile */
          .tagline-container {
            margin-bottom: 16px;
          }
          .profile-group {
            margin-bottom: 16px;
          }
        }
      `}</style>

      {/* ── HTML STRUKTUR HERO SECTION CAMU ── */}
      <main className="hero-section" id="home">
        <section className="hero-content">
          
          {/* Floating Accents — Muncul di desktop, otomatis hilang di mobile via CSS */}
          <div className="accent accent-braces">{`{ }`}</div>
          <div className="accent accent-hash">#</div>
          <div className="accent accent-sparkle">✦</div>
          <div className="accent accent-arrow">↗</div>

          {/* Teks Background Utama — Muncul di desktop, otomatis hilang di mobile via CSS */}
          <h1 className="bg-text">
            VISUAL<br /><span className="outline-text">THINKER</span>
          </h1>

          {/* Tagline Kontainer — Posisi Atas di Mobile (Order 1) */}
          <div className="tagline-container">
            <h2 className="tagline">
              Aspiring UI/UX Designer &<br />
              <span>Web Developer</span>
            </h2>
          </div>

          {/* Profile Card Kontainer — Posisi Tengah Murni di Mobile (Order 2) */}
          <div className="profile-group">
            <div className="profile-card">
              <div className="glass-effect">
                <img
                  src="/assets/WhatsApp Image 2026-05-03 at 2.21.23 PM.jpeg"
                  alt="Foto Profesional Elok"
                  className="profile-img"
                />
                {/* Responsive Name Toggle */}
                <h3>
                  ELOK CHANDRA <span className="desktop-only">KIRANA</span><span className="mobile-only">K.</span>
                </h3>
                <p className="nickname">@elokcc</p>
              </div>
            </div>
            <div className="center-badge">
              <button 
                className="badge"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                GET STARTED
              </button>
            </div>
          </div>

          {/* Deskripsi Kontainer — Posisi Bawah di Mobile (Order 3) */}
          <div className="floating-desc">
            <p>
              Hello! I'm Elok, a student passionate about web design and UI/UX. 
              I enjoy turning ideas into visually appealing and functional interfaces.
            </p>
          </div>

        </section>
      </main>
    </>
  );
};

export default HeroSection;