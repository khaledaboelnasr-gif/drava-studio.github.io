// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/components/Navbar.jsx
// PURPOSE: Fixed navigation bar with smooth scroll links and mobile menu.
//
// FEATURES:
//   - Glassmorphism background that appears after scrolling 50px
//   - Smooth scroll to sections on the homepage
//   - React Router <Link> for the /portfolio route
//   - "Get a Quote" CTA button
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: Navbar
// No props needed — this component manages its own state.
// ─────────────────────────────────────────────────────────────────────────────
const Navbar = () => {
  // scrolled: True when user has scrolled down — activates glass background
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // useLocation() from React Router — tells us the current URL path.
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // ── Scroll Detection ────────────────────────────────────────────────────
  // useEffect with [] runs once on mount, sets up a scroll event listener.
  // The returned cleanup function removes it when the component unmounts.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  // ── Smooth Scroll Handler ───────────────────────────────────────────────
  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    if (isHomePage) {
      // Find the element with that id and scroll to it smoothly
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on another page, navigate home first with a hash for the section
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

{/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link 
          to="/" 
          className="navbar__logo"
          style={{ 
            display: 'flex', 
            flexDirection: 'row', /* Forces the logo and text to sit side-by-side */
            alignItems: 'center', 
            gap: '12px', 
            textDecoration: 'none' 
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="/logo.png" 
            alt="Drava Studio Cube Logo" 
            style={{ 
              height: '40px', 
              width: 'auto',
              filter: 'invert(1) brightness(2)' /* Instantly turns a dark logo bright white */
            }} 
          />
          <span style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '1.5rem', 
            fontWeight: '900', 
            letterSpacing: '0.05em',
            color: 'white',
            whiteSpace: 'nowrap' /* Prevents the text from wrapping underneath the logo */
          }}>
            Drava Studio
          </span>
        </Link>

        {/* ── Desktop Links ───────────────────────────────────────────── */}

        
        <ul className="navbar__links">
          <li>
            <Link to="/" className="navbar__link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Home
            </Link>
          </li>
          <li><button className="navbar__link" onClick={() => scrollToSection('about')}>About</button></li>
          <li><button className="navbar__link" onClick={() => scrollToSection('services')}>Services</button></li>
          <li><Link to="/portfolio" className="navbar__link">Portfolio</Link></li>
          <li><button className="navbar__link" onClick={() => scrollToSection('contact')}>Contact</button></li>
          <li>
            <button className="btn btn-primary navbar__cta" onClick={() => scrollToSection('contact')}>
              Get a Quote
            </button>
          </li>
        </ul>

        {/* ── Mobile Hamburger ────────────────────────────────────────── */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile Menu Dropdown ────────────────────────────────────── */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <button className="navbar__mobile-link" onClick={() => scrollToSection('about')}>About</button>
        <button className="navbar__mobile-link" onClick={() => scrollToSection('services')}>Services</button>
        <Link to="/portfolio" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Portfolio</Link>
        <button className="navbar__mobile-link" onClick={() => scrollToSection('contact')}>Contact</button>
        <button className="btn btn-primary" onClick={() => scrollToSection('contact')} style={{width:'100%', marginTop:'1rem'}}>Get a Quote</button>
      </div>
    </nav>
  );
};

export default Navbar;
