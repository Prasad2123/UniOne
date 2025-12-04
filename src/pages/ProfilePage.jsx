import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile } from '../services/auth';
import Toast from '../components/Toast';
import DashboardNavbar from '../components/DashboardNavbar';
import DigitalIDCard from '../components/DigitalIDCard';
import Footer from '../components/Footer';
import CustomDropdown from '../components/CustomDropdown';
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
        gender: profile.gender || '',
        dateOfBirth: profile.dateOfBirth || '',
        mobile: profile.mobile || '',
        bloodGroup: profile.bloodGroup || '',
        address: profile.address || '',
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
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        mobile: formData.mobile,
        bloodGroup: formData.bloodGroup,
        address: formData.address,
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

                  <CustomDropdown
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    label="University"
                    ariaLabel="Select your university"
                    options={[
                      { value: '', label: 'Select university' },
                      { value: 'Savitribai Phule Pune University (SPPU)', label: 'Savitribai Phule Pune University (SPPU)' },
                      { value: 'Mumbai University', label: 'Mumbai University' },
                      { value: 'Dr. Babasaheb Ambedkar Technological University', label: 'Dr. Babasaheb Ambedkar Technological University' },
                      { value: 'Shivaji University', label: 'Shivaji University' },
                      { value: 'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)', label: 'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)' },
                    ]}
                  />

                  <CustomDropdown
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    label="College"
                    ariaLabel="Select your college"
                    options={[
                      { value: '', label: 'Select college' },
                      { value: 'COEP (College of Engineering Pune)', label: 'COEP (College of Engineering Pune)' },
                      { value: 'PCCOE (Pimpri Chinchwad College of Engineering)', label: 'PCCOE (Pimpri Chinchwad College of Engineering)' },
                      { value: 'VIT Pune (Vishwakarma Institute of Technology)', label: 'VIT Pune (Vishwakarma Institute of Technology)' },
                      { value: 'MIT-WPU (MIT World Peace University)', label: 'MIT-WPU (MIT World Peace University)' },
                    ]}
                  />

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
                        <CustomDropdown
                          id="course"
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          label="Course"
                          ariaLabel="Select your course"
                          options={[
                            { value: '', label: 'Select course' },
                            { value: 'B.Tech (Bachelor of Technology)', label: 'B.Tech (Bachelor of Technology)' },
                            { value: 'B.E (Bachelor of Engineering)', label: 'B.E (Bachelor of Engineering)' },
                            { value: 'M.Tech (Master of Technology)', label: 'M.Tech (Master of Technology)' },
                            { value: 'M.E (Master of Engineering)', label: 'M.E (Master of Engineering)' },
                            { value: 'Diploma in Engineering', label: 'Diploma in Engineering' },
                            { value: 'Polytechnic (Engineering)', label: 'Polytechnic (Engineering)' },
                          ]}
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

                  <div className="form-group form-group--full">
                    <label className="form-label">Gender</label>
                    <div className="profile-gender-group">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === 'Male'}
                          onChange={handleChange}
                        />
                        <span>Male</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === 'Female'}
                          onChange={handleChange}
                        />
                        <span>Female</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="Other"
                          checked={formData.gender === 'Other'}
                          onChange={handleChange}
                        />
                        <span>Other</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mobile" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bloodGroup" className="form-label">
                      Blood Group
                    </label>
                    <input
                      id="bloodGroup"
                      name="bloodGroup"
                      type="text"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      placeholder="e.g. O+, A-, B+"
                    />
                  </div>

                  <div className="form-group form-group--full">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                    />
                  </div>
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
            gender={formData?.gender || profile?.gender}
            dateOfBirth={formData?.dateOfBirth || profile?.dateOfBirth}
            mobile={formData?.mobile || profile?.mobile}
            bloodGroup={formData?.bloodGroup || profile?.bloodGroup}
            address={formData?.address || profile?.address}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;


