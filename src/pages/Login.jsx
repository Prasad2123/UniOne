import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, DevicePhoneMobileIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { signInUser, sendPhoneOTP, verifyPhoneOTP, getUserData, createPhoneUser } from '../firebase.js';
import { FIREBASE_TEST_NUMBERS, isFirebaseTestNumber, getTestOTP, displayTestNumberInstructions } from '../utils/firebaseTestNumbers.js';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (authMethod === 'email') {
        await signInUser(formData.email, formData.password);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        navigate('/');
        } else {
          // Phone authentication
          if (!otpSent) {
            await sendPhoneOTP(formData.phone);
            setOtpSent(true);
            setOtpVisible(true);
            setError('');
            
            // Display test number instructions if using Firebase test numbers
            if (isFirebaseTestNumber(formData.phone)) {
              displayTestNumberInstructions();
              const testOTP = getTestOTP(formData.phone);
              if (testOTP) {
                console.log(`🎯 For phone ${formData.phone}, use OTP: ${testOTP}`);
              }
            }
          } else {
            const result = await verifyPhoneOTP(formData.otp);
            const user = result.user;
            
            // Check if user profile exists
            const userData = await getUserData(user.uid);
            
            if (userData) {
              // Existing user - redirect to dashboard
              navigate('/');
            } else {
              // New user - show signup form
              setIsNewUser(true);
              setError('');
            }
          }
        }
    } catch (error) {
      setError(error.message || 'Failed to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">U</span>
          </div>
          <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-50 mb-2">
            Welcome Back
          </h1>
          <p className="text-primary-600 dark:text-primary-400 mb-6">
            Sign in to your UniOne account
          </p>
          
          {/* Authentication Method Toggle */}
          <div className="flex bg-primary-100 dark:bg-primary-700 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('email');
                setError('');
                setOtpSent(false);
                setIsNewUser(false);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMethod === 'email'
                  ? 'bg-white dark:bg-primary-600 text-primary-900 dark:text-primary-50 shadow-sm'
                  : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-50'
              }`}
            >
              <EnvelopeIcon className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('phone');
                setError('');
                setOtpSent(false);
                setIsNewUser(false);
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                authMethod === 'phone'
                  ? 'bg-white dark:bg-primary-600 text-primary-900 dark:text-primary-50 shadow-sm'
                  : 'text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-50'
              }`}
            >
              <DevicePhoneMobileIcon className="w-4 h-4" />
              <span>Phone</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {authMethod === 'email' ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-accent-500 bg-primary-100 dark:bg-primary-700 border-primary-300 dark:border-primary-600 rounded focus:ring-accent-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-primary-600 dark:text-primary-400">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300"
                >
                  Forgot password?
                </Link>
              </div>
            </>
          ) : (
            <>
              {!otpSent ? (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter your phone number"
                  />
                  <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">
                    We'll send you a verification code
                  </p>
                </div>
              ) : (
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter 6-digit code"
                    maxLength="6"
                  />
                  {otpVisible && (
                    <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        📱 <strong>Dev Mode:</strong> Check browser console (F12) for OTP details
                      </p>
                      {isFirebaseTestNumber(formData.phone) && (
                        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            <strong>🧪 Test Number Detected!</strong><br/>
                            For {formData.phone}, use OTP: <strong>{getTestOTP(formData.phone) || '123456'}</strong>
                          </p>
                        </div>
                      )}
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">
                          <strong>Firebase Test Numbers:</strong><br/>
                          +1-555-123-4567 (OTP: 123456)<br/>
                          +1-555-987-6543 (OTP: 654321)<br/>
                          +1-555-000-0000 (OTP: 000000)
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpVisible(false);
                    }}
                    className="text-xs text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 mt-1"
                  >
                    Change phone number
                  </button>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center"
          >
            {loading ? (
              <LoadingSpinner size="sm" text="" />
            ) : (
              authMethod === 'email' ? 'Sign In' : (otpSent ? 'Verify Code' : 'Send Code')
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
      
      {/* Hidden recaptcha container for phone auth */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Login;


