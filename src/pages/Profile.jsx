import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  BuildingOfficeIcon, 
  AcademicCapIcon, 
  CalendarIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  PencilIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { signOutUser } from '../firebase.js';
import Card from '../components/Card';
import DigitalIDCard from '../components/DigitalIDCard';

const Profile = () => {
  const { currentUser, userData, setUserData } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDigitalID, setShowDigitalID] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userData?.name || '',
    university: userData?.university || 'Maharashtra University',
    department: userData?.department || '',
    year: userData?.year || '',
    collegeName: userData?.collegeName || '',
    rollNumber: userData?.rollNumber || '',
    stream: userData?.stream || ''
  });

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditChange = (e) => {
    setEditForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    // In a real app, this would update the user data in Firestore
    try {
      // Update userData in context to reflect changes
      const updatedData = { ...userData, ...editForm };
      setUserData(updatedData);
      // Here you would typically call an update function to save to Firestore
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: userData?.name || '',
      university: userData?.university || 'Maharashtra University',
      department: userData?.department || '',
      year: userData?.year || '',
      collegeName: userData?.collegeName || '',
      rollNumber: userData?.rollNumber || '',
      stream: userData?.stream || ''
    });
    setIsEditing(false);
  };

  const departments = [
    'Computer Engineering',
    'Information Technology',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Electronics & Telecommunication Engineering',
    'Artificial Intelligence & Data Science'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Graduate'];

  const stats = [
    { label: 'PYQs Downloaded', value: '24', icon: '📄' },
    { label: 'Smart Notes Studied', value: '18', icon: '📚' },
    { label: 'Public Announcements Read', value: '45', icon: '📢' },
    { label: 'Days Active', value: '30', icon: '📅' }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Profile
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Header */}
        <Card className="mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-50 mb-2">
                {userData?.name || currentUser?.displayName || 'Student'}
              </h2>
              <p className="text-primary-600 dark:text-primary-400 mb-2">
                {userData?.university || 'University'}
              </p>
              <p className="text-primary-500 dark:text-primary-500">
                {userData?.department} • {userData?.year}
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Verified Student
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary flex items-center space-x-2"
            >
              <PencilIcon className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </Card>

        {/* Profile Information */}
        <Card className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-6">
            Personal Information
          </h3>
          
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    University
                  </label>
                  <input
                    type="text"
                    name="university"
                    value="Maharashtra University"
                    readOnly
                    className="input-field bg-primary-50 dark:bg-dark-700"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
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
                    Academic Year
                  </label>
                  <select
                    name="year"
                    value={editForm.year}
                    onChange={handleEditChange}
                    className="input-field"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <button onClick={handleSave} className="btn-primary">
                  Save Changes
                </button>
                <button onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                <EnvelopeIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                <div>
                  <p className="text-sm text-primary-600 dark:text-primary-400">Email</p>
                  <p className="font-medium text-primary-900 dark:text-primary-50">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                <BuildingOfficeIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                <div>
                  <p className="text-sm text-primary-600 dark:text-primary-400">University</p>
                  <p className="font-medium text-primary-900 dark:text-primary-50">
                    {userData?.university || 'Not specified'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                <AcademicCapIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                <div>
                  <p className="text-sm text-primary-600 dark:text-primary-400">Department</p>
                  <p className="font-medium text-primary-900 dark:text-primary-50">
                    {userData?.department || 'Not specified'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                <CalendarIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                <div>
                  <p className="text-sm text-primary-600 dark:text-primary-400">Academic Year</p>
                  <p className="font-medium text-primary-900 dark:text-primary-50">
                    {userData?.year || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Activity Stats */}
        <Card className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-6">
            Your Activity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-accent-600 dark:text-accent-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-6">
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-700 rounded-xl">
              <div className="flex items-center space-x-3">
                {isDarkMode ? (
                  <MoonIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                ) : (
                  <SunIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                )}
                <div>
                  <p className="font-medium text-primary-900 dark:text-primary-50">Theme</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="btn-secondary"
              >
                Switch Theme
              </button>
            </div>
          </div>
        </Card>

        {/* Digital ID Card */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <IdentificationIcon className="w-8 h-8 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2">
              Digital Student ID Card
            </h3>
            <p className="text-primary-600 dark:text-primary-400 mb-4">
              Access your official digital student ID card
            </p>
            <button
              onClick={() => setShowDigitalID(!showDigitalID)}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <IdentificationIcon className="w-4 h-4" />
              <span>{showDigitalID ? 'Hide' : 'View'} Digital ID</span>
            </button>
          </div>
        </Card>

        {/* Digital ID Card Display */}
        {showDigitalID && (
          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <DigitalIDCard userData={userData} />
          </div>
        )}

        {/* Logout */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center space-x-2 mx-auto text-red-600 dark:text-red-400"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;


