import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Card from './Card';

const ProfileCompletion = ({ userData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: userData?.collegeName || '',
    rollNumber: userData?.rollNumber || '',
    stream: userData?.stream || '',
    year: userData?.year || ''
  });

  // Update formData when userData changes
  React.useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        collegeName: userData.collegeName || prev.collegeName || '',
        rollNumber: userData.rollNumber || prev.rollNumber || '',
        stream: userData.stream || prev.stream || '',
        year: userData.year || prev.year || ''
      }));
    }
  }, [userData]);

  const calculateCompletion = () => {
    const fields = ['name', 'university', 'department', 'collegeName', 'rollNumber', 'stream', 'year'];
    const mergedData = { ...userData, ...formData };
    const completedFields = fields.filter(field => {
      const value = mergedData[field];
      return value && value.toString().trim() !== '';
    });
    const percentage = Math.round((completedFields.length / fields.length) * 100);
    return percentage;
  };

  const completionPercentage = calculateCompletion();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (completionPercentage === 100) {
    return (
      <Card className="animate-slide-up">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-primary-900 dark:text-primary-50 mb-2">
            Profile Complete! 🎉
          </h3>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            Your profile is 100% complete. You now have access to your digital student ID.
          </p>
          <Link
            to="/profile"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <UserCircleIcon className="w-4 h-4" />
            <span>View Digital ID</span>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50">
            Complete Your Profile
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {completionPercentage}% complete
          </p>
        </div>
        <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center">
          <UserCircleIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>

      {!isEditing ? (
        <div>
          <p className="text-primary-600 dark:text-primary-400 mb-4">
            Complete your profile to unlock all features and get your digital student ID card.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary w-full"
          >
            Complete Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                College Name
              </label>
              <input
                type="text"
                value={formData.collegeName}
                onChange={(e) => setFormData(prev => ({ ...prev, collegeName: e.target.value }))}
                className="input-field"
                placeholder="Enter college name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                value={formData.rollNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, rollNumber: e.target.value }))}
                className="input-field"
                placeholder="Enter roll number"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                Stream
              </label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData(prev => ({ ...prev, stream: e.target.value }))}
                className="input-field"
              >
                <option value="">Select Stream</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                Academic Year
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                className="input-field"
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </Card>
  );
};

export default ProfileCompletion;
