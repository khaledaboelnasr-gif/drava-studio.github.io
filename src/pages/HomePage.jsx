// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/pages/HomePage.jsx
// PURPOSE: Assembles all section components into the main SPA (Single Page App).
//
// ARCHITECTURE:
//   This is a "page" component — it doesn't contain its own UI, it just
//   imports and arranges the section components in order.
//   The sections form a continuous-scroll layout:
//   Hero → About → Services → Portfolio Preview → Contact
//
// WHY A PAGE COMPONENT?
//   Separating pages from components keeps the code organized.
//   Pages are what React Router renders at specific URLs.
//   Components are reusable UI pieces used within pages.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import HeroSection    from '../components/sections/HeroSection';
import AboutSection   from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ContactSection  from '../components/sections/ContactSection';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: HomePage
// Rendered at route "/" by React Router (see App.js)
// ─────────────────────────────────────────────────────────────────────────────
const HomePage = () => {
  return (
    // React requires a single root element — we use a Fragment (<>) to
    // avoid adding an unnecessary <div> wrapper to the DOM.
    <>
      {/* Each section has an id="" that the Navbar uses for smooth scrolling */}
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
