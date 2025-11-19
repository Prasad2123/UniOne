import { useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const hasAnimatedRef = useRef(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (e, path) => {
    if (path === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        scrollToTop();
      } else {
        navigate('/');
        setTimeout(scrollToTop, 100);
      }
    } else {
      navigate(path);
      setTimeout(scrollToTop, 100);
    }
  };

  const shouldAnimateLanding = isLanding && !hasAnimatedRef.current;

  useEffect(() => {
    if (shouldAnimateLanding) {
      hasAnimatedRef.current = true;
    }
  }, [shouldAnimateLanding]);

  const navInitial = shouldAnimateLanding ? { opacity: 0, y: -14 } : false;
  const navAnimate = { opacity: 1, y: 0 };
  const navTransition = shouldAnimateLanding
    ? { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    : undefined;

  return (
    <motion.nav
      className="navbar"
      initial={navInitial}
      animate={navAnimate}
      transition={navTransition}
    >
      <div className="navbar-container">
        <Link 
          to="/" 
          className="navbar-brand"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              scrollToTop();
            }
          }}
        >
          <div className="navbar-logo">🎓</div>
          <span className="navbar-brand-text">UniOne</span>
        </Link>

        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/')}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/about')}
          >
            About
          </Link>
          <Link 
            to="/team" 
            className={`navbar-link ${location.pathname === '/team' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/team')}
          >
            Our Team
          </Link>
          <Link 
            to="/contact" 
            className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, '/contact')}
          >
            Contact Us
          </Link>
          <button
            className="navbar-theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <button
            className="navbar-login-btn"
            onClick={() => {
              navigate('/login');
              setTimeout(scrollToTop, 100);
            }}
          >
            Login / Signup
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
