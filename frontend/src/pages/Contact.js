import React, { useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import './Contact.css';

const PhoneSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
);

const EmailSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
);

const ClockSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const FacebookSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/contact', form);
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send. Please try calling us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-hero contact-hero">
        <div className="container">
          <span className="section-tag">Get In Touch</span>
          <h1 className="section-title">We'd Love to <span>Hear From You</span></h1>
          <p className="section-sub">Have questions about our programs? Want to schedule a visit? We're here to help!</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-inner">
          {/* Info Cards */}
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p className="contact-intro">Reach out by phone, email, or visit us. We look forward to welcoming you and your child!</p>

            <div className="info-cards">
              <a href="tel:+13067500848" className="info-card">
                <div className="info-icon phone-icon"><PhoneSVG /></div>
                <div>
                  <h4>Phone</h4>
                  <p>306-750-0848</p>
                </div>
              </a>
              <a href="mailto:littlesunshineelc23@gmail.com" className="info-card">
                <div className="info-icon email-icon"><EmailSVG /></div>
                <div>
                  <h4>Email</h4>
                  <p>littlesunshineelc23@gmail.com</p>
                </div>
              </a>
              <div className="info-card">
                <div className="info-icon hours-icon"><ClockSVG /></div>
                <div>
                  <h4>Hours of Operation</h4>
                  <p>Monday – Friday<br/>7:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h4>Follow Us</h4>
              <a href="https://www.facebook.com/profile.php?id=61571615544964" target="_blank" rel="noreferrer" className="facebook-link">
                <FacebookSVG /> Follow on Facebook
              </a>
            </div>

            <div className="contact-note">
              <strong>Director's Note</strong>
              <p>For enrollment inquiries, program information, or to schedule a tour, please don't hesitate to reach out. We're happy to answer any questions you may have.</p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll respond within 1-2 business days.</p>
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
                    <label>Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange}>
                      <option value="">Select a topic</option>
                      <option>Program Inquiry</option>
                      <option>Enrollment / Waitlist</option>
                      <option>Fees & Funding</option>
                      <option>Schedule a Tour</option>
                      <option>General Question</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help you..." rows={5} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
