import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/* ---- SVG Icons ---- */
const StarSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--sunshine)" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const HeartSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red-brand)" strokeWidth="2.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const ShieldSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green-brand)" strokeWidth="2.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const BookSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sunshine-deep)" strokeWidth="2.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const SmileSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sky)" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
  </svg>
);

const ArrowSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const PhoneSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const CheckSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green-brand)" strokeWidth="3" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ---- Scene SVG illustration ---- */
const HeroScene = () => (
  <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
    {/* Sky background */}
    <rect width="520" height="420" rx="24" fill="#FFF9EC"/>
    {/* Ground */}
    <ellipse cx="260" cy="390" rx="240" ry="40" fill="#D4EDDA"/>
    {/* Big sun */}
    <circle cx="260" cy="130" r="75" fill="#E8B84B" opacity="0.2"/>
    <circle cx="260" cy="130" r="55" fill="#E8B84B"/>
    {[0,45,90,135,180,225,270,315].map((a,i) => (
      <line key={i}
        x1={260+65*Math.cos(a*Math.PI/180)} y1={130+65*Math.sin(a*Math.PI/180)}
        x2={260+82*Math.cos(a*Math.PI/180)} y2={130+82*Math.sin(a*Math.PI/180)}
        stroke="#E8B84B" strokeWidth="5" strokeLinecap="round"
      />
    ))}
    {/* Clouds */}
    <ellipse cx="120" cy="90" rx="45" ry="22" fill="white" opacity="0.9"/>
    <ellipse cx="100" cy="95" rx="32" ry="18" fill="white" opacity="0.9"/>
    <ellipse cx="145" cy="95" rx="32" ry="18" fill="white" opacity="0.9"/>
    <ellipse cx="380" cy="75" rx="40" ry="20" fill="white" opacity="0.9"/>
    <ellipse cx="365" cy="80" rx="28" ry="16" fill="white" opacity="0.9"/>
    <ellipse cx="400" cy="80" rx="28" ry="16" fill="white" opacity="0.9"/>
    {/* House */}
    <rect x="155" y="230" width="210" height="150" rx="4" fill="#F5E6D0"/>
    <polygon points="140,230 260,155 380,230" fill="#D12B2B"/>
    <rect x="220" y="290" width="80" height="90" rx="4" fill="#8B6553"/>
    <rect x="170" y="255" width="55" height="50" rx="4" fill="#7ECFEA"/>
    <rect x="295" y="255" width="55" height="50" rx="4" fill="#7ECFEA"/>
    {/* Door handle */}
    <circle cx="292" cy="336" r="4" fill="#E8B84B"/>
    {/* Sign */}
    <rect x="185" y="192" width="150" height="28" rx="6" fill="white" opacity="0.9"/>
    <text x="260" y="211" textAnchor="middle" fontSize="9" fontFamily="Nunito,sans-serif" fontWeight="800" fill="#D12B2B">LITTLE SUNSHINE ELC</text>
    {/* Kids */}
    {/* Kid 1 - red */}
    <circle cx="125" cy="305" r="18" fill="#FDBCB4"/>
    <rect x="110" y="323" width="30" height="45" rx="8" fill="#D12B2B"/>
    <line x1="110" y1="340" x2="92" y2="360" stroke="#D12B2B" strokeWidth="8" strokeLinecap="round"/>
    <line x1="140" y1="340" x2="158" y2="360" stroke="#D12B2B" strokeWidth="8" strokeLinecap="round"/>
    <line x1="118" y1="368" x2="112" y2="390" stroke="#555" strokeWidth="7" strokeLinecap="round"/>
    <line x1="132" y1="368" x2="138" y2="390" stroke="#555" strokeWidth="7" strokeLinecap="round"/>
    {/* Kid 2 - green */}
    <circle cx="395" cy="300" r="18" fill="#FDBCB4"/>
    <rect x="380" y="318" width="30" height="45" rx="8" fill="#2D7A3A"/>
    <line x1="380" y1="335" x2="362" y2="355" stroke="#2D7A3A" strokeWidth="8" strokeLinecap="round"/>
    <line x1="410" y1="335" x2="428" y2="355" stroke="#2D7A3A" strokeWidth="8" strokeLinecap="round"/>
    <line x1="388" y1="363" x2="382" y2="385" stroke="#555" strokeWidth="7" strokeLinecap="round"/>
    <line x1="402" y1="363" x2="408" y2="385" stroke="#555" strokeWidth="7" strokeLinecap="round"/>
    {/* Flowers */}
    {[80, 160, 340, 430, 460].map((x,i) => (
      <g key={i}>
        <circle cx={x} cy={382} r={6} fill={i%2===0 ? '#E8B84B' : '#D12B2B'}/>
        <line x1={x} y1={388} x2={x} y2={400} stroke="#2D7A3A" strokeWidth="2.5"/>
      </g>
    ))}
    {/* Tree */}
    <rect x="447" y="310" width="12" height="70" fill="#8B6553"/>
    <circle cx="453" cy="285" r="40" fill="#2D7A3A"/>
    <circle cx="435" cy="298" r="28" fill="#35923F"/>
    <circle cx="472" cy="298" r="28" fill="#35923F"/>
  </svg>
);

export default function Home() {
  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-blob blob1"/>
          <div className="hero-blob blob2"/>
          <div className="hero-blob blob3"/>
        </div>
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <StarSVG /> Licensed Early Learning Centre
            </div>
            <h1 className="hero-title">
              Where Little <span className="highlight-red">Learners</span><br/>
              Shine <span className="highlight-green">Every Day</span>
            </h1>
            <p className="hero-desc">
              A safe, nurturing, and inclusive environment where children learn, grow, and thrive through play-based learning and meaningful experiences.
            </p>
            <div className="hero-actions">
              <Link to="/waitlist" className="btn-primary">Join Waitlist <ArrowSVG /></Link>
              <Link to="/programs" className="btn-secondary">View Programs</Link>
            </div>
            <div className="hero-contact">
              <PhoneSVG />
              <span>Call us: <a href="tel:+13067500848">306-750-0848</a></span>
            </div>
          </div>
          <div className="hero-visual">
            <HeroScene />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="container stats-inner">
          {[
            { num: '4', label: 'Age-Based Programs', color: 'var(--red-brand)' },
            { num: '6wk', label: 'Starting From', color: 'var(--sunshine-deep)' },
            { num: '100%', label: 'Licensed & Regulated', color: 'var(--green-brand)' },
            { num: '5★', label: 'Quality Care', color: 'var(--sky)' },
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <span className="stat-num" style={{ color: stat.color }}>{stat.num}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="container welcome-inner">
          <div className="welcome-text">
            <span className="section-tag">About Our Centre</span>
            <h2 className="section-title">A Place Children Call <span>Home</span></h2>
            <p className="section-sub">
              Welcome to Little Sunshine Early Childhood Learning Center, where children learn, grow, and thrive in a safe, caring, and inclusive environment. We are committed to providing high-quality early childhood education that supports each child's social, emotional, cognitive, and physical development.
            </p>
            <p className="section-sub" style={{ marginTop: '16px' }}>
              Our dedicated team strives to create a positive, supportive, and culturally inclusive environment that helps children build confidence, independence, and a lifelong love of learning.
            </p>
            <ul className="feature-list">
              {['Play-based learning approach', 'Nutritious meals and snacks included', 'Culturally inclusive environment', 'Strong family partnerships'].map((item, i) => (
                <li key={i}><CheckSVG />{item}</li>
              ))}
            </ul>
            <Link to="/about" className="btn-secondary">Learn More About Us <ArrowSVG /></Link>
          </div>
          <div className="welcome-cards">
            {[
              { icon: <HeartSVG />, title: 'Caring Environment', desc: 'Every child is valued, respected, and encouraged to explore their unique interests.' },
              { icon: <ShieldSVG />, title: 'Safe & Secure', desc: 'Licensed facility with trained staff ensuring your child\'s safety at all times.' },
              { icon: <BookSVG />, title: 'Quality Education', desc: 'Curriculum supporting literacy, numeracy, creativity and problem-solving skills.' },
              { icon: <SmileSVG />, title: 'Happy Children', desc: 'Building confidence, independence, and a lifelong love of learning through joy.' },
            ].map((card, i) => (
              <div key={i} className="welcome-card card">
                <div className="card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS PREVIEW */}
      <section className="programs-preview">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Our Programs</span>
            <h2 className="section-title">Programs for <span>Every Stage</span></h2>
            <p className="section-sub">Age-appropriate programs designed to nurture each child's development from infancy to school age.</p>
          </div>
          <div className="programs-grid">
            {[
              { emoji: '🍼', age: '6 weeks – 17 months', name: 'Infant Care', desc: 'Responsive, nurturing care focused on individual routines, sensory experiences, and early developmental milestones.', color: '#FFF3CC', border: '#E8B84B' },
              { emoji: '🧸', age: '18 – 29 months', name: 'Toddler Program', desc: 'Exploration, language development, social skills, and independence through play-based learning and hands-on activities.', color: '#FFE8E8', border: '#D12B2B' },
              { emoji: '🎨', age: '30 months – 5 years', name: 'Preschool Program', desc: 'School readiness through early literacy, numeracy, creativity, problem-solving, and social-emotional development.', color: '#E8F5EA', border: '#2D7A3A' },
              { emoji: '📚', age: '6+ years', name: 'School Age', desc: 'Before/after school care and summer programs providing a safe, enriching environment for school-age children.', color: '#E8F4FF', border: '#7ECFEA' },
            ].map((prog, i) => (
              <div key={i} className="program-card" style={{ '--prog-border': prog.border, '--prog-bg': prog.color }}>
                <div className="prog-emoji">{prog.emoji}</div>
                <span className="prog-age">{prog.age}</span>
                <h3>{prog.name}</h3>
                <p>{prog.desc}</p>
                <Link to="/programs" className="prog-link">Learn More <ArrowSVG /></Link>
              </div>
            ))}
          </div>
          <div className="programs-cta">
            <Link to="/programs" className="btn-sunshine">View All Programs & Fees <ArrowSVG /></Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-blob"/>
        <div className="container cta-inner">
          <div>
            <h2>Ready to Join Our <span>Little Sunshine</span> Family?</h2>
            <p>Spaces are limited. Secure your child's spot on our waitlist today and give them the best start in life.</p>
          </div>
          <div className="cta-actions">
            <Link to="/waitlist" className="btn-primary">Join Waitlist Now <ArrowSVG /></Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
