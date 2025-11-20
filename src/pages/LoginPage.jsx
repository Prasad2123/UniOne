import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomDropdown from '../components/CustomDropdown';
import { login } from '../services/auth';
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

  useEffect(() => {
    if (user) {
      navigate('/');
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

  const getFriendlyErrorMessage = (message) => {
    if (!message) return 'Unable to login. Please try again.';
    if (message.includes('auth/invalid-credential')) {
      return 'Incorrect email or password.';
    }
    if (message.includes('auth/user-disabled')) {
      return 'Your account has been disabled. Contact support.';
    }
    if (message.includes('auth/too-many-requests')) {
      return 'Too many attempts. Please wait and try again.';
    }
    return 'Unable to login. Please try again.';
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

    try {
      await login(formData.email, formData.password, formData.rememberMe);
      navigate('/');
    } catch (error) {
      setAuthError(getFriendlyErrorMessage(error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
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
              className="login-button"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </motion.button>

            <div className="login-divider">
              <span>or</span>
            </div>

            {authError && (
              <div className="error-banner" role="alert">
                {authError}
              </div>
            )}

            <button
              type="button"
              className="signup-button"
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

