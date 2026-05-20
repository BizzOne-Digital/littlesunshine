import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const STATUS_COLORS = {
  Pending: '#E8B84B', Contacted: '#1A7FAD', Enrolled: '#2D7A3A',
  Waitlisted: '#7B4FAB', Declined: '#D12B2B'
};

export default function AdminWaitlist() {
  const { logout } = useAuth();
  const { admin } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', program: '' });
  const [selected, setSelected] = useState(null);

  const fetchEntries = async () => {
    try {
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.program) params.program = filter.program;
      const res = await api.get('/api/waitlist', { params });
      setEntries(res.data.entries);
    } catch { toast.error('Failed to load entries'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchEntries(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/api/waitlist/${id}`, { status });
      toast.success('Status updated');
      fetchEntries();
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch { toast.error('Update failed'); }
  };

  const deleteEntry = async id => {
    if (!window.confirm('Delete this entry?')) return;
    try {
      await api.delete(`/api/waitlist/${id}`);
      toast.success('Entry deleted');
      setSelected(null);
      fetchEntries();
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
          <Link to="/admin/waitlist" className="sn-link active">📋 Waitlist</Link>
          <Link to="/admin/messages" className="sn-link">✉️ Messages</Link>
        </nav>
        <div className="sidebar-footer">
          <p className="admin-name">{admin?.name}</p>
          <button onClick={logout} className="logout-btn">Sign Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div><h1>Waitlist Management</h1><p>{entries.length} total entries</p></div>
        </header>

        {/* Filters */}
        <div className="filter-bar">
          <select value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}>
            <option value="">All Statuses</option>
            {['Pending','Contacted','Enrolled','Waitlisted','Declined'].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filter.program} onChange={e => setFilter(f => ({ ...f, program: e.target.value }))}>
            <option value="">All Programs</option>
            {['Infant','Toddler','Preschool','School Age'].map(p => <option key={p}>{p}</option>)}
          </select>
          <button onClick={() => setFilter({ status: '', program: '' })} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>Clear</button>
        </div>

        <div className="wl-layout">
          {/* Table */}
          <div className="wl-table-wrap">
            {loading ? <div className="loading-state">Loading...</div> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Child Name</th>
                    <th>Parent</th>
                    <th>Program</th>
                    <th>Schedule</th>
                    <th>Status</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(entry => (
                    <tr key={entry._id} onClick={() => setSelected(entry)} className={selected?._id === entry._id ? 'selected' : ''}>
                      <td><strong>{entry.childName}</strong></td>
                      <td>{entry.parentName}</td>
                      <td><span className="prog-badge">{entry.programType}</span></td>
                      <td style={{ fontSize: '0.82rem' }}>{entry.scheduleType}</td>
                      <td>
                        <span className="status-badge" style={{ background: STATUS_COLORS[entry.status] + '22', color: STATUS_COLORS[entry.status] }}>
                          {entry.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--gray-text)' }}>
                        {new Date(entry.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {entries.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-text)' }}>No entries found</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="detail-panel">
              <div className="dp-header">
                <h3>{selected.childName}</h3>
                <button onClick={() => setSelected(null)} className="close-btn">✕</button>
              </div>
              <div className="dp-section">
                <h4>Child Information</h4>
                <p><strong>DOB:</strong> {new Date(selected.childDOB).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {selected.childGender || 'Not specified'}</p>
              </div>
              <div className="dp-section">
                <h4>Parent/Guardian</h4>
                <p><strong>Name:</strong> {selected.parentName}</p>
                <p><strong>Email:</strong> <a href={`mailto:${selected.email}`}>{selected.email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${selected.phone}`}>{selected.phone}</a></p>
                {selected.address && <p><strong>Address:</strong> {selected.address}</p>}
              </div>
              <div className="dp-section">
                <h4>Program</h4>
                <p><strong>Type:</strong> {selected.programType}</p>
                <p><strong>Schedule:</strong> {selected.scheduleType}</p>
                {selected.desiredStartDate && <p><strong>Start Date:</strong> {new Date(selected.desiredStartDate).toLocaleDateString()}</p>}
              </div>
              {selected.additionalNotes && (
                <div className="dp-section">
                  <h4>Notes</h4>
                  <p>{selected.additionalNotes}</p>
                </div>
              )}
              <div className="dp-section">
                <h4>Update Status</h4>
                <div className="status-buttons">
                  {['Pending','Contacted','Enrolled','Waitlisted','Declined'].map(s => (
                    <button key={s} onClick={() => updateStatus(selected._id, s)}
                      className="status-btn"
                      style={{ background: selected.status === s ? STATUS_COLORS[s] : 'transparent', color: selected.status === s ? 'white' : STATUS_COLORS[s], borderColor: STATUS_COLORS[s] }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => deleteEntry(selected._id)} className="delete-btn">Delete Entry</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
