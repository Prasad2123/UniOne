import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DashboardNavbar.css';

const NotificationBell = ({ count = 0 }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="dashboard-nav__notification" ref={dropdownRef}>
      <button
        type="button"
        className="dashboard-nav__icon-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="dashboard-nav__bell-icon">🔔</span>
        <span className="dashboard-nav__badge">{count}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="dashboard-nav__dropdown"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
          >
            <p className="dashboard-nav__dropdown-title">Notifications</p>
            <p className="dashboard-nav__dropdown-empty">No notifications yet.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;


