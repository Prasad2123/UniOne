import './DashboardCards.css';

const AnnouncementCard = ({ title, description, date, category }) => {
  const formattedDate = date
    ? new Date(date.seconds ? date.seconds * 1000 : date).toLocaleDateString()
    : '';

  return (
    <article className="dashboard-card announcement-card">
      <header className="announcement-card__header">
        <span className="announcement-card__badge">{category || 'Update'}</span>
        <span className="announcement-card__date">{formattedDate}</span>
      </header>
      <h3 className="announcement-card__title">{title}</h3>
      <p className="announcement-card__description">{description}</p>
    </article>
  );
};

export default AnnouncementCard;


