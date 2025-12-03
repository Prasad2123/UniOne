import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/auth';
import NotificationBell from './NotificationBell';
import ProfileMenu from './ProfileMenu';
import './Navbar.css';
import './DashboardNavbar.css';

const DashboardNavbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    if (!showProfileMenu) return;

    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const initial = { opacity: 0, y: -16 };
  const animate = { opacity: 1, y: 0 };

  return (
    <motion.nav
      className="navbar navbar--dashboard"
      initial={initial}
      animate={animate}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="navbar-container">
        <button
          type="button"
          className="navbar-brand navbar-brand--dashboard"
          onClick={() => navigate('/dashboard')}
        >
          <div className="navbar-logo">🎓</div>
          <span className="navbar-brand-text">UniOne</span>
        </button>

        <div className="navbar-menu navbar-menu--dashboard">
          <div className="navbar-menu-links">
            <a
              href="#"
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/dashboard');
              }}
            >
              Home
            </a>
            <a
              href="#"
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/smart-notes');
              }}
            >
              Smart Notes
            </a>
            <a
              href="#"
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/pyqs');
              }}
            >
              PYQs
            </a>
            <a
              href="#"
              className="navbar-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/announcements');
              }}
            >
              Announcements
            </a>
          </div>

          <div className="navbar-menu-actions">
            <button
              type="button"
              className="navbar-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <NotificationBell count={0} />

            <div className="dashboard-nav__profile" ref={profileMenuRef}>
              <button
                type="button"
                className="dashboard-nav__avatar-btn"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={showProfileMenu}
              >
                <span className="dashboard-nav__avatar">
                  {(profile?.fullName || user?.email || 'U')
                    .toString()
                    .trim()
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <ProfileMenu
                    onClose={() => setShowProfileMenu(false)}
                    onViewProfile={() => {
                      setShowProfileMenu(false);
                      navigate('/profile');
                    }}
                    onEditProfile={() => {
                      setShowProfileMenu(false);
                      navigate('/profile');
                    }}
                    onLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default DashboardNavbar;


