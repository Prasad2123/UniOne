import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';
import AnnouncementCard from '../components/AnnouncementCard';
import './DashboardPage.css';
import './ProfilePage.css';

const Announcements = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const annRef = collection(db, 'announcements');
        const q = query(annRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() || {}),
        }));
        setItems(list);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="profile-page">
      <DashboardNavbar />
      <main className="profile-main">
        <div className="profile-container" style={{ maxWidth: '900px' }}>
          <motion.section
            className="profile-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="profile-title">Announcements</h1>
            <p className="profile-subtitle">
              Stay informed with real-time academic updates.
            </p>

            {loading ? (
              <p className="dashboard-card__description">Loading announcements...</p>
            ) : items.length === 0 ? (
              <p className="dashboard-card__description">
                No announcements available at the moment.
              </p>
            ) : (
              <div className="profile-form" style={{ gap: '1.25rem' }}>
                {items.map((item) => (
                  <AnnouncementCard
                    key={item.id}
                    title={item.title || 'Announcement'}
                    description={item.description || ''}
                    date={item.date}
                    category={item.category}
                  />
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Announcements;


