import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';
import './PrivacyPage.css';

const PrivacyPage = () => {
  const sections = [
    {
      title: 'Information Collection',
      content: 'We collect information that you provide directly to us, such as when you create an account, use our services, or contact us for support. This may include your name, email address, and academic information.',
    },
    {
      title: 'Use of Data',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.',
    },
    {
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.',
    },
    {
      title: 'Data Protection',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    },
    {
      title: 'User Rights',
      content: 'You have the right to access, update, or delete your personal information at any time. You can also opt-out of certain communications from us. Contact us if you wish to exercise these rights.',
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
    <div className="privacy-page">
      <Navbar />
      <main className="privacy-main">
        <motion.section
          className="privacy-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="privacy-container">
            <motion.h1
              className="privacy-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              className="privacy-intro"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Last updated: January 2025
            </motion.p>
            <div className="privacy-content">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="privacy-section-item"
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

export default PrivacyPage;

