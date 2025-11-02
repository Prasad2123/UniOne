import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  BookOpenIcon, 
  SpeakerWaveIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import ProfileCompletion from '../components/ProfileCompletion';

const Home = () => {
  const { userData, setUserData } = useAuth();

  const handleProfileUpdate = async (newData) => {
    // In a real app, this would update the user data in Firestore
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const mainFeatures = [
    {
      title: 'Previous Year Questions',
      description: 'Access PYQs from top universities and exam patterns',
      icon: DocumentTextIcon,
      link: '/pyqs',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Smart Notes',
      description: 'AI-powered study materials and summaries',
      icon: BookOpenIcon,
      link: '/smart-notes',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Public Announcements',
      description: 'Stay updated with latest university news and events',
      icon: SpeakerWaveIcon,
      link: '/announcements',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const quickLinks = [
    {
      title: 'Scholarship Info',
      description: 'Find funding opportunities',
      icon: AcademicCapIcon,
      link: '/scholarships'
    },
    {
      title: 'Syllabus',
      description: 'Course outlines and curriculum',
      icon: ClipboardDocumentListIcon,
      link: '/syllabus'
    },
    {
      title: 'Mock Tests',
      description: 'Practice with sample tests',
      icon: ChartBarIcon,
      link: '/mock-tests'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Welcome to{' '}
            <span className="text-gradient">UniOne</span>
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400 mb-2">
            Hello, {userData?.name || 'Student'}! 👋
          </p>
          <p className="text-lg text-primary-500 dark:text-primary-500">
            Your comprehensive academic portal for success
          </p>
        </div>

        {/* Profile Completion */}
        <div className="mb-8">
          <ProfileCompletion userData={userData} onUpdate={handleProfileUpdate} />
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mainFeatures.map((feature, index) => (
            <Link key={feature.title} to={feature.link}>
              <Card className="h-full group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-50 mb-6 text-center">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link key={link.title} to={link.link}>
                <Card className="group animate-slide-up" style={{ animationDelay: `${(index + 3) * 0.1}s` }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-100 dark:bg-dark-700 rounded-xl flex items-center justify-center transition-transform duration-300">
                      <link.icon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 dark:text-primary-50">
                        {link.title}
                      </h3>
                      <p className="text-sm text-primary-600 dark:text-primary-400">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              10K+
            </div>
            <div className="text-primary-600 dark:text-primary-400">
              Study Materials
            </div>
          </Card>
          <Card className="text-center animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              50+
            </div>
            <div className="text-primary-600 dark:text-primary-400">
              Universities
            </div>
          </Card>
          <Card className="text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              25K+
            </div>
            <div className="text-primary-600 dark:text-primary-400">
              Students
            </div>
          </Card>
          <Card className="text-center animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              95%
            </div>
            <div className="text-primary-600 dark:text-primary-400">
              Success Rate
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="animate-slide-up" style={{ animationDelay: '1s' }}>
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-50 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-primary-900 dark:text-primary-50">
                  Downloaded Computer Science PYQ 2023
                </p>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <BookOpenIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-primary-900 dark:text-primary-50">
                  Viewed Data Structures Smart Notes
                </p>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  1 day ago
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;


