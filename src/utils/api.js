// Mock API utilities for development
// In a real application, these would be actual API calls to your backend

const API_BASE_URL = '/api';

// Mock delay to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockAPI = {
  // Papers API
  papers: {
    async fetchPapers(filters) {
      await delay(1000); // Simulate network delay
      
      const { department, year, subject } = filters;
      
      if (!department || !year || !subject) {
        return [];
      }
      
      return [
        {
          id: 1,
          title: `${subject} Question Paper ${year}`,
          type: 'Question Paper',
          size: '2.3 MB',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          subject,
          year,
          department,
          downloadCount: Math.floor(Math.random() * 1000) + 100,
          uploadedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: `${subject} Model Answer ${year}`,
          type: 'Model Answer',
          size: '1.8 MB',
          url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          subject,
          year,
          department,
          downloadCount: Math.floor(Math.random() * 800) + 80,
          uploadedAt: new Date().toISOString()
        }
      ];
    },
    
    async downloadPaper(paperId) {
      await delay(500);
      console.log(`Downloading paper with ID: ${paperId}`);
      return { success: true, message: 'Download started' };
    }
  },

  // Smart Notes API
  notes: {
    async fetchNotes(filters = {}) {
      await delay(1000);
      
      const { search, subject } = filters;
      
      const allNotes = [
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
          lastUpdated: '2024-01-15',
          aiGenerated: true
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
          lastUpdated: '2024-01-10',
          aiGenerated: true
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
          lastUpdated: '2024-01-20',
          aiGenerated: true
        }
      ];
      
      let filteredNotes = allNotes;
      
      if (subject && subject !== 'All Subjects') {
        filteredNotes = filteredNotes.filter(note => note.subject === subject);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredNotes = filteredNotes.filter(note =>
          note.title.toLowerCase().includes(searchLower) ||
          note.description.toLowerCase().includes(searchLower) ||
          note.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      return filteredNotes;
    },
    
    async generateSmartNote(topic, subject) {
      await delay(2000); // Longer delay for AI generation
      
      return {
        id: Date.now(),
        title: `Smart Notes: ${topic}`,
        subject,
        description: `AI-generated comprehensive notes on ${topic} for ${subject} students.`,
        difficulty: 'Intermediate',
        rating: 4.5,
        downloads: 0,
        tags: [topic.toLowerCase(), subject.toLowerCase(), 'ai-generated'],
        content: `This is an AI-generated smart note about ${topic}. It includes key concepts, examples, and practice problems...`,
        author: 'UniOne AI',
        lastUpdated: new Date().toISOString(),
        aiGenerated: true
      };
    }
  },

  // Announcements API
  announcements: {
    async fetchAnnouncements(filters = {}) {
      await delay(800);
      
      const { university } = filters;
      
      const allAnnouncements = [
        {
          id: 1,
          title: 'Annual Tech Fest 2024 - Registration Open',
          description: 'Join us for the biggest technical festival of the year. Registrations are now open for various competitions and workshops.',
          university: 'IIT Delhi',
          date: '2024-02-15',
          time: '10:00 AM',
          location: 'Main Auditorium, IIT Delhi',
          type: 'Event',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
          readCount: 1250,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Scholarship Applications Due Soon',
          description: 'Merit-based scholarship applications for the academic year 2024-25 are due by March 1st. Apply now to secure your funding.',
          university: 'University of Delhi',
          date: '2024-02-28',
          time: '11:59 PM',
          location: 'Online Portal',
          type: 'Scholarship',
          priority: 'High',
          image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=200&fit=crop',
          readCount: 890,
          createdAt: new Date().toISOString()
        }
      ];
      
      if (university && university !== 'All Universities') {
        return allAnnouncements.filter(announcement => 
          announcement.university === university
        );
      }
      
      return allAnnouncements;
    },
    
    async markAsRead(announcementId) {
      await delay(300);
      console.log(`Marking announcement ${announcementId} as read`);
      return { success: true };
    }
  }
};

// Real API functions (for when backend is implemented)
export const api = {
  papers: {
    fetchPapers: (filters) => fetch(`${API_BASE_URL}/papers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    }).then(res => res.json()),
    
    downloadPaper: (paperId) => fetch(`${API_BASE_URL}/papers/${paperId}/download`, {
      method: 'GET'
    }).then(res => res.json())
  },
  
  notes: {
    fetchNotes: (filters) => fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    }).then(res => res.json()),
    
    generateSmartNote: (topic, subject) => fetch(`${API_BASE_URL}/notes/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, subject })
    }).then(res => res.json())
  },
  
  announcements: {
    fetchAnnouncements: (filters) => fetch(`${API_BASE_URL}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    }).then(res => res.json()),
    
    markAsRead: (announcementId) => fetch(`${API_BASE_URL}/announcements/${announcementId}/read`, {
      method: 'POST'
    }).then(res => res.json())
  }
};

// Export mock API as default for development
export default mockAPI;


