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
import ProfilePage from './pages/ProfilePage';
import MultiplayerGame from './components/multiplayer/MultiplayerGame';
import useUserStore from './store/userStore';
import TooltipsManager from './components/ui/TooltipsManager';
import MyAssignmentsPage from './pages/MyAssignmentsPage';

function App() {
  useEffect(() => {
    document.title = 'BilimApp';
  }, []);

  return (
    <BrowserRouter>
      <TooltipsManager />
      
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
          
          {/* Explicitly define the homework route */}
          <Route path="homework" element={<MyAssignmentsPage />} />
          <Route path="assignments" element={<MyAssignmentsPage />} />
          
          {/* Note: Specific routes before dynamic routes */}
          <Route path="testing/multiplayer/:gameId" element={<MultiplayerGame />} />
          <Route path="testing/:type" element={<TestPage />} />
          <Route path="testing" element={<TestingPage />} />
          
          <Route path="settings" element={<SettingsPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="news" element={<NewsFeedPage />} />
          <Route path="profile/:userId" element={<ProfilePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;