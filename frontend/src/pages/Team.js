import React from 'react';
import './Team.css';

const PersonSVG = ({ color = '#E8B84B', initials = 'EC' }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
    <circle cx="60" cy="60" r="60" fill={color} opacity="0.15"/>
    <circle cx="60" cy="46" r="24" fill={color} opacity="0.8"/>
    <path d="M20 100C20 80 38 66 60 66C82 66 100 80 100 100" fill={color}/>
    <text x="60" y="52" textAnchor="middle" fontSize="14" fontFamily="Nunito,sans-serif" fontWeight="900" fill="white">{initials}</text>
  </svg>
);

const teamMembers = [
  {
    name: 'The Director',
    role: 'Centre Director & Lead Educator',
    bio: 'With extensive experience in early childhood education, our director leads Little Sunshine with passion, dedication, and a deep commitment to every child\'s wellbeing and development.',
    color: '#D12B2B',
    initials: 'DIR',
    specialties: ['Program Development', 'Family Relations', 'Licensing & Compliance'],
  },
  {
    name: 'Early Childhood Educators',
    role: 'Registered ECE Team',
    bio: 'Our team of qualified Early Childhood Educators brings warmth, creativity, and expertise to every interaction. Each educator is trained in child development and dedicated to creating nurturing learning experiences.',
    color: '#2D7A3A',
    initials: 'ECE',
    specialties: ['Play-Based Learning', 'Child Development', 'Inclusive Education'],
  },
  {
    name: 'Support Staff',
    role: 'Care & Administrative Team',
    bio: 'Behind every great childcare centre is a team of dedicated support staff who ensure smooth daily operations, nutritious meals, a clean environment, and warm care for every child.',
    color: '#E8B84B',
    initials: 'SUP',
    specialties: ['Nutritious Meal Prep', 'Centre Operations', 'Child Safety'],
  },
];

export default function Team() {
  return (
    <div className="team-page">
      <section className="page-hero team-hero">
        <div className="container">
          <span className="section-tag">Our Team</span>
          <h1 className="section-title">Meet the People Behind <span>Little Sunshine</span></h1>
          <p className="section-sub">Our dedicated team of early childhood professionals is passionate about making every child's experience exceptional.</p>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div key={i} className="team-card card" style={{ '--t-color': member.color }}>
                <div className="team-avatar" style={{ background: member.color + '20' }}>
                  <PersonSVG color={member.color} initials={member.initials} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role" style={{ color: member.color }}>{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-specialties">
                    {member.specialties.map((s, j) => (
                      <span key={j} className="specialty-tag" style={{ background: member.color + '18', color: member.color }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="join-team">
        <div className="container join-inner">
          <div>
            <span className="section-tag">Careers</span>
            <h2 className="section-title">Want to Join Our <span>Team?</span></h2>
            <p className="section-sub">We are always looking for passionate, dedicated early childhood educators to join the Little Sunshine family.</p>
          </div>
          <a href="mailto:littlesunshineelc23@gmail.com?subject=Career Inquiry" className="btn-primary">
            Send Your Resume
          </a>
        </div>
      </section>
    </div>
  );
}
