import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';
import './TeamPage.css';

import prasadImg from '../assets/team/prasad.jpg';
import aditiImg from '../assets/team/aditi.jpg';
import tejaswiniImg from '../assets/team/tejaswini.jpg';
import karanImg from '../assets/team/karan.jpg';

const TeamPage = () => {
  const teamMembers = [
    { 
      firstName: 'Prasad', 
      lastName: 'Pilke', 
      role: 'Founder & CEO', 
      image: prasadImg,
      quote: "My goal is to give every student a personalized learning experience only AI can deliver."
    },
    { 
      firstName: 'Aditi', 
      lastName: 'Galange', 
      role: 'CTO & AI Lead', 
      image: aditiImg,
      quote: "I focus on developing resilient and ethical AI models that truly understand and adapt to student needs."
    },
    { 
      firstName: 'Tejaswini', 
      lastName: 'Kumbhar', 
      role: 'Head of Product', 
      image: tejaswiniImg,
      quote: "Every feature we build must simplify the academic journey and provide genuine value to the modern student."
    },
    { 
      firstName: 'Karan', 
      lastName: 'Khandait', 
      role: 'Lead Developer', 
      image: karanImg,
      quote: "I ensure our platform is robust, scalable, and delivers a seamless, lightning-fast experience for all our users."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="team-page">
      <Navbar />

      <main className="team-main">
        <motion.section
          className="team-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="team-container">

            <motion.h1
              className="team-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Team
            </motion.h1>

            <motion.p
              className="team-subtitle"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Building the Future of Learning. Meet the Minds Behind UniOne's AI Revolution.
            </motion.p>

            <motion.div
              className="team-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="team-image"
                  />

                  <h3 className="team-name">
                    {member.firstName}
                    <br />
                    {member.lastName}
                  </h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-quote">"{member.quote}"</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="team-community"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="team-community-title">More Than a Team, We're a Community</h2>
              <p className="team-community-text">
                At UniOne, our foundation is built on a shared drive for <strong>Technological Innovation</strong>, continuously pushing AI boundaries to create smarter, more effective tools like our real-time update engine and intelligent note system.
              </p>
              <p className="team-community-text">
                Our core focus is <strong>Measurable Student Success</strong> — simplifying learning using data-driven insights from PYQs, quizzes, and personalized study patterns.
              </p>
              <p className="team-community-text">
                We operate with complete <strong>Transparency and Data Integrity</strong>, ensuring trust at every level.
              </p>
              <p className="team-community-text">
                We are educators, engineers, and visionaries working together to build a future where real-time, personalized learning becomes the global standard.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <SectionDivider />
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
