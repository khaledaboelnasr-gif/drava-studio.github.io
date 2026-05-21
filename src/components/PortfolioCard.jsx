// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/components/PortfolioCard.jsx
// PURPOSE: A single reusable card component for displaying a portfolio project.
//
// PROPS (data passed in from the parent component):
//   project — An object matching our Project model:
//     { _id, title, category, imageUrl, description, liveLink }
//
// USAGE EXAMPLE (in PortfolioPage.jsx):
//   projects.map(project => <PortfolioCard key={project._id} project={project} />)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';

// Category color mapping — each category gets its own accent color
const CATEGORY_COLORS = {
  'Web Development':  'var(--color-cyan)',
  'Branding':         'var(--color-magenta)',
  'AI Integration':   'var(--color-purple-light)',
  'E-Commerce':       'var(--color-cyan)',
  'Optimization':     'var(--color-magenta)',
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: PortfolioCard
// Props: { project }
// ─────────────────────────────────────────────────────────────────────────────
const PortfolioCard = ({ project }) => {
  // isHovered: Track hover state for interactive effects
  const [isHovered, setIsHovered] = useState(false);

  // Get the accent color for this project's category
  const accentColor = CATEGORY_COLORS[project.category] || 'var(--color-cyan)';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--color-bg-card)',
        border: `1px solid ${isHovered ? accentColor : 'var(--border-color)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'all var(--transition-base)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px ${accentColor}20` : 'none',
      }}>

      {/* ── Project Image ─────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        height: '220px', background: 'var(--color-bg-secondary)',
      }}>
        {/* The actual project image from the imageUrl stored in MongoDB */}
        <img
          src={project.imageUrl}
          alt={project.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform var(--transition-slow)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          // onError: If the image URL is broken, show a fallback placeholder
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Category Badge — positioned absolutely over the image */}
        <div style={{
          position: 'absolute', top: 'var(--spacing-md)', left: 'var(--spacing-md)',
          background: 'rgba(5, 5, 16, 0.85)', backdropFilter: 'blur(10px)',
          border: `1px solid ${accentColor}`,
          borderRadius: 'var(--radius-full)',
          padding: '0.3rem 0.8rem',
          fontFamily: 'var(--font-display)',
          fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: accentColor,
        }}>
          {project.category}
        </div>

        {/* Hover Overlay with "View Project" link */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${accentColor}20, rgba(5,5,16,0.8))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity var(--transition-base)',
        }}>
          {/* Only show the button if there's a live link */}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"  // Open in new tab
              rel="noopener noreferrer"  // Security best practice for external links
              className="btn btn-primary"
              style={{ fontSize: '0.7rem' }}
              onClick={(e) => e.stopPropagation()} // Prevent card click from firing
            >
              View Live Site
            </a>
          )}
        </div>
      </div>

      {/* ── Card Body ─────────────────────────────────────────────────── */}
      <div style={{ padding: 'var(--spacing-lg)' }}>

        {/* Project Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
          color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-sm)',
          transition: 'color var(--transition-base)',
          ...(isHovered && { color: accentColor }),
        }}>
          {project.title}
        </h3>

        {/* Project Description */}
        <p style={{
          color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)',
          lineHeight: 1.6,
          // CSS line-clamp: limit to 3 lines with "..." truncation
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default PortfolioCard;
