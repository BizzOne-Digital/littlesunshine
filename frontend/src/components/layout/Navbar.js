import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">

        {/* Logo */}
        <Link to="/" className="nav-brand">
          <img
            src="/logo.jpg"
            alt="Little Sunshine Logo"
            className="nav-logo"
          />
        </Link>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
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
            <Link to="/waitlist" className="nav-cta">
              Join Waitlist
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

      </div>
    </nav>
  );
}