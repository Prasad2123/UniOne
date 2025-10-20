import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, BookOpenIcon, DocumentTextIcon, StarIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import Chatbot from '../components/Chatbot';

const SmartNotes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const subjects = [
    'All Subjects',
    'Computer Science',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  // Mock API call to fetch notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockNotes = [
        {
          id: 1,
          title: 'Data Structures and Algorithms - Complete Guide',
          subject: 'Computer Science',
          description: 'Comprehensive notes covering arrays, linked lists, trees, graphs, and sorting algorithms with examples and implementations.',
          difficulty: 'Intermediate',
          rating: 4.8,
          downloads: 1250,
          tags: ['algorithms', 'data-structures', 'programming'],
          content: 'Detailed explanations of fundamental data structures and algorithms...',
          author: 'Dr. Sarah Johnson',
          lastUpdated: '2024-01-15'
        },
        {
          id: 2,
          title: 'Calculus - Integration Techniques',
          subject: 'Mathematics',
          description: 'Step-by-step guide to integration methods including substitution, by parts, and partial fractions.',
          difficulty: 'Beginner',
          rating: 4.6,
          downloads: 890,
          tags: ['calculus', 'integration', 'mathematics'],
          content: 'Introduction to integration techniques with solved examples...',
          author: 'Prof. Michael Chen',
          lastUpdated: '2024-01-10'
        },
        {
          id: 3,
          title: 'Thermodynamics Laws and Applications',
          subject: 'Mechanical',
          description: 'Understanding the four laws of thermodynamics with real-world applications and problem-solving strategies.',
          difficulty: 'Advanced',
          rating: 4.9,
          downloads: 2100,
          tags: ['thermodynamics', 'physics', 'engineering'],
          content: 'Comprehensive coverage of thermodynamic principles...',
          author: 'Dr. Emily Rodriguez',
          lastUpdated: '2024-01-20'
        },
        {
          id: 4,
          title: 'Digital Electronics - Logic Gates and Circuits',
          subject: 'Electronics',
          description: 'Complete guide to digital logic gates, Boolean algebra, and combinational circuits.',
          difficulty: 'Intermediate',
          rating: 4.7,
          downloads: 1560,
          tags: ['digital-electronics', 'logic-gates', 'circuits'],
          content: 'Fundamentals of digital electronics with practical examples...',
          author: 'Dr. James Wilson',
          lastUpdated: '2024-01-12'
        },
        {
          id: 5,
          title: 'Organic Chemistry - Reaction Mechanisms',
          subject: 'Chemistry',
          description: 'Detailed study of organic reaction mechanisms including nucleophilic substitution and elimination reactions.',
          difficulty: 'Advanced',
          rating: 4.5,
          downloads: 980,
          tags: ['organic-chemistry', 'reactions', 'mechanisms'],
          content: 'In-depth analysis of organic reaction mechanisms...',
          author: 'Prof. Lisa Anderson',
          lastUpdated: '2024-01-08'
        }
      ];
      
      setNotes(mockNotes);
      setFilteredNotes(mockNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    let filtered = notes;

    if (selectedSubject && selectedSubject !== 'All Subjects') {
      filtered = filtered.filter(note => note.subject === selectedSubject);
    }

    if (searchTerm) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredNotes(filtered);
  }, [searchTerm, selectedSubject, notes]);

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
          <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-50 mb-4">
            Smart Notes
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400">
            AI-powered study materials and comprehensive notes
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                type="text"
                placeholder="Search notes, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input-field"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Notes Grid */}
        {loading ? (
          <LoadingSpinner text="Loading smart notes..." />
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <Card key={note.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-xl flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(note.difficulty)}`}>
                    {note.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-2 line-clamp-2">
                  {note.title}
                </h3>

                <p className="text-primary-600 dark:text-primary-400 text-sm mb-4 line-clamp-3">
                  {note.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 dark:text-primary-400">Subject:</span>
                    <span className="font-medium text-primary-900 dark:text-primary-50">{note.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 dark:text-primary-400">Author:</span>
                    <span className="font-medium text-primary-900 dark:text-primary-50">{note.author}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-600 dark:text-primary-400">Downloads:</span>
                    <span className="font-medium text-primary-900 dark:text-primary-50">{note.downloads}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      {note.rating}
                    </span>
                  </div>
                  <span className="text-xs text-primary-500 dark:text-primary-400">
                    Updated: {new Date(note.lastUpdated).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-700 text-primary-600 dark:text-primary-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                    <DocumentTextIcon className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                    <BookOpenIcon className="w-4 h-4" />
                    <span>Study</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <BookOpenIcon className="w-16 h-16 text-primary-400 dark:text-primary-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-primary-900 dark:text-primary-50 mb-2">
              No notes found
            </h3>
            <p className="text-primary-600 dark:text-primary-400">
              {searchTerm || selectedSubject !== 'All Subjects'
                ? 'Try adjusting your search criteria or filters.'
                : 'Smart notes will appear here once available.'}
            </p>
          </Card>
        )}

        <Chatbot />
      </div>
    </div>
  );
};

export default SmartNotes;


