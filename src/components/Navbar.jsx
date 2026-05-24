import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const C = {
  lime:       '#C1FF00',
  blue:       '#1454FF',
  dark:       '#0a0a0a',
  white:      '#ffffff',
  whiteFaded: 'rgba(255,255,255,0.75)',
  whiteDim:   'rgba(255,255,255,0.12)',
  darkFaded:  'rgba(10,10,10,0.55)',
  darkDim:    'rgba(0,0,0,0.06)',
};

const EASE = [0.25, 0.1, 0.25, 1];

const NAV_LINKS = [
  { href: '#home',         label: 'HOME'         },
  { href: '#about',        label: 'ABOUT'        },
  { href: '#portfolio',    label: 'PORTFOLIO'    },
  { href: '#certificates', label: 'CERTIFICATES' },
];

const Navbar = () => {
  const [isLight,       setIsLight]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled,      setScrolled]      = useState(false);
  const [isOpen,        setIsOpen]        = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 40);
      setIsLight(sy > window.innerHeight * 0.85);

      const sections = ['home', 'about', 'portfolio', 'certificates'];
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navBg     = isOpen ? (isLight ? '#ffffff' : C.dark) : (isLight ? 'rgba(255,255,255,0.92)' : 'transparent');
  const navBlur   = isLight ? 'blur(20px)' : 'blur(14px)';
  const navShadow = scrolled && !isOpen
    ? isLight ? '0 2px 18px rgba(0,0,0,0.08)' : '0 2px 18px rgba(0,0,0,0.18)'
    : 'none';

  return (
    <>
      <style>{`
        /* Nav links: absolutely centered so they're ALWAYS
           in the true horizontal middle of the navbar,
           regardless of logo/CTA widths. */
        .nav-desktop-links {
          display: flex !important;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          gap: 6px;
          align-items: center;
        }
        .nav-desktop-cta {
          display: inline-block !important;
        }
        .nav-mobile-hamburger {
          display: none !important;
        }

        @media (max-width: 768px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-desktop-cta {
            display: none !important;
          }
          .nav-mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>

      <motion.nav
        className="main-nav-container"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{
          display:              'flex',
          justifyContent:       'space-between',
          alignItems:           'center',
          padding:              scrolled ? '14px 5%' : '20px 5%',
          position:             'fixed',
          top:                  0,
          left:                 0,
          width:                '100%',
          zIndex:               9999,
          boxSizing:            'border-box',
          background:           navBg,
          backdropFilter:       isOpen ? 'none' : navBlur,
          WebkitBackdropFilter: isOpen ? 'none' : navBlur,
          boxShadow:            navShadow,
          transition:           'background 0.35s ease, box-shadow 0.35s ease, padding 0.25s ease',
        }}
      >
        {/* ── LOGO ── */}
        <div style={{
          fontSize:   22,
          fontWeight: 900,
          letterSpacing: '-0.5px',
          fontFamily: "'Poppins', sans-serif",
          color:      isOpen ? (isLight ? C.dark : C.white) : (isLight ? C.dark : C.white),
          transition: 'color 0.3s ease',
          userSelect: 'none',
          zIndex:     10001,
        }}>
          EL<span style={{ color: isLight ? C.blue : C.lime }}>OK</span>
        </div>

        {/* ── NAV LINKS — absolutely centered ── */}
        <div className="nav-desktop-links">
          {NAV_LINKS.map(({ href, label }) => {
            const id       = href.slice(1);
            const isActive = activeSection === id;
            const linkColor = isActive
              ? isLight ? C.white     : C.dark
              : isLight ? C.darkFaded : C.whiteFaded;
            const linkBg = isActive ? (isLight ? C.blue : C.lime) : 'transparent';

            return (
              <a
                key={id}
                href={href}
                onClick={(e) => handleScroll(e, id)}
                style={{
                  textDecoration: 'none',
                  display:        'block',
                  padding:        '6px 14px',
                  borderRadius:   50,
                  color:          linkColor,
                  fontWeight:     700,
                  fontSize:       12,
                  letterSpacing:  '1px',
                  fontFamily:     "'Poppins', sans-serif",
                  background:     linkBg,
                  transition:     'color 0.22s ease, background 0.22s ease',
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* ── CTA / HAMBURGER ── */}
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 10001 }}>
          <a
            className="nav-desktop-cta"
            href="/assets/CV ELOK CHANDRA KIRANA.pdf?v=2"
            download="CV_Elok.pdf"
            style={{
              cursor:         'pointer',
              padding:        '9px 22px',
              borderRadius:   50,
              border:         '2px solid #111',
              fontWeight:     800,
              fontSize:       12,
              letterSpacing:  '0.5px',
              fontFamily:     "'Poppins', sans-serif",
              color:          '#111',
              background:     C.lime,
              boxShadow:      '3px 3px 0 #111',
              textDecoration: 'none',
            }}
          >
            DOWNLOAD CV
          </a>

          <div
            className="nav-mobile-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            style={{ flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '8px' }}
          >
            <motion.div
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '24px', height: '2.5px', background: isLight ? C.dark : C.white, borderRadius: '2px' }}
            />
            <motion.div
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ width: '24px', height: '2.5px', background: isLight ? C.dark : C.white, borderRadius: '2px' }}
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '24px', height: '2.5px', background: isLight ? C.dark : C.white, borderRadius: '2px' }}
            />
          </div>
        </div>
      </motion.nav>

      {/* ─── MOBILE DRAWER ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              position:       'fixed',
              top:            0,
              left:           0,
              width:          '100vw',
              height:         '100vh',
              background:     isLight ? '#ffffff' : C.dark,
              zIndex:         1000,
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              alignItems:     'center',
              gap:            '24px',
              paddingTop:     '60px',
              boxSizing:      'border-box',
            }}
          >
            {NAV_LINKS.map(({ href, label }) => {
              const id       = href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => handleScroll(e, id)}
                  style={{
                    textDecoration: 'none',
                    fontSize:       '20px',
                    fontWeight:     '800',
                    fontFamily:     "'Poppins', sans-serif",
                    color:          isActive ? (isLight ? C.blue : C.lime) : (isLight ? C.darkFaded : C.whiteFaded),
                    letterSpacing:  '2px',
                    transition:     'color 0.2s ease',
                  }}
                >
                  {label}
                </a>
              );
            })}

            <a
              href="/assets/CV ELOK CHANDRA KIRANA.pdf?v=2"
              download="CV_Elok.pdf"
              onClick={() => setIsOpen(false)}
              style={{
                marginTop:      '16px',
                textDecoration: 'none',
                padding:        '12px 32px',
                borderRadius:   50,
                border:         '2px solid #111',
                fontWeight:     800,
                fontSize:       '14px',
                fontFamily:     "'Poppins', sans-serif",
                color:          '#111',
                background:     C.lime,
                boxShadow:      '4px 4px 0 #111',
              }}
            >
              DOWNLOAD CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;