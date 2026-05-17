import React from 'react';

const SkillsSection = () => {
  return (
    <>
      <style>{`
        .skills-section {
          background: #ffffff;
          padding: 80px 24px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          color: #111;
        }

        .skills-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .skills-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .skills-header h2 {
          font-size: 48px;
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .skill-card {
          background: #F8F8F8;
          border: 2px solid #111;
          border-radius: 12px;
          padding: 32px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 6px 6px 0 #111;
        }

        .skill-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .skill-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .skill-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .skill-list li {
          margin-bottom: 8px;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
          
        .skill-tag {
           background: #D7FF3F;
           border: 1px solid #111;
           border-radius: 20px;
           padding: 4px 12px;
           font-size: 14px;
           font-weight: 600;
           display: inline-block;
           margin-right: 8px;
           margin-bottom: 8px;
        }
      `}</style>
      <section className="skills-section" id="skills">
        <div className="skills-container">
          <div className="skills-header">
            <h2>MY SKILLS</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">🎨</div>
              <h3 className="skill-title">UI/UX Design</h3>
              <div>
                <span className="skill-tag" style={{ background: '#FF6FB5', color: '#111' }}>Figma</span>
                <span className="skill-tag">Wireframing</span>
                <span className="skill-tag">Prototyping</span>
                <span className="skill-tag">User Research</span>
              </div>
            </div>
            
            <div className="skill-card">
              <div className="skill-icon">💻</div>
              <h3 className="skill-title">Frontend Dev</h3>
              <div>
                <span className="skill-tag" style={{ background: '#1454FF', color: '#111' }}>React</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Tailwind</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">🚀</div>
              <h3 className="skill-title">Other Tools</h3>
              <div>
                <span className="skill-tag" style={{ background: '#111', color: '#D7FF3F' }}>Git</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Responsive Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SkillsSection;