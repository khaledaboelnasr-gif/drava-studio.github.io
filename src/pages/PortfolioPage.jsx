// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/pages/PortfolioPage.jsx
// PURPOSE: The /portfolio route — fetches and displays all projects from the API.
//
// DATA FLOW:
//   1. Component mounts (renders for the first time)
//   2. useFetch('/projects') triggers a GET /api/projects request
//   3. While waiting: show loading skeleton
//   4. On success: render projects in a filterable grid
//   5. On error: show error message with retry button
//
// FILTERING:
//   The "activeFilter" state holds the currently selected category.
//   "All" shows everything. Other values filter by project.category.
//   This is client-side filtering — no extra API calls needed.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import PortfolioCard from '../components/PortfolioCard';
import useFetch from '../hooks/useFetch';

// Available filter categories — should match the Project model's enum
const FILTERS = ['All', 'Web Development', 'Branding', 'AI Integration', 'E-Commerce', 'Optimization'];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: PortfolioPage
// Rendered at route "/portfolio" by React Router (see App.js)
// ─────────────────────────────────────────────────────────────────────────────
const PortfolioPage = () => {
  // activeFilter: Which category tab is selected. 'All' shows everything.
  const [activeFilter, setActiveFilter] = useState('All');

  // useFetch is our custom hook — it makes a GET request to /api/projects
  // and returns { data, loading, error, refetch }
  // data: { success: true, count: N, data: [...projects] }
  const { data, loading, error, refetch } = useFetch('/projects');

  // ── Filtered Projects ──────────────────────────────────────────────────
  // useMemo: Recalculates filteredProjects ONLY when data or activeFilter changes.
  // Without useMemo, the filter runs on every single render — inefficient.
  const filteredProjects = useMemo(() => {
    // data?.data is the array of projects from the API response
    if (!data?.data) return [];
    if (activeFilter === 'All') return data.data;
    // Return only projects whose category matches the selected filter
    return data.data.filter(p => p.category === activeFilter);
  }, [data, activeFilter]);

  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh' }}>

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div style={{
        padding: 'var(--spacing-3xl) 0 var(--spacing-2xl)',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--color-cyan)', marginBottom: 'var(--spacing-md)',
          }}>
            — Our Work —
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-5xl)',
            marginBottom: 'var(--spacing-lg)',
          }}>
            Selected <span className="accent">Projects</span>
          </h1>
          <p style={{
            color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)',
            maxWidth: '500px', margin: '0 auto',
          }}>
            A curated collection of digital experiences we've built and elevated.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--spacing-2xl) var(--spacing-xl)' }}>

        {/* ── Filter Tabs ─────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)',
          justifyContent: 'center', marginBottom: 'var(--spacing-2xl)',
        }}>
          {FILTERS.map(filter => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                // onClick updates activeFilter, which triggers useMemo to recalculate
                onClick={() => setActiveFilter(filter)}
                style={{
                  fontFamily: 'var(--font-display)', fontSize: '0.7rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '0.5rem 1.2rem', borderRadius: 'var(--radius-full)',
                  border: `1px solid ${isActive ? 'var(--color-cyan)' : 'var(--border-color)'}`,
                  background: isActive ? 'rgba(0,245,255,0.1)' : 'transparent',
                  color: isActive ? 'var(--color-cyan)' : 'var(--color-text-secondary)',
                  cursor: 'pointer', transition: 'all var(--transition-base)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                }}>
                {filter}
              </button>
            );
          })}
        </div>

        {/* ── Loading State ─────────────────────────────────────────── */}
        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--spacing-xl)',
          }}>
            {/* Render 6 skeleton cards as placeholders while loading */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '350px', borderRadius: 'var(--radius-lg)' }} />
            ))}
          </div>
        )}

        {/* ── Error State ─────────────────────────────────────────── */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <p style={{ color: 'var(--color-magenta)', marginBottom: 'var(--spacing-lg)' }}>
              Failed to load projects: {error}
            </p>
            {/* refetch() lets the user retry without refreshing the whole page */}
            <button className="btn btn-outline" onClick={refetch}>Try Again</button>
          </div>
        )}

        {/* ── Projects Grid ─────────────────────────────────────────── */}
        {!loading && !error && (
          <>
            {/* Show count of results */}
            <p style={{
              color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)',
              marginBottom: 'var(--spacing-xl)', textAlign: 'center',
            }}>
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {activeFilter !== 'All' && ` in ${activeFilter}`}
            </p>

            {filteredProjects.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 'var(--spacing-xl)',
              }}>
                {/*
                  Map over the filtered projects array.
                  Each project renders as a PortfolioCard.
                  "key" is required by React for list rendering — use a unique ID.
                  project._id comes from MongoDB (auto-generated unique ObjectId).
                */}
                {filteredProjects.map(project => (
                  <PortfolioCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  No projects found in this category yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
