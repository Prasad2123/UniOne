import React, { useState, useEffect } from 'react';
import { ClipboardDocumentListIcon, BookOpenIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Syllabus = () => {
  const [syllabi, setSyllabi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const departments = [
    'Computer Engineering',
    'Information Technology',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics & Telecommunication Engineering',
    'Artificial Intelligence & Data Science'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  useEffect(() => {
    const fetchSyllabi = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockSyllabi = [
          {
            id: 1,
            title: 'Computer Engineering - 1st Year Syllabus',
            department: 'Computer Engineering',
            year: '1st Year',
            subjects: 8,
            credits: 24,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 2,
            title: 'Computer Engineering - 2nd Year Syllabus',
            department: 'Computer Engineering',
            year: '2nd Year',
            subjects: 10,
            credits: 28,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 3,
            title: 'Computer Engineering - 3rd Year Syllabus',
            department: 'Computer Engineering',
            year: '3rd Year',
            subjects: 12,
            credits: 32,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 4,
            title: 'Computer Engineering - 4th Year Syllabus',
            department: 'Computer Engineering',
            year: '4th Year',
            subjects: 10,
            credits: 30,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 5,
            title: 'Information Technology - 1st Year Syllabus',
            department: 'Information Technology',
            year: '1st Year',
            subjects: 8,
            credits: 24,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 6,
            title: 'Information Technology - 2nd Year Syllabus',
            department: 'Information Technology',
            year: '2nd Year',
            subjects: 10,
            credits: 28,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 7,
            title: 'Mechanical Engineering - 1st Year Syllabus',
            department: 'Mechanical Engineering',
            year: '1st Year',
            subjects: 8,
            credits: 24,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 8,
            title: 'Mechanical Engineering - 2nd Year Syllabus',
            department: 'Mechanical Engineering',
            year: '2nd Year',
            subjects: 10,
            credits: 28,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 9,
            title: 'Civil Engineering - 1st Year Syllabus',
            department: 'Civil Engineering',
            year: '1st Year',
            subjects: 8,
            credits: 24,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 10,
            title: 'Electrical Engineering - 1st Year Syllabus',
            department: 'Electrical Engineering',
            year: '1st Year',
            subjects: 8,
            credits: 24,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 11,
            title: 'Electronics & Telecommunication - 1st Year Syllabus',
            department: 'Electronics & Telecommunication Engineering',
            year: '1st Year',
            subjects: 8,
            credits: 24,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          },
          {
            id: 12,
            title: 'AI & Data Science - 1st Year Syllabus',
            department: 'Artificial Intelligence & Data Science',
            year: '1st Year',
            subjects: 8,
            credits: 24,
            pdfUrl: '#',
            lastUpdated: '2024-01-15'
          }
        ];
        
        setSyllabi(mockSyllabi);
      } catch (error) {
        console.error('Error fetching syllabi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabi();
  }, []);

  const filteredSyllabi = syllabi.filter(syllabus => {
    if (selectedDepartment && syllabus.department !== selectedDepartment) return false;
    if (selectedYear && syllabus.year !== selectedYear) return false;
    return true;
  });

  const handleDownload = (syllabus) => {
    alert(`Downloading ${syllabus.title}`);
  };

  const handleView = (syllabus) => {
    alert(`Viewing ${syllabus.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-accent-200 mb-4">
            Course Syllabus
          </h1>
          <p className="text-xl text-primary-600 dark:text-accent-400">
            Access course outlines and curriculum for Maharashtra University
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-accent-300 mb-2">
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="input-field"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-accent-300 mb-2">
                Academic Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-field"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Syllabus Grid */}
        {loading ? (
          <LoadingSpinner text="Loading syllabus information..." />
        ) : filteredSyllabi.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSyllabi.map((syllabus, index) => (
              <Card key={syllabus.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-dark-700 rounded-xl flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-100 dark:bg-dark-700 text-accent-700 dark:text-accent-300">
                    {syllabus.year}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-primary-900 dark:text-accent-200 mb-2">
                  {syllabus.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <ClipboardDocumentListIcon className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    <span className="text-primary-600 dark:text-accent-400">
                      Subjects: {syllabus.subjects}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-primary-600 dark:text-accent-400">
                      Total Credits: {syllabus.credits}
                    </span>
                  </div>
                  <div className="text-xs text-primary-500 dark:text-accent-500">
                    Last Updated: {new Date(syllabus.lastUpdated).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(syllabus)}
                    className="btn-secondary flex-1 flex items-center justify-center space-x-2 text-sm"
                  >
                    <BookOpenIcon className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDownload(syllabus)}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2 text-sm"
                  >
                    <DocumentArrowDownIcon className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <BookOpenIcon className="w-16 h-16 text-primary-400 dark:text-accent-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-900 dark:text-accent-200 mb-2">
              No syllabus found
            </h3>
            <p className="text-primary-600 dark:text-accent-400">
              {selectedDepartment || selectedYear
                ? 'Try adjusting your filters.'
                : 'Syllabus will appear here when available.'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Syllabus;

