import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  BookOpenIcon, 
  SpeakerWaveIcon,
  UserIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { signOutUser } from '../firebase.js';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, userData } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'PYQs', href: '/pyqs', icon: DocumentTextIcon },
    { name: 'Smart Notes', href: '/smart-notes', icon: BookOpenIcon },
    { name: 'Announcements', href: '/announcements', icon: SpeakerWaveIcon },
  ];

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-primary-800 shadow-soft border-b border-primary-200 dark:border-primary-700 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="text-xl font-bold text-gradient">UniOne</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                    : 'text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-700 hover:text-primary-900 dark:hover:text-primary-100'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button className="relative p-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-700 rounded-xl transition-colors duration-200">
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-700 rounded-xl transition-colors duration-200"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            {/* User Menu */}
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-700 rounded-xl transition-colors duration-200"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {userData?.name || currentUser.displayName || 'Profile'}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 hover:bg-primary-100 dark:hover:bg-primary-700 rounded-xl transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary-200 dark:border-primary-700 py-4 animate-slide-up">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300'
                      : 'text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-700 rounded-xl transition-colors duration-200"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {userData?.name || currentUser.displayName || 'Profile'}
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200 w-full text-left"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-700 rounded-xl transition-colors duration-200 text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary text-sm px-3 py-2 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


