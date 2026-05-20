import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Admin.css';

const StatCard = ({ label, value, sub, color }) => (
  <div className="dash-stat" style={{ '--s-color': color }}>
    <span className="ds-value" style={{ color }}>{value}</span>
    <span className="ds-label">{label}</span>
    {sub && <span className="ds-sub">{sub}</span>}
  </div>
);

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/admin/stats')
      .then(res => setStats(res.data.stats))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sb-sun">☀️</div>
          <div>
            <strong>Little Sunshine</strong>
            <small>Admin Panel</small>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sn-link active">
            <span>📊</span> Dashboard
          </Link>
          <Link to="/admin/waitlist" className="sn-link">
            <span>📋</span> Waitlist
            {stats?.pendingWaitlist > 0 && <span className="badge">{stats.pendingWaitlist}</span>}
          </Link>
          <Link to="/admin/messages" className="sn-link">
            <span>✉️</span> Messages
            {stats?.unreadMessages > 0 && <span className="badge">{stats.unreadMessages}</span>}
          </Link>
        </nav>
        <div className="sidebar-footer">
          <p className="admin-name">{admin?.name}</p>
          <p className="admin-email">{admin?.email}</p>
          <button onClick={handleLogout} className="logout-btn">Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {admin?.name?.split(' ')[0]}!</p>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="view-site-btn">View Website ↗</a>
        </header>

        {loading ? (
          <div className="loading-state">Loading...</div>
        ) : (
          <>
            <div className="dash-stats">
              <StatCard label="Total Waitlist" value={stats?.totalWaitlist ?? 0} color="var(--green-brand)" />
              <StatCard label="Pending Review" value={stats?.pendingWaitlist ?? 0} sub="Need attention" color="var(--sunshine-deep)" />
              <StatCard label="Enrolled" value={stats?.enrolledCount ?? 0} color="#1A7FAD" />
              <StatCard label="Unread Messages" value={stats?.unreadMessages ?? 0} color="var(--red-brand)" />
            </div>

            <div className="dash-grid">
              {/* Recent Waitlist */}
              <div className="dash-card">
                <div className="dc-header">
                  <h3>Recent Waitlist Applications</h3>
                  <Link to="/admin/waitlist" className="dc-link">View All →</Link>
                </div>
                {stats?.recentWaitlist?.length === 0 ? (
                  <p className="empty-state">No applications yet.</p>
                ) : (
                  <div className="mini-table">
                    {stats?.recentWaitlist?.map(entry => (
                      <div key={entry._id} className="mini-row">
                        <div>
                          <strong>{entry.childName}</strong>
                          <small>{entry.parentName}</small>
                        </div>
                        <div>
                          <span className="prog-badge">{entry.programType}</span>
                        </div>
                        <span className={`status-badge status-${entry.status.toLowerCase()}`}>{entry.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Messages */}
              <div className="dash-card">
                <div className="dc-header">
                  <h3>Recent Messages</h3>
                  <Link to="/admin/messages" className="dc-link">View All →</Link>
                </div>
                {stats?.recentMessages?.length === 0 ? (
                  <p className="empty-state">No messages yet.</p>
                ) : (
                  <div className="mini-table">
                    {stats?.recentMessages?.map(msg => (
                      <div key={msg._id} className="mini-row">
                        <div>
                          <strong>{msg.name} {!msg.isRead && <span className="unread-dot"/>}</strong>
                          <small>{msg.subject || 'General Inquiry'}</small>
                        </div>
                        <small>{new Date(msg.submittedAt).toLocaleDateString()}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Program Breakdown */}
              <div className="dash-card">
                <div className="dc-header"><h3>Waitlist by Program</h3></div>
                <div className="prog-breakdown">
                  {stats?.programBreakdown?.map(p => (
                    <div key={p._id} className="pb-item">
                      <span>{p._id}</span>
                      <div className="pb-bar">
                        <div className="pb-fill" style={{ width: `${Math.min((p.count / (stats.totalWaitlist || 1)) * 100, 100)}%` }}/>
                      </div>
                      <span className="pb-count">{p.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dash-card">
                <div className="dc-header"><h3>Quick Actions</h3></div>
                <div className="quick-actions">
                  <Link to="/admin/waitlist" className="qa-btn">📋 Manage Waitlist</Link>
                  <Link to="/admin/messages" className="qa-btn">✉️ Check Messages</Link>
                  <a href="mailto:littlesunshineelc23@gmail.com" className="qa-btn">📧 Send Email</a>
                  <a href="tel:+13067500848" className="qa-btn">📞 Call Centre</a>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
