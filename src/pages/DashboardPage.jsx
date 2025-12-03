import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from '../components/DashboardNavbar';
import DashboardCards from '../components/DashboardCards';
import Footer from '../components/Footer';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <DashboardNavbar />

      <main className="dashboard-main">
        <motion.section
          className="dashboard-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="dashboard-eyebrow">Welcome back</p>
          <h1 className="dashboard-title">
            {profile?.fullName || user.displayName || user.email}
          </h1>
          {profile?.role && (
            <p className="dashboard-role">
              {profile.role} · UniOne
            </p>
          )}
        </motion.section>

        <DashboardCards />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;

