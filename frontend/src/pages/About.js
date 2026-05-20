import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const MissionSVG = () => (
  <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="about-svg">
    <rect width="280" height="200" rx="16" fill="#FFF8E7"/>
    <circle cx="140" cy="80" r="50" fill="#E8B84B" opacity="0.2"/>
    <circle cx="140" cy="80" r="35" fill="#E8B84B"/>
    {[0,60,120,180,240,300].map((a,i)=>(
      <line key={i} x1={140+42*Math.cos(a*Math.PI/180)} y1={80+42*Math.sin(a*Math.PI/180)}
        x2={140+52*Math.cos(a*Math.PI/180)} y2={80+52*Math.sin(a*Math.PI/180)}
        stroke="#E8B84B" strokeWidth="4" strokeLinecap="round"/>
    ))}
    <text x="140" y="86" textAnchor="middle" fontSize="24" fontFamily="Nunito,sans-serif" fontWeight="900" fill="white">★</text>
    <rect x="40" y="148" width="200" height="36" rx="10" fill="white" opacity="0.8"/>
    <text x="140" y="171" textAnchor="middle" fontSize="11" fontFamily="Nunito,sans-serif" fontWeight="800" fill="#2D7A3A">Our Mission & Vision</text>
    {[60,100,150,200,220].map((x,i)=>(
      <circle key={i} cx={x} cy={130} r={i%2===0?5:4} fill={i%3===0?'#D12B2B':i%3===1?'#2D7A3A':'#7ECFEA'} opacity="0.7"/>
    ))}
  </svg>
);

const values = [
  { title: 'Safety First', desc: 'A secure, supervised environment where every child is protected and cared for at all times.', color: '#2D7A3A', bg: '#E8F5EA' },
  { title: 'Inclusive Community', desc: 'We celebrate diversity and create a culturally inclusive space where every child and family feels welcomed.', color: '#D12B2B', bg: '#FFE8E8' },
  { title: 'Play-Based Learning', desc: 'Children learn best through play. Our curriculum is designed to make every moment an opportunity for growth.', color: '#E8B84B', bg: '#FFF8E7' },
  { title: 'Family Partnership', desc: 'We believe in building strong, open relationships with families as partners in each child\'s learning journey.', color: '#1A7FAD', bg: '#E8F4FF' },
  { title: 'Professional Excellence', desc: 'Our dedicated team of early childhood educators is committed to continuous learning and best practices.', color: '#7B4FAB', bg: '#F3EBFF' },
  { title: 'Child-Centered Approach', desc: 'Every program, activity, and interaction is guided by what is best for each individual child.', color: '#D4802A', bg: '#FFF0E0' },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero about-hero">
        <div className="container about-hero-inner">
          <div>
            <span className="section-tag">About Us</span>
            <h1 className="section-title">Our Story & <span>Mission</span></h1>
            <p className="section-sub">Little Sunshine Early Learning Centre is built on the belief that every child deserves a bright, nurturing start to their educational journey.</p>
          </div>
          <MissionSVG />
        </div>
      </section>

      {/* Welcome */}
      <section className="about-welcome">
        <div className="container">
          <div className="welcome-box">
            <div className="welcome-quote">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M8 20C8 13.4 13.4 8 20 8v8c-2.2 0-4 1.8-4 4v12H8V20zm24 0C32 13.4 37.4 8 44 8v8c-2.2 0-4 1.8-4 4v12H32V20z" fill="#E8B84B" opacity="0.3"/></svg>
              <p>
                Welcome to Little Sunshine Early Childhood Learning Center, where children learn, grow, and thrive in a safe, caring, and inclusive environment. We are committed to providing high-quality early childhood education that supports each child's social, emotional, cognitive, and physical development through play-based learning and meaningful experiences.
              </p>
            </div>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.8, marginTop: '20px' }}>
              Our Centre offers nurturing care, engaging educational activities, nutritious meals and snacks, and a welcoming environment where children feel valued, respected, and encouraged to explore their unique interests and abilities. We believe in building strong partnerships with families and working together to support every child's learning journey.
            </p>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.8, marginTop: '16px' }}>
              Our dedicated team strives to create a positive, supportive, and culturally inclusive environment that helps children build confidence, independence, and a lifelong love of learning.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-tag">Our Core Values</span>
            <h2 className="section-title">What We <span>Believe In</span></h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card" style={{ '--v-color': v.color, '--v-bg': v.bg }}>
                <div className="value-number">{String(i+1).padStart(2,'0')}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container about-stats-inner">
          {[
            { num: 'Licensed', label: 'By the Ministry of Education', sub: 'Saskatchewan' },
            { num: '4', label: 'Quality Programs', sub: 'Infant to School Age' },
            { num: '6wk+', label: 'Children Welcomed', sub: 'From 6 Weeks of Age' },
            { num: '100%', label: 'Play-Based', sub: 'Learning Approach' },
          ].map((s, i) => (
            <div key={i} className="astat">
              <span className="astat-num">{s.num}</span>
              <span className="astat-label">{s.label}</span>
              <span className="astat-sub">{s.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Be Part of Our Family?</h2>
          <p>We'd love to meet you and your child. Reach out or join our waitlist today.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '32px' }}>
            <Link to="/waitlist" className="btn-primary">Join Waitlist</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
