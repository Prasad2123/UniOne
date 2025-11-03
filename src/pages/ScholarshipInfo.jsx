import React, { useState, useEffect } from 'react';
import { AcademicCapIcon, CalendarIcon, CurrencyDollarIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const ScholarshipInfo = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All Types');

  const scholarshipTypes = [
    'All Types',
    'Merit-Based',
    'Need-Based',
    'Sports',
    'Research',
    'Government',
    'Private'
  ];

  useEffect(() => {
    const fetchScholarships = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockScholarships = [
          {
            id: 1,
            title: 'Merit Scholarship for Engineering Students',
            description: 'Scholarship for students with outstanding academic performance in engineering programs at Maharashtra University.',
            type: 'Merit-Based',
            amount: '₹50,000',
            deadline: '2024-04-15',
            eligibility: 'CGPA above 8.5',
            applicationLink: '#',
            status: 'Open'
          },
          {
            id: 2,
            title: 'Need-Based Financial Aid',
            description: 'Financial assistance for economically disadvantaged students pursuing higher education.',
            type: 'Need-Based',
            amount: 'Up to ₹30,000',
            deadline: '2024-03-30',
            eligibility: 'Income below ₹5 Lakhs',
            applicationLink: '#',
            status: 'Open'
          },
          {
            id: 3,
            title: 'Sports Excellence Scholarship',
            description: 'Scholarship for students excelling in sports and representing the university at state/national level.',
            type: 'Sports',
            amount: '₹25,000',
            deadline: '2024-05-01',
            eligibility: 'State/National level participation',
            applicationLink: '#',
            status: 'Open'
          },
          {
            id: 4,
            title: 'Research Fellowship Program',
            description: 'Fellowship for students pursuing research in engineering and technology fields.',
            type: 'Research',
            amount: '₹75,000',
            deadline: '2024-06-15',
            eligibility: 'Research proposal required',
            applicationLink: '#',
            status: 'Open'
          },
          {
            id: 5,
            title: 'Government Engineering Scholarship',
            description: 'State government scholarship for engineering students from Maharashtra University.',
            type: 'Government',
            amount: '₹40,000',
            deadline: '2024-04-30',
            eligibility: 'Maharashtra domicile',
            applicationLink: '#',
            status: 'Open'
          },
          {
            id: 6,
            title: 'Private Sector Engineering Grant',
            description: 'Corporate scholarship sponsored by leading technology companies for engineering students.',
            type: 'Private',
            amount: '₹60,000',
            deadline: '2024-05-20',
            eligibility: 'CGPA above 8.0',
            applicationLink: '#',
            status: 'Open'
          }
        ];
        
        setScholarships(mockScholarships);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = selectedType === 'All Types' 
    ? scholarships 
    : scholarships.filter(scholarship => scholarship.type === selectedType);

  const getTypeColor = (type) => {
    switch (type) {
      case 'Merit-Based':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'Need-Based':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Sports':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'Research':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'Government':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'Private':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Open' 
      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-accent-200 mb-4">
            Scholarship Information
          </h1>
          <p className="text-xl text-primary-600 dark:text-accent-400">
            Explore available funding opportunities at Maharashtra University
          </p>
        </div>

        {/* Filter */}
        <Card className="mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <AcademicCapIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              <h2 className="text-lg font-semibold text-primary-900 dark:text-accent-200">
                Available Scholarships
              </h2>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input-field w-full sm:w-auto"
            >
              {scholarshipTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Scholarships Grid */}
        {loading ? (
          <LoadingSpinner text="Loading scholarship information..." />
        ) : filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredScholarships.map((scholarship, index) => (
              <Card key={scholarship.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-dark-700 rounded-xl flex items-center justify-center">
                    <CurrencyDollarIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(scholarship.type)}`}>
                      {scholarship.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(scholarship.status)}`}>
                      {scholarship.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-primary-900 dark:text-accent-200 mb-2">
                  {scholarship.title}
                </h3>

                <p className="text-primary-600 dark:text-accent-400 text-sm mb-4">
                  {scholarship.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <CurrencyDollarIcon className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    <span className="font-medium text-primary-900 dark:text-accent-200">Amount:</span>
                    <span className="text-primary-600 dark:text-accent-400">{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    <span className="font-medium text-primary-900 dark:text-accent-200">Deadline:</span>
                    <span className="text-primary-600 dark:text-accent-400">
                      {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <DocumentCheckIcon className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                    <span className="font-medium text-primary-900 dark:text-accent-200">Eligibility:</span>
                    <span className="text-primary-600 dark:text-accent-400">{scholarship.eligibility}</span>
                  </div>
                </div>

                <button className="btn-primary w-full text-sm">
                  Apply Now
                </button>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <AcademicCapIcon className="w-16 h-16 text-primary-400 dark:text-accent-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-900 dark:text-accent-200 mb-2">
              No scholarships found
            </h3>
            <p className="text-primary-600 dark:text-accent-400">
              No scholarships available for the selected type.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScholarshipInfo;

