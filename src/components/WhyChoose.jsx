import { motion } from 'framer-motion';
import './WhyChoose.css';

const WhyChoose = () => {
  const features = [
    {
      icon: '🧠',
      title: 'Intelligent Note Generation',
      description: 'Transform your lectures and study materials into smart, structured, and auto-summarized notes — ready to revise anytime.',
    },
    {
      icon: '💡',
      title: 'Strategic PYQ Analysis',
      description: 'Access AI-generated explanations and context-aware solutions for Previous Year Questions to identify patterns, improve accuracy, and boost your performance.',
    },
    {
      icon: '⚡',
      title: 'Real-Time Data & Insights',
      description: 'Get instant updates on quiz scores, peer comparisons, progress analytics, and important academic changes — all in one unified dashboard.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="why-choose-section">
      <div className="why-choose-container">
        <motion.h2
          className="why-choose-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose UniOne?
        </motion.h2>
        <motion.div
          className="why-choose-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="why-choose-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="why-choose-icon">{feature.icon}</div>
              <h3 className="why-choose-card-title">{feature.title}</h3>
              <p className="why-choose-card-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;

