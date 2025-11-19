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
    { firstName: 'Prasad',     lastName: 'Pilke',     role: 'Founder & CEO',   image: prasadImg },
    { firstName: 'Aditi',      lastName: 'Galange',   role: 'CTO & AI Lead',   image: aditiImg },
    { firstName: 'Tejaswini',  lastName: 'Kumbhar',   role: 'Head of Product', image: tejaswiniImg },
    { firstName: 'Karan',      lastName: 'Khandait',  role: 'Lead Developer',  image: karanImg },
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
              Meet the talented individuals behind UniOne
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
                </motion.div>
              ))}
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
