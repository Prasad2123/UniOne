import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from '../components/DashboardNavbar';
import DigitalIDCard from '../components/DigitalIDCard';
import Footer from '../components/Footer';
import './ProfilePage.css';

const ViewProfilePage = () => {
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    // No redirect logic for now – assume routing guards handled elsewhere
  }, [user]);

  if (loading || !user) {
    return null;
  }

  const role = profile?.role;
  const isStudent = role === 'Student';
  const isProfessor = role === 'Professor';

  return (
    <div className="profile-page">
      <DashboardNavbar />

      <main className="profile-main">
        <div className="profile-container">
          <motion.section
            className="profile-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">
              View your UniOne account details.
            </p>

            {profile && (
              <div className="profile-form">
                <div className="profile-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <p className="profile-readonly-value">
                      {profile.fullName || '-'}
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <p className="profile-readonly-value">
                      {profile.email || user.email || '-'}
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <p className="profile-readonly-value">
                      {profile.role || '-'}
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">University</label>
                    <p className="profile-readonly-value">
                      {profile.university || '-'}
                    </p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">College</label>
                    <p className="profile-readonly-value">
                      {profile.college || '-'}
                    </p>
                  </div>

                  {isStudent && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Student ID</label>
                        <p className="profile-readonly-value">
                          {profile.studentId || '-'}
                        </p>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Course</label>
                        <p className="profile-readonly-value">
                          {profile.course || '-'}
                        </p>
                      </div>
                    </>
                  )}

                  {isProfessor && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Employee ID</label>
                        <p className="profile-readonly-value">
                          {profile.employeeId || '-'}
                        </p>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Department</label>
                        <p className="profile-readonly-value">
                          {profile.department || '-'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </motion.section>

          <DigitalIDCard
            fullName={profile?.fullName || user.email}
            role={role}
            studentId={profile?.studentId}
            employeeId={profile?.employeeId}
            course={profile?.course}
            department={profile?.department}
            college={profile?.college}
            gender={profile?.gender}
            dateOfBirth={profile?.dateOfBirth}
            mobile={profile?.mobile}
            bloodGroup={profile?.bloodGroup}
            address={profile?.address}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewProfilePage;


