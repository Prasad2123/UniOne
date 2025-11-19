import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';
import './AboutPage.css';

const AboutPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="about-page">
      <Navbar />
      <main className="about-main">
        {/* Section 1: Mission */}
        <motion.section
          className="about-section mission-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <h1 className="about-title">About UniOne</h1>
            <p className="about-text">
              UniOne is an AI-powered academic platform designed to simplify your learning journey. 
              We combine cutting-edge technology with intuitive design to help students excel in their studies.
            </p>
            <p className="about-text">
              Our mission is to make quality education accessible, organized, and efficient through 
              smart tools that adapt to your learning style.
            </p>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Section 2: Why UniOne */}
        <motion.section
          className="about-section why-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <div className="why-content">
              <div className="why-text">
                <h2 className="section-title">Why UniOne?</h2>
                <p className="about-text">
                  We understand the challenges students face in today's fast-paced academic environment. 
                  That's why we've built a platform that combines intelligent automation with user-friendly design.
                </p>
                <p className="about-text">
                  From smart note-taking to AI-powered question answering, UniOne provides everything 
                  you need to succeed academically, all in one place.
                </p>
              </div>
              <div className="why-image">
                <div className="placeholder-image">📚</div>
              </div>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Section 3: AI-Powered Tools */}
        <motion.section
          className="about-section tools-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <h2 className="section-title">AI-Powered Tools</h2>
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-icon">🧠</div>
                <h3 className="tool-title">Smart Notes</h3>
                <p className="tool-description">
                  Automatically organize and structure your study materials for maximum efficiency.
                </p>
              </div>
              <div className="tool-card">
                <div className="tool-icon">💡</div>
                <h3 className="tool-title">PYQs Helper</h3>
                <p className="tool-description">
                  Get instant, accurate answers to previous year questions with AI assistance.
                </p>
              </div>
              <div className="tool-card">
                <div className="tool-icon">⚡</div>
                <h3 className="tool-title">Fast & Reliable</h3>
                <p className="tool-description">
                  Experience lightning-fast performance with 99.9% uptime guarantee.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

