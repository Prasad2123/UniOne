import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomDropdown from '../components/CustomDropdown';
import Toast from '../components/Toast';
import { signup as signupWithFirebase } from '../services/auth';
import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'Student',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    course: '',
    employeeId: '',
    department: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (serverError) {
      setServerError('');
    }
  };

  const getFriendlyErrorMessage = (error) => {
    if (!error) return { message: 'Unable to create your account. Please try again.', type: 'error' };
    
    const code = error.code || '';
    const message = error.message || '';
    
    // Specific error messages for different scenarios
    if (code === 'auth/email-already-in-use' || message.includes('email-already-in-use')) {
      return { message: 'User already registered. Please use a different email or log in.', type: 'error' };
    }
    
    if (code === 'auth/weak-password' || message.includes('weak-password')) {
      return { message: 'Password must be at least 6 characters.', type: 'error' };
    }
    
    if (code === 'auth/invalid-email' || message.includes('invalid-email')) {
      return { message: 'Invalid email address.', type: 'error' };
    }
    
    if (code === 'auth/network-request-failed' || message.includes('network')) {
      return { message: 'Network errors. Please check your connection and try again.', type: 'error' };
    }
    
    if (code === 'auth/permission-denied' || message.includes('permission-denied')) {
      return { message: 'Firestore write errors. Please check database permissions.', type: 'error' };
    }
    
    return { message: message || 'Unable to create your account. Please try again.', type: 'error' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null); // Clear existing toast
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    if (formData.role === 'Student') {
      if (!formData.studentId.trim()) {
        newErrors.studentId = 'Student ID is required';
      }
      if (!formData.course.trim()) {
        newErrors.course = 'Course is required';
      }
    } else if (formData.role === 'Professor') {
      if (!formData.employeeId.trim()) {
        newErrors.employeeId = 'Employee ID is required';
      }
      if (!formData.department.trim()) {
        newErrors.department = 'Department is required';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      await signupWithFirebase({
        role: formData.role,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        studentId: formData.studentId,
        course: formData.course,
        employeeId: formData.employeeId,
        department: formData.department,
      });

      setToast({ message: 'Account created successfully!', type: 'success' });
      setServerError('');
      setErrors({});
      setIsSubmitting(false);

      setFormData({
        role: 'Student',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        course: '',
        employeeId: '',
        department: '',
      });

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1400);
    } catch (error) {
      console.error('Signup error:', error);
      setIsSubmitting(false);
      const errorInfo = getFriendlyErrorMessage(error);
      setToast({ message: errorInfo.message, type: errorInfo.type });
      setServerError(errorInfo.message || 'Unable to create your account.');
    }
  };

  return (
    <div className="signup-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Navbar />
      <main className="signup-main">
        <motion.div
          className="signup-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="signup-title">Create Your Account</h1>
          <p className="signup-subtitle">
            Join UniOne and start your academic journey
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <CustomDropdown
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Sign up as"
              ariaLabel="Select your role"
              options={[
                { value: 'Student', label: 'Student', icon: '🎓' },
                { value: 'Professor', label: 'Professor', icon: '👨‍🏫' },
              ]}
            />

            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'input-error' : ''}
                placeholder="Enter your full name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
                placeholder="Create a password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'input-error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <AnimatePresence mode="wait">
              {formData.role === 'Student' && (
                <motion.div
                  key="student-fields"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="form-group">
                    <label htmlFor="studentId" className="form-label">Student ID</label>
                    <input
                      type="text"
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className={errors.studentId ? 'input-error' : ''}
                      placeholder="Enter your student ID"
                    />
                    {errors.studentId && <span className="error-message">{errors.studentId}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="course" className="form-label">Course</label>
                    <input
                      type="text"
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className={errors.course ? 'input-error' : ''}
                      placeholder="Enter your course"
                    />
                    {errors.course && <span className="error-message">{errors.course}</span>}
                  </div>
                </motion.div>
              )}

              {formData.role === 'Professor' && (
                <motion.div
                  key="professor-fields"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="form-group">
                    <label htmlFor="employeeId" className="form-label">Employee ID</label>
                    <input
                      type="text"
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className={errors.employeeId ? 'input-error' : ''}
                      placeholder="Enter your employee ID"
                    />
                    {errors.employeeId && <span className="error-message">{errors.employeeId}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="department" className="form-label">Department</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={errors.department ? 'input-error' : ''}
                      placeholder="Enter your department"
                    />
                    {errors.department && <span className="error-message">{errors.department}</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              className="form-button-primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </motion.button>

            <div className="signup-divider">
              <span>or</span>
            </div>

            <Link to="/login" className="login-link">
              Already have an account? Login
            </Link>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
