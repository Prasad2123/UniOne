import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';
import './FAQsPage.css';

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is UniOne?',
      answer: 'UniOne is an AI-powered academic platform designed to simplify your learning journey. We provide smart tools like organized study materials, AI-powered question answering, and fast, reliable access to academic resources.',
    },
    {
      question: 'Is UniOne free to use?',
      answer: 'Yes, UniOne offers a free tier with access to core features. We also provide premium plans with additional features and benefits for students who need more advanced tools.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on "Forgot Password?" on the login page. Enter your email address, and we\'ll send you a reset link. Follow the instructions in the email to create a new password.',
    },
    {
      question: 'Can I access UniOne on mobile?',
      answer: 'Yes! UniOne is fully responsive and works seamlessly on mobile devices, tablets, and desktops. You can access all features from any device with an internet connection.',
    },
    {
      question: 'How does the AI PYQs Helper work?',
      answer: 'Our AI PYQs Helper uses advanced machine learning to provide accurate answers to previous year questions. Simply input your question, and our AI will analyze it and provide a comprehensive answer based on the context and academic standards.',
    },
    {
      question: 'What is Smart Notes?',
      answer: 'Smart Notes is our intelligent note-taking feature that automatically organizes your study materials. It helps you structure your notes, highlights key points, and makes it easy to find information when you need it.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqs-page">
      <Navbar />
      <main className="faqs-main">
        <motion.section
          className="faqs-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="faqs-container">
            <motion.h1
              className="faqs-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <div className="faqs-list">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="faq-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{faq.question}</span>
                    <span className={`faq-icon ${openIndex === index ? 'open' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

export default FAQsPage;

