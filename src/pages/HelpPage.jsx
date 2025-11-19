import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';
import './HelpPage.css';

const HelpPage = () => {
  const helpTopics = [
    {
      title: 'Getting Started',
      description: 'Learn how to create an account and navigate UniOne.',
      icon: '🚀',
    },
    {
      title: 'Using Smart Notes',
      description: 'Discover how to create and organize your study materials.',
      icon: '📝',
    },
    {
      title: 'Using the AI PYQs Helper',
      description: 'Get answers to previous year questions with AI assistance.',
      icon: '🤖',
    },
    {
      title: 'Reporting Issues',
      description: 'Report bugs or problems you encounter while using UniOne.',
      icon: '🐛',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="help-page">
      <Navbar />
      <main className="help-main">
        <motion.section
          className="help-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="help-container">
            <motion.h1
              className="help-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Help Center
            </motion.h1>
            <motion.p
              className="help-subtitle"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Find answers and get support for all your questions
            </motion.p>
            <motion.div
              className="help-grid"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {helpTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="help-card"
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="help-icon">{topic.icon}</div>
                  <h3 className="help-card-title">{topic.title}</h3>
                  <p className="help-card-description">{topic.description}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="contact-support-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="support-title">Still need help?</h3>
              <p className="support-text">
                Can't find what you're looking for? Contact our support team.
              </p>
              <Link to="/contact" className="support-button">
                Contact Support
              </Link>
            </motion.div>
          </div>
        </motion.section>
        <SectionDivider />
      </main>
      <Footer />
    </div>
  );
};

export default HelpPage;

