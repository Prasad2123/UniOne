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
              UniOne is a next-generation academic platform engineered for today's fast-paced education system. Our proprietary AI transforms complexity into clarity, enabling students to understand, organize, and master their curriculum with precision.
            </p>
            <p className="about-text">
              Our mission is to democratize smart learning by making personalized, high-quality education accessible and hyper-efficient. Every tool we create evolves dynamically with your learning style — ensuring that you always study smarter, not harder.
            </p>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Section 4: What Makes UniOne Different */}
        <motion.section
          className="about-section different-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <h2 className="section-title">What Makes UniOne Different</h2>
            <h3 className="section-subtitle">Why UniOne Stands Out</h3>
            <div className="feature-content">
              <p className="about-text">
                UniOne isn't just another study app — it's a complete academic ecosystem powered by intelligent automation.
                We combine data-driven insights, personalized assistance, and real-time updates to create a learning environment that adapts to you.
              </p>
              <p className="about-text">
                UniOne removes the guesswork from studying by delivering the right information at the right time, ensuring every student learns with clarity and confidence.
              </p>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Section 5: Built for Every Type of Learner */}
        <motion.section
          className="about-section learner-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <h2 className="section-title">Built for Every Type of Learner</h2>
            <h3 className="section-subtitle">Designed for Modern Students</h3>
            <div className="feature-content">
              <p className="about-text">
                Whether you're preparing for exams, catching up on missed lectures, or revising last-minute, UniOne ensures you always have structured and accurate material ready.
                No clutter. No confusion. Just clarity and confidence.
              </p>
              <p className="about-text">
                UniOne supports slow learners, fast learners, and self-paced learners alike by giving personalized, easy-to-understand study experiences tailored to individual needs.
              </p>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Section 6: Our Core Principles */}
        <motion.section
          className="about-section principles-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <h2 className="section-title">Our Core Principles</h2>
            <div className="principles-grid">
              <motion.div
                className="principle-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="principle-icon">🔒</div>
                <h3 className="principle-title">Transparency & Trust</h3>
                <p className="principle-text">
                  We follow ethical AI practices with complete transparency and zero compromise on data integrity, ensuring your academic data is always safe.
                </p>
              </motion.div>
              <motion.div
                className="principle-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="principle-icon">⚙️</div>
                <h3 className="principle-title">Continuous Innovation</h3>
                <p className="principle-text">
                  Our team constantly enhances UniOne with smarter models, faster performance, and richer features so that the platform evolves with the needs of students.
                </p>
              </motion.div>
              <motion.div
                className="principle-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="principle-icon">📈</div>
                <h3 className="principle-title">Student Success First</h3>
                <p className="principle-text">
                  Every feature is designed to reduce your workload, save hours of study time, and help you improve academic performance with minimal effort.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Section 7: Your All-in-One Academic Companion */}
        <motion.section
          className="about-section companion-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <h2 className="section-title">Your All-in-One Academic Companion</h2>
            <div className="feature-content">
              <p className="about-text">
                UniOne intelligently centralizes everything — notes, PYQs, quiz insights, and study progress — so you never waste time switching between apps or searching for scattered materials. Everything you need to learn efficiently is available in one seamless experience.
              </p>
              <p className="about-text">
                Think of UniOne as your personal academic hub, always organized, always ready, always accurate.
              </p>
            </div>
          </div>
        </motion.section>

        <SectionDivider />

        {/* Section 8: The Future of Learning */}
        <motion.section
          className="about-section future-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="about-container">
            <h2 className="section-title">The Future of Learning</h2>
            <div className="feature-content">
              <p className="about-text">
                With UniOne, education becomes personalized, predictive, and proactive. Our goal is to build a future where AI helps every student learn with clarity, speed, and confidence.
              </p>
              <p className="about-text">
                UniOne represents the next evolution of digital education — where smart tools and real-time intelligence work together to guide your academic success.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

