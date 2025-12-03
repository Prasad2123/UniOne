import { motion } from 'framer-motion';
import './DashboardNavbar.css';

const menuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.96 },
};

const ProfileMenu = ({ onViewProfile, onEditProfile, onLogout, isLoggingOut }) => {
  return (
    <motion.div
      className="dashboard-nav__dropdown dashboard-nav__dropdown--profile"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.16, ease: 'easeOut' }}
    >
      <button
        type="button"
        className="dashboard-nav__dropdown-item"
        onClick={onViewProfile}
      >
        View Profile
      </button>
      <button
        type="button"
        className="dashboard-nav__dropdown-item"
        onClick={onEditProfile}
      >
        Edit Profile
      </button>
      <div className="dashboard-nav__dropdown-divider" />
      <button
        type="button"
        className="dashboard-nav__dropdown-item dashboard-nav__dropdown-item--danger"
        onClick={onLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </motion.div>
  );
};

export default ProfileMenu;


