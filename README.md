# UniOne - Student Portal

A modern, responsive React application for university students featuring authentication, dark mode, and comprehensive academic resources.

## 🚀 Features

- **Authentication**: Firebase-based email/password authentication with protected routes
- **Dark/Light Mode**: Persistent theme switching with localStorage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Academic Resources**:
  - Previous Year Questions (PYQs) with PDF viewer
  - AI-powered Smart Notes
  - University Announcements
  - User Profile Management
- **Interactive Elements**: Chatbot, notifications, and smooth animations
- **Modern UI**: Clean, academic design with gradient backgrounds and glass effects

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom theme
- **Routing**: React Router DOM with protected routes
- **Authentication**: Firebase Authentication
- **Database**: Firestore (ready for implementation)
- **Icons**: Heroicons
- **State Management**: React Context API

## 📦 Installation

1. **Clone or download the project**
   ```bash
   # If you have the files, navigate to the project directory
   cd unione
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional - app works with mock data)
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your config to `src/firebaseConfig.js`
   - Dummy Phone Number +15551234567 OTP : 123456
   - Dummy Email and password : prasad21@gmail.com password : 1234567

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (default Vite port)

## 📽️ Demo & Walkthrough

### Quick Demo
- Start: `npm install` → `npm run dev`
- Open: `http://localhost:5173`
- Login with demo credentials:
  - Email: `prasad21@gmail.com`  |  Password: `1234567`
  - Phone: `+15551234567`  |  OTP: `123456`

### Primary Routes
- `/` — Home/Dashboard
- `/pyqs` — Previous Year Questions with PDF viewer
- `/smart-notes` — AI-powered notes
- `/announcements` — University announcements
- `/profile` — Profile management

### Things to Try
- Toggle dark/light mode and refresh to see persistence
- Open a PYQ and view it in the PDF modal
- Use the chatbot on the Home page
- Update profile details and return to confirm changes

### Optional: Screenshots/GIFs
Add screenshots here for quick visual context:
- Home (light/dark)
- PYQs with PDF modal
- Smart Notes
- Profile

## 🔧 Configuration

### Firebase Setup

Replace the placeholder values in `src/firebaseConfig.js` with your actual Firebase configuration:

```javascript
export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Mock Data

The app includes comprehensive mock data for development. All API calls are simulated in `src/utils/api.js`. To connect to a real backend, replace the mock API calls with actual HTTP requests.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx       # Navigation bar with responsive menu
│   ├── Card.jsx         # Reusable card component
│   ├── Chatbot.jsx      # AI chatbot component
│   ├── PDFViewerModal.jsx # PDF viewer modal
│   ├── LoadingSpinner.jsx # Loading spinner
│   └── ProtectedRoute.jsx # Route protection wrapper
├── contexts/            # React Context providers
│   ├── AuthContext.jsx  # Authentication state management
│   └── ThemeContext.jsx # Dark/light mode management
├── pages/              # Main application pages
│   ├── Home.jsx        # Dashboard/home page
│   ├── PYQs.jsx        # Previous year questions
│   ├── SmartNotes.jsx  # AI-powered study materials
│   ├── Announcements.jsx # University announcements
│   ├── Profile.jsx     # User profile management
│   ├── Login.jsx       # Authentication login
│   └── Signup.jsx      # User registration
├── utils/              # Utility functions
│   └── api.js          # Mock API functions
├── firebase.js         # Firebase configuration and functions
├── firebaseConfig.js   # Firebase project configuration
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design System

### Colors
- **Primary**: Light grays and blues for academic feel
- **Accent**: Blue tones for interactive elements
- **Dark Mode**: Inverted palette with proper contrast

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Primary (accent color) and secondary (neutral) variants
- **Forms**: Consistent input styling with focus states
- **Animations**: Smooth transitions and hover effects

## 🔐 Authentication Flow

1. **Sign Up**: Users create accounts with email, password, and academic details
2. **Sign In**: Email/password authentication via Firebase
3. **Protected Routes**: Authenticated users can access all features
4. **Profile Management**: Users can edit their information and preferences
5. **Theme Persistence**: Dark/light mode preference saved in localStorage

## 📱 Responsive Features

- **Mobile Navigation**: Collapsible hamburger menu
- **Touch-Friendly**: Large tap targets and smooth scrolling
- **Adaptive Layout**: Grid layouts that adjust to screen size
- **Optimized Images**: Responsive images with proper aspect ratios

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

### Environment Variables
For production deployment, set these environment variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## 🔮 Future Enhancements

- **Real Backend Integration**: Replace mock APIs with actual backend
- **File Upload**: Allow users to upload study materials
- **Advanced Search**: Full-text search across all content
- **Collaboration**: Study groups and peer-to-peer learning
- **Mobile App**: React Native version
- **Analytics**: User engagement and learning progress tracking
- **AI Features**: Personalized study recommendations
- **Offline Support**: PWA capabilities for offline access

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Verify your Firebase configuration
   - Ensure Authentication and Firestore are enabled
   - Check your Firebase project permissions

2. **Styling Issues**
   - Clear browser cache
   - Restart the development server
   - Verify Tailwind CSS is properly configured

3. **Build Errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors if using TypeScript
   - Verify all imports are correct

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please create an issue in the repository or contact the development team.

---

**Happy Learning with UniOne! 🎓**


