import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import PYQs from './pages/PYQs';
import SmartNotes from './pages/SmartNotes';
import Announcements from './pages/Announcements';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ScholarshipInfo from './pages/ScholarshipInfo';
import MockTests from './pages/MockTests';
import Syllabus from './pages/Syllabus';

function AppContent() {
  const location = useLocation();
  const hideLayout = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 flex flex-col">
      {!hideLayout && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/pyqs" element={
            <ProtectedRoute>
              <PYQs />
            </ProtectedRoute>
          } />
          <Route path="/smart-notes" element={
            <ProtectedRoute>
              <SmartNotes />
            </ProtectedRoute>
          } />
          <Route path="/announcements" element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/scholarships" element={
            <ProtectedRoute>
              <ScholarshipInfo />
            </ProtectedRoute>
          } />
          <Route path="/mock-tests" element={
            <ProtectedRoute>
              <MockTests />
            </ProtectedRoute>
          } />
          <Route path="/syllabus" element={
            <ProtectedRoute>
              <Syllabus />
            </ProtectedRoute>
          } />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


