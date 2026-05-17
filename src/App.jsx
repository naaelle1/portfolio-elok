import React from 'react';
// Import semua CSS kamu
import '../style.css';

// Import komponen
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SocialSidebar from './components/SocialSidebar';
import CertificatesSection from './components/CertificatesSection';
import Portfoliosection from './components/Portfoliosection.jsx';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <SocialSidebar />
      <HeroSection />
      <AboutSection />
      <Portfoliosection />
      <CertificatesSection />
      
      {/* Footer Putih */}
      <section className="white-footer" style={{ height: '100px' }}></section>
    </div>
  );
}

export default App;