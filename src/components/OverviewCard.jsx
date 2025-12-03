import { motion } from 'framer-motion';
import '../pages/LandingPage.css';
import './DashboardCards.css';

const OverviewCard = ({ icon, title, subtitle, value, actionLabel, index }) => {
  return (
    <motion.article
      className="dashboard-card dashboard-card--overview"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="dashboard-card__icon-wrap">
        <span className="dashboard-card__icon">{icon}</span>
      </div>
      <div className="dashboard-card__content">
        <p className="dashboard-card__label">{subtitle}</p>
        <div className="dashboard-card__value-row">
          <span className="dashboard-card__value">{value}</span>
          <span className="dashboard-card__value-pill">{title}</span>
        </div>
        <p className="dashboard-card__description">
          {title === 'Smart Notes' &&
            'Your organized study notes will appear here.'}
          {title === 'PYQs' &&
            'Browse previous year exam papers filtered by subject & year.'}
          {title === 'Announcements' &&
            'Stay updated with the latest academic alerts.'}
        </p>
      </div>
      <button type="button" className="hero__cta dashboard-card__button">
        {actionLabel}
      </button>
    </motion.article>
  );
};

export default OverviewCard;


