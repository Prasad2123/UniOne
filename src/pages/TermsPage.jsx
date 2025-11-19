import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';
import './TermsPage.css';

const TermsPage = () => {
  const sections = [
    {
      title: 'Introduction',
      content: 'Welcome to UniOne. By accessing or using our service, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.',
    },
    {
      title: 'User Obligations',
      content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must provide accurate and complete information when creating an account.',
    },
    {
      title: 'Restrictions',
      content: 'You may not use UniOne for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction, including but not limited to copyright laws. You may not transmit any worms or viruses or any code of a destructive nature.',
    },
    {
      title: 'Limitation of Liability',
      content: 'UniOne shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.',
    },
    {
      title: 'Termination Policy',
      content: 'We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.',
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
    <div className="terms-page">
      <Navbar />
      <main className="terms-main">
        <motion.section
          className="terms-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="terms-container">
            <motion.h1
              className="terms-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Terms & Conditions
            </motion.h1>
            <motion.p
              className="terms-intro"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Last updated: January 2025
            </motion.p>
            <div className="terms-content">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="terms-section-item"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <h2 className="section-heading">{section.title}</h2>
                  <p className="section-content">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <SectionDivider />
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;

