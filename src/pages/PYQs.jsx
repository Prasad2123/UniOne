import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon, EyeIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import PDFViewerModal from '../components/PDFViewerModal';
import Chatbot from '../components/Chatbot';

const PYQs = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const departments = [
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];

  const subjects = {
    'Computer Science': [
      'Data Structures',
      'Algorithms',
      'Database Systems',
      'Operating Systems',
      'Computer Networks',
      'Software Engineering'
    ],
    'Electronics': [
      'Digital Electronics',
      'Analog Electronics',
      'Signals and Systems',
      'Communication Systems',
      'Microprocessors',
      'VLSI Design'
    ],
    'Mechanical': [
      'Thermodynamics',
      'Fluid Mechanics',
      'Machine Design',
      'Manufacturing Technology',
      'Heat Transfer',
      'Mechanics of Materials'
    ],
    'Civil': [
      'Structural Analysis',
      'Concrete Technology',
      'Soil Mechanics',
      'Transportation Engineering',
      'Environmental Engineering',
      'Construction Management'
    ],
    'Electrical': [
      'Power Systems',
      'Control Systems',
      'Electrical Machines',
      'Power Electronics',
      'Electrical Measurements',
      'Renewable Energy'
    ],
    'Mathematics': [
      'Calculus',
      'Linear Algebra',
      'Probability and Statistics',
      'Differential Equations',
      'Complex Analysis',
      'Numerical Methods'
    ],
    'Physics': [
      'Mechanics',
      'Thermodynamics',
      'Electromagnetism',
      'Quantum Mechanics',
      'Optics',
      'Modern Physics'
    ],
    'Chemistry': [
      'Organic Chemistry',
      'Inorganic Chemistry',
      'Physical Chemistry',
      'Analytical Chemistry',
      'Biochemistry',
      'Polymer Chemistry'
    ]
  };

  // Mock API call to fetch papers
  const fetchPapers = async () => {
    if (!selectedDepartment || !selectedYear || !selectedSubject) {
      setPapers([]);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockPapers = [
        {
          id: 1,
          title: `${selectedSubject} Question Paper ${selectedYear}`,
          type: 'Question Paper',
          size: '2.3 MB',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          subject: selectedSubject,
          year: selectedYear,
          department: selectedDepartment
        },
        {
          id: 2,
          title: `${selectedSubject} Model Answer ${selectedYear}`,
          type: 'Model Answer',
          size: '1.8 MB',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          subject: selectedSubject,
          year: selectedYear,
          department: selectedDepartment
        }
      ];
      
      setPapers(mockPapers);
    } catch (error) {
      console.error('Error fetching papers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [selectedDepartment, selectedYear, selectedSubject]);

  const handleViewPDF = (paper) => {
    setSelectedPDF(paper);
    setShowModal(true);
  };

  const handleDownload = (paper) => {
    // In a real app, this would trigger a download
    console.log('Downloading:', paper.title);
    // For demo purposes, we'll just show an alert
    alert(`Downloading ${paper.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Previous Year Questions
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400">
            Access question papers and model answers from top universities
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="input-field"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-field"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field"
                disabled={!selectedDepartment}
              >
                <option value="">Select Subject</option>
                {selectedDepartment && subjects[selectedDepartment]?.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Papers Grid */}
        {loading ? (
          <LoadingSpinner text="Loading papers..." />
        ) : papers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper, index) => (
              <Card key={paper.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-xl flex items-center justify-center">
                    <DocumentArrowDownIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    paper.type === 'Question Paper' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  }`}>
                    {paper.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
                  {paper.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    <span className="font-medium">Subject:</span> {paper.subject}
                  </p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    <span className="font-medium">Year:</span> {paper.year}
                  </p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    <span className="font-medium">Size:</span> {paper.size}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewPDF(paper)}
                    className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDownload(paper)}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
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
            <DocumentArrowDownIcon className="w-16 h-16 text-primary-400 dark:text-primary-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-900 dark:text-primary-50 mb-2">
              No papers found
            </h3>
            <p className="text-primary-600 dark:text-primary-400">
              Please select department, year, and subject to view available papers.
            </p>
          </Card>
        )}

        <PDFViewerModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          pdfUrl={selectedPDF?.url}
          title={selectedPDF?.title}
        />

        <Chatbot />
      </div>
    </div>
  );
};

export default PYQs;


