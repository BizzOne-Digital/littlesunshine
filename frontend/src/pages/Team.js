import React, { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowed.includes(file.type)) {
        toast.error('Please upload a PDF or Word document.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be under 5MB.');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (resumeFile) formData.append('resume', resumeFile);

      await api.post('/api/careers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Application sent! We\'ll be in touch soon.');
      setForm({ name: '', email: '', phone: '', position: '', message: '' });
      setResumeFile(null);
      setShowForm(false);
    } catch (err) {
      toast.error('Failed to send. Please email us directly at littlesunshineelc23@gmail.com');
    } finally {
      setLoading(false);
    }
  };

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
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Send Your Resume
          </button>
        </div>

        {showForm && (
          <div className="career-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
            <div className="career-modal">
              <button className="modal-close" onClick={() => setShowForm(false)} aria-label="Close">✕</button>
              <h2>Career Application</h2>
              <p>Fill out the form below and attach your resume. We'll review and get back to you!</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Optional" />
                  </div>
                  <div className="form-group">
                    <label>Position of Interest</label>
                    <select name="position" value={form.position} onChange={handleChange}>
                      <option value="">Select a position</option>
                      <option>Early Childhood Educator</option>
                      <option>Infant Caregiver</option>
                      <option>Support Staff</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Cover Letter / Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about yourself and why you'd like to join our team..." rows={4} required />
                </div>
                <div className="form-group">
                  <label>Attach Resume (PDF or Word, max 5MB)</label>
                  <div className="file-upload-box">
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="resume-upload" className="file-upload-label">
                      {resumeFile ? (
                        <span className="file-selected">📎 {resumeFile.name}</span>
                      ) : (
                        <span>📎 Click to attach your resume</span>
                      )}
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
