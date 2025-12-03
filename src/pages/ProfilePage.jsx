import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/auth';
import Toast from '../components/Toast';
import DashboardNavbar from '../components/DashboardNavbar';
import DigitalIDCard from '../components/DigitalIDCard';
import Footer from '../components/Footer';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, profile, loading } = useAuth();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!loading && user && profile && !formData) {
      setFormData({
        fullName: profile.fullName || '',
        email: profile.email || user.email || '',
        role: profile.role || '',
        course: profile.course || '',
        department: profile.department || '',
        studentId: profile.studentId || '',
        employeeId: profile.employeeId || '',
        university: profile.university || '',
        college: profile.college || '',
      });
    }
  }, [loading, user, profile, formData]);

  if (loading || !user) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    setToast(null);
    try {
      await updateUserProfile(user.uid, {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role || profile?.role || '',
        course: formData.course,
        department: formData.department,
        studentId: formData.studentId,
        employeeId: formData.employeeId,
        university: formData.university,
        college: formData.college,
      });
      setToast({ message: 'Profile updated successfully.', type: 'success' });
    } catch (err) {
      setToast({
        message: 'Unable to update profile. Please try again.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const role = formData?.role || profile?.role;
  const isStudent = role === 'Student';
  const isProfessor = role === 'Professor';

  return (
    <div className="profile-page">
      <DashboardNavbar />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
              Manage your UniOne account details.
            </p>

            {formData && (
              <form onSubmit={handleSave} className="profile-form">
                <div className="profile-grid">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      value={role || ''}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="university" className="form-label">
                      University
                    </label>
                    <input
                      id="university"
                      name="university"
                      type="text"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="Your university"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="college" className="form-label">
                      College
                    </label>
                    <input
                      id="college"
                      name="college"
                      type="text"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="Your college"
                    />
                  </div>

                  {isStudent && (
                    <>
                      <div className="form-group">
                        <label htmlFor="studentId" className="form-label">
                          Student ID
                        </label>
                        <input
                          id="studentId"
                          name="studentId"
                          type="text"
                          value={formData.studentId}
                          onChange={handleChange}
                          placeholder="Enter your student ID"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="course" className="form-label">
                          Course
                        </label>
                        <input
                          id="course"
                          name="course"
                          type="text"
                          value={formData.course}
                          onChange={handleChange}
                          placeholder="Your course"
                        />
                      </div>
                    </>
                  )}

                  {isProfessor && (
                    <>
                      <div className="form-group">
                        <label htmlFor="employeeId" className="form-label">
                          Employee ID
                        </label>
                        <input
                          id="employeeId"
                          name="employeeId"
                          type="text"
                          value={formData.employeeId}
                          onChange={handleChange}
                          placeholder="Enter your employee ID"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="department" className="form-label">
                          Department
                        </label>
                        <input
                          id="department"
                          name="department"
                          type="text"
                          value={formData.department}
                          onChange={handleChange}
                          placeholder="Your department"
                        />
                      </div>
                    </>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="form-button-primary profile-save-button"
                  disabled={saving}
                  whileHover={{ scale: saving ? 1 : 1.02 }}
                  whileTap={{ scale: saving ? 1 : 0.98 }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </motion.button>
              </form>
            )}
          </motion.section>

          <DigitalIDCard
            fullName={formData?.fullName || profile?.fullName || user.email}
            role={role}
            studentId={formData?.studentId || profile?.studentId}
            employeeId={formData?.employeeId || profile?.employeeId}
            course={formData?.course || profile?.course}
            department={formData?.department || profile?.department}
            college={formData?.college || profile?.college}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;


