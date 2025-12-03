import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';
import AnnouncementCard from '../components/AnnouncementCard';
import CustomDropdown from '../components/CustomDropdown';
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

const UNIVERSITY_OPTIONS = [
  { value: '', label: 'All Universities' },
  { value: 'ABC University', label: 'ABC University' },
  { value: 'XYZ Institute of Technology', label: 'XYZ Institute of Technology' },
  { value: 'National College of Engineering', label: 'National College of Engineering' },
];

const Announcements = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    university: '',
    query: '',
  });

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const allAnnouncements = useMemo(
    () => (items.length > 0 ? items : FALLBACK_ANNOUNCEMENTS),
    [items]
  );

  const filteredAnnouncements = useMemo(() => {
    const { university, query: searchQuery } = filters;
    const q = searchQuery.trim().toLowerCase();

    return allAnnouncements.filter((item) => {
      const uniMatch =
        !university ||
        !item.university ||
        item.university.toLowerCase() === university.toLowerCase();

      if (!q) return uniMatch;

      const haystack = `${item.title || ''} ${item.description || ''} ${
        item.category || ''
      }`.toLowerCase();

      return uniMatch && haystack.includes(q);
    });
  }, [allAnnouncements, filters]);

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

            <div className="announcements-filters-row">
              <div className="announcements-filters-left">
                <CustomDropdown
                  id="university"
                  name="university"
                  value={filters.university}
                  onChange={handleFilterChange}
                  label="University"
                  ariaLabel="Filter by university"
                  options={UNIVERSITY_OPTIONS}
                />
              </div>

              <div className="announcements-filters-right">
                <label htmlFor="announcement-search" className="form-label">
                  Search
                </label>
                <input
                  id="announcement-search"
                  name="query"
                  type="text"
                  className="announcements-search-input"
                  placeholder="Search announcements..."
                  value={filters.query}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            {loading ? (
              <p className="dashboard-card__description">Loading announcements...</p>
            ) : filteredAnnouncements.length === 0 ? (
              <p className="dashboard-card__description">
                No announcements match your filters.
              </p>
            ) : (
              <div className="profile-form" style={{ gap: '1.25rem' }}>
                {filteredAnnouncements.map((item) => (
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


