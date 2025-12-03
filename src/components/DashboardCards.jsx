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
    </div>
  );
};

export default DashboardCards;


