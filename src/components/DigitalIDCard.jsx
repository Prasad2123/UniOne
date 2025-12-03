import './DashboardCards.css';

const DigitalIDCard = ({ fullName, role, studentId, employeeId, course, department, college }) => {
  const primaryId = studentId || employeeId || 'ID not set';
  const roleLabel = role || 'Member';

  return (
    <section className="digital-id">
      <div className="digital-id__header">
        <span className="digital-id__badge">UniOne • Digital ID</span>
      </div>

      <div className="digital-id__body">
        <div className="digital-id__avatar">
          <span>{(fullName || 'U').trim().charAt(0).toUpperCase()}</span>
        </div>
        <div className="digital-id__info">
          <h2 className="digital-id__name">{fullName || 'Your Name'}</h2>
          <p className="digital-id__role">{roleLabel}</p>
          <p className="digital-id__meta">
            <span>{college || 'UniOne Student ID'}</span>
          </p>
          <div className="digital-id__row">
            <div>
              <p className="digital-id__label">ID</p>
              <p className="digital-id__value">{primaryId}</p>
            </div>
            <div>
              <p className="digital-id__label">Program</p>
              <p className="digital-id__value">{course || department || 'Not set'}</p>
            </div>
          </div>
        </div>
        <div className="digital-id__qr">
          <div className="digital-id__qr-placeholder" aria-label="QR code placeholder" />
          <p className="digital-id__qr-caption">QR coming soon</p>
        </div>
      </div>
    </section>
  );
};

export default DigitalIDCard;


