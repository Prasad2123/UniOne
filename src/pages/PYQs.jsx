import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from '../components/DashboardNavbar';
import Footer from '../components/Footer';
import CustomDropdown from '../components/CustomDropdown';
import './DashboardPage.css';
import './ProfilePage.css';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const PATTERNS = ['Winter', 'Summer', 'Midterm', 'Unit Test'];

const PYQs = () => {
  const { profile } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingPapers, setLoadingPapers] = useState(false);

  const [filters, setFilters] = useState({
    department: '',
    subject: '',
    year: '',
    pattern: '',
  });

  const departmentFromProfile = useMemo(
    () => profile?.department || profile?.course || '',
    [profile]
  );

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      department: departmentFromProfile,
    }));
  }, [departmentFromProfile]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!departmentFromProfile) return;
      setLoadingSubjects(true);
      try {
        const subjectsRef = collection(db, 'subjects');
        const q = query(
          subjectsRef,
          where('department', '==', departmentFromProfile)
        );
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() || {}),
        }));
        setSubjects(list);
      } catch {
        setSubjects([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [departmentFromProfile]);

  useEffect(() => {
    const { department, subject, year, pattern } = filters;
    if (!department || !subject || !year || !pattern) {
      setPapers([]);
      return;
    }

    const fetchPapers = async () => {
      setLoadingPapers(true);
      try {
        const pyqsRef = collection(db, 'pyqs');
        const q = query(
          pyqsRef,
          where('department', '==', department),
          where('subject', '==', subject),
          where('year', '==', year),
          where('pattern', '==', pattern)
        );
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() || {}),
        }));
        setPapers(list);
      } catch {
        setPapers([]);
      } finally {
        setLoadingPapers(false);
      }
    };

    fetchPapers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const subjectOptions = subjects.map((s) => ({
    value: s.name || s.subject || '',
    label: s.name || s.subject || '',
  }));

  return (
    <div className="profile-page">
      <DashboardNavbar />
      <main className="profile-main">
        <div className="profile-container">
          <motion.section
            className="profile-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="profile-title">Previous Year Question Papers</h1>
            <p className="profile-subtitle">
              Browse past exam papers categorized by subject, year, and pattern.
            </p>

            <div className="profile-form" style={{ gap: '1rem' }}>
              <div className="profile-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="department">
                    Department
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    value={filters.department}
                    readOnly
                  />
                </div>

                <CustomDropdown
                  id="subject"
                  name="subject"
                  value={filters.subject}
                  onChange={handleFilterChange}
                  label="Subject"
                  ariaLabel="Select subject"
                  options={subjectOptions}
                  disabled={loadingSubjects || subjectOptions.length === 0}
                />

                <CustomDropdown
                  id="year"
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  label="Year"
                  ariaLabel="Select year"
                  options={YEARS.map((y) => ({ value: y, label: y }))}
                />

                <CustomDropdown
                  id="pattern"
                  name="pattern"
                  value={filters.pattern}
                  onChange={handleFilterChange}
                  label="Pattern / Exam Type"
                  ariaLabel="Select pattern"
                  options={PATTERNS.map((p) => ({ value: p, label: p }))}
                />
              </div>
            </div>

            <div className="dashboard-overview-grid" style={{ marginTop: '1.75rem' }}>
              {loadingPapers ? (
                <p className="dashboard-card__description">Loading papers...</p>
              ) : papers.length === 0 ? (
                <p className="dashboard-card__description">
                  No question papers found for the selected filters.
                </p>
              ) : (
                papers.map((paper) => (
                  <article
                    key={paper.id}
                    className="dashboard-card dashboard-card--overview"
                  >
                    <div className="dashboard-card__content">
                      <p className="dashboard-card__label">
                        {paper.subject} • {paper.year} • {paper.pattern}
                      </p>
                      <h3 className="dashboard-card__title">
                        {paper.title || 'Question Paper'}
                      </h3>
                      <button
                        type="button"
                        className="hero__cta dashboard-card__button"
                        onClick={() => {
                          if (paper.fileUrl) {
                            window.open(paper.fileUrl, '_blank', 'noopener');
                          }
                        }}
                      >
                        View / Open PDF
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PYQs;


