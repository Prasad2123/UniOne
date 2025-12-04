import { useMemo } from 'react';
import QRCode from 'react-qr-code';
import './DashboardCards.css';

const calculateAge = (dob) => {
  if (!dob) return null;
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : null;
};

const DigitalIDCard = ({
  fullName,
  role,
  studentId,
  employeeId,
  course,
  department,
  college,
  gender,
  dateOfBirth,
  mobile,
  bloodGroup,
  address,
}) => {
  const primaryId = studentId || employeeId || 'ID not set';
  const roleLabel = role || 'Member';
  const age = useMemo(() => calculateAge(dateOfBirth), [dateOfBirth]);

  const qrPayload = useMemo(
    () =>
      JSON.stringify({
        name: fullName,
        role: roleLabel,
        id: primaryId,
        college,
        course: course || department,
        gender,
        mobile,
        bloodGroup,
        address,
      }),
    [fullName, roleLabel, primaryId, college, course, department, gender, mobile, bloodGroup, address]
  );

  return (
    <section className="digital-id">
      <div className="digital-id__header">
        <span className="digital-id__badge">UniOne • Digital ID</span>
      </div>

      <div className="digital-id__body">
        <div className="digital-id__avatar digital-id__avatar--large">
          <span>{(fullName || 'U').trim().charAt(0).toUpperCase()}</span>
        </div>

        <div className="digital-id__info-full">
          <h2 className="digital-id__name">{fullName || 'Your Name'}</h2>
          <p className="digital-id__role">{roleLabel}</p>
          <p className="digital-id__meta">
            <span>{college || 'UniOne Member'}</span>
          </p>
        </div>

        <div className="digital-id__qr">
          <div className="digital-id__qr-placeholder" aria-label="Profile QR code">
            <QRCode
              value={qrPayload}
              size={140}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <p className="digital-id__qr-caption">Scan to verify ID</p>
        </div>

        <div className="digital-id__details">
          <div className="digital-id__detail-row">
            <span className="digital-id__label">Program</span>
            <span className="digital-id__value">{course || department || 'Not set'}</span>
          </div>
          <div className="digital-id__detail-row">
            <span className="digital-id__label">Roll Number</span>
            <span className="digital-id__value">{primaryId}</span>
          </div>
          <div className="digital-id__detail-row">
            <span className="digital-id__label">Gender</span>
            <span className="digital-id__value">{gender || 'Not set'}</span>
          </div>
          <div className="digital-id__detail-row">
            <span className="digital-id__label">Age</span>
            <span className="digital-id__value">
              {age !== null ? `${age} yrs` : 'Not set'}
            </span>
          </div>
          <div className="digital-id__detail-row">
            <span className="digital-id__label">Mobile</span>
            <span className="digital-id__value">{mobile || 'Not set'}</span>
          </div>
          <div className="digital-id__detail-row">
            <span className="digital-id__label">Blood Group</span>
            <span className="digital-id__value">{bloodGroup || 'Not set'}</span>
          </div>
          <div className="digital-id__detail-row digital-id__detail-row--address">
            <span className="digital-id__label">Address</span>
            <span className="digital-id__value">{address || 'Not set'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalIDCard;


