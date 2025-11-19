import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhyChoose from '../components/WhyChoose';
import SectionDivider from '../components/SectionDivider';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Navbar />
      <main className="landing-main">
        <section className="hero">
          <div className="hero-container">
            <div className="hero__content">
              <motion.h2
                className="hero__eyebrow"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              >
                Welcome to
              </motion.h2>
              <motion.h1
                className="hero__title"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                UniOne
              </motion.h1>
              <motion.p
                className="hero__subtitle"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              >
                Simplify, Learn, and Grow with AI-powered Academic Tools.
              </motion.p>
              <motion.button
                className="hero__cta"
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                aria-label="Get started with UniOne"
              >
                Get Started
              </motion.button>
            </div>

            <motion.div
              className="hero-image"
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <motion.svg
                viewBox="0 0 800 600"
                xmlns="http://www.w3.org/2000/svg"
                className="hero-illustration"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Background circle */}
                <circle cx="400" cy="300" r="200" fill="var(--gold)" opacity="0.1" />
                
                {/* Student figure - Head */}
                <circle cx="400" cy="220" r="45" fill="var(--gold)" opacity="0.4" />
                <circle cx="385" cy="210" r="8" fill="var(--bg-primary)" opacity="0.6" />
                <circle cx="415" cy="210" r="8" fill="var(--bg-primary)" opacity="0.6" />
                <ellipse cx="400" cy="235" rx="15" ry="8" fill="var(--bg-primary)" opacity="0.5" />
                
                {/* Graduation cap */}
                <path d="M365 200 L435 200 L420 175 L380 175 Z" fill="var(--gold)" opacity="0.8" />
                <circle cx="400" cy="187" r="20" fill="var(--gold)" opacity="0.9" />
                <path d="M400 187 L400 220" stroke="var(--gold)" strokeWidth="3" opacity="0.6" />
                
                {/* Body */}
                <rect x="355" y="265" width="90" height="140" rx="45" fill="var(--gold)" opacity="0.5" />
                
                {/* Arms - Left */}
                <ellipse cx="330" cy="320" rx="12" ry="60" fill="var(--gold)" opacity="0.4" transform="rotate(-25 330 320)" />
                {/* Arms - Right */}
                <ellipse cx="470" cy="320" rx="12" ry="60" fill="var(--gold)" opacity="0.4" transform="rotate(25 470 320)" />
                
                {/* Laptop/Tablet in hands */}
                <rect x="345" y="310" width="110" height="75" rx="8" fill="var(--gold)" opacity="0.6" />
                <rect x="355" y="320" width="90" height="55" rx="5" fill="var(--bg-primary)" opacity="0.4" />
                <circle cx="400" cy="347" r="8" fill="var(--gold)" opacity="0.8" />
                
                {/* Books stack on left */}
                <rect x="220" y="380" width="65" height="100" rx="5" fill="var(--gold)" opacity="0.7" />
                <rect x="230" y="370" width="65" height="100" rx="5" fill="var(--gold)" opacity="0.6" />
                <rect x="240" y="360" width="65" height="100" rx="5" fill="var(--gold)" opacity="0.8" />
                <line x1="245" y1="380" x2="300" y2="380" stroke="var(--bg-primary)" strokeWidth="2" opacity="0.3" />
                <line x1="245" y1="410" x2="300" y2="410" stroke="var(--bg-primary)" strokeWidth="2" opacity="0.3" />
                
                {/* Books stack on right */}
                <rect x="515" y="390" width="60" height="90" rx="5" fill="var(--gold)" opacity="0.7" />
                <rect x="525" y="380" width="60" height="90" rx="5" fill="var(--gold)" opacity="0.6" />
                
                {/* Light bulb (idea/learning) */}
                <circle cx="550" cy="150" r="30" fill="var(--gold)" opacity="0.6" />
                <path d="M550 120 L545 105 L555 105 Z" fill="var(--gold)" opacity="0.8" />
                <circle cx="550" cy="150" r="15" fill="var(--bg-primary)" opacity="0.3" />
                <path d="M540 140 L545 135 M560 140 L555 135 M550 125 L550 130" stroke="var(--bg-primary)" strokeWidth="2" opacity="0.4" />
                
                {/* Decorative stars */}
                <path d="M200 120 L205 135 L220 135 L208 145 L213 160 L200 150 L187 160 L192 145 L180 135 L195 135 Z" fill="var(--gold)" opacity="0.5" />
                <path d="M600 220 L603 230 L613 230 L605 237 L608 247 L600 240 L592 247 L595 237 L587 230 L597 230 Z" fill="var(--gold)" opacity="0.4" />
                <path d="M150 280 L152 288 L160 288 L154 293 L156 301 L150 296 L144 301 L146 293 L140 288 L148 288 Z" fill="var(--gold)" opacity="0.4" />
              </motion.svg>
            </motion.div>
          </div>
        </section>
        <SectionDivider variant="hero" />
        <WhyChoose />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

