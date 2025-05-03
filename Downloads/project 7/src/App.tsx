import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import RegisterForm from './components/auth/RegisterForm';
import OnboardingForm from './components/auth/OnboardingForm';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import ChatPage from './pages/ChatPage';
import ProgressPage from './pages/ProgressPage';
import TestingPage from './pages/TestingPage';
import TestPage from './pages/TestPage';
import SettingsPage from './pages/SettingsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import NewsFeedPage from './pages/NewsFeedPage';
import ProfilePage from './pages/ProfilePage.tsx';
import useUserStore from './store/userStore';

// Компонент для защищенных маршрутов
const ProtectedRoute = ({ children }) => {
  const { isRegistered, isOnboarded } = useUserStore();
  
  if (!isRegistered || !isOnboarded) {
    return <Navigate to="/register" replace />;
  }
  
  return children;
};

function App() {
  useEffect(() => {
    document.title = 'BilimApp';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/onboarding" element={<OnboardingForm />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="my-textbooks" element={<LibraryPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="homework" element={<ProgressPage />} />
          <Route path="testing" element={<TestingPage />} />
          <Route path="testing/:type" element={<TestPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="news" element={<NewsFeedPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;