import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth';
import Toast from '../components/Toast';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [toast, setToast] = useState(null);
  const isLoggingOut = useRef(false);

  useEffect(() => {
    // Only redirect to login if not logging out and user is not authenticated
    if (!loading && !user && !isLoggingOut.current) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      isLoggingOut.current = true;
      await logout();
      // Navigate directly to landing page with replace to prevent back navigation
      navigate('/', { replace: true });
    } catch (error) {
      isLoggingOut.current = false;
      setToast({ message: 'Error logging out. Please try again.', type: 'error' });
    }
  };

  // Don't show loading screen - let splash screen handle it
  // Just return null while loading to prevent double loading screens
  if (loading || !user) {
    return null;
  }

  return (
    <div className="dashboard-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Dashboard Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-navbar-container">
          <div className="dashboard-navbar-brand">
            <div className="dashboard-navbar-logo">🎓</div>
            <span className="dashboard-navbar-brand-text">UniOne</span>
          </div>
          <button
            className="dashboard-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-main">
        <motion.div
          className="dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="dashboard-welcome">UniOne Dashboard</h1>
          <p className="dashboard-user-name">
            Welcome, {profile?.fullName || user.displayName || user.email}
          </p>
          {profile?.role && (
            <p className="dashboard-user-role">
              Role: {profile.role}
            </p>
          )}

          <div className="dashboard-cards">
            <motion.div
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="dashboard-card-icon">👤</div>
              <h2 className="dashboard-card-title">Your Profile</h2>
              <p className="dashboard-card-description">
                View and manage your profile information
              </p>
            </motion.div>

            <motion.div
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="dashboard-card-icon">📋</div>
              <h2 className="dashboard-card-title">Upcoming Tasks</h2>
              <p className="dashboard-card-description">
                Check your upcoming assignments and deadlines
              </p>
            </motion.div>

            <motion.div
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="dashboard-card-icon">📊</div>
              <h2 className="dashboard-card-title">Recent Activity</h2>
              <p className="dashboard-card-description">
                Track your recent activities and progress
              </p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;

