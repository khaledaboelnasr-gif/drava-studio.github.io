// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/components/sections/ServicesSection.jsx
// PURPOSE: Displays the agency's core service offerings in a grid layout.
//
// DATA PATTERN:
//   Service data is defined in the "services" array below.
//   To add or modify a service, just edit the array — no JSX changes needed.
//   Each service card shows an icon, title, description, and feature list.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE DATA — Edit this array to update service cards
// ─────────────────────────────────────────────────────────────────────────────
const services = [
  {
    id: 'web-creation',
    icon: '⬡',         // Hexagon — abstract, tech-focused
    title: 'Full Website Creation',
    subtitle: 'WordPress / Shopify',
    description: 'Custom-built websites engineered for performance, conversion, and growth. Not templates — bespoke digital architecture.',
    features: ['Custom Design System', 'SEO-Ready Structure', 'CMS Integration', 'Performance Optimized'],
    accent: 'var(--color-cyan)',
    gradient: 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, transparent 60%)',
  },
  {
    id: 'innovation',
    icon: '◈',
    title: 'Website Innovation',
    subtitle: 'Modernization & Rebuilds',
    description: 'Transform outdated websites into competitive digital assets. We audit, strategize, and rebuild for the modern web.',
    features: ['UX Audit & Strategy', 'Performance Overhaul', 'Modern Stack Migration', 'A/B Testing Setup'],
    accent: 'var(--color-magenta)',
    gradient: 'linear-gradient(135deg, rgba(255,0,170,0.1) 0%, transparent 60%)',
  },
  {
    id: 'branding',
    icon: '◎',
    title: 'Logo & Brand Design',
    subtitle: 'Identity Systems',
    description: 'Complete brand identities built from strategy. Logos, color systems, typography, and brand guidelines that scale.',
    features: ['Logo Design', 'Color & Type System', 'Brand Guidelines', 'Asset Library'],
    accent: 'var(--color-purple-light)',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, transparent 60%)',
  },
  {
    id: 'ai-visual',
    icon: '⬢',
    title: 'AI Visual Integration',
    subtitle: 'Generative & Interactive',
    description: 'Embed AI-generated visuals, interactive 3D elements, and generative art directly into your digital experience.',
    features: ['Spline 3D Integration', 'AI Image Generation', 'Generative Backgrounds', 'Interactive Elements'],
    accent: 'var(--color-cyan)',
    gradient: 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, transparent 60%)',
  },
  {
    id: 'optimization',
    icon: '◆',
    title: 'Optimization',
    subtitle: 'Speed, SEO & Conversion',
    description: 'Technical SEO, Core Web Vitals optimization, and conversion rate improvements that directly impact your bottom line.',
    features: ['Core Web Vitals', 'Technical SEO Audit', 'Conversion Optimization', 'Analytics Setup'],
    accent: 'var(--color-magenta)',
    gradient: 'linear-gradient(135deg, rgba(255,0,170,0.1) 0%, transparent 60%)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: ServicesSection
// id="services" is the scroll target for Navbar's "Services" link.
// ─────────────────────────────────────────────────────────────────────────────
const ServicesSection = () => {
  // hoveredId: Tracks which service card is hovered (for enhanced hover effects)
  // null means no card is hovered
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="services" className="section" style={{
      background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 50%, var(--color-bg-primary) 100%)',
    }}>
      <div className="container">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--color-magenta)', marginBottom: 'var(--spacing-md)',
          }}>
            — What We Do —
          </p>
          <h2 className="section-title" style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--spacing-lg)' }}>
            Services That <span className="accent-magenta">Drive Results</span>
          </h2>
          <p style={{
            fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)',
            maxWidth: '560px', margin: '0 auto',
          }}>
            Every service is a precision instrument designed for one goal: making your
            brand impossible to ignore.
          </p>
        </div>

        {/* ── Services Grid ─────────────────────────────────────────── */}
        {/*
          CSS Grid with auto-fit: columns automatically wrap to fill space.
          minmax(320px, 1fr) = each column is at least 320px, but fills available space.
          On wide screens: 3 columns. On medium: 2. On mobile: 1.
        */}
        <div className="services-grid">
          
          {services.map((service) => {
            // Is this card currently being hovered?
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: isHovered
                    ? `${service.gradient}, var(--color-bg-card)`
                    : 'var(--color-bg-card)',
                  border: `1px solid ${isHovered ? service.accent : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--spacing-xl)',
                  cursor: 'default',
                  transition: 'all var(--transition-base)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 0 30px ${service.accent}30` : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}>

                {/* Top accent line — appears on hover */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '2px',
                  background: service.accent,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity var(--transition-base)',
                  boxShadow: `0 0 10px ${service.accent}`,
                }} />

                {/* Icon */}
                <div style={{
                  fontSize: '2rem',
                  color: service.accent,
                  marginBottom: 'var(--spacing-md)',
                  textShadow: isHovered ? `0 0 20px ${service.accent}` : 'none',
                  transition: 'text-shadow var(--transition-base)',
                }}>
                  {service.icon}
                </div>

                {/* Title + Subtitle */}
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
                  color: 'var(--color-text-primary)', marginBottom: '0.25rem',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.65rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: service.accent, marginBottom: 'var(--spacing-md)',
                }}>
                  {service.subtitle}
                </p>

                {/* Description */}
                <p style={{
                  color: 'var(--color-text-secondary)', lineHeight: 1.7,
                  fontSize: 'var(--text-sm)', marginBottom: 'var(--spacing-lg)',
                }}>
                  {service.description}
                </p>

                {/* Feature List */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {service.features.map((feature) => (
                    <li key={feature} style={{
                      fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                      {/* Abstract bullet — a small diamond shape */}
                      <span style={{ color: service.accent, fontSize: '0.5rem' }}>◆</span>
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-3xl)' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            Not sure which service fits your needs?
          </p>
          <button
            className="btn btn-outline"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Let's Talk Strategy
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
