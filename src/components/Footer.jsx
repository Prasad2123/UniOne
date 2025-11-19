import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (path) => {
    if (path === '/') {
      navigate('/');
      setTimeout(scrollToTop, 100);
    } else {
      navigate(path);
      setTimeout(scrollToTop, 100);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1: About UniOne */}
        <div className="footer-column">
          <div className="footer-brand">
            <div className="footer-logo">🎓</div>
            <h3 className="footer-brand-name">UniOne</h3>
          </div>
          <p className="footer-description">
            AI-powered learning for modern students. Simplify your academic journey with smart tools and resources.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h4 className="footer-column-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link" onClick={() => handleLinkClick('/')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link" onClick={() => handleLinkClick('/about')}>
                About
              </Link>
            </li>
            <li>
              <Link to="/team" className="footer-link" onClick={() => handleLinkClick('/team')}>
                Our Team
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link" onClick={() => handleLinkClick('/contact')}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div className="footer-column">
          <h4 className="footer-column-title">Support</h4>
          <ul className="footer-links">
            <li>
              <Link to="/faqs" className="footer-link" onClick={() => handleLinkClick('/faqs')}>
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/help" className="footer-link" onClick={() => handleLinkClick('/help')}>
                Help
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="footer-link" onClick={() => handleLinkClick('/privacy')}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="footer-link" onClick={() => handleLinkClick('/terms')}>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className="footer-column">
          <h4 className="footer-column-title">Follow Us</h4>
          <div className="footer-social">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://x.com/UniOne_129?t=mVFL6d7aDvWPP8-_9iVA7g&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="X (formerly Twitter)"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:unione129@gmail.com"
              className="footer-social-link"
              aria-label="Email"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 UniOne. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
