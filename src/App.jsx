import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQsPage from "./pages/FAQsPage";
import HelpPage from "./pages/HelpPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ProfilePage from "./pages/ProfilePage";
import SmartNotes from "./pages/SmartNotes";
import PYQs from "./pages/PYQs";
import Announcements from "./pages/Announcements";

import SplashScreen from "./components/SplashScreen";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const hasResolved = useRef(false);

  useEffect(() => {
    const minVisibleTime = 700;
    const maxVisibleTime = 3000;
    const start = performance.now();

    const finish = () => {
      if (hasResolved.current) return;
      hasResolved.current = true;

      const elapsed = performance.now() - start;
      const waitTime = Math.max(minVisibleTime - elapsed, 0);

      setTimeout(() => setIsLoading(false), waitTime);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const hardTimeout = setTimeout(() => {
      if (!hasResolved.current) {
        hasResolved.current = true;
        setIsLoading(false);
      }
    }, maxVisibleTime);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(hardTimeout);
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className={`app-shell ${isLoading ? "app-shell--loading" : ""}`}>
          <SplashScreen isActive={isLoading} />

          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faqs" element={<FAQsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/smart-notes" element={<SmartNotes />} />
              <Route path="/pyqs" element={<PYQs />} />
              <Route path="/announcements" element={<Announcements />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
