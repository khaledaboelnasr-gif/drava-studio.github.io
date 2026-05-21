// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/components/Footer.jsx
// PURPOSE: Site footer with logo, links, and social icons.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Link } from 'react-router-dom';

// currentYear is computed once when the module loads — stays up-to-date automatically
const currentYear = new Date().getFullYear();

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer style={{
      background: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: 'var(--spacing-3xl) 0 var(--spacing-xl)',
    }}>
      <div className="container">

        {/* ── Top Row ─────────────────────────────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          gap: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-2xl)',
        }}>
          {/* Brand Column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)',
                fontWeight: 900, letterSpacing: '0.08em',
                color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)',
              }}>
                DRAVA<span style={{ color: 'var(--color-cyan)' }}>.</span>STUDIO
              </h3>
            </Link>
            <p style={{
              color: 'var(--color-text-secondary)', lineHeight: 1.7,
              maxWidth: '300px', fontSize: 'var(--text-sm)',
            }}>
              We combine technology, creativity, and artificial intelligence to build
              digital experiences that move industries forward.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--color-cyan)', marginBottom: 'var(--spacing-lg)',
            }}>
              Services
            </h4>
            {['Website Creation', 'Website Innovation', 'Brand Design', 'AI Integration', 'Optimization'].map(s => (
              <p key={s} style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--spacing-sm)', cursor: 'pointer' }}
                onClick={() => scrollTo('services')}
                onMouseEnter={e => e.target.style.color = 'var(--color-cyan)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
                {s}
              </p>
            ))}
          </div>

          {/* Navigate Column */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)', fontSize: '0.65rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--color-magenta)', marginBottom: 'var(--spacing-lg)',
            }}>
              Navigate
            </h4>
            {[
              { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              { label: 'About', action: () => scrollTo('about') },
              { label: 'Portfolio', action: null, href: '/portfolio' },
              { label: 'Contact', action: () => scrollTo('contact') },
            ].map(item => (
              item.href ? (
                <Link key={item.label} to={item.href} style={{
                  display: 'block', color: 'var(--color-text-secondary)',
                  fontSize: 'var(--text-sm)', marginBottom: 'var(--spacing-sm)',
                  textDecoration: 'none', transition: 'color var(--transition-base)',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-magenta)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
                  {item.label}
                </Link>
              ) : (
                <p key={item.label} onClick={item.action} style={{
                  color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)',
                  marginBottom: 'var(--spacing-sm)', cursor: 'pointer',
                  transition: 'color var(--transition-base)',
                }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-magenta)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
                  {item.label}
                </p>
              )
            ))}
          </div>
        </div>

        {/* ── Bottom Row ─────────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: 'var(--spacing-xl)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 'var(--spacing-md)',
        }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-xs)', letterSpacing: '0.05em' }}>
            © {currentYear} Drava Studio. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: '0.6rem',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
          }}>
            We Create. We Elevate. We <span style={{ color: 'var(--color-cyan)' }}>Innovate with AI.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
