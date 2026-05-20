import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Admin.css';

const SunSVG = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="28" fill="#E8B84B"/>
    {[0,45,90,135,180,225,270,315].map((a,i)=>(
      <line key={i} x1={50+34*Math.cos(a*Math.PI/180)} y1={50+34*Math.sin(a*Math.PI/180)}
        x2={50+44*Math.cos(a*Math.PI/180)} y2={50+44*Math.sin(a*Math.PI/180)}
        stroke="#E8B84B" strokeWidth="5" strokeLinecap="round"/>
    ))}
  </svg>
);

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-brand">
          <SunSVG />
          <div>
            <h1>Little Sunshine</h1>
            <p>Admin Portal</p>
          </div>
        </div>
        <h2>Sign In</h2>
        <p className="login-sub">Enter your credentials to access the admin panel</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@littlesunshine.ca" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <a href="/" className="back-link">← Back to Website</a>
      </div>
    </div>
  );
}
