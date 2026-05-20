import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const SunSVG = () => (
  <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="42" r="22" fill="#E8B84B"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
      <line key={i}
        x1={50 + 28 * Math.cos((angle * Math.PI) / 180)}
        y1={42 + 28 * Math.sin((angle * Math.PI) / 180)}
        x2={50 + 36 * Math.cos((angle * Math.PI) / 180)}
        y2={42 + 36 * Math.sin((angle * Math.PI) / 180)}
        stroke="#E8B84B" strokeWidth="3" strokeLinecap="round"
      />
    ))}
    <ellipse cx="35" cy="40" rx="10" ry="6" fill="#7ECFEA" opacity="0.9"/>
    <ellipse cx="65" cy="38" rx="10" ry="6" fill="#7ECFEA" opacity="0.9"/>
    <path d="M28 62 Q35 52 50 52 Q65 52 72 62 L74 72 Q60 68 50 68 Q40 68 26 72 Z" fill="#555"/>
    <ellipse cx="50" cy="52" rx="10" ry="12" fill="#1A1A1A"/>
    <line x1="50" y1="64" x2="50" y2="72" stroke="#1A1A1A" strokeWidth="3"/>
    <line x1="44" y1="68" x2="40" y2="76" stroke="#1A1A1A" strokeWidth="3"/>
    <line x1="56" y1="68" x2="60" y2="76" stroke="#1A1A1A" strokeWidth="3"/>
  </svg>
);

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/programs', label: 'Programs' },
  { path: '/team', label: 'Our Team' },
  { path: '/resources', label: 'Resources' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-brand">
          <SunSVG />
          <div className="brand-text">
            <span className="brand-main">Little Sunshine</span>
            <span className="brand-sub">Early Learning Centre</span>
          </div>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/waitlist" className="nav-cta">Join Waitlist</Link>
          </li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
