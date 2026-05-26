import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Programs.css';

const CheckSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const ArrowSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

const programs = [
  {
    id: 'infant',
    label: 'Infant',
    age: '6 Weeks – 17 Months',
    color: '#E8B84B',
    bg: '#FFF8E7',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
        <circle cx="30" cy="30" r="28" fill="#FFF3CC"/>
        <circle cx="30" cy="24" r="12" fill="#FDBCB4"/>
        <path d="M18 44 Q30 36 42 44" stroke="#E8B84B" strokeWidth="3" fill="none"/>
        <circle cx="26" cy="22" r="2" fill="#555"/>
        <circle cx="34" cy="22" r="2" fill="#555"/>
        <path d="M27 29 Q30 32 33 29" stroke="#D12B2B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Infant Care Program',
    tagline: 'Safe, nurturing care from the very beginning',
    description: 'We provide a safe, nurturing, and responsive environment for infants, focusing on individual routines, sensory experiences, and early developmental milestones. Each infant receives personalized attention and care in a warm, home-like setting.',
    features: [
      'Individual routine-based care',
      'Sensory exploration activities',
      'Early developmental milestone support',
      'Nutritious meals and formula support',
      'Regular developmental updates to parents',
    ],
    fees: [
      { schedule: 'Full Time', fee: '$832.00', parentPortion: '$217.50', ministry: '$614.50' },
      { schedule: 'Daily', fee: '$58.24', parentPortion: '$10.00', ministry: '$48.24' },
    ]
  },
  {
    id: 'toddler',
    label: 'Toddler',
    age: '18 – 29 Months',
    color: '#D12B2B',
    bg: '#FFE8E8',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
        <circle cx="30" cy="30" r="28" fill="#FFE8E8"/>
        <circle cx="30" cy="20" r="10" fill="#FDBCB4"/>
        <rect x="22" y="30" width="16" height="20" rx="5" fill="#D12B2B"/>
        <line x1="22" y1="38" x2="14" y2="46" stroke="#D12B2B" strokeWidth="5" strokeLinecap="round"/>
        <line x1="38" y1="38" x2="46" y2="46" stroke="#D12B2B" strokeWidth="5" strokeLinecap="round"/>
        <line x1="26" y1="50" x2="24" y2="56" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
        <line x1="34" y1="50" x2="36" y2="56" stroke="#555" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Toddler Program',
    tagline: 'Building independence one step at a time',
    description: 'Our toddler program encourages exploration, language development, social skills, and independence through play-based learning and hands-on activities. We create a structured yet fun environment that supports toddlers as they discover the world around them.',
    features: [
      'Language and communication development',
      'Social skills and peer interaction',
      'Fine and gross motor skill activities',
      'Creative arts and music',
      'Outdoor play and exploration',
      'Toilet training support',
    ],
    fees: [
      { schedule: 'Full Time', fee: '$738.15', parentPortion: '$217.50', ministry: '$520.65' },
      { schedule: 'Daily', fee: '$51.67', parentPortion: '$10.00', ministry: '$41.67' },
    ]
  },
  {
    id: 'preschool',
    label: 'Preschool',
    age: '30 Months – 5 Years',
    color: '#2D7A3A',
    bg: '#E8F5EA',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
        <circle cx="30" cy="30" r="28" fill="#E8F5EA"/>
        <circle cx="30" cy="20" r="10" fill="#FDBCB4"/>
        <rect x="22" y="30" width="16" height="20" rx="5" fill="#2D7A3A"/>
        <rect x="34" y="22" width="16" height="12" rx="3" fill="#E8B84B"/>
        <line x1="36" y1="26" x2="48" y2="26" stroke="white" strokeWidth="1.5"/>
        <line x1="36" y1="29" x2="48" y2="29" stroke="white" strokeWidth="1.5"/>
        <line x1="36" y1="32" x2="45" y2="32" stroke="white" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Preschool Program',
    tagline: 'Preparing curious minds for school and beyond',
    description: 'The preschool program supports school readiness by promoting early literacy, numeracy, creativity, problem-solving, and social-emotional development in a fun and engaging environment. Children build the skills and confidence they need for a successful kindergarten transition.',
    features: [
      'Early literacy and pre-reading skills',
      'Number concepts and early math',
      'Creative arts and dramatic play',
      'Problem-solving and critical thinking',
      'Social-emotional learning',
      'Kindergarten readiness preparation',
    ],
    fees: [
      { schedule: 'Full Time', fee: '$672.25', parentPortion: '$217.50', ministry: '$454.75' },
      { schedule: 'Daily', fee: '$47.06', parentPortion: '$10.00', ministry: '$37.06' },
    ],
    note: 'Kindergarten children who turn 6 prior to April 1, 2026 are charged preschool fees until end of kindergarten.'
  },
  {
    id: 'school-age',
    label: 'School Age',
    age: '6+ Years',
    color: '#1A7FAD',
    bg: '#E8F4FF',
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
        <circle cx="30" cy="30" r="28" fill="#E8F4FF"/>
        <circle cx="30" cy="18" r="10" fill="#FDBCB4"/>
        <rect x="21" y="28" width="18" height="22" rx="5" fill="#1A7FAD"/>
        <rect x="18" y="10" width="24" height="16" rx="4" fill="#E8B84B"/>
        <text x="30" y="22" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="Nunito,sans-serif" fill="#D12B2B">ABC</text>
      </svg>
    ),
    title: 'School Age Program',
    tagline: 'Safe, enriching care before and after school',
    description: 'Our school age program provides a safe, supportive environment for children 6 years and older. We offer before and after school care, PD day care, and summer programs filled with enriching activities that complement their school experience.',
    features: [
      'Before and after school care',
      'PD Day programming',
      'Summer camp activities',
      'Homework support time',
      'Recreational and creative activities',
      'Safe pick-up and drop-off coordination',
    ],
    fees: [
      { schedule: 'Full Time', fee: '$505.84', parentPortion: '$505.84', ministry: '—' },
      { schedule: 'Part Time (Before/After + PD Days)', fee: '$435.88', parentPortion: '$435.88', ministry: '—' },
      { schedule: 'Daily', fee: '$51.25', parentPortion: '$51.25', ministry: '—' },
      { schedule: 'Summer', fee: '$605.84', parentPortion: '$605.84', ministry: '—' },
    ]
  },
];

export default function Programs() {
  const [active, setActive] = useState('infant');
  const prog = programs.find(p => p.id === active);

  return (
    <div className="programs-page">
      {/* Header */}
      <section className="page-hero" style={{ background: `linear-gradient(135deg, ${prog.bg} 0%, var(--white) 100%)` }}>
        <div className="container">
          <span className="section-tag">Our Programs</span>
          <h1 className="section-title">Programs for <span>Every Child</span></h1>
          <p className="section-sub">Licensed, play-based programs supporting children from 6 weeks to school age. Quality care with Ministry of Education funding support.</p>
        </div>
      </section>

      {/* Tab nav */}
      <div className="prog-tabs-wrap">
        <div className="container prog-tabs">
          {programs.map(p => (
            <button
              key={p.id}
              className={`prog-tab ${active === p.id ? 'active' : ''}`}
              style={active === p.id ? { '--tab-color': p.color, background: p.color } : {}}
              onClick={() => setActive(p.id)}
            >
              <span className="tab-icon">{p.icon}</span>
              <span>
                <strong>{p.label}</strong>
                <small>{p.age}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Program detail */}
      <section className="prog-detail">
        <div className="container prog-detail-inner">
          <div className="prog-info">
            <div className="prog-big-icon" style={{ background: prog.bg }}>{prog.icon}</div>
            <span className="prog-age-badge" style={{ background: prog.bg, color: prog.color }}>{prog.age}</span>
            <h2 style={{ color: prog.color }}>{prog.title}</h2>
            <p className="prog-tagline">{prog.tagline}</p>
            <p className="prog-desc">{prog.description}</p>
            <h4>What We Offer:</h4>
            <ul className="prog-features">
              {prog.features.map((f, i) => (
                <li key={i} style={{ '--f-color': prog.color }}>
                  <span className="f-check"><CheckSVG /></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="prog-fees-side">
            <div className="fees-card" style={{ '--fees-color': prog.color, '--fees-bg': prog.bg }}>
              <h3>Fee Structure</h3>
              <p className="fees-note">Fees effective 2025-2026.</p>
              <div className="fees-table">
                <div className="fees-thead">
                  <span>Schedule</span>
                  <span>Total Fee</span>
                  <span>Parent Portion</span>
                  <span>Ministry</span>
                </div>
                {prog.fees.map((f, i) => (
                  <div key={i} className="fees-row">
                    <span className="fee-schedule">{f.schedule}</span>
                    <span className="fee-total">{f.fee}</span>
                    <span className="fee-parent" style={{ color: prog.color }}>{f.parentPortion}</span>
                    <span className="fee-ministry">{f.ministry}</span>
                  </div>
                ))}
              </div>
              {prog.note && <p className="fees-extra-note">{prog.note}</p>}
              <div className="fees-info-box">
                <strong>Ministry Grant Support</strong>
                <p>The Saskatchewan Ministry of Education provides funding to reduce childcare costs for eligible families. Contact us to learn more about your eligibility.</p>
              </div>
              <Link to="/waitlist" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
                Register / Join Waitlist <ArrowSVG />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="prog-bottom-cta">
        <div className="container">
          <h2>Have Questions About Our Programs?</h2>
          <p>Our team is happy to help you find the right program for your child.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary">Contact Us <ArrowSVG /></Link>
            <a href="tel:+13067500848" className="btn-secondary">Call 306-750-0848</a>
          </div>
        </div>
      </section>
    </div>
  );
}
