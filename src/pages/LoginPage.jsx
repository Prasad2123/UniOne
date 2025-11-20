import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomDropdown from '../components/CustomDropdown';
import Toast from '../components/Toast';
import SplashScreen from '../components/SplashScreen';
import { login, logout, fetchUserProfile } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    role: 'Student',
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (authError) {
      setAuthError('');
    }
  };

  const getFriendlyErrorMessage = (error) => {
    if (!error) return { message: 'Unable to login. Please try again.', type: 'error' };
    
    const code = error.code || '';
    const message = error.message || '';
    
    // Role mismatch - show specific message with actual role
    if (code === 'auth/role-mismatch') {
      return { message: message || 'Selected role does not match your account role.', type: 'error' };
    }
    
    // Wrong password
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential' || message.includes('wrong-password') || message.includes('invalid-credential')) {
      return { message: 'Wrong password. Please try again.', type: 'error' };
    }
    
    // User not found
    if (code === 'auth/user-not-found' || message.includes('user-not-found')) {
      return { message: 'Account does not exist. Please sign up first.', type: 'error' };
    }
    
    // Invalid email
    if (code === 'auth/invalid-email' || message.includes('invalid-email')) {
      return { message: 'Invalid email. Please enter a valid email address.', type: 'error' };
    }
    
    // Network errors
    if (code === 'auth/network-request-failed' || message.includes('network')) {
      return { message: 'Network errors. Please check your connection.', type: 'error' };
    }
    
    // Profile not found
    if (code === 'auth/profile-not-found') {
      return { message: 'User profile not found. Please contact support.', type: 'error' };
    }
    
    // Other errors
    if (code === 'auth/user-disabled') {
      return { message: 'Your account has been disabled. Contact support.', type: 'error' };
    }
    if (code === 'auth/too-many-requests') {
      return { message: 'Too many attempts. Please wait and try again.', type: 'error' };
    }
    
    return { message: message || 'Unable to login. Please try again.', type: 'error' };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setAuthError('');
    setToast(null);
    setShowLoader(false);

    try {
      // Authenticate the user
      const userObj = await login(formData.email, formData.password, formData.rememberMe);

      // After successful sign in, fetch profile from Firestore to verify role
      const profile = await fetchUserProfile(userObj.uid);
      if (!profile) {
        // Profile missing
        await logout();
        const error = { code: 'auth/profile-not-found', message: 'Profile not found' };
        const errorInfo = getFriendlyErrorMessage(error);
        setToast({ message: errorInfo.message, type: errorInfo.type });
        setAuthError(errorInfo.message);
        setIsSubmitting(false);
        return;
      }

      // Check role mismatch
      if (profile.role && profile.role.toLowerCase() !== formData.role.toLowerCase()) {
        // Sign the user out to avoid a partial session
        await logout();
        const msg = `Role mismatch! You registered as "${profile.role}". Please select the correct role.`;
        setToast({ message: msg, type: 'error' });
        setAuthError(msg);
        setIsSubmitting(false);
        return;
      }

      // SUCCESS - Login OK
      setToast({ message: 'Login successful!', type: 'success' });
      setShowLoader(true);

      // show splash loader then redirect
      setTimeout(() => {
        setShowLoader(false);
        setTimeout(() => {
          navigate('/dashboard');
          setFormData({
            role: 'Student',
            email: '',
            password: '',
            rememberMe: false,
          });
          setErrors({});
        }, 300);
      }, 1500);

      setIsSubmitting(false);
    } catch (error) {
      setShowLoader(false);
      setIsSubmitting(false);
      const errorInfo = getFriendlyErrorMessage(error);
      setToast({ message: errorInfo.message, type: errorInfo.type });
      setAuthError(errorInfo.message);
    }
  };

  return (
    <div className="login-page">
      <SplashScreen isActive={showLoader} />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Navbar />
      <main className="login-main">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="login-title">Welcome Back to UniOne</h1>
          <p className="login-subtitle">
            Sign in to continue your academic journey
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <CustomDropdown
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Login as"
              ariaLabel="Select your role"
              options={[
                { value: 'Student', label: 'Student', icon: '🎓' },
                { value: 'Professor', label: 'Professor', icon: '👨‍🏫' },
              ]}
            />

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
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              className="form-button-primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </motion.button>

            <div className="login-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="form-button-secondary"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
