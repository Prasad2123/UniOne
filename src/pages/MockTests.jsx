import React, { useState, useEffect } from 'react';
import { ChartBarIcon, ClockIcon, AcademicCapIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const MockTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const departments = [
    'Computer Engineering',
    'Information Technology',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics & Telecommunication Engineering',
    'Artificial Intelligence & Data Science'
  ];

  const subjects = {
    'Computer Engineering': [
      'Data Structures',
      'Algorithms',
      'Database Systems',
      'Operating Systems',
      'Computer Networks'
    ],
    'Information Technology': [
      'Web Technologies',
      'Software Engineering',
      'Data Mining',
      'Cloud Computing',
      'Information Security'
    ],
    'Mechanical Engineering': [
      'Thermodynamics',
      'Fluid Mechanics',
      'Machine Design',
      'Heat Transfer',
      'Manufacturing Technology'
    ],
    'Civil Engineering': [
      'Structural Analysis',
      'Concrete Technology',
      'Soil Mechanics',
      'Transportation Engineering',
      'Environmental Engineering'
    ],
    'Electrical Engineering': [
      'Power Systems',
      'Control Systems',
      'Electrical Machines',
      'Power Electronics',
      'Renewable Energy'
    ],
    'Electronics & Telecommunication Engineering': [
      'Digital Electronics',
      'Analog Electronics',
      'Signals and Systems',
      'Communication Systems',
      'VLSI Design'
    ],
    'Artificial Intelligence & Data Science': [
      'Machine Learning',
      'Deep Learning',
      'Data Science',
      'Neural Networks',
      'Natural Language Processing'
    ]
  };

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockTests = [
          {
            id: 1,
            title: 'Computer Engineering - Data Structures Mock Test',
            department: 'Computer Engineering',
            subject: 'Data Structures',
            duration: 60,
            questions: 25,
            marks: 100,
            difficulty: 'Intermediate',
            attempts: 1250,
            available: true
          },
          {
            id: 2,
            title: 'Computer Engineering - Algorithms Practice Test',
            department: 'Computer Engineering',
            subject: 'Algorithms',
            duration: 90,
            questions: 30,
            marks: 150,
            difficulty: 'Advanced',
            attempts: 980,
            available: true
          },
          {
            id: 3,
            title: 'Mechanical Engineering - Thermodynamics Mock Test',
            department: 'Mechanical Engineering',
            subject: 'Thermodynamics',
            duration: 60,
            questions: 20,
            marks: 100,
            difficulty: 'Intermediate',
            attempts: 1100,
            available: true
          },
          {
            id: 4,
            title: 'Civil Engineering - Structural Analysis Test',
            department: 'Civil Engineering',
            subject: 'Structural Analysis',
            duration: 120,
            questions: 40,
            marks: 200,
            difficulty: 'Advanced',
            attempts: 750,
            available: true
          },
          {
            id: 5,
            title: 'IT - Web Technologies Practice Test',
            department: 'Information Technology',
            subject: 'Web Technologies',
            duration: 60,
            questions: 25,
            marks: 100,
            difficulty: 'Beginner',
            attempts: 2100,
            available: true
          },
          {
            id: 6,
            title: 'AI & DS - Machine Learning Mock Test',
            department: 'Artificial Intelligence & Data Science',
            subject: 'Machine Learning',
            duration: 90,
            questions: 35,
            marks: 175,
            difficulty: 'Advanced',
            attempts: 890,
            available: true
          }
        ];
        
        setTests(mockTests);
      } catch (error) {
        console.error('Error fetching mock tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const filteredTests = tests.filter(test => {
    if (selectedDepartment && test.department !== selectedDepartment) return false;
    if (selectedSubject && test.subject !== selectedSubject) return false;
    return true;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-accent-200 mb-4">
            Mock Tests
          </h1>
          <p className="text-xl text-primary-600 dark:text-accent-400">
            Practice with sample tests and exam patterns
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
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setSelectedSubject('');
                }}
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
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="input-field"
                disabled={!selectedDepartment}
              >
                <option value="">All Subjects</option>
                {selectedDepartment && subjects[selectedDepartment]?.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Tests Grid */}
        {loading ? (
          <LoadingSpinner text="Loading mock tests..." />
        ) : filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test, index) => (
              <Card key={test.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-dark-700 rounded-xl flex items-center justify-center">
                    <ChartBarIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-primary-900 dark:text-accent-200 mb-2">
                  {test.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <AcademicCapIcon className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    <span className="text-primary-600 dark:text-accent-400">{test.department}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <ClockIcon className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    <span className="text-primary-600 dark:text-accent-400">
                      Duration: {test.duration} minutes
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 dark:text-accent-400">
                      Questions: {test.questions}
                    </span>
                    <span className="text-primary-600 dark:text-accent-400">
                      Marks: {test.marks}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-primary-600 dark:text-accent-400">
                      {test.attempts} attempts
                    </span>
                  </div>
                </div>

                <button className="btn-primary w-full text-sm">
                  Start Test
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <ChartBarIcon className="w-16 h-16 text-primary-400 dark:text-accent-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-900 dark:text-accent-200 mb-2">
              No mock tests found
            </h3>
            <p className="text-primary-600 dark:text-accent-400">
              {selectedDepartment || selectedSubject
                ? 'Try adjusting your filters.'
                : 'Mock tests will appear here when available.'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MockTests;

