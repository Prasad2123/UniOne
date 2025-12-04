import './DashboardCards.css';
import OverviewCard from './OverviewCard';
import QuickActionCard from './QuickActionCard';

const overviewCards = [
  {
    id: 'notes',
    title: 'Smart Notes',
    subtitle: 'Total Notes',
    value: 0,
    icon: '🧠',
    actionLabel: 'Open Smart Notes',
  },
  {
    id: 'pyqs',
    title: 'PYQs',
    subtitle: 'Available PYQs',
    value: 0,
    icon: '📚',
    actionLabel: 'Browse PYQs',
  },
  {
    id: 'announcements',
    title: 'Announcements',
    subtitle: 'Active Announcements',
    value: 0,
    icon: '📢',
    actionLabel: 'View Announcements',
  },
];

const featureCards = [
  {
    id: 'notes-feature',
    title: 'Smart Notes',
    description: 'Start reading notes',
    icon: '📝',
  },
  {
    id: 'pyqs-feature',
    title: 'PYQs',
    description: 'View previous year question papers',
    icon: '🧾',
  },
  {
    id: 'announcements-feature',
    title: 'Announcements',
    description: 'Check updates',
    icon: '📣',
  },
];

const extraCards = [
  {
    id: 'recent-notes',
    title: 'Recent Notes',
    description: 'Jump back into your latest Smart Notes',
    icon: '📓',
  },
  {
    id: 'recent-pyqs',
    title: 'Recent PYQs',
    description: 'Continue where you left off in PYQs',
    icon: '📄',
  },
  {
    id: 'saved-items',
    title: 'Saved Items',
    description: 'View your bookmarked content',
    icon: '⭐',
  },
  {
    id: 'support',
    title: 'Help & Support',
    description: 'Get quick help and FAQs',
    icon: '💬',
  },
];

const DashboardCards = () => {
  return (
    <div className="dashboard-layout">
      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Overview</h2>
        </div>

        <div className="dashboard-overview-grid">
          {overviewCards.map((card, index) => (
            <OverviewCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
              value={card.value}
              actionLabel={card.actionLabel}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Quick Actions</h2>
        </div>

        <div className="dashboard-features-grid">
          {featureCards.map((card, index) => (
            <QuickActionCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Explore More</h2>
        </div>

        <div className="dashboard-features-grid">
          {extraCards.map((card, index) => (
            <QuickActionCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index + featureCards.length}
            />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Recent Activity</h2>
        </div>

        <div className="dashboard-recent-activity">
          <div className="dashboard-recent-item">
            <span className="dashboard-recent-dot" />
            <div className="dashboard-recent-content">
              <p className="dashboard-recent-title">Viewed Smart Notes</p>
              <p className="dashboard-recent-meta">Today • 2:15 PM</p>
            </div>
          </div>
          <div className="dashboard-recent-item">
            <span className="dashboard-recent-dot" />
            <div className="dashboard-recent-content">
              <p className="dashboard-recent-title">Opened PYQs - Semester 5</p>
              <p className="dashboard-recent-meta">Yesterday • 9:40 PM</p>
            </div>
          </div>
          <div className="dashboard-recent-item">
            <span className="dashboard-recent-dot" />
            <div className="dashboard-recent-content">
              <p className="dashboard-recent-title">Checked Announcements</p>
              <p className="dashboard-recent-meta">2 days ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardCards;


