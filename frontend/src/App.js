import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';

// Public pages
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Waitlist from './pages/Waitlist';
import Resources from './pages/Resources';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWaitlist from './pages/admin/AdminWaitlist';
import AdminMessages from './pages/admin/AdminMessages';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontSize:'1.2rem',color:'#E8B84B',fontFamily:'Nunito,sans-serif'}}>Loading...</div>;
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ minHeight: '100vh', paddingTop: '80px' }}>{children}</main>
    <Footer />
  </>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/programs" element={<PublicLayout><Programs /></PublicLayout>} />
      <Route path="/team" element={<PublicLayout><Team /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/waitlist" element={<PublicLayout><Waitlist /></PublicLayout>} />
      <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/waitlist" element={<ProtectedRoute><AdminWaitlist /></ProtectedRoute>} />
      <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily: 'Nunito, sans-serif', fontWeight: 600, borderRadius: '12px' }
        }} />
        <AppRoutes />
        <ScrollToTop />
      </Router>
    </AuthProvider>
  );
}

export default App;
