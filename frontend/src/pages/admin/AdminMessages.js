import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

export default function AdminMessages() {
  const { admin, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/api/contact');
      setMessages(res.data.messages);
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id) => {
    try {
      await api.patch(`/api/contact/${id}/read`);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch {}
  };

  const selectMsg = msg => {
    setSelected(msg);
    if (!msg.isRead) markRead(msg._id);
  };

  const deleteMsg = async id => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/api/contact/${id}`);
      toast.success('Message deleted');
      setSelected(null);
      fetchMessages();
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
          <Link to="/admin/messages" className="sn-link active">✉️ Messages</Link>
        </nav>
        <div className="sidebar-footer">
          <p className="admin-name">{admin?.name}</p>
          <button onClick={logout} className="logout-btn">Sign Out</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Contact Messages</h1>
            <p>{messages.filter(m => !m.isRead).length} unread messages</p>
          </div>
        </header>

        <div className="msg-layout">
          <div className="msg-list">
            {loading ? <div className="loading-state">Loading...</div> : messages.map(msg => (
              <div key={msg._id} onClick={() => selectMsg(msg)}
                className={`msg-item ${!msg.isRead ? 'unread' : ''} ${selected?._id === msg._id ? 'selected' : ''}`}>
                <div className="msg-item-top">
                  <strong>{msg.name} {!msg.isRead && <span className="unread-dot"/>}</strong>
                  <small>{new Date(msg.submittedAt).toLocaleDateString()}</small>
                </div>
                <p className="msg-subject">{msg.subject || 'General Inquiry'}</p>
                <p className="msg-preview">{msg.message.slice(0, 80)}...</p>
              </div>
            ))}
            {messages.length === 0 && !loading && (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-text)' }}>No messages yet</div>
            )}
          </div>

          <div className="msg-detail">
            {selected ? (
              <>
                <div className="dp-header">
                  <h3>{selected.subject || 'General Inquiry'}</h3>
                  <button onClick={() => setSelected(null)} className="close-btn">✕</button>
                </div>
                <div className="msg-from">
                  <div>
                    <strong>{selected.name}</strong>
                    <a href={`mailto:${selected.email}`}>{selected.email}</a>
                    {selected.phone && <a href={`tel:${selected.phone}`}>{selected.phone}</a>}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray-text)' }}>
                    {new Date(selected.submittedAt).toLocaleString()}
                  </span>
                </div>
                <div className="msg-body">
                  <p>{selected.message}</p>
                </div>
                <div className="msg-actions">
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your Inquiry'}`} className="btn-primary" style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
                    Reply by Email
                  </a>
                  <button onClick={() => deleteMsg(selected._id)} className="delete-btn">Delete</button>
                </div>
              </>
            ) : (
              <div className="msg-empty">
                <p>Select a message to read it</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
