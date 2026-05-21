// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/components/sections/HeroSection.jsx
// PURPOSE: The landing hero section with tagline and Spline 3D placeholder.
//
// SPLINE INTEGRATION:
//   Spline is a 3D design tool. Their React library (@splinetool/react-spline)
//   lets you embed interactive 3D scenes directly in React.
//
//   TO USE SPLINE:
//   1. Design your "Floating Isometric Core" at spline.design
//   2. Export → "React" → copy the scene URL
//   3. Replace the SPLINE_SCENE_URL constant below with your URL
//   4. Uncomment the <Spline> component and remove the placeholder div
//
// LOTTIE:
//   LottieFiles animations can replace static icons. Import from lottie-react.
//   Browse free animations at lottiefiles.com
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef, useState } from 'react';
// Uncomment when your Spline scene is ready:
// import Spline from '@splinetool/react-spline';
import './HeroSection.css';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — Update these values
// ─────────────────────────────────────────────────────────────────────────────
// const SPLINE_SCENE_URL = 'YOUR_SPLINE_SCENE_URL_HERE';
// Get this from Spline: File → Export → React → Copy URL

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: HeroSection
// id="hero" allows the Navbar to scroll here via scrollToSection('hero')
// ─────────────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  // mousePos tracks cursor position for a subtle parallax effect on the 3D placeholder
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  // ── Mouse Parallax Effect ─────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to values between 0 and 1
      // (0,0) = top-left corner, (1,1) = bottom-right corner
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate tilt angles based on mouse position
  // Map 0→1 range to -15°→+15° rotation range
  const tiltX = (mousePos.y - 0.5) * -30; // Vertical mouse → X rotation
  const tiltY = (mousePos.x - 0.5) * 30;  // Horizontal mouse → Y rotation

  return (
    // id="hero" is the scroll target for the Navbar
    <section id="hero" className="hero" ref={heroRef}>

      {/* ── Background Decorative Elements ──────────────────────────── */}
      <div className="hero__bg-grid" />
      <div className="hero__bg-glow hero__bg-glow--cyan" />
      <div className="hero__bg-glow hero__bg-glow--magenta" />

      <div className="container hero__container">

        {/* ── Left Column: Text Content ─────────────────────────────── */}
        <div className="hero__content">

          {/* Overline label above the main heading */}
          <div className="hero__overline">
            <span className="hero__overline-dot" />
            AI-Powered Digital Agency
          </div>

          {/* Main Heading — split across lines for visual impact */}
          <h1 className="hero__title">
            <span className="hero__title-line">We Create.</span>
            <span className="hero__title-line hero__title-line--accent">We Elevate.</span>
            <span className="hero__title-line">We Innovate</span>
            <span className="hero__title-line hero__title-line--gradient">with AI.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero__subtitle">
            Drava Studio combines technology, creativity, and intelligence
            to build digital experiences that move industries forward.
          </p>

          {/* CTA Buttons */}
          <div className="hero__cta-group">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              View Our Work
            </button>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Start a Project
            </button>
          </div>

          {/* Stats Row */}
          <div className="hero__stats">
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '3×', label: 'Avg Traffic Growth' },
            ].map((stat) => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column: 3D Spline Object ───────────────────────── */}
        <div className="hero__3d-container">

          {/* ────────────────────────────────────────────────────────────
              SPLINE PLACEHOLDER
              Remove this entire div and uncomment the <Spline> component
              below once you have your Spline scene URL.
              ──────────────────────────────────────────────────────────── */}
          <div
            className="hero__spline-placeholder"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            }}>
            {/* Floating Isometric Core — CSS-only placeholder */}
            <div className="hero__cube-wrapper">
              <div className="hero__cube">
                <div className="hero__cube-face hero__cube-face--front" />
                <div className="hero__cube-face hero__cube-face--back" />
                <div className="hero__cube-face hero__cube-face--right" />
                <div className="hero__cube-face hero__cube-face--left" />
                <div className="hero__cube-face hero__cube-face--top" />
                <div className="hero__cube-face hero__cube-face--bottom" />
              </div>
            </div>
            {/* Orbital rings around the cube */}
            <div className="hero__orbit hero__orbit--1" />
            <div className="hero__orbit hero__orbit--2" />
            <div className="hero__glow-ring" />
          </div>

          {/* ── REAL SPLINE COMPONENT (uncomment when ready) ──────────
          <Spline
            scene={SPLINE_SCENE_URL}
            style={{ width: '100%', height: '100%' }}
          />
          ─────────────────────────────────────────────────────────────── */}

          {/* Floating tech labels around the 3D object */}
          <div className="hero__float-label hero__float-label--1">AI Integration</div>
          <div className="hero__float-label hero__float-label--2">Web Dev</div>
          <div className="hero__float-label hero__float-label--3">Branding</div>
        </div>
      </div>

      {/* Scroll indicator at the bottom */}
      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Scroll to explore</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default HeroSection;
