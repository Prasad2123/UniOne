import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';
import AnnouncementCard from '../components/AnnouncementCard';
import './DashboardPage.css';
import './ProfilePage.css';

const FALLBACK_ANNOUNCEMENTS = [
  {
    id: 'sample-1',
    title: 'Mid-Semester Exams Schedule Released',
    description:
      'The detailed timetable for the mid-semester examinations is now available on the college portal. Please check your subjects and exam centers carefully.',
    date: new Date().toISOString(),
    category: 'Exams',
  },
  {
    id: 'sample-2',
    title: 'Library Extended Hours This Week',
    description:
      'To support exam preparation, the central library will remain open till 11:30 PM from Monday to Friday. Carry your college ID card at all times.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Notice',
  },
  {
    id: 'sample-3',
    title: 'Guest Lecture on AI in Education',
    description:
      'Join us for a special session on “AI-powered Learning Tools” by industry experts this Saturday at 10:00 AM in Seminar Hall B. Limited seats available.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Event',
  },
];

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
        <div
          className="profile-container"
          style={{
            maxWidth: '1100px',
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
        >
          <motion.section
            className="profile-card"
            style={{ minHeight: '60vh' }}
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
            ) : (
              <div className="profile-form" style={{ gap: '1.25rem' }}>
                {(items.length > 0 ? items : FALLBACK_ANNOUNCEMENTS).map((item) => (
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


