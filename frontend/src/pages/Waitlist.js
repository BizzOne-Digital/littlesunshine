import React, { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import './Waitlist.css';

const SuccessSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="120">
    <circle cx="60" cy="60" r="58" fill="#E8F5EA"/>
    <circle cx="60" cy="60" r="44" fill="#2D7A3A" opacity="0.15"/>
    <circle cx="60" cy="60" r="30" fill="#2D7A3A"/>
    <polyline points="44,62 56,74 78,50" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export default function Waitlist() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    parentName: '', email: '', phone: '', address: '',
    childName: '', childDOB: '', childGender: '',
    programType: '', scheduleType: '', desiredStartDate: '', additionalNotes: ''
  });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleNext = () => {
    if (step === 1) {
      if (!form.parentName || !form.email || !form.phone) { toast.error('Please fill in all required fields.'); return; }
    }
    if (step === 2) {
      if (!form.childName || !form.childDOB) { toast.error('Please fill in child details.'); return; }
    }
    setStep(s => s + 1);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.programType || !form.scheduleType) { toast.error('Please select a program and schedule.'); return; }
    setLoading(true);
    try {
      await api.post('/api/waitlist', form);
      setSubmitted(true);
    } catch (err) {
      toast.error('Submission failed. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="waitlist-page">
        <div className="container success-wrap">
          <SuccessSVG />
          <h2>Application Submitted!</h2>
          <p>Thank you, <strong>{form.parentName}</strong>! We have received your waitlist application for <strong>{form.childName}</strong>.</p>
          <p>We will review your application and contact you within 2-3 business days at <strong>{form.email}</strong>.</p>
          <div className="success-contact">
            <p>Questions? Contact us:</p>
            <a href="tel:+13067500848">306-750-0848</a>
            <a href="mailto:littlesunshineelc23@gmail.com">littlesunshineelc23@gmail.com</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="waitlist-page">
      <section className="page-hero waitlist-hero">
        <div className="container">
          <span className="section-tag">Enrollment</span>
          <h1 className="section-title">Join Our <span>Waitlist</span></h1>
          <p className="section-sub">Spaces are limited. Complete the form below to secure your child's spot at Little Sunshine Early Learning Centre.</p>
        </div>
      </section>

      <section className="waitlist-form-section">
        <div className="container waitlist-inner">
          <div className="waitlist-sidebar">
            <div className="steps-tracker">
              {[
                { num: 1, label: 'Parent Info' },
                { num: 2, label: 'Child Info' },
                { num: 3, label: 'Program Choice' },
              ].map(s => (
                <div key={s.num} className={`step-item ${step >= s.num ? 'active' : ''} ${step > s.num ? 'done' : ''}`}>
                  <div className="step-circle">{step > s.num ? '✓' : s.num}</div>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="sidebar-info">
              <h4>Important Info</h4>
              <ul>
                <li>Ministry funding available for eligible families</li>
                <li>We accept children from 6 weeks of age</li>
                <li>Full-time, part-time & daily drop-in options</li>
                <li>Response within 2-3 business days</li>
              </ul>
              <div className="sidebar-contact">
                <strong>Questions?</strong>
                <a href="tel:+13067500848">306-750-0848</a>
              </div>
            </div>
          </div>

          <div className="waitlist-form-card">
            <form onSubmit={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="form-step">
                  <h2>Parent / Guardian Information</h2>
                  <p>Please provide your contact details so we can reach you.</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input name="parentName" value={form.parentName} onChange={handleChange} placeholder="Parent/Guardian full name" required />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="306-xxx-xxxx" required />
                    </div>
                    <div className="form-group">
                      <label>Home Address</label>
                      <input name="address" value={form.address} onChange={handleChange} placeholder="Optional" />
                    </div>
                  </div>
                  <button type="button" className="btn-primary" onClick={handleNext} style={{ width: '100%', justifyContent: 'center' }}>
                    Next: Child Information →
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="form-step">
                  <h2>Child's Information</h2>
                  <p>Tell us about your child so we can find the right program.</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Child's Full Name *</label>
                      <input name="childName" value={form.childName} onChange={handleChange} placeholder="Child's full name" required />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth *</label>
                      <input name="childDOB" type="date" value={form.childDOB} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select name="childGender" value={form.childGender} onChange={handleChange}>
                      <option value="">Prefer not to say</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div className="step-nav">
                    <button type="button" className="btn-secondary" onClick={() => setStep(1)}>← Back</button>
                    <button type="button" className="btn-primary" onClick={handleNext}>Next: Program Choice →</button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="form-step">
                  <h2>Program & Schedule Preference</h2>
                  <p>Select the program and schedule that best fits your family's needs.</p>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Program Type *</label>
                      <select name="programType" value={form.programType} onChange={handleChange} required>
                        <option value="">Select program</option>
                        <option>Infant</option>
                        <option>Toddler</option>
                        <option>Preschool</option>
                        <option>School Age</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Schedule *</label>
                      <select name="scheduleType" value={form.scheduleType} onChange={handleChange} required>
                        <option value="">Select schedule</option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                        <option>Daily Drop-in</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Desired Start Date</label>
                    <input name="desiredStartDate" type="date" value={form.desiredStartDate} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea name="additionalNotes" value={form.additionalNotes} onChange={handleChange} placeholder="Any special needs, questions, or information we should know..." rows={4} />
                  </div>
                  <div className="step-nav">
                    <button type="button" className="btn-secondary" onClick={() => setStep(2)}>← Back</button>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
