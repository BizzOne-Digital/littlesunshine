import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const PhoneSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const EmailSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const FacebookSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const HeartSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--red-brand)" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#1A1A1A"/>
        </svg>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>Little <span>Sunshine</span></h3>
            <p className="footer-tagline">Early Learning Centre</p>
            <p className="footer-desc">Where children learn, grow, and thrive in a safe, caring, and inclusive environment.</p>
            <a href="https://www.facebook.com/profile.php?id=61571615544964" target="_blank" rel="noreferrer" className="social-link">
              <FacebookSVG />
              <span>Follow us on Facebook</span>
            </a>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Programs</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/resources">Links & Resources</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              <li><Link to="/programs">Infant Care (6wks – 17mo)</Link></li>
              <li><Link to="/programs">Toddler Program (18–29mo)</Link></li>
              <li><Link to="/programs">Preschool (30mo – 5yrs)</Link></li>
              <li><Link to="/programs">School Age (6+ yrs)</Link></li>
              <li><Link to="/waitlist">Join Waitlist</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="contact-item">
              <PhoneSVG />
              <a href="tel:+13067500848">306-750-0848</a>
            </div>
            <div className="contact-item">
              <EmailSVG />
              <a href="mailto:littlesunshineelc23@gmail.com">littlesunshineelc23@gmail.com</a>
            </div>
            <div className="footer-hours">
              <h5>Hours of Operation</h5>
              <p>Monday – Friday<br/>7:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Little Sunshine Early Learning Centre. All rights reserved.</p>
          <p className="made-with">Made with <HeartSVG /> for the children</p>
        </div>
      </div>
    </footer>
  );
}
