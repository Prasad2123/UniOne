import { motion } from 'framer-motion';
import './DashboardCards.css';

const QuickActionCard = ({ icon, title, description, index }) => {
  return (
    <motion.article
      className="dashboard-card dashboard-card--feature"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 * index }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <div className="dashboard-card__feature-main">
        <div className="dashboard-card__icon-wrap dashboard-card__icon-wrap--feature">
          <span className="dashboard-card__icon dashboard-card__icon--feature">
            {icon}
          </span>
        </div>
        <div>
          <h3 className="dashboard-card__title">{title}</h3>
          <p className="dashboard-card__description">{description}</p>
        </div>
      </div>

      <div className="dashboard-card__chip">Coming soon</div>
    </motion.article>
  );
};

export default QuickActionCard;


