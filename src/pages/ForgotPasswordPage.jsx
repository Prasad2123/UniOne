import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Here you would typically make an API call
    console.log('Password reset requested for:', email);
    setSubmitted(true);
    setError('');
  };

  return (
    <div className="forgot-password-page">
      <Navbar />
      <main className="forgot-password-main">
        <motion.div
          className="forgot-password-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="forgot-password-title">Reset Your Password</h1>
          <p className="forgot-password-subtitle">
            Enter your email to receive reset instructions.
          </p>

          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <p>Reset link has been sent to your email!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={error ? 'input-error' : ''}
                  placeholder="Enter your email"
                />
                {error && <span className="error-message">{error}</span>}
              </div>

              <motion.button
                type="submit"
                className="reset-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Reset Link
              </motion.button>
            </form>
          )}

          <Link to="/login" className="back-to-login">
            Back to Login
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;

