// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/components/sections/AboutSection.jsx
// PURPOSE: About section explaining Drava Studio's mission and approach.
//
// LOTTIE PLACEHOLDER:
//   This component has a designated slot for a Lottie animation.
//   To add one:
//   1. Download a JSON animation from lottiefiles.com
//   2. Import Lottie: import Lottie from 'lottie-react';
//   3. Import your animation: import animData from '../../assets/your-anim.json';
//   4. Replace the placeholder div with: <Lottie animationData={animData} loop={true} />
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

// Data-driven approach: define the content as an array so it's easy to update.
// Each "pillar" renders as a card. To add/remove pillars, just edit this array.
const pillars = [
  {
    icon: '◈',   // Abstract geometric icon (not a generic person icon)
    title: 'Technology First',
    description: 'We architect solutions with cutting-edge tools — from React frontends to AI-integrated backends — always choosing the right technology for the job.',
    color: 'var(--color-cyan)',
  },
  {
    icon: '◇',
    title: 'Creative Intelligence',
    description: 'Design is not decoration — it\'s strategy made visual. Every pixel, every interaction, every animation serves a purpose in your brand narrative.',
    color: 'var(--color-magenta)',
  },
  {
    icon: '◉',
    title: 'AI-Augmented',
    description: 'We integrate generative AI, intelligent automation, and machine learning to give your digital presence capabilities your competitors don\'t have yet.',
    color: 'var(--color-purple-light)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: AboutSection
// id="about" is the scroll target for the Navbar's "About" link.
// ─────────────────────────────────────────────────────────────────────────────
const AboutSection = () => {
  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background accent */}
      <div style={{
        position: 'absolute', top: '50%', left: '-200px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)',
        transform: 'translateY(-50%)', pointerEvents: 'none',
      }} />

      <div className="container">

        {/* ── Section Header ───────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--color-cyan)', marginBottom: 'var(--spacing-md)',
          }}>
            — Our Philosophy —
          </p>
          <h2 className="section-title" style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--spacing-lg)' }}>
            Built for the <span className="accent">Digital Frontier</span>
          </h2>
          <p style={{
            fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)',
            maxWidth: '600px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Drava Studio is a new-generation digital agency that merges human creativity
            with artificial intelligence to build experiences that don't just look good —
            they perform, scale, and evolve.
          </p>
        </div>

        {/* ── Main Content Grid ─────────────────────────────────────── */}
// NEW
<div className="about-grid">

          {/* Left: Mission Statement */}
          <div>
            <div style={{
              width: '3px', height: '60px',
              background: 'linear-gradient(to bottom, var(--color-cyan), var(--color-magenta))',
              marginBottom: 'var(--spacing-xl)',
            }} />
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)',
              marginBottom: 'var(--spacing-lg)', lineHeight: 1.2,
            }}>
              Our Mission Is to<br />
              <span style={{ color: 'var(--color-cyan)' }}>Elevate Every Brand</span><br />
              We Touch
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--spacing-lg)' }}>
              We founded Drava Studio on a simple belief: every business deserves a
              digital presence that reflects the quality of their work. We're not a
              template shop. We're architects of digital experience.
            </p>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
              From your first logo to a fully AI-powered web platform, we're with you
              at every stage of your digital journey — building with precision,
              designing with intent, and innovating without limits.
            </p>
          </div>

          {/* Right: Lottie Animation Placeholder */}
          <div style={{
            position: 'relative', height: '350px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/*
              ── LOTTIE PLACEHOLDER ──
              Replace this entire div with:
              <Lottie animationData={yourAnimData} loop={true} style={{ width: '100%', height: '100%' }} />
            */}
            <div style={{
              width: '280px', height: '280px', borderRadius: 'var(--radius-xl)',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 'var(--spacing-md)',
            }}>
              {/* Abstract geometric visual */}
              <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    position: 'absolute', inset: `${i * 12}px`,
                    border: `1px solid ${i === 0 ? 'var(--color-cyan)' : i === 1 ? 'var(--color-magenta)' : 'var(--color-purple-light)'}`,
                    borderRadius: `${i * 4}px`,
                    opacity: 0.6 - i * 0.1,
                    animation: `rotateCube ${4 + i * 2}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                  }} />
                ))}
              </div>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '0.6rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
              }}>
                Lottie Animation Here
              </p>
            </div>
          </div>
        </div>

        {/* ── Three Pillars Grid ─────────────────────────────────────── */}
// NEW
<div className="pillars-grid">
          {/* Map over the pillars array — each item renders as a card */}
          {pillars.map((pillar, index) => (
            <div key={index} className="card" style={{ textAlign: 'center' }}>
              {/* Abstract icon */}
              <div style={{
                fontSize: '2rem', color: pillar.color,
                marginBottom: 'var(--spacing-md)',
                textShadow: `0 0 20px ${pillar.color}`,
              }}>
                {pillar.icon}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
                color: pillar.color, marginBottom: 'var(--spacing-md)',
              }}>
                {pillar.title}
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: 'var(--text-sm)' }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
