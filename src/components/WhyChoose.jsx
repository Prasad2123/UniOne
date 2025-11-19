import { motion } from 'framer-motion';
import './WhyChoose.css';

const WhyChoose = () => {
  const features = [
    {
      icon: '📝',
      title: 'Smart Notes',
      description: 'Quick, organized study materials for fast and focused learning.',
    },
    {
      icon: '🤖',
      title: 'PYQs Helper',
      description: 'Get instant, accurate answers to previous year questions.',
    },
    {
      icon: '⚡',
      title: 'Fast & Reliable',
      description: 'Smooth, responsive, and built for a hassle-free experience.',
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

