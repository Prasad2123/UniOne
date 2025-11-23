import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomDropdown from '../components/CustomDropdown';
import Toast from '../components/Toast';
import { signup as signupWithFirebase } from '../services/auth';
import './SignupPage.css';

// University and College data (Engineering only)
const universitiesData = {
  'Savitribai Phule Pune University (SPPU)': [
    'COEP (College of Engineering Pune)',
    'PCCOE (Pimpri Chinchwad College of Engineering)',
    'VIT Pune (Vishwakarma Institute of Technology)',
    'MIT-WPU (MIT World Peace University)',
    'DY Patil Akurdi',
    'Sinhgad College of Engineering',
    'AISSMS College of Engineering',
    'Vishwakarma Institute of Information Technology',
    'Army Institute of Technology',
    'Bharati Vidyapeeth College of Engineering',
    'Modern College of Engineering',
    'Zeal College of Engineering and Research',
    'JSPM\'s Rajarshi Shahu College of Engineering',
    'Sinhgad Academy of Engineering',
    'Sinhgad Institute of Technology'
  ],
  'Mumbai University': [
    'VJTI (Veermata Jijabai Technological Institute)',
    'DJ Sanghvi College of Engineering',
    'KJ Somaiya College of Engineering',
    'Thakur College of Engineering and Technology',
    'Pillai College of Engineering',
    'Fr. Conceicao Rodrigues College of Engineering',
    'Sardar Patel College of Engineering',
    'St. Francis Institute of Technology',
    'Vivekanand Education Society\'s Institute of Technology',
    'Xavier Institute of Engineering',
    'Rizvi College of Engineering',
    'Mukesh Patel School of Technology Management & Engineering',
    'Shah & Anchor Kutchhi Engineering College',
    'Atharva College of Engineering',
    'Lokmanya Tilak College of Engineering'
  ],
  'Dr. Babasaheb Ambedkar Technological University': [
    'GCOE Amravati (Government College of Engineering)',
    'GCOE Aurangabad (Government College of Engineering)',
    'GCOE Karad (Government College of Engineering)',
    'GCOE Jalgaon (Government College of Engineering)',
    'GCOE Chandrapur (Government College of Engineering)'
  ],
  'Shivaji University': [
    'KIT College of Engineering',
    'DYP College of Engineering and Technology, Kolhapur',
    'TKIET Warananagar',
    'Rajarambapu Institute of Technology',
    'D. Y. Patil College of Engineering and Technology',
    'Shivaji University College of Engineering',
    'Sinhgad Institute of Technology, Lonavala',
    'JSPM\'s Imperial College of Engineering and Research'
  ],
  'Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)': [
    'YCCE (Yeshwantrao Chavan College of Engineering)',
    'GHRCE (G.H. Raisoni College of Engineering)',
    'SB Jain Institute of Technology',
    'Priyadarshini College of Engineering',
    'KDK College of Engineering',
    'Jhulelal Institute of Technology',
    'Shri Ramdeobaba College of Engineering and Management',
    'Anjuman College of Engineering and Technology',
    'Laxminarayan Institute of Technology',
    'St. Vincent Pallotti College of Engineering and Technology'
  ],
  'Kavayitri Bahinabai Chaudhari North Maharashtra University': [
    'SSBT College of Engineering and Technology',
    'KCES College of Engineering',
    'PES College of Engineering',
    'SVPM\'s College of Engineering',
    'SND College of Engineering and Research Center',
    'MET\'s Institute of Engineering'
  ],
  'Sant Gadge Baba Amravati University': [
    'Sipna College of Engineering and Technology',
    'HVPM College of Engineering and Technology',
    'P.R. Pote Patil College of Engineering and Technology',
    'Prof. Ram Meghe College of Engineering and Management',
    'Shri Sant Gajanan Maharaj College of Engineering',
    'Anjuman College of Engineering and Technology'
  ],
  'Gondwana University': [
    'Priyadarshini College of Engineering and Technology',
    'Rajiv Gandhi College of Engineering and Research',
    'Shri Sai College of Engineering and Technology',
    'Gondwana University College of Engineering'
  ],
  'Punyashlok Ahilyadevi Holkar Solapur University': [
    'Walchand Institute of Technology',
    'SVERI\'s College of Engineering',
    'SVERI\'s Pandharpur College of Engineering',
    'SVERI\'s College of Engineering, Pandharpur'
  ],
  'Swami Ramanand Teerth Marathwada University': [
    'LVD College of Engineering',
    'SRTMU Nanded College of Engineering',
    'Matoshri College of Engineering and Research Center',
    'Jawaharlal Nehru Engineering College',
    'SVERI\'s College of Engineering, Pandharpur'
  ],
  'Dr. Babasaheb Ambedkar Marathwada University': [
    'Deogiri Institute of Engineering and Management Studies',
    'MGM\'s College of Engineering and Technology',
    'Jawaharlal Nehru Engineering College',
    'Matoshri College of Engineering and Research Center',
    'Pravara Rural Engineering College'
  ],
  'SNDT Women\'s University': [
    'SNDT Women\'s College of Engineering',
    'SNDT Women\'s University College of Engineering, Pune',
    'SNDT Women\'s University College of Engineering, Mumbai'
  ]
};

const universities = Object.keys(universitiesData);

// Engineering courses only
const courses = [
  'B.Tech (Bachelor of Technology)',
  'B.E (Bachelor of Engineering)',
  'M.Tech (Master of Technology)',
  'M.E (Master of Engineering)',
  'Diploma in Engineering',
  'Polytechnic (Engineering)'
];

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
    university: '',
    college: '',
    courseDropdown: '', // Renamed to avoid conflict with existing course field
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
    
    // Handle dependent dropdowns
    if (name === 'university') {
      // Reset college and course when university changes
      setFormData(prev => ({ 
        ...prev, 
        university: value,
        college: '',
        courseDropdown: ''
      }));
    } else if (name === 'college') {
      // Reset course when college changes
      setFormData(prev => ({ 
        ...prev, 
        college: value,
        courseDropdown: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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

    // Validate university, college, and course dropdowns (for all roles)
    if (!formData.university) {
      newErrors.university = 'University is required';
    }
    if (!formData.college) {
      newErrors.college = 'College is required';
    }
    if (!formData.courseDropdown) {
      newErrors.courseDropdown = 'Course is required';
    }

    if (formData.role === 'Student') {
      if (!formData.studentId.trim()) {
        newErrors.studentId = 'Student ID is required';
      }
      // Course is now handled by courseDropdown (validated above for all roles)
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
        university: formData.university,
        college: formData.college,
        courseDropdown: formData.courseDropdown,
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
        university: '',
        college: '',
        courseDropdown: '',
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
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <motion.div
                style={{
                  fontSize: '3rem',
                  marginBottom: '0.5rem',
                  display: 'inline-block'
                }}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                🎓
              </motion.div>
            </div>
            <h1 className="signup-title">Create Your Account</h1>
            <p className="signup-subtitle">
              Join UniOne and start your academic journey
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="signup-form">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CustomDropdown
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                label="University"
                ariaLabel="Select your university"
                options={universities.map(uni => ({ value: uni, label: uni }))}
                className={errors.university ? 'input-error' : ''}
              />
              {errors.university && <span className="error-message" style={{ marginTop: '-1rem', marginBottom: '1rem', display: 'block' }}>{errors.university}</span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <CustomDropdown
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                label="College"
                ariaLabel="Select your college"
                options={formData.university && universitiesData[formData.university] 
                  ? universitiesData[formData.university].map(col => ({ value: col, label: col })) 
                  : []}
                className={errors.college ? 'input-error' : ''}
                disabled={!formData.university || !universitiesData[formData.university]}
              />
              {errors.college && <span className="error-message" style={{ marginTop: '-1rem', marginBottom: '1rem', display: 'block' }}>{errors.college}</span>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CustomDropdown
                id="courseDropdown"
                name="courseDropdown"
                value={formData.courseDropdown}
                onChange={handleChange}
                label="Course"
                ariaLabel="Select your course"
                options={courses.map(course => ({ value: course, label: course }))}
                className={errors.courseDropdown ? 'input-error' : ''}
                disabled={!formData.college}
              />
              {errors.courseDropdown && <span className="error-message" style={{ marginTop: '-1rem', marginBottom: '1rem', display: 'block' }}>{errors.courseDropdown}</span>}
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
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
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
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
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
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
            </motion.div>

            <motion.div
              className="form-group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
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
            </motion.div>

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
