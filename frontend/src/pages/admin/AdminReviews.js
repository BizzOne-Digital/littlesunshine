import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const STATUS_COLORS = { Pending: '#E8B84B', Approved: '#2D7A3A', Rejected: '#D12B2B' };

export default function AdminReviews() {
  const { admin, logout } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchReviews = async () => {
    try {
      const params = {};
      if (filter) params.status = filter;
      const res = await api.get('/api/reviews', { params });
      setReviews(res.data.reviews);
    } catch { toast.error('Failed to load reviews'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/reviews/${id}`, { status });
      toast.success(`Review ${status.toLowerCase()}`);
      fetchReviews();
    } catch { toast.error('Update failed'); }
  };

  const deleteReview = async id => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await api.delete(`/api/reviews/${id}`);
      toast.success('Review deleted');
      fetchReviews();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sb-sun">☀️</div>
          <div><strong>Little Sunshine</strong><small>Admin Panel</small></div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sn-link">📊 Dashboard</Link>
          <Link to="/admin/waitlist" className="sn-link">📋 Waitlist</Link>
          <Link to="/admin/messages" className="sn-link">✉️ Messages</Link>
          <Link to="/admin/reviews" className="sn-link active">⭐ Reviews</Link>
        </nav>
        <div className="sidebar-footer">
          <p className="admin-name">{admin?.name}</p>
          <button onClick={logout} className="logout-btn">Sign Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div><h1>Reviews</h1><p>{reviews.length} total reviews</p></div>
        </header>

        <div className="filter-bar">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All Statuses</option>
            {['Pending', 'Approved', 'Rejected'].map(s => <option key={s}>{s}</option>)}
          </select>
          <button onClick={() => setFilter('')} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>Clear</button>
        </div>

        {loading ? <div className="loading-state">Loading...</div> : (
          <div className="mini-table" style={{ marginTop: '20px' }}>
            {reviews.map(r => (
              <div key={r._id} className="mini-row" style={{ flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <strong>{r.name}</strong>
                  <small>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</small>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--gray-text)' }}>{r.message}</p>
                </div>
                <span className="status-badge" style={{ background: STATUS_COLORS[r.status] + '22', color: STATUS_COLORS[r.status] }}>
                  {r.status}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {r.status !== 'Approved' && (
                    <button onClick={() => updateStatus(r._id, 'Approved')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Approve</button>
                  )}
                  {r.status !== 'Rejected' && (
                    <button onClick={() => updateStatus(r._id, 'Rejected')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Reject</button>
                  )}
                  <button onClick={() => deleteReview(r._id)} className="delete-btn" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>Delete</button>
                </div>
              </div>
            ))}
            {reviews.length === 0 && <p className="empty-state">No reviews found.</p>}
          </div>
        )}
      </main>
    </div>
  );
}
