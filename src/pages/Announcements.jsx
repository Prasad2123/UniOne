import React, { useState, useEffect } from 'react';
import { SpeakerWaveIcon, CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState('Maharashtra University');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  const universities = [
    'Maharashtra University'
  ];

  // Mock API call to fetch announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockAnnouncements = [
        {
          id: 1,
          title: 'Annual Tech Fest 2024 - Registration Open',
          description: 'Join us for the biggest technical festival of the year. Registrations are now open for various competitions and workshops.',
          university: 'Maharashtra University',
          date: '2024-02-15',
          time: '10:00 AM',
          location: 'Main Auditorium, IIT Delhi',
          type: 'Event',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
        },
        {
          id: 2,
          title: 'Scholarship Applications Due Soon',
          description: 'Merit-based scholarship applications for the academic year 2024-25 are due by March 1st. Apply now to secure your funding.',
          university: 'Maharashtra University',
          date: '2024-02-28',
          time: '11:59 PM',
          location: 'Online Portal',
          type: 'Scholarship',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop'
        },
        {
          id: 3,
          title: 'Library Extended Hours for Exam Period',
          description: 'The central library will remain open 24/7 during the examination period to support student studies.',
          university: 'Maharashtra University',
          date: '2024-03-01',
          time: '12:00 AM',
          location: 'Central Library',
          type: 'Academic',
          priority: 'Medium',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop'
        },
        {
          id: 4,
          title: 'Career Fair 2024 - Top Companies Participating',
          description: 'Over 50 leading companies will participate in our annual career fair. Don\'t miss this opportunity to network and find internships.',
          university: 'Maharashtra University',
          date: '2024-03-10',
          time: '9:00 AM',
          location: 'Convocation Hall',
          type: 'Career',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
        },
        {
          id: 5,
          title: 'Research Symposium - Call for Papers',
          description: 'Submit your research papers for the annual research symposium. Deadline for submission is March 15th.',
          university: 'Maharashtra University',
          date: '2024-03-15',
          time: '11:59 PM',
          location: 'Online Submission',
          type: 'Academic',
          priority: 'Medium',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'
        },
        {
          id: 6,
          title: 'Sports Week 2024 - Registration Open',
          description: 'Annual sports week featuring cricket, football, basketball, and more. Team registrations are now open.',
          university: 'Maharashtra University',
          date: '2024-03-20',
          time: '8:00 AM',
          location: 'Sports Complex',
          type: 'Sports',
          priority: 'Low',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop'
        }
      ];
      
      setAnnouncements(mockAnnouncements);
      setFilteredAnnouncements(mockAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    setFilteredAnnouncements(announcements.filter(announcement => 
      announcement.university === selectedUniversity || announcement.university === 'Maharashtra University'
    ));
  }, [selectedUniversity, announcements]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Low':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Event':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'Scholarship':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'Academic':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Career':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      case 'Sports':
        return 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Public Announcements
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400">
            Stay updated with latest university news and events
          </p>
        </div>

        {/* Filter */}
        <Card className="mb-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <SpeakerWaveIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-50">
                Latest Updates
              </h2>
            </div>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="input-field w-full sm:w-auto"
            >
              {universities.map((university) => (
                <option key={university} value={university}>{university}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Announcements Grid */}
        {loading ? (
          <LoadingSpinner text="Loading public announcements..." />
        ) : filteredAnnouncements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.map((announcement, index) => (
              <Card key={announcement.id} className="animate-slide-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Image */}
                <div className="relative h-48 mb-4">
                  <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                      {announcement.type}
                    </span>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2 line-clamp-2">
                    {announcement.title}
                  </h3>

                  <p className="text-primary-600 dark:text-primary-400 text-sm mb-4 line-clamp-3">
                    {announcement.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      <span className="text-primary-600 dark:text-primary-400">
                        {new Date(announcement.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <ClockIcon className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      <span className="text-primary-600 dark:text-primary-400">
                        {announcement.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPinIcon className="w-4 h-4 text-primary-500 dark:text-primary-400" />
                      <span className="text-primary-600 dark:text-primary-400">
                        {announcement.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-accent-600 dark:text-accent-400">
                      {announcement.university}
                    </span>
                    <button className="btn-primary text-sm px-4 py-2">
                      Read More
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <SpeakerWaveIcon className="w-16 h-16 text-primary-400 dark:text-primary-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-900 dark:text-primary-50 mb-2">
              No public announcements found
            </h3>
            <p className="text-primary-600 dark:text-accent-400">
              No public announcements available.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Announcements;


