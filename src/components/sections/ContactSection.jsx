// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/components/sections/ContactSection.jsx
// PURPOSE: Contact form that POSTs to our Express backend API.
//
// FORM FLOW:
//   1. User fills out the form fields
//   2. User clicks "Send Message"
//   3. handleSubmit() is called (triggered by the button's onClick)
//   4. We POST the form data to POST /api/contact via Axios
//   5. On success: show a success message
//   6. On failure: show an error message
//
// STATE VARIABLES:
//   formData   — Object holding current form field values
//   status     — 'idle' | 'loading' | 'success' | 'error'
//   errorMsg   — Error message string to display on failure
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import api from '../../utils/api'; // Our pre-configured Axios instance

// Service options for the dropdown — matches our Submission model's enum
const SERVICE_OPTIONS = [
  'Website Creation',
  'Website Innovation',
  'Logo & Brand Design',
  'AI Visual Integration',
  'Optimization',
  'Other',
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: ContactSection
// id="contact" is the scroll target for the Navbar and CTA buttons.
// ─────────────────────────────────────────────────────────────────────────────
const ContactSection = () => {
  // ── Form State ─────────────────────────────────────────────────────────
  // formData holds all form field values as one object.
  // When any field changes, we update just that field using the spread operator.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  // status tracks which UI state to show:
  //   'idle'    — Default, form is ready to submit
  //   'loading' — Request is in flight (show spinner)
  //   'success' — Request succeeded (show thank you message)
  //   'error'   — Request failed (show error message)
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // ── Input Change Handler ────────────────────────────────────────────────
  // This single function handles ALL form fields.
  // e.target.name maps to the field's "name" attribute.
  // e.target.value is the new value the user typed.
  //
  // The spread operator (...formData) copies all existing fields,
  // then we override just the one that changed:
  // { name: '', email: '', phone: '' } + { [name]: 'John' } = { name: 'John', email: '', phone: '' }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Form Submit Handler ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    // Prevent the button's default behavior (page reload for HTML forms)
    e.preventDefault();

    // Basic client-side validation before hitting the API
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // POST to /api/contact — our submissionRoutes.js handles this
      // api.post(url, data) sends the formData object as the JSON request body
      await api.post('/contact', formData);

      // On success: update status and reset the form
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });

    } catch (err) {
      // Extract the error message from the API response (or fallback text)
      const message = err.response?.data?.message || 'Failed to send. Please try again.';
      setErrorMsg(message);
      setStatus('error');
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', right: '-200px', transform: 'translateY(-50%)',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* ── Section Header ─────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--color-cyan)', marginBottom: 'var(--spacing-md)',
          }}>
            — Get in Touch —
          </p>
          <h2 className="section-title" style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--spacing-lg)' }}>
            Ready to <span className="accent">Elevate</span> Your Brand?
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', maxWidth: '500px', margin: '0 auto' }}>
            Tell us about your project. We'll get back to you within 24 hours.
          </p>
        </div>

        {/* ── Form + Info Layout ─────────────────────────────────────── */}
// NEW
<div className="contact-grid">

          {/* Left: Contact Info */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)',
              marginBottom: 'var(--spacing-xl)', color: 'var(--color-cyan)',
            }}>
              Let's Build Something Extraordinary
            </h3>

            {[
              { label: 'Email', value: 'contact.dravastudio@gmail.com', icon: '◈' },
              { label: 'Response Time', value: 'Within 24 hours', icon: '◉' },
              { label: 'Based In', value: 'Digital-First, Global', icon: '◇' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-lg)', alignItems: 'flex-start',
              }}>
                <span style={{ color: 'var(--color-cyan)', fontSize: '1rem', marginTop: '2px' }}>{item.icon}</span>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.6rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--color-text-secondary)', marginBottom: '2px',
                  }}>
                    {item.label}
                  </p>
                  <p style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <div className="glass" style={{ padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-xl)' }}>

            {/* ── SUCCESS STATE ─────────────────────────────────────── */}
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl) 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-cyan)' }}>◈</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cyan)', marginBottom: 'var(--spacing-md)' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  We've received your inquiry and will be in touch within 24 hours.
                </p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: 'var(--spacing-xl)' }}
                  onClick={() => setStatus('idle')}>
                  Send Another Message
                </button>
              </div>
            ) : (
              /* ── FORM STATE ─────────────────────────────────────── */
              <div>
                {/* Name + Email row */}
                // NEW
<div className="form-row">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                      Name *
                    </label>
                    {/* name="name" links this input to formData.name via handleChange */}
                    <input
                      className="input" type="text" name="name"
                      placeholder="Your name" value={formData.name}
                      onChange={handleChange} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                      Email *
                    </label>
                    <input
                      className="input" type="email" name="email"
                      placeholder="your@email.com" value={formData.email}
                      onChange={handleChange} required />
                  </div>
                </div>

                {/* Phone + Service row */}
                <div className="form-row">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                      Phone
                    </label>
                    <input
                      className="input" type="tel" name="phone"
                      placeholder="Optional" value={formData.phone}
                      onChange={handleChange} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                      Service
                    </label>
                    <select
                      className="input" name="service"
                      value={formData.service} onChange={handleChange}
                      style={{ cursor: 'pointer' }}>
                      {/* Hardcoding the dark styles directly into the React components */}
                      <option value="" style={{ backgroundColor: '#080d1a', color: '#8892b0' }}>
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map(opt => (
                        <option key={opt} value={opt} style={{ backgroundColor: '#080d1a', color: '#ffffff' }}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                    Message *
                  </label>
                  <textarea
                    className="textarea" name="message"
                    placeholder="Tell us about your project, goals, and timeline..."
                    value={formData.message} onChange={handleChange} required />
                </div>

                {/* Error Message */}
                {status === 'error' && (
                  <p style={{
                    color: 'var(--color-magenta)', fontSize: 'var(--text-sm)',
                    marginBottom: 'var(--spacing-md)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: 'rgba(255,0,170,0.08)',
                    border: '1px solid rgba(255,0,170,0.2)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    {errorMsg}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
